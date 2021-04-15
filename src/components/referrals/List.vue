<template>
    <div class="content patient-list-page">
        <div class="animated fadeIn">
            <TopNavBar heading="Referrals"></TopNavBar>
            <div class="row">
                <div class="col-lg-12">
                    <div class="patient-list">
                        <div class="table-responsive table-referrals">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Generated At</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="pointer" v-for="(patient, index) in followupPatients" :key="index" >
                                    <template>
                                        <td>{{ patient.body.first_name + ' ' + patient.body.last_name}}</td>
                                        <td>{{ patient.body.age }} </td>
                                        <td>{{ patient.body.gender.toUpperCase() }}<span class="pull-right"><i class="fas fa-arrow-right"></i></span>
                                        </td>
                                        <td>{{ getDate(patient.meta.referral_generated_at) }} </td>
                                        <td>
                                            <div class="dropdown float-left mr-2">
                                                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Pending
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                    <button @click="updatePatientReferral(patient)" class="dropdown-item" type="button">Completed</button>
                                                </div>
                                            </div>
                                            
                                            <button @click="showReferrals(patient)" class="btn btn-warning btn-sm">View</button>
                                        </td>
                                    </template>
                                </tr>
                                    
                                </tbody>
                            </table>
                            <p v-if="this.followupPatients.length == 0" class="text-center mt-5">No referrals found</p>
                        </div>
                         <nav aria-label="Page navigation pull-right" v-if="this.followupPatients.length">
                            <ul class="pagination my-3">
                                <li class="page-item">
                                <button type="button" class="page-link"  @click="nextPrevPage('prev')" :disabled="disablePrevButton"> Previous </button>
                                </li>
                                <li class="page-item">
                                <button type="button" @click="nextPrevPage('next')"  class="page-link" :disabled="disableNextButton"> Next </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Vue from 'vue';
    import moment from 'moment';
    import {VuejsDatatableFactory} from 'vuejs-datatable';
    import TopNavBar from '../TopNavBar';
    Vue.use(VuejsDatatableFactory);

    export default {
        name: "patients",
        components: { TopNavBar },
        data() {
            return {
                patients: [],
                followups: [],
                followupPatients: [],
                selectedPatient: {},
                selectedStatus: '',
                lastItemId: '',
                disablePrevButton: false,
                disableNextButton: false,
                paginationOptions: {
                    currentPage: 1,
                    perPage: 20,
                },
            };
        },
        methods: {
            updatePatientReferral(patient) {

                patient.meta.referral_required = false;
                let loader = this.$loading.show();

                this.$http.put("/patients/" + patient.id + "/followups-status", patient.meta).then(response => {
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

            },

            showReferrals(patient) {
                this.$router.push({ name: 'referralsShow', params: { patientId: patient.id } })
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

            getPatients(lastItemId = '', queryItemkey = 'last_item') {
                let loader = this.$loading.show();
                this.$http.get("/patients?per_page=" + this.paginationOptions.perPage + '&' + queryItemkey + '=' + lastItemId).then(response => {
                    console.log(response)
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
            nextPrevPage(type) {
                let dataLength = this.patients.length;

                if (type == 'next') {
                    let lastItemId = '';
                    if ( dataLength > 0) {
                    lastItemId = this.patients[dataLength - 1].id;
                    }
                    this.getPatients(lastItemId, 'last_item');
                }

                if (type == 'prev') {
                    let firstItemId = dataLength > 0 ? this.patients[0].id : '';
                    this.getPatients(firstItemId, 'first_item');
                }
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
                        let patient = this.patients.find( patient => patient.id == followup.meta.patient_id); 
                        if (patient) {
                            patients.push(patient)
                        }
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
