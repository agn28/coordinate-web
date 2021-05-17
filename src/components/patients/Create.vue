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
              <h4 class="font-weight-bold">Add New Participants</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <form>
                    <div class="form-group">
                      <label for>Gender</label>
                      <select v-model="patient.gender" name id class="form-control">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for>Date of Birth</label>
                      <input v-model="patient.date_of_birth" type="date" class="form-control" />
                    </div>

                    <div class="form-group">
                  <label for="">Country</label>
                  <input v-model="patient.country" type="text" class="form-control">
                    </div>

                    <div class="form-group">
                  <label for="">Participant ID</label>
                  <input v-model="patient.participant_id" type="text" class="form-control">
                    </div>

                    <div class="form-group">
                      <label for>Participant UUID</label>
                      <input v-model="patient.participant_uuid" type="text" class="form-control" />
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
      patient: {}
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    save() {
      this.$http.post("/patients", this.patient).then(response => {
        if (response.status == 200) {
          this.$router.push(this.$route.query.redirect || "/");
        }
      });
    }
  },
  mounted() {
    // this.getPatients();
    this.scrollToTop();
  }
};
</script>

<style lang="">
</style>
