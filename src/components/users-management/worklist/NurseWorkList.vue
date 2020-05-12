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
          <div class="breadcrumb">
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
      <div class="row">
        <div class="col-lg-12">
          <div class="care-plan-list">
            <div class="table-responsive">
              <table class="table border-bottom">
                <thead>
                  <tr>
                    <th scope="col">Care Plan Action</th>
                    <th scope="col">Participant Name</th>
                    <th scope="col">Care Plan Due Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(carePlan, index) in carePlans">
                    <tr
                      :key="index">
                      <td class="td-title">{{ carePlan.body.title }}</td>
                      <td>{{ carePlan.participant_name }}</td>
                      <td>{{ carePlan.body.activityDuration.end | moment("Do MMMM YYYY") }}</td>
                      <td v-if="carePlan.meta.status === 'pending'" class="pending">Pending</td>
                      <td v-else class="success">Completed</td>
                    </tr>
                  </template>
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
export default {
  name: "NurseWorkList",
  data() {
    return {
      carePlans: []
    };
  },

  created() {
    this.getCarePlans();
  },
  methods: {
    getCarePlans() {
      let loader = this.$loading.show();
      this.$http.get(`care-plans/nurse/${this.$route.params.nurseId}`).then(
        response => {
          if (response.status == 200) {
            this.carePlans = response.data.data;
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

<style scoped>
</style>
