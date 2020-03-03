<template>
  <div class="content pending-review-generate">
    <div class="loader" v-if="isLoading">
      <rotate-square2></rotate-square2>
    </div>
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex breadcrumb-wrap">
        <i class="fa fa-arrow-left text-secondary back-icon"></i>
        <div class="">
          <h4>Health Assessment</h4>
          <div class="breadcrumb"><span>Patients</span>/ {{ patientInfo.first_name + " " + patientInfo.last_name }} / Health Assessment</div>
        </div>
      </div>

      <div class="col-lg-12 border-top border-bottom">
        <div class="patient">
          <div class="patient-image mr-4">
            <img src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
          </div>
          <div class="patient-details">
            <div class="patient-name">{{ patientInfo.first_name + " " + patientInfo.last_name }}</div>
            <div class="details">
              <div class="age">{{ patientInfo.age }} {{ patientInfo.gender }}</div>
              <div class="nid">NID: {{ patientInfo.nid}}</div>
              <div class="pid">PID: {{ patientInfo.pid }}</div>
              <div class="register-date">Registered on {{ patientMeta.created_at }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="care-plans">

        <div class="care-plan-item">
          <div class="row ml-3">
            <div class="col-lg-6 col-md-8 col-sm-9 col-11">
              <div class="card card-form">
                <div class="card-header">
                  New Diagnosis
                </div>
                <div class="card-body">
                  <ul class="diagnosis-list">
                    <li class="d-flex justify-content-between">
                      <span>Hypertension</span>
                      <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider round"></span>
                      </label>
                    </li>
                    <li class="d-flex justify-content-between">
                      <span>High Blood Pressure</span>
                      <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                      </label>
                    </li>
                  </ul>

                  <div class="card-actions">
                    <button class="btn btn-outline-primary btn-coordinate w-100" v-b-modal.modal-diagnosis>
                      <i class="fas fa-plus"></i>
                      Add a Diagnosis
                    </button>
                  </div>

                  <b-modal id="modal-diagnosis" class="modal-coordinate">
                    <template v-slot:modal-header>
                      <span class="title">Add Diagnosis</span>
                    </template>
                      <div class="form-group">
                        <label for="">Diagnosis</label>
                        <input type="text" class="form-control form-coordinate" v-modal="newDiagnosis">
                      </div>
                      <template v-slot:modal-footer>
                        <div class="w-100">
                        <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1" @click="addDiagnosis()">
                          Add
                        </b-button>

                        <b-button @click="$bvModal.hide('modal-diagnosis')" variant="link" size="md" class="float-right font-weight-bold p-0">
                          Cancel
                        </b-button>
                      </div>
                    </template>
                  </b-modal>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="care-plan-item">
          <div class="row ml-3">
            <div class="col-lg-6 col-md-8 col-sm-9 col-11">
              <div class="card card-form">
                <div class="card-header">
                  Medications
                </div>
                <div class="card-body">
                  <ul class="diagnosis-list">
                    <li class="d-flex justify-content-between">
                      <span>Start antihypertensive</span>
                      <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider round"></span>
                      </label>
                    </li>
                  </ul>

                  <div class="drugs">
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label for="">Drug Name</label>
                          <input type="text" class="form-control">
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-group">
                          <label for="">Dosage</label>
                          <input type="text" class="form-control">
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card-actions">
                    <div class="btn btn-outline-primary btn-coordinate w-100" v-b-modal.modal-medications>
                      <i class="fas fa-plus"></i>
                      Add a Drug Category
                    </div>

                    <b-modal id="modal-medications" class="modal-coordinate">
                      <template v-slot:modal-header>
                        <span class="title">Add Medicine</span>
                      </template>
                      <div class="select-medicine">
                        <h5>Select Medicine</h5>
                        <div class="select-wrapper">
                          <select class="select">
                            <option value="" selected>Select medicine</option>
                            <option value="napa">Napa</option>
                            <option value="adderall">Adderall</option>
                            <option value="alprazolam">Alprazolam</option>
                          </select>
                        </div>
                      </div>
                      <template v-slot:modal-footer>
                        <div class="w-100">
                          <b-button variant="link" size="sm" class="float-right font-weight-bold p-0 pl-4 pr-1">
                            Add
                          </b-button>

                          <b-button variant="link" size="sm" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-medications')">
                            Cancel
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

        <div class="care-plan-item">
          <div class="row ml-3">
            <div class="col-lg-6 col-md-8 col-sm-9 col-11">
              <div class="card card-form">
                <div class="card-header">
                  Actions
                </div>
                <div class="card-body">

                  <div class="actions">

                    <div class="action-item">
                      <div class="d-flex justify-content-between mb-2">
                        <span>Counselling about reduced salt intake</span>
                        <label class="switch">
                          <input type="checkbox" checked>
                          <span class="slider round"></span>
                        </label>
                      </div>
                      <div class="form-group">
                        <label for="">Duration</label>
                        <select name="" id="" class="form-control">
                          <option value="">Within 1 month</option>
                        </select>
                      </div>
                    </div>

                    <div class="action-item">
                      <div class="d-flex justify-content-between mb-2">
                        <span>Counselling on diet for weight reduction</span>
                        <label class="switch">
                          <input type="checkbox" checked>
                          <span class="slider round"></span>
                        </label>
                      </div>
                      <div class="form-group">
                        <label for="">Duration</label>
                        <select name="" id="" class="form-control">
                          <option value="">Within 1 month</option>
                        </select>
                      </div>
                    </div>

                    <div class="action-item">
                      <div class="d-flex justify-content-between mb-2">
                        <span>Counselling on increasing physical activity</span>
                        <label class="switch">
                          <input type="checkbox" checked>
                          <span class="slider round"></span>
                        </label>
                      </div>
                      <div class="form-group">
                        <label for="">Duration</label>
                        <select name="" id="" class="form-control">
                          <option value="">Within 1 month</option>
                        </select>
                      </div>
                    </div>

                  </div>


                  <div class="card-actions">
                    <div class="btn btn-outline-primary btn-coordinate w-100" v-b-modal.modal-actions>
                      <i class="fas fa-plus"></i>
                      Add an Action
                    </div>

                    <b-modal id="modal-actions" class="modal-coordinate">
                      <template v-slot:modal-header>
                        <span class="title">Add Actions</span>
                      </template>
                      <div class="form-group">
                        <label for="">input box 1</label>
                        <input type="text" class="form-control form-coordinate action-input">
                      </div>

                      <div class="form-group">
                        <label for="">input box 2</label>
                        <input type="text" class="form-control form-coordinate action-input">
                      </div>

                      <div class="form-group">
                        <label for="">input box 3</label>
                        <input type="text" class="form-control form-coordinate action-input">
                      </div>

                      <div class="select-actions">
                        <h5>Select box 1</h5>
                        <div class="select-wrapper">
                          <select class="select">
                            <option value=""></option>
                            <option value="value1">add option</option>
                            <option value="value1">add option</option>
                          </select>
                        </div>
                      </div>

                      <div class="select-actions">
                        <h5>Select box 2</h5>
                        <div class="select-wrapper">
                          <select class="select">
                            <option value=""></option>
                            <option value="value1">add option</option>
                            <option value="value1">add option</option>
                          </select>
                        </div>
                      </div>

                      <div class="select-actions">
                        <h5>Select box 2</h5>
                        <div class="select-wrapper">
                          <select class="select">
                            <option value=""></option>
                            <option value="value1">add option</option>
                            <option value="value1">add option</option>
                          </select>
                        </div>
                      </div>

                      <template v-slot:modal-footer>
                        <div class="w-100">
                          <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                            Add
                          </b-button>

                          <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-actions')">
                            Cancel
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

         <div class="care-plan-item">
          <div class="row ml-3">
            <div class="col-lg-6 col-md-8 col-sm-9 col-11">
              <div class="card card-form">
                <div class="card-header">
                  Follow Up
                </div>
                <div class="card-body">

                  <div class="actions">

                    <div class="action-item">
                      <div class="d-flex justify-content-between mb-2">
                        <span>Follow-up NCD health check in 6 months?</span>
                        <label class="switch">
                          <input type="checkbox">
                          <span class="slider round"></span>
                        </label>
                      </div>
                      <span>After how long should we follow up?</span>
                      <div class="form-group mt-3">
                        <label for="">Duration</label>
                        <select name="" id="" class="form-control">
                          <option value="">Within 1 month</option>
                        </select>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="care-plan-item">
          <div class="row ml-3">
            <div class="col-lg-6 col-md-8 col-sm-9 col-11">
              <div class="comments">
                <div class="form-group">
                  <label for="">Comments/Notes (Optional)</label>
                  <textarea v-model="comments" class="form-control" rows="4"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <button class="btn btn-primary btn-confirm">Confirm Care Plan</button>


    </div>
  </div>
</template>
<script>

import {RotateSquare2} from 'vue-loading-spinner'

export default {
  name: "health-records",
  components: { RotateSquare2 },
  data() {
    return {
      isLoading: true,
      participants: [],
      participant_info: {},
      allergies: [],
      participantId: '',
      lifestyle: '',
      body_composition: '',
      blood_pressure: '',
      diabetes: '',
      cholesterol: '',
      cvd: '',
      goals: [],
      referrals: [],
      assessment_date: '',
      newDiagnosis: '',
      patientId: '',
      patientMeta: '',
      patientInfo: '',
      comments: '',
      reviewId: ''
    };
  },
  methods: {
    addDiagnosis() {
      // this.$bvModal.hide('modal-diagnosis');
    },
    getHealthReport() {
      this.$http.get('/health-reports/'+ this.reviewId).then( response => {
        if (response.status == 200) {
          console.log(response.data.data)
          this.patientId = response.data.data.body.patient_id
          this.getPatientInfo()
        }
      })
    },
    getPatientInfo() {
      this.$http.get('/patients/' + this.patientId).then(response => {
        if (response.status == 200) {
          this.patientMeta = response.data.data.meta
          this.patientInfo = response.data.data.body
          this.isLoading = false
        }
      })
    }
  },
  created() {
    if (this.$route.params.reviewId) {
      this.reviewId = this.$route.params.reviewId
      this.getHealthReport()
    }
  },
  mounted() {

  }
};
</script>

