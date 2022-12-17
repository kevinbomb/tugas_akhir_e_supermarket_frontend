import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const router = new VueRouter({
    mode: "history",
    routes: [
        
        //Beranda
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('@/components/DashboardLayout.vue'),
            children:[
                {
                    path: "/supplier",
                    name: "supplier.index",
                    component: () => import('@/views/Supplier/SupplierPage.vue'),
                },
            ], 
        },

        {
            path: '/login',
            name: 'LoginPage',
            component: () => import('@/components/LoginPage.vue'),
        },
        {
            path: '/register',
            name: 'RegisterPage',
            component: () => import('@/components/RegisterPage.vue'),
        },
        {
            path: '/beranda',
            name: 'Beranda',
            component: () => import('@/components/BerandaPage.vue'),
        },

        {
            path: '/',
            redirect: '/beranda'
        },
    ],
});

//Set Judul & Router pertama kali web dibuka
router.beforeEach((to, from, next) => {
    next();
});

// router.beforeEnter((to, from, next) => {
//     document.title = to.meta.title;
//     if(to.name !== 'Login' && localStorage.getItem("token")===null && to.name !== 'Register'){
//         next({ name: 'Login'});
//     }else next();
// });

export default router;