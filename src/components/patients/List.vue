<template>
  <div class="content">
    <div class="loader" v-if="isLoading">
      <rotate-square2></rotate-square2>
    </div>
    <div class="animated fadeIn">
      <div class="card mt-4">
        <div class="card-header py-2">
          <div class="row">
            <div class="col">
              <h4 class="font-weight-bold">List of Participants</h4>
            </div>
            <div class="col text-right">
              <router-link
                :to="{name: 'patientCreate'}"
                tag="a"
                class="btn btn-primary btn-sm"
              >Add Participants</router-link>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-sm">
            <thead>
              <tr>
                <th scope="col">Sl</th>
                <th scope="col">Participant ID</th>
                <!-- <th scope="col">Participant UUID</th> -->
                <th scope="col">Gender</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(patient, index) in patients" :key="index">
                <template v-if="patient.resource.identifier && patient.resource.birthDate && patient.resource.gender">
                  <th scope="row">{{ index + 1 }}</th>
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
import {RotateSquare2} from 'vue-loading-spinner'

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
