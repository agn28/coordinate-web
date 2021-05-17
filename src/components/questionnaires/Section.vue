<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
          <div class>
            <h4>Test Questionnaires</h4>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="patient-list">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <QuestionsView :questions="this.section.questions" :readOnly="true" />
                  <div v-if="addQuestion">
                    <SurveyBuilder :options="sampleQuestion" />
                  </div>
                  <div class="pt-10">
                    <button
                      type="button"
                      class="btn btn-success"
                      v-on:click="addNewQuestion()"
                    >Add question</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SurveyBuilder } from "vue-survey-builder";
import QuestionsView from "./QuestionsView";
import sampleQuestionObj from "./survey-builder.json";
export default {
  name: "questionnaire-section",
  components: {
    SurveyBuilder,
    QuestionsView
  },
  data() {
    return {
      questionsList: [],
      addQuestion: false,
      sampleQuestion: {},
      section: {}
    };
  },

  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    updateQuestionsList(question) {
      const questionIndex = this.questionsList.findIndex(
        x => x.id === question.id
      );
      if (questionIndex >= 0) {
        this.section.questions.splice(questionIndex, 1, question);
      } else {
        this.section.questions.push(JSON.parse(JSON.stringify(question)));
      }
      this.addQuestion = false;
      this.$root.$emit("selected-question", null);
      // window.console.log(question, this.addQuestion, this.questionsList);
    },
    addNewQuestion() {
      this.sampleQuestion = JSON.parse(JSON.stringify(sampleQuestionObj));
      this.addQuestion = true;
    },
    getSection() {
      let loader = this.$loading.show();
      this.$http.get(`sections/${this.$route.params.sectionId}`).then(
        response => {
          if (response.status == 200) {
            this.section = response.data.data;
            loader.hide();
          }
        },
        error => {
          loader.hide();
        }
      );
    }
  },
  mounted() {
    this.getSection();
    this.$root.$on("add-update-question", q => {
      if (typeof q.operation !== "undefined" && q.operation === "save") {
        this.updateQuestionsList(q.question);
      } else {
        this.updateQuestionsList(q);
      }
    });
    this.scrollToTop();
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.vue-survey-builder-content {
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 10px;
  border-radius: 0.25rem;
  margin: 12px 0;
  background: #fff;
  font-family: Roboto !important;
}
</style>
