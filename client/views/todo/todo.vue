<template>
  <section class="section-box">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去做什么"
      @keyup.enter="addTodo"
    >
    <item v-for="item of filterTodos"
          :key="item.id"
          :todo="item"
          @del="deleteItem"
    ></item>
    <tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAll="clearCompleteTodo"
    ></tabs>
  </section>
</template>
<script>
import item from './item.vue'
import tabs from './tabs.vue'
let id = 0
export default {
  name: 'todo',
  components: {
    item,
    tabs
  },
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  computed: {
    filterTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(item => completed === item.completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    toggleFilter (state) {
      this.filter = state
    },
    deleteItem (id) {
      this.todos.splice(this.todos.findIndex(item => item.id === id), 1)
    },
    clearCompleteTodo () {
      this.todos = this.todos.filter(item => !item.completed)
    }
  }
}
</script>
<style lang="less" scoped>
.section-box{
  width: 600px;
  margin: 0 auto;
  .add-input{
    width: 100%;
    font-size: 24px;
    line-height: 1.4em;
    border: none;
    outline: none;
    box-sizing: border-box;
    padding: 16px 16px 16px 36px;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }
}
</style>
