<template>
  <!-- Main Content -->
  <div id="content">
    <div class="col-md-12">
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
    </div>

    <!-- Begin Page Content -->
    <div class="container-fluid mt-5">
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

              <p class="text-black text-bold mt-3">{{ total_careplan}}</p>

              <router-link class="text-link custom-text-link" :to="{ name: 'carePlan'}">View</router-link>
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
              </div>
              <div class="col-md-12 col-lg-4">
                <div class="d-flex justify-content-center mb-2">
                  <button class="border-0 chartSelectBtn w-100">
                    <span class="bttn1"></span>Participant Registered
                  </button>
                  <button class="border-0 chartSelectBtn w-100">
                    <span class="bttn2"></span>Screenings completed
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-12">
          <bar-chart v-if="data" :stats="data"></bar-chart>
        </div>
      </div>
    </div>
    <!-- /.container-fluid -->
  </div>
  <!-- End of Main Content -->
</template>

<script>
import BarChart from "./utils/BarChart.vue";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
export default {
  components: {
    BarChart,
    DateRangePicker
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
      total_patient: 0,
      total_careplan: 0,
      total_pending: 0,
      data: null
    };
  },
  created() {
    this.getSatistics();
  },
  methods: {
    getSatistics() {
      let loader = this.$loading.show();
      this.$http.get("/stats", ).then(
        response => {
          if (response.status == 200) {
            this.total_patient = response.data.data.total_patient;
            this.total_careplan = response.data.data.total_careplan;
            this.total_pending = response.data.data.total_pending;
            this.data = response.data.data.data;
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

<style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
</style>
