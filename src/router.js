import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';  
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Impressum from "./views/Impressum.vue";
import Hilfe from "./views/Hilfe.vue";
import Kontakt from "./views/Kontakt.vue";
import Datenschutz from "./views/Datenschutz.vue";
import Überuns from "./views/Überuns.vue";

const routes = [
  { 
    path: "/überuns", 
    component: Überuns 
  },
  { 
    path: "/datenschutz", 
    component: Datenschutz 
  },
  { 
    path: "/kontakt", 
    component: Kontakt 
  },
  { 
    path: "/hilfe", 
    component: Hilfe 
  },
  { 
    path: "/impressum", 
    component: Impressum 
  },
  { 
    path: '/', 
    redirect: '/home' 
  }, 
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  { 
    path: "/login", 
    name: 'Login',
    component: Login 
  },
  { 
    path: "/register", 
    name: 'Register',
    component: Register 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
