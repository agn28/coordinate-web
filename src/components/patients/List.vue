<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <TopNavBar heading="Patients"></TopNavBar>
      <div class="row">
        <div class="col-lg-12">
          <div class="patient-content">
            <div class="title">Patient List</div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-10">
          <div class="patient-search">
            <div class="search">
              <div class="input-group md-form form-sm form-1 pl-0">
                <input
                  class="form-control my-0 py-1 border-right-0"
                  type="text"
                  placeholder="Patient Name, ID, NID"
                  aria-label="Search"
                  v-model="search"
                  @keyup.enter="getPatients('', 'last_item')"
                />
                <div class="input-group-prepend">
                  <a
                    href="javascript:void(0)"
                    @click="getPatients('', 'last_item')"
                    class="input-group-text lighten-3 text-decoration-none"
                    id="btn-search"
                  >
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-2">
          <div class="mx-4">
            <button type="submit" class="btn btn-primary float-right">
              <download-excel
                :fetch="getExportData"
                :export-fields="exportFields"
                header="Summery of Patient Data"
                name="patients.xls"
              >
                Export
                <img
                  src="../../assets/images/export-icon.png"
                  alt="Export"
                />
              </download-excel>
            </button>
          </div>
        </div>
      </div>
      <div class="row mt-0">
        <div class="col-lg-12">
          <div class="patient-list" v-if="patients.length > 0">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Center</th>
                    <th scope="col">NID</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Registration Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="pointer bg-white tr-border-bttom-grey"
                    v-for="(patient, index) in displayedPatients"
                    :key="index"
                    @click="
                      $router.push({
                        name: 'patientOverview',
                        params: { patientId: patient.id },
                      })
                    "
                  >
                    <template>
                      <td>
                        {{
                          patient.body.first_name + " " + patient.body.last_name
                        }}
                      </td>
                      <td v-if="patient.body.center">
                        {{ patient.body.center.name }}
                      </td>
                      <td v-else></td>
                      <td>{{ patient.body.nid }}</td>
                      <td>{{ patient.body.age }}</td>
                      <td>{{ patient.body.gender.toUpperCase() }}</td>
                      <td>
                        {{ patient.body.registration_date }}
                        <span class="pull-right"
                          ><i class="fas fa-arrow-right"></i
                        ></span>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- <nav aria-label="Page navigation" class="d-none">
              <ul class="pagination mt-3 mb-5">
                <li class="page-item">
                  <button type="button" class="page-link" v-if="paginationOptions.currentPage != 1" @click="paginationOptions.currentPage--"> Previous </button>
                </li>
                <li class="page-item">
                  <button type="button" class="page-link" v-for="(pageNumber, index) in paginationOptions.pages.slice(paginationOptions.currentPage - 1, paginationOptions.currentPage + 10)" @click="paginationOptions.currentPage = pageNumber" :key="index" :disabled="paginationOptions.currentPage == pageNumber ? true : false" > {{ pageNumber }} </button>
                </li>
                <li class="page-item">
                  <button type="button" @click="paginationOptions.currentPage++" v-if="paginationOptions.currentPage < paginationOptions.pages.length" class="page-link"> Next </button>
                </li>
              </ul>
            </nav>	 -->

            <nav aria-label="Page navigation">
              <ul class="pagination my-3">
                <li class="page-item">
                  <button
                    type="button"
                    class="page-link"
                    v-if="paginationOptions.currentPage != 1" @click="paginationOptions.currentPage--"
                    :disabled="disablePrevButton"
                  >
                    Previous
                  </button>
                </li>
                <li class="page-item">
                  <button
                    type="button"
                    @click="paginationOptions.currentPage++" v-if="paginationOptions.currentPage < paginationOptions.pages.length" 
                    class="page-link"
                    :disabled="disableNextButton"
                  >
                    Next
                  </button>
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
// @ is an alias to /src
import Vue from "vue";
import { VuejsDatatableFactory } from "vuejs-datatable";
import TopNavBar from "../TopNavBar.vue";
import moment from "moment";
Vue.use(VuejsDatatableFactory);

export default {
  name: "patients",
  components: { TopNavBar },
  data() {
    return {
      patients: [],
      search: "",
      paginationOptions: {
        currentPage: 1,
        perPage: 20,
        // totalItems: 500,
        pages: []
      },
      lastItemId: "",
      exportData: [],
      exportFields: {
        "Patient Name": "patient_name",
        "Encounter": "assessment_name",
        "Created Date": "assessment_created_at",
        "Blood Pressure": "bp",
        Height: "height",
        Weight: "weight",
        Waist: "waist",
        Hip: "hip",
        BMI: "bmi",
        "Random Blood Sugar": "rbs",
        "Fasting Blood Sugar": "fbs",
        "2habf": "habf",
        A1c: "a1c",
        "Total Cholesterol": "total_cholesterol",
        Ldl: "ldl",
        Hdl: "hdl",
        Triglycerides: "tg",
        Creatinine: "creatinine",
        Sodium: "sodium",
        Potassium: "potassium",
        Ketones: "ketones",
        Protein: "protein",
        "Medical History: Stroke": "stroke",
        "Medical History: Heart Attack": "heart_attack",
        "Medical History: Hypertension": "hypertension",
        "Medical History: Diabetes": "diabetes",
        "Medical History: Asthma": "asthma",
        "Medical History: Cancer": "cancer",
        "Medical History: Kidney Disease": "kidney_disease",
        "Medication: aspirin": "aspirin_medicine",
        "Medication: aspirin regular": "aspirin_regular_medicine",
        "Medication: cholesterol medicine": "cholesterol_medicine",
        "Medication: cholesterol regular medicine": "cholesterol_regular_medicine",
        "Medication: diabetes medicine": "diabetes_medicine",
        "Medication: diabetes regular medicine": "diabetes_regular_medicine",
        "Medication: hypertension medicine": "hypertension_medicine",
        "Medication: hypertension regular medicine": "hypertension_regular_medicine",
        "Risk Factor: smoking": "smoking",
        "Risk Factor: smokeless tobacco": "smokeless_tobacco",
        "Risk Factor: betel nut": "betel_nut",
        "Risk Factor: fruits vegetables daily": "fruits_vegetables_daily",
        "Risk Factor: extra salt": "extra_salt",
        "Risk Factor: salty foods": "salty_foods",
        "Risk Factor: sugary drinks": "sugary_drinks",
        "Risk Factor: processed foods": "processed_foods",
        "Risk Factor: red meat": "red_meat",
        "Risk Factor: physical activity moderate": "physical_activity_moderate",
        "Risk Factor: physical activity high": "physical_activity_high",
        "Risk Factor: alcohol": "alcohol",
        "Relative: Stroke": "relative_stroke",
        "Relative: Heart Attack": "relative_heart_attack",
        "Relative: Hypertension": "relative_hypertension",
        "Relative: Diabetes": "relative_diabetes",
        "Relative: Asthma": "relative_asthma",
        "Relative: Cancer": "relative_cancer",
        "Counselling: smoking": "counselling_smoking",
        "Counselling: smokeless tobacco": "counselling_smokeless_tobacco",
        "Counselling: fruits vegetables daily": "counselling_fruits_vegetables_daily",
        "Counselling: extra salt": "counselling_extra_salt",
        "Counselling: sugary drinks": "counselling_sugary_drinks",
        "Counselling: processed foods": "counselling_processed_foods",
        "Counselling: red meat": "counselling_red_meat",
        "Counselling: physical activity moderate": "physical_activity_moderate",
        "Counselling: alcohol": "counselling_alcohol",
        "Counselling: medical adherence": "counselling_medical_adherence",
      },
      preparedExportData:[],
      disablePrevButton: false,
      disableNextButton: false,
    };
  },
  computed: {
    filteredList() {
      return this.patients.filter((patient) => {
        return (
          patient.body.first_name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          patient.body.last_name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          patient.body.nid.toString().includes(this.search.toLowerCase())
        );
      });
    },
    displayedPatients () {
        return this.paginate(this.patients);
    }
  },
  watch: {
    patients () {
        this.setPages();
    }
  },
  methods: {
    paginate (patients) {
        let page = this.paginationOptions.currentPage;
        let perPage = this.paginationOptions.perPage;
        let from = (page * perPage) - perPage;
        let to = (page * perPage);
        return  patients.slice(from, to);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    async getExportData(lastItemId = "", queryItemkey = "last_item") {
      this.preparedExportData = [];
      let loader = this.$loading.show();
      let searchKey = "";

      if (this.search) {
        if (isNaN(this.search)) {
          searchKey = "&name=" + this.search;
        } else {
          searchKey = "&nid=" + this.search;
        }
      }
      await this.$http.get("/exports/patients?"+ queryItemkey + "=" + lastItemId + searchKey)
        .then(
          (response) => {
            if (response.status == 200) {
              loader.hide();
              if (response.data.error == false) {
                this.exportData = response.data.data;
                this.exportData.forEach(data => {
                  // console.log('data', data);
                  data.assessments.forEach((assessment, index) => {
                    // console.log('observations', assessment.observations);
                    let patient_name = index == 0 ? data.patient.body.first_name+' '+data.patient.body.last_name : '';
                    let created_at = assessment.meta.created_at ? this.getFormatedDate(assessment.meta.created_at) : '';
                    
                    let rowData = {
                      patient_name: patient_name,
                      assessment_name: assessment.body.type,
                      assessment_created_at: created_at,
                      //measurements
                      bp: assessment.observations.bp,
                      height: assessment.observations.height,
                      weight: assessment.observations.weight,
                      waist: assessment.observations.waist,
                      hip: assessment.observations.hip,
                      bmi: assessment.observations.bmi,
                      rbs: assessment.observations.bs,
                      fbs: assessment.observations.bg,
                      habf: assessment.observations.habf,
                      a1c: assessment.observations.a1c,
                      total_cholesterol: assessment.observations.total_cholesterol,
                      ldl: assessment.observations.ldl,
                      hdl: assessment.observations.hdl,
                      tg: assessment.observations.tg,
                      creatinine: assessment.observations.creatinine,
                      sodium: assessment.observations.sodium,
                      potassium: assessment.observations.potassium,
                      ketones: assessment.observations.ketones,
                      protein: assessment.observations.protein,
                      //medical history
                      stroke: assessment.observations.stroke,
                      heart_attack: assessment.observations.heart_attack,
                      hypertension: assessment.observations.hypertension,
                      diabetes: assessment.observations.diabetes,
                      asthma: assessment.observations.asthma,
                      cancer: assessment.observations.cancer,
                      kidney_disease: assessment.observations.kidney_disease,
                      //medications
                      aspirin_medicine: assessment.observations.aspirin_medicine,
                      aspirin_regular_medicine: assessment.observations.aspirin_regular_medicine,
                      cholesterol_medicine: assessment.observations.cholesterol_medicine,
                      cholesterol_regular_medicine: assessment.observations.cholesterol_regular_medicine,
                      diabetes_medicine: assessment.observations.diabetes_medicine,
                      diabetes_regular_medicine: assessment.observations.diabetes_regular_medicine,
                      hypertension_medicine: assessment.observations.hypertension_medicine,
                      hypertension_regular_medicine: assessment.observations.hypertension_regular_medicine,
                      //risk factors
                      smoking: assessment.observations.smoking,
                      smokeless_tobacco: assessment.observations.smokeless_tobacco,
                      betel_nut: assessment.observations.betel_nut,
                      fruits_vegetables_daily: assessment.observations.fruits_vegetables_daily,
                      extra_salt: assessment.observations.extra_salt,
                      salty_foods: assessment.observations.salty_foods,
                      sugary_drinks: assessment.observations.sugary_drinks,
                      processed_foods: assessment.observations.processed_foods,
                      red_meat: assessment.observations.red_meat,
                      physical_activity_moderate: assessment.observations.physical_activity_moderate,
                      physical_activity_high: assessment.observations.physical_activity_high,
                      alcohol: assessment.observations.alcohol,
                      //counselling
                      counselling_smoking: assessment.observations.counselling_smoking,
                      counselling_smokeless_tobacco: assessment.observations.counselling_smokeless_tobacco,
                      counselling_fruits_vegetables_daily: assessment.observations.counselling_fruits_vegetables_daily,
                      counselling_extra_salt: assessment.observations.counselling_extra_salt,
                      counselling_sugary_drinks: assessment.observations.counselling_sugary_drinks,
                      counselling_processed_foods: assessment.observations.counselling_processed_foods,
                      counselling_red_meat: assessment.observations.counselling_red_meat,
                      counselling_physical_activity_moderate: assessment.observations.counselling_physical_activity_moderate,
                      counselling_alcohol: assessment.observations.counselling_alcohol,
                      counselling_medical_adherence: assessment.observations.counselling_medical_adherence,
                      //relative problems
                      relative_stroke: assessment.observations.relative_stroke,
                      relative_heart_attack: assessment.observations.relative_heart_attack,
                      relative_hypertension: assessment.observations.relative_hypertension,
                      relative_diabetes: assessment.observations.relative_diabetes,
                      relative_asthma: assessment.observations.relative_asthma,
                      relative_cancer: assessment.observations.relative_cancer,
                    };
                    this.preparedExportData.push(rowData);
                  });
                });
              }
            }
          },
          (error) => {
            console.log(error);
            loader.hide();
          }
        );

      console.log('preparedExportData', this.preparedExportData);
      return this.preparedExportData;
    },
    getFormatedDate(date) {
      if(typeof date == 'string') {
        return moment(date).format("DD MMM YYYY");
      } else {
        return moment.unix(date._seconds).format("DD MMM YYYY");
      }
    },
    getPatients(lastItemId = "", queryItemkey = "last_item") {
      let loader = this.$loading.show();
      let searchKey = "";
      this.disablePrevButton = false;
      this.disableNextButton = false;

      if (this.search) {
        if (isNaN(this.search)) {
          searchKey = "&name=" + this.search;
        } else {
          searchKey = "&nid=" + this.search;
        }
      }
      this.$http
        .get(
          "/patients?per_page=" +
            this.paginationOptions.perPage +
            "&" +
            queryItemkey +
            "=" +
            lastItemId +
            searchKey
        )
        .then(
          (response) => {
            if (response.status == 200) {
              loader.hide();
              console.log("patients: ", response.data);
              if (response.data.error == true) {
                // let msg = queryItemkey == 'last_item' ? 'Reached Last Record' : 'Reached First Record';
                let msg = "No record found";
                if (queryItemkey == "last_item") {
                  this.disableNextButton = true;
                }

                if (queryItemkey == "first_item") {
                  this.disablePrevButton = true;
                }
                this.$toast.open({ message: msg, type: "error" });
                // this.patients = [];
                return;
              }

              this.patients = response.data.data;
              this.scrollToTop();
            }
          },
          (error) => {
            console.log(error);
            loader.hide();
          }
        );
    },
    nextPrevPage(type) {
      let dataLength = this.patients.length;

      if (type == "next") {
        let lastItemId = "";
        if (dataLength > 0) {
          lastItemId = this.patients[dataLength - 1].id;
        }
        this.getPatients(lastItemId, "last_item");
      }

      if (type == "prev") {
        let firstItemId = dataLength > 0 ? this.patients[0].id : "";
        this.getPatients(firstItemId, "first_item");
      }
    },
    setPages() {
      let numberOfPages = Math.ceil(
        this.patients.length / this.paginationOptions.perPage
      );
      for (let index = 1; index <= numberOfPages; index++) {
        this.paginationOptions.pages.push(index);
      }
    },
    getId(identifier, type) {
      if (!identifier) {
        return "";
      }
      let id = identifier.find((x) => x.use === type);

      if (id) {
        return id.value;
      }
      return "";
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  mounted() {
    if (this.$route.query.search && this.$route.query.search != undefined) {
      this.search = this.$route.query.search;
    }
    this.getPatients();
    this.scrollToTop();
  },
};
</script>
