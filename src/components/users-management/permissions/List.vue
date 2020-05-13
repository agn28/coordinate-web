<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
          <div class>
            <h4>Permissions</h4>
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
                  placeholder="Permission name"
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
                <button class="btn" v-b-modal.modal-permission>
                  <i class="fas fa-plus"></i>Create Permisison
                </button>
              </div>

              <b-modal id="modal-permission" class="modal-role">
                <template v-slot:modal-header>
                  <span class="title">Create Permission</span>
                </template>
                <div class="d-flex align-items-center row">
                  <div class="form-group col-md-12">
                    <label for="newPermission">Permission</label>
                    <input
                      type="text"
                      id="newPermission"
                      v-model="newPermission"
                      class="form-control form-coordinate height-input"
                    />
                    <small id="permissionHelp" class="form-text text-muted">
                      Examnple:
                      <b>create.patient</b>
                    </small>
                  </div>
                </div>

                <template v-slot:modal-footer>
                  <div class="w-100">
                    <b-button
                      type="button"
                      @click="createPermission()"
                      variant="link"
                      :disabled="!newPermission"
                      size="md"
                      class="float-right font-weight-bold p-0 pl-4 pr-1"
                    >Save</b-button>

                    <button
                      class="btn btn-link float-right font-weight-bold p-0"
                      @click="$bvModal.hide('modal-permission')"
                    >Cancel</button>
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
                    <th scope="col">Permissions</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(permission, index) in permissions" :key="index">
                    <td>{{ permission }}</td>
                    <td>
                      <a
                        class="btn btn-sm btn-danger mr-2"
                        href="#"
                        @click.prevent="deletePermission(permission)"
                      >
                        <i class="fas fa-trash"></i>
                      </a>
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
  name: "permissions",
  components: {},
  data() {
    return {
      newPermission: null,
      permissions: []
    };
  },
  
  methods: {
    getPermissions() {
      let loader = this.$loading.show();
      this.$http.get("/permissions").then(
        response => {
          if (response.status == 200) {
            this.permissions = response.data.data[0].permissions;
            loader.hide();
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    createPermission() {
      if (!this.newPermission) {
        return;
      }

      let loader = this.$loading.show();
      this.$http.post("/permissions", { name: this.newPermission }).then(
        response => {
          loader.hide();
          if (response.status == 201) {
            this.permissions.push(this.newPermission);
            this.$bvModal.hide("modal-permission");
            this.newPermission = "";
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    deletePermission(permission) {
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
          let loader = this.$loading.show();
          this.$http.delete("/permissions/" + permission).then(
            response => {
              let index = this.permissions.findIndex(
                r => r == permission
              );
              this.permissions.splice(index, 1);
              loader.hide();
              this.$swal(
                "Deleted!",
                "Your permission has been deleted.",
                "success"
              );
            },
            error => {
              loader.hide();
            }
          );
        }
      });
    }
  },
  mounted() {
    this.getPermissions();
  }
};
</script>

<style lang="">
</style>
