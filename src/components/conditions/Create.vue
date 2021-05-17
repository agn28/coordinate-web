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
              <h4 class="font-weight-bold">Add New Condition</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <form>
                    <div class="form-group">
                      <label for>Clinical Status</label>
                      <select v-model="condition.clinicalStatus" name id class="form-control">
                        <option value="active">Active</option>
                        <option value="recurrence">Recurrence</option>
                        <option value="inactive">Inactive</option>
                        <option value="remission">Remission</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Verification Status</label>
                      <select v-model="condition.verificationStatus" name id class="form-control">
                        <option value="provisional">Provisional</option>
                        <option value="differential">Differential</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="refuted">Refuted</option>
                        <option value="entered-in-error">Entered in error</option>
                        <option value="unknown">Unknown</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Category</label>
                      <multiselect
                        v-model="condition.category"
                        :options="options"
                        label="value"
                        track-by="key"
                        :multiple="true"
                      ></multiselect>
                    </div>

                    <div class="form-group">
                      <label for>Severity</label>
                      <select v-model="condition.severity" name id class="form-control">
                        <option value="moderate">Moderate</option>
                        <option value="medium">Medium</option>
                        <option value="severe">Severe</option>
                        <option value="high">High</option>
                        <option value="so much">So Much</option>
                        <option value="mild">Mild</option>
                        <option value="low">low</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Condition</label>
                      <select v-model="condition.condition" name id class="form-control">
                        <option value="embolic stroke">Embolic Stroke</option>
                        <option value="stroke">Stroke</option>
                        <option value="myocardial infarction">Myocardial Infarction</option>
                        <option value="heartattack">Heart Attack</option>
                        <option value="heart valve disorder">Heart Valve Disorder</option>
                        <option value="heart valve">Heart Valve</option>
                        <option value="diabetes">Diabetes</option>
                        <option value="hypertension">Hypertension</option>
                        <option value="hypercholesterolaemia">Hypercholesterolaemia</option>
                        <option value="previous ami">Previous AMI</option>
                        <option value="Previous Stroke">Previous Stroke</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Evidence</label>
                      <select v-model="condition.evidence" name id class="form-control">
                        <option value="cardiac chest pain">Cardiac chest pain</option>
                        <option value="chest pain">Chest pain</option>
                      </select>
                    </div>

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
      encounterId: "",
      encounter: {},
      condition: {},
      options: [{ key: "diagnosis", value: "Diagnosis" }]
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
        "/conditions";

      this.condition.category = this.prepareCategory(this.condition.category);

      this.$http.post(path, this.condition).then(response => {
        if (response.status == 200) {
          this.$router.push(this.$route.query.redirect || path);
        }
      });
    },
    prepareCategory(categories) {
      return categories.map(c => c.key);
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.encounterId = this.$route.params.encounterId;
    this.scrollToTop();
  }
};
</script>

<style lang="">
</style>
