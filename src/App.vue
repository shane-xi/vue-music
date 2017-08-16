<template>
  <div id="app">
    <m-header></m-header>
    <tab class="tab"></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>  
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
import Tab from '@/components/tab/tab'
export default {
  name: 'app',
  components: {
    'm-header': MHeader,
    'tab': Tab
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
	display: flex;
	flex-direction: column;
	height: 100%;
}
.tab {
	flex-shrink: 0
}
</style>
