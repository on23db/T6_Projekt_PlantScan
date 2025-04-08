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
import PlantList from './views/PlantList.vue';
import Logout from './views/Logout.vue'; 
import Profile from './views/Profile.vue';
import CameraCapture from '@/components/CameraCapture.vue';
import Splash from './views/Splash.vue'; 

const routes = [
  {
    path: "/plantlist",
    name: "PlantList",
    component: PlantList
  },
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
    redirect: '/loading' 
  },
  {
    path: '/splash',
    name: 'Splash',
    component: Splash, 
  },
  {
    path: '/Home',
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
  },
  { 
    path: "/logout", 
    name: 'Logout',
    component: Logout 
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
