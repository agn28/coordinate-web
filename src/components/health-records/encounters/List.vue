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
              <h4 class="font-weight-bold">List of Encounterss</h4>
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
                    :to="{name: 'assessments', params:{ participantId: participantId, encounterId: enc.id}}"
                    tag="a"
                    class="btn btn-warning btn-sm mr-2"
                  >Assessment</router-link>
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
  components: {  },
  data() {
    return {
      encounters: [],
      participantId: ''
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getEncounters() {
      this.$http
        .get("/patients/" + this.participantId + "/assessments")
        .then(response => {
          this.prepareEncounters(response.data);
          this.isLoading = false;
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
    console.log('hello')
    this.participantId = this.$route.params.participantId;
    this.getEncounters();
    this.scrollToTop();
  }
};
</script>

<style lang="">
</style>
