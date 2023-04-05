<script>
import { computed, watch, onMounted, inject, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { UPDATE_POSTS } from '@/store/mutation-types'
import Render from '@/assets/render'
import dayjs from 'dayjs'

export default {
  name: 'post-list',
  setup () {
    const $http = inject('$http')
    const $httpPosts = inject('$httpPosts')
    const $httpSite = inject('$httpSite')
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const site = async (url) => {
      const response = await $http($httpSite)
      const site = await response.json()
      return site
    }

    const getPosts = async () => {
      let postURL = $httpPosts
      const params = route.query
      const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&')
      if (queryString) {
        postURL += '?' + queryString
      }
      const response = await $http(postURL, { credentials: 'include' })
      const data = await response.json()
      store.dispatch(UPDATE_POSTS, data)
      nextTick(() => Render.renderMathJax())
    }

    getPosts()
    // ルートパラメータが変化したとき
    watch(route, () => getPosts())

    const dayjs_ = (date) => {
      return dayjs(date).format('YYYY/MM/DD')
    }

    const postList = computed(() => store.getters.postList)
    const postCount = computed(() => store.getters.postCount)
    const postRangeFirst = computed(() => store.getters.postRangeFirst)
    const postRangeLast = computed(() => store.getters.postRangeLast)
    const postCurrentPageNumber = computed(() => store.getters.postCurrentPageNumber)
    const hasPrevious = computed(() => store.getters.hasPrevious)
    const hasNext = computed(() => store.getters.hasNext)
    const getPreviousURL = computed(() => store.getters.getPreviousURL)
    const getNextURL = computed(() => store.getters.getNextURL)

    const getPostPreviousURL = computed(() => {
      const url = new URL(getPreviousURL.value)
      const keyword = url.searchParams.get('keyword') || ''
      const category = url.searchParams.get('category') || ''
      const page = url.searchParams.get('page') || 1
      return router.resolve({
        name: 'posts',
        params: { keyword, category, page }
      }).fullPath
    })

    const getPostNextURL = computed(() => {
      const url = new URL(getNextURL.value)
      const keyword = url.searchParams.get('keyword') || ''
      const category = url.searchParams.get('category') || ''
      const page = url.searchParams.get('page') || 1
      return router.resolve({
        name: 'posts',
        query: { keyword, category, page }
      }).fullPath
    })

    const getKey = computed(() => {
      return `${postCurrentPageNumber.value} ${route.query.keyword} ${route.query.category}`
    })

    onMounted(() => {
      document.title = site.title
      document.querySelector('meta[name="description"]').setAttribute('content', site.subtitle)
    })

    return { dayjs_, postList, postCount, postRangeFirst, postRangeLast, postCurrentPageNumber, hasPrevious, hasNext, getPostPreviousURL, getPostNextURL, getKey }
  }
}
</script>

<template>
  <div :key="getKey" class="container">
    <p id="lead">{{postCount}}件中 {{postRangeFirst}}~{{postRangeLast}}件を一覧表示</p>
    <section>
      <router-link :to="{name: 'detail', params: {id: post.id}}" v-for="post of postList" :key="post.id" class="post">
        <article>
          <figure>
            <img :src="post.thumbnail" :alt="post.title" class="thumbnail">
          </figure>
          <span class="post-date">
            <span class="post-is_public" v-if="!post.is_public">非公開</span>
            {{dayjs_(post.created_at)}}
          </span>
          <h2 class="post-title">{{post.title}}</h2>
          <p class="post-category" :style="{'color': post.category.color}">{{post.category.name}}</p>
          <p class="post-lead">{{post.lead_text}}</p>
        </article>
      </router-link>
    </section>
    <hr class="divider">
    <nav id="page">
      <router-link v-if="hasPrevious" :to="getPostPreviousURL" id="back"><img src="@/assets/back.png"></router-link>
      <span>Page {{postCurrentPageNumber}}</span>
      <router-link v-if="hasNext" :to="getPostNextURL" id="next"><img src="@/assets/next.png"></router-link>
    </nav>
  </div>
</template>

<style scoped>
#lead {
  color: #e6bd74;
}

section {
  margin-top: 80px;
}

.thumbnail{
  width: 100%;
  height: auto;
  vertical-align: bottom;
}

.post {
  color: #f8f8f2;
  text-decoration: none;
  margin-bottom: 80px;
  display: block;
}

.post-title {
  font-weight: bold;
  font-size: 16px;
  width: 100%;
  margin-left: -5px;
  padding-left: 5px;
  border-left: solid 2px #fd971f;
}

.post-category {
  margin-top: 5px;
  font-size: 12px;
}

.post-lead {
  margin-top: 10px;
  width: 100%;
  overflow-wrap: break-word;
}

.post-date {
  margin-top: 10px;
  font-size: 12px;
  margin-left: -5px;
  padding-left: 5px;
  border-left: solid 2px #f92672;
}

.post-is_public {
  background-color: #75715e;
  margin-top: 10px;
  font-size: 12px;
}

.divider {
  margin-top: 50px;
  margin-bottom: 25px;
  width: 100%;
  height: 1px;
  border: none;
  background-color: #ccc;
}

#page {
  color: #e6bd74;
}

#back {
  width: 44px;
  margin-right: 16px;
  display: inline-block;
}

#next {
  margin-left: 44px;
  width: 44px;
  display: inline-block;
}

@media (min-width: 768px) {
  section {
    display: grid;
    grid-template-columns: 260px 260px;
    column-gap: 20px;
    row-gap: 100px;
  }

  .thumbnail {
    width: 260px;
    height: 260px;
    object-fit: cover;
  }

  .post {
    margin-bottom: 0;
  }

  .post-title {
    width: 215px;
  }

  .post-lead {
    width: 215px;
  }

  .divider {
    width: 650px;
  }
}

@media (min-width: 1024px) {
  section {
    grid-template-columns: 400px 400px;
  }

  .thumbnail {
    width: 400px;
    height: 400px;
  }

  .post-title {
    width: 360px;
  }

  .post-lead {
    width: 360px;
  }
}
</style>
