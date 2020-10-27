<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        
      </div>

    </div>

    <div class="row">
      <div class="col-lg-6">
        <div class="card patient-card">
          <div class="card-body">
            <div class="header">
              <div class="row">
                <div class="col-sm-1">
                  <div class="avatar">
                    <img
                      src="../../../assets/images/avatar.png"
                      alt
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <h6>
                    {{
                      patient.body.first_name +
                      " " +
                      patient.body.last_name
                    }}
                  </h6>
                  <span class="type"
                    >Height:
                    <span class="value">{{
                      bodyHeight
                    }}</span></span
                  >
                  <span class="type"
                    >Weight:
                    <span class="value">{{
                      bodyWeight
                    }}</span></span
                  >
                </div>
              </div>
            </div>

            <div class="content">
              <div class="row">
                <div class="col-sm-4">
                  <p>
                    Birthday:
                    <span
                      >{{ patient.body.birth_date }} ({{
                        patient.body.age
                      }}
                      y.o)</span
                    >
                  </p>
                  <p>
                    Phone: <span>{{ patient.body.mobile }}</span>
                  </p>
                  <!-- <p>Policy: <span>Primary, 426-45-12AFT-12</span></p> -->
                </div>
                <div class="col-sm-6">
                  <p>
                    Address:
                    <span>{{
                      patient.body.address.village +
                      ", " +
                      patient.body.address.town +
                      ", " +
                      patient.body.address.district +
                      ", " +
                      patient.body.address.postal_code
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="card-footer">
                          </div>   -->
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 pb-2 pt-3">
        <h6 class="text-bold">Recent Encounters Summary</h6>
      </div>
    </div>

    <div v-if="report" class="row">
      <div class="col-lg-6">
        <div class="card p-3 card-big summary-card">

          <table>
            <!-- <tr>
              <td class="text-secondary">Temperature:</td>
              <td>46 <span>&#176;</span></td>
            </tr> -->
            
            <tr>
              <td class="text-secondary">Blood Pressure:</td>
              <td class="text-bold" :class="getBpColor()">{{ getBpReport() }}</td>
            </tr>
            <tr>
              <td class="text-secondary">BMI:</td>
              <td class="text-bold" :class="getBmiColor()">{{ getBmiReport() }}</td>
            </tr>
            <tr>
              <td class="text-secondary">Total Cholesterol:</td>
              <td class="text-bold" :class="getCholesterolColor()">{{ getCholesterolReport() }}</td>
            </tr>
            <tr>
              <td class="text-secondary">CVD:</td>
              <td class="text-bold" :class="getCvdColor()">{{ getCvdReport() }}</td>
            </tr>
            <tr>
              <td class="text-secondary">Diabetes:</td>
              <td class="text-bold" :class="getDiabetesColor()">{{ getDiabetesReport() }}</td>
            </tr>
            <!-- <tr>
              <td class="text-secondary">BMI:</td>
              <td>29</td>
            </tr> -->
          </table>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card card-big lifestyle-card">
          
          <div v-if="getTobaccoReport()" class="lifestyle-item tobacco d-flex align-items-center justify-content-between">
            
            <div class="title">
              <img src="../../../assets/images/tobacco-icon.png" alt="">
              <span>Tobacco Use</span>
            </div>
            <div class="status" :class="getTobaccoColor()">{{ getTobaccoReport() }}</div>
            <div class="edit"></div>

          </div>

          <div v-if="getAlcoholReport()" class="lifestyle-item tobacco d-flex align-items-center justify-content-between">
            
            <div class="title">
              <img src="../../../assets/images/alcohol-icon.png" alt="">
              <span>Alcohol Consumption</span>
            </div>
            <div class="status" :class="getAlcoholColor()">{{ getAlcoholReport() }}</div>
            <div class="edit"></div>

          </div>

          <div v-if="getDietReport()" class="lifestyle-item tobacco d-flex align-items-center justify-content-between">
            
            <div class="title">
              <img src="../../../assets/images/fruits-icon.png" alt="">
              <span>Fruits and Vegetables Intake</span>
            </div>
            <div class="status" :class="getDietColor()">{{ getDietReport() }}</div>
            <div class="edit"></div>

          </div>

          <div v-if="getActivityReport()" class="lifestyle-item tobacco d-flex align-items-center justify-content-between">
            
            <div class="title">
              <img src="../../../assets/images/activity-icon.png" alt="">
              <span>Physical Activity</span>
            </div>
            <div class="status" :class="getActivityColor()">{{ getActivityReport() }}</div>
            <div class="edit"></div>

          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 pb-2 pt-3">
        <h6 class="text-bold">Full Body Overview</h6>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <div class="card p-3 card-big summary-card">

          <table>
            <!-- <tr>
              <td class="text-secondary">Temperature:</td>
              <td>46 <span>&#176;</span></td>
            </tr> -->
            <tr>
              <td class="text-secondary">Heart Rate:</td>
              <td class="text-bold">{{ getBp(currentEncounter.body.observations) ? getBp(currentEncounter.body.observations).body.data.pulse_rate : ''}}</td>
            </tr>
            <tr>
              <td class="text-secondary">Blood Pressure:</td>
              <td class="text-bold">{{ getBp(currentEncounter.body.observations) ? getBp(currentEncounter.body.observations).body.data.systolic + '/' + getBp(currentEncounter.body.observations).body.data.diastolic : ''}}</td>
            </tr>
            <tr>
              <td class="text-secondary">Height:</td>
              <td class="text-bold">{{ getHeight(currentEncounter.body.observations) ? getHeight(currentEncounter.body.observations).body.data.value +' ' + getHeight(currentEncounter.body.observations).body.data.unit : '' }}</td>
            </tr>
            <tr>
              <td class="text-secondary">Weight:</td>
              <td class="text-bold">{{ getWeight(currentEncounter.body.observations) ? getWeight(currentEncounter.body.observations).body.data.value +' ' + getWeight(currentEncounter.body.observations).body.data.unit : '' }}</td>
            </tr>
            <!-- <tr>
              <td class="text-secondary">BMI:</td>
              <td>29</td>
            </tr> -->
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";
import LineChart from "./LineChart.js";

export default {
  name: "patients",
  components: {
    VueJsonPretty,
    LineChart,
  },
  props: ['patient', 'report', 'observations', 'currentEncounter'],
  data() {
    return {

    };
  },
  computed: {
    bodyHeight: function () {
      let height = this.observations.find(
        (o) =>
          o.body.type === "body_measurement" && o.body.data.name === "height"
      );

      if (!height) {
        return "N/A";
      }
      return height.body.data.value + " " + height.body.data.unit;
    },

    bodyWeight() {
      let weight = this.observations.find(
        (o) =>
          o.body.type === "body_measurement" && o.body.data.name === "weight"
      );

      if (!weight) {
        return "N/A";
      }
      return weight.body.data.value + " " + weight.body.data.unit;
    },
  },
  methods: {
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
    },
  
    getBpReport() {
      if (this.report && this.report.body.result.assessments.blood_pressure) {
        return this.report.body.result.assessments.blood_pressure.value;
      }
      return '';
    },
    getBpColor() {
      if (this.report && this.report.body.result.assessments.blood_pressure) {
        return this.report.body.result.assessments.blood_pressure.tfl;
      }
      return '';
    },
    getBmiReport() {
      if (this.report && this.report.body.result.assessments.body_composition.components.bmi) {
        return this.report.body.result.assessments.body_composition.components.bmi.value;
      }
      return '';
    },
    getBmiColor() {
      if (this.report && this.report.body.result.assessments.body_composition.components.bmi) {
        return this.report.body.result.assessments.body_composition.components.bmi.tfl;
      }
      return '';
    },
    getCholesterolReport() {
      if (this.report && this.report.body.result.assessments.cholesterol.components.total_cholesterol) {
        return this.report.body.result.assessments.cholesterol.components.total_cholesterol.value;
      }
      return '';
    },
    getCholesterolColor() {
      if (this.report && this.report.body.result.assessments.cholesterol.components.total_cholesterol) {
        return this.report.body.result.assessments.cholesterol.components.total_cholesterol.tfl;
      }
      return '';
    },

    getCvdReport() {
      if (this.report && this.report.body.result.assessments.cvd) {
        return this.report.body.result.assessments.cvd.value;
      }
      return '';
    },
    getCvdColor() {
      if (this.report && this.report.body.result.assessments.cvd) {
        return this.report.body.result.assessments.cvd.tfl;
      }
      return '';
    },
    getDiabetesReport() {
      if (this.report && this.report.body.result.assessments.diabetes) {
        return this.report.body.result.assessments.diabetes.value;
      }
      return '';
    },
    getDiabetesColor() {
      if (this.report && this.report.body.result.assessments.diabetes) {
        return this.report.body.result.assessments.diabetes.tfl;
      }
      return '';
    },

    getTobaccoReport() {
      if (this.report && this.report.body.result.assessments.lifestyle.components.smoking) {
        return this.report.body.result.assessments.lifestyle.components.smoking.value;
      }
      return '';
    },
    getTobaccoColor() {
      if (this.report && this.report.body.result.assessments.lifestyle.components.smoking) {
        return this.report.body.result.assessments.lifestyle.components.smoking.tfl;
      }
      return '';
    },

    getAlcoholReport() {

      if (this.report && this.report.body.result.assessments.lifestyle.components.alcohol) {
        return this.report.body.result.assessments.lifestyle.components.alcohol.value;
      }
      return '';
    },
    getAlcoholColor() {
      if (this.report && this.report.body.result.assessments.lifestyle.components.alcohol) {
        return this.report.body.result.assessments.lifestyle.components.alcohol.tfl;
      }
      return '';
    },

    getDietReport() {
      if (this.report && this.report.body.result.assessments.lifestyle.components.diet.components.fruit_vegetable) {
        return this.report.body.result.assessments.lifestyle.components.diet.components.fruit_vegetable.value;
      }
      return '';
    },
    getDietColor() {
      if (this.report && this.report.body.result.assessments.lifestyle.components.diet.components.fruit_vegetable) {
        return this.report.body.result.assessments.lifestyle.components.diet.components.fruit_vegetable.tfl;
      }
      return '';
    },

    getActivityReport() {
      if (this.report && this.report.body.result.assessments.lifestyle.components.physical_activity) {
        return this.report.body.result.assessments.lifestyle.components.physical_activity.value;
      }
      return '';
    },
    getActivityColor() {
      if (this.report && this.report.body.result.assessments.lifestyle.components.physical_activity) {
        return this.report.body.result.assessments.lifestyle.components.physical_activity.tfl;
      }
      return '';
    },
  
  },
  mounted() {

  },
};
</script>

<style lang="scss">

</style>
