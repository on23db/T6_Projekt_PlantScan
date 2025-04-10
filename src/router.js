import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';  
import Dashboard from './views/Dashboard.vue';
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Impressum from "./views/Impressum.vue";
import Hilfe from "./views/Hilfe.vue";
import Kontakt from "./views/Kontakt.vue";
import Datenschutz from "./views/Datenschutz.vue";
import Überuns from "./views/Überuns.vue";
import Profile from './views/Profile.vue';
import CameraCapture from '@/components/CameraCapture.vue';
import Splash from './views/Splash.vue'; 

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { layout: 'installed' } // Standalone-Version für installierte App
  },
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
    redirect: '/dashboard' 
  },
  {
    path: '/splash',
    name: 'Splash',
    component: Splash,
    beforeEnter: (to, from, next) => {
      // Überprüfen, ob die App im Standalone-Modus läuft
      if (window.matchMedia('(display-mode: standalone)').matches) {
        next();
      } else {
        next('/dashboard');
      }
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home, 
    beforeEnter: (to, from, next) => {
      // Überprüfen, ob die App im Standalone-Modus läuft
      if (window.matchMedia('(display-mode: standalone)').matches) {
        // Wenn im Standalone-Modus, dann zur Dashboard-Seite weiterleiten (blockiert Zugriff auf Home)
        next('/dashboard');
      } else {
        next();
      }
    }
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
  },
  { 
    path: "/profile", 
    name: 'Profile',
    component: Profile 
  },
  {
    path: '/camera',
    name: 'CameraCapture',
    component: CameraCapture
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
