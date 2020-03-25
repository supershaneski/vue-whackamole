<template>
    <div class="whackamole-container" :style="cssProps">
        <game-panel-item
            v-for="(item, index) in itemList" 
            v-bind:key="index" 
            v-on:click="handleClick(index)"
            v-on:hide="handleHide(index)"
            :ref="item.name"
            :src="item.src" 
            :size="size"
            :status="endGame"
        />
    </div>
</template>

<script>
import GamePanelItem from './GamePanelItem.vue';
import Lib from '../lib/utils';

export default {
    name: 'WhackAMole',    
    props: {
        size: { 
            type: Number,
            default: 50,
        },
        stopGame: {
            type: Boolean,
            default: false,
        },
    },

    components: {
        GamePanelItem,
    },

    data() {
        return {
            itemList: [],
            endGame: false,
            timer: null,
            interval: this.$DEFAULT_INTERVAL,
            counter: 0,
            itemCount: 1,
        }
    },

    created() {
        for(var i = 0; i < 16; i++) {
            this.itemList.push({
                src: '/mole.jpg',
                name: "item" + i,
                index: i,
                state: 0
            })
        }
    },

    beforeDestroy() {
        clearTimeout(this.timer)
    },

    methods: {

        startGame: function() {
            
            this.endGame = false;
            this.interval = this.$DEFAULT_INTERVAL;
            this.counter = 0;
            this.itemCount = 1;
            this.$emit('changeState', 'begin');
            
            this.timer = setTimeout(() => {

                this.doGame()
                
            }, this.interval)

        },

        doGame: function() {

            clearTimeout(this.timer);
            this.counter++;
            
            const freelist = this.itemList.filter((item) => {
                return item.state === 0;
            })

            if(freelist.length === 0 || this.stopGame) {
                
                this.endGame = true;
                this.$emit('changeState', 'end');

            } else {

                let arrIndex = [];
                let i = 0;
                while(i < freelist.length) {
                    arrIndex.push(i);
                    i++;
                }
                Lib.shuffleArray(arrIndex);
                
                i = 0;
                while(i < this.itemCount) {                    
                    const select = arrIndex[i];
                    const index = freelist[select].index;
                    this.itemList[index].state = 1;
                    this.$refs['item' + index][0].showPanel();
                    i++;
                }
                
                if((this.counter % 30) === 0) {
                    this.itemCount++;
                    this.itemCount = (this.itemCount > 3)?3:this.itemCount;

                    this.interval = this.interval - 100;
                    this.interval = (this.interval < 200)?200:this.interval;
                }

                this.timer = setTimeout(() => {
                    this.doGame()
                }, this.interval)

            }

            
        },

        handleHide(n) {

            if(this.endGame) return;

            setTimeout(() => {

                if(this.endGame) return;

                this.itemList[n].state = 0;

            }, 500)

        },

        handleClick(n) {
            
            if(this.endGame) return;

            this.$emit('changeState', 'hit');

            setTimeout(() => {

                if(this.endGame) return;
                this.itemList[n].state = 0;

            }, 200)
            
        }
    },

    computed: {
        cssProps() {
            return {
              '--container-size': ((this.size * 4)+5) + "px",
              '--item-size': (this.size) + "px",
            }
        }
    }
}
</script>

<style scoped>
.whackamole-container {
    border: 1px solid #fff;
    background-color: #fff;
    position: relative;
    width: var(--container-size);
    height: var(--container-size);
    overflow: hidden;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fill, var(--item-size));
    grid-auto-rows: var(--item-size);
    grid-gap: 1px 1px;
    z-index: 1;
}
</style>
