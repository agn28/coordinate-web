<template>
  <div class="content tobacco-questionnaire">
    <div class="loader" v-if="isLoading">
      <rotate-square2></rotate-square2>
    </div>
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex breadcrumb-wrap">
        <i class="fa fa-arrow-left text-secondary back-icon"></i>
        <div class="">
          <h4>Tobbaco Questionnaire</h4>
          <div class="breadcrumb"><span>Patients</span>/ <span>Jahanara Begum</span> / <span>Create a New Encounter</span> / <span>Questionnaire</span> / Tobacco</div>
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
          <div class="tobacco-question">
            <div class="card">
              <div class="card-body custom-card-body">

                <form-wizard>
                  <tab-content>
                    <div class="step-1">
                      <div class="question-msg">
                        <p><span><i class="fas fa-exclamation-circle"></i></span>Now I am going to ask you some questions about tobacco use.</p>
                      </div>
                      <div class="question-section">
                        <p>Have you used tobacco (all forms- cigarettes, biri, chewing tobacco, zarda, gul) during the past 12 months</p>

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
                      <div class="question-msg">
                        <p><span><i class="fas fa-exclamation-circle"></i></span>Integer non leo mattis nulla efficitur pharetra. In tortor purus, rutrum sit amet sollicitudin ac.</p>
                      </div>
                      <div class="question-section">
                        <p>Were you regularly exposed to secondhand tobacco smoke in the past 12 months</p>

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

