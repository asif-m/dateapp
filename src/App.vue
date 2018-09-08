<template>
    <div id='app'>
        <v-app dark>
            <v-content>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </v-content>

            <v-footer app height='56px'>
                <v-bottom-nav :active.sync='activeBtn' :value='showNav' absolute color='transparent'>
                    <v-btn flat color='teal'>
                        <span>Summary</span>
                        <v-icon>home</v-icon>
                    </v-btn>
                    <v-btn flat color='teal'>
                        <span>Timeline</span>
                        <v-icon>waves</v-icon>
                    </v-btn>
                    <v-btn flat color='teal'>
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

@Component
export default class App extends Vue {
  @Prop() private activeBtn: number;
  @Prop() private showNav: boolean;
  constructor() {
    super();
    this.activeBtn = 1;
    this.showNav = true;
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
