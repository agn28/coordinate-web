<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <TopNavBar heading="Unassigned Patients"></TopNavBar>
      <div class="row">
        <div class="col-lg-12">
          <div class="patient-content">
            <div class="title">
              Patients
              <b-badge variant="primary">{{ patients.length }}</b-badge>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="patient-search">
            <div class="search">
              <div class="input-group md-form form-sm form-1 pl-0">
                <input
                  class="form-control my-0 py-1 border-right-0"
                  type="text"
                  placeholder="Patient Name, ID, NID"
                  aria-label="Search"
                  v-model="search"
                  @keyup.enter="getPatients('', 'last_item')"
                />
                <div class="input-group-prepend">
                  <a
                    href="javascript:void(0)"
                    @click="getPatients('', 'last_item')"
                    class="input-group-text lighten-3 text-decoration-none"
                    id="btn-search"
                  >
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </a>
                </div>
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
                    <th scope="col">NID</th>
                    <th scope="col">Union</th>
                    <th scope="col">Upazila</th>
                    <th scope="col">District</th>
                    <th scope="col">Suggested Assignee</th>
                    <th scope="col">Center</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="pointer"
                    v-for="(patient, index) in displayedPatients"
                    :key="index"
                  >
                    <template>
                      <td>
                        {{
                          patient.body.first_name + " " + patient.body.last_name
                        }}
                      </td> 
                      <td>{{ patient.body.nid }}</td>
                      <td>{{ patient.body.address.union }}</td>
                      <td>{{ patient.body.address.upazila }}</td>
                      <td>
                        {{ patient.body.address.district }}
                      </td>
                      <td>
                        <!-- <div v-if="!hasAssignee(patient)" class="badge badge-danger">Not Assigned</div> -->
                        <div v-for="(selected_user, index) in patient.selected_users" :key="index">{{ selected_user.name }}</div>
                      </td>
                      <td>{{ patient.body.center.name }}</td>

                      <td>
                        <div>
                          <button
                            @click.prevent="assignUser(patient.selected_users, patient)"
                            class="btn btn-success btn-sm"
                          >
                            Confirm
                          </button>
                        </div>
                        <div>
                          <button
                            @click="openAssigneeModal(patient)"
                            class="btn btn-info btn-sm"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
              <p v-if="this.filteredList.length == 0" class="text-center mt-5">
                No patients found
              </p>
            </div>
            <!-- <nav
              aria-label="Page navigation pull-right"
              v-if="this.filteredList.length"
            >
              <ul class="pagination my-3">
                <li class="page-item">
                  <button
                    type="button"
                    class="page-link"
                    @click="nextPrevPage('prev')"
                    :disabled="disablePrevButton"
                  >
                    Previous
                  </button>
                </li>
                <li class="page-item">
                  <button
                    type="button"
                    @click="nextPrevPage('next')"
                    class="page-link"
                    :disabled="disableNextButton"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav> -->
            <nav aria-label="Page navigation">
              <ul class="pagination my-3">
                <li class="page-item">
                  <button
                    type="button"
                    class="page-link"
                    v-if="paginationOptions.currentPage != 1" @click="paginationOptions.currentPage--"
                    :disabled="disablePrevButton"
                  >
                    Prev
                  </button>
                </li>
                <li class="page-item">
                  <button
                    type="button"
                    @click="paginationOptions.currentPage++" v-if="paginationOptions.currentPage < paginationOptions.pages.length" 
                    class="page-link"
                    :disabled="disableNextButton"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <b-modal id="modal-assign-user" class="modal-header">
        <template v-slot:modal-header>
          <span class="title">Assign Task To:</span>
        </template>
        <div class="form-group">
          <label for="users">Select a user</label>
          <multiselect
            v-model="selectedPatient.selected_users"
            :options="users"
            label="name"
            track-by="uid"
            :multiple="true"
            :allow-empty="false"
            :searchable="true"
            select-label=""
            deselect-label=""
          ></multiselect>
          <!-- <select
            v-model="selectedPatient.selected_user"
            name="users"
            id="users"
            class="form-control"
          >
            <option v-for="(user, index) in users" :key="index" :value="user">{{
              user.name
            }}</option>
          </select> -->
        </div>

        <template v-slot:modal-footer>
          <div class="w-100">
            <b-button
              @click.prevent="
                assignUser(selectedPatient.selected_users, selectedPatient)
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
              @click="closeAssigneeModal()"
              >Cancel</b-button
            >
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import TopNavBar from "../../TopNavBar";
import Multiselect from 'vue-multiselect';

export default {
  name: "UnassignedPatientList",
  components: { TopNavBar, Multiselect },
  data() {
    return {
      patients: [],
      allPatients: [],
      users: [],
      search: "",
      assignees: [],
      selectedAssignee: "",
      carePlans: [],
      selectedPatient: {},
      lastItemId: "",
      disablePrevButton: false,
      disableNextButton: false,
      paginationOptions: {
        currentPage: 1,
        perPage: 20,
        // totalItems: 500,
        pages: []
      },
    };
  },
  watch: {
    patients () {
        this.setPages();
    }
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
    displayedPatients () {
        return this.paginate(this.patients);
    }
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(
        this.patients.length / this.paginationOptions.perPage
      );
      for (let index = 1; index <= numberOfPages; index++) {
        this.paginationOptions.pages.push(index);
      }
    },
    paginate (patients) {
        let page = this.paginationOptions.currentPage;
        let perPage = this.paginationOptions.perPage;
        let from = (page * perPage) - perPage;
        let to = (page * perPage);
        return  patients.slice(from, to);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    filterByPractioner(assignee) {
      if (assignee == "none") {
        (this.selectedAssignee = ""), (this.patients = this.allPatients);
        return;
      }
      this.selectedAssignee = assignee;
      this.patients = this.patients.filter((patient) => {
        if (
          this.hasAssignee(patient) &&
          patient.body.next_assignment.meta.assigned_to == assignee.uid
        ) {
          return patient;
        }
      });
    },
    nextPrevPage(type) {
      let dataLength = this.patients.length;

      if (type == "next") {
        let lastItemId = "";
        if (dataLength > 0) {
          lastItemId = this.patients[dataLength - 1].id;
        }
        this.getPatients(lastItemId, "last_item");
      }

      if (type == "prev") {
        let firstItemId = dataLength > 0 ? this.patients[0].id : "";
        this.getPatients(firstItemId, "first_item");
      }
    },
    openAssigneeModal(patient) {
      this.selectedPatient = patient;
      this.$bvModal.show("modal-assign-user");
    },
    closeAssigneeModal() {
      this.selectedPatient = {};
      this.$bvModal.hide("modal-assign-user");
    },
    assignUser(users, patient) {
      console.log('selected', users);
      // return;
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
          // return;
          let loader = this.$loading.show();
          this.$http
            .post("care-plans/assign-user", {
              patient_id: patient.id,
              users: users,
            })
            .then(response => {
              loader.hide();
              if (response.status == 201) {
                if (this.patients.indexOf(patient) > -1) {
                  this.patients.splice(this.patients.indexOf(patient), 1);
                }
                // careplan.meta.assigned_to = user.uid;
                this.selectedUser = {};
                this.$bvModal.hide("modal-assign-user");
                this.$forceUpdate();
                this.$toast.open({ message: 'Patient assigned', type: 'success'})
                return;
              }
              
              this.$toast.open({ message: 'Failed to assign patient', type: 'error'});
            })
            .catch(error => {
                console.log('error: ', error)
                loader.hide();
            });
        }
      });
      // console.log("user ", user.uid);
      // console.log("patient", patient.id);
      // let loader = this.$loading.show();
      // this.$http
      //   .post("care-plans/assign-user", {
      //     patient_id: patient.id,
      //     user_id: user.uid,
      //   })
      //   .then(
      //     (response) => {
      //       loader.hide();
      //       console.log(response);
      //       if (this.patients.indexOf(patient) > -1) {
      //         this.patients.splice(this.patients.indexOf(patient), 1);
      //       }
      //       // careplan.meta.assigned_to = user.uid;
      //       this.selectedUser = {};
      //       this.$bvModal.hide("modal-assign-user");
      //       this.$forceUpdate();
      //     },
      //     (error) => {
      //       loader.hide();
      //     }
      //   );
    },
    hasAssignee(patient) {
      return patient.body.assignees.length > 0;
    },
    getAssignees() {
      if (this.users.length > 0) {
        this.patients.forEach((patient) => {
          // if (this.hasAssignee(patient)) {
          let user = this.users.find(
            (user) => user.uid == patient.body.next_assignment.meta.assigned_to
          );
          if (user && this.assignees.indexOf(user) == -1) {
            this.assignees.push(user);
          }
          // }
        });
      }
    },
    getNextVisitDate(patient) {
      let date = "";
      if (typeof patient.body.next_assignment != "undefined") {
        date = moment(
          patient.body.next_assignment.body.activityDuration.start
        ).format("DD MMM YYYY");
      }
      return date;
    },
    getCreatedDate(patient) {
      let date = "";
      if (typeof patient.taskCreatedDate != "undefined") {
        date = moment(patient.taskCreatedDate).format("DD MMM YYYY");
      }
      return date;
    },
    getAssignee(patient) {
      let users = "";
      patient.body.assignees.forEach((assignee) => {
        let user = this.users.find((user) => user.uid == assignee);
        if (user) {
          if (users == "") {
            users = user.name;
          } else {
            users = users + ", " + user.name;
          }
        }
      });

      return users;
    },

    async getUsers() {
      let loader = this.$loading.show();
      await this.$http.get("/users?role=chw,chcp").then(
        (response) => {
          if (response.status == 200) {
            this.users = response.data;
            // this.getAssignees()
          }
          loader.hide();
        },
        (error) => {
          loader.hide();
        }
      );
    },
    async getPatients(lastItemId = "", queryItemkey = "last_item") {
      let loader = this.$loading.show();
      let searchKey = "";
      this.disablePrevButton = false;
      this.disableNextButton = false;

      if (this.search) {
        if (isNaN(this.search)) {
          searchKey = "&name=" + this.search;
        } else {
          searchKey = "&nid=" + this.search;
        }
      }
      await this.$http
        .get(
          "/patients?per_page=" +
            this.paginationOptions.perPage +
            "&" +
            queryItemkey +
            "=" +
            lastItemId +
            searchKey
        )
        .then(
          (response) => {
            console.log(response);
            if (response.status == 200) {
              loader.hide();
              this.patients = response.data.data;
              this.filterPatients();
              this.allPatients = this.patients;
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

    filterPatients() {
      this.patients = this.patients.filter((patient) => {
        if (this.carePlans) {
          let hasCarePlan = this.carePlans.find(
            (plan) =>
              plan.body.patient_id == patient.id &&
              (!("assigned_to" in plan.meta) || plan.meta.assigned_to == "")
          );
          if (hasCarePlan) {
            this.getNearestAssignee(patient);
            patient.taskCreatedDate = hasCarePlan.meta.created_at;
            return patient;
          }
        }
      });
      this.patients = this.patients.map((patient) => {
        patient.selected_users = this.getNearestAssignee(patient);
        return patient;
      });
    },
    getNearestAssignee(patient) {
      let assignee = [];
      if (this.users.length > 0) {
        let chw = this.users.find((user) => {
          if (user.address) {
            if (user.role == 'chw' && typeof user.address.union != 'undefined' &&
              typeof patient.body.address.union != 'undefined' &&
              user.address.union == patient.body.address.union
            ) {
              return user;
              // assignee.push(user);
              // return chw;
            } 
            // else if (user.address.district == patient.body.address.district) {
            //   chw = user;
            // }
          }
        });
        if(typeof chw != 'undefined') {assignee.push(chw)};
        let chcp = this.users.find((user) => {
          if (user.address) {
            if (user.role == 'chcp' && typeof user.address.union != 'undefined' &&
              typeof patient.body.address.union != 'undefined' &&
              user.address.union == patient.body.address.union
            ) {
              return user;
            } 
          }
        });
        if(typeof chcp != 'undefined') {assignee.push(chcp)};
      }
      return assignee;
    },
    async getCarePlans() {
      let loader = this.$loading.show();
      await this.$http.get("/care-plans").then(
        (response) => {
          if (response.status == 200) {
            this.carePlans = response.data.data;
          }
          loader.hide();
        },
        (error) => {
          loader.hide();
        }
      );
    },
    async initialData() {
      await this.getCarePlans();
      await this.getUsers();
      if (this.$route.query.search && this.$route.query.search != undefined) {
        this.search = this.$route.query.search;
      }
      await this.getPatients();
    },
  },
  mounted() {
    // this.getCarePlans();
    // this.getUsers();
    this.initialData();
    this.scrollToTop();
  },
};
</script>

<style lang=""></style>
