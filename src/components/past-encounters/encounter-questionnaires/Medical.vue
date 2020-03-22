<template>
  <div class="content medical-questionnaire">
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex breadcrumb-wrap">
        <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
        <div class="" v-if="patient">
          <h4>Medical Questionnaire</h4>
          <div class="breadcrumb"><span>Patients</span>/ <span>{{ patient.body.first_name + " " + patient.body.last_name }}</span> / <span>Create a New Encounter</span> / <span>Questionnaire</span> / Medical</div>
        </div>
      </div>

      <div class="col-lg-12 border-top border-bottom border" v-if="patient">
        <div class="patient">
          <div class="patient-image">
            <img v-if="patient.body.avatar" :src="patient.body.avatar" class="rounded-circle img-fluid" width="100" height="100" :alt="patient.body.first_name" onerror="this.src='data:image/png;base64,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'">
            <img v-else src="../../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
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
        <div class="col-lg-6 mx-auto">
          <div class="medical-question">
            <div class="card">
              <div class="card-body custom-card-body">

                <form-wizard>
                  <tab-content>
                    <div class="step-1">
                      <div class="question-msg">
                        <p><span><i class="fas fa-exclamation-circle"></i></span>Do you have a history of (or has ever been told they have) (select all that apply)</p>
                      </div>
                      <div class="question-section">
                        <p>Heart attack/angina/other heart diseases (e.g. heart failure, rheumatic heart disease)</p>

                        <div class="row mb-5">
                          <div class="col-lg-6">
                            <button @click="medicalHistory.heart_disease = 'yes'" class="btn btn-light border w-100">Yes</button>
                          </div>
                          <div class="col-lg-6">
                            <button @click="medicalHistory.heart_disease = 'no'" class="btn btn-light border w-100">No</button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </tab-content>

                  <tab-content>
                    <div class="step-1">
                      <div class="question-section">
                        <p>Stroke/ transient ischaemic attact (TIA)</p>

                        <div class="row mb-5">
                          <div class="col-lg-6">
                            <button @click="medicalHistory.stroke = 'yes'" class="btn btn-light border w-100">Yes</button>
                          </div>
                          <div class="col-lg-6">
                            <button @click="medicalHistory.stroke = 'no'" class="btn btn-light border w-100">No</button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </tab-content>

                  <tab-content>
                    <div class="step-1">
                      <div class="question-section">
                        <p>High blood pressure(hypertension)</p>

                        <div class="row mb-5">
                          <div class="col-lg-6">
                            <button @click="medicalHistory.high_blood_pressure ='yes'" class="btn btn-light border w-100">Yes</button>
                          </div>
                          <div class="col-lg-6">
                            <button @click="medicalHistory.high_blood_pressure ='no'" class="btn btn-light border w-100">No</button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </tab-content>

                  <tab-content>
                    <div class="step-1">
                      <div class="question-section">
                        <p>High blood sugar (diabetes)</p>

                        <div class="row mb-5">
                          <div class="col-lg-6">
                            <button @click="medicalHistory.diabetes ='yes'" class="btn btn-light border w-100">Yes</button>
                          </div>
                          <div class="col-lg-6">
                            <button @click="medicalHistory.diabetes ='no'" class="btn btn-light border w-100">No</button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </tab-content>

                  <tab-content>
                    <div class="step-1">
                      <div class="question-section">
                        <p>High blood cholesterol or dyslipidemia</p>

                        <div class="row mb-5">
                          <div class="col-lg-6">
                            <button @click="medicalHistory.high_blood_cholesterol ='yes'" class="btn btn-light border w-100">Yes</button>
                          </div>
                          <div class="col-lg-6">
                            <button @click="medicalHistory.high_blood_cholesterol ='no'"  class="btn btn-light border w-100">No</button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </tab-content>

                  <tab-content>
                    <div class="step-1">
                      <div class="question-section">
                        <p>Kidney disease</p>

                        <div class="row mb-5">
                          <div class="col-lg-6">
                            <button  @click="medicalHistory.kidney_disease ='yes'"  class="btn btn-light border w-100">Yes</button>
                          </div>
                          <div class="col-lg-6">
                            <button  @click="medicalHistory.kidney_disease ='no'"  class="btn btn-light border w-100">No</button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </tab-content>

                  <template slot="footer" slot-scope="props">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="wizard-footer-left">
                        <wizard-button v-if="props.activeTabIndex > 0" @click.native="props.prevTab()" :style="props.fillButtonStyle">Previous</wizard-button>
                      </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="wizard-footer-bullet">
                          <div class="bullet-btn" :class="props.activeTabIndex == 0 ? 'active': '' "></div>
                          <div class="bullet-btn" :class="props.activeTabIndex == 1 ? 'active': '' "></div>
                          <div class="bullet-btn" :class="props.activeTabIndex == 2 ? 'active': '' "></div>
                          <div class="bullet-btn" :class="props.activeTabIndex == 3 ? 'active': '' "></div>
                          <div class="bullet-btn" :class="props.activeTabIndex == 4 ? 'active': '' "></div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="wizard-footer-right">
                          <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Next</wizard-button>

                          <wizard-button v-else @click.native="saveData" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">{{props.isLastStep ? 'Done' : 'Next'}}</wizard-button>
                        </div>
                      </div>
                    </div>
                  </template>
                </form-wizard>
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
  name: "health-records",
  data() {
    return {
      patientId: '',
      patient: '',
      userId: '',
      medicalHistory: {
        diabetes: "no",
        high_blood_cholesterol: "no",
        allergies: "no",
        stroke: "no",
        high_blood_pressure: "no",
        name: "medical_history",
        heart_disease: "no",
        other_ilness: "no",
        kidney_disease: "no"
      }
    };
  },
  methods: {
    saveData() {
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date+' '+time;
      let finalData = {
        id: this.$uuid.v4(),
        meta: {
          collected_by: this.userId,
          created_at: dateTime,
        },
        body: {
          type: 'survey',
          patient_id: this.patientId,
          assessment_id: '',
          data: this.medicalHistory
        }
      }
      this.$store.dispatch('addQuestionnaire', finalData)
      this.$router.push({ name: 'questionnaire', params: { patientId: this.patientId }})
    },
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
    this.userId = this.$store.state.auth.user.uid;
    this.getPatient()
  },
};
</script>

