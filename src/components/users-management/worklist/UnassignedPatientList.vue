<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <TopNavBar heading="Unassigned Patients"></TopNavBar>
      <div class="row">
        <div class="col-lg-12">
          <div class="patient-content">
            <div class="title">Patients</div>
          </div>
        </div>
      </div>

      <!-- <div class="row">
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
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span v-if="selectedAssignee == ''">Filter By Practitioner</span>
                    <span v-else> {{ selectedAssignee.name }} </span>
                  </button>
                  <div class="dropdown-menu">
                    <button @click="filterByPractioner('none')" class="dropdown-item" href="#">None</button>
                    <button @click="filterByPractioner(assignee)" v-for="(assignee, index) in assignees" :key="index" class="dropdown-item" href="#">{{ assignee.name }}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <div class="row">
        <div class="col-lg-12">
          <div class="patient-list">
            <div class="table-responsive">
              <table class="table" v-if="patients.length > 0">
                <thead>
                  <tr>
                    <th scope="col">Patient Name</th>
                    <th scope="col">Upazila</th>
                    <th scope="col">District</th>
                    <th scope="col">Next Visit Date</th>
                    <th scope="col">Suggested CHW</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="pointer"
                    v-for="(patient, index) in filteredList"
                    :key="index">
                    <template>
                      <td>{{ patient.body.first_name + ' ' + patient.body.last_name}}</td>
                      <td>{{ patient.body.address.upazila }}</td>
                      <td>
                        {{ patient.body.address.district }}
                      </td>
                      <td>{{ getNextVisitDate(patient) }}</td>
                      <td>
                        <!-- <div v-if="!hasAssignee(patient)" class="badge badge-danger">Not Assigned</div> -->
                        <div>{{ patient.selected_user.name }}</div>
                      </td>
                      <td>
                        <div>
                          <button @click="assignUser(patient.selected_user, patient)" class="btn btn-success btn-sm">Confirm</button>
                        </div>
                        <div>
                          <button @click="openAssigneeModal(patient)" class="btn btn-info btn-sm">Edit</button>   
                        </div>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
              <p v-if="this.filteredList.length == 0" class="text-center mt-5">No patients found</p>
            </div>
              <nav aria-label="Page navigation pull-right" v-if="this.filteredList.length">
                <ul class="pagination my-3">
                    <li class="page-item">
                    <button type="button" class="page-link"  @click="nextPrevPage('prev')" :disabled="disablePrevButton"> Previous </button>
                    </li>
                    <li class="page-item">
                    <button type="button" @click="nextPrevPage('next')"  class="page-link" :disabled="disableNextButton"> Next </button>
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
        <select v-model="selectedPatient.selected_user" name="users" id="users" class="form-control">
          <option v-for="(user, index) in users" :key="index" :value="user">{{ user.name }}</option>
        </select>
      </div>

      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            @click="assignUser(selectedPatient.selected_user, selectedPatient)"
            variant="link"
            size="md"
            class="float-right font-weight-bold p-0 pl-4 pr-1"
          >Save</b-button>

          <b-button
            variant="link"
            size="md"
            class="float-right font-weight-bold p-0"
            @click="closeAssigneeModal()"
          >Cancel</b-button>
        </div>
      </template>
    </b-modal>
    </div>
  </div>

</template>

<script>
import moment from 'moment';
import TopNavBar from '../../TopNavBar';

export default {
  name: "UnassignedPatientList",
  components: { TopNavBar },
  data() {
    return {
      patients: [],
      allPatients: [],
      users: [],
      search: "",
      assignees: [],
      selectedAssignee: '',
      carePlans: [],
      selectedPatient: {},
      lastItemId: '',
      disablePrevButton: false,
      disableNextButton: false,
      paginationOptions: {
          currentPage: 1,
          perPage: 30,
      },
    };
  },
  computed: {
    filteredList() {
      return this.patients.filter(patient => {
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
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    filterByPractioner(assignee) {
      if (assignee == 'none') {
        this.selectedAssignee = '',
        this.patients = this.allPatients;
        return;
      }
      this.selectedAssignee = assignee;
      this.patients = this.patients.filter( patient => {
        if (this.hasAssignee(patient) && patient.body.next_assignment.meta.assigned_to == assignee.uid) {
          return patient;
        }
      });
    },
    nextPrevPage(type) {
        let dataLength = this.patients.length;

        if (type == 'next') {
            let lastItemId = '';
            if ( dataLength > 0) {
              lastItemId = this.patients[dataLength - 1].id;
            }
            this.getPatients(lastItemId, 'last_item');
        }

        if (type == 'prev') {
            let firstItemId = dataLength > 0 ? this.patients[0].id : '';
            this.getPatients(firstItemId, 'first_item');
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
    assignUser(user, patient) {
      console.log('user ',user.uid);
      console.log('patient', patient.id);
      let loader = this.$loading.show();
      this.$http
        .post("care-plans/assign-user", {
          patient_id: patient.id,
          user_id: user.uid
        })
        .then(
          response => {
            loader.hide();
            console.log(response);
            if(this.patients.indexOf(patient) > -1) {
              this.patients.splice(this.patients.indexOf(patient), 1);
            }
            // careplan.meta.assigned_to = user.uid;
            this.selectedUser = {};
            this.$bvModal.hide("modal-assign-user");
            this.$forceUpdate();
          },
          error => {
            loader.hide();
          }
        );
    },
    hasAssignee(patient) {
      return patient.body.assignees.length > 0;
    },
    getAssignees() {
        if (this.users.length > 0) {
          this.patients.forEach( patient => {
            // if (this.hasAssignee(patient)) {
                let user = this.users.find( user => user.uid == patient.body.next_assignment.meta.assigned_to)
                if (user && this.assignees.indexOf(user) == -1) {
                  this.assignees.push(user);
                } 
            // }
        });
        }
    },
    getNextVisitDate(patient) {
      let date = '';
      if (typeof patient.body.next_assignment != 'undefined') {
        date = moment(patient.body.next_assignment.body.activityDuration.start).format("DD MMM YYYY")
      }
      return date;
    },
    getAssignee(patient) {
      let users = '';
      patient.body.assignees.forEach(assignee => {
        let user = this.users.find(user => user.uid == assignee)
        if (user) {
          if (users == '') {
            users = user.name;
          } else {
            users = users + ', ' + user.name;
          }
        }
      });
      
      return users;
    },

    async getUsers() {
      let loader = this.$loading.show();
      await this.$http.get("/users?role=chw").then(
        response => {
          if (response.status == 200) {
            this.users = response.data;
            // this.getAssignees()
          }
          loader.hide();
        },
        error => {
          loader.hide();
        }
      );
    },
    async getPatients(lastItemId = '', queryItemkey = 'last_item') {
        let loader = this.$loading.show();
        await this.$http.get("/patients?per_page=" + this.paginationOptions.perPage + '&' + queryItemkey + '=' + lastItemId).then(response => {
            console.log(response)
            if (response.status == 200) {
                loader.hide()
                this.patients = response.data.data;
                this.filterPatients();
                this.allPatients = this.patients;
            }
        },
        error => {
            loader.hide();
        });
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
    },

    filterPatients() {
        this.patients = this.patients.filter(patient => {
          if (this.carePlans) {
            let hasCarePlan = this.carePlans.find(plan =>  plan.body.patient_id == patient.id && (!("assigned_to" in plan.meta) || plan.meta.assigned_to == ""));
            if (hasCarePlan){
              this.getNearestChw(patient);
              return patient;
            }
          }
        });
        this.patients = this.patients.map(patient => {
          patient.selected_user = this.getNearestChw(patient);
          return patient
        });
      },
      getNearestChw(patient) {
        let chw = {}
        if (this.users.length > 0) {
          let user = this.users.find( user => {
            if(user.address) {
              if(user.address.upazila == patient.body.address.upazila && user.address.district == patient.body.address.district) {
                chw = user;
                return chw;
              } else if(user.address.district == patient.body.address.district) {
                chw = user;
              }
            }
          })
        }
        return chw;
      },
      async getCarePlans() {
        let loader = this.$loading.show();
        await this.$http.get("/care-plans").then(
          response => {
            if (response.status == 200) {
              this.carePlans = response.data.data;
            }
            loader.hide();
          },
          error => {
            loader.hide();
          }
        );
      },
      async initialData() {
        await this.getCarePlans();
        await this.getUsers();
        await this.getPatients();
      }
  },
  mounted() {
    // this.getCarePlans();
    // this.getUsers();
    this.initialData();
    this.scrollToTop();
  }
};
</script>

<style lang="">
</style>
