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
              <h4 class="font-weight-bold">List of Allergy</h4>
            </div>
            <div class="col text-right">
              <router-link
                :to="{name: 'allergyCreate'}"
                tag="a"
                class="btn btn-primary btn-sm"
              >Add Allergy</router-link>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Clinical Status</th>
                <th scope="col">Verification Status</th>
                <th scope="col">Category</th>
                <th scope="col">Code</th>
                <th scope="col">Criticality</th>
                <th scope="col">Patient</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(alg, index) in allergies" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td class="text-capitalize">{{ alg.clinicalStatus }}</td>
                <td class="text-capitalize">{{ alg.verificationStatus }}</td>
                <td class="text-capitalize">{{ alg.category.join(', ') }}</td>
                <td class="text-capitalize">{{ alg.code.join(', ') }}</td>
                <td class="text-capitalize">{{ alg.criticality }}</td>
                <td>{{ alg.patient }}</td>
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
      patients: [],
      allergies: []
    };
  },
  methods: {
    getAllergies() {
      this.$http
        .get("/patients/" + this.patientId + "/allergy_intolerances")
        .then(response => {
          console.log(response.data);
          this.prepareAllergies(response.data);
        });
    },

    prepareAllergies(data) {
      data.entry.forEach(entry => {
        if (entry.resource.resourceType == "AllergyIntolerance") {
          this.allergies.push({
            id: entry.resource.id,
            code: entry.resource.code.coding.map(cd => cd.display),
            category: entry.resource.category,
            criticality: entry.resource.criticality,
            patient: entry.resource.patient.reference,
            clinicalStatus: entry.resource.clinicalStatus,
            verificationStatus: entry.resource.verificationStatus
          });
        }
      });
      console.log(this.allergies);
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.getAllergies();
  }
};
</script>

<style lang="">
</style>
