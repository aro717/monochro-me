<script>
import { ref, watch, onMounted, inject, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Render from '@/assets/render'
import dayjs from 'dayjs'

export default {
  name: 'post',
  props: {
    id: { type: Number }
  },
  setup (props, context) {
    const $http = inject('$http')
    const $httpPosts = inject('$httpPosts')
    const $httpSite = inject('$httpSite')
    const router = useRouter()
    const route = useRoute()
    const toc = ref(null)
    const maintext = ref(null)
    const post = ref()
    const hasBefore = false

    // const site = async (url) => {
    //   const response = await $http($httpSite)
    //   const site = await response.json()
    //   return site
    // }

    const site = ref([])

    const getSite = async () => {
      const response = await $http($httpSite)
      const data = await response.json()
      site.value = data[0]
    }

    getSite()

    const goBack = () => {
      if (hasBefore) {
        router.go(-1)
      } else {
        router.push({ name: 'posts' })
      }
    }

    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    const moveToc = () => {
      toc.value.innerHTML = maintext.value.firstChild.innerHTML
    }

    const dayjs_ = (date) => {
      return dayjs(date).format('YYYY/MM/DD')
    }

    const move = (item) => {
      context.emit('relation-post', item)
    }

    const fetchItems = async (id) => {
      if (id !== undefined) {
        const response = await $http(`${$httpPosts}${id}/`, { credentials: 'include' })
        const data = await response.json()
        post.value = data
        document.title = `${data.title} - ${site.value.title}`
        document.querySelector('meta[name="description"]').setAttribute('content', data.lead_text)
        nextTick(() => {
          Render.hljs.highlightAll()
          Render.renderMathJax()
          moveToc()
        })
      }
    }

    watch(route, (to, from) => {
      fetchItems(to.params.id)
    })

    onMounted(async () => {
      const response = await $http(`${$httpPosts}${props.id}/`, { credentials: 'include' })
      const data = await response.json()
      post.value = data
      document.title = `${data.title} - ${site.value.title}`
      document.querySelector('meta[name="description"]').setAttribute('content', data.lead_text)
      nextTick(() => {
        Render.hljs.highlightAll()
        Render.renderMathJax()
        moveToc()
      })
    })

    return { post, goBack, scrollTop, dayjs_, move, toc, maintext }
  },
  beforeRouteEnter (to, from, next) {
    next(component => {
      if (from.name) {
        component.hasBefore = true
      }
    })
  }
}
</script>

<template>
  <article :key="id" class="container" v-if="post">
    <header>
      <nav id="back"><a @click="goBack" title="前ページへ戻る"><img src="@/assets/back.png"></a></nav>
      <span class="post-date">
        <span class="post-is_public" v-if="!post.is_public">非公開</span>
        {{dayjs_(post.created_at)}}
      </span>
      <h1 class="post-title">{{post.title}}</h1>
      <p class="post-category" :style="{'color': post.category.color}">{{post.category.name}}</p>
    </header>
    <div id="main">
      <nav id="toc" ref="toc"></nav>
      <div id="post-main" ref="maintext" v-html="post.main_text"></div>
    </div>
    <div id="relation-posts">
      <h1 class="title">関連記事</h1>
      <div class="relation-post" v-for="item in post.relation_posts" :key="item">
        <h2><router-link :to="{name: 'detail', params: {id: item.id}}">{{item.title}}</router-link></h2>
        <p>{{ item.lead_text }}</p>
        <p>{{dayjs_(item.created_at)}}</p>
        <p class="relation-post-category" :style="{'color': post.category.color}">{{item.category.name}}</p>
      </div>
    </div>
    <hr class="divider">
    <nav id="top"><a @click="scrollTop" title="一番上まで戻る"><img src="@/assets/ue.png"></a></nav>
  </article>
</template>

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

#top a {
  cursor: pointer;
  color: #999;
  display: inline-block;
  width: 44px;
}

.post-category {
  font-size: 20px;
}

.post-is_public {
  background-color: #75715e;
  font-size: 12px;
}

.post-date {
  margin-left: -5px;
  padding-left: 5px;
  border-left: solid 2px #f92672;
}

.post-title {
  font-weight: bold;
  font-size: 28px;
  margin-left: -5px;
  padding-left: 5px;
  border-left: solid 2px #fd971f;
}

.divider {
  margin-top: 80px;
  margin-bottom: 80px;
  width: 100%;
  height: 1px;
  border: none;
  background-color: #ccc;
}

#post-main {
  width: 100%;
  line-height: 2;
}

#toc >>> a {
  font-size: 12px;
  color: #a6e22e;
  text-decoration: none;
}

#post-main >>> > * {
  margin-bottom: 1.5em;
}

#post-main >>> div.toc + * {
  margin-top: 0;
}

#post-main >>> h1 {
  border-image: linear-gradient(to right, #e6bd74 0%, #75715e 100%) 1/0 0 1px 0;
  border-style: solid;
  position: relative;
}
/*
#post-main >>> h1:after {
  position: absolute;
  content: '';
  display: block;
  border-bottom: solid 1px #75715e;
  bottom: -1px;
  width: 30%;
}
*/
#post-main >>> > h2 {
  padding-left: 5px;
  border-image: linear-gradient(to bottom, #e6bd74 0%, #75715e 100%) 1/0 0 0 3px;
  border-style: solid;
  font-weight: bold;
  font-size: 20px;
  line-height: 1.5;
  margin-top: 50px;
  margin-bottom: 21px;
}

#post-main >>> img {
  max-width: 100%;
  height: auto;
  box-shadow: 0 0 5px #ccc;
}

#post-main >>> strong {
  color: #66d9ef;
}

#post-main >>> div.toc {
  display: none;
}

#post-main >>> p {
  text-indent: 1em;
}

#post-main >>> a {
  color: #f92672;
}

#post-main >>> blockquote {
  color: #e6bd74;
  padding-left: 5px;
  border-left: solid 3px #75715e;
}

#post-main >>> pre {
  border: solid 1px #000000;
  /*padding-left: 10px;*/
}

#toc {
  display: none;
}

#post-main >>> .rotate {
  display: inline-block;
  transform: rotate(-90deg);
}

#post-main >>> .thmbox {
  position: relative;
  margin: 2em 0;
  padding: 0.5em 1em;
  border: solid 2px #ae81ff;
}

#post-main >>> .thmbox .title{
  position: absolute;
  display: inline-block;
  top: -13px;
  left: 10px;
  padding: 0 9px;
  line-height: 1;
  font-size: 16px;
  background: #272822;
  font-weight: bold;
}

#relation-posts >>> a {
  color: #f92672;
}

#relation-posts >>> h1 {
  margin-top: 100px;
  margin-bottom: 10px;
  border-bottom: solid 1px #ccc;
  padding-bottom: 10px;
}

#relation-posts >>> .relation-post {
  margin-bottom: 10px;
  padding-left: 10px;
}

@media (min-width: 768px) {
  #post-main {
    width: 650px;
  }
}

@media (min-width: 1024px) {
  #main {
    display: grid;
    grid-template-columns: 150px 650px;
    column-gap: 50px;
  }

  #toc {
    grid-column: 1;
    display: block;
    align-self: start;
    position: sticky;
    top: 20px;
  }

  #post-main {
    grid-column: 2;
  }
}
</style>
