<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
          <div class>
            <h4>Users</h4>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="patient-content">
            <div class="title">Search</div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
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
                  placeholder="User name"
                  aria-label="Search"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="patient-content float-right">
            <div class="right-side">
              <div class="register-patient">
                <button class="btn" v-b-modal.modal-user>
                  <i class="fas fa-plus"></i>Create User
                </button>
              </div>

              <b-modal id="modal-user" class="modal-header">
                <template v-slot:modal-header>
                  <span class="title">Create User</span>
                </template>
                <div class="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="newUser.name"
                    class="form-control form-coordinate height-input"
                  />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    v-model="newUser.email"
                    class="form-control form-coordinate height-input"
                  />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="text"
                    id="password"
                    v-model="newUser.password"
                    class="form-control form-coordinate height-input"
                  />
                </div>
                <div class="form-group">
                  <label for="userRoles">Select a Role</label>
                  <select
                    name="userRoles"
                    id="userRoles"
                    class="form-control"
                    v-model="newUser.role"
                  >
                    <option
                      v-for="(role, index) in roles"
                      :key="index"
                      :value="role.name"
                    >{{ role.name }}</option>
                  </select>
                </div>

                <template v-slot:modal-footer>
                  <div class="w-100">
                    <b-button
                      @click="createUser()"
                      variant="link"
                      :disabled="!(newUser.name && newUser.email && newUser.password && newUser.role)"
                      size="md"
                      class="float-right font-weight-bold p-0 pl-4 pr-1"
                    >Save</b-button>

                    <b-button
                      variant="link"
                      size="md"
                      class="float-right font-weight-bold p-0"
                      @click="$bvModal.hide('modal-user')"
                    >Cancel</b-button>
                  </div>
                </template>
              </b-modal>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="patient-list">
            <div class>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="index">
                    <td>{{ user.name }}</td>
                    <td>
                      <span class="badge badge-secondary text-capitalize mr-2">{{ user.role }}</span>
                    </td>
                    <td>
                      <a class="btn btn-sm btn-primary mr-2" href>
                        <i class="fas fa-pencil-alt"></i>
                      </a>
                      <a class="btn btn-sm btn-info mr-2" href>
                        <i class="fas fa-eye"></i>
                      </a>
                      <a class="btn btn-sm btn-danger mr-2" href="#" @click.prevent="deleteUser(user)">
                        <i class="fas fa-trash"></i>
                      </a>
                      <button
                        v-b-modal.modal-assign-role
                        class="btn btn-sm btn-secondary mr-2"
                      >Assign Role</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <b-modal id="modal-assign-role" class="modal-header">
                <template v-slot:modal-header>
                  <span class="title">Role for Feroj Bepari</span>
                </template>
                <div class="form-group">
                  <label for="roles">Select a Role</label>
                  <select name="roles" id="roles" class="form-control">
                    <option v-for="(role, index) in roles" :key="index" value>{{ role.name }}</option>
                  </select>
                </div>

                <template v-slot:modal-footer>
                  <div class="w-100">
                    <b-button
                      @click="assignRole()"
                      variant="link"
                      size="md"
                      class="float-right font-weight-bold p-0 pl-4 pr-1"
                    >Save</b-button>

                    <b-button
                      variant="link"
                      size="md"
                      class="float-right font-weight-bold p-0"
                      @click="$bvModal.hide('modal-assign-role')"
                    >Cancel</b-button>
                  </div>
                </template>
              </b-modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "users",
  components: {},
  data() {
    return {
      newUser: {
        name: null,
        password: null,
        email: null,
        role: null
      },
      users: [],
      roles: []
    };
  },
  methods: {
    getUsers() {
      let loader = this.$loading.show();
      this.$http.get("/users?role=nurse,doctor").then(
        response => {
          if (response.status == 200) {
            this.users = response.data;
            loader.hide();
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    getRoles() {
      let loader = this.$loading.show();
      this.$http.get("/roles").then(
        response => {
          if (response.status == 200) {
            this.roles = response.data.data;
            loader.hide();
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    assignRole() {},

    createUser() {
      let loader = this.$loading.show();
      this.$http
        .post("/users", this.newUser)
        .then(response => {
          if (response.status == 201) {
            this.users.push(this.newUser);
          }

          this.$bvModal.hide("modal-user");
          loader.hide();
        })
        .catch(error => {
          this.$swal({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message
          });
          loader.hide();
        });
    },

    deleteUser(user) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$swal("Deleted!", "Your file has been deleted.", "success");
        }
      });
    }
  },
  mounted() {
    this.getUsers();
    this.getRoles();
  }
};
</script>
