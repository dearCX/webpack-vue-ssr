<template>
  <div class="tab-box">
    <span class="left">{{unfinishedTodoLength}} items left</span>
    <span class="tabs">
      <span
        v-for="state of stateList"
        :key="state"
        :class="[state, filter === state ? 'actived' : '']"
        @click="toggleFilter(state)"
      >
      {{state}}
      </span>
    </span>
    <span
      class="right"
      @click="clearAllCompleted"
    >
    clear completed
    </span>
  </div>
</template>
<script>
export default {
  name: 'tab',
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      num: 0,
      stateList: [
        'all',
        'active',
        'completed'
      ]
    }
  },
  computed: {
    unfinishedTodoLength () {
      return this.todos.filter(item => !item.completed).length
    }
  },
  methods: {
    toggleFilter (state) {
      this.$emit('toggle', state)
    },
    clearAllCompleted () {
      this.$emit('clearAll')
    }
  }
}
</script>
<style lang="less" scoped>
.tab-box{
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  line-height: 30px;
  background-color: #fff;
  font-size: 14px;
  .left, .right, .tabs{
    padding: 0 10px;
  }
  .left, .right{
    width: 150px;
  }
  .left{
    text-align: left;
  }
  .right{
    text-align: right;
    cursor: pointer;
  }
  .tabs{
    width: 200px;
    display: flex;
    justify-content: space-between;
    *{
      cursor: pointer;
      padding: 0 10px;
      border: 1px solid rgba(175,47,47,0);
      &.actived{
        border-color: rgba(175,47,47,0.4);
        border-radius: 5px;
      }
    }
  }
}
</style>
