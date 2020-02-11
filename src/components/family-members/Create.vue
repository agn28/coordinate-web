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
              <h4 class="font-weight-bold">Add New Family Member</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <form>
                    <div class="form-group">
                      <label for>Status</label>
                      <select v-model="family_member.status" name id class="form-control">
                        <option value="partial">Partial</option>
                        <option value="completed">Completed</option>
                        <option value="entered-in-error">Entered in error</option>
                        <option value="health-unknown">Health Unknown</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Relationship</label>
                      <select v-model="family_member.relationship" name id class="form-control">
                        <option value="mother">Mother</option>
                        <option value="father">Father</option>
                        <option value="brother">Brother</option>
                        <option value="sister">Sister</option>
                        <option value="spouse">Spouse</option>
                        <option value="wife">Wife</option>
                        <option value="husband">Husband</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Gender</label>
                      <select v-model="family_member.gender" name id class="form-control">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="unknown">Unknown</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Condition</label>
                      <select v-model="family_member.condition" name id class="form-control">
                        <option value="embolic stroke">Embolic Stroke</option>
                        <option value="stroke">Stroke</option>
                        <option value="myocardial infarction">Myocardial Infarction</option>
                        <option value="heartattack">Heart Attack</option>
                        <option value="heart valve disorder">Heart Valve Disorder</option>
                        <option value="heart valve">Heart Valve</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Condition Age</label>
                      <input
                        type="number"
                        v-model="family_member.condition_age"
                        class="form-control"
                      />
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
      encounter: {},
      family_member: {}
    };
  },
  methods: {
    save() {
      var path = "/patients/" + this.patientId + "/family_member_histories";
      this.family_member.condition_age = parseFloat(
        this.family_member.condition_age
      );
      this.$http.post(path, this.family_member).then(response => {
        if (response.status == 200) {
          this.$router.push({
            name: "familyMembers",
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
