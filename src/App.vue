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
                    <v-btn flat color='teal' v-on:click.native='navigateToURL(ROUTE_SUMMARY)'>
                        <span>Summary</span>
                        <v-icon>home</v-icon>
                    </v-btn>
                    <v-btn flat color='teal'  v-on:click.native='navigateToURL(ROUTE_TIMELINE)'>
                        <span>Timeline</span>
                        <v-icon>waves</v-icon>
                    </v-btn>
                    <v-btn flat color='teal'  v-on:click.native='navigateToURL(ROUTE_SETTINGS)'>
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
import TimerUtil from './utils/timerutil';
import StoreHelper from './utils/storehelper';

@Component
export default class App extends Vue {
  private ROUTE_SUMMARY = 'summary';
  private ROUTE_TIMELINE = 'timeline';
  private ROUTE_SETTINGS = 'settings';
  private activeBtn: number;
  constructor() {
      super();
      this.activeBtn = 0;
      this._initStore();
      TimerUtil.beginTimer();
  }
  public mounted() {
      this.$router.beforeEach((to, from) => {
          switch (to.name) {
            default: // fallsthrough
            case this.ROUTE_SUMMARY: this.activeBtn = 0; break;
            case this.ROUTE_TIMELINE: this.activeBtn = 1; break;
            case this.ROUTE_SETTINGS: this.activeBtn = 2; break;
        }
      });
  }
  public navigateToURL(path: string) {
      this.$router.push({path});
  }
  public addEvent() {
     StoreHelper.addRandomEvent();
  }
  private _initStore() {
      StoreHelper.initialize(this.$store);
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
