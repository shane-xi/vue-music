<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="(col,index) in columns" :key="index">
          {{ capitalize(col.name) }}
        </th>
        <th>
          Delete
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(person, index) in filteredUsers" :key="index">
        <td v-for="(col, index) in columns" :key="index">
          {{person[col.name]}}
        </td>
        <td class="text-center">
          <button @click="openEditItemDialog(person, 'Edit item ' + person.name, index)">update</button>
          <button @click="deleteItem(index)">delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style>
  .table{
    margin: 0 auto;
  }
</style>
<script>
import bus from '@/util/bus'
export default {
  data() {
    return {}
  },
  created() {
    var that = this
    bus.$on('update-item', function(index) {
      var data = that.dataList[index]
      Object.assign(data, that.item)
    })
  },
  props: ['dataList', 'columns', 'searchKey', 'item'],
  methods: {
    deleteItem(index) {
      this.dataList.splice(index, 1)
    },
    openEditItemDialog(person, title, index) {
      this.$emit("openEditItemDialog", person, title, index)
    },
    capitalize(text) {
      return text[0].toUpperCase() + text.slice(1)
    }
  },
  computed: {
    filteredUsers: function () {
      var self = this
      return this.dataList.filter(function (user) {
        return user.name.indexOf(self.searchKey) !== -1
      })
    }
  }
}
</script>
