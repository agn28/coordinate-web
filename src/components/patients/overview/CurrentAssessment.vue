<template>
  <div>
    <div class="assessment-details pending-review-assessment" >
      <div class="row" v-if="assessment">
        <div class="col-lg-9">
          <div class="body-composition">
            <div class="card assessment-card">
              <h5 class="pl-3 pt-3 pb-3">Body Composition</h5>
              <div class="content">
                <div class="assessment-item-card">
                  <div class="body-condition">
                    <div class="condition">
                      <div class="condition-header">
                        <div class="type-name">Waist Circumference</div>
                        <!-- <span class="edit-icon" v-b-modal.modal-circumference>
                          <i class="fas fa-pen"></i
                        ></span> -->
                        <!-- <b-modal
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
                        </b-modal> -->
                      </div>

                      <div
                        class="condition-details justify-content-between"
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.body_composition &&
                          assessment.result.assessments.body_composition
                            .components &&
                          assessment.result.assessments.body_composition.components
                            .waist_circ
                        "
                      >
                        <div
                          class="measurement"
                          :class="
                            assessment.result.assessments.body_composition.components
                              .waist_circ.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.body_composition.components
                              .waist_circ.value
                          }}
                        </div>
                        <div
                          class="result"
                          :class="
                            assessment.result.assessments.body_composition.components
                              .waist_circ.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.body_composition.components
                              .waist_circ.eval
                          }}
                        </div>
                        
                      </div>

                      <div class="color-code">
                        <div class="color-bar back-GREEN mr-2"></div>
                        <div class="color-bar  back-AMBER mr-2"></div>
                        <div class="color-bar back-RED mr-2"></div>
                      </div>
                      <div
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.body_composition &&
                          assessment.result.assessments.body_composition
                            .components &&
                          assessment.result.assessments.body_composition.components
                            .waist_circ
                        "
                      >
                        <div class="mt-3 mr-2">
                          {{
                            assessment.result.assessments.body_composition.components
                              .waist_circ.message
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="assessment-item-card mb-3">
                  <div class="body-condition">
                    <div class="condition">
                      <div class="condition-header">
                        <div class="type-name">BMI</div>
                        <!-- <span class="edit-icon" v-b-modal.modal-bmi>
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
                        </b-modal> -->
                      </div>
                      <div
                        class="condition-details justify-content-between"
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.body_composition &&
                          assessment.result.assessments.body_composition
                            .components &&
                          assessment.result.assessments.body_composition.components
                            .bmi
                        "
                      >
                        <div
                          class="measurement"
                          :class="
                            assessment.result.assessments.body_composition.components
                              .bmi.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.body_composition.components
                              .bmi.value
                          }}
                        </div>
                        <div
                          class="result"
                          :class="
                            assessment.result.assessments.body_composition.components
                              .bmi.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.body_composition.components
                              .bmi.eval
                          }}
                        </div>
                        
                      </div>
                      <div class="color-code">
                        <div class="color-bar back-GREEN mr-2"></div>
                        <div class="color-bar  back-AMBER mr-2"></div>
                        <div class="color-bar back-RED mr-2"></div>
                      </div>
                      
                      <div
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.body_composition &&
                          assessment.result.assessments.body_composition
                            .components &&
                          assessment.result.assessments.body_composition.components
                            .bmi
                        "
                      >
                        <div class="mt-3">
                          {{
                            assessment.result.assessments.body_composition.components
                              .bmi.message
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="assessment-item-card mb-3">
                  <div class="body-condition">
                    <div class="condition">
                      <div class="condition-header">
                        <div class="type-name">Body Fat</div>
                      </div>
                      <div
                        class="condition-details justify-content-between"
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.body_composition &&
                          assessment.result.assessments.body_composition
                            .components &&
                          assessment.result.assessments.body_composition.components
                            .body_fat
                        "
                      >
                        <div
                          class="measurement"
                          :class="
                            assessment.result.assessments.body_composition.components
                              .body_fat.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.body_composition.components
                              .body_fat.value
                          }}
                        </div>
                        <div
                          class="result"
                          :class="
                            assessment.result.assessments.body_composition.components
                              .body_fat.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.body_composition.components
                              .body_fat.eval
                          }}
                        </div>
                        
                      </div>
                      <div class="color-code">
                        <div class="color-bar back-GREEN mr-2"></div>
                        <div class="color-bar  back-AMBER mr-2"></div>
                        <div class="color-bar back-RED mr-2"></div>
                      </div>
                      
                      <div
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.body_composition &&
                          assessment.result.assessments.body_composition
                            .components &&
                          assessment.result.assessments.body_composition.components
                            .body_fat
                        "
                      >
                        <div class="mt-3">
                          {{
                            assessment.result.assessments.body_composition.components
                              .body_fat.message
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

        <div class="col-lg-3">
          <div class="body-composition blood-pressure">
            <div class="card assessment-card">
              <h5 class="pl-3 pt-3 pb-3">Blood</h5>
              <div class="content">
                <div class="assessment-item-card mb-3">
                  <div class="body-condition">
                    <div class="condition">
                      <div class="condition-header">
                        <div class="type-name">Blood Pressure</div>
                      </div>

                      <div
                        class="condition-details justify-content-between"
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.blood_pressure
                        "
                      >
                        <div
                          class="measurement"
                          :class="
                            assessment.result.assessments.blood_pressure.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.blood_pressure.value
                          }}
                        </div>
                        <div
                          class="result"
                          :class="
                            assessment.result.assessments.blood_pressure.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.blood_pressure.eval
                          }}
                        </div>
                        
                      </div>

                      <div class="color-code">
                        <div class="color-bar back-GREEN mr-2"></div>
                        <div class="color-bar  back-AMBER mr-2"></div>
                        <div class="color-bar back-RED mr-2"></div>
                      </div>
                      <div
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.blood_pressure
                        "
                      >
                        <div class="mt-3 mr-2">
                          {{
                            assessment.result.assessments.blood_pressure.message
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

      

      <div class="row" v-if="assessment">
        <div class="col-lg-3">
          <div class="body-composition blood-pressure">
            <div class="card assessment-card">
              <h5 class="pl-3 pt-3 pb-3">Cholesterol</h5>
              <div class="content">
                <div class="assessment-item-card mb-3">
                  <div class="body-condition">
                    <div class="condition">
                      <div class="condition-header">
                        <div class="type-name">Total Cholesterol</div>
                      </div>
                      <div
                        class="condition-details justify-content-between"
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.cholesterol &&
                          assessment.result.assessments.cholesterol
                            .components &&
                          assessment.result.assessments.cholesterol.components
                            .total_cholesterol
                        "
                      >
                        <div
                          class="measurement"
                          :class="
                            assessment.result.assessments.cholesterol.components
                            .total_cholesterol.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.cholesterol.components
                            .total_cholesterol.value
                          }}
                        </div>
                        <div
                          class="result"
                          :class="
                            assessment.result.assessments.cholesterol.components
                            .total_cholesterol.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.cholesterol.components
                            .total_cholesterol.eval
                          }}
                        </div>
                        
                      </div>
                      <div class="color-code">
                        <div class="color-bar back-GREEN mr-2"></div>
                        <div class="color-bar  back-AMBER mr-2"></div>
                        <div class="color-bar back-RED mr-2"></div>
                      </div>
                      
                      <div
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.cholesterol &&
                          assessment.result.assessments.cholesterol
                            .components &&
                          assessment.result.assessments.cholesterol.components
                            .total_cholesterol
                        "
                      >
                        <div class="mt-3">
                          {{
                            assessment.result.assessments.cholesterol.components
                            .total_cholesterol.message
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

        <div class="col-lg-3">
          <div class="body-composition blood-pressure">
            <div class="card assessment-card">
              <h5 class="pl-3 pt-3 pb-3">Diabetes</h5>
              <div class="content">
                <div class="assessment-item-card mb-3">
                  <div class="body-condition">
                    <div class="condition">
                      <div class="condition-header">
                        <div class="type-name">Fasting Blood Sugar</div>
                      </div>

                      <div
                        class="condition-details justify-content-between"
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.diabetes
                        "
                      >
                        <div
                          class="measurement"
                          :class="
                            assessment.result.assessments.diabetes.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.diabetes.value
                          }}
                        </div>
                        <div
                          class="result"
                          :class="
                            assessment.result.assessments.diabetes.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.diabetes.eval
                          }}
                        </div>
                        
                      </div>

                      <div class="color-code">
                        <div class="color-bar back-GREEN mr-2"></div>
                        <div class="color-bar  back-AMBER mr-2"></div>
                        <div class="color-bar back-RED mr-2"></div>
                      </div>
                      <div
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.diabetes
                        "
                      >
                        <div class="mt-3 mr-2">
                          {{
                            assessment.result.assessments.diabetes.message
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

        <div class="col-lg-3">
          <div class="body-composition blood-pressure">
            <div class="card assessment-card">
              <h5 class="pl-3 pt-3 pb-3">Cardiovascular Risk</h5>
              <div class="content">
                <div class="assessment-item-card mb-3">
                  <div class="body-condition">
                    <div class="condition">
                      <div class="condition-header">
                        <div class="type-name">CVD</div>
                      </div>

                      <div
                        class="condition-details justify-content-between"
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.cvd
                        "
                      >
                        <div
                          class="measurement"
                          :class="
                            assessment.result.assessments.cvd.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.cvd.value
                          }}
                        </div>
                        <div
                          class="result"
                          :class="
                            assessment.result.assessments.cvd.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.cvd.eval
                          }}
                        </div>
                        
                      </div>

                      <div class="color-code">
                        <div class="color-bar back-GREEN mr-2"></div>
                        <div class="color-bar  back-AMBER mr-2"></div>
                        <div class="color-bar back-RED mr-2"></div>
                      </div>
                      <div
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.cvd
                        "
                      >
                        <div class="mt-3 mr-2">
                          {{
                            assessment.result.assessments.cvd.message
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

      <div class="row" v-if="assessment">
        <div class="col-lg-12">
          <div class="body-composition lifestyle">
            <div class="card assessment-card">
              <h5 class="pl-3 pt-3 pb-3">Lifestyle</h5>
              <div class="content">
                <div class="assessment-item-card mb-3">
                  <div class="body-condition">
                    <div class="condition">
                      <div class="condition-header">
                        <div class="type-name">Smoking</div>
                      </div>

                      <div
                        class="condition-details justify-content-between"
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.lifestyle &&
                          assessment.result.assessments.lifestyle
                            .components &&
                          assessment.result.assessments.lifestyle.components
                            .smoking
                        "
                      >
                        <div
                          class="measurement"
                          :class="
                            assessment.result.assessments.lifestyle.components
                            .smoking.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.lifestyle.components
                            .smoking.value
                          }}
                        </div>
                        <div
                          class="result"
                          :class="
                            assessment.result.assessments.lifestyle.components
                            .smoking.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.lifestyle.components
                            .smoking.eval
                          }}
                        </div>
                        
                      </div>

                      <div class="color-code">
                        <div class="color-bar back-GREEN mr-2"></div>
                        <div class="color-bar  back-AMBER mr-2"></div>
                        <div class="color-bar back-RED mr-2"></div>
                      </div>
                      <div
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.lifestyle &&
                          assessment.result.assessments.lifestyle
                            .components &&
                          assessment.result.assessments.lifestyle.components
                            .smoking
                        "
                      >
                        <div class="mt-3 mr-2">
                          {{
                            assessment.result.assessments.lifestyle.components
                            .smoking.message
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div 
                  v-if="
                    assessment.result.assessments &&
                    assessment.result.assessments.lifestyle &&
                    assessment.result.assessments.lifestyle
                      .components &&
                    assessment.result.assessments.lifestyle.components
                      .alcohol
                  " class="assessment-item-card mb-3">
                  <div class="body-condition">
                    <div class="condition">
                      <div class="condition-header">
                        <div class="type-name">Alcohol</div>
                        
                      </div>
                      <div
                        class="condition-details justify-content-between"
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.lifestyle &&
                          assessment.result.assessments.lifestyle
                            .components &&
                          assessment.result.assessments.lifestyle.components
                            .alcohol
                        "
                      >
                        <div
                          class="measurement"
                          :class="
                            assessment.result.assessments.lifestyle.components
                            .alcohol.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.lifestyle.components
                            .alcohol.value
                          }}
                        </div>
                        <div
                          class="result"
                          :class="
                            assessment.result.assessments.lifestyle.components
                            .alcohol.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.lifestyle.components
                            .alcohol.eval
                          }}
                        </div>
                        
                      </div>
                      <div class="color-code">
                        <div class="color-bar back-GREEN mr-2"></div>
                        <div class="color-bar  back-AMBER mr-2"></div>
                        <div class="color-bar back-RED mr-2"></div>
                      </div>
                      
                      <div
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.lifestyle &&
                          assessment.result.assessments.lifestyle
                            .components &&
                          assessment.result.assessments.lifestyle.components
                            .alcohol
                        "
                      >
                        <div class="mt-3">
                          {{
                            assessment.result.assessments.lifestyle.components
                            .alcohol.message
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  v-if="
                    assessment.result.assessments &&
                    assessment.result.assessments.lifestyle &&
                    assessment.result.assessments.lifestyle
                      .components &&
                    assessment.result.assessments.lifestyle.components
                      .physical_activity
                  " class="assessment-item-card mb-3">
                  <div class="body-condition">
                    <div class="condition">
                      <div class="condition-header">
                        <div class="type-name">Physical Activity</div>
                      </div>
                      <div
                        class="condition-details justify-content-between"
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.lifestyle &&
                          assessment.result.assessments.lifestyle
                            .components &&
                          assessment.result.assessments.lifestyle.components
                            .physical_activity
                        "
                      >
                        <div
                          class="measurement"
                          :class="
                            assessment.result.assessments.lifestyle.components
                            .physical_activity.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.lifestyle.components
                            .physical_activity.value
                          }}
                        </div>
                        <div
                          class="result"
                          :class="
                            assessment.result.assessments.lifestyle.components
                            .physical_activity.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.lifestyle.components
                            .physical_activity.eval
                          }}
                        </div>
                        
                      </div>
                      <div class="color-code">
                        <div class="color-bar back-GREEN mr-2"></div>
                        <div class="color-bar  back-AMBER mr-2"></div>
                        <div class="color-bar back-RED mr-2"></div>
                      </div>
                      
                      <div
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.lifestyle &&
                          assessment.result.assessments.lifestyle
                            .components &&
                          assessment.result.assessments.lifestyle.components
                            .physical_activity
                        "
                      >
                        <div class="mt-3">
                          {{
                            assessment.result.assessments.lifestyle.components
                            .physical_activity.message
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-if="
                    assessment.result.assessments &&
                    assessment.result.assessments.lifestyle &&
                    assessment.result.assessments.lifestyle
                      .components &&
                    assessment.result.assessments.lifestyle.components
                      .diet.components.fruit_vegetable
                  " class="assessment-item-card mb-3">
                  <div class="body-condition">
                    <div class="condition">
                      <div class="condition-header">
                        <div class="type-name">Fruits and Vegetables</div>
                      </div>
                      <div
                        class="condition-details justify-content-between"
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.lifestyle &&
                          assessment.result.assessments.lifestyle
                            .components &&
                          assessment.result.assessments.lifestyle.components
                            .diet
                        "
                      >
                        <div
                          class="measurement"
                          :class="
                            assessment.result.assessments.lifestyle.components
                            .diet.components.fruit_vegetable.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.lifestyle.components
                            .diet.components.fruit_vegetable.value
                          }}
                        </div>
                        <div
                          class="result"
                          :class="
                            assessment.result.assessments.lifestyle.components
                            .diet.components.fruit_vegetable.tfl
                          "
                        >
                          {{
                            assessment.result.assessments.lifestyle.components
                            .diet.components.fruit_vegetable.eval
                          }}
                        </div>
                        
                      </div>
                      <div class="color-code">
                        <div class="color-bar back-GREEN mr-2"></div>
                        <div class="color-bar  back-AMBER mr-2"></div>
                        <div class="color-bar back-RED mr-2"></div>
                      </div>
                      
                      <div
                        v-if="
                          assessment.result.assessments &&
                          assessment.result.assessments.lifestyle &&
                          assessment.result.assessments.lifestyle
                            .components &&
                          assessment.result.assessments.lifestyle.components
                            .diet
                        "
                      >
                        <div class="mt-3">
                          {{
                            assessment.result.assessments.lifestyle.components
                            .diet.components.fruit_vegetable.message
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
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";

export default {
  name: "patients",
  components: {
    VueJsonPretty,
  },
  props: ['assessment', 'users', 'patientId'],
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    test() {
      console.log(this.currentEncounterParent.id)
    },
    encounterDetails(encounter) {
      
      this.$emit('goToAssessmentDetails', encounter);
      this.$router.replace({ name: "patientOverview", params: { patientId: this.patientId }, query: { assessment: encounter.id } })
    },
    getUser(encounter) {
      let user = {};
      if (encounter.meta.collected_by) {
        user = this.users.find(
          (user) => user.uid == encounter.meta.collected_by
        );
      }
      return user.name || "";
    },
    getBp(observations) {
      return observations.find(obs => obs.body.type == 'blood_pressure')
    },
    getDate(encounter) {
      let date = "";
      if (encounter.meta.created_at) {
        date = moment(encounter.meta.created_at).format("Do MMMM YYYY");
      }
      return date;
    },

    getBp(observations) {
      return observations.find(obs => obs.body.type == 'blood_pressure')
    },

    getHeight(observations) {
      return observations.find(obs => {
        if (obs.body.type == 'body_measurement') {
          if (obs.body.data.name == 'height') {
            return obs;
          }
        }
      })
    },
    getWeight(observations) {
      return observations.find(obs => {
        if (obs.body.type == 'body_measurement') {
          if (obs.body.data.name == 'weight') {
            return obs;
          }
        }
      })
    },

    getBloodSugar(observations) {
      return observations.find(obs => {
        if (obs.body.type == 'blood_test') {
          if (obs.body.data.name == 'blood_sugar') {
            return obs;
          }
        }
      })
    }
  

  
  },
  mounted() {
    console.log('mounted');
    this.scrollToTop();
  },
};
</script>

<style lang="scss">

.pending-review-assessment .body-composition {
  margin: 3px 0px 33px;
}

.lifestyle {
  .assessment-card .content {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .assessment-item-card {
    border: 1px solid #b3cde4;
    height: 230px;
  }
}



.blood-pressure .assessment-card .content {
    grid-template-columns: 1fr;
}
.assessment-card {
  border: 1px solid #095293 !important;

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 20px;
    padding: 0px 20px;

    .body-condition {
      background: #f9f9f9;
      min-height: 100%;
    }
  }
}


.assessment-item-card {
  border: 1px solid #b3cde4;
  height: 190px;

  .color-code {
    position: relative;
    display: flex;

    .color-bar {
      width: 56.94px;
      height: 10px;
    }

    .color-1 {
      width: 56.94px;
      height: 14px;
      background: #2E7D32;
      margin-right: 10.09px;
    }

    .color-2 {
      width: 56.94px;
      height: 14px;
      background: #D43900;
      margin-right: 10.09px;
    }

    .color-3 {
      width: 56.94px;
      height: 14px;
      background: #CF0026;
    }
    
  }
}
</style>
