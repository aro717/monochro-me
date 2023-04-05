<script>
import Header from './components/Header'
import Footer from './components/Footer'
// import Side from './components/Side'

export default {
  name: 'app',
  components: { Header, Footer }
  // components: { Header, Footer, Side }
}
</script>

<template>
  <div id="app">
    <Header/>
    <main>
      <router-view v-slot="{ Component }">
        <transition appear>
          <component :is="Component"/>
        </transition>
      </router-view>
      <!-- <Side/> -->
    </main>
    <Footer/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

main {
  min-height: calc(100vh - 290px);
  display: grid;
  grid-template-columns: 20px 1fr 20px;
}

main > * {
  grid-column: 2;
}

/*Side {
  display: none;
  grid-column: 3;
  margin-left: 20px;
}*/

body {
  background-color: #272822;
  color: #f8f8f2;
  font-family: fot-tsukuardgothic-std, sans-serif;
  line-height: 1.5;
  font-size: 14px;
}

.v-enter-active {
  transition: opacity 1s;
}

.v-enter {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-leave, .v-leave-active, .v-leave-to {
  opacity: 0;
}

.container {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  main {
    grid-template-columns: 1fr 540px 160px 1fr;
  }

  /*Side {
    display: block;
  }*/

  .container {
    width: 540px;
    padding: 0;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) {
  main {
    grid-template-columns: 1fr 820px 160px 1fr;
  }

  .container {
    width: 820px;
  }
}
</style>
