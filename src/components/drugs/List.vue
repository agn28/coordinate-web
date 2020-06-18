<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
          <div class>
            <h4>Drugs</h4>
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
        <div class="col-lg-3">
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
                  placeholder="Drug name"
                  aria-label="Search"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="patient-content float-right">
            <div class="right-side">
              <div class="register-patient">
                <button class="btn" v-b-modal.modal-drug>
                  <i class="fas fa-plus"></i>Create Drug
                </button>
              </div>

              <b-modal id="modal-drug" class="modal-role">
                <template v-slot:modal-header>
                  <span class="title">Create Drug</span>
                </template>
                <div class="d-flex align-items-center row">
                  <div class="form-group col-md-12">
                    <label for="newDrug">Drug</label>
                    <input
                      type="text"
                      id="newDrug"
                      v-model="newDrug"
                      class="form-control form-coordinate height-input"
                    />
                    <small id="permissionHelp" class="form-text text-muted">
                      Examnple:
                      <b>Napa 12mg</b>
                    </small>
                  </div>
                </div>

                <template v-slot:modal-footer>
                  <div class="w-100">
                    <b-button
                      type="button"
                      @click="createDrug()"
                      variant="link"
                      :disabled="!newDrug"
                      size="md"
                      class="float-right font-weight-bold p-0 pl-4 pr-1"
                    >Save</b-button>

                    <button
                      class="btn btn-link float-right font-weight-bold p-0"
                      @click="$bvModal.hide('modal-drug')"
                    >Cancel</button>
                  </div>
                </template>
              </b-modal>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="patient-list">
            <div class>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Drugs</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(drug, index) in drugs" :key="index">
                    <td>{{ drug.name }}</td>
                    <td>
                      <a
                        class="btn btn-sm btn-danger mr-2"
                        href="#"
                        @click.prevent="deleteDrug(drug)"
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
  name: "drugs",
  components: {},
  data() {
    return {
      newDrug: null,
      drugs: []
    };
  },
  
  methods: {
    getDrugs() {
      let loader = this.$loading.show();
      this.$http.get("/drugs").then(
        response => {
          if (response.status == 200) {
            this.drugs = response.data.data;
            loader.hide();
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    createDrug() {
      if (!this.newDrug) {
        return;
      }

      let loader = this.$loading.show();
      this.$http.post("/drugs", { name: this.newDrug }).then(
        response => {
          loader.hide();
          if (response.status == 201) {
            this.drugs.push({
              name: response.data.name,
              id: response.data.id
            });
            this.$bvModal.hide("modal-drug");
            this.newDrug = "";
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    deleteDrug(drug) {
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
          this.$http.delete("/drugs/" + drug.id).then(
            response => {
              let index = this.drugs.findIndex(
                r => r.id == drug.id
              );
              this.drugs.splice(index, 1);
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
    this.getDrugs();
  }
};
</script>

<style lang="">
</style>
