<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <TopNavBar heading="Centers"></TopNavBar>
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
                  v-model="search"
                  placeholder="Center name"
                  aria-label="Search"
                  @keyup.enter="getCenters('', 'last_item')"
                />
                <div class="input-group-prepend">
                  <a href="javascript:void(0)" @click="getCenters('', 'last_item')" class="input-group-text lighten-3 text-decoration-none" id="basic-text1">
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
                <button class="btn" @click="openCreateModal()">
                  <i class="fas fa-plus"></i>Create Center
                </button>
              </div>

              <b-modal @hide="onModalUserClose" id="modal-center" class="modal-header">
                <template v-slot:modal-header>
                  <span v-if="isEdit" class="title">Update Center</span>
                  <span v-else class="title">Create Center</span>
                </template>
                <div class="form-group">
                  <label for="name">Center Name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="newCenter.name"
                    class="form-control form-coordinate height-input"
                  />
                </div>
                <div class="form-group">
                  <label for="email">In charge</label>
                  <!-- <input
                    type="text"
                    id="email"
                    v-model="newCenter.incharge"
                    class="form-control form-coordinate height-input"
                  /> -->
                  <select
                    v-if="users"
                    name="incharge"
                    id="incharge"
                    class="form-control"
                    v-model="newCenter.incharge"
                    @change="onInchargeSelect"
                    
                  >
                    <option 
                      v-for="(user, index) in users"
                      :key="index"
                      :value="user.uid"
                    >{{ user.name }}</option>
                  </select>
                </div>

                <div> <strong>Address</strong> <hr> </div>

                <div class="form-group">
                  <label for="name">Village</label>
                  <input
                    type="text"
                    id="village"
                    v-model="newCenter.address.village"
                    class="form-control form-coordinate height-input"
                  />
                </div>

                <div class="form-group">
                  <label for="name">Union</label>
                  <input
                    type="text"
                    id="union"
                    v-model="newCenter.address.union"
                    class="form-control form-coordinate height-input"
                  />
                </div>

                 <div class="form-group">
                  <label for="userRoles">Select Upazila</label>
                  <select
                    name="userRoles"
                    id="userRoles"
                    class="form-control"
                    v-model="newCenter.address.upazila"
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
                    v-model="newCenter.address.district"
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
                      @click="createCenter()"
                      variant="link"
                      :disabled="!validateForm()"
                      size="md"
                      class="float-right font-weight-bold p-0 pl-4 pr-1"
                    >Save</b-button>

                    <b-button
                      v-else
                      @click="updateCenter()"
                      variant="link"
                      :disabled="!validateForm()"
                      size="md"
                      class="float-right font-weight-bold p-0 pl-4 pr-1"
                    >Update</b-button>

                    <b-button
                      variant="link"
                      size="md"
                      class="float-right font-weight-bold p-0"
                      @click="$bvModal.hide('modal-center')"
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
          <div class="patient-list" v-if="centers">
            <div class>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">In Charge</th>
                    <th scope="col">Village</th>
                    <th scope="col">Union</th>
                    <th scope="col">Upazila</th>
                    <th scope="col">District</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(center, index) in centers" :key="index">
                    <td>{{ center.name }}</td>
                    <td>{{ center.incharge_data ? center.incharge_data.name : '' }}</td>
                    <td>{{ center.address ? center.address.village : '' }}</td>
                    <td>{{ center.address ? center.address.union : '' }}</td>
                    <td>{{ center.address ? center.address.upazila : '' }}</td>
                    <td>{{ center.address ? center.address.district : '' }}</td>
                    <td>
                      <a
                        class="btn btn-sm btn-danger mr-2"
                        href="#"
                        @click.prevent="deleteCenter(center)"
                      >
                        <i class="fas fa-trash"></i>
                      </a>

                      <a class="btn btn-sm btn-primary mr-2" href="#" @click.prevent="editCenter(center)">
                        <i class="fas fa-pencil-alt"></i>
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
import Multiselect from "vue-multiselect";
import TopNavBar from '../TopNavBar.vue';

export default {
  name: "cneters",
  components: { Multiselect, TopNavBar },
  data() {
    return {
      isEdit: false,
      search: '',
      paginationOptions: {
        currentPage: 1,
        perPage: 20,
        pages: []
      },
      lastItemId: '',
      disablePrevButton: false,
      disableNextButton: false,
      newCenter: {
        name: null,
        incharge: null,
        address: {},
        description: ''
      },
      users: [],
      centers: [],
      roles: [],
      districts: [],
      upazilas: []
    };
  },
  computed: {
    filteredList() {
      return this.centers.filter((center) => {
        return (
          center.name && center.name .toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    onInchargeSelect() {
        console.log('change incharge', this.newCenter)
    },
    onModalUserClose () {
      // this.newCenter.address = {};
      // this.$forceUpdate();
    },
    onDistrictSelect() {
      let selectedDistrict = this.districts.find(item => item.name == this.newCenter.address.district);

      if (selectedDistrict) {
        this.upazilas = selectedDistrict.thanas;
      }
    },
    validateForm() {

        return this.newCenter.name && this.newCenter.incharge && this.newCenter.address.village && this.newCenter.address.union && this.newCenter.address.upazila && this.newCenter.address.district
    },
     getUsers() {
      let loader = this.$loading.show();
      this.$http.get("/users").then(
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
    getCenters(lastItemId = '', queryItemkey = 'last_item') {
      let loader = this.$loading.show();
      let searchKey = '';
      this.disablePrevButton = false;
      this.disableNextButton = false;
      if(this.search) {
          searchKey = '&name=' + this.search;
      }
      this.$http.get("/centers?per_page=" + this.paginationOptions.perPage + '&' + queryItemkey + '=' + lastItemId + searchKey).then(
        response => {
          console.log('centers: ', response)
          if (response.status == 200) {
            loader.hide();
            if (response.data.error == true) {
              let msg = 'No record found';
              if ( queryItemkey == 'last_item') {
                this.disableNextButton = true;
              } 

              if ( queryItemkey == 'first_item') {
                this.disablePrevButton = true;
              }
              this.$toast.open({ message: msg, type: 'error'});
              return;
            }

            this.centers = response.data.data;
          }
        },
        error => {
          loader.hide();
        }
      );
    },
    nextPrevPage(type) {
      let dataLength = this.centers.length;

      if (type == 'next') {
        let lastItemId = '';
        if ( dataLength > 0) {
          lastItemId = this.centers[dataLength - 1].id;
        }
        this.getCenters(lastItemId, 'last_item');
      }

      if (type == 'prev') {
         let firstItemId = dataLength > 0 ? this.centers[0].id : '';
        this.getCenters(firstItemId, 'first_item');
      }
    },
    getLocations() {
      this.$http.get("/locations").then(
        response => {
          if (response.status == 200) {
            // console.log('locations ', response.data.data);
            if (response.data.data) {
              this.districts = response.data.data[0]['districts'];
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
        console.log('opned')
      this.newCenter = {
        name: null,
        incharge: null,
        address: {},
        description: ''
      }
      this.isEdit = false;
      this.$bvModal.show("modal-center");
    },

    updateCenter() {
      let loader = this.$loading.show();
      
      this.$http
        .put("/centers/" + this.newCenter.id, this.newCenter)
        .then(response => {
            console.log('update: response', response)
          if (response.status == 201) {
            let index = this.centers.findIndex((center => centers.id == this.newCenter.id));
            this.centers[index] = this.newCenter;
            this.getCenters(lastItemId = '', queryItemkey = 'last_item');
          }

          this.$bvModal.hide("modal-center");
          loader.hide();
          this.getCenters();
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

    createCenter() {
      let loader = this.$loading.show();
      this.$http
        .post("/centers", this.newCenter)
        .then(response => {
          if (response.status == 201) {
            this.centers.push(this.newCenter);
          }

          this.$bvModal.hide("modal-center");

          this.newCenter = {
            name: null,
            incharge: null,
            address: {},
            description: ''
          };
          loader.hide();
          this.getCenters();
        })
        .catch(error => {
            console.log('error: ', error)
            loader.hide();
        });
    },

    editCenter(center) {
      console.log(center);
      this.isEdit = true;
      this.$bvModal.show("modal-center");
      this.newCenter = center;

      //TODO: remove this

      this.prepareAddress();
      
    },

    prepareAddress() {
      console.log('this.newCenter ', this.newCenter);
      this.newCenter.address = this.newCenter.address || {};
      if (this.newCenter.address.district) {
        let selectedDistrict = this.districts.find(item => item.name == this.newCenter.address.district);

        if (selectedDistrict) {
          this.upazilas = selectedDistrict.thanas;
        }
      }
    },

    deleteCenter(center) {
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
      this.$http
        .delete("/centers/" + center.id)
        .then(response => {
          console.log('delete resp: ', response);
          loader.hide();
          if (response.status == 200) {
            this.getCenters();
            this.$toast.open({ message: 'Center deleted', type: 'success'})
            return;
          }
          
          this.$toast.open({ message: 'Failed to delete center', type: 'error'});
        })
        .catch(error => {
            console.log('error: ', error)
            loader.hide();
        });
        }
      });
    }
  },
  mounted() {
    this.getUsers();
    this.getLocations();
    this.getCenters();
  }
};
</script>
