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
            component: () => import('@/components/BerandaPage.vue'),
            children:[
                {
                    path: "/supplier",
                    name: "supplier.index",
                    component: () => import('@/views/Supplier/SupplierPage.vue'),
                },
                {
                    path: "/user",
                    name: "user.index",
                    component: () => import('@/views/User/UserPage.vue'),
                },
                {
                    path: "/barang",
                    name: "barang.index",
                    component: () => import('@/views/Barang/BarangPage.vue'),
                },
                {
                    path: "/belibarang",
                    name: "barang.beli",
                    component: () => import('@/views/Barang/BeliBarang.vue'),
                },
                {
                    path: "/profile",
                    name: "myprofile",
                    component: () => import('@/components/ProfilePage.vue'),
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
            path: '/tes1',
            name: 'DashboardIndex',
            component: () => import('@/components/DashboardIndex.vue'),
        },

        {
            path: '/',
            redirect: '/login'
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