import React,{Component} from 'react';
import './App.css';
import Game1 from './components/game1'
import BaseGame from './BaseGame'


class App extends Component{

  constructor(){
    super();
    this.randomCard = this.randomCard.bind(this);
    this.cardImages = this.cardImages.bind(this);
   
  }

  componentDidMount(){
    const script = document.createElement('script');
    script.src='https://connect.facebook.net/en_US/fbinstant.6.2.js'
    script.id='fbinstant'

    document.body.appendChild(script);
    script.onload = () =>{
      
      window.FBInstant.initializeAsync()
      .then(function(){
        for (let i = 0 ; i < 99 ; i++) {
          // When preloading assets, make sure to report the progress
          window.FBInstant.setLoadingProgress(i);
        }
          window.FBInstant.startGameAsync()
          .then(function() {

            var contextId = window.FBInstant.context.getID();
            var contextType = window.FBInstant.context.getType();
            var name  = window.FBInstant.player.getName();
           // FBInstant.player.getPhoto();
           // FBInstant.player.getID();
           // FBInstant.context.getID();
            /*
           window.FBInstant.player.getConnectedPlayersAsync()
           .then(function(players) {
             window._leaderboard.render(players);
           }); 
           */
           /*
           window.FBInstant
            .matchPlayerAsync()
            .then(function() {
              console.log(window.FBInstant.context.getID());
             
            });
           */
          });
      });
    };
  }

  cardImages(i) {
    if(i===1) return "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg";
    if(i===2) return "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg";
    if(i===3) return "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg";
    if(i===4) return "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg";
    if(i===5) return "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg";
  }

  randomCard(){
    const min = 1;
    const max = 15;
    let rand = min + Math.random() * (max-min);
    rand = Math.round(rand);
    if(rand > 7)rand = 1;
    else if(rand > 5)rand = 2;
    else if(rand > 3)rand = 3;
    else if(rand > 1)rand = 4;
    else rand = 5;
    return this.cardImages(rand);
  }
  render(){
    return (
      <>
       <BaseGame />
      </>
    );
  }
  
  
}
export default App;
