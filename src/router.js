import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';  
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

const routes = [
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
