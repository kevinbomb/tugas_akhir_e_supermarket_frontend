<template>
    <section>
        <v-main class="list">
            <h3 class="text-h3" font-weight-medium mb-5>Transaksi</h3>

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
                        <v-btn class="ma-2" outlined small color="black" @click="deleteHandler(item.id)">REMOVE</v-btn>
                    </template>
                </v-data-table>
            </v-card>

            
            <v-dialog v-model="dialogConfirm" persistent max-width="400px">
                <v-card>
                    <v-card-title>
                        <span class="headline"> Warning!</span>
                    </v-card-title>
                    <v-card-text>Anda yakin ingin menghapus data transaksi ini?</v-card-text>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                        <v-btn color="blue darken-1" text @click="deleteData"> Yes </v-btn>
                    </v-card-action>
                </v-card>
            </v-dialog>

            <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
        </v-main>
    </section>
</template>

<script>
export default {
    name: "ListTransaksi",
    data() {
        return{
            inputType: 'Ubah',
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
                { text: "Total Bayar", value: "total" },
                { text: "Status", value: "status" },
                { text: "Actions", value: "actions"},
            ],
            keranjangs: [],
            deleteId: '',
        };
    },

    methods: {
        setForm(){
                this.update();
        },
        //Read Data Courses
        readData(){
            var url = this.$api + '/keranjangs';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.keranjangs = response.data.data;
            })
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
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        close(){
            this.dialogConfirm = false;
            this.readData();
        },
        cancel(){
            this.resetForm();
            this.readData();
            this.dialogConfirm = false;
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