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
                <v-bottom-nav :active.sync='activeBtn' :value='showNav' absolute color='transparent'>
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

@Component
export default class App extends Vue {
  private activeBtn: number;
  private showNav: boolean;
  constructor() {
      super();
      this.activeBtn = 0;
      this.showNav = true;
      TimerUtil.beginTimer();
      this.$store.dispatch('initList', [
        new EventDataNode('Asif', new Date(1983, 12, 25)),
        new EventDataNode('Shameeha', new Date(1994, 12, 29)),
        new EventDataNode('Shameeha2', new Date(1994, 12, 29)),
        new EventDataNode('Shameeha3', new Date(1994, 12, 29)),
        new EventDataNode('Shameeha4', new Date(1994, 12, 29)),
        new EventDataNode('Shameeha5', new Date(1994, 12, 29)),
        new EventDataNode('Shameeha6', new Date(1994, 12, 29)),
        new EventDataNode('Shameeha7', new Date(1994, 12, 29)),
        new EventDataNode('Shameeha8', new Date(1994, 12, 29)),
        new EventDataNode('Shameeha9', new Date(1994, 12, 29))]);
  }
  public navigateToURL(path: string) {
      this.$router.push({path});
  }
  public addEvent() {
      this.$store.dispatch('addEvent', new EventDataNode('Asif', new Date(1983, 12, 25)));
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
