<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-6"></div>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <div class="card patient-card">
          <div class="card-body">
            <div class="header">
              <div class="row">
                <div class="col-sm-1">
                  <div class="avatar">
                    <img src="../../../assets/images/avatar.png" alt />
                  </div>
                </div>
                <div class="col-sm-6">
                  <h6>
                    {{ patient.body.first_name + " " + patient.body.last_name }}
                  </h6>
                  <span class="type"
                    >Height: <span class="value">{{ bodyHeight }}</span></span
                  >
                  <span class="type"
                    >Weight: <span class="value">{{ bodyWeight }}</span></span
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
              <td class="text-bold" :class="getBpColor()">
                {{ getBpReport() }}
              </td>
            </tr>
            <tr>
              <td class="text-secondary">BMI:</td>
              <td class="text-bold" :class="getBmiColor()">
                {{ getBmiReport() }}
              </td>
            </tr>
            <tr>
              <td class="text-secondary">Total Cholesterol:</td>
              <td class="text-bold" :class="getCholesterolColor()">
                {{ getCholesterolReport() }}
              </td>
            </tr>
            <tr>
              <td class="text-secondary">CVD:</td>
              <td class="text-bold" :class="getCvdColor()">
                {{ getCvdReport() }}
              </td>
            </tr>
            <tr>
              <td class="text-secondary">Diabetes:</td>
              <td class="text-bold" :class="getDiabetesColor()">
                {{ getDiabetesReport() }}
              </td>
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
          <div
            v-if="getTobaccoReport()"
            class="lifestyle-item tobacco d-flex align-items-center justify-content-between"
          >
            <div class="title">
              <img src="../../../assets/images/tobacco-icon.png" alt="" />
              <span>Tobacco Use</span>
            </div>
            <div class="status" :class="getTobaccoColor()">
              {{ getTobaccoReport() }}
            </div>
            <div class="edit"></div>
          </div>

          <div
            v-if="getAlcoholReport()"
            class="lifestyle-item tobacco d-flex align-items-center justify-content-between"
          >
            <div class="title">
              <img src="../../../assets/images/alcohol-icon.png" alt="" />
              <span>Alcohol Consumption</span>
            </div>
            <div class="status" :class="getAlcoholColor()">
              {{ getAlcoholReport() }}
            </div>
            <div class="edit"></div>
          </div>

          <div
            v-if="getDietReport()"
            class="lifestyle-item tobacco d-flex align-items-center justify-content-between"
          >
            <div class="title">
              <img src="../../../assets/images/fruits-icon.png" alt="" />
              <span>Fruits and Vegetables Intake</span>
            </div>
            <div class="status" :class="getDietColor()">
              {{ getDietReport() }}
            </div>
            <div class="edit"></div>
          </div>

          <div
            v-if="getActivityReport()"
            class="lifestyle-item tobacco d-flex align-items-center justify-content-between"
          >
            <div class="title">
              <img src="../../../assets/images/activity-icon.png" alt="" />
              <span>Physical Activity</span>
            </div>
            <div class="status" :class="getActivityColor()">
              {{ getActivityReport() }}
            </div>
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
              <td class="text-bold">
                {{
                  getBp(currentEncounter.body.observations)
                    ? getBp(currentEncounter.body.observations).body.data
                        .pulse_rate
                    : ""
                }}
              </td>
            </tr>
            <tr>
              <td class="text-secondary">Blood Pressure:</td>
              <td class="text-bold">
                {{
                  getBp(currentEncounter.body.observations)
                    ? getBp(currentEncounter.body.observations).body.data
                        .systolic +
                      "/" +
                      getBp(currentEncounter.body.observations).body.data
                        .diastolic
                    : ""
                }}
              </td>
            </tr>
            <tr>
              <td class="text-secondary">Height:</td>
              <td class="text-bold">
                {{
                  getHeight(currentEncounter.body.observations)
                    ? getHeight(currentEncounter.body.observations).body.data
                        .value +
                      " " +
                      getHeight(currentEncounter.body.observations).body.data
                        .unit
                    : ""
                }}
              </td>
            </tr>
            <tr>
              <td class="text-secondary">Weight:</td>
              <td class="text-bold">
                {{
                  getWeight(currentEncounter.body.observations)
                    ? getWeight(currentEncounter.body.observations).body.data
                        .value +
                      " " +
                      getWeight(currentEncounter.body.observations).body.data
                        .unit
                    : ""
                }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 pb-2 pt-3">
        <h6 class="text-bold">Summary</h6>
      </div>
    </div>
    <div class="row chart-wrapper">
      <div class="col-sm-4">
        <div class="card vital-item border p-2">
          <div class="row">
            <div class="col-sm-6">
              <span
                >Blood Pressure
                <span class="text-secondary"
                  >({{ bloodPressures.length }})</span
                ></span
              >
            </div>
            <div class="col-sm-6 text-right">
              <span class="text-success pl-3">Normal</span>
            </div>
          </div>
          <h5>
            {{ avgDiastolic + "/" + avgSystolic }}
            <span class="text-secondary">mm/hg</span>
          </h5>
          <line-chart :chart-data="bpChart" :options="chartOptions"></line-chart>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card vital-item border p-2">
          <div class="row">
            <div class="col-sm-6">
              <span
                >Heart Rate
                <span class="text-secondary"
                  >({{ bloodPressures.length }})</span
                ></span
              >
            </div>
            <div class="col-sm-6 text-right">
              <span class="text-success pl-3">Normal</span>
            </div>
          </div>
          <h5>
            {{ avgPulse }}
            <span class="text-secondary">mm/hg</span>
          </h5>
          <line-chart :chart-data="heartChart" :options="chartOptions"></line-chart>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card vital-item border p-2">
          <div class="row">
            <div class="col-sm-6">
              <span
                >BMI <span class="text-secondary">({{ totalBMI }})</span></span
              >
            </div>
            <div class="col-sm-6 text-right">
              <span class="text-success pl-3">Normal</span>
            </div>
          </div>
          <h5>{{ avgBMI }} <span class="text-secondary">mm/hg</span></h5>
          <line-chart :chart-data="bmiChart" :options="chartOptions"></line-chart>
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
  props: ["patient", "report", "observations", "currentEncounter"],
  data() {
    return {
      data: [],
      bpChart: {},
      heartChart: {},
      bmiChart: {},
      bloodPressures: [],
      avgDiastolic: 0,
      avgSystolic: 0,
      avgPulse: 0,
      avgBMI: 0,
      totalBMI: 0,
      previousEncounter: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
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
    fillData(dias, sys) {
      this.bpChart = {
        datasets: [
          {
            label: "Diastolic",
            borderColor: "#bdd9fc",
            data: dias ? dias : [],
            display: false,
          },
          {
            label: "Systolic",
            borderColor: "#007bff",
            data: sys ? sys : [],
            display: false,
          },
        ],
      };
    },
    fillHeartRate(data) {
      this.heartChart = {
        datasets: [
          {
            label: "Heart Rate",
           borderColor: "#28a745",
            data: data ? data : [],
            display: false,
          },
        ],
      };
    },

    fillBMIChart(data) {
      this.bmiChart = {
        datasets: [
          {
            label: "BMI",
            borderColor: "#bdd9fc",
            data: data ? data : [],
            display: false,
          },
        ],
      };
    },

    getBp(observations) {
      return observations.find((obs) => obs.body.type == "blood_pressure");
    },

    getHeight(observations) {
      return observations.find((obs) => {
        if (obs.body.type == "body_measurement") {
          if (obs.body.data.name == "height") {
            return obs;
          }
        }
      });
    },
    getWeight(observations) {
      return observations.find((obs) => {
        if (obs.body.type == "body_measurement") {
          if (obs.body.data.name == "weight") {
            return obs;
          }
        }
      });
    },

    getBloodSugar(observations) {
      return observations.find((obs) => {
        if (obs.body.type == "blood_test") {
          if (obs.body.data.name == "blood_sugar") {
            return obs;
          }
        }
      });
    },

    getBpReport() {
      if (this.report && this.report.body.result.assessments.blood_pressure) {
        return this.report.body.result.assessments.blood_pressure.value;
      }
      return "";
    },
    getBpColor() {
      if (this.report && this.report.body.result.assessments.blood_pressure) {
        return this.report.body.result.assessments.blood_pressure.tfl;
      }
      return "";
    },
    getBmiReport() {
      if (
        this.report &&
        this.report.body.result.assessments.body_composition.components.bmi
      ) {
        return this.report.body.result.assessments.body_composition.components
          .bmi.value;
      }
      return "";
    },
    getBmiColor() {
      if (
        this.report &&
        this.report.body.result.assessments.body_composition.components.bmi
      ) {
        return this.report.body.result.assessments.body_composition.components
          .bmi.tfl;
      }
      return "";
    },
    getCholesterolReport() {
      if (
        this.report &&
        this.report.body.result.assessments.cholesterol.components
          .total_cholesterol
      ) {
        return this.report.body.result.assessments.cholesterol.components
          .total_cholesterol.value;
      }
      return "";
    },
    getCholesterolColor() {
      if (
        this.report &&
        this.report.body.result.assessments.cholesterol.components
          .total_cholesterol
      ) {
        return this.report.body.result.assessments.cholesterol.components
          .total_cholesterol.tfl;
      }
      return "";
    },

    getCvdReport() {
      if (this.report && this.report.body.result.assessments.cvd) {
        return this.report.body.result.assessments.cvd.value;
      }
      return "";
    },
    getCvdColor() {
      if (this.report && this.report.body.result.assessments.cvd) {
        return this.report.body.result.assessments.cvd.tfl;
      }
      return "";
    },
    getDiabetesReport() {
      if (this.report && this.report.body.result.assessments.diabetes) {
        return this.report.body.result.assessments.diabetes.value;
      }
      return "";
    },
    getDiabetesColor() {
      if (this.report && this.report.body.result.assessments.diabetes) {
        return this.report.body.result.assessments.diabetes.tfl;
      }
      return "";
    },

    getTobaccoReport() {
      if (
        this.report &&
        this.report.body.result.assessments.lifestyle.components.smoking
      ) {
        return this.report.body.result.assessments.lifestyle.components.smoking
          .value;
      }
      return "";
    },
    getTobaccoColor() {
      if (
        this.report &&
        this.report.body.result.assessments.lifestyle.components.smoking
      ) {
        return this.report.body.result.assessments.lifestyle.components.smoking
          .tfl;
      }
      return "";
    },

    getAlcoholReport() {
      if (
        this.report &&
        this.report.body.result.assessments.lifestyle.components.alcohol
      ) {
        return this.report.body.result.assessments.lifestyle.components.alcohol
          .value;
      }
      return "";
    },
    getAlcoholColor() {
      if (
        this.report &&
        this.report.body.result.assessments.lifestyle.components.alcohol
      ) {
        return this.report.body.result.assessments.lifestyle.components.alcohol
          .tfl;
      }
      return "";
    },

    getDietReport() {
      if (
        this.report &&
        this.report.body.result.assessments.lifestyle.components.diet.components
          .fruit_vegetable
      ) {
        return this.report.body.result.assessments.lifestyle.components.diet
          .components.fruit_vegetable.value;
      }
      return "";
    },
    getDietColor() {
      if (
        this.report &&
        this.report.body.result.assessments.lifestyle.components.diet.components
          .fruit_vegetable
      ) {
        return this.report.body.result.assessments.lifestyle.components.diet
          .components.fruit_vegetable.tfl;
      }
      return "";
    },

    getActivityReport() {
      if (
        this.report &&
        this.report.body.result.assessments.lifestyle.components
          .physical_activity
      ) {
        return this.report.body.result.assessments.lifestyle.components
          .physical_activity.value;
      }
      return "";
    },
    getActivityColor() {
      if (
        this.report &&
        this.report.body.result.assessments.lifestyle.components
          .physical_activity
      ) {
        return this.report.body.result.assessments.lifestyle.components
          .physical_activity.tfl;
      }
      return "";
    },
    generateBPChart() {
      this.bloodPressures = this.observations.filter(
        (o) => o.body.type === "blood_pressure"
      );
      let dias = [],
        pulse = [],
        sys = [],
        totalDias = 0,
        totalSys = 0,
        totalPulse = 0;
      for (let bp of this.bloodPressures) {
        dias.push(bp.body.data.diastolic);
        totalDias += bp.body.data.diastolic;
        sys.push(bp.body.data.systolic);
        totalSys += bp.body.data.systolic;
        pulse.push(bp.body.data.pulse_rate);
        totalPulse += bp.body.data.pulse_rate;
      }
      this.avgDiastolic = typeof dias[0] !== 'undefined' ? dias[0] : 'N/A';

      this.avgSystolic = typeof sys[0] !== 'undefined' ? sys[0] : 'N/A';

      this.avgPulse = typeof pulse[0] !== 'undefined' ? pulse[0] : 'N/A';

      this.fillData(dias, sys);

      this.fillHeartRate(pulse);
    },

    initializeBodyMeasurement() {
      let height = this.observations.filter(
        (o) =>
          o.body.type === "body_measurement" && o.body.data.name === "height"
      );

      let finalData = [];

      for (let h of height) {
        let ht = {
          encounter_id: h.body.assessment_id,
          height: h.body.data.value,
          weight: 0,
        };
        if (h.body.data.unit === "cm") {
          ht.height = h.body.data.value * 0.01;
        }
        finalData.push(ht);
      }

      let weight = this.observations.filter(
        (o) =>
          o.body.type === "body_measurement" && o.body.data.name === "weight"
      );

      for (let w of weight) {
        let existingHeight = finalData.find(
          (f) => f.encounter_id == w.body.assessment_id
        );

        if (existingHeight) {
          existingHeight.weight = w.body.data.value;
          if (w.body.data.unit === "lb") {
            existingHeight.weight = w.body.data.value * 0.453592;
            finalData.push(ht);
          }
        }
      }

      let bmiValues = [],
        totalBMI = 0;
      for (let item of finalData) {
        let bmi = item.weight / (item.height * item.height);
        bmiValues.push(bmi);
        totalBMI += bmi;
      }

      this.avgBMI = typeof bmiValues[0] !== 'undefined' ? bmiValues[0] : 'N/A';

      this.totalBMI = bmiValues.length;

      this.fillBMIChart(bmiValues);
    },
  },
  mounted() {
    this.generateBPChart();
    this.initializeBodyMeasurement();
  },
};
</script>

<style lang="scss">
</style>
