import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path){
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        //Beranda
        {
            path: "/beranda",
            name: "beranda",
            component: importComponent("Beranda"),
            children: [
                //Login Page
                {
                    path: "/login",
                    name: "Login",
                    component: importComponent("LoginPage"),
                },
                //Register Page
                {
                    path: "/register",
                    name: "Register",
                    component: importComponent("RegisterPage"),
                },
            ]
        }
        //Dashboard Page
        {
            path: "/",
            name: "admin",
            component: importComponent("DashboardPage"),
            children: [
                //Dashboard
                {
                    path: "/",
                    name: "Root",
                    component: importComponent("DashboardIndex"),
                },
        },
    ],
});

export default router;