<template>
    <div class="content past-assessment">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon" @click.prevent="$router.go(-1)"></i>
                <div class="">
                    <h4>Past Encounter</h4>
                    <div class="breadcrumb" v-if="patient"><span>Patients / {{ patient.body.first_name + " " + patient.body.last_name }} / Past Encounters </span>/ Encounter Details</div>
                </div>
            </div>
            <div class="col-lg-12 border-top border-bottom">
                <div class="patient">
                    <div class="patient-image mr-4" v-if="patient">
                        <img v-if="patient.body.avatar" :src="patient.body.avatar" class="rounded-circle img-fluid" width="100" height="100" :alt="patient.body.first_name" onerror="this.src='data:image/png;base64,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'">
                        <img v-else src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
                    </div>
                    <div class="patient-details" v-if="patient">
                        <div class="patient-name">{{ patient.body.first_name + " " + patient.body.last_name }}</div>
                        <div class="details">
                            <div class="age text-capitalize">{{ patient.body.age }} Y {{ patient.body.gender }}</div>
                            <div class="nid">NID: {{ patient.body.nid}} </div>
                            <div class="pid">PID: {{ patient.body.pid }}</div>
                            <div class="register-date">Registered on: {{ patient.meta.created_at }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 border-bottom" v-if="assessment">
                    <div class="edit-past-assessment">
                        <div class="assessment-date">{{ assessment.body.assessment_date }}</div>
                        <div class="in-clinic text-capitalize">{{ assessment.body.type }}</div>
                        <div class="edit-encounter"><span><i class="fas fa-pen"></i></span><router-link  :to="{name: 'encounterEdit', params: { assessmentId: assessmentId }}"
                                                                                                         tag="a">Edit Encounter</router-link></div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="past-assessment-content">
                        <div class="row">
                            <div class="col-lg-6" v-for="(observation, index) in observations" :key="index">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="assessment-content">
                                            <div class="observe">Observation</div>
                                            <div class="title text-capitalize">{{ observation.body.data.name.replace(/_/g, ' ') }}</div>
                                            <div class="reading">Average reading: {{ observation.body.data.value }} {{ observation.body.data.unit }}
                                            </div>
                                            <div class="record">Recorded by: </div>
                                            <div class="measured">Measured using: {{ observation.body.data.device }}</div>
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
    name: "PastAssessments",
    data() {
      return {
        patient: null,
        patientId: '',
        carePlans: '',
        assessmentId: '',
        assessment: '',
        loader: '',
        observations: '',
        bloodPressures: '',
      };
    },

    methods: {
      getPatientInfo() {
        this.$http.get("/patients/" + this.patientId).then(response => {
            this.loader.hide();
            if (response.status == 200) {
              this.patient = response.data.data;
            }
          },
          error => {
            this.loader.hide();
          });
      },
      getAssessmentDetails() {
        this.loader = this.$loading.show();
        this.$http.get("/assessments/" + this.assessmentId).then(response => {
            if (response.status == 200) {
              this.assessment = response.data.data;
              this.patientId = this.assessment.body.patient_id
              this.getPatientInfo()

            }
          },
          error => {
            this.loader.hide();
          });
      },
      getObservation() {
        this.$http.get("/observations/" ).then(response => {
            if (response.status == 200) {
              this.observations = response.data.data.filter(observation => observation.body.assessment_id == this.assessmentId && observation.body.type != 'survey' && observation.body.type != 'blood_pressure');
              this.bloodPressures = response.data.data.filter(observation => observation.body.assessment_id == this.assessmentId && observation.body.type == 'blood_pressure');
              let systolicSum = 0
              let diastolicSum = 0
              let device = ''
              let id = ''
              let collected_by = ''
              let created_at = ''
              let value = ''

              this.bloodPressures.forEach(function(item){
                systolicSum = systolicSum + item.body.data.systolic
                diastolicSum = diastolicSum + item.body.data.diastolic
              });
              if (this.bloodPressures) {
                let systolic = systolicSum / this.bloodPressures.length
                let diastolic = diastolicSum / this.bloodPressures.length
                value = systolic + '/' + diastolic
                device = this.bloodPressures[0].meta.device_id
                id = this.bloodPressures[0].id
                collected_by = this.bloodPressures[0].meta.collected_by
                created_at = this.bloodPressures[0].meta.created_at
                let data = {
                  id: id,
                  meta: {
                    collected_by: collected_by,
                    created_at: created_at,
                    device_id: device,
                  },
                  body: {
                    type: 'blood_pressure',
                    data: {
                      name: 'blood_pressure',
                      comments : '',
                      value: value,
                      unit: 'mmHg',
                      device: device,
                      codings: {

                      }
                    }
                  }
                }
                this.observations.push(data)
              }
            }

          },
          error => {
            this.loader.hide();
          });
      },
    },
    mounted() {
      this.assessmentId = this.$route.params.assessmentId;
      this.getAssessmentDetails()
      this.getObservation()
    }
  }
</script>

<style scoped>

</style>
