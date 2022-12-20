<template>
    <section>
        <v-main class="list">
            <h3 class="text-h3" font-weight-medium mb-5>Member List</h3>

            <v-card>
                <v-card-title>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    >
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
                </v-card-title>

                <v-data-table :headers="headers" :items="users" :search="search">
                    <template v-slot:[`item.status`]="{ item }">    
                        <p v-if="item.email_verified_at!== null">Authenticated</p>
                        <p v-else>Unauthenticated</p>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">    
                        
                        <v-btn class="ma-2" outlined small color="success" @click="editHandler(item)">EDIT</v-btn>
                        <v-btn class="ma-2" outlined small color="error" @click="deleteHandler(item.id)">DELETE</v-btn>
                    </template>
                </v-data-table>
            </v-card>

            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }} Member</span>
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
                                label="E-mail"
                                required
                            >
                            </v-text-field>
                            
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                        <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogConfirm" persistent max-width="400px">
                <v-card>
                    <v-card-title>
                        <span class="headline"> Warning!</span>
                    </v-card-title>
                    <v-card-text>Anda yakin ingin menghapus Data User ini?</v-card-text>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                        <v-btn color="blue darken-1" text @click="deleteData"> Delete </v-btn>
                    </v-card-action>
                </v-card>
            </v-dialog>

            <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
        </v-main>
    </section>
</template>

<script>
export default {
    name: "ListUser",
    data() {
        return{
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
            headers: [
                {
                    text: "Username",
                    align: "start",
                    sortable: true,
                    value: "username",
                },
                { text: "Name", value: "name" },
                { text: "E-mail", value: "email" },
                { text: "Status", value: "status"},
                { text: "Actions", value: "actions"},
            ],
            user: new FormData,
            users: [],
            form: {
                name: null,
                username: null,
                email: null,
            },
            deleteId: '',
            editId: '',
        };
    },

    methods: {
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else{
                this.save();
            }
        },
        //Read Data Courses
        readData(){
            var url = this.$api + '/users';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.users = response.data.data;
            })
        },
        //Simpan data Course
        save(){
            this.user.append('name', this.form.name);
            this.user.append('username', this.form.username);
            this.user.append('email', this.form.email);

            var url = this.$api + '/users'
            this.load = true;
            this.$http.post(url, this.user, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData(); //Baca data
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Ubah data Course
        update() {
            let newData = {
                name: this.form.name,
                username: this.form.username,
                email: this.form.email
            };
            var url = this.$api + '/users/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData(); //Baca data
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Hapud Course
        deleteData() {
            //menghapus data
            var url = this.$api + '/users/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData(); //Baca data
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },editHandler(item) {
            this.inputType = 'Ubah';
            this.editId = item.id;
            this.form.name = item.name;
            this.form.username = item.username;
            this.form.email = item.email;
            this.form.gambar = item.gambar;
            this.dialog = true;
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();
        },
        cancel(){
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = {
                name: null,
                username: null,
                email: null
            };
        },
    },

    computed: {
        formTitle(){
            return this.inputType;
        },
    },

    mounted() {
        this.readData();
    }
};
</script>