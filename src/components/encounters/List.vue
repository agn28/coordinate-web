<template>
  <div class="content">
    <div class="animated fadeIn">
      <div class="card mt-4">
        <div class="card-header py-2">
          <div class="row">
            <div class="col pt-1">
              <a href @click.prevent="$router.go(-1)">
                <i class="fa fa-arrow-left float-left mr-4 text-secondary"></i>
              </a>
              <h4 class="font-weight-bold">List of Encounters</h4>
            </div>
            <div class="col text-right">
              <router-link
                :to="{name: 'encounterCreate'}"
                tag="a"
                class="btn btn-primary btn-sm"
              >Add Encounter</router-link>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Type</th>
                <th scope="col">Reason</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(enc, index) in encounters" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ enc.type }}</td>
                <td>{{ enc.reason }}</td>
                <td>
                  <router-link
                    :to="{name: 'observations', params:{patientId: patientId, encounterId: enc.id}}"
                    tag="a"
                    class="btn btn-warning btn-sm mr-2"
                  >Observations</router-link>
                  <router-link
                    :to="{name: 'conditions', params:{patientId: patientId, encounterId: enc.id}}"
                    tag="a"
                    class="btn btn-primary btn-sm mr-2"
                  >Conditions</router-link>
                  <router-link
                    :to="{name: 'diagnostics', params:{patientId: patientId, encounterId: enc.id}}"
                    tag="a"
                    class="btn btn-info btn-sm mr-2"
                  >Diagnostics</router-link>
                </td>
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

export default {
  name: "patients",
  components: {},
  data() {
    return {
      encounters: []
    };
  },
  methods: {
    getEncounters() {
      this.$http
        .get("/patients/" + this.patientId + "/encounters")
        .then(response => {
          this.prepareEncounters(response.data);
        });
    },

    prepareEncounters(data) {
      this.patientDetails = data.entry;
      data.entry.forEach(entry => {
        if (entry.resource.resourceType == "Patient") {
          this.patient = entry.resource;
        }
        if (entry.resource.resourceType == "Encounter") {
          this.encounters.push({
            id: entry.resource.id,
            type: entry.resource.class.display,
            reason: entry.resource.reason[0].text
          });
        }
      });
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.getEncounters();
  }
};
</script>

<style lang="">
</style>
