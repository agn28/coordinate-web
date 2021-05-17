<template>
  <div>
    <div class="encounter-details">
      <div class="row">
        <div class="col-sm-8"></div>
      </div>
    </div>

    <div class="timeline-wrapper" v-if="encounters.length > 0">
      <div class="timeline">
        <div class="row">
          <div
            class="col-lg-4 timeline-item"
            v-for="(report, index) in reports"
            :key="index"
          >
            <div class="timeline-data bg-white">
              <div class="date">{{ getDate(report) }}</div>
              

              <div class="observation-icons">
                <div class="row">
                  <div v-if="getBmiReport(report)" class="col-sm-3">
                    <img
                      
                      src="../../../assets/images/bmi-icon.png"
                      class
                    />
                    <br>
                    <span>BMI</span>
                  </div>
                  <div v-if="getBpReport(report)" class="col-sm-3">
                    <img
                      
                      src="../../../assets/images/bp-icon.png"
                      class
                    />
                    <br>
                    <span>BP</span>
                  </div>
                  <div v-if="getCvdReport(report)" class="col-sm-3">
                    <img
                      
                      src="../../../assets/images/cvd-icon.png"
                      class
                    />
                    <br>
                    <span>CVD</span>
                  </div>

                  <div v-if="getCholesterolReport(report)" class="col-sm-3">
                    <img
                      
                      src="../../../assets/images/cholesterol-icon.png"
                      class
                    />
                    <br>
                    <span>Cholesterol</span>
                  </div>

                </div>
              </div>

              <!-- <div class="assessment-pills pb-2">
                                                
                                                <div class="pill-item RED border-RED">BMI</div>
                                                <div class="pill-item RED border-RED">BP</div>
                                                <div class="pill-item RED border-RED">CVD RISK</div>
                                                <div class="pill-item AMBER border-AMBER">Cholesterol</div>
                                                
                          </div>-->
              <br />

              <div class="float-right"></div>
              <button
                @click="assessmentDetails(report)"
                class="btn btn-light float-right"
                >View Details
                <i class="fas fa-arrow-right"></i
              ></button>
              <!-- <router-link
                :to="{
                  name: 'pastHealthAssessmentDetails',
                  params: {
                    patientId: patientId,
                    assessmentId: report.id,
                  },
                }"
                tag="a"
                class="view float-right"
                >View Details
                <i class="fas fa-arrow-right"></i
              ></router-link> -->

              <!-- <a href="view"> View Encounter Details</a> -->
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
import LineChart from "./LineChart.js";

export default {
  name: "patients",
  components: {
    VueJsonPretty,
    LineChart,
  },
  props: ['reports', 'encounters', 'users', 'patientId'],
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
    scrollToTop() {
      window.scrollTo(0,0);
    },
    assessmentDetails(report) {
      console.log('report');
      console.log(report);
      this.$emit('goToAssessmentDetails', report);
      this.$router.replace({ name: "patientOverview", params: { patientId: this.patientId }, query: { assessment: report.id } })
    },
    isObservationAvailable(encounter, observation) {
      // console.log('encounter.body.observations');
      // console.log(encounter.body.observations);
      let obs = encounter.body.observations.find((item) => {
        if (item.body.type == observation) {
          return item;
        }
      });

      return obs;
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
    getDate(report) {
      let date = "";
      console.log(report);
      if (report.report_date) {
        date = moment.unix(report.report_date._seconds).format("Do MMMM YYYY");
      }
      return date;
    },

    getBpReport(report) {
      console.log(report, 'report');
      if (report && report.result && report.result.assessments.blood_pressure) {
        return report.result.assessments.blood_pressure.value;
      }
      return '';
    },
    getBmiReport(report) {
      if (report && report.result && report.result.assessments.body_composition.components.bmi) {
        return report.result.assessments.body_composition.components.bmi.value;
      }
      return '';
    },
    getCholesterolReport(report) {
      if (report && report.result && report.result.assessments.cholesterol.components.total_cholesterol) {
        return report.result.assessments.cholesterol.components.total_cholesterol.value;
      }
      return '';
    },

    getCvdReport(report) {
      if (report && report.result && report.result.assessments.cvd) {
        return report.result.assessments.cvd.value;
      }
      return '';
    },

  
  },
  mounted() {
    this.scrollToTop();
  },
};
</script>

<style lang="scss">

</style>
