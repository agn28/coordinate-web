<template>
    <div class="content health-assessment-create">
        <div class="animated fadeIn" v-if="patient">
            <div class="col-lg-12 d-flex breadcrumb-wrap border-bottom">
                <i class="fa fa-arrow-left text-secondary back-icon" @click.prevent="$router.go(-1)"></i>
                <div class="">
                    <h4>Health Assessment Created</h4>
                    <div class="breadcrumb"><span>Patients </span>/ {{ patient.body.first_name + " " + patient.body.last_name }}
                    </div>
                </div>
            </div>


            <div class="row" v-if="patient">
                <div class="col-lg-6 mx-auto mt-4">
                    <div class="card mb-4 mt-2">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="check-register">
                                        <span><i class="fas fa-check"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="assessment-title">Health Assessment Created</div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="created-patient">
                                        <div class="patient-name">{{ patient.body.first_name + " " + patient.body.last_name }}</div>
                                        <div class="patient-details">
                                            <div class="age">{{ patient.body.age }} {{ patient.body.gender }}</div>
                                            <div class="pid">NID: {{ patient.body.nid }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-12">
                                    <div  @click="$router.push({ name: 'patientOverview', params: { patientId: patientId }})" class="overview">Patient Overview <span><i class="fas fa-angle-right"></i></span></div>
                                </div>
                            </div>

                            <div class="card mb-4 mr-3 ml-3" @click="$router.push({name: 'patients'})">
                                <div class="card-body">
                                    <div class="details-view">
                                        <div class="left-side">
                                            <img src="../../assets/images/illustration_patients.png" alt="">
                                            <div  class="title">Patients</div>
                                        </div>
                                        <div class="right-side">
                                            <span><i class="fas fa-angle-right"></i></span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="card mb-4 mr-3 ml-3" @click="$router.push({name: 'dashboard'})">
                                <div class="card-body">
                                    <div class="details-view">
                                        <div class="left-side">
                                            <img src="../../assets/images/illustration_home.png" alt="">
                                            <div class="title">Go to Home</div>
                                        </div>
                                        <div class="right-side">
                                            <span><i class="fas fa-angle-right"></i></span>
                                        </div>
                                    </div>

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
  export default {
    name: "CreatedHealthAssessment",
    data() {
      return {
        patientId: '',
        patient: null
      };
    },
    methods: {
        getPatient() {
            let loader = this.$loading.show();
            this.$http.get("/patients/" + this.patientId).then(response => {
                loader.hide();
                if (response.status == 200) {
                this.patient = response.data.data;
                }
            },
            error => {
                loader.hide()
            });

        },
    },
    created() {
      this.patientId = this.$route.params.patientId;
    },
    mounted() {
        this.getPatient();
    },
  }
</script>

<style scoped>

</style>
