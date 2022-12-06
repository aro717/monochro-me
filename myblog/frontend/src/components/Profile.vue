<template>
  <div id="profile_container" class="container">
    <header>
      <nav id="back"><a @click="goBack" title="前ページへ戻る"><img src="@/assets/back.png"></a></nav>
    </header>
    <div id="main">
      <figure>
        <img :src="site.avatar" :alt="site.name" class="avatar"/>
      </figure>
      <h2>名前: {{ site.author }}</h2>
      <div id="profile_description">
        <p>生年: {{ dayjs(site.birthdate) }}</p>
        <!-- <p>年齢: {{ age }}歳</p> -->
        <p>職業: {{ site.job }}</p>
        <p>{{ site.description }}</p>
      </div>
      <div id="social">
        <ul>
          <li v-if="site.email"><a :href="`mailto:${site.email}`">
            <img src="@/assets/mail_logo.svg"/>
          </a></li>
          <li v-if="site.twitter"><a :href="site.twitter">
            <!-- <img src="@/assets/twitter_logo.svg"/> -->
          </a></li>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'profile',
  data () {
    return {
      age: 0,
      hasBefore: false
    }
  },
  props: {
    site: null
  },
  beforeRouteEnter (to, from, next) {
    next(component => {
      if (from.name) {
        component.hasBefore = true
      }
    })
  },
  created () {
    this.initAge(this.site.birthdate)
  },
  methods: {
    goBack () {
      if (this.hasBefore) {
        this.$router.go(-1)
      } else {
        this.$router.push({ name: 'posts' })
      }
    },
    initAge (birthdate) {
      this.age = dayjs().diff(birthdate, 'year')
    },
    dayjs: function (date) {
      return dayjs(date).format('YYYY')
    }
  }
}
</script>

<style scoped>
header {
  margin-bottom: 80px;
}

#back {
  margin-bottom: 80px;
}

#back a {
  cursor: pointer;
  width: 44px;
  display: inline-block;
}

#profile_container {

}

ul > li {
  display: inline-block;
  margin-right: 2em;
}

ul a {
  /* color: #f8f8f2; */
  text-decoration: none;
}

ul >>> img {
  width: 50px;
}

@media (min-width: 768px) {
  #profile_container {
    width: 650px;
    grid-template-columns: 150px 500px;
    display: grid;
  }

  #main {

  }
}

@media (min-width: 1024px) {
  #profile_container {
    display: grid;
  }
}
</style>
