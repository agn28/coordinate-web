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
              <h4 class="font-weight-bold">List of Specimen</h4>
            </div>
            <div class="col text-right">
              <router-link
                :to="{name: 'specimenCreate'}"
                tag="a"
                class="btn btn-primary btn-sm"
              >Add Specimen</router-link>
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
                <!-- <th scope="col">Action</th> -->
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Test</td>
                <td>Test</td>
                <!-- <td><router-link :to="{name: 'observations', params:{patientId: '123', encounterId: '4314'}}" tag="a" class="btn btn-warning btn-sm">Observations</router-link></td> -->
              </tr>
              <!-- <tr v-for="(enc, index) in encounters" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ enc.type }}</td>
              <td>{{ enc.reason }}</td>
              <td><router-link :to="{name: 'observations', params:{patientId: patientId, encounterId: enc.id}}" tag="a" class="btn btn-warning btn-sm">Observations</router-link></td>
              </tr>-->
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
      specimen: []
    };
  },
  methods: {
    getSpecimen() {
      this.$http
        .get("/patients/" + this.patientId + "/specimen")
        .then(response => {
          console.log(response.data);
          // this.prepareSpecimen(response.data)
        });
    },

    prepareSpecimen(data) {
      data.entry.forEach(entry => {
        if (entry.resource.resourceType == "FamilyMemberHistory") {
          this.specimen.push({
            id: entry.resource.id,
            condition: entry.resource.condition.map(
              cd => cd.code.coding[0].display
            ),
            gender: entry.resource.gender,
            patient: entry.resource.patient.reference,
            resourceType: entry.resource.resourceType,
            relationship: entry.resource.relationship.coding[0].display,
            status: entry.resource.status
          });
        }
      });
      console.log(this.specimen);
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.getSpecimen();
  }
};
</script>

<style lang="">
</style>
