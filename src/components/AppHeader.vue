<template>
    <header class="app-header">
        <span v-bind:class="item.hilite" v-for="(item, index) in this.getHeaderText()" :key="index">
        {{item.text}}
        </span>
    </header>
</template>

<script>
export default {
    name: "AppHeader",
    props: {
        text: {
            type: String,
            default: 'header',
        },
    },
    methods: {
        getHeaderText: function() {
            return this.text.split('').map((item) => {
                let hilite = '';
                if(item.indexOf('-') < 0) {
                    hilite = ('ao').indexOf(item.toLowerCase())>=0?'header-red':'header-normal';
                }
                return {
                    text: item,
                    hilite: hilite,
                }
            })
        },
    },
}
</script>

<style scoped>
.app-header {
    position: relative;
    text-align: center;
}
span {    
    text-transform: uppercase;
    color: #000;
    margin: 0px 0px 0px 1px;
    padding: 0px 0px 0px 5px;
    font-weight: 600;
}
span.header-red {
    background-color: #f00;
    padding: 5px 3px 7px 5px;
    font-size: 1.1em;
    color: #fff;
    border-radius: 3px;
}
span.header-normal {
    background-color: #000;
    padding: 5px 3px 5px 5px;
    font-size: 0.9em;
    color: #fff;
    border-radius: 3px;
}
</style>