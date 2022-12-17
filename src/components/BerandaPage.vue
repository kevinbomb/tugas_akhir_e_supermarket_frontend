<template>
    <v-container>
        <img src="@/assets/supermarket.jpg" class="gambar">
        <v-toolbar flat class="mainHeader" color="black">
            <v-toolbar-title>Minnie Market</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
                <v-btn text><router-link to="/login">Login</router-link></v-btn>
                <v-btn text><router-link to="/register">Register</router-link></v-btn>
            </v-toolbar-items>
            <div class="hidden-sm-and-up">
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
                    </template>
                    <v-list class="responsiveMenu">
                        <v-list-item>
                            <v-list-item-title><router-link to="/login">Login</router-link></v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title><router-link to="/register">Register</router-link></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-toolbar>
    </v-container>
</template>
  
<script>
  export default {
    name: "BerandaPage",
    data: () => ({
    })
};
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