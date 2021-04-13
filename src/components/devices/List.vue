<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <TopNavBar heading="Devices"></TopNavBar>
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
                  placeholder="Device name"
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
                <button class="btn" v-b-modal.modal-device>
                  <i class="fas fa-plus"></i>Create Device
                </button>
              </div>

              <b-modal id="modal-device" class="modal-role">
                <template v-slot:modal-header>
                  <span class="title">Create Device</span>
                </template>
                <div class="d-flex align-items-center row">
                  <div class="form-group col-md-12">
                    <label for="newDrug">Device</label>
                    <input
                      type="text"
                      id="newDrug"
                      v-model="newDevice"
                      class="form-control form-coordinate height-input"
                    />
                    <small id="permissionHelp" class="form-text text-muted">
                      Examnple:
                      <b>D-121312</b>
                    </small>
                  </div>
                </div>

                <template v-slot:modal-footer>
                  <div class="w-100">
                    <b-button
                      type="button"
                      @click="createDevice()"
                      variant="link"
                      :disabled="!newDevice"
                      size="md"
                      class="float-right font-weight-bold p-0 pl-4 pr-1"
                    >Save</b-button>

                    <button
                      class="btn btn-link float-right font-weight-bold p-0"
                      @click="$bvModal.hide('modal-device')"
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
                    <th scope="col">Devices</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(device, index) in devices" :key="index">
                    <td>{{ device.name }}</td>
                    <td>
                      <a
                        class="btn btn-sm btn-danger mr-2"
                        href="#"
                        @click.prevent="deleteDevice(device)"
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
import TopNavBar from '../TopNavBar.vue';
export default {
  name: "devices",
  components: { TopNavBar },
  data() {
    return {
      newDevice: null,
      devices: []
    };
  },
  
  methods: {
    getDevices() {
      let loader = this.$loading.show();
      this.$http.get("/devices").then(
        response => {
          if (response.status == 200 && !response.data.error) {
            this.devices = response.data.data;
          }
          loader.hide();
        },
        error => {
          loader.hide();
        }
      );
    },

    createDevice() {
      if (!this.newDevice) {
        return;
      }

      let loader = this.$loading.show();
      this.$http.post("/devices", { name: this.newDevice }).then(
        response => {
          loader.hide();
          if (response.status == 201) {
            this.devices.push({
              name: response.data.name,
              id: response.data.id
            });
            this.$bvModal.hide("modal-device");
            this.newDevice = "";
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    deleteDevice(device) {
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
          this.$http.delete("/devices/" + device.id).then(
            response => {
              let index = this.devices.findIndex(
                r => r.id == device.id
              );
              this.devices.splice(index, 1);
              loader.hide();
              this.$swal(
                "Deleted!",
                "Device has been deleted.",
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
    this.getDevices();
  }
};
</script>

<style lang="">
</style>
