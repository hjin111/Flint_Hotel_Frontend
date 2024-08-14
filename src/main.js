import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import vuetify from '@/plugins/vuetify';
import 'vuetify/styles'; // Vuetify의 CSS를 로드합니다.
import VCalendar from 'v-calendar'; // v-calendar
import 'v-calendar/style.css'; // VCalendar의 CSS를 로드합니다.


const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(VCalendar); // VCalendar 플러그인 사용

app.mount('#app');
