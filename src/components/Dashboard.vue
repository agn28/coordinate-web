<template>
  <!-- Main Content -->
  <div id="content">
    <!-- <div class="col-md-12">
      <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 mt-4 static-top">
        <div class="flex-column login_user mt-3">
          <div class="welcomeMsg">Welcome</div>
          <h2 class="title">{{ user.name }}</h2>
          <div class="roleUser text-capitalize">{{ user.role }}</div>
        </div>

        <div class="navbar-nav ml-auto">
          <button class="btn btn-light btn-icon-split" @click="$router.push({ name: 'patientRegistration'})">
            <span class="text"><i class="large material-icons">add</i>Register a New Patient</span>
          </button>
        </div>
      </nav>
    </div> -->

    <div class="patient-search mt-3 ml-3 w-50">
      <div class="search">
        <div class="input-group md-form form-sm form-1 pl-0">
          <div class="input-group-prepend">
            <span class="input-group-text lighten-3" id="basic-text1">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
          </div>
          <input
            class="form-control my-0 py-1 border-left-0"
            type="text"
            placeholder="Search for a patient or diagnosis"
            aria-label="Search"
            v-model="search"
          />
        </div>
      </div>
      </div>

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
                  <all-encounters
                    v-if="encounters"
                    :encounters="encounters"
                    :users="users"
                    :patientId="patientId"
                    @goToEncounterDetails="goToEncounterDetails"
                  ></all-encounters>
                </div>
                <div
                  class="tab-pane fade"
                  id="two"
                  role="tabpanel"
                  aria-labelledby="three-tab"
                >
                  <Analysis
                    :patientStat="patientStat"
                  ></Analysis>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- Begin Page Content -->
    <!-- <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <span class>Total Patients</span>
              <p class="text-black text-bold mt-3">{{ total_patient}}</p>
              <router-link tag="a" class="text-link custom-text-link" :to="{name: 'patients'}">Manage an Existing Patient</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <span class>Patients Pending Recommendations</span>

              <p class="text-black text-bold mt-3">{{ total_pending}}</p>

              <router-link
                :to="{name: 'pendingReviews'}"
                class="text-link custom-text-link"
              >View Patients Pending Review</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <span class>Patients Pending Care Plan</span>

              <p class="text-black text-bold mt-3">{{ total_pending_careplan_patients }}</p>

              <router-link class="text-link custom-text-link" :to="{ name: 'carePlanPatients'}">View</router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <div class="col-md-12">
          <h2 class="title text-20">Assessment Performance</h2>
        </div>
        <div class="col-md-12 col-lg-12">
          <form action class="assessmentForm mt-4">
            <div class="row w-100">
              <div class="col-md-8 col-lg-5">
                <div class="mb-2">
                  <label class="mr-1">Period: &nbsp;</label>
                  <date-range-picker v-model="dateRange"></date-range-picker>
                </div>
              </div>
              <div class="col-md-4 col-lg-3">
                <div class="d-flex justify-content-center md-2">
                  <input type="button" class="border-0 chartSelectBtn activeBtn" value="Week" />
                  <input type="button" class="border-0 chartSelectBtn" value="Day" />
                  <input type="button" class="border-0 chartSelectBtn" value="Month" />
                </div>
              </div> -->
              <!-- <div class="col-md-12 col-lg-4">
                <div class="d-flex justify-content-center mb-2">
                  <button class="border-0 chartSelectBtn w-100">
                    <span class="bttn1"></span>Participant Registered
                  </button>
                  <button class="border-0 chartSelectBtn w-100">
                    <span class="bttn2"></span>Screenings completed
                  </button>
                </div>
              </div> -->
            <!-- </div>
          </form>
        </div>
        <div class="col-md-12">
          <bar-chart v-if="data" :stats="data"></bar-chart>
        </div>
      </div>
    </div> -->
    <!-- /.container-fluid -->
  </div>
  <!-- End of Main Content -->
</template>

<script>
import BarChart from "./utils/BarChart.vue";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import Analysis from "./dashboard/Analysis";
export default {
  components: {
    BarChart,
    DateRangePicker,
    Analysis
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  data() {
    return {
      dateRange: {
        startDate: "2020-01-01",
        endDate: "2020-01-10",
        format: "DD-MM-YYYY"
      },
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
        female_age_70_plus: 0
      },
      
      total_careplan: 0,
      total_pending: 0,
      total_pending_careplan_patients: 0,
      data: null
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
      this.$http.get("/stats", ).then(
        response => {
          if (response.status == 200) {
            this.patientStat.total_patient = response.data.data.patients.length;
            this.total_careplan = response.data.data.total_careplan;
            this.total_pending = response.data.data.total_pending;
            this.total_pending_careplan_patients = response.data.data.total_pending_careplan_patients;
            this.data = response.data.data.data;
            this.patientStat.male_patients = response.data.data.patients.filter(item => {
              return item.body.gender == 'male';
            }).length;
            this.patientStat.female_patients = response.data.data.patients.filter(item => {
              return item.body.gender == 'female';
            }).length;
            this.patientStat.age_30_to_39 = response.data.data.patients.filter(item => {
              return item.body.age >= 30 && item.body.age <= 39;
            }).length;
            this.patientStat.age_40_to_49 = response.data.data.patients.filter(item => {
              return item.body.age >= 40 && item.body.age <= 49;
            }).length;
            this.patientStat.age_50_to_59 = response.data.data.patients.filter(item => {
              return item.body.age >= 50 && item.body.age <= 59;
            }).length;
            this.patientStat.age_60_to_69 = response.data.data.patients.filter(item => {
              return item.body.age >= 60 && item.body.age <= 69;
            }).length;
            this.patientStat.age_70_plus = response.data.data.patients.filter(item => {
              return item.body.age >= 70;
            }).length;

            this.patientStat.male_age_30_to_39 = response.data.data.patients.filter(item => {
              return item.body.age >= 30 && item.body.age <= 39 && item.body.gender == 'male';
            }).length;
            this.patientStat.male_age_40_to_49 = response.data.data.patients.filter(item => {
              return item.body.age >= 40 && item.body.age <= 49 && item.body.gender == 'male';
            }).length;
            this.patientStat.male_age_50_to_59 = response.data.data.patients.filter(item => {
              return item.body.age >= 50 && item.body.age <= 59 && item.body.gender == 'male';
            }).length;
            this.patientStat.male_age_60_to_69 = response.data.data.patients.filter(item => {
              return item.body.age >= 60 && item.body.age <= 69 && item.body.gender == 'male';
            }).length;
            this.patientStat.male_age_70_plus = response.data.data.patients.filter(item => {
              return item.body.age >= 70 && item.body.gender == 'male';
            }).length;

            this.patientStat.female_age_30_to_39 = response.data.data.patients.filter(item => {
              return item.body.age >= 30 && item.body.age <= 39 && item.body.gender == 'female';
            }).length;
            this.patientStat.female_age_40_to_49 = response.data.data.patients.filter(item => {
              return item.body.age >= 40 && item.body.age <= 49 && item.body.gender == 'female';
            }).length;
            this.patientStat.female_age_50_to_59 = response.data.data.patients.filter(item => {
              return item.body.age >= 50 && item.body.age <= 59 && item.body.gender == 'female';
            }).length;
            this.patientStat.female_age_60_to_69 = response.data.data.patients.filter(item => {
              return item.body.age >= 60 && item.body.age <= 69 && item.body.gender == 'female';
            }).length;
            this.patientStat.female_age_70_plus = response.data.data.patients.filter(item => {
              return item.body.age >= 70 && item.body.gender == 'female';
            }).length;
            
          }
          loader.hide();
        },
        error => {
          loader.hide();
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
  .encounter-stats {
    margin: 0;
  }
</style>
