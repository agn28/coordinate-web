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
          <div class="breadcrumb"><span>Patients</span>/ patient name / Health Assessment</div>
        </div>
      </div>

      <div class="col-lg-12 border-top border-bottom">
        <div class="patient">
          <div class="patient-image mr-4">
            <img src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
          </div>
          <div class="patient-details">
            <div class="patient-name">Jahanara Begum</div>
            <div class="details">
              <div class="age">31y Female</div>
              <div class="nid">NID: 1992121224343</div>
              <div class="pid">PID: N-121233333</div>
              <div class="register-date">Registered on Jan 5, 2019</div>
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
                        <b-button variant="link" size="sm" class="float-right font-weight-bold p-0 pl-4" @click="addDiagnosis()">
                          Add
                        </b-button>
                        
                        <b-button @click="$bvModal.hide('modal-diagnosis')" variant="link" size="sm" class="float-right font-weight-bold p-0">
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
                    <div class="btn btn-outline-primary btn-coordinate w-100">
                      <i class="fas fa-plus"></i>
                      Add a Drug Category
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
                    <div class="btn btn-outline-primary btn-coordinate w-100">
                      <i class="fas fa-plus"></i>
                      Add an Action
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
                  <text-area class="form-control"></text-area>
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
      isLoading: false,
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
      newDiagnosis: ''
    };
  },
  methods: {
    addDiagnosis() {
      // this.$bvModal.hide('modal-diagnosis');
    }
  },
  mounted() {

  }
};
</script>

