<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
          <div class>
            <h4>Medications</h4>
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
                  placeholder="Medication name"
                  aria-label="Search"
                  v-model="search"
                />
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
                    <label for="newMedication">Medication</label>
                    <input
                      type="text"
                      id="newMedication"
                      v-model="newMedication"
                      class="form-control form-coordinate height-input"
                    />
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
          <div class="patient-list">
            <div class>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Medications</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(medication, index) in filteredList" :key="index">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "medications",
  components: {},
  data() {
    return {
      newMedication: null,
      medications: [],
      search: ''
    };
  },
  mounted() {
    this.getMedications();
  },
  computed: {
    filteredList() {
      return this.medications.filter(m => {
        return m.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    getMedications() {
      let loader = this.$loading.show();
      this.$http.get("/medications").then(
        response => {
          if (response.status == 200) {
            this.medications = response.data.data;
          }

          loader.hide();
        },
        error => {
          loader.hide();
        }
      );
    },

    createMedication() {
      if (!this.newMedication) {
        return;
      }

      let loader = this.$loading.show();
      this.$http.post("/medications", { name: this.newMedication }).then(
        response => {
          loader.hide();
          if (response.status == 201) {
            this.medications.push(response.data);
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
          this.confirmedDeleteMedication(medication);
        }
      });
    },

    confirmedDeleteMedication(medication) {
      let loader = this.$loading.show();
      this.$http.delete("/medications/" + medication.id).then(
        response => {
          let index = this.medications.findIndex(m => m.id == medication.id);
          this.medications.splice(index, 1);
          loader.hide();
          this.$swal(
            "Deleted!",
            "Your medication has been deleted.",
            "success"
          );
        },
        error => {
          loader.hide();
        }
      );
    }
  }
};
</script>

<style lang="">
</style>
