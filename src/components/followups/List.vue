<template>
    <div class="content patient-list-page">
        <div class="animated fadeIn">
           <div class="row">
               <div class="col-lg-12 d-flex breadcrumb-wrap">
                   <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
                   <div class="">
                       <h4>Referrals</h4>
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
                                    <th scope="col">Age</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Generated At</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="pointer" v-for="(patient, index) in followupPatients" :key="index" >
                                    <template>
                                        <th scope="row">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="" name="example1">
                                                <label class="custom-control-label" for=""></label>
                                            </div>
                                        </th>
                                        <td>{{ patient.body.first_name + ' ' + patient.body.last_name}}</td>


                                        <!-- <td>P2342343</td> -->
                                        <td>{{ patient.body.age }} </td>
                                        <td>{{ patient.body.gender.toUpperCase() }}<span class="pull-right"><i class="fas fa-arrow-right"></i></span>
                                        </td>
                                        <td>{{ getDate(patient.meta.referral_generated_at) }} </td>
                                        <td>
                                            <button @click="openReferralModal(patient)" class="btn btn-primary btn-sm mr-2">Edit</button>
                                            <button @click="showReferrals(patient)" class="btn btn-warning btn-sm">View</button>
                                        </td>
                                    </template>
                                </tr>
                                    
                                </tbody>
                            </table>
                            <p v-if="this.followupPatients.length == 0" class="text-center mt-5">No referrals found</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal id="modal-update-referral" class="modal-header">
            <template v-slot:modal-header>
                <span class="title">Update Referral</span>
            </template>
            <div class="form-group">
            <label for="users">Select Completed</label>
            <select v-model="selectedStatus" name="users" id="users" class="form-control">
                <option  value=""></option>
                <option  value="completed">Completed</option>
            </select>
            </div>

            <template v-slot:modal-footer>
            <div class="w-100">
                <b-button
                @click="updatePatientReferral()"
                variant="link"
                size="md"
                class="float-right font-weight-bold p-0 pl-4 pr-1"
                >Update</b-button>

                <b-button
                variant="link"
                size="md"
                class="float-right font-weight-bold p-0"
                @click="closeReferralModal()"
                >Cancel</b-button>
            </div>
            </template>
        </b-modal>
    </div>




</template>

<script>
    // @ is an alias to /src
    import Vue from 'vue';
    import moment from 'moment';
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
                selectedPatient: {},
                selectedStatus: '',
            };
        },
        methods: {
            

            updatePatientReferral() {

                if (this.selectedPatient != {} && this.selectedStatus == 'completed') {
                    this.selectedPatient.meta.referral_required = false;
                    let loader = this.$loading.show();

                    this.$http.put("/patients/" + this.selectedPatient.id + "/followups-status", this.selectedPatient.meta).then(response => {
                        if (response.status == 200) {
                            loader.hide()
                            this.followupPatients.splice(this.followupPatients.indexOf(this.selectedPatient), 1);
                            this.getFollowups();
                            this.closeReferralModal()
                        }
                    },
                    error => {
                        loader.hide();
                    });
                } else {
                    this.closeReferralModal()
                }

                
            },

            showReferrals(patient) {
                this.$router.push({ name: 'followupsShow', params: { patientId: patient.id } })
            },

            openReferralModal(patient) {

                this.selectedPatient = patient;

                this.$bvModal.show("modal-update-referral");
            },
            closeReferralModal() {
                this.selectedCareplan = {};
                this.selectedStatus = '';
                this.$bvModal.hide("modal-update-referral");
            },
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
                            loader.hide()
                            this.patients = response.data.data;

                            this.patients = this.patients.filter( patient => patient.meta.referral_required && patient.meta.referral_required == true);
                            if (this.patients.length > 0 ) {
                                this.prepareData()
                            }
                            
                        }
                    },
                    error => {
                        loader.hide();
                    });
            },

            getDate(date) {
                let data = moment(date).format("DD MMM YYYY")
                return data
            },

            prepareData() {
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
