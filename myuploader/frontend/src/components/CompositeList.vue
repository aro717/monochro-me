<template>
    <section :key="getKey" id="composites">

        <div id="list">
            <!-- 親ディレクトリの表示 -->
            <div v-if="current.parent" class="parent composite-wrapper" :key="current.parent.pk">
                <Composite :data="current.parent" @click="moveBefore"></Composite>
            </div>
            <div v-else-if="current.pk" class="parent composite-wrapper" :key="-1">
                <Composite :data="{name: 'home', is_dir: 'true'}" @click="moveBefore"></Composite>
            </div>

            <!-- カレントディレクトリの表示 -->
            <div v-if="current.pk" class="current composite-wrapper" :key="current.pk">
                <Composite :data="current" :editableIn="true" @createDir="createDir"
                           @createFile="createFile"></Composite>
            </div>
            <div v-else class="current composite-wrapper" :key="-1">
                <Composite :data="{name: 'home', is_dir: 'true'}" :editableIn="true" @createDir="createDir"
                           @createFile="createFile"></Composite>
            </div>

            <!-- 子ファイル・ディレクトリの表示 -->
            <div class="child composite-wrapper" v-for="composite of current.composite_set" :key="composite.pk">
                <Composite :data="composite"
                           @click="move" @remove="remove"
                           @update="update" :zipUrl="zipUrl(composite)" :editable="true"></Composite>

            </div>
        </div>

        <div id="form">
            <composite-form :selected="selected" @done="reload" @close="close"
                            :key="selected.type + '-' + selected.data.pk"></composite-form>
        </div>

    </section>
</template>

<script>
import Composite from './Composite'
import CompositeForm from './CompositeForm'

export default {
  name: 'composite-list',
  props: {
    path: { type: String }
  },
  components: {
    Composite, CompositeForm
  },
  watch: {
    '$route' () {
      if (this.path) {
        this.getCompositeListFromPath(this.path) // URL内に何かパスがあった
      } else {
        this.getCompositeListTop()
      }
    }
  },
  data () {
    return {
      current: {},
      selected: {
        type: null,
        data: {}
      }
    }
  },
  created () {
    if (this.path) {
      this.getCompositeListFromPath(this.path) // URL内に何かパスがあった
    } else {
      this.getCompositeListTop()
    }
  },
  methods: {
    getCompositeListTop () {
      this.$http(this.$endpoint)
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.current = {
            composite_set: data
          }
        })
    },
    getCompositeListFromPk (pk) {
      this.$http(this.$endpoint + pk + '/')
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.current = data
        })
    },
    getCompositeListFromPath (path) {
      this.$http(this.$endpoint + 'get_composite_from_path/' + path)
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.current = data
        })
    },
    move (composite) {
      const nextPath = this.getNextPath(composite)
      if (!composite.is_dir) {
        window.open(this.$fileUrlBase + nextPath, '_blank')
      } else {
        this.$router.push(nextPath)
        this.getCompositeListFromPk(composite.pk)
      }
    },
    getNextPath (composite) {
      let basePath = this.$route.path
      if (!basePath.endsWith('/')) {
        basePath = basePath + '/'
      }

      let nextPath = basePath + composite.name
      if (composite.is_dir) {
        nextPath = nextPath + '/'
      }
      return nextPath
    },
    getBeforePath () {
      const paths = []
      for (const path of this.$route.path.split('/')) {
        if (path) {
          paths.push(path)
        }
      }
      paths.pop()
      return '/' + paths.join('/') + '/'
    },
    moveBefore () {
      const beforePath = this.getBeforePath()
      this.$router.push(beforePath)
      if (this.current.parent) {
        this.getCompositeListFromPk(this.current.parent.pk)
      } else {
        this.getCompositeListTop()
      }
    },
    update (composite) {
      this.selected.data = composite
      this.selected.type = 'update'
      document.getElementById('form').style.padding = '10px'
    },
    remove (composite) {
      this.selected.data = composite
      this.selected.type = 'delete'
      document.getElementById('form').style.padding = '10px'
    },
    createFile (composite) {
      this.selected.data = {
        is_dir: false,
        parent: composite.pk ? composite.pk : ''
      }
      this.selected.type = 'new'
      document.getElementById('form').style.padding = '10px'
    },
    createDir (composite) {
      this.selected.data = {
        is_dir: true,
        parent: composite.pk ? composite.pk : ''
      }
      this.selected.type = 'new'
      document.getElementById('form').style.padding = '10px'
    },
    zipUrl (composite) {
      return this.$zipUrlBase + composite.pk + '/'
    },
    reload () {
      this.selected.type = null
      this.selected.data = {}
      if (this.current.pk) {
        this.getCompositeListFromPk(this.current.pk)
      } else {
        this.getCompositeListTop()
      }
    },
    close () {
      this.selected.data = {}
      this.selected.type = null
      document.getElementById('form').style.padding = '0px'
    }
  },
  computed: {
    getKey () {
      return `${this.current.pk}`
    }
  }
}
</script>

<style scoped>
    .composite-wrapper {
        margin-bottom: 15px;
    }

    .current {
        background: #75715e;
        padding: 6px;
    }

    .child {
        padding-bottom: 5px;
        border-bottom: solid 1px #75715e;
        border-image: linear-gradient(to right, #75715e 0%, #e6bd74 100%);
        border-image-slice: 1;
        position: relative;
    }

    #form {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(255, 255, 255, 0.9);
        padding: 0px;
    }

    @media (min-width: 1024px) {
        #composites {
            padding-top: 120px;
        }

        .current > .composite {
            margin-left: 25px;
        }

        .child {
            margin-left: 60px;
        }
    }

    @media (min-width: 1366px) {
        #composites {
            padding-top: 120px;
            display: grid;
            grid-template-columns: 700px 1fr;
        }

        #list {
            grid-column: 1;
        }

        #form {
            grid-column: 2;
            justify-self: center;
            margin-top: 100px;
            position: static;
            top: 0;
            left: 0;
            transform: none;
            background-color: transparent;
            padding: 0;
            box-shadow: none;
        }
    }
</style>
