<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
          <div class>
            <h4>Roles</h4>
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
                  placeholder="Role name"
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
                <button class="btn" v-b-modal.modal-role>
                  <i class="fas fa-plus"></i>Create Role
                </button>
              </div>

              <b-modal id="modal-role" class="modal-role">
                <template v-slot:modal-header>
                  <span class="title">Create Role</span>
                </template>
                <div class="d-flex align-items-center">
                  <div class="form-group">
                    <label for="role">Role</label>
                    <input
                      type="text"
                      id="role"
                      v-model="newRole"
                      class="form-control form-coordinate height-input"
                    />
                  </div>
                </div>

                <template v-slot:modal-footer>
                  <div class="w-100">
                    <b-button
                      @click="createRole()"
                      variant="link"
                      :disabled="!newRole"
                      size="md"
                      class="float-right font-weight-bold p-0 pl-4 pr-1"
                    >Save</b-button>

                    <b-button
                      variant="link"
                      size="md"
                      class="float-right font-weight-bold p-0"
                      @click="$bvModal.hide('modal-role')"
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
                    <th scope="col">Role</th>
                    <!-- <th scope="col">PID</th> -->
                    <th scope="col">Permisisons</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(role, index) in roles" :key="index">
                    <td>{{ role.name }}</td>

                    <td>
                      <span
                        class="badge badge-secondary text-capitalize mr-2"
                        v-for="(permission, key) in role.permissions"
                        :key="key"
                      >{{ permission }}</span>
                    </td>

                    <td>
                      <a class="btn btn-sm btn-primary mr-2" href>
                        <i class="fas fa-pencil-alt"></i>
                      </a>
                      <a class="btn btn-sm btn-info mr-2" href>
                        <i class="fas fa-eye"></i>
                      </a>
                      <a class="btn btn-sm btn-danger mr-2" href>
                        <i class="fas fa-trash"></i>
                      </a>
                      <router-link
                        class="btn btn-sm btn-secondary mr-2"
                        :to="{ name: 'assignPermissions', params: { roleId: '123' } }"
                      >Assign Permissions</router-link>
                    </td>
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
  name: "roles",
  components: {},
  data() {
    return {
      newRole: null,
      roles: []
    };
  },
  methods: {
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

    createRole() {
      if (!this.newRole) {
        return;
      }

      let loader = this.$loading.show();
      this.$http.post("/roles", this.newRole).then(
        response => {
          loader.hide();
        },
        error => {
          loader.hide();
        }
      );
    }
  },
  mounted() {
    this.getRoles();
  }
};
</script>

<style lang="">
</style>
