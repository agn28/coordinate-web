<template>
  <div class="content">
    <div class="animated fadeIn">
      <div class="card mt-4">
        <div class="card-header py-2">
          <div class="row">
            <div class="col py-1">
              <a href @click.prevent="$router.go(-1)">
                <i class="fa fa-arrow-left float-left mr-4 text-secondary"></i>
              </a>
              <h4 class="font-weight-bold">List of Observations</h4>
            </div>
            <div class="col text-right">
              <router-link
                :to="{name: 'observationCreate', params:{patientId: patientId, encounterId: encounterId}}"
                tag="a"
                class="btn btn-primary btn-sm"
              >Add Observation</router-link>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Type</th>
                <th scope="col">Value</th>
                <th scope="col">Unit</th>
                <th scope="col">Assessment Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(obs, index) in observations" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ obs.type }}</td>
                <td>{{ obs.value }}</td>
                <td>{{ obs.unit }}</td>
                <td>{{ obs.assessment_date }}</td>
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
      patientId: "",
      encounterId: "",
      observations: [],
      encounter: {},
      patient: {}
    };
  },
  methods: {
    getObservations() {
      this.$http
        .get(
          "/patients/" +
            this.patientId +
            "/encounters/" +
            this.encounterId +
            "/observations"
        )
        .then(response => {
          this.prepareObservations(response.data);
        });
    },

    prepareObservations(data) {
      data.entry.forEach(entry => {
        if (entry.resource.resourceType == "Patient") {
          this.patient = entry.resource;
        }
        if (entry.resource.resourceType == "Encounter") {
          this.encounter = entry.resource;
        }
        if (entry.resource.resourceType == "Observation") {
          this.observations.push({
            id: entry.resource.id,
            type: entry.resource.code.coding[0].display,
            assessment_date: entry.resource.effectiveDateTime,
            value: entry.resource.valueQuantity ? entry.resource.valueQuantity.value : entry.resource.valueString,
            unit: entry.resource.valueQuantity ? entry.resource.valueQuantity.unit : null,
            detail: entry.resource
          });
        }
      });
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.encounterId = this.$route.params.encounterId;
    this.getObservations();
  }
};
</script>

<style lang="">
</style>
