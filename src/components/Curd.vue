<template>
  <div>
    <div class="header">
      <div class="form-group">
        <label>Search</label>
        <input type="text" class="search-input" v-model="searchQuery" />
      </div>
    </div>
    <div class="container">
      <table-component :data-list="people" :columns="columns" :item="item" :search-key="searchQuery" @openEditItemDialog="openEditItemDialog"></table-component>
    </div>
    <div class="container">
      <button class="btn" @click="openNewItemDialog('Create new item')">Create</button>
    </div>
    <modal-dialog :title="title" :index="index" :mode="mode" :show="showDialog" :fields="columns" :item="item" @on-state-change="handleStateChange" @create-item="handleCreateItem">
    </modal-dialog>
  </div>
</template>
<script>
import Table from './Table'
import Dialog from './Dialog'
import Store from './store'

var bus = new Vue()
export default {
  data() {
    return {
      title: '',
      mode: 0,
      index: '',
      item: {},
      showDialog: false,
      searchQuery: '',
      columns: [{
        name: 'name'
      }, {
        name: 'age'
      }, {
        name: 'sex',
        dataSource: ['Male', 'Female']
      }],
      people:Store.fetch()
    }
  },
  components: {
    'table-component': Table,
    'modal-dialog': Dialog
  },
   watch: {
    people: {
      deep: true,
      handler: function (people){
        Store.save(people)
      }
    }
  },
  created() {
  },
  methods: {
    openNewItemDialog(title) {
      this.item = {}
      this.mode = 1
      this.showDialog = true
      this.title = title
    },
    openEditItemDialog(p, title, index) {
      this.mode = 2 
      this.showDialog = true
      this.title = title
      this.index = index
      var c = c || {}
      for (var i in p) {
          // 属性i是否为p对象的自有属性
          if (p.hasOwnProperty(i)) {
              if (typeof p[i] === 'object') {
                  c[i] = Array.isArray(p[i]) ? [] : {}
                  deepCopy(p[i], c[i])
              } else {
                  // 属性是基础类型时，直接拷贝
                  c[i] = p[i]
              }
          }
      }
      this.item = c
    },
    handleStateChange() {
      this.showDialog = !this.showDialog
    },
    handleCreateItem() {
      this.people.push(this.item)
      this.item = {}
    }
  }
}
</script>

