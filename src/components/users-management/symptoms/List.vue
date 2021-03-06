<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <TopNavBar heading="Symptoms"></TopNavBar>
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
                  placeholder="Symptoms name"
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
                <button class="btn" v-b-modal.modal-symptom>
                  <i class="fas fa-plus"></i>Create Symptom
                </button>
              </div>

              <b-modal id="modal-symptom" class="modal-role">
                <template v-slot:modal-header>
                  <span class="title">Create Symptom</span>
                </template>
                <div class="d-flex align-items-center row">
                  <div class="form-group col-md-12">
                    <label for="newMedication">Symptom</label>
                    <input
                      type="text"
                      id="newSymptom"
                      v-model="newSymptom"
                      class="form-control form-coordinate height-input"
                    />
                  </div>
                </div>

                <template v-slot:modal-footer>
                  <div class="w-100">
                    <b-button
                      type="button"
                      @click="createSymptom()"
                      variant="link"
                      :disabled="!newSymptom"
                      size="md"
                      class="float-right font-weight-bold p-0 pl-4 pr-1"
                    >Save</b-button>

                    <button
                      class="btn btn-link float-right font-weight-bold p-0"
                      @click="$bvModal.hide('modal-symptom')"
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
                    <th scope="col">Symptoms</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(symptom, index) in filteredList" :key="index">
                    <td>{{ symptom.name }}</td>
                    <td>
                      <a
                        class="btn btn-sm btn-danger mr-2"
                        href="#"
                        @click.prevent="deleteSymptom(symptom)"
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
import TopNavBar from '../../TopNavBar.vue';
export default {
  name: "symptoms",
  components: { TopNavBar },
  data() {
    return {
      newSymptom: null,
      symptoms: [],
      search: ''
    };
  },
  mounted() {
    this.getSymptoms();
    this.scrollToTop();
  },
  computed: {
    filteredList() {
      return this.symptoms.filter(m => {
        return m.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getSymptoms() {
      let loader = this.$loading.show();
      this.$http.get("/medications").then(
        response => {
          if (response.status == 200) {
            this.symptoms = response.data.data;
          }

          loader.hide();
        },
        error => {
          loader.hide();
        }
      );
    },

    createSymptom() {
      if (!this.newSymptom) {
        return;
      }

      let loader = this.$loading.show();
      this.$http.post("/medications", { name: this.newSymptom }).then(
        response => {
          loader.hide();
          if (response.status == 201) {
            this.symptoms.push(response.data);
            this.$bvModal.hide("modal-symptom");
            this.newSymptom = "";
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    deleteSymptom(symptom) {
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
          this.confirmedDeleteSymptom(symptom);
        }
      });
    },

    confirmedDeleteSymptom(symptom) {
      let loader = this.$loading.show();
      this.$http.delete("/medications/" + symptom.id).then(
        response => {
          let index = this.symptoms.findIndex(m => m.id == symptom.id);
          this.symptoms.splice(index, 1);
          loader.hide();
          this.$swal(
            "Deleted!",
            "Your symptom has been deleted.",
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
