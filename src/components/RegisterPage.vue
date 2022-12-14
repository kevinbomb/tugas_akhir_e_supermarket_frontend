<template>
    <section>
        <main>
        <v-toolbar class="red lighten-3">
            <v-img src="@/assets/troli.png" max-height="25" max-width="25"></v-img>
            <h3>Minnie Market</h3>
        </v-toolbar>
        <img src="@/assets/background1.jpg" class="gambar" >
        <v-container fluid fill-height class="posisiCont">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm4 elevation-6>
                    <v-toolbar class="black">
                        <v-toolbar-title class="white--text">
                            <h1>Register</h1>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="Name" v-model="name" :rules="nameRules" required></v-text-field>
                                    <v-text-field label="Username" v-model="username" :rules="usernameRules" required></v-text-field>
                                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                                    <v-text-field label="Password" v-model="password" type="password" min="8" :rules="passwordRules" counter required></v-text-field>
                                    <v-layout justify-center>
                                        <v-btn  class="red darken-1 white--text" @click="submit">Register</v-btn>
                                    </v-layout>
                                </v-form>
                                <h5 class="posisi">Sudah punya akun?</h5>
                                <router-link to="Login">Click Here</router-link>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
    </section>
</template>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Dongle&family=M+PLUS+2:wght@500&display=swap');
    .grey--text{
        font-family: 'M PLUS 2', sans-serif;
    }

    .posisiCont{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    .posisi{
        margin-top: 20px;
    }

    .gambar{
        position: fixed; 
        top: 0; 
        left: 0; 
            
        /* Preserve aspet ratio */
        min-width: 100%;
        min-height: 100%;
    }
</style>

<script>
export default {
    name: "RegisterPage",
    data() {
        return {
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            valid: false,
            password: '',
            passwordRules: [
                (v) => !!v || 'Password tidak boleh kosong',
            ],
            email: '',
            emailRules: [
                (v) => !!v || 'E-mail tidak boleh kosong',
            ],
            name: '',
            nameRules: [
                (v) => !!v || 'Nama tidak boleh kosong',
            ],
            username: '',
            usernameRules: [
                (v) => !!v || 'Username tidak boleh kosong',
            ],
        };
    },

    methods: {
        submit() {
            if(this.$refs.form.validate()) {
                //cek validasi data yang terkirim
                this.load = true;
                this.$http.post(this.$api + '/register', {
                    name: this.name,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    is_active: this.is_active,
                    verify: 0,
                }).then(response => {
                    this.error_message = response.data.message + "Please Verify Account";
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.clear();
                    this.$router.push({
                        name: 'LoginPage',
                    });
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                })
            }
        },
        clear() {
            this.$refs.form.reset() //clear form login
        }
    },
};
</script>