<template>
    <section>
        <v-main class="list">
            <h3 class="text-h3" font-weight-medium mb-5>Supplier</h3>

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

                <v-data-table :headers="headers" :items="suppliers" :search="search">
                    <template v-slot:[`item.actions`]="{ item }">    
                        
                        <v-btn class="ma-2" outlined small color="success" @click="editHandler(item)">EDIT</v-btn>
                        <v-btn class="ma-2" outlined small color="error" @click="deleteHandler(item.id)">DELETE</v-btn>
                    </template>
                </v-data-table>
            </v-card>

            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }} Supplier</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-text-field
                                v-model="form.nama"
                                label="Nama Suppplier"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="form.alamat"
                                label="Alamat"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="form.deskripsi"
                                label="Deskripsi"
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
                    <v-card-text>Anda yakin ingin menghapus Supplier ini?</v-card-text>
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
    name: "ListItem",
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
                    text: "Nama Supplier",
                    align: "start",
                    sortable: true,
                    value: "nama_supplier",
                },
                { text: "Alamat", value: "alamat_supplier" },
                { text: "Deskripsi", value: "deskripsi" },
                { text: "Actions", value: "actions"},
            ],
            supplier: new FormData,
            suppliers: [],
            form: {
                nama: null,
                alamat: null,
                deskripsi: null,
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
            var url = this.$api + '/suppliers';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.suppliers = response.data.data;
            })
        },
        //Simpan data Course
        save(){
            this.supplier.append('nama_supplier', this.form.nama);
            this.supplier.append('alamat_supplier', this.form.alamat);
            this.supplier.append('deskripsi', this.form.deskripsi);

            var url = this.$api + '/suppliers'
            this.load = true;
            this.$http.post(url, this.supplier, {
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
                nama_supplier: this.form.nama,
                alamat_supplier: this.form.alamat,
                deskripsi: this.form.deskripsi
            };
            var url = this.$api + '/suppliers/' + this.editId;
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
        //Hapus Course
        deleteData() {
            //menghapus data
            var url = this.$api + '/suppliers/' + this.deleteId;
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
            this.form.nama = item.nama_supplier;
            this.form.alamat = item.alamat_supplier;
            this.form.deskripsi = item.deskripsi;
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
                nama: null,
                alamat: null,
                deskripsi: null
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