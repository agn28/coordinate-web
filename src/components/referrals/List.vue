<template>
    <div class="content patient-list-page">
        <div class="animated fadeIn">
            <TopNavBar heading="Referrals"></TopNavBar>
            <div class="row">
                <div class="col-lg-8">
                    <div class="date-filter">
                        <h5>Referral Created</h5>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="from">From</label>
                                    <input v-model="fromDate" @change="doFilter()" class="form-control" id="from" type="date">
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="to">To</label>
                                    <input v-model="toDate" @change="doFilter()" class="form-control" id="to" type="date">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <!-- <div class="col-lg-3">
                    <div class="filter-item">
                        <div class="form-group">
                            <label for="division">Division</label>
                            <multiselect v-model="division" :options="divisions" open-direction="bottom"></multiselect>
                        </div>
                    </div>
                </div> -->
                <div class="col-lg-3">
                    <div class="filter-item">
                        <div class="form-group" v-if="districts">
                            <label for="division">District</label>
                            <multiselect v-model="district" :options="districts" select-label="" open-direction="bottom" label="name" track-by="name" @input="doFilter()"></multiselect>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="filter-item">
                        <div class="form-group">
                            <label for="division">Upazila</label>
                            <multiselect v-model="upazila" :options="upazilas" select-label="" open-direction="bottom" label="name" track-by="name" @input="doFilter()"></multiselect>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="filter-item">
                        <div class="form-group">
                            <label for="division">Center</label>
                            <multiselect v-model="center" :options="centers" select-label="" open-direction="bottom" label="name" track-by="name" @input="doFilter()"></multiselect>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="filter-item">
                        <div class="form-group">
                            <label for="division">Healthcare Worker</label>
                            <multiselect v-model="healthWorker" :options="healthWorkers" select-label="" :multiple="true" open-direction="bottom" label="name" track-by="name" @input="doFilter()"></multiselect>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="filter-item">
                        <div class="form-group">
                            <label for="division">Referral Status</label>
                            <multiselect v-model="status" :options="statusList" select-label="" open-direction="bottom" @input="doFilter()"></multiselect>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="clear-filter">
                        <div class="form-group">
                            <label for=""></label>
                            <button @click="clearFilter()" class="d-block mt-2 btn btn-primary">
                                Clear Filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="patient-list">
                        <h5>Patients <b-badge variant="primary">{{ followupPatients.length }}</b-badge></h5>
                        <div class="table-responsive table-referrals">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">CVD Risk</th>
                                    <th scope="col">Registration Date</th>
                                    <th scope="col">Follow-up Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Reason for Referral</th>
                                    <th scope="col">Reffered By</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="pointer" v-for="(patient, index) in followupPatients" :key="index" >
                                    <template>
                                        <td>{{ patient.body.first_name + ' ' + patient.body.last_name}}</td>
                                        <td>{{ patient.body.age }} </td>
                                        <td>{{ patient.body.mobile }} </td>
                                        <td> </td>
                                        <td>{{ getDate(patient.body.registration_date) }} </td>
                                        <td>{{ moment(new Date(patient.followup.meta.created_at._seconds*1000)).format('DD MMM YYYY') }} </td>
                                        <td>{{ patient.followup.meta.status.toUpperCase() }}<span class="pull-right"><i class="fas fa-arrow-right"></i></span>
                                        </td>
                                        <td>{{ patient.followup.body.reason }} </td>
                                        <td>
                                           {{ getReferredUser(patient.followup.meta.collected_by) }}
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
    import Multiselect from 'vue-multiselect'

    Vue.use(VuejsDatatableFactory);

    export default {
        name: "patients",
        components: { TopNavBar, Multiselect },
        data() {
            return {
                patients: [],
                followups: [],
                followupPatients: [],
                copyFollowupPatients: [],
                users: [],
                selectedPatient: {},
                selectedStatus: '',
                lastItemId: '',
                disablePrevButton: false,
                disableNextButton: false,
                paginationOptions: {
                    currentPage: 1,
                    perPage: 30,
                },
                divisions: ['Barishal', 'Chittagong', 'Dhaka', 'Mymensingh', 'Khulna', 'Rajshahi', 'Rangpur', 'Sylhet'],
                districts: [],
                upazilas: [],
                centers: [],
                healthWorkers: [],
                division: '',
                district: '',
                upazila: '',
                center: '',
                healthWorker: [],
                status: '',
                statusList: ['All', 'Completed', 'Pending', 'Missed'],
                fromDate: '',
                toDate: ''
            };
        },
        methods: {
            scrollToTop() {
                window.scrollTo(0,0);
            },
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
                            patient.followup = followup;
                            patients.push(patient)
                        }
                    }
                    else {
                        if (patientExists.followup.meta.created_at.valueOf() < followup.meta.created_at.valueOf()) {
                            patientExists.followup = followup;
                        }
                    }
                    
                })
                this.followupPatients = patients;
                this.copyFollowupPatients = [...patients];
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
            },
            getLocations () {
                let loader = this.$loading.show();
                this.$http.get("/locations").then(response => {
                    if (response.status == 200) {
                        loader.hide()
                        this.districts = response.data.data[0].districts;
                    }
                },
                error => {
                    loader.hide();
                });
            },
            getCenters () {
                let loader = this.$loading.show();
                this.$http.get("/centers").then(response => {
                    if (response.status == 200) {
                        loader.hide()
                        this.centers = response.data.data;
                    }
                },
                error => {
                    loader.hide();
                });
            },
            getHealthWorkers () {
                let loader = this.$loading.show();
                this.$http.get("/users?role=chw").then(response => {
                    if (response.status == 200) {
                        loader.hide()
                        this.healthWorkers = response.data;
                    }
                },
                error => {
                    loader.hide();
                });
            },
            getUsers () {
                let loader = this.$loading.show();
                this.$http.get("/users").then(response => {
                    if (response.status == 200) {
                        loader.hide()
                        this.users = response.data;
                    }
                },
                error => {
                    loader.hide();
                });
            },
            getReferredUser(referredId) {
                let referredUser = this.users.find(user => user.uid == referredId);
                return referredUser.name;
            },
            doFilter() {
                this.followupPatients = [...this.copyFollowupPatients];
                if (this.fromDate && this.toDate) {
                    this.followupPatients = this.followupPatients.filter(item => {
                        let followupDate = moment(new Date(item.followup.meta.created_at._seconds*1000));
                        return (followupDate.isSame(this.fromDate) || followupDate.isAfter(this.fromDate)) && (followupDate.isSame(this.toDate) || followupDate.isBefore(this.toDate))
                    });
                }
                if (this.district) {
                    this.upazilas = this.district.thanas;
                    this.followupPatients = this.followupPatients.filter(item => item.body.address.district == this.district.name);
                }
                if (this.upazila) {
                    this.followupPatients = this.followupPatients.filter(item => item.body.address.upazila == this.upazila.name);
                }
                if (this.center) {
                    this.followupPatients = this.followupPatients.filter(item => item.followup.body.location.clinic_type == this.center.name);
                }
                if (this.status) {
                    this.followupPatients = this.followupPatients.filter(item => item.followup.meta.status == this.status.toLowerCase());
                }
                if (this.healthWorker.length) {
                    let filteredPatients = [];
                    this.healthWorker.forEach(item => {
                        let patients = [];
                        this.followupPatients.forEach(patient => {
                            if (patient.followup.meta.collected_by == item.uid) {
                                patients.push(patient);
                            }
                        })
                        filteredPatients = [...filteredPatients, ...patients];
                    })
                    this.followupPatients = [...filteredPatients];
                }
            },
            clearFilter() {
                this.fromDate = '';
                this.toDate = '';
                this.district = '';
                this.upazilas = [];
                this.upazila = '';
                this.status = '';
                this.followupPatients = this.copyFollowupPatients;
            },
            // getCVD(patientId) {
            //     this.$http.get("/health-reports/patient/" + patientId + '?filter=last').then(response => {
            //         if (response.status == 200) {
            //             if (!response.data.error) {
            //             console.log(response, 'cvd')

            //                 return "hello";
            //             }
            //         }
            //     });
            // }
        },
        mounted() {
            this.getFollowups();
            this.getLocations();
            this.getCenters();
            this.getHealthWorkers();
            this.getUsers();
            this.scrollToTop();
        }
    };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="">
</style>
