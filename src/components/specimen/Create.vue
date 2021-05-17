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
              <h4 class="font-weight-bold">Add New Specimen</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <form>
                    <div class="form-group">
                      <label for>Status</label>
                      <select v-model="specimen.status" name id class="form-control">
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                        <option value="unsatisfactory">Unsatisfactory</option>
                        <option value="entered-in-error">Entered in error</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for>Note</label>
                      <input v-model="specimen.note" class="form-control" />
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
      specimen: {}
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    save() {
      var path = "/patients/" + this.patientId + "/specimen";
      this.specimen.note = [this.specimen.note];
      this.$http.post(path, this.specimen).then(response => {
        if (response.status == 200) {
          this.$router.push({
            name: "specimen",
            params: { patientId: this.patientId }
          });
        }
      });
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.scrollToTop();
  }
};
</script>
