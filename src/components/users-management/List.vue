<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <TopNavBar heading="Users"></TopNavBar>
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
                  v-model="search"
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
                <button class="btn" @click="openCreateModal()">
                  <i class="fas fa-plus"></i>Create User
                </button>
              </div>

              <b-modal @hide="onModalUserClose" id="modal-user" class="modal-header">
                <template v-slot:modal-header>
                  <span v-if="isEdit" class="title">Update User</span>
                  <span v-else class="title">Create User</span>
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


                <div>
                  <strong>Address</strong>
                  <hr>
                </div>

                <div class="form-group">
                  <label for="name">Village</label>
                  <input
                    type="text"
                    id="village"
                    v-model="newUser.address.village"
                    class="form-control form-coordinate height-input"
                  />
                </div>

                <div class="form-group">
                  <label for="name">Union</label>
                  <input
                    type="text"
                    id="union"
                    v-model="newUser.address.union"
                    class="form-control form-coordinate height-input"
                  />
                </div>

                <div class="form-group">
                  <label for="userRoles">Select Upazila</label>
                  <select
                    name="userRoles"
                    id="userRoles"
                    class="form-control"
                    v-model="newUser.address.upazila"
                  >
                    <option
                      v-for="(upazila, index) in upazilas"
                      :key="index"
                      :value="upazila.name"
                    >{{ upazila.name }}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="userRoles">Select District</label>
                  <select
                    @change="onDistrictSelect"
                    name="userRoles"
                    id="userRoles"
                    class="form-control"
                    v-model="newUser.address.district"
                  >
                    <option
                      v-for="(district, index) in districts"
                      :key="index"
                      :value="district.name"
                    >{{ district.name }}</option>
                  </select>
                </div>
                

                <template v-slot:modal-footer>
                  <div class="w-100">
                    <b-button
                      v-if="!isEdit"
                      @click="createUser()"
                      variant="link"
                      :disabled="!validateForm()"
                      size="md"
                      class="float-right font-weight-bold p-0 pl-4 pr-1"
                    >Save</b-button>

                    <b-button
                      v-else
                      @click="updateUser()"
                      variant="link"
                      :disabled="!validateForm()"
                      size="md"
                      class="float-right font-weight-bold p-0 pl-4 pr-1"
                    >Update</b-button>

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
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Village</th>
                    <th scope="col">Union</th>
                    <th scope="col">Upazila</th>
                    <th scope="col">District</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in filteredList" :key="index">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                      <span class="badge badge-secondary text-capitalize mr-2">{{ user.role }}</span>
                    </td>
                    <td>{{ user.address ? user.address.village : '' }}</td>
                    <td>{{ user.address ? user.address.union : '' }}</td>
                    <td>{{ user.address ? user.address.upazila : '' }}</td>
                    <td>{{ user.address ? user.address.district : '' }}</td>
                    <td>
                      <a
                        class="btn btn-sm btn-danger mr-2"
                        href="#"
                        @click.prevent="deleteUser(user)"
                      >
                        <i class="fas fa-trash"></i>
                      </a>

                      <a class="btn btn-sm btn-primary mr-2" href="#" @click.prevent="editUser(user)">
                        <i class="fas fa-pencil-alt"></i>
                      </a>
                      <!-- <button
                        v-b-modal.modal-assign-role
                        class="btn btn-sm btn-secondary mr-2"
                      >Assign Role</button>-->
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
import Multiselect from "vue-multiselect";
import TopNavBar from '../TopNavBar.vue';

export default {
  name: "users",
  components: { Multiselect, TopNavBar },
  data() {
    return {
      isEdit: false,
      search: '',
      newUser: {
        name: null,
        password: null,
        email: null,
        role: null,
        address: {}
      },
      users: [],
      roles: [],
      districts: [],
      upazilas: []
    };
  },
  computed: {
    filteredList() {
      return this.users.filter((user) => {
        return (
          user.name && user.name .toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    onModalUserClose () {
      // this.newUser.address = {};
      // this.$forceUpdate();
    },
    onDistrictSelect() {
      let selectedDistrict = this.districts.find(item => item.name == this.newUser.address.district);

      if (selectedDistrict) {
        this.upazilas = selectedDistrict.thanas;
      }
      // console.log(this.newUser.address.district);
    },
    validateForm() {
      if (this.isEdit) {
        return this.newUser.name && this.newUser.email && this.newUser.role
      }
      return this.newUser.name && this.newUser.email && this.newUser.password && this.newUser.role
      
    },
    getUsers() {
      let loader = this.$loading.show();
      this.$http.get("/users").then(
        response => {
          console.log(response)
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

    getLocations() {
      this.$http.get("/locations").then(
        response => {
          if (response.status == 200) {
            // console.log('locations ', response.data.data);
            if (response.data.data) {
              this.districts = response.data.data[0]['districts'];
              console.log('districts ', this.districts)
            }
            // this.users = response.data;
          }
        },
        error => {

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

    openCreateModal() {
      this.newUser = {
        name: null,
        password: null,
        email: null,
        role: null,
        address: {}
      }
      this.isEdit = false;
      this.$bvModal.show("modal-user");
    },

    updateUser() {
      // console.log(this.newUser);
      // return;
      let loader = this.$loading.show();
      this.$http
        .put("/users/" + this.newUser.uid, this.newUser)
        .then(response => {
          if (response.status == 201) {
            let index = this.users.findIndex((user => user.uid == this.newUser.uid));
            this.users[index] = this.newUser;
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

    createUser() {
      let loader = this.$loading.show();
      this.$http
        .post("/users", this.newUser)
        .then(response => {
          if (response.status == 201) {
            this.users.push(this.newUser);
          }

          this.$bvModal.hide("modal-user");

          this.newUser = {
            name: null,
            password: null,
            email: null,
            role: null
          };
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

    editUser(user) {
      console.log(user);
      this.isEdit = true;
      this.$bvModal.show("modal-user");
      this.newUser = user;

      //TODO: remove this

      this.prepareAddress();
      
    },

    prepareAddress() {
      console.log('this.newUser ', this.newUser);
      this.newUser.address = this.newUser.address || {};
      if (this.newUser.address.district) {
        let selectedDistrict = this.districts.find(item => item.name == this.newUser.address.district);

        if (selectedDistrict) {
          this.upazilas = selectedDistrict.thanas;
        }
      }
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
          this.$swal("Deleted!", "User has been deleted.", "success");
        }
      });
    }
  },
  mounted() {
    this.getUsers();
    this.getRoles();
    this.getLocations();
  }
};
</script>
