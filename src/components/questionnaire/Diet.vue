<template>
  <div class="content diet-questionnaire">
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex breadcrumb-wrap">
        <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
        <div class="">
          <h4>Diet Questionnaire</h4>
          <div class="breadcrumb"><span>Patients</span>/ <span>Jahanara Begum</span> / <span>Create a New Encounter</span> / <span>Questionnaire</span> / Diet</div>
        </div>
      </div>

      <div class="col-lg-12 border-top border-bottom border">
        <div class="patient">
          <div class="patient-image">
            <img src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
          </div>
          <div class="patient-details">
            <div class="patient-name">Jahanara Begum</div>
            <div class="details">
              <div class="age">31y Female</div>
              <div class="pid">PID: N-121233333</div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 mx-auto">
          <div class="diet-question">
            <div class="card">
              <div class="card-body custom-card-body">

                <form-wizard>
                  <tab-content>
                    <div class="step-1">
                      <div class="question-msg">
                        <p><span><i class="fas fa-exclamation-circle"></i></span>Now I am going to ask you some questions about your diet.</p>
                      </div>
                      <div class="question-section">
                        <p>Do you at least 5 portions of fruit and vegetables (excluding starchy vegetables) daily?
                          (1 serving = 0.5 cup cooked vegetables or 1 cup raw vegetables; 1 orange, apple, banana, mango)
                        </p>

                        <div class="row mb-5">
                          <div class="col-lg-6">
                            <button class="btn btn-light border w-100">Yes</button>
                          </div>
                          <div class="col-lg-6">
                            <button class="btn btn-light border w-100">No</button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </tab-content>
                  <tab-content>
                    <div class="step-2  ">
                      <div class="question-section">
                        <p>Do you eat red meat, fried foods, canned or other processed foods on most days?</p>

                        <div class="row mb-5">
                          <div class="checkbox-ans">
                            <div class="custom-control custom-radio">
                              <input type="radio" id="step2-yes" name="customRadio" class="custom-control-input">
                              <label class="custom-control-label" for="step2-yes">Yes</label>
                            </div>
                            <div class="custom-control custom-radio">
                              <input type="radio" id="step2-no" name="customRadio" class="custom-control-input" checked>
                              <label class="custom-control-label" for="step2-no">No</label>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </tab-content>

                  <tab-content>
                    <div class="step-2 ">
                      <div class="question-section">
                        <p>Do you have sugary drinks (for example, soda, juice, sweetened milk) on most days?</p>

                        <div class="row mb-5">
                          <div class="checkbox-ans">
                            <div class="custom-control custom-radio">
                              <input type="radio" id="step3-yes" name="customRadio" class="custom-control-input">
                              <label class="custom-control-label" for="step3-yes">Yes</label>
                            </div>
                            <div class="custom-control custom-radio">
                              <input type="radio" id="step3-no" name="customRadio" class="custom-control-input" checked>
                              <label class="custom-control-label" for="step3-no">No</label>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </tab-content>

                  <tab-content>
                    <div class="step-2">
                      <div class="question-section">
                        <p>Do you add extra salt to your meals?</p>

                        <div class="row mb-5">
                          <div class="checkbox-ans">
                            <div class="custom-control custom-radio">
                              <input type="radio" id="step4-yes" name="customRadio" class="custom-control-input">
                              <label class="custom-control-label" for="step4-yes">Yes</label>
                            </div>
                            <div class="custom-control custom-radio">
                              <input type="radio" id="step4-no" name="customRadio" class="custom-control-input" checked>
                              <label class="custom-control-label" for="step4-no">No</label>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </tab-content>

                  <template slot="footer" slot-scope="props">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="wizard-footer-left">
                        <wizard-button v-if="props.activeTabIndex > 0 && !props.isLastStep" @click.native="props.prevTab()" :style="props.fillButtonStyle">Previous</wizard-button>
                      </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="wizard-footer-bullet">
                          <div class="bullet-btn"></div>
                          <div class="bullet-btn"></div>
                          <div class="bullet-btn"></div>
                          <div class="bullet-btn active"></div>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="wizard-footer-right">
                          <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Next</wizard-button>

                          <wizard-button v-else @click.native="alert('Done')" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">{{props.isLastStep ? 'Done' : 'Next'}}</wizard-button>
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

  },
};
</script>

