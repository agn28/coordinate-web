<template>
  <div class="content assessment">
    <div class="loader" v-if="isLoading">
      <rotate-square2></rotate-square2>
    </div>
    <div class="animated fadeIn">
      <div class="card mt-4">
        <div class="card-header py-2">
          <div class="row">
            <div class="col py-1">
              <a href @click.prevent="$router.go(-1)">
                <i class="fa fa-arrow-left float-left mr-4 text-light"></i>
              </a>
              <h4 class="font-weight-bold text-white text-center">PARTICIPANT HEALTH RECORD</h4>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-4">
              <div class="participant-info pb-5">
                <div class="row">
                  <div class="col-7">
                    <ul>
                      <li>Participant info</li>
                      <li>Care pathways</li>
                      <li>Worklist</li>
                      <li>FHW management</li>
                      <li>Settings</li>
                    </ul>
                  </div>
                  <div class="col-5">
                    <div class="avatar">
                      <i class="fa fa-user" aria-hidden="true"></i>
                      <span class="participant-gender text-capitalize">{{ participant_info.gender }} {{ getAge(participant_info.birthDate) }} years</span>
                    </div>
                    <div class="participant-name mt-2">
                      <p v-if="participant_info.identifier">{{ getId() }}</p>
                    </div>
                  </div>
                </div>

                <div class="row mt-5">
                  <div class="gauge-chart" v-if="cvd.value">
                    <vue-svg-gauge 
                      :start-angle="-110"
                      :end-angle="110"
                      :value="getCVD()"
                      :min="0"
                      :max="50"
                      :gauge-color="[{ offset: 0, color: '#007507'}, { offset: 20, color: '#79d48e'}, { offset: 40, color: '#ffc107f2'}, { offset: 60, color: '#ffc107f2'}, { offset: 80, color: '#fd7e14'}, { offset: 100, color: '#dc3545'}]"
                    ></vue-svg-gauge>
                    <p>CVD Risk Score: {{ cvd.value }}</p>
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="col-8">
              <div class="assessment-details">
                <p><strong>Date of last assessment: </strong> 5 July 2019</p>
                <p class="mb-5"><strong>Region: </strong>{{ participant_info.address ? participant_info.address[0].country : '' }}</p>
                <p><strong>Blood pressure: </strong>{{ this.blood_pressure.value }}</p>
                <p><strong>Fasting blood glucose: </strong>90 mg/dL</p>
                <p><strong>Total cholesterol: </strong>{{ this.cholesterol.components ? this.cholesterol.components.total_cholesterol.value : '' }}</p>
              </div>

              <div class="care-plan mt-4">
                <h4 class="font-weight-bold">Care Plan</h4>
                <div class="care-plan-details">
                  <div class="header mt-4"></div>
                  <div class="row">
                    <div class="col">
                      <div class="care-plan-item">
                        <img class="water-drop" src="../../assets/images/water-drop.png" alt="">
                        <p>{{ assessment_date }}</p>
                        <p>Assessment</p>
                      </div>
                    </div>
                    <div class="col" v-if="cvd.value && cvd.value == '<10%'">
                      <div class="care-plan-item">
                        <img class="water-drop" src="../../assets/images/water-drop.png" alt="">
                        <p>{{ getDate('1y') }}</p>
                        <p>Follow-up after 1 year</p>
                      </div>
                    </div>
                    <div class="col" v-if="cvd.value && cvd.value == '10-20%'">
                      <div class="care-plan-item">
                        <img class="water-drop" src="../../assets/images/water-drop.png" alt="">
                        <p>{{ getDate('6') }}</p>
                        <p>Follow-up every 6 months</p>
                      </div>
                    </div>
                    <div class="col" v-if="cvd.value && cvd.value == '10-20%'">
                      <div class="care-plan-item">
                        <img class="water-drop" src="../../assets/images/water-drop.png" alt="">
                        <p>{{ getDate('12') }}</p>
                        <p>Follow-up every 6 months</p>
                      </div>
                    </div>
                    <div class="col" v-if="cvd.value && cvd.value == '10-20%'">
                      <div class="care-plan-item">
                        <img class="water-drop" src="../../assets/images/water-drop.png" alt="">
                        <p>{{ getDate('18') }}</p>
                        <p>Follow-up every 6 months</p>
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

import { VueSvgGauge } from 'vue-svg-gauge'
import {RotateSquare2} from 'vue-loading-spinner'

export default {
  name: "health-records",
  components: { VueSvgGauge ,RotateSquare2 },
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
      assessment_date: ''
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getHealthRecords() {
      this.$http
        .get('assessments/' + this.participantId)
        .then(response => {
          this.lifestyle = response.data.hearts.assessments.lifestyle;
          this.body_composition = response.data.hearts.assessments.body_composition;
          this.blood_pressure = response.data.hearts.assessments.blood_pressure;
          this.diabetes = response.data.hearts.assessments.diabetes;
          this.cholesterol = response.data.hearts.assessments.cholesterol;
          this.cvd = response.data.hearts.assessments.cvd;
          this.goals = response.data.hearts.goals;
          this.referrals = response.data.hearts.referrals;
          this.isLoading = false;
        });
    },

    findPatient() {
      this.participants = JSON.parse(sessionStorage.getItem('participants'));
      this.participant_info = this.participants.find((p) => p.resource.id == this.participantId).resource;
    },

    getAge(dob) {
      var today = new Date();
      var birthDate = new Date(dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
      }

      return age;
    },

    getId() {
      let identifier = this.participant_info.identifier.find((idf) => idf.use == 'official');
      return identifier.value;
    },

    getCVD() {
      let firstChar = this.cvd.value.charAt(0);
      let value = 0;

      if (firstChar == '>' || firstChar == '<') {
        value = parseInt(this.cvd.value.replace(/\D/g, ""))
      } 
      else if (this.cvd.value = '10-20%') {
        let cvd = this.cvd.value.replace('%', '');
        cvd = cvd.split('-');
        value = parseInt(cvd[1]) + parseInt(cvd[0]) / 2;
      }

      return value;
    },

    getDate(duration) {
      let today = moment(); 
      let date = '';
      if (duration == '1y') {
        date = today.add(1, 'years').format('DD-MM-YYYY')
      } else  {
        date = date = today.add(duration, 'months').format('DD-MM-YYYY')
      }

      return date;
    }

  },
  mounted() {
    this.participantId = this.$route.params.participantId;
    this.getHealthRecords();

    this.findPatient();
    let today = new Date(); 
    this.assessment_date = moment().format('DD-MM-YYYY');
    this.scrollToTop();
  }
};
</script>

