<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <TopNavBar heading="Medications"></TopNavBar>
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
                  placeholder="Medication name"
                  aria-label="Search"
                  v-model="search"
                />
                 <div class="input-group-prepend">
                  <a href="javascript:void(0)" @click="getMedications('', 'last_item')" class="input-group-text lighten-3 text-decoration-none" id="basic-text1">
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
                <button class="btn" v-b-modal.modal-medication>
                  <i class="fas fa-plus"></i>Create Medication
                </button>
              </div>

              <b-modal id="modal-medication" class="modal-role">
                <template v-slot:modal-header>
                  <span class="title">Create Medication</span>
                </template>
                <div class="d-flex align-items-center row">
                  <div class="form-group col-md-12">
                    <label for="newDrug">Medication</label>
                    <input
                      type="text"
                      id="newDrug"
                      v-model="newMedication"
                      class="form-control form-coordinate height-input"
                    />
                    <small id="permissionHelp" class="form-text text-muted">
                      Example:
                      <b>Napa 12mg</b>
                    </small>
                  </div>
                </div>

                <template v-slot:modal-footer>
                  <div class="w-100">
                    <b-button
                      type="button"
                      @click="createMedication()"
                      variant="link"
                      :disabled="!newMedication"
                      size="md"
                      class="float-right font-weight-bold p-0 pl-4 pr-1"
                    >Save</b-button>

                    <button
                      class="btn btn-link float-right font-weight-bold p-0"
                      @click="$bvModal.hide('modal-medication')"
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
          <div class="patient-list" v-if="medications">
            <div class="" >
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Medications</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(medication, index) in medications" :key="index">
                    <td>{{ medication.name }}</td>
                    <td>
                      <a
                        class="btn btn-sm btn-danger mr-2"
                        href="#"
                        @click.prevent="deleteMedication(medication)"
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
  name: "medications",
  components: { TopNavBar },
  data() {
    return {
      newMedication: null,
      search: '',
      medications: [],
       paginationOptions: {
        currentPage: 1,
        perPage: 20,
        // totalItems: 500,
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
    getMedications(lastItemId = '', queryItemkey = 'last_item') {
      let loader = this.$loading.show();
      let searchKey = '';
      this.disablePrevButton = false;
      this.disableNextButton = false;
      
      if(this.search) {
        searchKey = '&name=' + this.search;
      }

      this.$http.get("/drugs?per_page=" + this.paginationOptions.perPage + '&' + queryItemkey + '=' + lastItemId + searchKey).then(
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
              this.$toast.open({ message: msg, type: 'error'});
              return;
            }

            this.medications = response.data.data;
          }
        },
        error => {
          loader.hide();
        }
      );
    },
    nextPrevPage(type) {
      let dataLength = this.medications.length;

      if (type == 'next') {
        let lastItemId = '';
        if ( dataLength > 0) {
          lastItemId = this.medications[dataLength - 1].id;
        }
        this.getMedications(lastItemId, 'last_item');
      }

      if (type == 'prev') {
        let firstItemId = dataLength > 0 ? this.medications[0].id : '';
        this.getMedications(firstItemId, 'first_item');
      }
    },
    createMedication() {
      if (!this.newMedication) {
        return;
      }

      let loader = this.$loading.show();
      this.$http.post("/drugs", { name: this.newMedication }).then(
        response => {
          loader.hide();
          if (response.status == 201) {
            this.getMedications('', 'last_item');
            this.$bvModal.hide("modal-medication");
            this.newMedication = "";
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    deleteMedication(medication) {
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
          this.$http.delete("/drugs/" + medication.id).then(
            response => {
              let index = this.medications.findIndex(
                r => r.id == medication.id
              );
              this.medication.splice(index, 1);
              loader.hide();
              this.$swal(
                "Deleted!",
                "Drug has been deleted.",
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
    this.getMedications();
    this.scrollToTop();
  }
};
</script>

<style lang="">
</style>
