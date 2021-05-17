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
                
                <input
                  class="form-control my-0 py-1 border-right-0"
                  type="text"
                  placeholder="Device name"
                  aria-label="Search"
                  v-model="search"
                />
                <div class="input-group-prepend">
                  <a href="javascript:void(0)" @click="getDevices('', 'last_item')" class="input-group-text lighten-3 text-decoration-none" id="btn-search">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </a>
                </div>
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
          <div class="patient-list" v-if="devices">
            <div >
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
            <nav aria-label="Page navigation" >
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
      devices: [],
      search: "",
      paginationOptions: {
        currentPage: 1,
        perPage: 20,
        pages: []
      },
      lastItemId: '',
      disablePrevButton: false,
      disableNextButton: false,
    };
  },
  
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getDevices(lastItemId = '', queryItemkey = 'last_item') {
      let loader = this.$loading.show();
      let searchKey = '';
      this.disablePrevButton = false;
      this.disableNextButton = false;
      
      if (this.search) {
        searchKey = '&name=' + this.search;
      }

      this.$http.get("/devices?per_page=" + this.paginationOptions.perPage + '&' + queryItemkey + '=' + lastItemId + searchKey).then(
        response => {
          if (response.status == 200) {
            loader.hide();
            if (response.data.error == true) {
              // let msg = queryItemkey == 'last_item' ? 'Reached Last Record' : 'Reached First Record';
              let msg = 'No record found';
              if ( queryItemkey == 'last_item') {
                this.disableNextButton = true;
              } 

              if ( queryItemkey == 'first_item') {
                this.disablePrevButton = true;
              }
              this.search = '';
              this.$toast.open({ message: msg, type: 'error'});
              // this.patients = [];
              return;
            }

            this.devices = response.data.data;
            window.scrollTo(0,0);
          }
          loader.hide();
        },
        error => {
          loader.hide();
        }
      );
    },
    nextPrevPage(type) {
      let dataLength = this.devices.length;

      if (type == 'next') {
        let lastItemId = '';
        if ( dataLength > 0) {
          lastItemId = this.devices[dataLength - 1].id;
        }
        this.getDevices(lastItemId, 'last_item');
      }

      if (type == 'prev') {
         let firstItemId = dataLength > 0 ? this.devices[0].id : '';
        this.getDevices(firstItemId, 'first_item');
      }
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
            // this.devices.push({
            //   name: response.data.name,
            //   id: response.data.id
            // });
            this.getDevices('', 'last_item');
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
    this.scrollToTop();
  }
};
</script>

<style lang="">
</style>
