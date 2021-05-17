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
              <h4 class="font-weight-bold">Add New Encounter</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <form>
                    <div class="form-group">
                      <label for>Type</label>
                      <select v-model="encounter.type" name id class="form-control">
                        <option value="imp">In Patient</option>
                        <option value="obsenc">Observations</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for>Reason</label>
                      <input v-model="encounter.reason" type="text" class="form-control" />
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
// @ is an alias to /src

export default {
  name: "patients",
  components: {},
  data() {
    return {
      patientId: "",
      encounter: {}
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    save() {
      var path = "/patients/" + this.patientId + "/encounters";
      this.$http.post(path, this.encounter).then(response => {
        if (response.status == 200) {
          this.$router.push(this.$route.query.redirect || path);
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

<style lang="">
</style>
