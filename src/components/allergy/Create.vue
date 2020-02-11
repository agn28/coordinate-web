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
              <h4 class="font-weight-bold">Add New Allergy</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <form>
                    <div class="form-group">
                      <label for>Clinical Status</label>
                      <select v-model="allergy.clinicalStatus" name id class="form-control">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Verification Status</label>
                      <select v-model="allergy.verificationStatus" name id class="form-control">
                        <option value="unconfirmed">Unconfirmed</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="refuted">Refuted</option>
                        <option value="entered-in-error">Entered in error</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Category</label>
                      <multiselect
                        v-model="allergy.category"
                        :options="options"
                        label="value"
                        track-by="key"
                        :multiple="true"
                      ></multiselect>
                    </div>

                    <div class="form-group">
                      <label for>Criticality</label>
                      <select v-model="allergy.criticality" name id class="form-control">
                        <option value="low">Low</option>
                        <option value="high">High</option>
                        <option value="unable-to-access">Unable to access</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Allergy</label>
                      <select v-model="allergy.allergy" name id class="form-control">
                        <option value="penicillin">Penicillin</option>
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
      encounter: {},
      allergy: {},
      options: [
        { key: "food", value: "Food" },
        { key: "medication", value: "Medication" },
        { key: "environment", value: "Environment" },
        { key: "biologic", value: "Biologic" }
      ]
    };
  },
  methods: {
    save() {
      var path = "/patients/" + this.patientId + "/allergy_intolerances";

      this.allergy.category = this.allergy.category.map(c => c.key);
      this.$http.post(path, this.allergy).then(response => {
        if (response.status == 200) {
          this.$router.push({
            name: "allergy",
            params: { patientId: this.patientId }
          });
        }
      });
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
  }
};
</script>

<style lang="">
</style>
