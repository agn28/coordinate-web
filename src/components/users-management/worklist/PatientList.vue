<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <TopNavBar heading="Patients"></TopNavBar>
      <div class="row">
        <div class="col-lg-12">
          <div class="patient-content">
            <div class="title">Patients
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
      </div>

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
                    <th scope="col">Assigned To</th>
                    <th scope="col">Task Created</th>
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
                      <td>{{ patient.body.address.upazila }}</td>
                      <td>
                        {{ patient.body.address.district }}
                      </td>
                      <td>{{ getNextVisitDate(patient) }}</td>
                      <td>
                        <div v-if="!hasAssignee(patient)" class="badge badge-danger">Not Assigned</div>
                        <div v-else>{{ getAssignee(patient) }}</div>
                      </td>
                      <td width="150px">{{ getCreatedDate(patient) }}</td>
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
import moment from 'moment';
import TopNavBar from '../../TopNavBar';

export default {
  name: "worklistPatient",
  components: { TopNavBar },
  data() {
    return {
      patients: [],
      allPatients: [],
      users: [],
      search: "",
      assignees: [],
      selectedAssignee: '',
      carePlans: []
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
        if (this.hasAssignee(patient) && patient.body.next_assignment.meta.assigned_to.includes(assignee.uid)) {
          return patient;
        }
      });
    },

    hasAssignee(patient) {
      return patient.body.assignees.length > 0;
    },
    getAssignees() {
        if (this.users.length > 0) {
          this.patients.forEach( patient => {
            if (this.hasAssignee(patient)) {
                let user = this.users.find( user => patient.body.next_assignment.meta.assigned_to.includes(user.uid))
                if (user && this.assignees.indexOf(user) == -1) {
                  this.assignees.push(user);
                } 
            }
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
    getCreatedDate(patient) {
      let date = '';
      if (typeof patient.taskCreatedDate != 'undefined') {
        date = moment(patient.taskCreatedDate).format("DD MMM YYYY")
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

    getUsers() {
      let loader = this.$loading.show();
      this.$http.get("/users?role=nurse,doctor,chw").then(
        response => {
          if (response.status == 200) {
            this.users = response.data;
            this.getAssignees()
          }
          loader.hide();
        },
        error => {
          loader.hide();
        }
      );
    },
    getPatients() {
      let loader = this.$loading.show();
      this.$http.get("/patients/all-mongo").then(
        response => {
          if (response.status == 200) {
            this.patients = response.data.data;
            console.log(this.patients, 'patients list')
            this.filterPatients();
            this.allPatients = this.patients;
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
    },

    filterPatients() {
        this.patients = this.patients.filter(patient => {
          if (this.carePlans) {
            let hasCarePlan = this.carePlans.find(plan => plan.body.patient_id == patient.id);
            if (hasCarePlan){
              patient.taskCreatedDate = hasCarePlan.meta.created_at;
              return patient;
            }
          }
        });
      },
      getCarePlans() {
        let loader = this.$loading.show();
        this.$http.get("/care-plans").then(
          response => {
            if (response.status == 200) {
              this.carePlans = response.data.data;
              this.getPatients();
            }
            loader.hide();
          },
          error => {
            loader.hide();
          }
        );
      },
  },
  mounted() {
    this.getUsers();
    this.getCarePlans();
    this.scrollToTop();
  }
};
</script>

<style lang="">
</style>
