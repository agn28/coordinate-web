<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
          <div class>
            <h4>Questionnaires</h4>
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
                  placeholder="Questionnaire name"
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
                <button class="btn" v-b-modal.modal-questionnaire>
                  <i class="fas fa-plus"></i>Create Questionnaire
                </button>

                <b-modal id="modal-questionnaire" class="modal-role">
                  <template v-slot:modal-header>
                    <span class="title">Create Questionnaire</span>
                  </template>
                  <div class="d-flex align-items-center row">
                    <div class="form-group col-md-12">
                      <label for="newQuestionnaire">Questionnaire</label>
                      <input
                        type="text"
                        id="newQuestionnaire"
                        v-model="newQuestionnaire.name"
                        class="form-control form-coordinate height-input"
                      />
                    </div>

                    <div class="form-group col-md-12">
                      <label for="lang">Select a Language</label>
                      <select
                        name="lang"
                        id="lang"
                        class="form-control"
                        v-model="newQuestionnaire.language"
                      >
                        <option
                          v-for="(lang, index) in languages"
                          :key="index"
                          :value="lang.key"
                        >{{ lang.label }}</option>
                      </select>
                    </div>
                  </div>

                  <template v-slot:modal-footer>
                    <div class="w-100">
                      <b-button
                        type="button"
                        @click="createQuestionnaire()"
                        variant="link"
                        :disabled="!newQuestionnaire"
                        size="md"
                        class="float-right font-weight-bold p-0 pl-4 pr-1"
                      >Save</b-button>

                      <button
                        class="btn btn-link float-right font-weight-bold p-0"
                        @click="$bvModal.hide('modal-questionnaire')"
                      >Cancel</button>
                    </div>
                  </template>
                </b-modal>
              </div>
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
                    <th scope="col">Questionnaire</th>
                    <th scope="col">Language</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(q, index) in questionnaires" :key="index">
                    <td>{{ q.name }}</td>
                    <td>{{ q.language }}</td>
                    <td>
                      <a
                        class="btn btn-success"
                        href="#"
                        @click.prevent="$router.push({ name: 'editQuestionnaire', params: { id: q.id } })"
                      >
                        <i class="fas fa-fw fa-edit"></i>
                        <span>View</span>
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
  name: "questionnaires",
  components: {},
  data() {
    return {
      newQuestionnaire: {
        name: null,
        language: "en"
      },
      questionnaires: [],
      languages: [
        {
          key: "en",
          label: "English"
        },
        {
          key: "bn",
          label: "Bengali"
        }
      ]
    };
  },

  methods: {
    getMedications() {
      let loader = this.$loading.show();
      this.$http.get("/questionnaires").then(
        response => {
          if (response.status == 200) {
            this.questionnaires = response.data.data;
            loader.hide();
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    createQuestionnaire() {
      if (!this.newQuestionnaire) {
        return;
      } 

      let loader = this.$loading.show();
      this.$http.post("/questionnaires", this.newQuestionnaire ).then(
        response => {
          loader.hide();
          if (response.status == 201) {
            let item = {
              id: response.data.data.id,
              name: this.newQuestionnaire.name,
              language: this.newQuestionnaire.language
            };
            this.questionnaires.push(item);
          }
          this.$bvModal.hide("modal-questionnaire");
        },
        error => {
          loader.hide();
        }
      );
    },

    deleteMedication(q) {
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
          this.$http.delete("/questionnaires/" + q.id).then(
            response => {
              let index = this.q.findIndex(r => r.id == q.id);
              this.questionnaires.splice(index, 1);
              loader.hide();
              this.$swal(
                "Deleted!",
                "Questionnaire has been deleted.",
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
  }
};
</script>

<style lang="">
</style>
