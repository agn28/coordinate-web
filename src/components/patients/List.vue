<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i
            class="fa fa-arrow-left text-secondary back-icon"
            @click="$router.go(-1)"
          ></i>
          <div class="">
            <h4>Patients</h4>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="patient-content">
            <div class="title">Patients</div>
            <div class="right-side">
              <div class="dropdown mr-3">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Import
                </button>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a class="dropdown-item" href="#">Upload CSV File</a>
                  <a class="dropdown-item" href="#">Download CSV Template</a>
                </div>
              </div>
              <div
                class="register-patient"
                @click="$router.push({ name: 'patientRegistration' })"
              >
                <button class="btn">
                  <i class="fas fa-plus"></i>Register a New Patient
                </button>
              </div>
            </div>
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
                  placeholder="Patient Name, ID, NID"
                  aria-label="Search"
                  v-model="search"
                />
              </div>
            </div>

            <div class="thumbprint-button">
              <button class="btn" v-b-modal.modal-findThumbprint>
                <span><i class="fas fa-fingerprint"></i></span>Find using
                Thumbprint
              </button>
              <b-modal id="modal-findThumbprint" class="modal-coordinate">
                <div class="scan-thumbprint">
                  <div class="scan">
                    <i class="fas fa-fingerprint"></i>
                  </div>
                  <p>Ask patient to touch the fingerprint sensor</p>
                </div>

                <template v-slot:modal-footer>
                  <div class="w-100">
                    <b-button
                      variant="link"
                      size="md"
                      class="float-right font-weight-bold p-0"
                      @click="$bvModal.hide('modal-findThumbprint')"
                    >
                      Cancel
                    </b-button>
                  </div>
                </template>
              </b-modal>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="pending-checkbox">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="pending"
                name="example1"
              />
              <label class="custom-control-label" for="pending"
                >Pending Recommendations Only</label
              >
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
                    <th scope="col">
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id=""
                          name="example1"
                        />
                        <label class="custom-control-label" for=""></label>
                      </div>
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">NID</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Registration Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="pointer"
                    v-for="(patient, index) in filteredList"
                    :key="index"
                    @click="
                      $router.push({
                        name: 'patientOverview',
                        params: { patientId: patient.id },
                      })
                    "
                  >
                    <template>
                      <th scope="row">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id=""
                            name="example1"
                          />
                          <label class="custom-control-label" for=""></label>
                        </div>
                      </th>
                      <td>
                        {{
                          patient.body.first_name + " " + patient.body.last_name
                        }}
                      </td>

                      <!-- <td>P2342343</td> -->
                      <td>{{ patient.body.nid }}</td>
                      <td>{{ patient.body.age }}</td>
                      <td>{{ patient.body.gender.toUpperCase()
                        }}</td>
                      <td>{{ patient.body.registration_date }}
                        <span class="pull-right"
                          ><i class="fas fa-arrow-right"></i
                        ></span>
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
// @ is an alias to /src
import Vue from "vue";
import { VuejsDatatableFactory } from "vuejs-datatable";

Vue.use(VuejsDatatableFactory);

export default {
  name: "patients",
  components: {},
  data() {
    return {
      patients: [],
      search: "",
    };
  },
  computed: {
    filteredList() {
      return this.patients.filter((patient) => {
        return (
          patient.body.first_name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          patient.body.last_name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          patient.body.nid.toString().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    getPatients() {
      let loader = this.$loading.show();
      this.$http.get("/patients").then(
        (response) => {
          if (response.status == 200) {
            this.patients = response.data.data;
            loader.hide();
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },

    getId(identifier, type) {
      if (!identifier) {
        return "";
      }
      let id = identifier.find((x) => x.use === type);

      if (id) {
        return id.value;
      }
      return "";
    },
  },
  mounted() {
    this.getPatients();
  },
};
</script>

<style lang="">
</style>
