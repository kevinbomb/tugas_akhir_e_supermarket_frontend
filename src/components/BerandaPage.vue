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

        beforeMount(){
                this.name = localStorage.getItem('name');
        }
    }
</script>

<style scoped>
.gambar{
    position: fixed; 
    top: 0; 
    left: 0; 
    
    min-width: 100%;
    min-height: 100%;
}
.mainHeader{
    color: white;
}
</style>