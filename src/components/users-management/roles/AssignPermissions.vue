<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <TopNavBar heading="Assign Permissions"></TopNavBar>
      <div class="row mt-0">
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
import TopNavBar from '../../TopNavBar.vue';
export default {
  name: "assign-permissions",
  components: { TopNavBar },
  data() {
    return {
      newRole: null,
      role: [],
      selectedPermissions: [],
      permissions: []
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getRole() {
      let loader = this.$loading.show();
      this.$http.get(`/roles/${this.$route.params.roleId}`).then(
        response => {
          loader.hide();
          if (response.status == 200) {
            this.role = response.data.data;
            if (this.role.permissions) {
              for (let [p, v] of Object.entries(this.role.permissions)) {
                if (v) {
                  this.selectedPermissions.push(p);
                }
              }
            }

            //add if role has missing permissions (new)
            this.permissions.forEach(permission => {
              if (!this.role.permissions) {
                this.role.permissions = {};
                this.role.permissions[permission] = false;
              } else if (!this.role.permissions.hasOwnProperty(permission)) {
                this.role.permissions[permission] = false;
              }
            });
            
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    getPermisions() {
      let loader = this.$loading.show();
      this.$http.get(`/permissions`).then(
        response => {
          loader.hide();
          if (response.status == 200) {
            this.permissions = response.data.data[0].permissions;
            this.getRole();
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
           this.$router.go(-1);
        },
        error => {
          loader.hide();
        }
      );
    }
  },
  mounted() {
    this.getPermisions();
    this.scrollToTop();
  }
};
</script>

<style lang="">
</style>
