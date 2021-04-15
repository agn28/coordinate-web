<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <!-- <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
          <div class>
            <h4>Worklists</h4>
          </div>
        </div>
      </div> -->
      <TopNavBar heading="Worklists"></TopNavBar>
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
                  v-model="search"
                  placeholder="Care plan action"
                  aria-label="Search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="patient-list-items">
            <div class="table-responsive">
              <table class="table" v-if="worklists.length > 0">
                <thead>
                  <tr>
                    <th scope="col">Responsible</th>
                    <th scope="col">Patient Name</th>
                    <th scope="col">Care Plan Action</th>
                    <th scope="col">Care Plan Due Date</th>
                    <th scope="col">Roles</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="pointer"
                    v-for="(row, index) in filteredList"
                    :key="index">
                    <template>
                      <td scope="col">
                        <span v-text="getUser(row)"></span>
                        <i @click="openAssigneeModal(row)" class="fas fa-edit ml-2"></i>
                      </td>
                      <td scope="col">{{ row.patient.first_name}} {{ row.patient.last_name}}</td>
                      <td scope="col">{{ row.body.title }}</td>
                      <td scope="col">{{ row.body.activityDuration.end | moment("Do MMMM YYYY") }}</td>
                      <td scope="col">{{ row.body.role.join(', ')}}</td>
                      <td v-if="row.meta.status === 'pending'" class="pending">Pending</td>
                      <td v-else class="success">Completed</td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <b-modal id="modal-assign-user" class="modal-header">
        <template v-slot:modal-header>
          <span class="title">Task Assigned To:</span>
        </template>
        <div class="form-group">
          <label for="users">Select a user</label>
          <select v-model="selectedUser" name="users" id="users" class="form-control">
            <option v-for="(user, index) in currentUsers" :key="index" :value="user">{{ user.name }}</option>
          </select>
        </div>

        <template v-slot:modal-footer>
          <div class="w-100">
            <b-button
              @click="assignUser(selectedUser, selectedCareplan)"
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
// @ is an alias to /src
import Vue from "vue";
import { VuejsDatatableFactory } from "vuejs-datatable";
import TopNavBar from '../../TopNavBar';

Vue.use(VuejsDatatableFactory);

export default {
  name: "nurse-list",
  components: { TopNavBar },
  data() {
    return {
      worklists: [],
      users: [],
      selectedUser: {},
      selectedCareplan: {},
      currentUsers: [],
      patientId: null,
      search: "",
      columns: [
        { label: "" },
        { label: "Nurse Name", align: "left" },
        {
          label: "Patient Name",
          align: "left"
        },
        { label: "Care Plan Action", align: "left" },
        { label: "Care Plan Due Date", align: "left" },
        { label: "Status", align: "left" }
      ]
    };
  },
  computed: {
    filteredList() {
      return this.worklists.filter(worklist => {
        return (
          worklist.body.title
            .toLowerCase()
            .includes(this.search.toLowerCase())
        );
      });
    }
  },
  methods: {
    getWorklists() {
      let loader = this.$loading.show();
      this.$http.get("care-plans/work-list?patient_id=" + this.patientId).then(
        response => {
          if (response.status == 200) {
            this.worklists = response.data.data;
          }
          loader.hide();
        },
        error => {
          loader.hide();
        }
      );
    },

    getUsers() {
      let loader = this.$loading.show();
      this.$http.get("/users?role=nurse,doctor,chw").then(
        response => {
          if (response.status == 200) {
            this.users = response.data;
          }
          loader.hide();
        },
        error => {
          loader.hide();
        }
      );
    },

    getUser(careplan) {
      if (
        typeof careplan.meta != "undefined" &&
        typeof careplan.meta.assigned_to != "undefined"
      ) {
        let user = this.users.find(u => careplan.meta.assigned_to == u.uid);

        return user ? user.name : "None";
      }

      return "None";
    },

    assignUser(user, careplan) {
      let loader = this.$loading.show();
      this.$http
        .put("/care-plans/" + careplan.id, {
          assigned_to: user.uid
        })
        .then(
          response => {
            loader.hide();
            careplan.meta.assigned_to = user.uid;
            this.selectedCareplan = {};
            this.selectedUser = {};
            this.$bvModal.hide("modal-assign-user");
            this.$forceUpdate();
          },
          error => {
            loader.hide();
          }
        );
    },

    openAssigneeModal(careplan) {
      if (
        typeof careplan.meta != "undefined" &&
        typeof careplan.meta.assigned_to != "undefined"
      ) {
        let user = this.users.find(u => careplan.meta.assigned_to == u.uid);

        if (user) {
          this.selectedUser = user;
        }
      }
      this.selectedCareplan = careplan;
      this.currentUsers = this.users.filter(user => {
        if (typeof this.selectedCareplan.body.role === 'undefined') {
          return true;
        }
        return this.selectedCareplan.body.role.includes(user.role);
      });
      this.$bvModal.show("modal-assign-user");
    },
    closeAssigneeModal() {
      this.selectedCareplan = {};
      this.selectedUser = {};
      this.$bvModal.hide("modal-assign-user");
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
    this.getUsers();
    this.getWorklists();
  },
  created() {
    this.patientId = this.$route.params.patientId;
  }
};
</script>

<style lang="">
</style>
