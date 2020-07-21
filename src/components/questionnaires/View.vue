<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
          <div class>
            <h4>Questionnaire 1</h4>
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
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="patient-content float-right">
            <div class="right-side">
              <div class="register-patient">
                <button class="btn" v-b-modal.modal-section>
                  <i class="fas fa-plus"></i>Create Section
                </button>

                <b-modal id="modal-section" class="modal-role">
                  <template v-slot:modal-header>
                    <span class="title">Create Section</span>
                  </template>
                  <div class="d-flex align-items-center row">
                    <div class="form-group col-md-12">
                      <label for="newSection">Section Name</label>
                      <input
                        type="text"
                        id="newSection"
                        v-model="newSection.name"
                        class="form-control form-coordinate height-input"
                      />
                    </div>
                  </div>

                  <template v-slot:modal-footer>
                    <div class="w-100">
                      <b-button
                        type="button"
                        @click="createSection()"
                        variant="link"
                        :disabled="!newSection"
                        size="md"
                        class="float-right font-weight-bold p-0 pl-4 pr-1"
                      >Save</b-button>

                      <button
                        class="btn btn-link float-right font-weight-bold p-0"
                        @click="$bvModal.hide('modal-section')"
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
                    <th scope="col">Section Name</th>
                    <th scope="col">Total Question</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(section, index) in sections" :key="index">
                    <td>{{ section.body.name }}</td>
                    <td>{{ section.body.questions.length }}</td>
                    <td>
                      <a
                        class="btn btn-success"
                        href="#"
                        @click.prevent="$router.push({ name: 'questionnaireSection', params: { id: questionnaireID, sectionId: section.id } })">
                        <i class="fas fa-fw fa-edit"></i>
                        <span>Edit</span>
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
  name: "edit-questionnaire",
  components: {},
  data() {
    return {
      sections: [],
      newSection: {
        name: null,
        questionnaire_id: this.$route.params.id
      },
      questionnaireID: null,
    };
  },

  methods: {
    getSections() {
      let loader = this.$loading.show();
      this.$http.get(`sections?questionnaire_id=${this.$route.params.id}`).then(
        response => {
          if (response.status == 200) {
            this.sections = response.data.data;
            loader.hide();
          }
        },
        error => {
          loader.hide();
        }
      );
    },
    createSection() {
      if (!this.newSection) {
        return;
      } 

      let loader = this.$loading.show();
      this.$http.post("/sections", this.newSection ).then(
        response => {
          loader.hide();
          if (response.status == 201) {
            console.log(response);
          }
        },
        error => {
          loader.hide();
        }
      );
    },
  },
  mounted() {
    this.questionnaireID = this.$route.params.id;
    this.getSections();
  }
};
</script>
