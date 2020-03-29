<template>
    <div class="content patient-list-page">
        <div class="animated fadeIn">
           <div class="row">
               <div class="col-lg-12 d-flex breadcrumb-wrap">
                   <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
                   <div class="">
                       <h4>Assign Permissions</h4>
                   </div>
               </div>
           </div>
           
           
            <div class="row">
                <div class="col-lg-12">
                    <div class="patient-list">
                        <div class="card mt-5">
                            <div class="card-header bg-light">
                                <div class="float-left">
                                    <h5 class="pt-2">Role: Admin</h5>
                                </div>
                                <div class="float-right">
                                    <router-link class="btn btn-primary" :to="{ name: 'permissions' }">Go to permissions</router-link>
                                </div>
                            </div>
                            <div class="card-body">
                                <h6 class="mb-4">Select Permissions</h6>

                                <div class="permissions mb-5">
                                    <div class="row">
                                        <div class="col-sm-4 permission-item" v-for="(permission, index) in permissions" :key="index">
                                            <div class="pending-checkbox">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" :id="'checkbox-permission-' + index" name="example1">
                                                    <label class="custom-control-label" :for="'checkbox-permission-' + index">{{ permission }}</label>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>

                                <button class="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        name: "roles",
        components: {},
        data() {
            return {
                newRole: null,
                permissions: ['patient_create', 'patient_read', 'patient_update', 'patient_delete', 'user_create', 'user_read', 'user_update', 'user_delete',]
            };
        },
        methods: {
            getRoles() {
                let loader = this.$loading.show();
                this.$http.get("/roles").then(response => {
                    if (response.status == 200) {
                        this.roles = response.data.data;
                        loader.hide()
                    }
                },
                error => {
                    loader.hide();
                });
            },

        },
        mounted() {
            // this.getRoles();
        }
    };
</script>

<style lang="">
</style>
