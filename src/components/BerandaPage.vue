<template>
    <section>

        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <p class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Minnie Market</p>
            <h1 style="color: crimson;">Welcome {{ name }} !!</h1>     
            <v-btn class="mr-16" @click="myprofile" fab absolute right color="red darken-2"><v-icon color="black">mdi-account</v-icon>
                
            </v-btn>
            <v-btn class="mx-2" @click="logout" outlined small color="red darken-2" ><v-icon>mdi-logout</v-icon></v-btn>
        </header>
        
        <div class="container-fluid">
            <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li v-if="name=='Super Admin'" class="nav-item">
                            <router-link :to="{name: 'supplier.index'}" class="nav-link">Supplier</router-link>
                        </li>
                        <li v-if="name=='Super Admin'" class="nav-item">
                            <router-link :to="{name: 'user.index'}" class="nav-link">Member</router-link>
                        </li>
                        <li v-if="name=='Super Admin'" class="nav-item">
                            <router-link :to="{name: 'barang.index'}" class="nav-link">Barang</router-link>
                        </li>
                        <li v-else class="nav-item">
                            <router-link :to="{name: 'barang.beli'}" class="nav-link">Barang</router-link>
                        </li>
                        <li v-if="name!='Super Admin'" class="nav-item">
                            <router-link :to="{name: 'keranjang.ku'}" class="nav-link">Keranjang</router-link>
                        </li>
                        <li v-else class="nav-item">
                            <router-link :to="{name: 'transaksi.index'}" class="nav-link">Transaksi</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4"> 
            <!-- View Route -->
                <router-view></router-view>
            </main>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data(){
            return{
                name:'',                
            }

        },
        methods:{
            logout(){
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                localStorage.removeItem("id");
                this.$router.push({
                    name: 'LoginPage',
                });
            },
            myprofile(){
                this.$router.push({ name: "myprofile",})
            }
        },

        computed:{
            getName(){
                return localStorage.getItem('name')
            }
        },

        watch:{
            name(){
                console.log(this.name)
                if(this.name!=this.getName()){
                    console.log(this.name,'sda')
                    this.name=this.getName()
                }
            }
        },

        beforeMount(){
            this.name = localStorage.getItem('name');
        }
    }
</script>

<style>
    body {
    font-size: .875rem;
    }
    .feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
    }
    /*
    * Sidebar
    */
    .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 48px 0 0;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    }
    .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto;
    }
    .sidebar .nav-link {
    font-weight: 500;
    color: rgb(212, 28, 28);
    }
    .sidebar .nav-link .feather {
    margin-right: 4px;
    color: #727272;
    }
    .sidebar .nav-link.active {
    color: #ffffff;
    }
    .sidebar .nav-link:hover .feather,
    .sidebar .nav-link.active .feather {
    color: inherit;
    }
    .sidebar-heading {
    font-size: .75rem;
    text-transform: uppercase;
    }
    /*
    * Navbar
    */
    .navbar-brand {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: 1rem;
    background-color: rgba(212, 28, 28, 0.75);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
    }
    .navbar .navbar-toggler {
    top: .25rem;
    right: 1rem;
    }
    .navbar .form-control {
    padding: .75rem 1rem;
    border-width: 0;
    border-radius: 0;
    }
    .form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, .1);
    border-color: rgba(255, 255, 255, .1);
    }
    .form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
    }
</style>