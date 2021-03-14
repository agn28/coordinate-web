<template>
  <!-- Main Content -->
  <div id="content">

    <!-- Top Nav Bar -->
    <TopNavBar></TopNavBar>

    <div class="row">
      <div class="col-lg-12">
        <div class="encounter-stats">
          <div class="card mt-3 tab-card">
            <div class="card-header tab-card-header">
              <ul
                class="nav nav-tabs card-header-tabs"
                id="myTab"
                role="tablist"
              >
                <li class="nav-item">
                  <a
                    @click="onTabClick()"
                    class="nav-link active"
                    id="one-tab"
                    data-toggle="tab"
                    href="#one"
                    role="tab"
                    aria-controls="One"
                    aria-selected="true"
                    >Summery</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    @click="onTabClick()"
                    class="nav-link"
                    id="two-tab"
                    data-toggle="tab"
                    href="#two"
                    role="tab"
                    aria-controls="Two"
                    aria-selected="false"
                    >Analysis</a
                  >
                </li>
              </ul>
            </div>

            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="one"
                role="tabpanel"
                aria-labelledby="one-tab"
              >
                <Summary
                  :patients="patients"
                  :patientStat="patientStat"
                  :total_pending="total_pending"
                  :total_pending_careplan_patients="
                    total_pending_careplan_patients
                  "
                  :data="data"
                ></Summary>
              </div>
              <div
                class="tab-pane fade"
                id="two"
                role="tabpanel"
                aria-labelledby="three-tab"
              >
                <Analysis :patientStat="patientStat"></Analysis>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Main Content -->
</template>

<script>
import BarChart from "./utils/BarChart.vue";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import Analysis from "./dashboard/Analysis";
import Summary from "./dashboard/Summery";
import Topbar from './Topbar.vue';
import TopNavBar from './TopNavBar.vue';
export default {
  components: {
    BarChart,
    DateRangePicker,
    Analysis,
    Summary,
    Topbar,
    TopNavBar
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      search: "",
      patientStat: {
        total_patient: 0,
        male_patients: 0,
        female_patients: 0,
        age_30_to_39: 0,
        age_40_to_49: 0,
        age_50_to_59: 0,
        age_60_to_69: 0,
        age_70_plus: 0,
        male_age_30_to_39: 0,
        male_age_40_to_49: 0,
        male_age_50_to_59: 0,
        male_age_60_to_69: 0,
        male_age_70_plus: 0,
        female_age_30_to_39: 0,
        female_age_40_to_49: 0,
        female_age_50_to_59: 0,
        female_age_60_to_69: 0,
        female_age_70_plus: 0,
      },

      total_careplan: 0,
      total_pending: 0,
      total_pending_careplan_patients: 0,
      data: null,
      patients: null,
    };
  },
  created() {
    this.getSatistics();
  },
  methods: {
    onTabClick() {
      if (this.$route.query.encounter || this.$route.query.assessment) {
        this.$router.replace({});
      }
    },
    getSatistics() {
      let loader = this.$loading.show();
      this.$http.get("/stats").then(
        (response) => {
          if (response.status == 200) {
            (this.patients = response.data.data.patients),
              (this.patientStat.total_patient =
                response.data.data.patients.length);
            this.total_careplan = response.data.data.total_careplan;
            this.total_pending = response.data.data.total_pending;
            this.total_pending_careplan_patients =
              response.data.data.total_pending_careplan_patients;
            this.data = response.data.data.data;
            this.patientStat.male_patients = response.data.data.patients.filter(
              (item) => {
                return item.body.gender == "male";
              }
            ).length;
            this.patientStat.female_patients = response.data.data.patients.filter(
              (item) => {
                return item.body.gender == "female";
              }
            ).length;
            this.patientStat.age_30_to_39 = response.data.data.patients.filter(
              (item) => {
                return item.body.age >= 30 && item.body.age <= 39;
              }
            ).length;
            this.patientStat.age_40_to_49 = response.data.data.patients.filter(
              (item) => {
                return item.body.age >= 40 && item.body.age <= 49;
              }
            ).length;
            this.patientStat.age_50_to_59 = response.data.data.patients.filter(
              (item) => {
                return item.body.age >= 50 && item.body.age <= 59;
              }
            ).length;
            this.patientStat.age_60_to_69 = response.data.data.patients.filter(
              (item) => {
                return item.body.age >= 60 && item.body.age <= 69;
              }
            ).length;
            this.patientStat.age_70_plus = response.data.data.patients.filter(
              (item) => {
                return item.body.age >= 70;
              }
            ).length;

            this.patientStat.male_age_30_to_39 = response.data.data.patients.filter(
              (item) => {
                return (
                  item.body.age >= 30 &&
                  item.body.age <= 39 &&
                  item.body.gender == "male"
                );
              }
            ).length;
            this.patientStat.male_age_40_to_49 = response.data.data.patients.filter(
              (item) => {
                return (
                  item.body.age >= 40 &&
                  item.body.age <= 49 &&
                  item.body.gender == "male"
                );
              }
            ).length;
            this.patientStat.male_age_50_to_59 = response.data.data.patients.filter(
              (item) => {
                return (
                  item.body.age >= 50 &&
                  item.body.age <= 59 &&
                  item.body.gender == "male"
                );
              }
            ).length;
            this.patientStat.male_age_60_to_69 = response.data.data.patients.filter(
              (item) => {
                return (
                  item.body.age >= 60 &&
                  item.body.age <= 69 &&
                  item.body.gender == "male"
                );
              }
            ).length;
            this.patientStat.male_age_70_plus = response.data.data.patients.filter(
              (item) => {
                return item.body.age >= 70 && item.body.gender == "male";
              }
            ).length;

            this.patientStat.female_age_30_to_39 = response.data.data.patients.filter(
              (item) => {
                return (
                  item.body.age >= 30 &&
                  item.body.age <= 39 &&
                  item.body.gender == "female"
                );
              }
            ).length;
            this.patientStat.female_age_40_to_49 = response.data.data.patients.filter(
              (item) => {
                return (
                  item.body.age >= 40 &&
                  item.body.age <= 49 &&
                  item.body.gender == "female"
                );
              }
            ).length;
            this.patientStat.female_age_50_to_59 = response.data.data.patients.filter(
              (item) => {
                return (
                  item.body.age >= 50 &&
                  item.body.age <= 59 &&
                  item.body.gender == "female"
                );
              }
            ).length;
            this.patientStat.female_age_60_to_69 = response.data.data.patients.filter(
              (item) => {
                return (
                  item.body.age >= 60 &&
                  item.body.age <= 69 &&
                  item.body.gender == "female"
                );
              }
            ).length;
            this.patientStat.female_age_70_plus = response.data.data.patients.filter(
              (item) => {
                return item.body.age >= 70 && item.body.gender == "female";
              }
            ).length;
          }
          loader.hide();
        },
        (error) => {
          loader.hide();
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
.encounter-stats {
  margin: 0;
}
</style>
