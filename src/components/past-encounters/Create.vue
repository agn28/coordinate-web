<template>
  <div class="content encounter-create">
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex breadcrumb-wrap">
        <i class="fa fa-arrow-left text-secondary back-icon pointer" @click.prevent="$router.go(-1)"></i>
        <div v-if="patient">
          <h4>Create a New Encounter</h4>
          <div class="breadcrumb"><span>Patients / {{ patient.body.first_name + " " + patient.body.last_name }} </span>/ Create a New Encounter</div>
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
            <div class="encounter-header">
              Complete all the sections that are applicable
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <div class="encounter-body">
              <div class="row">
                <div class="col-lg-6 mb-4">
                  <div class="card pointer" @click="$router.push({ name: 'questionnaire', params: { patientId: patientId }})">
                    <div class="card-body">
                      <div class="encounter-content">
                        <div class="content">
                          <img src="../../assets/images/illustration_questionnaire.png" alt="">
                          <div class="content-details">
                            <div class="content-title">Questionnaire</div>
                            <div v-if="questionnaire.length == 5" class="content-status complete-color">Complete</div>
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
                  <div class="card pointer" @click="$router.push({ name: 'bodyMeasurement', params: { patientId: patientId }})">
                    <div class="card-body">
                      <div class="encounter-content">
                        <div class="content">
                          <img src="../../assets/images/illustration_body-measurements.png" alt="">
                          <div class="content-details">
                            <div class="content-title">Body Measurements</div>
                            <div v-if="bodyMeasurements.length === 3" class="content-status complete-color">Complete</div>
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
                <div class="col-lg-6 mb-4">
                  <div class="card pointer" @click="$router.push({ name: 'bloodPressure', params: { patientId: patientId }})">
                    <div class="card-body">
                      <div class="encounter-content" >
                        <div class="content">
                          <img src="../../assets/images/illustration_blood-pressure.png" alt="">
                          <div class="content-details">
                            <div class="content-title">Blood Pressure</div>
                            <div v-if="Object.keys(blood_pressure).length > 0" class="content-status complete-color">Complete</div>
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
                <div class="col-lg-6 card-link mb-4">
                  <div class="card pointer" @click="$router.push({ name: 'bloodTests', params: { patientId: patientId }})">
                    <div class="card-body">
                      <div class="encounter-content">
                        <div class="content">
                          <img src="../../assets/images/illustration_blood-tests.png" alt="">
                          <div class="content-details">
                            <div class="content-title">Blood Tests</div>
                            <div v-if="blood_tests.length >= 7" class="content-status complete-color">Completed</div>
                            <div v-else class="content-status skipped-color">Incomplete</div>
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
                  <div class="comment-section">
                    <div class="form-group">
                      <label for="">Comments/Notes (Optional)</label>
                      <textarea class="form-control" v-model="comments" id="" rows="4" cols="50"></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xl-4 col-lg-4 col-md-6">
                  <div class="encounter-type">
                    <div class="type-title">Encounter Type</div>
                    <div class="type-checkbox">
                      <div class="custom-control custom-radio">
                        <input type="radio" v-model="encounterType" class="custom-control-input" id="inClinic"
                               name="example1" value="in-clinic">
                        <label class="custom-control-label" for="inClinic">In-clinic Screening</label>
                      </div>
                      <div class="custom-control custom-radio">
                        <input type="radio" v-model="encounterType" class="custom-control-input" id="homeVisit"
                               name="example1" value="home-visit">
                        <label class="custom-control-label" for="homeVisit">Home Visit</label>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-12">
                  <button class="btn btn-save mr-5" v-b-modal.modal-save>Save Encounter</button>
                  <b-modal id="modal-save" class="modal-coordinate">
                    <template v-slot:modal-header>
                      <span class="title">Confirm Save</span>
                    </template>

                    <div class="discard-msg">
                      You have missing sections for this encounter. Are you sure you want to save?
                    </div>


                    <template v-slot:modal-footer>
                      <div class="w-100">
                        <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-4" >
                          Save
                        </b-button>
                        <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-1" @click="$bvModal.hide('modal-save')">
                          Cancel
                        </b-button>
                      </div>
                    </template>
                  </b-modal>

                  <button class="btn btn-cancel" v-b-modal.modal-discard>Cancel</button>
                  <b-modal id="modal-discard" class="modal-coordinate">
                    <template v-slot:modal-header>
                      <span class="title">Confirm Discard</span>
                    </template>

                    <div class="discard-msg">
                      You have unsaved changes.Would you like to save changes?
                    </div>


                    <template v-slot:modal-footer>
                      <div class="w-100">
                        <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-4" >
                          Save & Discard
                        </b-button>
                        <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-4">
                          Discard without saving
                        </b-button>
                        <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-1" @click="$bvModal.hide('modal-discard')">
                          Go Back
                        </b-button>
                      </div>
                    </template>
                  </b-modal>
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

  export default {
    name: "createEncounter",
    components: {},
    data() {
      return {
        patientId: null,
        patient: null,
        comments: '',
        encounterType: null,
        blood_pressure: '',
        blood_tests: [],
        bodyMeasurements: [],
        questionnaire: [],
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
      }
    },
    mounted() {

    },
    created() {
      this.patientId = this.$route.params.patientId;
      this.blood_pressure = this.$store.getters.getBloodPressure
      this.blood_tests = this.$store.getters.getBloodTests
      this.bodyMeasurements = this.$store.getters.getBodyMeasurement
      this.questionnaire = this.$store.getters.getQuestionnaire
      console.log(this.blood_pressure)
      this.getPatient()
    }
  };
</script>

<style lang="">
</style>
