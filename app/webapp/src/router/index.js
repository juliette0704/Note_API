import { createWebHistory, createRouter } from "vue-router";
import UserLogin from "@/views/UserLogin"
import MyNote from "@/views/MyNote"
import UserRegister from "@/views/UserRegister"

const routes = [
    { 
        name: 'UserLogin',
        path: '/', 
        component: UserLogin,
    },
    {
        name: 'MyNote',
        path: '/my-notes/:userId',
        component: MyNote,
        props:true
    },
    {
        name: 'UserRegister',
        path: '/register',
        component: UserRegister,
    }
  ]
  
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
