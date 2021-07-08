<template>
  <div class="content">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-6">
          <div class="card mt-4">
            <div class="card-header py-3">
              <a href @click.prevent="$router.go(-1)">
                <i class="fa fa-arrow-left float-left mr-4 text-secondary"></i>
              </a>
              <h4 class="font-weight-bold">Add New Diagnostic Report</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <form>
                    <div class="form-group">
                      <label for>Status</label>
                      <select v-model="diagnostic.status" name id class="form-control">
                        <option value="registered">Registered</option>
                        <option value="partial">Partial</option>
                        <option value="preliminary">Preliminary</option>
                        <option value="final">Final</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Code</label>
                      <select v-model="diagnostic.code" name id class="form-control">
                        <option value="blood culture">Blood Culture</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Result</label>
                      <multiselect
                        v-model="diagnostic.result"
                        :options="observations"
                        label="id"
                        track-by="id"
                        :multiple="true"
                        select-label=""
                        deselect-label=""
                      ></multiselect>
                    </div>

                    <div class="form-group">
                      <label for>Conclusion</label>
                      <input
                        type="text"
                        v-model="diagnostic.conclusion"
                        name
                        id
                        class="form-control"
                      />
                    </div>

                    <!-- <div class="form-group">
                      <label for="">Issued</label>
                      <input type="date" v-model="diagnostic.issued" name="" id="" class="form-control">
                    </div>-->

                    <button @click.prevent="save()" class="btn btn-primary float-right">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "patients",
  components: {
    Multiselect
  },
  data() {
    return {
      patientId: "",
      encounter: {},
      diagnostic: {},
      observations: []
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    save() {
      var path =
        "/patients/" +
        this.patientId +
        "/encounters/" +
        this.encounterId +
        "/diagnostic_reports";

      this.diagnostic.result = this.diagnostic.result.map(c => c.id);

      this.$http.post(path, this.diagnostic).then(response => {
        if (response.status == 200) {
          this.$router.push({
            name: "diagnostics",
            params: { patientId: this.patientId, encounterId: this.encounterId }
          });
        }
      });
    },
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
        if (entry.resource.resourceType == "Observation") {
          this.observations.push({
            id: entry.resource.id,
            type: entry.resource.code.coding[0].display,
            assessment_date: entry.resource.effectiveDateTime,
            value: entry.resource.valueQuantity.value,
            unit: entry.resource.valueQuantity.unit,
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
    this.scrollToTop();
  }
};
</script>

<style lang="">
</style>
