
import React , { Component} from 'react'

   
   const functions = require('firebase-functions');
   const cors = require('cors')({ origin: true });
   const admin = require('firebase-admin');
   const fetch = require('fetch-base64');
   const url = require('url');
   const _ = require('lodash');
   const cryptonode = require('crypto');
   const crypto = require('crypto-js');
   const request = require('request');
   const schedule = require('node-schedule');
   
   class startMatchmaking extends Component{
   startMatchmaking(fn) {
    FBInstant.player.getSignedPlayerInfoAsync(JSON.stringify({ "label": "getKey" })).then(function(result) {

        var signature = result.getSignature();

        var APIResponse = RPC({
            "url": "/startMatchmaking", // API call URL
            "userFBId": facebookStuff.userId,
            "signature": signature,
            "userId": FirebaseAPI.getUserId(),
            "data": {
                "userFBId": facebookStuff.userId,
                "signature": signature,
                "tag": "1v1",
                "userId": FirebaseAPI.getUserId(),
                "userName": facebookStuff.name,
                "userPicture": facebookStuff.picture
            }
        });

        if (fn) {
            APIResponse.done(fn);
        }

        return APIResponse;
    }.bind(this)).then(function(response) {
        if (response.success === "success" || response.message === "success") {
            console.log('User subscribed for matchmaking ' + data);
        } else {
            console.log('User not subscribed for matchmaking ' + JSON.stringify(response));
        }
    }.bind(this)).catch(function(error) {
        console.log('Error:' + error.message);
    }.bind(this));
}




 findMatch(data) {
  FBInstant.player.getSignedPlayerInfoAsync(JSON.stringify({ "label": "getKey" })).then(function(result) {

      var signature = result.getSignature();

      // add event listener for match //
      // #bounty challenge connect //
      var detach = addBountyQueueListener(facebookStuff.userId, connectToPlayer);

      var APIResponse = RPC({
          "url": "/findMatch", // API Call URL
          "userFBId": facebookStuff.userId,
          "signature": signature,
          "userId": FirebaseAPI.getUserId(),
          "data": {
              "userFBId": facebookStuff.userId,
              "signature": signature,
              "tag": "1v1",
              "userId": FirebaseAPI.getUserId(),
              "userName": facebookStuff.name,
              "userPicture": facebookStuff.picture
          }
      });

      return APIResponse;
  }.bind(this)).then(function(response) {
      if (response.success === "success" || response.message === "success") {
          console.log('Started search ' + data);
      } else {
          console.log('Search not started ' + JSON.stringify(response));
      }
  }.bind(this)).catch(function(error) {
      console.log('Error:' + error.message);
  }.bind(this));
}

 addBountyQueueListener(userFBId, fn) {
  var callbackFn = FirebaseAPI.db.collection("multiplayerQueue").doc(facebookStuff.userId).onSnapshot(function(doc) {
      var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    
      var resultData = doc.data();
      if (resultData === undefined || resultData === null) {
          return false;
      }
      // if the entry has data stored remove them //
      if (resultData.flagged !== undefined && resultData.flagged !== false) {
          if (fn) {
              fn(resultData);
          }

          // detach event listener //
          callbackFn();
      }
  }, function(error) {
      console.log("error on listening ", error);
      // in case of error unsubscribe //
      callbackFn();
  });

  return callbackFn;
}

 connectToPlayer(data) {
  var userFBId = data.flagged;

  FBInstant.context
      .createAsync(userFBId)
      .then(function() {
          
      }).catch(function(err) {
          console.log(err.message);
          removeFromQueue(function() {});
      });
}

 getChallengedPlayers(fn) {
  // gets players from this context ( us and the opponent(s) ) //
  var contextPlayers = FBInstant.context.getPlayersAsync().then(function(players) {

      var connectedPlayers = players.map(function(player) {
          return {
              id: player.getID(),
              name: player.getName(),
              photo: player.getPhoto()
          };
      });
      
      // exclude ourselves from results, using Lodash here //
      var challengedPlayer = _.reject(connectedPlayers, function(o) {
          return o.id === facebookStuff.userId;
      });

      if (challengedPlayer.length > 0) {
          // add image to cache //
          var playerProfileImg = new Image();
          playerProfileImg.src = challengedPlayer[0].photo;
          playerProfileImg.onload = function(){
            // opponent profile image has loaded you can use it now //    
          };
          console.log(connectedPlayers, challengedPlayer);
          registry.challengedPlayer = challengedPlayer[0]; // store this somewhere if you want
      } else {
          console.log("no connected players found")
      }
      if (fn) {
          fn();
      }
  }).catch(function(err) {
      console.log(err);
      if (fn) {
          fn();
      }
  });
}


/**
 * Validates FB signature to determine if player actually comes from FB, uses *APP SECRET!*
 * 
 * @param {any} signedRequest 
 * @returns 
 */
  validate(signedRequest) {
  try {
      var firstpart = signedRequest.split('.')[0];
      var replaced = firstpart.replace(/-/g, '+').replace(/_/g, '/');
      var signature = crypto.enc.Base64.parse(replaced).toString();
      const dataHash = crypto.HmacSHA256(signedRequest.split('.')[1], APP_SECRET).toString();
      var isValid = signature === dataHash;
      if (!isValid) {
          console.log('Invalid signature');
          console.log('firstpart', firstpart);
          console.log('replaced ', replaced);
          console.log('Expected', dataHash);
          console.log('Actual', signature);
      }

      return isValid;
  } catch (e) {
      console.log("error validating signature", e);
      return false;
  }
}

// The reference of the collection
bountyQueueRef = db.collection("bountyQueue");
return (
    startMatchmaking = ()=> functions.https.onRequest((req, response) => {
    var data = req.query.data || req.params.data || req.body.data || '';
    var userId = req.query.userId || req.params.userId || req.body.userId || 5000;
    let userFBId = data.userFBId;
    let tag = data.tag;
    var signature = data.signature || "123";

    var isValid = validate(signature);

    if (isValid === true) {
        // data: {userFBId, userFirebaseId, tag, timestamp}
        data.flagged = false;
        bountyQueueRef.doc(userFBId).set(data, { merge: true }).then(docRef => {
            cors(req, response, () => {});
            response.status(200).send(JSON.stringify({ "message": userFBId + " is on queue", "status": "success" }));
        }).catch(err => {
            console.log("An error occurred", err, err.message);
            cors(req, response, () => {});
            response.status(500).send(JSON.stringify({ "message": "an error occurred" + err.message }));
        });
    } else {
        console.log("An error occurred - invalid signature");
        cors(req, response, () => {});
        response.status(500).send(JSON.stringify({ "message": "invalid signature" }));
    }
})
)
   }