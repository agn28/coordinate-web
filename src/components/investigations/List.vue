<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <TopNavBar heading="Investigations"></TopNavBar>

      <div class="row">
        <div class="col-lg-12">
          <div class="patient-content">
            <div class="title">Investigation List</div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="patient-list">
            <div class="table-responsive">
              <table class="table" v-if="investigations.length > 0">
                <thead>
                  <tr>
                    <th scope="col">Patient Name</th>
                    <th scope="col">Investigation</th>
                    <th scope="col">Created On</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Status</th>
                    <th scope="col">Last Updated</th>
                    <th scope="col">Updated by</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="pointer bg-white tr-border-bttom-grey"
                    v-for="(investigation, index) in investigations"
                    :key="index"
                  >
                    <template>
                      <td>{{ getPatientName(investigation.body.patient_id) }}</td>
                      <td>{{ investigation.body.title }}</td>
                      <td>{{ getFormatedDate(investigation.meta.created_at._seconds) }}</td>
                      <td>{{ getUserName(investigation.meta.collected_by) }}</td>
                      <td class="text-capitalize">{{ investigation.status }}</td>
                      <td>{{ investigation.meta ? (investigation.meta.updated_at ? getFormatedDate(investigation.meta.updated_at._seconds) : 'N/A') : 'N/A' }}</td>
                      <td>{{ investigation.meta ? (investigation.meta.updated_by ? getUserName(investigation.meta.updated_by) : 'N/A') : 'N/A' }}</td>
                      <td>
                          <div>
                              <button @click="openEditModal(investigation)" class="btn btn-info btn-sm">Edit</button>
                          </div>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>

            <nav aria-label="Page navigation">
              <ul class="pagination my-3">
                <li class="page-item">
                  <!-- <button type="button" class="page-link"  @click="nextPrevPage('prev')" :disabled="disablePrevButton"> Previous </button> -->
                </li>
                <li class="page-item">
                  <!-- <button type="button" @click="nextPrevPage('next')"  class="page-link" :disabled="disableNextButton"> Next </button> -->
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <b-modal id="modal-edit-investigation" class="modal-header">
        <template v-slot:modal-header>
          <span class="title">Update investigation</span>
        </template>
        <div class="form-group">
          <label for="users">Update status</label>
          <select
            v-model="selectedInvestigation.status"
            name="status"
            id="status"
            class="form-control"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <template v-slot:modal-footer>
          <div class="w-100">
            <b-button
              @click.prevent="
                updateInvestigation(selectedInvestigation, selectedInvestigation.status)
              "
              variant="link"
              size="md"
              class="float-right font-weight-bold p-0 pl-4 pr-1"
              >Save</b-button
            >

            <b-button
              variant="link"
              size="md"
              class="float-right font-weight-bold p-0"
              @click="closeEditModal()"
              >Cancel</b-button
            >
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import moment from "moment";
import { VuejsDatatableFactory } from "vuejs-datatable";
import TopNavBar from '../TopNavBar.vue';
Vue.use(VuejsDatatableFactory);

export default {
  name: "investigations",
  components: {TopNavBar},
  data() {
    return {
      users:[],
      patients: [],
      search: "",
      paginationOptions: {
        currentPage: 1,
        perPage: 20
      },
      lastItemId: '',
      disablePrevButton: false,
      disableNextButton: false,
      carePlans: [],
      investigations: [],
      selectedInvestigation: {}
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getUserName(id) {
      let matchedUser = this.users.find(usr => usr.uid == id);
      return matchedUser ? matchedUser.name : '';
    },
    getUsers() {
        let loader = this.$loading.show();
        this.$http.get("/users").then(response => {
            if (response.status == 200) {
                loader.hide()
                this.users = response.data;
            }
        },
        error => {
            loader.hide();
        });
    },
    getPatientName(id) {
      let matchedpatient = this.patients.find(patient => patient.id == id);
      return matchedpatient ? matchedpatient.body.first_name+' '+matchedpatient.body.last_name : '';
    },
    getPatients() {
      let loader = this.$loading.show();
      this.$http.get("/patients/all-mongo").then(
        response => {
          if (response.status == 200) {
            this.patients = response.data.data;
            console.log(this.patients, 'patients list')
            loader.hide();
          }
        },
        error => {
          loader.hide();
        }
      );
    },
    getFormatedDate(data) {
      let date = moment.unix(data).format("DD MMM YYYY");
      return date;
    },
    openEditModal(investigation) {
      this.selectedInvestigation = investigation;
      console.log('this.selectedInvestigation', this.selectedInvestigation);
      this.$bvModal.show("modal-edit-investigation");
    },
    closeEditModal() {
      this.selectedInvestigation = {};
      this.$bvModal.hide("modal-edit-investigation");
    },
    getCarePlans() {
      let loader = this.$loading.show();
      this.$http.get("/care-plans/all-mongo").then(
        response => {
          if (response.status == 200) {
            this.carePlans = response.data.data;
            this.carePlans.forEach( plan => {
              if (plan.body.category == 'investigation') {
                plan.status = plan.meta.status;
                this.investigations.push(plan);
              }
            });
          }
          loader.hide();
        },
        error => {
          loader.hide();
        }
      );
    },
    updateInvestigation(investigation, status) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm it!"
      }).then(result => {
        if (result.value) {
          let loader = this.$loading.show();
          this.$http.put("/care-plans/mongo/" + investigation.id, {
            status: status,
            updated_by: this.user.uid
          })
          .then(response => {
            loader.hide();
            if (response.status == 200) {
              // if (this.investigations.indexOf(investigation) > -1) {
              //   this.investigations.splice(this.investigations.indexOf(investigation), 1);
              // }
              this.selectedInvestigation = {};
              this.$bvModal.hide("modal-edit-investigation");
              this.$forceUpdate();
              this.$toast.open({ message: 'Investigation updated', type: 'success'})
              return;
            }
            
            this.$toast.open({ message: 'Failed to update investigation', type: 'error'});
          })
          .catch(error => {
              console.log('error: ', error)
              loader.hide();
          });
        }
      });
    },
  },
  mounted() {
    this.scrollToTop();
    this.getPatients();
    this.getUsers();
    this.getCarePlans();
  },
};
</script>

<style lang="">
</style>
