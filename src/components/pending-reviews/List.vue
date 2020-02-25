<template>
  <div class="content">
    <div class="loader" v-if="isLoading">
      <rotate-square2></rotate-square2>
    </div>
    <div class="animated fadeIn">
      <div class="col-md-12 d-flex justify-content-between mt-3">
        <div class="header ml-3">
          <h4 class="font-weight-bold">
            Patients Pending Review
          </h4>
        </div>
      </div>

      <div class="col-md-12 d-flex justify-content-between mt-3 mb-5">
        <div class="search-patient flex-grow-1 mr-3 ml-3">
          <div class="input-group md-form form-sm form-1 pl-0">
            <div class="input-group-prepend">
            <span class="input-group-text lighten-3" id="basic-text1"><i class="fas fa-search"
                                                                                aria-hidden="true"></i></span>
            </div>
            <input class="form-control my-0 py-1 border-left-0" type="text" placeholder="Patient Name, ID, NID" aria-label="Search">
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="patient-list-table ml-3 mr-3">
          <div class="table-responsive">
            <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input">
                    <label class="custom-control-label" ></label>
                  </div>
                </th>
                <th scope="col">Name</th>
                <th scope="col">PID</th>
                <th scope="col">NID</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(patient, index) in patients" :key="index" @click="$router.push({ name: 'pendingReviewDetail', params: { reviewId: '1234s'}})">
                <template v-if="patient.resource.identifier && patient.resource.birthDate && patient.resource.gender">
                  <th scope="row">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input">
                      <label class="custom-control-label" ></label>
                    </div>
                  </th>
                  <td>{{ getId(patient.resource.identifier, 'official') }}</td>
                  <!-- <td>{{ getId(patient.resource.identifier, 'usual') }}</td> -->

                  <td>{{ patient.resource.birthDate }}</td>
                  <td>
                    NID: 123456
                  </td>
                  <td class="text-capitalize">45</td>
                  <td class="text-capitalize">{{ patient.resource.gender }}</td>
                </template>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
// @ is an alias to /src
import {RotateSquare2} from 'vue-loading-spinner';
import Vue from 'vue';
import { VuejsDatatableFactory } from 'vuejs-datatable';

Vue.use( VuejsDatatableFactory );

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
