<template>
  <v-app>
     <component :is="currentHeader" v-if="currentHeader"/>
      <router-view/>
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
      const headerType = this.$route.meta?.header;
      if (headerType == null) {
        return null;
      }
      return headerType === 'EmployeeHeaderComponent' ? EmployeeHeaderComponent : HeaderComponent;
    }
  }
}
</script>

<style>
</style>
