<template>
    <div class="content past-encounter">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
                <div class="" v-if="patient">
                    <h4>Past Encounters</h4>
                    <div class="breadcrumb"><span>Patients / {{ patient.body.first_name + ' ' + patient.body.last_name}} </span>/ Past Encounters</div>
                </div>
            </div>
            <div class="col-lg-12 border-top border-bottom">
                <div class="patient" v-if="patient">
                    <div class="patient-image mr-4">
                        <img src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
                    </div>
                    <div class="patient-details">
                        <div class="patient-name">{{ patient.body.first_name + ' ' + patient.body.last_name}}</div>
                        <div class="details">
                            <div class="age">{{ patient.body.age + ' ' + patient.body.gender}}</div>
                            <div class="nid">NID: {{ patient.body.nid }} </div>
                            <div class="pid">PID: {{ patient.body.pid }}</div>
                            <div class="register-date">Registered on {{ patient.body.registration_date }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="past-encounter-list">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Performed by</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-if="assessments.length > 0" v-for="(assessment, index) in assessments" :key="index"  @click="$router.push({ name: 'pastEncounter', params: { assessmentId: assessment.id }})">
                                    <template>
                                        <td>{{ assessment.body.assessment_date }}</td>
                                        <td>{{ assessment.body.type }}</td>
                                        <td><span><i class="fas fa-arrow-right"></i></span></td>

                                    </template>

                                </tr>
                                <tr v-else>
                                    <td colspan="3">
                                        <div class="alert-light mt-5 alert text-center">
                                            <h4>No Encounter data found for this patient!</h4>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

<!--            <div class="col-lg-12">-->
<!--                <div class="patient-list-table ml-3 mr-3">-->
<!--                    <div class="table-responsive">-->
<!--                        <table class="table">-->
<!--                            <thead>-->
<!--                            <tr>-->
<!--                                <th scope="col">-->
<!--                                    <div class="custom-control custom-checkbox">-->
<!--                                        <input type="checkbox" class="custom-control-input">-->
<!--                                        <label class="custom-control-label"></label>-->
<!--                                    </div>-->
<!--                                </th>-->
<!--                                <th scope="col">Type</th>-->
<!--                                <th scope="col">Date</th>-->
<!--                            </tr>-->
<!--                            </thead>-->
<!--                            <tbody>-->
<!--                            <tr v-if="assessments.length > 0" v-for="(assessment, index) in assessments" :key="index"  @click="$router.push({ name: 'pastEncounter', params: { assessmentId: assessment.id }})"-->
<!--                                >-->
<!--                                <th scope="row">{{ index + 1 }}</th>-->
<!--                               <td class="text-capitalize">{{ assessment.body.type }}</td>-->
<!--                               <td>{{ assessment.body.assessment_date }}</td>-->
<!--                            </tr>-->
<!--                            <tr v-else>-->
<!--                                <td colspan="3">-->
<!--                                    <div class="alert-light mt-5 alert text-center">-->
<!--                                        <h4>No Encounter data found for this patient!</h4>-->
<!--                                    </div>-->
<!--                                </td>-->
<!--                            </tr>-->
<!--                            </tbody>-->
<!--                        </table>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
        </div>
    </div>

</template>

<script>
  export default {
    name: "PastEncounterList",
    data() {
      return {
        patient: null,
        patientId: '',
        carePlans: '',
        assessments: '',
      };
    },

    methods: {
      scrollToTop() {
        window.scrollTo(0,0);
      },
      getPatientInfo() {
        let loader = this.$loading.show();
        this.$http.get("/patients/mongo/" + this.patientId).then(response => {
            loader.hide();
            if (response.status == 200) {
              this.patient = response.data.data;
              console.log(response.data.data);
            }
          },
          error => {
            this.loading = false;
          });
      },
      getAssessments() {
        let loader = this.$loading.show();
        this.$http.get("/assessments/all-mongo/").then(response => {
            loader.hide();
            if (response.status == 200) {
              this.assessments = response.data.data.filter(patient => patient.body.patient_id == this.patientId);
            }
          },
          error => {
            this.loading = false;
          });
      }
    },
    mounted() {
      this.patientId = this.$route.params.patientId;
      this.getPatientInfo();
      this.getAssessments();
      this.scrollToTop();
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
