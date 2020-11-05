<template>
  <div>
    <div v-if="task">
      <h1>{{task.title}}</h1>
      <form @submit.prevent="submitHandler">
        <div class="group">
          <span class="bar"></span>
          <textarea v-model="description" placeholder="Type..."></textarea>
          <p>{{description.length}}/512</p>
          <button class="btn" type="submit">Update</button>
           <button class="btn" @click="deleteTask">Delete</button>
        </div>
      </form>
    </div>
    <p v-else class="no__task">Task not found</p>
  </div>
</template>


<script>
export default {
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    }
  },
  data: () => ({
    description: ""
  }),
  mounted() {
      this.description = this.task.description
  },
  methods: {
    submitHandler() {
      this.$store.dispatch("updateTask", {
          id: this.task.id,
          description: this.description
      });
      this.$router.push("/list");
    },
        deleteTask() {
      this.$store.dispatch("deleteTask", {
          id: this.task.id,
      });
      this.$router.push("/list");
    },

  },
};
</script>

<style scoped>

</style>