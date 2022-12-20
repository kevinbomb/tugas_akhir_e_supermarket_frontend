<template>
    <section>
        <div class="container py-5">

            <div class="row">
                <div class="col-lg-4">
                    <div class="card mb-4">
                    <div class="card-body text-center" style="background-color: #212529; color: aliceblue;" >
                        <img :src=profile.img alt="AVATAR"
                        class="rounded-circle img-fluid" style="width: 150px;">
                        <br>
                        <br>
                        <div class="d-flex justify-content-center mb-2">
                        <button v-if="profile.name==='Super Admin'" type="button" @click="editHandler(profile)" class="btn btn-danger ms-1" disabled style="color: black;" >Edit Profile</button>
                        <button v-else type="button" @click="editHandler(profile)" class="btn btn-danger ms-1" style="color: black;" >Edit Profile</button>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="col-lg-8" style="background-color: #212529; color: red;" >
                    <div class="card mb-4" style="background-color: #212529;">
                    <div class="card-body">
                        <div class="row">
                        <div class="col-sm-3">
                            <p class="mb-0">Name</p>
                        </div>
                        <div class="col-sm-9">
                            <p class="mb-0">{{profile.name}}</p>
                        </div>
                        </div>
                        <hr>
                        <div class="row">
                        <div class="col-sm-3">
                            <p class="mb-0">Username</p>
                        </div>
                        <div class="col-sm-9">
                            <p class="mb-0">{{profile.username}}</p>
                        </div>
                        </div>
                        <hr>
                        <div class="row">
                        <div class="col-sm-3">
                            <p class="mb-0">Email</p>
                        </div>
                        <div class="col-sm-9">
                            <p class="mb-0">{{profile.email}}</p>
                        </div>
                        </div>
                        <hr>
                        <div class="row">
                        <div class="col-sm-3">
                            <p class="mb-0">Status</p>
                        </div>
                        <div class="col-sm-9">
                            <p v-if="profile.email_verified_at===NULL" class="mb-0">Unuthenticated</p>
                            <p v-else class="mb-0">Authenticated</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Edit Profile</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="form.name"
                            label="Name"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.username"
                            label="Username"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.email"
                            label="E-Mail"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.img"
                            label="URL Gambar"
                        >
                        </v-text-field>
                        
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="update"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </section>
</template>

<script>
export default{
    name: "ProfilePage",
    data() {
        return{
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            profile: [],
            updet: new FormData,
            dialog: false,
            editId: '',
            form: {
                name: null,
                username: null,
                email: null,
                img: null,
            },

        };
    },

    methods:{
        readData(){
            this.id = localStorage.getItem('id');
            var url = this.$api + '/users/'+ this.id;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.profile = response.data.data;
            })
        },editHandler(item) {
            this.editId = item.id;
            this.form.name = item.name;
            this.form.username = item.username;
            this.form.email = item.email;
            this.form.img = item.img;
            this.dialog = true;
        },
        update() {
            let newData = {
                name: this.form.name,
                username: this.form.username,
                email: this.form.email,
                img: this.form.img
            };
            var url = this.$api + '/users/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                localStorage.setItem('name',response.data.data.name);
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.readData(); //Baca data
                this.dialog = false;
                location.reload()
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },cancel(){
            this.resetForm();
            this.readData();
            this.dialog = false;
        },
        resetForm() {
            this.form = {
                username: null,
                name: null,
                email: null,
                img: null
            };
        },
    },


    beforeMount(){
        this.id = localStorage.getItem('id');
    },

    mounted(){
        this.readData();
    }
};
</script>