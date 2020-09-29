<template>
  <div class="content pending-review-assessment">
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex breadcrumb-wrap">
        <i class="fa fa-arrow-left text-secondary back-icon"></i>
        <div class="">
          <h4>Health Assessment</h4>
          <div class="breadcrumb">
            <span>Patients</span>/
            {{ patientInfo.first_name + " " + patientInfo.last_name }} / Health
            Assessment
          </div>
        </div>
      </div>
      <div class="col-lg-12 border-top border-bottom">
        <div class="patient">
          <div class="patient-image mr-4">
            <img
              src="../../assets/images/avatar/dummy-man-570x570.png"
              class="rounded-circle img-fluid"
              width="100"
              height="100"
              alt=""
            />
          </div>
          <div class="patient-details">
            <div class="patient-name">
              {{ patientInfo.first_name + " " + patientInfo.last_name }}
            </div>
            <div class="details">
              <div class="age">{{ patientInfo.age }}</div>
              <div class="nid">NID: {{ patientInfo.nid }}</div>
              <div class="pid">PID: {{ patientInfo.pid }}</div>
              <div class="register-date">
                Registered on: {{ getFormattedDate(patientMeta.created_at) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="generation">
            <div class="row">
              <h4 class="text-bold">Date of Generation: {{ report_date }}</h4>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="card mb-4">
                  <div class="card-body">
                    <span class="edit-icon"> <i class="fas fa-pen"></i></span>
                    <h4 class="text-bold">Conditions</h4>
                    <ul class="disease-list">
                      <li class="text-capitalize" v-for="(condition, index) in medicalHistory" :key="index">
                        {{ condition}}
                      </li>
                      
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
                      <li
                        v-for="(medication, index) in medications"
                        :key="index"
                      >
                        {{ medication }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="patient-state mt-4"></div>
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
                        <span
                          class="edit-icon"
                          @click="
                            $router.push({
                              name: 'tobacco',
                              params: { reviewId: '1234s' },
                            })
                          "
                        >
                          <i class="fas fa-pen"></i
                        ></span>
                        <img
                          src="../../assets/images/icon_smoker.png"
                          class="type-image"
                          width="50"
                          height="50"
                          alt=""
                        />
                        <div class="type-name">Tobacco Use</div>
                        <div
                          v-if="
                            assessment.assessments &&
                            assessment.assessments.lifestyle &&
                            assessment.assessments.lifestyle.components.smoking
                          "
                        >
                          <div
                            class="type"
                            :class="
                              assessment.assessments.lifestyle.components
                                .smoking.tfl
                            "
                          >
                            {{
                              assessment.assessments.lifestyle.components
                                .smoking.eval
                            }}
                          </div>
                          <div class="recent-activity">
                            {{
                              assessment.assessments.lifestyle.components
                                .smoking.message
                            }}
                          </div>
                        </div>
                        <div class="ml-2" v-else>
                          No Tobacco Usage data found!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3 mb-3">
                  <div class="card-body lifestyle-card-body">
                    <div class="patient-habit">
                      <div class="habit-type">
                        <span
                          class="edit-icon"
                          @click="
                            $router.push({
                              name: 'alcohol',
                              params: { reviewId: '1234s' },
                            })
                          "
                        >
                          <i class="fas fa-pen"></i
                        ></span>
                        <img
                          src="../../assets/images/icon_alcohol.png"
                          class="type-image"
                          width="50"
                          height="50"
                          alt=""
                        />
                        <div class="type-name">Alcohol Consumption</div>
                        <div
                          v-if="
                            assessment.assessments &&
                            assessment.assessments.lifestyle &&
                            assessment.assessments.lifestyle.components.alcohol
                          "
                        >
                          <div
                            class="type"
                            :class="
                              assessment.assessments.lifestyle.components
                                .alcohol.tfl
                            "
                          >
                            {{
                              assessment.assessments.lifestyle.components
                                .alcohol.eval
                            }}
                          </div>
                          <div class="recent-activity">
                            {{
                              assessment.assessments.lifestyle.components
                                .alcohol.message
                            }}
                          </div>
                        </div>
                        <div class="ml-2" v-else>
                          No Alcohol Consumption data found!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3 mb-3">
                  <div class="card-body lifestyle-card-body">
                    <div class="patient-habit">
                      <div class="habit-type">
                        <span
                          class="edit-icon"
                          @click="
                            $router.push({
                              name: 'diet',
                              params: { reviewId: '1234s' },
                            })
                          "
                        >
                          <i class="fas fa-pen"></i
                        ></span>
                        <img
                          src="../../assets/images/icon_fruits.png"
                          class="type-image"
                          width="50"
                          height="50"
                          alt=""
                        />
                        <div class="type-name">
                          Fruits and vegetables intake
                        </div>
                        <div
                          v-if="
                            assessment.assessments &&
                            assessment.assessments.lifestyle &&
                            assessment.assessments.lifestyle.components.diet &&
                            assessment.assessments.lifestyle.components.diet
                              .components &&
                            assessment.assessments.lifestyle.components.diet
                              .components.fruit_vegetable
                          "
                        >
                          <div
                            class="type"
                            :class="
                              assessment.assessments.lifestyle.components.diet
                                .components.fruit_vegetable.tfl
                            "
                          >
                            {{
                              assessment.assessments.lifestyle.components.diet
                                .components.fruit_vegetable.eval
                            }}
                          </div>
                          <div class="recent-activity">
                            {{
                              assessment.assessments.lifestyle.components.diet
                                .components.fruit_vegetable.message
                            }}
                          </div>
                        </div>
                        <div class="ml-2" v-else>
                          No Fruits and vegetables intake data found!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3 mb-3">
                  <div class="card-body lifestyle-card-body">
                    <div class="patient-habit">
                      <div class="habit-type">
                        <span
                          class="edit-icon"
                          @click="
                            $router.push({
                              name: 'physical',
                              params: { reviewId: '1234s' },
                            })
                          "
                        >
                          <i class="fas fa-pen"></i
                        ></span>
                        <img
                          src="../../assets/images/icon_physical-activity.png"
                          class="type-image"
                          width="50"
                          height="50"
                          alt=""
                        />
                        <div class="type-name">Physical Activity</div>
                        <div
                          v-if="
                            assessment.assessments &&
                            assessment.assessments.lifestyle &&
                            assessment.assessments.lifestyle.components
                              .physical_activity
                          "
                        >
                          <div
                            class="type"
                            :class="
                              assessment.assessments.lifestyle.components
                                .physical_activity.tfl
                            "
                          >
                            {{
                              assessment.assessments.lifestyle.components
                                .physical_activity.eval
                            }}
                          </div>
                          <div class="recent-activity">
                            {{
                              assessment.assessments.lifestyle.components
                                .physical_activity.message
                            }}
                          </div>
                        </div>
                        <div class="ml-2" v-else>
                          No Physical Activity data found!
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

      <div
        class="row"
        v-if="assessment.assessments && assessment.assessments.body_composition"
      >
        <div class="col-lg-12">
          <div class="body-composition">
            <div class="card">
              <h4>Body Composition</h4>
              <div class="row body-content-row">
                <div class="col-xl-6 col-lg-8 col-md-12 mb-3">
                  <div class="card-body">
                    <div class="body-condition">
                      <div class="condition">
                        <div class="condition-header">
                          <div class="type-name">Waist Circumference</div>
                          <span class="edit-icon" v-b-modal.modal-circumference>
                            <i class="fas fa-pen"></i
                          ></span>
                          <b-modal
                            id="modal-circumference"
                            class="modal-coordinate"
                          >
                            <template v-slot:modal-header>
                              <span class="title">Set Hip Circumference</span>
                            </template>
                            <div class="d-flex align-items-center">
                              <div class="form-group">
                                <label for="">Hip</label>
                                <input
                                  type="number"
                                  v-model.number="hip"
                                  class="form-control form-coordinate circumference-input"
                                />
                              </div>
                              <div class="measurement-type">
                                <div class="custom-control custom-radio">
                                  <input
                                    type="radio"
                                    id="customRadio1"
                                    name="customRadio"
                                    class="custom-control-input"
                                    checked
                                  />
                                  <label
                                    class="custom-control-label"
                                    for="customRadio1"
                                    >cm</label
                                  >
                                </div>
                                <div class="custom-control custom-radio">
                                  <input
                                    type="radio"
                                    id="customRadio2"
                                    name="customRadio"
                                    class="custom-control-input"
                                  />
                                  <label
                                    class="custom-control-label"
                                    for="customRadio2"
                                    >inch</label
                                  >
                                </div>
                              </div>
                            </div>

                            <div class="select-device">
                              <h5>Select Device</h5>
                              <div class="select-wrapper">
                                <select
                                  class="select"
                                  v-model="hipMeasurementDevice"
                                >
                                  <option value=""></option>
                                  <option value="value1">Device 1</option>
                                  <option value="value1">Device 2</option>
                                </select>
                              </div>
                            </div>
                            <div class="comment-section">
                              <div class="form-group">
                                <label for="comment"
                                  >Comments/Notes (Optional)</label
                                >
                                <textarea
                                  class="form-control"
                                  id="comment"
                                  rows="4"
                                ></textarea>
                              </div>
                            </div>

                            <template v-slot:modal-footer>
                              <div class="w-100">
                                <b-button
                                  variant="link"
                                  size="md"
                                  class="float-left font-weight-bold p-0 pl-1"
                                >
                                  Unable to Perform
                                </b-button>

                                <b-button
                                  variant="link"
                                  :disabled="!hip || !hipMeasurementDevice"
                                  size="md"
                                  class="float-right font-weight-bold p-0 pl-4 pr-1"
                                >
                                  Add
                                </b-button>

                                <b-button
                                  variant="link"
                                  size="md"
                                  class="float-right font-weight-bold p-0"
                                  @click="$bvModal.hide('modal-circumference')"
                                >
                                  Cancel
                                </b-button>
                              </div>
                            </template>
                          </b-modal>
                        </div>
                        <div
                          class="condition-details"
                          v-if="
                            assessment.assessments &&
                            assessment.assessments.body_composition &&
                            assessment.assessments.body_composition
                              .components &&
                            assessment.assessments.body_composition.components
                              .waist_circ
                          "
                        >
                          <div
                            class="measurement"
                            :class="
                              assessment.assessments.body_composition.components
                                .waist_circ.tfl
                            "
                          >
                            {{
                              assessment.assessments.body_composition.components
                                .waist_circ.value
                            }}
                          </div>
                          <div
                            class="result"
                            :class="
                              assessment.assessments.body_composition.components
                                .waist_circ.tfl
                            "
                          >
                            {{
                              assessment.assessments.body_composition.components
                                .waist_circ.eval
                            }}
                          </div>
                          <div class="color-code">
                            <div class="color-1"></div>
                            <div class="color-2"></div>
                            <div class="color-3"></div>
                          </div>
                        </div>
                        <div
                          v-if="
                            assessment.assessments &&
                            assessment.assessments.body_composition &&
                            assessment.assessments.body_composition
                              .components &&
                            assessment.assessments.body_composition.components
                              .waist_circ
                          "
                        >
                          <div class="condition-range"><{{
                              assessment.assessments.body_composition.components
                                .waist_circ.target
                            }}</div>
                          <div class="">
                            {{
                              assessment.assessments.body_composition.components
                                .waist_circ.message
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-8 col-md-12 mb-3">
                  <div class="card-body">
                    <div class="body-condition">
                      <div class="condition">
                        <div class="condition-header">
                          <div class="type-name">BMI</div>
                          <span class="edit-icon" v-b-modal.modal-bmi>
                            <i class="fas fa-pen"></i
                          ></span>
                          <b-modal id="modal-bmi" class="modal-coordinate">
                            <template v-slot:modal-header>
                              <span class="title">Set BMI</span>
                            </template>
                            <div class="d-flex align-items-center">
                              <div class="form-group">
                                <label for="">BMI</label>
                                <input
                                  type="number"
                                  v-model.number="bmi"
                                  class="form-control form-coordinate circumference-input"
                                />
                              </div>
                              <div class="measurement-type">
                                <div class="custom-control custom-radio">
                                  <input
                                    type="radio"
                                    id="customRadio3"
                                    name="customRadio"
                                    class="custom-control-input"
                                    checked
                                  />
                                  <label
                                    class="custom-control-label"
                                    for="customRadio3"
                                    >cm</label
                                  >
                                </div>
                                <div class="custom-control custom-radio">
                                  <input
                                    type="radio"
                                    id="customRadio4"
                                    name="customRadio"
                                    class="custom-control-input"
                                  />
                                  <label
                                    class="custom-control-label"
                                    for="customRadio4"
                                    >inch</label
                                  >
                                </div>
                              </div>
                            </div>

                            <div class="select-device">
                              <h5>Select Device</h5>
                              <div class="select-wrapper">
                                <label for=""></label>
                                <select
                                  class="select"
                                  v-model="bmiMeasurementDevice"
                                >
                                  <option value=""></option>
                                  <option value="value1">Device 1</option>
                                  <option value="value1">Device 2</option>
                                </select>
                              </div>
                            </div>
                            <div class="comment-section">
                              <div class="form-group">
                                <label for="comment"
                                  >Comments/Notes (Optional)</label
                                >
                                <textarea
                                  class="form-control"
                                  id="commentBmi"
                                  rows="4"
                                ></textarea>
                              </div>
                            </div>

                            <template v-slot:modal-footer>
                              <div class="w-100">
                                <b-button
                                  variant="link"
                                  size="md"
                                  class="float-left font-weight-bold p-0 pl-1"
                                >
                                  Unable to Perform
                                </b-button>

                                <b-button
                                  variant="link"
                                  :disabled="!bmi || !bmiMeasurementDevice"
                                  size="md"
                                  class="float-right font-weight-bold p-0 pl-4 pr-1"
                                >
                                  Add
                                </b-button>

                                <b-button
                                  variant="link"
                                  size="md"
                                  class="float-right font-weight-bold p-0"
                                  @click="$bvModal.hide('modal-bmi')"
                                >
                                  Cancel
                                </b-button>
                              </div>
                            </template>
                          </b-modal>
                        </div>
                        <div
                          class="condition-details"
                          v-if="
                            assessment.assessments &&
                            assessment.assessments.body_composition &&
                            assessment.assessments.body_composition
                              .components &&
                            assessment.assessments.body_composition.components
                              .bmi
                          "
                        >
                          <div
                            class="measurement"
                            :class="
                              assessment.assessments.body_composition.components
                                .bmi.tfl
                            "
                          >
                            {{
                              assessment.assessments.body_composition.components
                                .bmi.value
                            }}
                          </div>
                          <div
                            class="result"
                            :class="
                              assessment.assessments.body_composition.components
                                .bmi.tfl
                            "
                          >
                            {{
                              assessment.assessments.body_composition.components
                                .bmi.eval
                            }}
                          </div>
                          <div class="color-code">
                            <div class="color-1"></div>
                            <div class="color-2"></div>
                            <div class="color-3"></div>
                          </div>
                        </div>
                        <div
                          v-if="
                            assessment.assessments &&
                            assessment.assessments.body_composition &&
                            assessment.assessments.body_composition
                              .components &&
                            assessment.assessments.body_composition.components
                              .bmi
                          "
                        >
                          <div class="condition-range">{{
                              assessment.assessments.body_composition.components
                                .bmi.target
                            }}</div>
                          <div class="">
                            {{
                              assessment.assessments.body_composition.components
                                .bmi.message
                            }}
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
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="disease-name">
            <div class="card">
              <div class="disease-name-header">
                <h4 class="type-name">Blood Pressure</h4>
                <span
                  @click="
                    $router.push({
                      name: 'pendingReviewBloodPressure',
                      params: { reviewId: '1234s' },
                    })
                  "
                  class="edit-icon"
                >
                  <i class="fas fa-pen"></i
                ></span>
              </div>
              <div
                class="card-body custom-card-body"
                v-if="
                  assessment.assessments &&
                  assessment.assessments.blood_pressure
                "
              >
                <div class="body-condition">
                  <div class="condition">
                    <div class="condition-details">
                      <div
                        class="measurement mr-3"
                        :class="assessment.assessments.blood_pressure.tfl"
                      >
                        {{ assessment.assessments.blood_pressure.value }} mmHG
                      </div>
                      <div
                        class="result mr-3"
                        :class="assessment.assessments.blood_pressure.tfl"
                      >
                        {{ assessment.assessments.blood_pressure.eval }}
                      </div>
                      <div class="color-code">
                        <div class="color-1"></div>
                        <div class="color-2"></div>
                        <div class="color-3"></div>
                      </div>
                    </div>
                    <div class="condition-range">&lt; 130 / 80 mmHG</div>
                  </div>
                </div>
                <div class="suggest">
                  {{ assessment.assessments.blood_pressure.message }}
                </div>
              </div>
              <div class="alert alert-light" v-else>
                <h5 class="ml-2">No Blood Pressure Data Found!</h5>
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
                <h4 class="type-name">Diabetes</h4>
                <span class="edit-icon" v-b-modal.modal-diabetese>
                  <i class="fas fa-pen"></i
                ></span>
                <b-modal id="modal-diabetese" class="modal-coordinate">
                  <template v-slot:modal-header>
                    <span class="title">Set Diabetes</span>
                  </template>
                  <div class="d-flex align-items-center">
                    <div class="form-group">
                      <label for="">Fasting Blood Sugar</label>
                      <input
                        type="number"
                        v-model.number="diabetes"
                        class="form-control form-coordinate circumference-input"
                      />
                    </div>
                    <div class="measurement-type">
                      <div class="custom-control custom-radio">
                        <input
                          type="radio"
                          id="diabeteseMg"
                          name="cholesterol"
                          class="custom-control-input"
                          checked
                        />
                        <label class="custom-control-label" for="customRadio3"
                          >mg/dL</label
                        >
                      </div>
                      <div class="custom-control custom-radio">
                        <input
                          type="radio"
                          id="diabeteseMmol"
                          name="cholesterol"
                          class="custom-control-input"
                        />
                        <label class="custom-control-label" for="customRadio4"
                          >mmol/L</label
                        >
                      </div>
                    </div>
                  </div>

                  <div class="select-device">
                    <h5>Select Device</h5>
                    <div class="select-wrapper">
                      <select
                        class="select"
                        v-model="diabetesMeasurementDevice"
                      >
                        <option value=""></option>
                        <option value="value1">Device 1</option>
                        <option value="value1">Device 2</option>
                      </select>
                    </div>
                  </div>
                  <div class="comment-section">
                    <div class="form-group">
                      <label for="comment">Comments/Notes (Optional)</label>
                      <textarea
                        class="form-control"
                        id="commentDiabetese"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>

                  <template v-slot:modal-footer>
                    <div class="w-100">
                      <b-button
                        variant="link"
                        size="md"
                        class="float-left font-weight-bold p-0 pl-1"
                      >
                        Unable to Perform
                      </b-button>

                      <b-button
                        variant="link"
                        :disabled="!diabetes || !diabetesMeasurementDevice"
                        size="md"
                        class="float-right font-weight-bold p-0 pl-4 pr-1"
                      >
                        Add
                      </b-button>

                      <b-button
                        variant="link"
                        size="md"
                        class="float-right font-weight-bold p-0"
                        @click="$bvModal.hide('modal-diabetese')"
                      >
                        Cancel
                      </b-button>
                    </div>
                  </template>
                </b-modal>
              </div>
              <div
                class="card-body custom-card-body"
                v-if="assessment.assessments && assessment.assessments.diabetes"
              >
                <div class="body-condition">
                  <div class="condition">
                    <div class="type">Fasting Blood Sugar</div>
                    <div class="condition-details">
                      <div
                        class="measurement mr-3"
                        :class="assessment.assessments.diabetes.tfl"
                      >
                        {{ assessment.assessments.diabetes.value }}
                      </div>
                      <div
                        class="result mr-3"
                        :class="assessment.assessments.diabetes.tfl"
                      >
                        {{ assessment.assessments.diabetes.eval }}
                      </div>
                      <div class="color-code">
                        <div class="color-1"></div>
                        <div class="color-2"></div>
                        <div class="color-3"></div>
                      </div>
                    </div>
                    <div class="condition-range">&lt; 100mg/dL</div>
                  </div>
                </div>
                <div class="suggest">
                  {{ assessment.assessments.diabetes.message }}
                </div>
              </div>
              <div class="alert alert-light" v-else>
                <h5 class="ml-2">No Diabetes Data Found!</h5>
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
                <span class="edit-icon" v-b-modal.modal-cholesterol>
                  <i class="fas fa-pen"></i
                ></span>
                <b-modal id="modal-cholesterol" class="modal-coordinate">
                  <template v-slot:modal-header>
                    <span class="title">Set Total Cholesterol</span>
                  </template>
                  <div class="d-flex align-items-center">
                    <div class="form-group">
                      <label for="">Total Cholesterol</label>
                      <input
                        type="number"
                        v-model.number="cholesterol"
                        class="form-control form-coordinate circumference-input"
                      />
                    </div>
                    <div class="measurement-type">
                      <div class="custom-control custom-radio">
                        <input
                          type="radio"
                          id="cholesterolMg"
                          name="cholesterol"
                          class="custom-control-input"
                          checked
                        />
                        <label class="custom-control-label" for="customRadio3"
                          >mg/dL</label
                        >
                      </div>
                      <div class="custom-control custom-radio">
                        <input
                          type="radio"
                          id="cholesterolMm"
                          name="cholesterol"
                          class="custom-control-input"
                        />
                        <label class="custom-control-label" for="customRadio4"
                          >mmol/L</label
                        >
                      </div>
                    </div>
                  </div>

                  <div class="select-device">
                    <h5>Select Device</h5>
                    <div class="select-wrapper">
                      <select
                        class="select"
                        v-model="cholesterolMeasurementDevice"
                      >
                        <option value=""></option>
                        <option value="value1">Device 1</option>
                        <option value="value1">Device 2</option>
                      </select>
                    </div>
                  </div>
                  <div class="comment-section">
                    <div class="form-group">
                      <label for="comment">Comments/Notes (Optional)</label>
                      <textarea
                        class="form-control"
                        id="commentCholesterol"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>

                  <template v-slot:modal-footer>
                    <div class="w-100">
                      <b-button
                        variant="link"
                        size="md"
                        class="float-left font-weight-bold p-0 pl-1"
                      >
                        Unable to Perform
                      </b-button>

                      <b-button
                        variant="link"
                        :disabled="
                          !cholesterol || !cholesterolMeasurementDevice
                        "
                        size="md"
                        class="float-right font-weight-bold p-0 pl-4"
                      >
                        Add
                      </b-button>

                      <b-button
                        variant="link"
                        size="md"
                        class="float-right font-weight-bold p-0"
                        @click="$bvModal.hide('modal-cholesterol')"
                      >
                        Cancel
                      </b-button>
                    </div>
                  </template>
                </b-modal>
              </div>
              <div
                class="card-body custom-card-body"
                v-if="
                  assessment.assessments &&
                  assessment.assessments.cholesterol &&
                  assessment.assessments.cholesterol.components &&
                  assessment.assessments.cholesterol.components
                    .total_cholesterol
                "
              >
                <div class="body-condition">
                  <div class="condition">
                    <div class="type">Total Cholesterol</div>
                    <div class="condition-details">
                      <div
                        class="measurement mr-3"
                        :class="
                          assessment.assessments.cholesterol.components
                            .total_cholesterol.tfl
                        "
                      >
                        {{
                          assessment.assessments.cholesterol.components
                            .total_cholesterol.value
                        }}
                      </div>
                      <div
                        class="result mr-3"
                        :class="
                          assessment.assessments.cholesterol.components
                            .total_cholesterol.tfl
                        "
                      >
                        {{
                          assessment.assessments.cholesterol.components
                            .total_cholesterol.eval
                        }}
                      </div>
                      <div class="color-code">
                        <div class="color-1"></div>
                        <div class="color-2"></div>
                        <div class="color-3"></div>
                      </div>
                    </div>
                    <div class="condition-range">&lt; 200mg/dL</div>
                  </div>
                </div>
                <div class="suggest">
                  {{
                    assessment.assessments.cholesterol.components
                      .total_cholesterol.message
                  }}
                </div>
              </div>
              <div class="alert alert-light" v-else>
                <h5 class="ml-2">No Cholesterol Data Found!</h5>
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
                <span class="edit-icon" v-b-modal.modal-cvd>
                  <i class="fas fa-pen"></i
                ></span>
                <b-modal id="modal-cvd" class="modal-coordinate">
                  <template v-slot:modal-header>
                    <span class="title">Set Cardiovascular</span>
                  </template>
                  <div class="d-flex align-items-center">
                    <div class="form-group">
                      <label for="">CVD</label>
                      <input
                        type="number"
                        v-model.number="cvd"
                        class="form-control form-coordinate circumference-input"
                      />
                    </div>
                    <div class="measurement-type">
                      <div class="custom-control custom-radio">
                        <input
                          type="radio"
                          id="cvdPercent"
                          name="cholesterol"
                          class="custom-control-input"
                          checked
                        />
                        <label class="custom-control-label" for="customRadio3"
                          >%</label
                        >
                      </div>
                    </div>
                  </div>

                  <div class="select-device">
                    <h5>Select Device</h5>
                    <div class="select-wrapper">
                      <select class="select" v-model="cvdMeasurementDevice">
                        <option value=""></option>
                        <option value="value1">Device 1</option>
                        <option value="value1">Device 2</option>
                      </select>
                    </div>
                  </div>
                  <div class="comment-section">
                    <div class="form-group">
                      <label for="comment">Comments/Notes (Optional)</label>
                      <textarea
                        class="form-control"
                        v-model="commentCvd"
                        id="commentCvd"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>

                  <template v-slot:modal-footer>
                    <div class="w-100">
                      <b-button
                        variant="link"
                        size="md"
                        class="float-left font-weight-bold p-0 pl-1"
                      >
                        Unable to Perform
                      </b-button>

                      <b-button
                        variant="link"
                        :disabled="!cvd || !cvdMeasurementDevice"
                        size="md"
                        class="float-right font-weight-bold p-0 pl-4 pr-1"
                      >
                        Add
                      </b-button>

                      <b-button
                        variant="link"
                        size="md"
                        class="float-right font-weight-bold p-0"
                        @click="$bvModal.hide('modal-cvd')"
                      >
                        Cancel
                      </b-button>
                    </div>
                  </template>
                </b-modal>
              </div>
              <div
                class="card-body custom-card-body"
                v-if="assessment.assessments && assessment.assessments.cvd"
              >
                <div class="body-condition">
                  <div class="condition">
                    <div class="type">Your 10 year risk</div>
                    <div class="condition-details">
                      <div
                        class="measurement mr-3"
                        :class="assessment.assessments.cvd.tfl"
                      >
                        {{ assessment.assessments.cvd.value }}
                      </div>
                      <div
                        class="result mr-3"
                        :class="assessment.assessments.cvd.tfl"
                      >
                        {{ assessment.assessments.cvd.eval }}
                      </div>
                      <div class="color-code">
                        <div class="color-1"></div>
                        <div class="color-2"></div>
                        <div class="color-3"></div>
                      </div>
                    </div>
                    <div class="condition-range">&lt; 5%</div>
                  </div>
                </div>
                <div class="suggest">
                  {{ assessment.assessments.cvd.message }}
                </div>
              </div>
              <div class="alert alert-light" v-else>
                <h5 class="ml-2">No Cardiovascular Data Found!</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="comment-section mb-4">
            <div class="form-group mb-4">
              <label for="exampleFormControlTextarea3"
                >Comments/Notes (Optional)</label
              >
              <textarea
                class="form-control"
                v-model="comments"
                id="exampleFormControlTextarea3"
                rows="4"
              ></textarea>
            </div>
            <button
              class="btn btn-primary"
              @click="
                $router.push({
                  name: 'pendingReviewGenerate',
                  params: { reviewId: review_id },
                })
              "
            >
              Proceed to generating Care Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "health-records",
  components: {},
  data() {
    return {
      fullPage: true,
      participants: [],
      participant_info: {},
      allergies: [],
      participantId: "",
      lifestyle: "",
      body_composition: "",
      blood_pressure: "",
      diabetes: "",
      cholesterol: "",
      cvd: "",
      commentCvd: "",
      goals: [],
      referrals: [],
      assessment_date: "",
      review_id: "",
      patientInfo: "",
      patientMeta: "",
      assessment: "",
      comments: "",
      allData: "",
      bmi: "",
      hip: "",
      hipMeasurementDevice: "",
      bmiMeasurementDevice: "",
      diabetesMeasurementDevice: "",
      cholesterolMeasurementDevice: "",
      cvdMeasurementDevice: "",
      report_date: null,
      medications: [],
      medicalHistory: [],
      observations: []
    };
  },
  mounted() {
    
  },
  created() {
    if (this.$route.params.reviewId) {
      this.review_id = this.$route.params.reviewId;
      this.patientHealthRecord();
    }
  },
  methods: {
    updatePatientHealthRecord() {
      let loader = this.$loading.show();
      this.$http
        .put("/health-reports" + this.review_id, this.allData)
        .then((response) => {
          loader.hide();
        });
    },
    patientHealthRecord() {
      let loader = this.$loading.show();
      this.$http.get("/health-reports/" + this.review_id).then((response) => {
        if (response.status == 200) {
          this.allData = response.data;
          this.assessment = response.data.data.body.result;
          this.patientId = response.data.data.body.patient_id;
          this.report_date = moment(
            response.data.data.meta.report_date._seconds * 1000
          ).format("MMMM DD YYYY");
          this.getPatientInfo();
          this.getObservation();
        }
        loader.hide();
      });
    },
    getFormattedDate(date) {
      return moment(date).format("MMMM DD YYYY");
    },
    getObservation() {
      let loader = this.$loading.show();
      this.$http.get("/observations/").then((response) => {
        if (!response.data.error) {
          loader.hide();
          this.observations = response.data.data;
          this.prepareSurveyData();
        }
      });
    },
    prepareSurveyData() {
      this.observations.forEach((obs) => {
        if (
          obs.body.patient_id == this.patientId &&
          obs.body.type == "survey"
        ) {
          // console.log(obs.body);
          if (obs.body.data.name == "medical_history") {
            Object.keys(obs.body.data).forEach((key) => {
              if (obs.body.data[key] == "yes") {
                if (!this.medicalHistory.includes(key.replace(/_/g, " "))) {
                  this.medicalHistory.push(key.replace(/_/g, " "));
                }
              }
            });
          }

          if (obs.body.data.name == "current_medication") {
            this.medications = obs.body.data.medications;
          }
        }
      });
    },
    getPatientInfo() {
      this.$http.get("/patients/" + this.patientId).then((response) => {
        if (response.status == 200) {
          this.patientMeta = response.data.data.meta;
          this.patientInfo = response.data.data.body;
          this.isLoading = false;
        }
      });
    },
  },
};
</script>

