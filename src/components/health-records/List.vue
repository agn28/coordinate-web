<template>
  <div class="content">
    <div class="loader" v-if="isLoading">
      <rotate-square2></rotate-square2>
    </div>
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <strong class="card-title">Participants List</strong>
            </div>
            <div class="">
              <table class="table">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th scope="col">Participant ID</th>
                    <!-- <th scope="col">Participant UUID</th> -->
                    <th scope="col">Gender</th>
                    <th scope="col">Date of Birth</th>
                    <th class="">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(patient, index) in patients" :key="index" >
                    <template v-if="patient.resource.identifier && patient.resource.birthDate && patient.resource.gender">
                      <td>{{ 1 }}</td>
                      <td>{{ getId(patient.resource.identifier, 'official') }}</td>
                      <!-- <td>{{ getId(patient.resource.identifier, 'usual') }}</td> -->
                      <td class="text-capitalize">{{ patient.resource.gender }}</td>
                      <td>{{ patient.resource.birthDate }}</td>
                      <td>
                        <router-link
                          :to="{name: 'healthEncounters', params: { participantId: patient.resource.id }}"
                          tag="a"
                          class="btn btn-success btn-sm mr-2"
                        >Encounters</router-link>

                        <router-link
                          :to="{name: 'healthDetail', params: { participantId: patient.resource.id }}"
                          tag="a"
                          class="btn btn-warning btn-sm mr-2"
                        >View</router-link>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.table-stats -->
          </div>
        </div>
      </div>
    </div>
    <!-- .animated -->
  </div>
  <!-- .content -->
</template>

<script>
import store from '../../store/store'
import {RotateSquare2} from 'vue-loading-spinner'

export default {
  components: {
    RotateSquare2
  },
  data() {
    return {
      patients: [],
      isLoading: true
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getPatients() {
      this.$http.get("/patients").then(response => {
        if (response.status == 200) {
          this.patients = response.data.entry;
          sessionStorage.setItem('participants', JSON.stringify(this.patients));
          this.isLoading = false;
          store.commit('addPatients', this.patients)
        }
      });
    },

    getId(identifier, type) {
      if (!identifier) {
        return "";
      }
      let id = identifier.find(x => x.use === type);

      if (id) {
        return id.value;
      }
      return "";
    },
  },

  mounted() {
    this.getPatients();
    this.scrollToTop();
  }
};
</script>

<style>
.loader {
  height: 500px;
  background: #ffffffed;
  position: absolute;
  width: 100%;
  z-index: 99999;
}
.spinner {
  left: 50%;
  top: 50%;

}
.spinner[data-v-fa81853e]:after {
  background: #626ed4;
}
</style>
