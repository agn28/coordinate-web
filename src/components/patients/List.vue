<template>
  <div class="content patient-list">
    <div class="animated fadeIn">
      <div class="col-md-12 d-flex justify-content-between mt-3">
        <div class="header">
          <h4 class="font-weight-bold">
            Patients
          </h4>
        </div>

        <div class="d-flex patients-top-right">
          <div class="dropdown mr-3">
            <button class="btn dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Import
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Upload CSV File</a>
              <a class="dropdown-item" href="#">Download CSV Template</a>
            </div>
          </div>
          <div class="add-patient">
            <router-link
                    :to="{name: 'patientCreate'}"
                    tag="a"
                    class="btn btn-primary btn-icon-split">
              <span class="text-white"><i class="large material-icons">add</i>Register a New Patient</span>
            </router-link>
          </div>
        </div>

      </div>

      <div class="col-md-12 d-flex justify-content-between mt-3">
        <div class="search-patient flex-grow-1 mr-3">
          <div class="input-group md-form form-sm form-1 pl-0">
            <div class="input-group-prepend">
            <span class="input-group-text lighten-3" id="basic-text1"><i class="fas fa-search"
                                                                                aria-hidden="true"></i></span>
            </div>
            <input class="form-control my-0 py-1 border-left-0" type="text" placeholder="Patient Name, ID, NID" aria-label="Search">
          </div>
        </div>

        <div class="search-button flex-grow-0">
          <button class="btn btn-light border custom-btn" data-toggle="modal" data-target="#fingerprint"><i class="fas fa-fingerprint mr-3"></i>Find using Thumbprint</button>
        </div>

        <!-- Fingerprint buttonModal -->
        <div class="modal fade" id="fingerprint" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body border-bottom-0">
                <div class="patient-fingerprint text-center">
                  <div class="fingerprint-scan"><i class="fas fa-fingerprint fa-6x"></i></div>
                  <p>Ask patient to touch the fingerprint sensor</p>
                </div>
              </div>
              <div class="modal-footer border-top-0">
                <button type="button" class="btn" data-dismiss="modal" style="color: #01579B; font-weight: bold">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 mb-3 col-lg-12 pending-patient">
        <div class="form-group">
          <input type="checkbox" id="pending" class="mr-2">
          <label for="pending">Pending Recommendations Only</label>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="table-responsive">
          <table class="table border-bottom">
            <thead>
            <tr>
              <th scope="col">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input">
                  <label class="custom-control-label" ></label>
                </div>
              </th>
              <th scope="col">Participant ID</th>
              <th scope="col">Gender</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(patient, index) in patients" :key="index" @click="$router.push({ name: 'patientOverview', params: { patientId: '1234s'}})">
              <template v-if="patient.resource.identifier && patient.resource.birthDate && patient.resource.gender">
                <th scope="row">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input">
                    <label class="custom-control-label" ></label>
                  </div>
                </th>
                <td>{{ getId(patient.resource.identifier, 'official') }}</td>
                <!-- <td>{{ getId(patient.resource.identifier, 'usual') }}</td> -->
                <td class="text-capitalize">{{ patient.resource.gender }}</td>
                <td>{{ patient.resource.birthDate }}</td>
                <td>
                  <router-link
                          :to="{name: 'encounters', params: { patientId: patient.resource.id }}"
                          tag="a"
                          class="btn btn-warning btn-sm mr-2"
                  >Encounters</router-link>
                  <router-link
                          :to="{name: 'allergy', params: { patientId: patient.resource.id }}"
                          tag="a"
                          class="btn btn-success btn-sm mr-2"
                  >Allergy</router-link>
                  <router-link
                          :to="{name: 'familyMembers', params: { patientId: patient.resource.id }}"
                          tag="a"
                          class="btn btn-primary btn-sm mr-2"
                  >Family Member</router-link>
                  <router-link
                          :to="{name: 'specimen', params: { patientId: patient.resource.id }}"
                          tag="a"
                          class="btn btn-info btn-sm mr-2"
                  >Specimen</router-link>
                  <router-link
                          :to="{name: 'patientEdit', params: { patientId: patient.resource.id }}"
                          tag="a"
                          class="btn btn-secondary btn-sm mr-2 float-right"
                  ><i class="fa fa-edit"></i></router-link>
                </td>
              </template>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import { VuejsDatatableFactory } from 'vuejs-datatable';

Vue.use( VuejsDatatableFactory );

export default {
  name: "patients",
  components: { },
  data() {
    return {
      patients: []
    };
  },
  methods: {
    getPatients() {
      let loader = this.$loading.show();
      this.$http.get("/patients").then(response => {
        if (response.status == 200) {
          this.patients = response.data.entry;
          loader.hide()
        }
      },
      error => {
        loader.hide();
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
