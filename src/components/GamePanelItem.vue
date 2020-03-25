<template>
    <div class="gamepanel-item-container" :style="cssProps">
        <div v-bind:class="panelClass" class="gamepanel-item">
            <img v-on:click="handleClick" class="gamepanel-item-image" :src="src" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'GamePanelItem',
    props: {
        src: {
            type: String,
            default: "",
        },
        size: {
            type: Number,
            default: 100,
        },
        status: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            panelClass: "",
        }
    },
    methods: {

        handleClick: function() {
            
            if(this.status) return;
            
            const audio = new Audio('/zap.mp3');
            audio.play();

            this.panelClass = "gamepanel-item-click";
            this.$emit('click');

        },

        showPanel: function() {
            
            this.panelClass = "gamepanel-item-show";

            setTimeout(() => {
                if(this.panelClass.indexOf("show") < 0) return;
                
                this.panelClass = "gamepanel-item-hide";
                
                setTimeout(() => {
                    this.$emit('hide');
                }, 200);

            }, 500)

        },
  },

  computed: {
      cssProps() {
          return {
              '--panel-size': (this.size) + "px",
          }
      }
  },
}
</script>

<style scoped>
.gamepanel-item-container {
    background-color: #222;
    position: relative;
    width: var(--panel-size);
    height: var(--panel-size);
    overflow: hidden;
    box-sizing: border-box;
}

.gamepanel-item {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    transform: scale(0, 0);
    cursor: pointer;
}

.gamepanel-item-image {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
}

.gamepanel-item-show {
    transform: rotate(0deg) scale(0, 0);
    opacity: 1.0;
    animation-name: anim-gamepanel-show;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
}

.gamepanel-item-hide {
    transform: rotate(0deg) scale(1.0, 1.0);
    opacity: 1.0;
    animation-name: anim-gamepanel-hide;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
}

.gamepanel-item-click {
    transform: scale(1.0, 1.0);
    opacity: 1.0;
    animation-name: anim-gamepanel-click;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
}

@keyframes anim-gamepanel-click {
    0% {
        transform: scale(1.0 1.0);
        opacity: 1.0;
    }
    99% {
        transform: scale(5.0, 5.0);
        opacity: 0;
    }
    100% {
        transform: scale(0, 0);
        opacity: 0;
    }
}

@keyframes anim-gamepanel-hide {
    0% {
        transform: rotate(0deg) scale(1.0 1.0);
    }
    100% {
        transform: rotate(720deg) scale(0, 0);
    }
}

@keyframes anim-gamepanel-show {
    from {
        transform: scale(0, 0);
    }
    to {
        transform: scale(1.0, 1.0);
    }
}
</style>
