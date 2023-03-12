<script>
import calendar from '@/assets/calendar.js'
import { ref, computed } from 'vue'

export default {
  name: 'schedule-form',
  setup (_, context) {
    const { route, loadCategory, saveJson } = calendar()
    const categories = ref([])

    const load = async () => {
      categories.value = await loadCategory()
      categories.value = formatOptions(categories.value)
    }
    load()

    const formatOptions = (json) => {
      const options = []
      json.forEach((element) => {
        options.push({ text: element.name, value: element.pk })
      })
      return options
    }

    const forms = ref([{
      id_for_label: 'summary',
      label_tag: '概要',
      form: {
        id: 'summary',
        data: '',
        type: 'text',
        class: 'text',
        errors: ''
      }
    },
    {
      id_for_label: 'categories',
      label_tag: 'カテゴリ',
      form: {
        id: 'category_pk',
        data: null,
        type: 'select',
        options: categories,
        class: 'select',
        errors: ''
      }
    },
    {
      id_for_label: 'description',
      label_tag: '詳細な内容',
      form: {
        id: 'description',
        data: '',
        type: 'textarea',
        class: 'textarea',
        errors: ''
      }
    },
    {
      id_for_label: 'start_time',
      label_tag: '開始時間',
      form: {
        id: 'start_time',
        data: null,
        type: 'text',
        class: 'text',
        errors: ''
      }
    },
    {
      id_for_label: 'end_time',
      label_tag: '終了時間',
      form: {
        id: 'end_time',
        data: null,
        type: 'text',
        class: 'text',
        errors: ''
      }
    }])

    const cleanEndTime = () => {
      return 'hoge'
    }

    const selectedDate = computed(() => {
      const year = route.params.year
      const month = ('00' + route.params.month).slice(-2)
      const day = ('00' + route.params.day).slice(-2)
      return year + '-' + month + '-' + day
    })

    const makeData = () => {
      const formData = { date: selectedDate.value }
      forms.value.forEach((element) => {
        formData[element.form.id] = element.form.data
      })
      return formData
    }

    const add = () => {
      const success = saveJson(makeData())
      if (success) {
        context.emit('reload')
      }
    }

    return { selectedDate, categories, forms, cleanEndTime, add }
  }
}
</script>

<template>
  <form @submit.prevent="add">
    <div v-for="field of forms" :key="field">
      <label for="{{field.id_for_label}}">{{field.label_tag}}</label>
      <div v-if="field.form.type === 'text'">
        <input type="{{field.form.type}}" id=field.form.id v-model=field.form.data :class=field.form.class />
      </div>
      <div v-else-if="field.form.type === 'textarea'">
        <textarea id=field.form.id v-model=field.form.data :class=field.form.class></textarea>
      </div>
      <div v-else-if="field.form.type === 'select'">
        <select v-model=field.form.data>
          <option v-for="option of field.form.options" :value="option.value" :key="option">
            {{option.text}}
          </option>
        </select>
      </div>
    </div>
    <button type="submit">送信</button>
  </form>
</template>

<style scoped>
.text {
  width: 100%;
}
.textarea {
  width: 100%;
  line-height: 1;
  height: calc( 1em * 5 );
}
</style>
