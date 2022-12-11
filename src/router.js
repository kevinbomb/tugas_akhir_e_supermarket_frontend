import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const router = new VueRouter({
    mode: "history",
    routes: [
        
        //Beranda
        {
            path: '/beranda',
            name: 'beranda',
            component: () => import('@/components/DashboardLayout.vue'),
            children:[
                {
                    // path: "/beranda",
                    // name: "beranda.index",
                    // component: () => import('@/components/Beranda.vue'),
                },
            ], 
        },

        

        {
            path: '/',
            redirect: '/beranda'
        },
    ],
});

//Set Judul & Router pertama kali web dibuka
// router.beforeEach((to, from, next) => {
//     document.title = to.meta.title;
//     if(to.name !== 'Login' && localStorage.getItem("token")===null && to.name !== 'Register'){
//         next({ name: 'Login'});
//     }else next();
// });

// router.beforeEnter((to, from, next) => {
//     document.title = to.meta.title;
//     if(to.name !== 'Login' && localStorage.getItem("token")===null && to.name !== 'Register'){
//         next({ name: 'Login'});
//     }else next();
// });

export default router;