<template>
  <div class="content pending-review-assessment">
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

      <div class="row">
        <div class="col-lg-12">
          <div class="generation">
            <div class="row">
              <h4 class="text-bold">Date of Generation: Jan 5, 2020</h4>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="card mb-4">
                  <div class="card-body">
                    <span class="edit-icon"> <i class="fas fa-pen"></i></span>
                    <h4 class="text-bold">Conditions</h4>
                    <ul class="disease-list">
                      <li><img src="../../assets/images/diabetes.png" alt="">Diabetes</li>
                      <li><img src="../../assets/images/hypertension.png" alt="">Hypertension</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card mb-4">
                  <div class="card-body">
                    <span class="edit-icon"> <i class="fas fa-pen"></i></span>
                    <h4 class="text-bold">Current Medications</h4>
                    <ul class="medicine-list">
                      <li>None recorded</li>
                    </ul>
                  </div>
                </div>
              </div>
            <div class="patient-state mt-4">

            </div>
          </div>
          </div>
        </div>

      </div>

      <div class="row">
        <div class="col-lg-12">
        <div class="body-content">
          <div class="card">
          <h4>Lifestyle</h4>
          <div class="row body-content-row">
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3">
              <div class="card-body lifestyle-card-body">
                <div class="patient-habit">

                  <div class="habit-type">
                    <span class="edit-icon" @click="$router.push({ name: 'tobacco', params: { reviewId: '1234s'}})"> <i class="fas fa-pen"></i></span>
                    <img src="../../assets/images/icon_smoker.png" class="type-image" width="50" height="50" alt="">
                    <div class="type-name">Tobacco Use</div>
                    <div class="type-1">Smoke</div>
                    <div class="recent-activity">Quit Tobacco</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3 mb-3">
              <div class="card-body lifestyle-card-body">
                <div class="patient-habit">
                  <div class="habit-type">
                    <span class="edit-icon" @click="$router.push({ name: 'alcohol', params: { reviewId: '1234s'}})"> <i class="fas fa-pen"></i></span>
                    <img src="../../assets/images/icon_alcohol.png" class="type-image" width="50" height="50" alt="">
                    <div class="type-name">Alcohol Consumption</div>
                    <div class="type-2">None</div>
                    <div>Alcohol use prevention</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3 mb-3">
              <div class="card-body lifestyle-card-body">
                <div class="patient-habit">
                  <div class="habit-type">
                    <span class="edit-icon" @click="$router.push({ name: 'diet', params: { reviewId: '1234s'}})"> <i class="fas fa-pen"></i></span>
                    <img src="../../assets/images/icon_fruits.png" class="type-image" width="50" height="50" alt="">
                    <div class="type-name">Fruits and vegetables intake</div>
                    <div class="type-3">Adequate</div>
                    <div>Maintain current Status</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3 mb-3">
              <div class="card-body lifestyle-card-body">
                <div class="patient-habit">
                  <div class="habit-type">
                    <span class="edit-icon" @click="$router.push({ name: 'physical', params: { reviewId: '1234s'}})"> <i class="fas fa-pen"></i></span>
                    <img src="../../assets/images/icon_physical-activity.png" class="type-image" width="50" height="50" alt="">
                    <div class="type-name">Physical Activity</div>
                    <div class="type-3">Inadequate</div>
                    <div>Increase physical activity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="body-composition">
            <div class="card">
              <h4>Boby Composition</h4>
              <div class="row body-content-row">
                <div class="col-xl-6 col-lg-8 col-md-12 mb-3">
                  <div class="card-body">
                    <div class="body-condition">
                      <div class="condition">
                        <div class="condition-header">
                          <div class="type-name">Hip Circumference</div>
                          <span class="edit-icon" v-b-modal.modal-circumference> <i class="fas fa-pen"></i></span>
                          <b-modal id="modal-circumference" class="modal-coordinate">
                            <template v-slot:modal-header>
                              <span class="title">Set Hip Circumference</span>
                            </template>
                            <div class="d-flex align-items-center">
                              <div class="form-group">
                                <label for="">Hip</label>
                                <input type="text" class="form-control form-coordinate circumference-input">
                              </div>
                              <div class="measurement-type">
                                <div class="custom-control custom-radio">
                                  <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" checked>
                                  <label class="custom-control-label" for="customRadio1">cm</label>
                                </div>
                                <div class="custom-control custom-radio">
                                  <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
                                  <label class="custom-control-label" for="customRadio2">inch</label>
                                </div>
                              </div>
                            </div>

                            <div class="select-device">
                              <h5>Select Device</h5>
                              <div class="select-wrapper">
                                <select class="select">
                                  <option value=""></option>
                                  <option value="value1">Device 1</option>
                                  <option value="value1">Device 2</option>
                                </select>
                              </div>
                            </div>
                            <div class="comment-section">

                              <div class="form-group">
                                <label for="comment">Comments/Notes (Optional)</label>
                                <textarea class="form-control" id="comment" rows="4"></textarea>
                              </div>
                            </div>

                            <template v-slot:modal-footer>
                              <div class="w-100">
                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                                  Unable to Perform
                                </b-button>

                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                  Add
                                </b-button>

                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-circumference')">
                                  Cancel
                                </b-button>
                              </div>
                            </template>
                          </b-modal>
                        </div>
                        <div class="condition-details">
                          <div class="measurement">99cm</div>
                          <div class="result">High</div>
                          <div class="color-code" id="circumference">
                            <div class="color-1"></div>
                            <div class="color-2"></div>
                            <div class="color-3"></div>
                          </div>
                        </div>
                        <div class="condition-range">18.5 to 24.9</div>
                      </div>
                    </div>
                    <div class="suggest">Weight reduction</div>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-8 col-md-12 mb-3">
                  <div class="card-body">
                    <div class="body-condition">
                      <div class="condition">
                        <div class="condition-header">
                          <div class="type-name">BMI</div>
                          <span class="edit-icon" v-b-modal.modal-bmi> <i class="fas fa-pen"></i></span>
                          <b-modal id="modal-bmi" class="modal-coordinate">
                            <template v-slot:modal-header>
                              <span class="title">Set BMI</span>
                            </template>
                            <div class="d-flex align-items-center">
                              <div class="form-group">
                                <label for="">BMI</label>
                                <input type="text" class="form-control form-coordinate circumference-input">
                              </div>
                              <div class="measurement-type">
                                <div class="custom-control custom-radio">
                                  <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" checked>
                                  <label class="custom-control-label" for="customRadio3">cm</label>
                                </div>
                                <div class="custom-control custom-radio">
                                  <input type="radio" id="customRadio4" name="customRadio" class="custom-control-input">
                                  <label class="custom-control-label" for="customRadio4">inch</label>
                                </div>
                              </div>
                            </div>

                            <div class="select-device">
                              <h5>Select Device</h5>
                              <div class="select-wrapper">
                                <select class="select">
                                  <option value=""></option>
                                  <option value="value1">Device 1</option>
                                  <option value="value1">Device 2</option>
                                </select>
                              </div>
                            </div>
                            <div class="comment-section">

                              <div class="form-group">
                                <label for="comment">Comments/Notes (Optional)</label>
                                <textarea class="form-control" id="commentBmi" rows="4"></textarea>
                              </div>
                            </div>

                            <template v-slot:modal-footer>
                              <div class="w-100">
                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                                  Unable to Perform
                                </b-button>

                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                  Add
                                </b-button>

                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-bmi')">
                                  Cancel
                                </b-button>
                              </div>
                            </template>
                          </b-modal>
                        </div>
                        <div class="condition-details">
                          <div class="measurement">31.4</div>
                          <div class="result">Overweight</div>
                          <div class="color-code">
                            <div class="color-1"></div>
                            <div class="color-2"></div>
                            <div class="color-3"></div>
                          </div>
                        </div>
                        <div class="condition-range">18.5 to 24.9</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="disease-name">
            <div class="card">
              <div class="disease-name-header">
                <h4 class="type-name">Blood Pressure</h4>
                <span @click="$router.push({ name: 'pendingReviewBloodPressure', params: { reviewId: '1234s'}})" class="edit-icon"> <i class="fas fa-pen"></i></span>
              </div>
              <div class="card-body custom-card-body">
                <div class="body-condition">
                  <div class="condition">
                    <div class="condition-details">
                      <div class="measurement mr-3">140/95mmHg</div>
                      <div class="result mr-3">Hypertensive</div>
                      <div class="color-code">
                        <div class="color-1"></div>
                        <div class="color-2"></div>
                        <div class="color-3"></div>
                      </div>
                    </div>
                    <div class="condition-range">&lt; 130 / 80 mmHG</div>
                  </div>
                </div>
                <div class="suggest">Reduce blood pressure</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="disease-name">
            <div class="card">
              <div class="disease-name-header">
                <h4 class="type-name">Diabetese</h4>
                <span class="edit-icon" v-b-modal.modal-diabetese> <i class="fas fa-pen"></i></span>
                <b-modal id="modal-diabetese" class="modal-coordinate">
                  <template v-slot:modal-header>
                    <span class="title">Set Diabetese</span>
                  </template>
                  <div class="d-flex align-items-center">
                    <div class="form-group">
                      <label for="">Fasting Blood Sugar</label>
                      <input type="text" class="form-control form-coordinate circumference-input">
                    </div>
                    <div class="measurement-type">
                      <div class="custom-control custom-radio">
                        <input type="radio" id="diabeteseMg" name="cholesterol" class="custom-control-input" checked>
                        <label class="custom-control-label" for="customRadio3">mg/dL</label>
                      </div>
                      <div class="custom-control custom-radio">
                        <input type="radio" id="diabeteseMmol" name="cholesterol" class="custom-control-input">
                        <label class="custom-control-label" for="customRadio4">mmol/L</label>
                      </div>
                    </div>
                  </div>

                  <div class="select-device">
                    <h5>Select Device</h5>
                    <div class="select-wrapper">
                      <select class="select">
                        <option value=""></option>
                        <option value="value1">Device 1</option>
                        <option value="value1">Device 2</option>
                      </select>
                    </div>
                  </div>
                  <div class="comment-section">

                    <div class="form-group">
                      <label for="comment">Comments/Notes (Optional)</label>
                      <textarea class="form-control" id="commentDiabetese" rows="4"></textarea>
                    </div>
                  </div>

                  <template v-slot:modal-footer>
                    <div class="w-100">
                      <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                        Unable to Perform
                      </b-button>

                      <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                        Add
                      </b-button>

                      <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-diabetese')">
                        Cancel
                      </b-button>
                    </div>
                  </template>
                </b-modal>
              </div>
              <div class="card-body custom-card-body">
                <div class="body-condition">
                  <div class="condition">
                    <div class="type">Fasting Blood Sugar</div>
                    <div class="condition-details">
                      <div class="measurement mr-3">120 mg/dL</div>
                      <div class="result mr-3">Pre-diabetes</div>
                      <div class="color-code">
                        <div class="color-1"></div>
                        <div class="color-2"></div>
                        <div class="color-3"></div>
                      </div>
                    </div>
                    <div class="condition-range">&lt; 100mg/dL</div>
                  </div>
                </div>
                <div class="suggest">Improve glycemic Control</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="disease-name">
            <div class="card">
              <div class="disease-name-header">
                <h4 class="type-name">Cholesterol</h4>
                <span class="edit-icon" v-b-modal.modal-cholesterol> <i class="fas fa-pen"></i></span>
                <b-modal id="modal-cholesterol" class="modal-coordinate">
                  <template v-slot:modal-header>
                    <span class="title">Set Total Cholesterol</span>
                  </template>
                  <div class="d-flex align-items-center">
                    <div class="form-group">
                      <label for="">Total Cholesterol</label>
                      <input type="text" class="form-control form-coordinate circumference-input">
                    </div>
                    <div class="measurement-type">
                      <div class="custom-control custom-radio">
                        <input type="radio" id="cholesterolMg" name="cholesterol" class="custom-control-input" checked>
                        <label class="custom-control-label" for="customRadio3">mg/dL</label>
                      </div>
                      <div class="custom-control custom-radio">
                        <input type="radio" id="cholesterolMm" name="cholesterol" class="custom-control-input">
                        <label class="custom-control-label" for="customRadio4">mmol/L</label>
                      </div>
                    </div>
                  </div>

                  <div class="select-device">
                    <h5>Select Device</h5>
                    <div class="select-wrapper">
                      <select class="select">
                        <option value=""></option>
                        <option value="value1">Device 1</option>
                        <option value="value1">Device 2</option>
                      </select>
                    </div>
                  </div>
                  <div class="comment-section">

                    <div class="form-group">
                      <label for="comment">Comments/Notes (Optional)</label>
                      <textarea class="form-control" id="commentCholesterol" rows="4"></textarea>
                    </div>
                  </div>

                  <template v-slot:modal-footer>
                    <div class="w-100">
                      <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                        Unable to Perform
                      </b-button>

                      <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-4">
                        Add
                      </b-button>

                      <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-cholesterol')">
                        Cancel
                      </b-button>
                    </div>
                  </template>
                </b-modal>
              </div>
              <div class="card-body custom-card-body">
                <div class="body-condition">
                  <div class="condition">
                    <div class="type">Total Cholesterol</div>
                    <div class="condition-details">
                      <div class="measurement mr-3">250mg/dL</div>
                      <div class="result mr-3">High</div>
                      <div class="color-code">
                        <div class="color-1"></div>
                        <div class="color-2"></div>
                        <div class="color-3"></div>
                      </div>
                    </div>
                    <div class="condition-range">&lt; 200mg/dL</div>
                  </div>
                </div>
                <div class="suggest">Look at guidelines for recommendation. Treat based on CVD risk rules</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="disease-name">
            <div class="card">
              <div class="disease-name-header">
                <h4 class="type-name">Cardiovascular Risk</h4>
                <span class="edit-icon" v-b-modal.modal-cvd> <i class="fas fa-pen"></i></span>
                <b-modal id="modal-cvd" class="modal-coordinate">
                  <template v-slot:modal-header>
                    <span class="title">Set Cardiovascular</span>
                  </template>
                  <div class="d-flex align-items-center">
                    <div class="form-group">
                      <label for="">CVD</label>
                      <input type="text" class="form-control form-coordinate circumference-input">
                    </div>
                    <div class="measurement-type">
                      <div class="custom-control custom-radio">
                        <input type="radio" id="cvdPercent" name="cholesterol" class="custom-control-input" checked>
                        <label class="custom-control-label" for="customRadio3">%</label>
                      </div>
                    </div>
                  </div>

                  <div class="select-device">
                    <h5>Select Device</h5>
                    <div class="select-wrapper">
                      <select class="select">
                        <option value=""></option>
                        <option value="value1">Device 1</option>
                        <option value="value1">Device 2</option>
                      </select>
                    </div>
                  </div>
                  <div class="comment-section">

                    <div class="form-group">
                      <label for="comment">Comments/Notes (Optional)</label>
                      <textarea class="form-control" id="commentCvd" rows="4"></textarea>
                    </div>
                  </div>

                  <template v-slot:modal-footer>
                    <div class="w-100">
                      <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                        Unable to Perform
                      </b-button>

                      <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                        Add
                      </b-button>

                      <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-cvd')">
                        Cancel
                      </b-button>
                    </div>
                  </template>
                </b-modal>
              </div>
              <div class="card-body custom-card-body">
                <div class="body-condition">
                  <div class="condition">
                    <div class="type">Your 10 year risk</div>
                    <div class="condition-details">
                      <div class="measurement mr-3">30% to 40%</div>
                      <div class="result mr-3">Medium</div>
                      <div class="color-code">
                        <div class="color-1"></div>
                        <div class="color-2"></div>
                        <div class="color-3"></div>
                      </div>
                    </div>
                    <div class="condition-range">&lt; 5%</div>
                  </div>
                </div>
                <div class="suggest">Improve blood pressure control</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="comment-section mb-4">

              <div class="form-group mb-4">
                <label for="exampleFormControlTextarea3">Comments/Notes (Optional)</label>
                <textarea class="form-control" id="exampleFormControlTextarea3" rows="4"></textarea>
              </div>
              <button class="btn btn-primary" @click="$router.push({ name: 'pendingReviewGenerate', params: { reviewId: '1234s'}})">Proceed to generating Care Plan</button>
          </div>

        </div>
      </div>

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
      assessment_date: ''
    };
  },
  methods: {

  },
  mounted() {

  }
};
</script>

