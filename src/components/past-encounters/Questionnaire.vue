<template>
    <div class="content encounter-questionnaire">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon" @click.prevent="$router.go(-1)"></i>
                <div v-if="patient">
                    <h4>Questionnaire</h4>
                    <div class="breadcrumb"><span>Patients / {{ patient.body.first_name + " " + patient.body.last_name }} / Create a New Encounter </span>/ Questionnaire</div>
                </div>
            </div>

            <div class="col-lg-12 border-top border-bottom" v-if="patient">
                <div class="patient mt-2 mb-3">
                    <div class="patient-image mr-3">
                        <img v-if="patient.body.avatar" :src="patient.body.avatar" class="rounded-circle img-fluid" width="100" height="100" :alt="patient.body.first_name" onerror="this.src='data:image/png;base64,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'">
                        <img v-else src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
                    </div>
                    <div class="patient-details">
                        <div class="patient-name">{{ patient.body.first_name + " " + patient.body.last_name }}</div>
                        <div class="details">
                            <div class="age">{{ patient.body.age }} {{ patient.body.gender }}</div>
                            <div class="pid">PID: {{ patient.body.pid }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-msg">
                        Complete all the sections that are applicable
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-body">
                        <div class="row">
                            <div class="col-lg-6 mb-4">
                                <div class="card pointer" @click="$router.push({ name: 'encounterTobacco'})">
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_tobacco.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Tobacco</div>
                                                    <div v-if="tobaccoData" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status incomplete-color">Incomplete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-4">
                                <div class="card pointer" @click="$router.push({ name: 'encounterAlcohol'})">
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_alcohol.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Alcohol</div>
                                                    <div v-if="alcoholData" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status skipped-color">Skipped</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card pointer" @click="$router.push({ name: 'encounterDiet'})">
                                    <div class="card-body">
                                        <div class="encounter-content" >
                                            <div class="content">
                                                <img src="../../assets/images/illustration_diet.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Diet</div>
                                                    <div v-if="dietData" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status incomplete-color">Incomplete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="card pointer" @click="$router.push({ name: 'encounterMedication'})">
                                    <div class="card-body">
                                        <div class="encounter-content" >
                                            <div class="content">
                                                <img src="../../assets/images/illustration_medication.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Current Medication</div>
                                                    <div v-if="medications" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status incomplete-color">Incomplete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 mt-4">
                                <div class="card pointer" @click="$router.push({ name: 'encounterMedical'})">
                                    <div class="card-body">
                                        <div class="encounter-content" >
                                            <div class="content">
                                                <img src="../../assets/images/illustration_medical-history.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Medical History</div>
                                                    <div v-if="medicalHistory" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status incomplete-color">Incomplete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4 mb-4">
                            <div class="col-lg-12">
                                <button @click="saveAndContinue" class="btn btn-save mr-5">Save</button>

                                <button class="btn btn-cancel">Unable to Perform</button>
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
    name: "Questionnaire",
    data() {
      return {
        patientId: null,
        patient: '',

        tobaccoData: '',
        alcoholData: '',
        medicalHistory: '',
        medications: '',
        dietData: '',

      }
    },
    methods: {
    scrollToTop() {
        window.scrollTo(0,0);
    },
      getPatient() {
        let loader = this.$loading.show();
        this.$http.get("/patients/mongo/" + this.patientId).then(response => {
            loader.hide();
            if (response.status == 200) {
              this.patient = response.data.data;
            }
          },
          error => {
            loader.hide()
          });
      },
      saveAndContinue() {
        this.$router.push({ name: 'encounterCreate', params: { patientId: this.patientId }})
      }
    },

    created() {
        this.scrollToTop();
      this.patientId = this.$route.params.patientId;
      this.getPatient()
      let quistionaires = this.$store.getters.getQuestionnaire
      if (quistionaires.length > 0) {
        quistionaires.forEach(item => {
          if (item.body.data.name == 'tobacco') {
            this.tobaccoData = item.body.data
          } else if(item.body.data.name == 'alcohol') {
            this.alcoholData = item.body.data
          } else if(item.body.data.name == 'medical_history') {
            this.medicalHistory = item.body.data
          } else if(item.body.data.name == 'current_medication') {
            this.medications = item.body.data
          } else if(item.body.data.name == 'diet') {
            this.dietData = item.body.data
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
