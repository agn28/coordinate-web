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
              <h4 class="font-weight-bold">List of Diagnostics</h4>
            </div>
            <div class="col text-right">
              <router-link
                :to="{name: 'diagnosticCreate', params:{patientId: patientId, encounterId: encounterId}}"
                tag="a"
                class="btn btn-primary btn-sm"
              >Add Diagnostic</router-link>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Code</th>
                <th scope="col">Conslusion</th>
                <th scope="col">Status</th>
                <th scope="col">Context</th>
                <th scope="col">Subject</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(dg, index) in diagnostics" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td class="text-capitalize">{{ dg.code.join(', ') }}</td>
                <td class="text-capitalize">{{ dg.conclusion }}</td>
                <td class="text-capitalize">{{ dg.status }}</td>
                <td>{{ dg.context }}</td>
                <td>{{ dg.subject }}</td>
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
      diagnostics: []
    };
  },
  methods: {
    getDiagnostics() {
      this.$http
        .get(
          "/patients/" +
            this.patientId +
            "/encounters/" +
            this.encounterId +
            "/diagnostic_reports"
        )
        .then(response => {
          console.log(response);
          this.prepareDiagnostics(response.data);
        });
    },

    prepareDiagnostics(data) {
      data.entry.forEach(entry => {
        if (entry.resource.resourceType == "DiagnosticReport") {
          this.diagnostics.push({
            id: entry.resource.id,
            code: entry.resource.code.coding.map(cd => cd.display),
            conclusion: entry.resource.conclusion,
            code: entry.resource.result.map(rs => rs.reference),
            status: entry.resource.status,
            subject: entry.resource.subject.reference,
            context: entry.resource.context.reference
          });
        }
      });

      console.log(this.diagnostics);
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.encounterId = this.$route.params.encounterId;
    this.getDiagnostics();
  }
};
</script>

<style lang="">
</style>
