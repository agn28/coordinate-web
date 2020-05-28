<template>
    <div class="content patient-list-page">
        <div class="animated fadeIn">
           <div class="row">
               <div class="col-lg-12 d-flex breadcrumb-wrap">
                   <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
                   <div class="">
                       <h4>Follow-ups</h4>
                   </div>
               </div>
           </div>



            <div class="row">
                <div class="col-lg-12">
                    <div class="patient-list">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="" name="example1">
                                            <label class="custom-control-label" for=""></label>
                                        </div>
                                    </th>
                                    <th scope="col">Name</th>
                                    <!-- <th scope="col">PID</th> -->
                                    <th scope="col">NID</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Gender</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="pointer" v-for="(patient, index) in followupPatients" :key="index" @click="$router.push({ name: 'followupsShow', params: { patientId: patient.id } })" >
                                    <template>
                                        <th scope="row">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="" name="example1">
                                                <label class="custom-control-label" for=""></label>
                                            </div>
                                        </th>
                                        <td>{{ patient.body.first_name + ' ' + patient.body.last_name}}</td>


                                        <!-- <td>P2342343</td> -->
                                        <td>{{ patient.body.nid }}</td>
                                        <td>{{ patient.body.age }} </td>
                                        <td>{{ patient.body.gender.toUpperCase() }}<span class="pull-right"><i class="fas fa-arrow-right"></i></span>
                                        </td>
                                    </template>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    // @ is an alias to /src
    import Vue from 'vue';
    import {VuejsDatatableFactory} from 'vuejs-datatable';

    Vue.use(VuejsDatatableFactory);

    export default {
        name: "patients",
        components: {},
        data() {
            return {
                patients: [],
                followups: [],
                followupPatients: [],
            };
        },
        methods: {
            getFollowups() {
                let loader = this.$loading.show();
                this.$http.get("/followups").then(response => {
                        if (response.status == 200) {
                            this.followups = response.data.data;
                            this.getPatients();
                            loader.hide()
                        }
                    },
                    error => {
                        loader.hide();
                    });
            },

            getPatients() {
                let loader = this.$loading.show();
                this.$http.get("/patients").then(response => {
                        if (response.status == 200) {
                            this.patients = response.data.data;
                            this.prepareData()
                            loader.hide()
                        }
                    },
                    error => {
                        loader.hide();
                    });
            },

            prepareData() {
                console.log(this.patients)
                let patients = [];
                this.followups.forEach( followup => {
                    let patientExists =  patients.find( patient => patient.id == followup.meta.patient_id)
                    if (!patientExists) {
                        let patient = this.patients.find( patient => patient.id == followup.meta.patient_id)
                        patients.push(patient)
                    }
                    
                })
                this.followupPatients = patients;
            },

            getId(identifier, type) {
                if (!identifier) {
                    return '';
                }
                let id = identifier.find(x => x.use === type);

                if (id) {
                    return id.value;
                }
                return '';
            }
        },
        mounted() {
            this.getFollowups();
            
        }
    };
</script>

<style lang="">
</style>
