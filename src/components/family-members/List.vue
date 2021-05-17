<template>
  <div class="content">
    <div class="animated fadeIn">
      <div class="card mt-4">
        <div class="card-header py-2">
          <div class="row">
            <div class="col pt-1">
              <a href @click.prevent="$router.go(-1)">
                <i class="fa fa-arrow-left float-left mr-4 text-secondary"></i>
              </a>
              <h4 class="font-weight-bold">List of Family Members</h4>
            </div>
            <div class="col text-right">
              <router-link
                :to="{name: 'familyMemberCreate'}"
                tag="a"
                class="btn btn-primary btn-sm"
              >Add Family Member</router-link>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Condition</th>
                <th>Gender</th>
                <th>Relationship</th>
                <th>Statue</th>
                <th>Patient</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(fm, index) in family_members" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td class="text-capitalize">{{ fm.condition.join(', ') }}</td>
                <td class="text-capitalize">{{ fm.gender }}</td>
                <td class="text-capitalize">{{ fm.relationship}}</td>
                <td class="text-capitalize">{{ fm.status }}</td>
                <td>{{ fm.patient }}</td>
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
      family_members: []
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getFamilyMembers() {
      this.$http
        .get("/patients/" + this.patientId + "/family_member_histories")
        .then(response => {
          this.prepareFamilyMembers(response.data);
        });
    },

    prepareFamilyMembers(data) {
      data.entry.forEach(entry => {
        if (entry.resource.resourceType == "FamilyMemberHistory") {
          this.family_members.push({
            id: entry.resource.id,
            condition: entry.resource.condition.map(
              cd => cd.code.coding[0].display
            ),
            gender: entry.resource.gender,
            patient: entry.resource.patient.reference,
            relationship: entry.resource.relationship.coding[0].display,
            status: entry.resource.status
          });
        }
      });
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.getFamilyMembers();
    this.scrollToTop();
  }
};
</script>

<style lang="">
</style>
