<template>
    <section>
        <!-- <v-main class="list">
            <h3 class="text-h3" font-weight-medium mb-5>Supplier</h3>

            <v-card>
  
                <v-card-title class="title py-8 pl-10 mb-3">
                    MY PROFILE
                </v-card-title>
                
                <v-card-text class="ml-12 pa-0">
                    <v-card 
                    elevation='24' color='white' width='456' class='pa-6'
                    >
                    <v-avatar size="85" class="mb-3 mt-n12">
                        <img :src="URL_IMAGE">
                    </v-avatar>
                    <v-text-field
                        class="mt-4" label="USERNAME"
                        placeholder="Martinator3000"
                    ></v-text-field>
                    <v-row>
                        <v-col cols='6'>
                        <v-text-field
                            label="FIRST NAME" placeholder="Martin"
                        ></v-text-field>                
                        </v-col>
                        <v-col cols='6'>
                        <v-text-field
                            label="LAST NAME" placeholder="Lewis"
                        ></v-text-field>                            
                        </v-col>
                    </v-row>
                    <v-text-field
                        label="EMAIL" placeholder="martin@lewis.com">
                    </v-text-field>                        
                    <v-textarea 
                        label="BIO" :value='TEXT_PLACEHOLDER'>
                    </v-textarea>                
                    </v-card>          
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text class="text-capitalize" v-for="i in ['Cancel','Save']" :key='i' v-text="i"/>
                </v-card-actions>
                
            </v-card>
            
            
        </v-main> -->

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
                        <button type="button" class="btn btn-danger ms-1" style="color: black;" >Edit Profile</button>
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
                            <p v-if="profile.status===1" class="mb-0">Authenticated</p>
                            <p v-else class="mb-0">Unauthenticated</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default{
    name: "ProfilePage",
    data() {
        return{
            profile: [],
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