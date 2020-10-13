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
                <div class="col-lg-6">
                    <div class="patient-search">
                        <div class="search">
                        <div class="input-group md-form form-sm form-1 pl-0">
                            <div class="input-group-prepend">
                                <span class="input-group-text lighten-3" id="basic-text1">
                                    <i class="fas fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                            <input
                                class="form-control my-0 py-1 border-left-0 form-control-search"
                                type="text"
                                placeholder="Patient Name, NID"
                                aria-label="Search"
                            />
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span >All Patients</span>
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 text-right">
                    <button class="btn btn-primary mr-3" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span >Create New Encounter</span>
                    </button>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-stats">
                        <div class="card mt-3 tab-card">
                            <div class="card-header tab-card-header">
                                <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">Patient Chart</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">All Encounters</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="three-tab" data-toggle="tab" href="#three" role="tab" aria-controls="Three" aria-selected="false">History</a>
                                    </li>
                                </ul>
                            </div>

                            <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active p-3" id="one" role="tabpanel" aria-labelledby="one-tab">
                                <div class="row">
                                    <div class="col-sm-8">
                                        <div class="card patient-card">
                                            <div class="card-body">
                                                <div class="header">
                                                    <div class="row">
                                                        <div class="col-sm-1">
                                                            <div class="avatar">
                                                                <img src="../../assets/images/avatar.png" alt />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <h6>Abdul Kader Jilani</h6>
                                                            <span class="type">Blood type: <span class="value">AB+</span></span>
                                                            <span class="type">Height: <span class="value">72.5 in</span></span>
                                                            <span class="type">Weight: <span class="value">192 lb</span></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="content ">
                                                    <div class="row">
                                                        <div class="col-sm-4">
                                                            <p>Birthday: <span>May 27, 1990 (29 y.o)</span></p>
                                                            <p>Phone: <span>(201) 555-0124</span></p>
                                                            <p>Policy: <span>Primary, 426-45-12AFT-12</span></p>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <p>Address: <span>4640 Ash Dr, Oakland, FL, USA 32123</span></p>
                                                            <p>Email: <span>test@mail.com</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- <div class="card-footer">
                                            </div>   -->
                                        </div>  

                                        <div class="card mt-3 p-2 pl-3 pb-5">
                                            <div class="row">
                                                <div class="col-sm-12 pb-3">
                                                    <h6 class="text-secondary">Vitals</h6>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-sm-4">
                                                    <div class="card vital-item border p-2">
                                                        <div class="row">
                                                            <div class="col-sm-6">
                                                                <span >Blood Pressure <span class="text-secondary">(7)</span></span>
                                                            </div>
                                                            <div class="col-sm-6 text-right">
                                                                <span class="text-success pl-3">Normal</span>
                                                            </div>
                                                        </div>
                                                        <h5>125/85 <span class="text-secondary">mm/hg</span></h5>
                                                        <line-chart :chart-data="datacollection"></line-chart>
                                                        
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="card vital-item border p-2">
                                                        <div class="row">
                                                            <div class="col-sm-6">
                                                                <span >Blood Pressure <span class="text-secondary">(7)</span></span>
                                                            </div>
                                                            <div class="col-sm-6 text-right">
                                                                <span class="text-success pl-3">Normal</span>
                                                            </div>
                                                        </div>
                                                        <h5>125/85 <span class="text-secondary">mm/hg</span></h5>
                                                        <line-chart :chart-data="datacollection"></line-chart>
                                                        
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="card vital-item border p-2">
                                                        <div class="row">
                                                            <div class="col-sm-6">
                                                                <span >Blood Pressure <span class="text-secondary">(7)</span></span>
                                                            </div>
                                                            <div class="col-sm-6 text-right">
                                                                <span class="text-success pl-3">Normal</span>
                                                            </div>
                                                        </div>
                                                        <h5>125/85 <span class="text-secondary">mm/hg</span></h5>
                                                        <line-chart :chart-data="datacollection"></line-chart>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>  
                                    </div>

                                    <div class="col-sm-4 sidebar">
                                        <div class="card p-2 pl-3">
                                            <div class="header text-secondary">
                                                <h6>Medcications</h6>
                                            </div>
                                            <div class="content">
                                                <p class="text-success">27 Oct 2020 <span class="text-secondary pl-3">Napa 1 tablet</span></p>
                                                <p class="text-success">28 Oct 2020 <span class="text-secondary pl-3">Ace Plus 1 tablet</span></p>
                                            </div>
                                        </div>

                                        <div class="card p-2 pl-3 mt-4">
                                            <div class="header text-secondary">
                                                <h6>Issues</h6>
                                            </div>
                                            <div class="content">
                                                <p >Alergic Rhinitis <span class="text-secondary pl-1">(Napa 1 tablet)</span></p>
                                            </div>
                                        </div>
                                        <div class="card p-2 pl-3 mt-4">
                                            <div class="header text-secondary">
                                                <h6>Latest Documents</h6>
                                            </div>
                                            <div class="content">
                                                <p >Alergic Rhinitis <span class="text-secondary pl-1">(Napa 1 tablet)</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>       
                            </div>
                            <div class="tab-pane fade p-3" id="two" role="tabpanel" aria-labelledby="two-tab">
                                <h5 class="card-title">Tab Card Two</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>              
                            </div>
                            <div class="tab-pane fade p-3" id="three" role="tabpanel" aria-labelledby="three-tab">
                                <h5 class="card-title">Tab Card Three</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>              
                            </div>

                            </div>
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
    import moment from 'moment';
    import {VuejsDatatableFactory} from 'vuejs-datatable';
    import VueCharts from 'vue-chartjs'
    import { Bar, Line } from 'vue-chartjs'
    import LineChart from './LineChart.js'

    Vue.use(VuejsDatatableFactory);

    export default {
        name: "patients",
        
        components: { VueCharts, Bar, LineChart },
        data() {
            return {
                patients: [],
                followups: [],
                followupPatients: [],
                selectedPatient: {},
                selectedStatus: '',
                datacollection: {}
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
                    console.log(patients)
                    let patientExists =  patients.find( patient => patient.id == followup.meta.patient_id)
                    if (!patientExists) {
                        console.log('hello')
                        let patient = this.patients.find( patient => patient.id == followup.meta.patient_id)
                        console.log(patient);   
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
            },
        
            fillData () {
                this.datacollection = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: '#bdd9fc',
                            data: [10, 15, 5, 10, 11],
                            display: false
                        },
                    ]
                }
            },
            getRandomInt () {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            }
        },
        mounted() {
            this.fillData();
            
        }
    };
</script>

<style>

h5 span {
    font-size: 15px;
    font-weight: normal;
}
.patient-card .card-body {
    padding: 0
}

.vital-item {
    box-shadow: 1px 5px 10px solid #000 !important;
}

.card, .patient-card {
    box-shadow: none !important;
    border: 1px solid rgb(218, 218, 218);
}


.patient-card .type {
    color: #999;
}

.patient-card .value {
    color: rgb(37, 37, 37);
    padding-right: 15px;
}

.patient-card .card-footer {
    background-color: #fff;
}
.patient-card .header {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}
.patient-card .content {
    padding: 10px;
}
.patient-card .content p{
    color: #999;
}
.patient-card .content span{
    color: rgb(37, 37, 37);
}
.avatar img {
    width: 60px;
}
.encounter-stats {
    margin: 0px 30px;
}

#myTabContent {
    background-color: #f5f6f8;
}

.card {
    background-color: #ffffff;
    border: 1px solid rgba(0, 34, 51, 0.1);
    box-shadow: 2px 4px 10px 0 rgba(0, 34, 51, 0.05), 2px 4px 10px 0 rgba(0, 34, 51, 0.05);
    border-radius: 0.15rem;
}

.encounter-stats .card-header {
    padding-bottom: 0px !important;
    border-bottom: 0px !important;
    background: #fff;
}
.encounter-stats .tab-card-header > .nav-tabs > li > a {
    padding-bottom: 10px;
}

/* Tabs Card */

.tab-card {
  border:1px solid #eee;
}

.tab-card-header {
  background:none;
}
/* Default mode */
.tab-card-header > .nav-tabs {
  border: none;
  margin: 0px;
}
.tab-card-header > .nav-tabs > li {
  margin-right: 2px;
}
.tab-card-header > .nav-tabs > li > a {
  border: 0;
  border-bottom: 3px solid transparent;
  margin-right: 0;
  color: #737373;
  padding: 2px 15px;
}

.tab-card-header > .nav-tabs > li > a.show {
    border-bottom:2px solid #007bff;
    color: #007bff;
}
.tab-card-header > .nav-tabs > li > a:hover {
    color: #007bff;
}

.tab-card-header > .tab-content {
  padding-bottom: 0;
}

.nav-tabs .nav-link.active {
    color: #1765ab !important;
    background-color: transparent !important;
    border-color: #14416f #dee2e6 #1765ab !important;
}
</style>
