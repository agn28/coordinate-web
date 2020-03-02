<template>
  <div class="content medication-questionnaire">
    <div class="loader" v-if="isLoading">
      <rotate-square2></rotate-square2>
    </div>
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex breadcrumb-wrap">
        <i class="fa fa-arrow-left text-secondary back-icon"></i>
        <div class="">
          <h4>Medications Questionnaire</h4>
          <div class="breadcrumb"><span>Patients</span>/ <span>Jahanara Begum</span> / <span>Create a New Encounter</span> / <span>Questionnaire</span> / Medications</div>
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
          <div class="medication-question">
            <div class="card">
              <div class="card-body custom-card-body">

                <form-wizard>
                  <tab-content>
                    <div class="step-1">
                      <div class="question-section">
                        <p>What medications are you taking (includeing over-the-counter /herbal /traditional remedies/recreational)?</p>

                        <div class="row mb-5">
                          <template>
                            <div class="control_wrapper">
                              <br>
                              <ejs-multiselect id='multiselect' :dataSource='madicinesData' placeholder="Select Medications" mode="CheckBox" :fields='fields'></ejs-multiselect>
                            </div>
                          </template>

                        </div>
                      </div>
                    </div>
                  </tab-content>

                  <tab-content>
                    <div class="step-2">
                      <div class="question-section">
                        <p>Are you taking your medications exactly ads prescribed?</p>

                        <div class="row mb-5">
                          <div class="checkbox-ans">
                            <div class="custom-control custom-radio">
                              <input type="radio" id="step2-yes" name="customRadio" class="custom-control-input" checked>
                              <label class="custom-control-label" for="step2-yes">Yes</label>
                            </div>
                            <div class="custom-control custom-radio">
                              <input type="radio" id="step2-no" name="customRadio" class="custom-control-input" >
                              <label class="custom-control-label" for="step2-no">No</label>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </tab-content>

                  <tab-content>
                    <div class="step-2">
                      <div class="question-section">
                        <p>What problems have you had taking your medicines?</p>

                        <div class="row mb-5">
                          <div class="col-lg-6 ml-3">
                            <div class="form-group">
                              <input type="text" class="form-control">
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
                          <div class="bullet-btn active"></div>
                          <div class="bullet-btn"></div>
                          <div class="bullet-btn"></div>
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

import Vue from 'vue';
import { MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
MultiSelect.Inject(CheckBoxSelection);
Vue.use(MultiSelectPlugin);

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
      madicinesData: [
        { Id: '1', Medicine: 'Abacavir' },
        { Id: '2', Medicine: 'Alendronate' },
        { Id: '3', Medicine: 'Alfacalcidol' },
        { Id: '4', Medicine: 'Allopurinol' },
        { Id: '5', Medicine: 'Amoxycillin' },
        { Id: '6', Medicine: 'Beclometasone inhaler' },
      ],
      fields : { text: 'Medicine', value: 'Id' }
    };
  },
  methods: {

  },
  mounted() {

  },
};
</script>


