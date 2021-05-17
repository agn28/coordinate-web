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
              <h4 class="font-weight-bold">List of Conditions</h4>
            </div>
            <div class="col text-right">
              <router-link
                :to="{name: 'conditionCreate', params:{patientId: patientId, encounterId: encounterId}}"
                tag="a"
                class="btn btn-primary btn-sm"
              >Add Condition</router-link>
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
                <th scope="col">Evidence</th>
                <th scope="col">Severity</th>
                <th scope="col">Subject</th>
                <th scope="col">Context</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cnd, index) in conditions" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td class="text-capitalize">{{ cnd.clinicalStatus }}</td>
                <td class="text-capitalize">{{ cnd.verificationStatus }}</td>
                <td class="text-capitalize">{{ cnd.category.join(', ') }}</td>
                <td class="text-capitalize">{{ cnd.code.join(', ') }}</td>
                <td class="text-capitalize">{{ cnd.evidence.join(', ') }}</td>
                <td class="text-capitalize">{{ cnd.severity }}</td>
                <td>{{ cnd.subject }}</td>
                <td>{{ cnd.context }}</td>
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
      patientId: "",
      encounterId: "",
      conditions: []
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getConditions() {
      this.$http
        .get(
          "/patients/" +
            this.patientId +
            "/encounters/" +
            this.encounterId +
            "/conditions"
        )
        .then(response => {
          this.prepareConditions(response.data);
        });
    },

    prepareConditions(data) {
      data.entry.forEach(entry => {
        if (entry.resource.resourceType == "Condition") {
          this.conditions.push({
            id: entry.resource.id,
            code: entry.resource.code.coding.map(cd => cd.display),
            category: entry.resource.category.map(cat => cat.coding[0].display),
            evidence: entry.resource.evidence.map(
              ev => ev.code[0].coding[0].display
            ),
            severity: entry.resource.severity.coding[0].display,
            subject: entry.resource.subject.reference,
            context: entry.resource.context.reference,
            clinicalStatus: entry.resource.clinicalStatus,
            verificationStatus: entry.resource.verificationStatus
          });
        }
      });
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.encounterId = this.$route.params.encounterId;
    this.getConditions();
    this.scrollToTop();
  }
};
</script>

<style lang="">
</style>
