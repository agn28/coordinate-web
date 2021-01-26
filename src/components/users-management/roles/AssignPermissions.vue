<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
          <div class>
            <h4>Assign Permissions</h4>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="patient-list">
            <div class="card mt-5">
              <div class="card-header bg-light">
                <div class="float-left">
                  <h5 class="pt-2">Role: {{ role.name }}</h5>
                </div>
                <div class="float-right">
                  <router-link
                    class="btn btn-primary"
                    :to="{ name: 'permissions' }"
                  >Go to permissions</router-link>
                </div>
              </div>
              <div class="card-body">
                <h6 class="mb-4">Select Permissions</h6>

                <div class="permissions mb-5">
                  <div class="row">
                    <div
                      class="col-sm-4 permission-item"
                      v-for="(permission, index) in role.permissions"
                      :key="index"
                    >
                      <div class="pending-checkbox">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            :value="index"
                            v-model="selectedPermissions"
                            :id="'checkbox-permission-' + index"
                            :name="'checkbox-permission-' + index"
                          />
                          <label
                            class="custom-control-label"
                            :for="'checkbox-permission-' + index"
                          >{{ index }}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button class="btn btn-primary" @click="updateRole()">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "assign-permissions",
  components: {},
  data() {
    return {
      newRole: null,
      role: [],
      selectedPermissions: []
    };
  },
  methods: {
    getRoles() {
      let loader = this.$loading.show();
      this.$http.get(`/roles/${this.$route.params.roleId}`).then(
        response => {
          if (response.status == 200) {
            this.role = response.data.data;
            if (this.role.permissions) {
              for (let [p, v] of Object.entries(this.role.permissions)) {
              if (v) {
                this.selectedPermissions.push(p);
              }
            }
            loader.hide();
            }
            
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    updateRole() {
      for (let [p, v] of Object.entries(this.role.permissions)) {
        this.role.permissions[p] = false;
        if (this.selectedPermissions.includes(p)) {
          this.role.permissions[p] = true;
        }
      }
      let loader = this.$loading.show();
      this.$http.put(`/roles/${this.$route.params.roleId}`, this.role).then(
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
