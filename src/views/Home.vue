<template>
  <div class="home">

    <Employees msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Employees from '@/components/Employees.vue'

export default {
  name: 'home',
  components: {
    Employees
  }
}
</script>
