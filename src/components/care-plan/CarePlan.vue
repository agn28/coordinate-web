<template>
  <div class="content patient-care-plan">
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex breadcrumb-wrap">
        <i
          class="fa fa-arrow-left text-secondary back-icon"
          @click="$router.push({ name: 'dashboard'})"
        ></i>
        <div class>
          <h4>Care Plan</h4>
          <div class="breadcrumb" v-if="patient">
            <span>Patients / Jahanara Begum</span> / Care Plan
          </div>
        </div>
      </div>
      <div class="col-md-12 d-flex justify-content-between mt-3">
        <div class="search-patient flex-grow-1 mr-3">
          <div class="input-group md-form form-sm form-1 pl-0">
            <div class="input-group-prepend">
              <span class="input-group-text lighten-3" id="basic-text1">
                <i class="fas fa-search" aria-hidden="true"></i>
              </span>
            </div>
            <input
              class="form-control my-0 py-1 border-left-0"
              type="text"
              placeholder="Careplan title"
              aria-label="Search"
            />
          </div>
        </div>
      </div>

      <!-- <div class="col-lg-12 border-top border-bottom">
              <div class="patient mt-2 mb-3">
                  <div class="patient-image mr-3">
                      <img src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid"
                            width="100" height="100" alt="">
                  </div>
                  <div class="patient-details">
                      <div class="patient-name">Jahanara Begum</div>
                      <div class="details">
                          <div class="age">31y Female</div>
                          <div class="nid">NID: 1992121224343</div>
                          <div class="pid">PID: N-121233333</div>
                          <div class="register-date">Registered on Jan 5, 2019</div>
                      </div>
                  </div>
              </div>
          </div>

          <div class="row">
              <div class="col-lg-12 border-bottom">
                  <div class="care-plan-date">
                      <div class="row">
                          <div class="col-lg-3">
                              <div class="generate-date">Generated on Jan 5, 2019</div>
                          </div>

                          <div class="col-lg-3">
                              <div class="modified-date">Last modified on Jan 10, 2019</div>
                          </div>

                          <div class="col-lg-3">
                              <button class="btn generate-card">Generate Patient Card</button>
                          </div>
                      </div>
                  </div>
              </div>
      </div>-->

      <div class="row">
        <div class="col-lg-12">
          <div class="care-plan-list">
            <div class="table-responsive">
              <table class="table border-bottom">
                <thead>
                  <tr>
                    <th scope="col">Care Plan Action</th>
                    <th scope="col">Care Plan Due Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(carePlan, index) in carePlans">
                    <tr
                      :key="index"
                      v-if="carePlan.body.status != 'completed'"
                      class="care-data"
                      @click="$router.push({ name: 'carePlanAction', params: { carePlanId: carePlan.id }})"
                    >
                      <td class="td-title">{{ carePlan.body.title }}</td>
                      <td>{{ carePlan.body.activityDuration.end | moment("Do MMMM YYYY") }}</td>
                      <td class="pending">
                        Pending
                        <span class="pull-right">
                          <i class="fas fa-arrow-right"></i>
                        </span>
                      </td>
                    </tr>
                  </template>

                  <!-- <tr class="care-data" @click="$router.push({ name: 'carePlanAction'})">
                                        <td>Provide Smoking cessation advise</td>
                                        <td class="pending">Pending <span class="pull-right"><i class="fas fa-arrow-right"></i></span></td>
                  </tr>-->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: "CarePlan",
  data() {
    return {
      carePlans: [],
      patient: {},
      patientId: ''
    };
  },

  mounted() {
    this.patientId = this.$route.params.patientId;
    this.getCarePlans();
    this.getPatient();
    this.scrollToTop();
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getCarePlans() {
      let loader = this.$loading.show();
      this.$http.get("/care-plans").then(
        response => {
          if (response.status == 200) {
            this.carePlans = response.data.data;
            this.sortCarePlans();
          }
          loader.hide();
        },
        error => {
          loader.hide();
        }
      );
    },
    getPatient() {
      let loader = this.$loading.show();
      this.$http.get("/patients/" + this.patientId).then(
        response => {
          loader.hide();
          if (response.status == 200) {
            this.patient = response.data.data;
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    sortCarePlans() {
      this.carePlans = this.carePlans.sort((a, b) => {
        return moment(a.body.activityDuration.end).diff(b.body.activityDuration.end);
      });
    }
  }

  
};
</script>

<style scoped>
</style>
