<template>
    <section>
        <v-main class="list">
            <h3 class="text-h3" font-weight-medium mb-5>Mau Beli Apa?</h3>

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
                    <v-btn v-if="name==='Super Admin'" color="success" dark @click="dialog = true"> Tambah </v-btn>
                </v-card-title>

                <v-data-table :headers="headers" :items="barangs" :search="search">
                    <template v-slot:[`item.img`]="{ item }">
                        <div class="p-2">
                        <v-img :src="item.img" :alt="item.nama_barang" height="100px" width="140px"></v-img>
                        </div>
                    </template>
                    <template v-slot:[`item.in_stok`]="{ item }">    
                        <p v-if="item.in_stok=='1'">Available</p>
                        <p v-else>Sold-Out</p>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">    
                        <v-btn v-if="item.in_stok=='1'" class="ma-2" outlined small color="error" @click="buyHandler(item)">BELI</v-btn>
                        <v-btn v-else class="ma-2" outlined small color="error" disabled >BELI</v-btn>
                    </template>
                </v-data-table>
            </v-card>
            
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }} Info Barang</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-text-field
                                v-model="form.nama_barang"
                                label="Nama Barang"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="form.harga"
                                label="Harga"
                                type="number"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="form.img"
                                label="Foto Produk"
                                required
                            >
                            </v-text-field>
                            <v-select 
                                v-model="form.in_stok"
                                :items="Stok"
                                :item-text="Stok.text" 
                                :item-value="Stok.value" 
                                label="Stok" 
                                required>
                            </v-select>
                            <v-select 
                                name="id"
                                v-model="form.supplier"
                                :items="suppliers"
                                item-text="nama_supplier" 
                                item-value="id"
                                label="Pemasok" 
                                required>
                            </v-select>
                            
                            <v-text-field
                                v-model="form.expired"
                                label="Kadaluwarsa"
                                type="date"
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
                    <v-card-text>Anda yakin ingin menghapus Barang ini?</v-card-text>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                        <v-btn color="blue darken-1" text @click="deleteData"> Delete </v-btn>
                    </v-card-action>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogKuantitas" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline"> Masukkan Jumlah Yang Ingin Dibeli !</span>
                    </v-card-title>
                    <v-text-field
                        v-model="kuantitas.n"
                        type="number"
                        required
                    >
                    </v-text-field>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel"> GA JADI </v-btn>
                        <v-btn color="blue darken-1" text @click="setForm"> BELI </v-btn>
                    </v-card-action>
                </v-card>
            </v-dialog>


            <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
        </v-main>
    </section>
</template>

<script>
export default {
    name: "ListBarang",
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
            dialogKuantitas: false,
            Stok:[
                {
                    text: 'Available',
                    value: 1, 
                },
                {
                    text: 'Sold Out',
                    value: 0, 
                }
            ],
            headers: [
                {
                    text: "Foto Produk",
                    align: "start",
                    sortable: true,
                    value: "img",
                },
                { text: "Nama Barang", value: "nama_barang" },
                { text: "Kadaluwarsa", value: "expired" },
                { text: "Stok", value: "in_stok" },
                { text: "Harga", value: "harga" },
                { text: "Actions", value: "actions"},
            ],
            barang: new FormData,
            barangs: [],
            suppliers: [],
            form: {
                nama_barang: null,
                harga: null,
                img: null,
                in_stok: null,
                expired: null,
                supplier: null,
            },
            kuantitas: {
                n: null,
            },
            deleteId: '',
            editId: '',
        };
    },

    methods: {
        setForm(){
            if(this.inputType === 'Ubah'){
                this.update();
            }else if(this.inputType === 'Beli' ){
                this.keranjang();
            }else{
                this.save();
            }
        },
        //Read Data Courses
        readData(){
            this.name = localStorage.getItem('name');
            var url = this.$api + '/barangs';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.barangs = response.data.data;
            })
        },
        //Read Data Supplier
        readDataS(){
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
            this.barang.append('nama_barang', this.form.nama_barang);
            this.barang.append('harga', this.form.harga);
            this.barang.append('img', this.form.img);
            this.barang.append('in_stok', this.form.in_stok);
            this.barang.append('expired', this.form.expired);
            this.barang.append('supplier_id', this.form.supplier);

            var url = this.$api + '/barangs'
            this.load = true;
            this.$http.post(url, this.barang, {
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

        //Simpan data keranjang
        keranjang(){
            let newData = {              
                nama_barang : this.nama_barang,
                harga : this.harga,
                jumlah : this.kuantitas.n,
                user_id : this.id,
                status : 0,
            };

            var url = this.$api + '/keranjangs'
            this.load = true;
            this.$http.post(url, newData, {
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
                nama_barang: this.form.nama_barang,
                harga: this.form.harga,
                img: this.form.img,
                in_stok: this.form.in_stok,
                expired: this.form.expired,
                supplier_id: this.form.supplier,
            };
            var url = this.$api + '/barangs/' + this.editId;
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
            var url = this.$api + '/barangs/' + this.deleteId;
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
            this.form.nama_barang = item.nama_barang;
            this.form.harga = item.harga;
            this.form.img = item.img;
            this.form.in_stok = item.in_stok;
            this.form.expired = item.expired,
            this.form.supplier = item.supplier_id,
            this.dialog = true;
        },
        buyHandler(item) {
            this.inputType = 'Beli';
            this.editId = item.id;
            this.nama_barang = item.nama_barang;
            this.harga=item.harga;
            this.dialogKuantitas = true;
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.dialogKuantitas= false;
            this.readData();
        },
        cancel(){
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.dialogKuantitas = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = {
                nama_barang: null,
                harga: null,
                img: null
            };
        },
    },

    beforeMount(){
        this.id = localStorage.getItem('id');
        this.name = localStorage.getItem('name');
    },

    mounted() {
        this.readData();
        this.readDataS();
    }
};
</script>