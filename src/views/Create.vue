<template>
  <div class="create">
    <h1>Create task</h1>
    <form @submit.prevent="submitHandler">
      <div class="group">
        <input type="text" required v-model="title"/>
        <span class="bar"></span>
        <label>Task</label>
        <textarea v-model="description" placeholder="Type..."></textarea>
        <p>{{description.length}}/512</p>
        <button class="btn" type="submit">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    description: "",
    title: ""
  }),
  methods: {
    submitHandler () {
      const task = {
        title: this.title,
        description: this.description,
        id: Date.now(),
      }
      this.$store.dispatch('createTask', task)
      this.$router.push('/list')
    }
  },
  destroyed(){

  }
};
</script>

<style>

</style>