<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
          <div class>
            <h4>Patients</h4>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="patient-content">
            <div class="title">Patients</div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="patient-search">
            <div class="search">
              <div class="input-group md-form form-sm form-1 pl-0">
                <div class="input-group-prepend">
                  <span class="input-group-text lighten-3" id="basic-text1">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </span>
                </div>
                <input
                  class="form-control my-0 py-1 border-left-0"
                  type="text"
                  placeholder="Patient Name, NID"
                  aria-label="Search"
                  v-model="search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="patient-list">
            <div class="table-responsive">
              <table class="table" v-if="patients.length > 0">
                <thead>
                  <tr>
                    <th scope="col">Patient Name</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">NID</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="pointer"
                    v-for="(patient, index) in filteredList"
                    :key="index"
                    @click="$router.push({ name: 'worklist', params: { patientId: patient.id } })"
                  >
                    <template>
                      <td>{{ patient.body.first_name + ' ' + patient.body.last_name}}</td>
                      <td>{{ patient.body.birth_date }}</td>
                      <td>
                        {{ patient.body.nid }}
                        <span class="pull-right">
                          <i class="fas fa-arrow-right"></i>
                        </span>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "worklistPatient",
  components: {},
  data() {
    return {
      patients: [],
      search: ''
    };
  },
  computed: {
    filteredList() {
      return this.patients.filter(patient => {
        console.log(patient)
        return (
          patient.body.first_name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          patient.body.last_name
            .toLowerCase()
            .includes(this.search.toLowerCase())
        );
      });
    }
  },
  methods: {
    getPatients() {
      let loader = this.$loading.show();
      this.$http.get("/patients").then(
        response => {
          if (response.status == 200) {
            this.patients = response.data.data;
            loader.hide();
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    getId(identifier, type) {
      if (!identifier) {
        return "";
      }
      let id = identifier.find(x => x.use === type);

      if (id) {
        return id.value;
      }
      return "";
    }
  },
  mounted() {
    this.getPatients();
  }
};
</script>

<style lang="">
</style>
