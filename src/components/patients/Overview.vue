<template>
  <div class="content">
    <div class="loader" v-if="isLoading">
      <rotate-square2></rotate-square2>
    </div>
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex mt-3 mb-3">
        <a href=""><i class="fa fa-arrow-left mr-3 text-secondary"></i></a>
        <div class="patient-overview">
          <h4>Patient overview</h4>
          <div class="breadcrumb"><span>Patients</span>/ patient name</div>
        </div>
      </div>

      <div class="col-lg-12 border-top border-bottom">
        <div class="patient mt-2 mb-3">
          <div class="patient-image mr-3">
            <img src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
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

      <div class="col-lg-12 border-bottom">
        <div class="patient-edit mt-3 mb-3 ml-2">
          <div class="edit"><i class="fas fa-pen mr-2"></i>View/Edit Patient Details</div>
          <div class="care-plane"><i class="fas fa-user-check mr-2"></i>Care Plan</div>
          <div class="action"><i class="fas fa-circle"></i>3 Actions Pending</div>
        </div>
      </div>

    </div>
  </div>


</template>

<script>
// @ is an alias to /src
import {RotateSquare2} from 'vue-loading-spinner';


export default {
  name: "patients",
  components: { RotateSquare2 },
  data() {
    return {
      isLoading: true,
      patients: []
    };
  },
  methods: {
    getPatients() {
      this.$http.get("/patients").then(response => {
        if (response.status == 200) {
          this.patients = response.data.entry;
          this.isLoading = false;
        }
      });
    },

    getId(identifier, type) {
      if (!identifier) {
        return '';
      }
      let id = identifier.find(x => x.use === type);

      if (id) {
        return id.value;
      }
      return '';
    }
  },
  mounted() {
    this.getPatients();
  }
};
</script>

<style lang="">
</style>
