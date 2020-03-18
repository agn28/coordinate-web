<template>
    <div class="content">
        <div class="animated fadeIn">
            <div class="col-md-12 d-flex justify-content-between mt-3">
                <div class="header ml-3">
                    <h4 class="font-weight-bold">
                        Past Encounters
                    </h4>
                </div>
            </div>

            <div class="col-lg-12">
                <div class="patient-list-table ml-3 mr-3">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input">
                                        <label class="custom-control-label"></label>
                                    </div>
                                </th>
                                <th scope="col">Type</th>
                                <th scope="col">Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-if="assessments.length > 0" v-for="(assessment, index) in assessments" :key="index"  @click="$router.push({ name: 'pastEncounter', params: { assessmentId: assessment.id }})"
                                >
                                <th scope="row">{{ index + 1 }}</th>
                               <td class="text-capitalize">{{ assessment.body.type }}</td>
                               <td>{{ assessment.body.assessment_date }}</td>
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
      getPatientInfo() {
        let loader = this.$loading.show();
        this.$http.get("/patients/" + this.patientId).then(response => {
            loader.hide();
            if (response.status == 200) {
              this.patient = response.data.data;
            }
          },
          error => {
            this.loading = false;
          });
      },
      getAssessments() {
        let loader = this.$loading.show();
        this.$http.get("/assessments/").then(response => {
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
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
