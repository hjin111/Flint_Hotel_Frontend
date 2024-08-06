<template>
  <v-app>
    <!-- <HeaderComponent /> -->
     <component :is="currentHeader" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>


<script>
import EmployeeHeaderComponent from './components/EmployeeHeaderComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    EmployeeHeaderComponent
  },
  computed: {
    currentHeader() {
      const headerType = this.$route.meta.header;
      return headerType === 'EmployeeHeaderComponent' ? EmployeeHeaderComponent : HeaderComponent;
    }
  }
}
</script>

<style>
</style>
