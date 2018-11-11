<template>
    <div id='app'>
        <v-app dark>
            <v-content>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </v-content>

            <v-footer app height='56px'>
                <v-btn absolute dark fab top right color="pink" 
                    v-on:click.native='addEvent()'>
                    <v-icon>add</v-icon>
                </v-btn>
                <v-bottom-nav :active.sync='activeBtn' :value='true' absolute color='transparent'>
                    <v-btn flat color='teal' v-on:click.native='navigateToURL("summary")'>
                        <span>Summary</span>
                        <v-icon>home</v-icon>
                    </v-btn>
                    <v-btn flat color='teal'  v-on:click.native='navigateToURL("timeline")'>
                        <span>Timeline</span>
                        <v-icon>waves</v-icon>
                    </v-btn>
                    <v-btn flat color='teal'  v-on:click.native='navigateToURL("settings")'>
                        <span>Settings</span>
                        <v-icon>settings</v-icon>
                    </v-btn>
                </v-bottom-nav>
            </v-footer>
        </v-app>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import EventDataNode from './models/eventdatanode';
import TimerUtil from './utils/timerutil';
import UniqueIDUtil from './utils/uniqueidutil';
import MONTH from './constants/month';
import EVENTTYPE from './constants/eventtype';


@Component
export default class App extends Vue {
  private activeBtn: number;
  constructor() {
      super();
      this.activeBtn = 0;
      this._initStore();
      TimerUtil.beginTimer();
  }
  public navigateToURL(path: string) {
      this.$router.push({path});
  }
  public addEvent() {
      const getRandomNumber = (min: number, max: number)=> {
          return Math.floor(Math.random()*(max-min+1)+min);
      }
      const getRandomEventType = () => {
          switch(getRandomNumber(0,2)){
              case 0: return EVENTTYPE.NONE;
              case 1: return EVENTTYPE.BIRTHDAY;
              case 2: return EVENTTYPE.ANNIVERSARY;
          }
      } 
      this.$store.dispatch('addEvent',
        new EventDataNode(UniqueIDUtil.generate(), 'Random', 
        new Date(
                getRandomNumber(1970, 2018), 
                getRandomNumber(0,11),
                getRandomNumber(1,28),
                getRandomNumber(0,23),
                getRandomNumber(0,59)
            ),
            getRandomEventType()
            ));
  }
  private _initStore() {
    this.$store.dispatch('initList', [
        new EventDataNode(UniqueIDUtil.generate(), 'Asif', new Date(1983, MONTH.DEC, 25, 12, 25), EVENTTYPE.BIRTHDAY),
        new EventDataNode(UniqueIDUtil.generate(), 'Shameeha', new Date(1994, MONTH.DEC, 29), EVENTTYPE.BIRTHDAY),
        new EventDataNode(UniqueIDUtil.generate(), 'Asif - Shameeha', new Date(1994, MONTH.DEC, 29), EVENTTYPE.ANNIVERSARY),
        new EventDataNode(UniqueIDUtil.generate(), 'Ahmed', new Date(1945, MONTH.SEP, 10), EVENTTYPE.BIRTHDAY),
        new EventDataNode(UniqueIDUtil.generate(), 'Nafeesa', new Date(1958, MONTH.JUN, 21), EVENTTYPE.BIRTHDAY),
        new EventDataNode(UniqueIDUtil.generate(), 'Ahmed - Nafeesa', new Date(1976, MONTH.MAY, 12), EVENTTYPE.ANNIVERSARY),

        new EventDataNode(UniqueIDUtil.generate(), 'JAN', new Date(1976, MONTH.JAN, 12), EVENTTYPE.ANNIVERSARY),
        new EventDataNode(UniqueIDUtil.generate(), 'FEB', new Date(1976, MONTH.FEB, 12), EVENTTYPE.ANNIVERSARY),
        new EventDataNode(UniqueIDUtil.generate(), 'MAR', new Date(1976, MONTH.MAR, 12), EVENTTYPE.ANNIVERSARY),
        new EventDataNode(UniqueIDUtil.generate(), 'APR', new Date(1976, MONTH.APR, 12), EVENTTYPE.ANNIVERSARY),
        new EventDataNode(UniqueIDUtil.generate(), 'MAY', new Date(1976, MONTH.MAY, 12), EVENTTYPE.ANNIVERSARY),
        new EventDataNode(UniqueIDUtil.generate(), 'JUN', new Date(1976, MONTH.JUN, 12), EVENTTYPE.ANNIVERSARY),
        new EventDataNode(UniqueIDUtil.generate(), 'JUL', new Date(1976, MONTH.JUL, 12), EVENTTYPE.ANNIVERSARY),
        new EventDataNode(UniqueIDUtil.generate(), 'AUG', new Date(1976, MONTH.AUG, 12), EVENTTYPE.ANNIVERSARY),
        new EventDataNode(UniqueIDUtil.generate(), 'SEP', new Date(1976, MONTH.SEP, 12), EVENTTYPE.ANNIVERSARY),
        new EventDataNode(UniqueIDUtil.generate(), 'OCT', new Date(1976, MONTH.OCT, 12), EVENTTYPE.ANNIVERSARY),
        new EventDataNode(UniqueIDUtil.generate(), 'NOV', new Date(1976, MONTH.NOV, 12), EVENTTYPE.ANNIVERSARY),
        new EventDataNode(UniqueIDUtil.generate(), 'DEC', new Date(1976, MONTH.DEC, 12), EVENTTYPE.ANNIVERSARY),

        ]);
    }
}
</script>


<style lang='scss'>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
