<template>
  <div id="app">

    <div class="app-header">
      <app-header text="Whack-A-Mole" />
    </div>
    
    <div class="app-game">
      
      <whack-a-mole
        ref="game" 
        :size="tileSize"
        :stopGame="stopGame"
        v-on:changeState="handleGame"
      />

      <div v-bind:class="gameOverClass" id="app-game-over">GAME OVER</div>
      
      <button v-bind:class="gameStartClass" class="app-game-start" v-on:click="beginGame">
        {{ gameStartText }}
      </button>

    </div>
    
    <div class="app-textbox">
      <app-text-box caption="score" :text="scoreString" />
    </div>

    <div class="app-textbox">
      <app-text-box caption="high" :text="highScoreString" align="center" />
    </div>

    <div class="app-textbox">
      <app-text-box caption="time" :text="timerString" align="right" />
    </div>
    
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppTextBox from './components/AppTextBox.vue';
import WhackAMole from './components/WhackAMole.vue'
import Lib from './lib/utils';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppTextBox,
    WhackAMole,
  },
  data() {
    return {
      tileSize: this.$DEFAULT_SIZE,
      highScore: 0,
      highScoreString: "0000",
      score: 0,
      scoreString: "0000",
      timer: this.$DEFAULT_TIME,
      timerString: "0000",
      startFlag: false,
      tim: null,
      stopGame: false,
      gameOverClass: "",
      gameStartClass: "gamestart-show",
      gameStartText: "Click to Play",
    }
  },
  methods: {
    
    beginGame: function() {
      
      this.startFlag = false;
      this.stopGame = false;
      this.score = 0;
      this.timer = this.$DEFAULT_TIME;
      
      this.scoreString = Lib.formatNumber(this.score);
      this.timerString = Lib.formatNumber(this.timer);

      this.gameOverClass = "";
      this.gameStartClass = "";

      this.$refs.game.startGame();

    },

    endGame: function() {

      setTimeout(() => {
        
        this.gameStartText = "Click to Try Again";
        this.gameOverClass = "gameover-show";
        
        setTimeout(() => {
          
          this.highScore = (this.score > this.highScore)?this.score:this.highScore;
          this.highScoreString = Lib.formatNumber(this.highScore);

          this.gameStartClass = "gamestart-show";

        }, 300)

      }, 200)
    },
    
    handleGame(evt) {

      switch(evt) {
        case 'begin':
          this.startTimer()
          break;
        case 'end':
          this.endGame()
          break;
        default: // evt=hit
          this.score+=10;
          this.scoreString = Lib.formatNumber(this.score);
      }

    },

    startTimer() {
      
      this.tim = setInterval(() => {
        
        this.timer--;
        this.timerString = Lib.formatNumber(this.timer);

        if(this.timer <= 0) {
          
          clearInterval(this.tim)
          this.stopGame = true;

        }

      }, 1000);

    },

  },  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: white;
  position: relative;
  margin: 0px auto;
  width: 305px;
}

.app-header {
  background-color: transparent;
  position: relative;
  width: 305px;
  margin: 0px 0px 10px 0px;
}

.app-game {
  background-color: white;
  position: relative;
  overflow: hidden;
}

.app-textbox {
  position: relative;
  width: 101px;
  margin-top: 5px;
  float: left;
}

.app-game-start {
  border: 1px solid #fff;
  border-radius: 8px;
  background-color: #222;
  position: absolute;
  left: calc((100% - 200px)/2);
  top: calc((100% - 30px)/2);
  width: 200px;
  padding: 5px 0px;
  font-size: 1.1em;
  letter-spacing: 1px;
  color: yellow;
  z-index: 3;
  text-align: center;
  text-shadow: 0px 0px 2px #222;
  user-select: none;
  outline: none;
  display: none;
  animation-name: anim-gamestart-blink;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
}

@keyframes anim-gamestart-blink {
  from {
    color: yellow;
  }
  to {
    color: white;
  }
}

.gamestart-show {
  display: block;
}

#app-game-over {
  background-color: white;
  position: absolute;
  left: calc((100% - 180px)/2);
  top: calc((100% - 180px)/2);
  font-size: 1.2em;
  width: 180px;
  z-index: 2;
  color: #000;
  text-align: center;  
  letter-spacing: 2px;
  cursor: default;
  transform: rotate(-720deg) scale(8.3, 8.3);
  opacity: 0.25;
  display: none;
}

.gameover-show {
    transform: rotate(-720deg) scale(8.3, 8.3);
    opacity: 0.25;
    display: block !important;
    animation-name: anim-gameover-show;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}

@keyframes anim-gameover-show {
    0% {
        transform: rotate(-720deg) scale(8.3, 8.3);
        opacity: 0.25;
    }
    100% {
        transform: rotate(0deg) scale(1, 1);
        opacity: 1.0;
    }
}

</style>
