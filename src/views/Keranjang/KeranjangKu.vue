<template>
    <section>
        <v-main class="list">
            <h3 class="text-h3" font-weight-medium mb-5>Keranjangku</h3>

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
                </v-card-title>

                <v-data-table :headers="headers" :items="keranjangs" :search="search">
                    <template v-slot:[`item.status`]="{ item }">    
                        <p v-if="item.status===1">Diproses</p>
                        <p v-else>Menunggu Pembayaran</p>
                    </template>
                    <template v-slot:[`item.total`]="{ item }">
                        <p>
                            {{item.harga * item.jumlah}}
                        </p>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">    
                        <v-btn v-if="item.status===0" class="ma-2" outlined small color="error" @click="bayar(item.id)" >BAYAR</v-btn>
                        <v-btn v-else class="ma-2" outlined small color="error" disabled >BAYAR</v-btn>
                        <v-btn class="ma-2" outlined small color="black" @click="deleteHandler(item.id)">REMOVE</v-btn>
                    </template>
                </v-data-table>
            </v-card>

            <v-dialog v-model="dialogConfirm" persistent max-width="400px">
                <v-card>
                    <v-card-title>
                        <span class="headline"> Warning!</span>
                    </v-card-title>
                    <v-card-text>Yakin ingin menghapus barang ini dari keranjang?</v-card-text>
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
    name: "KeranjangKu",
    data() {
        return{
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null,
            dialogConfirm: false,
            headers: [
                {
                    text: "Nama Barang",
                    align: "start",
                    sortable: true,
                    value: "nama_barang",
                },
                { text: "Jumlah", value: "jumlah" },
                { text: "Harga", value: "harga" },
                { text: "Total Bayar", value: "total" },
                { text: "Status", value: "status" },
                { text: "Actions", value: "actions"},
            ],
            keranjangs: [],
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
            this.id = localStorage.getItem('id');
            var url = this.$api + '/keranjangs/' + this.id;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.keranjangs = response.data.data
            })
        },
        //Ubah data Course
        // update() {
        //     let newData = {
        //         nama_barang: this.form.nama_barang,
        //         harga: this.form.harga,
        //         img: this.form.img,
        //         in_stok: this.form.in_stok,
        //         expired: this.form.expired,
        //         supplier_id: this.form.supplier,
        //     };
        //     var url = this.$api + '/barangs/' + this.editId;
        //     this.load = true;
        //     this.$http.put(url, newData, {
        //         headers: {
        //             'Authorization' : 'Bearer ' + localStorage.getItem('token')
        //         }
        //     }).then(response => {
        //         this.error_message = response.data.message;
        //         this.color = "green";
        //         this.snackbar = true;
        //         this.load = false;
        //         this.close();
        //         this.readData(); //Baca data
        //         this.resetForm();
        //         this.inputType = 'Tambah';
        //     }).catch(error => {
        //         this.error_message = error.response.data.message;
        //         this.color = "red";
        //         this.snackbar = true;
        //         this.load = false;
        //     });
        // },

        bayar(id){
            let newData = {
                status: 1
            };
            var url = this.$api + '/keranjangs/' + id;
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
            var url = this.$api + '/keranjangs/' + this.deleteId;
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
        },
        // editHandler(item) {
        //     this.inputType = 'Ubah';
        //     this.editId = item.id;
        //     this.form.nama_barang = item.nama_barang;
        //     this.form.harga = item.harga;
        //     this.form.img = item.img;
        //     this.form.in_stok = item.in_stok;
        //     this.form.expired = item.expired,
        //     this.form.supplier = item.supplier_id,
        //     this.dialog = true;
        // },
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
    },

    beforeMount(){
        this.id = localStorage.getItem('id');
        this.name = localStorage.getItem('name');
    },

    mounted() {
        this.readData();
    }
};
</script>