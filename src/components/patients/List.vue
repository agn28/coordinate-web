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
                />
                <div class="input-group-prepend">
                  <span class="input-group-text lighten-3" id="basic-text1">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </span>
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
                type="csv"
                name="patients.csv"
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
                    v-for="(patient, index) in filteredList"
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
                    Prev
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
      exportFields: {},
      // exportFields: {
      //   "Patient Name": "patient_name",
      //   "Encounter": "assessment_name",
      //   "Created Date": "assessment_created_at",
      //   "Blood Pressure": "bp",
      //   Height: "height",
      //   Weight: "weight",
      //   Waist: "waist",
      //   Hip: "hip",
      //   BMI: "bmi",
      //   "Random Blood Sugar": "rbs",
      //   "Fasting Blood Sugar": "fbs",
      //   "2habf": "habf",
      //   A1c: "a1c",
      //   "Total Cholesterol": "total_cholesterol",
      //   Ldl: "ldl",
      //   Hdl: "hdl",
      //   Triglycerides: "tg",
      //   Creatinine: "creatinine",
      //   Sodium: "sodium",
      //   Potassium: "potassium",
      //   Ketones: "ketones",
      //   Protein: "protein",
      //   "Medical History: Stroke": "stroke",
      //   "Medical History: Heart Attack": "heart_attack",
      //   "Medical History: Hypertension": "hypertension",
      //   "Medical History: Diabetes": "diabetes",
      //   "Medical History: Asthma": "asthma",
      //   "Medical History: Cancer": "cancer",
      //   "Medical History: Kidney Disease": "kidney_disease",
      //   "Medication: aspirin": "aspirin_medicine",
      //   "Medication: aspirin regular": "aspirin_regular_medicine",
      //   "Medication: cholesterol medicine": "cholesterol_medicine",
      //   "Medication: cholesterol regular medicine": "cholesterol_regular_medicine",
      //   "Medication: diabetes medicine": "diabetes_medicine",
      //   "Medication: diabetes regular medicine": "diabetes_regular_medicine",
      //   "Medication: hypertension medicine": "hypertension_medicine",
      //   "Medication: hypertension regular medicine": "hypertension_regular_medicine",
      //   "Risk Factor: smoking": "smoking",
      //   "Risk Factor: smokeless tobacco": "smokeless_tobacco",
      //   "Risk Factor: betel nut": "betel_nut",
      //   "Risk Factor: fruits vegetables daily": "fruits_vegetables_daily",
      //   "Risk Factor: extra salt": "extra_salt",
      //   "Risk Factor: salty foods": "salty_foods",
      //   "Risk Factor: sugary drinks": "sugary_drinks",
      //   "Risk Factor: processed foods": "processed_foods",
      //   "Risk Factor: red meat": "red_meat",
      //   "Risk Factor: physical activity moderate": "physical_activity_moderate",
      //   "Risk Factor: physical activity high": "physical_activity_high",
      //   "Risk Factor: alcohol": "alcohol",
      //   "Relative: Stroke": "relative_stroke",
      //   "Relative: Heart Attack": "relative_heart_attack",
      //   "Relative: Hypertension": "relative_hypertension",
      //   "Relative: Diabetes": "relative_diabetes",
      //   "Relative: Asthma": "relative_asthma",
      //   "Relative: Cancer": "relative_cancer",
      //   "Counselling: smoking": "counselling_smoking",
      //   "Counselling: smokeless tobacco": "counselling_smokeless_tobacco",
      //   "Counselling: fruits vegetables daily": "counselling_fruits_vegetables_daily",
      //   "Counselling: extra salt": "counselling_extra_salt",
      //   "Counselling: sugary drinks": "counselling_sugary_drinks",
      //   "Counselling: processed foods": "counselling_processed_foods",
      //   "Counselling: red meat": "counselling_red_meat",
      //   "Counselling: physical activity moderate": "physical_activity_moderate",
      //   "Counselling: alcohol": "counselling_alcohol",
      //   "Counselling: medical adherence": "counselling_medical_adherence",
      // },
      preparedExportData:[],
      disablePrevButton: false,
      disableNextButton: false,
    };
  },
  computed: {
    filteredList() {
      return this.paginate(this.patients.filter((patient) => {
        return (
          patient.body.first_name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          patient.body.last_name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          patient.body.nid.toString().includes(this.search.toLowerCase())
        );
      }));
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
      await this.$http.get("/exports/patients-mongo?"+ queryItemkey + "=" + lastItemId + searchKey)
        .then(
          (response) => {
            if (response.status == 200) {
              loader.hide();
              if (response.data.error == false) {
                this.exportData = response.data.data;
                // this.exportFields["Patient Name"] = "patient_name";
                // this.exportFields["Assessment Name"] = "assessment_name";
                // this.preparedExportData.push({
                //   patient_name: 'test',
                //   assessment_name: 'test assess'
                // });
                this.exportData.forEach((data, index) => {
                  // console.log('data', data.reg.provider_type);
                  var preparedRow = {};
                  this.exportFields["Patient Name"] = "patient_name";
                  preparedRow.patient_name = data.patient.body.first_name+' '+data.patient.body.last_name;
                  this.exportFields["Registered On"] = "registered_on";
                  preparedRow.registered_on = typeof data.patient.meta == 'undefined' ||  typeof data.patient.meta.created_at == 'undefined' ? '' : this.getFormatedDate(data.patient.meta.created_at);
                  this.exportFields["Village Name"] = "village_name";
                  preparedRow.village_name = data.patient.body.address.village;
                  this.exportFields["Village Code"] = "village_code";
                  preparedRow.village_code = '';
                  this.exportFields["Para Name"] = "para_name";
                  preparedRow.para_name = data.patient.body.address.street_name;
                  this.exportFields["Para Code"] = "para_code";
                  preparedRow.para_code = '';
                  this.exportFields["HH number"] = "hh_number";
                  preparedRow.hh_number = data.patient.body.address.hh_number;
                  this.exportFields["Patient ID"] = "patient_id";
                  preparedRow.patient_id = data.patient.id;
                  this.exportFields["First Name"] = "first_name";
                  preparedRow.first_name = data.patient.body.first_name;
                  this.exportFields["Last Name"] = "last_name";
                  preparedRow.last_name = data.patient.body.last_name;
                  this.exportFields["Age(years)"] = "age";
                  preparedRow.age = data.patient.body.age;
                  this.exportFields["Gender"] = "gender";
                  preparedRow.gender = data.patient.body.gender;
                  this.exportFields["Father Name"] = "father_name";
                  preparedRow.father_name = data.patient.body.father_name;
                  this.exportFields["Husband Name"] = "husband_name";
                  preparedRow.husband_name = data.patient.body.husband_name;
                  this.exportFields["NID"] = "nid";
                  preparedRow.nid = data.patient.body.nid;
                  this.exportFields["Mobile"] = "mobile";
                  preparedRow.mobile = data.patient.body.mobile;
                  // this.exportFields["Provider Type"] = "provider_type";
                  // preparedRow.provider_type = data.reg.provider_type;
                  //medical history
                    // this.exportFields["Chw_stroke_0"] = "chw_stroke_0";
                    // preparedRow[chw_stroke_0] = data.chw_enrollment.observations.stroke;
                    // this.exportFields["Chw_heart_attack_0"] = "chw_heart_attack_0";
                    // preparedRow[chw_heart_attack_0] = data.chw_enrollment.observations.heart_attack;
                    // this.exportFields["Chw_hypertension_0"] = "chw_hypertension_0";
                    // preparedRow[chw_hypertension_0] = data.chw_enrollment.observations.hypertension;
                    // this.exportFields["Chw_diabetes_0"] = "chw_diabetes_0";
                    // preparedRow[chw_diabetes_0] = data.chw_enrollment.observations.diabetes;
                    // this.exportFields["Chw_asthma_0"] = "chw_asthma_0";
                    // preparedRow[chw_asthma_0] = data.chw_enrollment.observations.asthma;
                    // this.exportFields["Chw_cancer_0"] = "chw_cancer_0";
                    // preparedRow[chw_cancer_0] = data.chw_enrollment.observations.cancer;
                    // this.exportFields["Chw_ckd_0"] = "chw_ckd_0";
                    // preparedRow[chw_ckd_0] = data.chw_enrollment.observations.kidney_disease;

                  // data.assessments.forEach((assessment, assessmentIndex) => {
                  // Recording First enrollments of a patient
                  let assessmentKeys = Object.keys(data.assessments[0]);
                  assessmentKeys.forEach((key) => {
                    let prefix = '';
                    let assessment = data.assessments[0][key];
                    if (key == 'chw_enrollment') {
                      prefix = 'chw_';
                    } else if (key == 'chcp_enrollment') {
                      prefix = 'chcp_';
                    } else if (key == 'nurse_enrollment') {
                      prefix = 'nurse_';
                    }
                    let visitDate = prefix+"Visit Date_0";
                    this.exportFields[visitDate] = visitDate;
                    preparedRow[visitDate] = typeof assessment.meta == 'undefined' ||  typeof assessment.meta.created_at == 'undefined' ? '' : this.getFormatedDate(assessment.meta.created_at);

                    //medical history
                    let mhStroke = prefix+"Stroke_0";
                    this.exportFields[mhStroke] = mhStroke;
                    preparedRow[mhStroke] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.stroke == 'undefined' ? '' : assessment.observations.stroke;
                    let mhHa = prefix+"Heart Attack_0";
                    this.exportFields[mhHa] = mhHa;
                    preparedRow[mhHa] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.heart_attack == 'undefined' ? '' :  assessment.observations.heart_attack;
                    let mhHtn = prefix+"Hypertension_0";
                    this.exportFields[mhHtn] = mhHtn;
                    preparedRow[mhHtn] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.hypertension == 'undefined' ? '' :  assessment.observations.hypertension;
                    let mhDiabetes = prefix+"Diabetes_0";
                    this.exportFields[mhDiabetes] = mhDiabetes;
                    preparedRow[mhDiabetes] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.diabetes == 'undefined' ? '' :  assessment.observations.diabetes;
                    let mhAsthma = prefix+"Asthma_0";
                    this.exportFields[mhAsthma] = mhAsthma;
                    preparedRow[mhAsthma] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.asthma == 'undefined' ? '' :  assessment.observations.asthma;
                    let mhCancer= prefix+"Cancer_0";
                    this.exportFields[mhCancer] = mhCancer;
                    preparedRow[mhCancer] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.cancer == 'undefined' ? '' :  assessment.observations.cancer;
                    let mhKd= prefix+"CKD_0";
                    this.exportFields[mhKd] = mhKd;
                    preparedRow[mhKd] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.kidney_disease == 'undefined' ? '' :  assessment.observations.kidney_disease;
                    //medications
                    let medAspirin= prefix+"Aspirin_0";
                    this.exportFields[medAspirin] = medAspirin;
                    preparedRow[medAspirin] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.aspirin_medicine == 'undefined' ? '' :  assessment.observations.aspirin_medicine;
                    let medAspirinReg= prefix+"Aspirin Regular_0";
                    this.exportFields[medAspirinReg] = medAspirinReg;
                    preparedRow[medAspirinReg] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.aspirin_regular_medicine == 'undefined' ? '' :  assessment.observations.aspirin_regular_medicine;
                    let medCholesterol= prefix+"Cholesterol_0";
                    this.exportFields[medCholesterol] = medCholesterol;
                    preparedRow[medCholesterol] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.cholesterol_medicine == 'undefined' ? '' :  assessment.observations.cholesterol_medicine;
                    let medCholesterolReg= prefix+"Cholesterol Regular_0";
                    this.exportFields[medCholesterolReg] = medCholesterolReg;
                    preparedRow[medCholesterolReg] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.cholesterol_regular_medicine == 'undefined' ? '' :  assessment.observations.cholesterol_regular_medicine;
                    let medDiabetes= prefix+"Diabetes Med_0";
                    this.exportFields[medDiabetes] = medDiabetes;
                    preparedRow[medDiabetes] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.diabetes_medicine == 'undefined' ? '' :  assessment.observations.diabetes_medicine;
                    let medDiabetesReg= prefix+"Diabetes Regular_0";
                    this.exportFields[medDiabetesReg] = medDiabetesReg;
                    preparedRow[medDiabetesReg] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.diabetes_regular_medicine == 'undefined' ? '' :  assessment.observations.diabetes_regular_medicine;
                    let medHtn= prefix+"HTN_0";
                    this.exportFields[medHtn] = medHtn;
                    preparedRow[medHtn] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.hypertension_medicine == 'undefined' ? '' :  assessment.observations.hypertension_medicine;
                    let medHtnReg= prefix+"HTN Regular_0";
                    this.exportFields[medHtnReg] = medHtnReg;
                    preparedRow[medHtnReg] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.hypertension_regular_medicine == 'undefined' ? '' :  assessment.observations.hypertension_regular_medicine;
                    //risk factors
                    let rfSmoke= prefix+"Smoking_0";
                    this.exportFields[rfSmoke] = rfSmoke;
                    preparedRow[rfSmoke] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.smoking == 'undefined' ? '' :  assessment.observations.smoking;
                    let rfSmokeLess= prefix+"Smokeless Tobacco_0";
                    this.exportFields[rfSmokeLess] = rfSmokeLess;
                    preparedRow[rfSmokeLess] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.smokeless_tobacco == 'undefined' ? '' :  assessment.observations.smokeless_tobacco;
                    let rfBetel= prefix+"Betel Nut_0";
                    this.exportFields[rfBetel] = rfBetel;
                    preparedRow[rfBetel] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.betel_nut == 'undefined' ? '' :  assessment.observations.betel_nut;
                    let rfFruitVeg= prefix+"Fruits Vegetables_0";
                    this.exportFields[rfFruitVeg] = rfFruitVeg;
                    preparedRow[rfFruitVeg] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.fruits_vegetables_daily == 'undefined' ? '' :  assessment.observations.fruits_vegetables_daily;
                    let rfSalt= prefix+"Extra Salt_0";
                    this.exportFields[rfSalt] = rfSalt;
                    preparedRow[rfSalt] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.extra_salt == 'undefined' ? '' :  assessment.observations.extra_salt;
                    let rfSalty= prefix+"Salty Foods_0";
                    this.exportFields[rfSalty] = rfSalty;
                    preparedRow[rfSalty] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.salty_foods == 'undefined' ? '' :  assessment.observations.salty_foods;
                    let rfSugary= prefix+"Sugary Drinks_0";
                    this.exportFields[rfSugary] = rfSugary;
                    preparedRow[rfSugary] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.sugary_drinks == 'undefined' ? '' :  assessment.observations.sugary_drinks;
                    let rfProcessed= prefix+"Processed Foods_0";
                    this.exportFields[rfProcessed] = rfProcessed;
                    preparedRow[rfProcessed] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.processed_foods == 'undefined' ? '' :  assessment.observations.processed_foods;
                    let rfMeat= prefix+"Red Meat_0";
                    this.exportFields[rfMeat] = rfMeat;
                    preparedRow[rfMeat] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.red_meat == 'undefined' ? '' :  assessment.observations.red_meat;
                    let rfActivityMod= prefix+"Physical Activity Moderate_0";
                    this.exportFields[rfActivityMod] = rfActivityMod;
                    preparedRow[rfActivityMod] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.physical_activity_moderate == 'undefined' ? '' :  assessment.observations.physical_activity_moderate;
                    let rfActivityHigh= prefix+"Physical Activity High_0";
                    this.exportFields[rfActivityHigh] = rfActivityHigh;
                    preparedRow[rfActivityHigh] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.physical_activity_high == 'undefined' ? '' :  assessment.observations.physical_activity_high;
                    let rfAlcohol= prefix+"Alcohol_0";
                    this.exportFields[rfAlcohol] = rfAlcohol;
                    preparedRow[rfAlcohol] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.alcohol == 'undefined' ? '' :  assessment.observations.alcohol;
                    //measurements
                    let height= prefix+"Height_0";
                    this.exportFields[height] = height;
                    preparedRow[height] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.height == 'undefined' ? '' :  assessment.observations.height;
                    let heightUnit= prefix+"Height Unit_0";
                    this.exportFields[heightUnit] = heightUnit;
                    preparedRow[heightUnit] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.height_unit == 'undefined' ? '' :  assessment.observations.height_unit;
                    let weight= prefix+"Weight_0";
                    this.exportFields[weight] = weight;
                    preparedRow[weight] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.weight == 'undefined' ? '' :  assessment.observations.weight;
                    let weightUnit= prefix+"Weight Unit_0";
                    this.exportFields[weightUnit] = weightUnit;
                    preparedRow[weightUnit] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.weight_unit == 'undefined' ? '' :  assessment.observations.weight_unit;
                    let bmi= prefix+"BMI_0";
                    this.exportFields[bmi] = bmi;
                    preparedRow[bmi] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.bmi == 'undefined' ? '' :  assessment.observations.bmi;
                    let rbs= prefix+"RBS_0";
                    this.exportFields[rbs] = rbs;
                    preparedRow[rbs] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.rbs == 'undefined' ? '' :  assessment.observations.rbs;
                    let rbsUnit= prefix+"RBS Unit_0";
                    this.exportFields[rbsUnit] = rbsUnit;
                    preparedRow[rbsUnit] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.rbs_unit == 'undefined' ? '' :  assessment.observations.rbs_unit;
                    let fbs= prefix+"FBS_0";
                    this.exportFields[fbs] = fbs;
                    preparedRow[fbs] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.fbs == 'undefined' ? '' :  assessment.observations.fbs;
                    let fbsUnit= prefix+"FBS Unit_0";
                    this.exportFields[fbsUnit] = fbsUnit;
                    preparedRow[fbsUnit] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.fbs_unit == 'undefined' ? '' :  assessment.observations.fbs_unit;
                    //relative problems
                    let relativeStroke= prefix+"Family stroke_0";
                    this.exportFields[relativeStroke] = relativeStroke;
                    preparedRow[relativeStroke] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.relative_stroke == 'undefined' ? '' :  assessment.observations.relative_stroke;
                    let relativeHeartAttack= prefix+"Family Heart Attack_0";
                    this.exportFields[relativeHeartAttack] = relativeHeartAttack;
                    preparedRow[relativeHeartAttack] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.relative_heart_attack == 'undefined' ? '' :  assessment.observations.relative_heart_attack;
                    let relativeHtn= prefix+"Family HTN_0";
                    this.exportFields[relativeHtn] = relativeHtn;
                    preparedRow[relativeHtn] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.relative_hypertension == 'undefined' ? '' :  assessment.observations.relative_hypertension;
                    let relativeDiabetes= prefix+"Family Diabetes_0";
                    this.exportFields[relativeDiabetes] = relativeDiabetes;
                    preparedRow[relativeDiabetes] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.relative_diabetes == 'undefined' ? '' :  assessment.observations.relative_diabetes;
                    let relativeAsthma= prefix+"Family Asthma_0";
                    this.exportFields[relativeAsthma] = relativeAsthma;
                    preparedRow[relativeAsthma] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.relative_asthma == 'undefined' ? '' :  assessment.observations.relative_asthma;
                    let relativeCancer= prefix+"Family Cancer_0";
                    this.exportFields[relativeCancer] = relativeCancer;
                    preparedRow[relativeCancer] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.relative_cancer == 'undefined' ? '' :  assessment.observations.relative_cancer;
                    //Personal Info
                    let religion= prefix+"Religion_0";
                    this.exportFields[religion] = religion;
                    preparedRow[religion] =  typeof assessment.observations == 'undefined' ||  typeof assessment.observations.religion == 'undefined' ? '' :  assessment.observations.religion;
                    let occupation= prefix+"Occupation_0";
                    this.exportFields[occupation] = occupation;
                    preparedRow[occupation] =  typeof assessment.observations == 'undefined' ||  typeof assessment.observations.occupation == 'undefined' ? '' :  assessment.observations.occupation;
                    let income= prefix+"Income_0";
                    this.exportFields[income] = income;
                    preparedRow[income] =  typeof assessment.observations == 'undefined' ||  typeof assessment.observations.income == 'undefined' ? '' :  assessment.observations.income;
                    let blood_group= prefix+"Blood Group_0";
                    this.exportFields[blood_group] = blood_group;
                    preparedRow[blood_group] =  typeof assessment.observations == 'undefined' ||  typeof assessment.observations.blood_group == 'undefined' ? '' :  assessment.observations.blood_group;
                    let education= prefix+"Education_0";
                    this.exportFields[education] = education;
                    preparedRow[education] =  typeof assessment.observations == 'undefined' ||  typeof assessment.observations.education == 'undefined' ? '' :  assessment.observations.education;
                    let ethnicity= prefix+"Ethnicity_0";
                    this.exportFields[ethnicity] = ethnicity;
                    preparedRow[ethnicity] =  typeof assessment.observations == 'undefined' ||  typeof assessment.observations.ethnicity == 'undefined' ? '' :  assessment.observations.ethnicity;
                    //   Counselling
                    let counsellingSmoking= prefix+"Counselling Smoking_0";
                    this.exportFields[counsellingSmoking] = counsellingSmoking;
                    preparedRow[counsellingSmoking] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.counselling_smoking == 'undefined' ? '' :  assessment.observations.counselling_smoking;
                    let counsellingSmokeless= prefix+"Counselling Smokeless_0";
                    this.exportFields[counsellingSmokeless] = counsellingSmokeless;
                    preparedRow[counsellingSmokeless] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.counselling_smokeless_tobacco == 'undefined' ? '' :  assessment.observations.counselling_smokeless_tobacco;
                    let counsellingFruitsVegetables= prefix+"Counselling Fruits Vegetables Intake_0";
                    this.exportFields[counsellingFruitsVegetables] = counsellingFruitsVegetables;
                    preparedRow[counsellingFruitsVegetables] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.counselling_fruits_vegetables_daily == 'undefined' ? '' :  assessment.observations.counselling_fruits_vegetables_daily;
                    let counsellingSalt= prefix+"Counselling Extra Salt_0";
                    this.exportFields[counsellingSalt] = counsellingSalt;
                    preparedRow[counsellingSalt] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.counselling_extra_salt == 'undefined' ? '' :  assessment.observations.counselling_extra_salt;
                    let counsellingSugary= prefix+"Counselling Sugary Item_0";
                    this.exportFields[counsellingSugary] = counsellingSugary;
                    preparedRow[counsellingSugary] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.counselling_sugary_drinks == 'undefined' ? '' :  assessment.observations.counselling_sugary_drinks;
                    let counsellingProcessed= prefix+"Counselling Processed Foods_0";
                    this.exportFields[counsellingProcessed] = counsellingProcessed;
                    preparedRow[counsellingProcessed] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.counselling_processed_foods == 'undefined' ? '' :  assessment.observations.counselling_processed_foods;
                    let counsellingMeat= prefix+"Counselling Red Meat_0";
                    this.exportFields[counsellingMeat] = counsellingMeat;
                    preparedRow[counsellingMeat] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.counselling_red_meat == 'undefined' ? '' :  assessment.observations.counselling_red_meat;
                    let counsellingActivity= prefix+"Counselling Physical Inactivity_0";
                    this.exportFields[counsellingActivity] = counsellingActivity;
                    preparedRow[counsellingActivity] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.counselling_physical_activity_moderate == 'undefined' ? '' :  assessment.observations.counselling_physical_activity_moderate;
                    let counsellingAlcohol= prefix+"Counselling Alcohol_0";
                    this.exportFields[counsellingAlcohol] = counsellingAlcohol;
                    preparedRow[counsellingAlcohol] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.counselling_alcohol == 'undefined' ? '' :  assessment.observations.counselling_alcohol;
                    let counsellingMed= prefix+"Counselling Medicine Adherence_0";
                    this.exportFields[counsellingMed] = counsellingMed;
                    preparedRow[counsellingMed] = typeof assessment.observations == 'undefined' ||  typeof assessment.observations.counselling_medical_adherence == 'undefined' ? '' :  assessment.observations.counselling_medical_adherence;

                  });
                  
                  data.careplans.forEach((careplan, careplanIndex) => {
                    console.log('careplan', careplan);
                    careplan.body.diagnosis.forEach((diag, diagIndex) => {
                      let diagTitle = "Careplan"+careplanIndex+" Diagnosis"+diagIndex;
                      this.exportFields[diagTitle] = diagTitle;
                      preparedRow[diagTitle] = diag.name;
                    });
                    careplan.body.investigations.forEach((investigation, investigationIndex) => {
                      let investigationTitle = "Careplan"+careplanIndex+" Investigation"+investigationIndex;
                      this.exportFields[investigationTitle] = investigationTitle;
                      preparedRow[investigationTitle] = investigation;
                    });
                    let followupDateCc = "Careplan"+careplanIndex+" followupDate_Cc";
                    this.exportFields[followupDateCc] = followupDateCc;
                    preparedRow[followupDateCc] = typeof careplan.body.follow_up_info !='undefined' ? careplan.body.follow_up_info[0].date : '';
                    let followupDateNurse = "Careplan"+careplanIndex+" followupDate_Nurse";
                    this.exportFields[followupDateNurse] = followupDateNurse;
                    preparedRow[followupDateNurse] = typeof careplan.body.follow_up_info !='undefined' ? careplan.body.follow_up_info[1].date : '';
                  });

                  data.medications.forEach((med, medIndex) => {
                    let medTitle = "Medication"+medIndex+" Name";
                    this.exportFields[medTitle] = medTitle;
                    preparedRow[medTitle] = med.body.title;
                    let medDose = "Medication"+medIndex+" Dose";
                    this.exportFields[medDose] = medDose;
                    preparedRow[medDose] = med.body.dosage+''+med.body.unit;
                    let medFreq = "Medication"+medIndex+" Frequency";
                    this.exportFields[medFreq] = medFreq;
                    preparedRow[medFreq] = med.body.activityDuration.repeat.frequency+''+med.body.activityDuration.repeat.periodUnit;
                    let medDuration = "Medication"+medIndex+" Duration";
                    this.exportFields[medDuration] = medDuration;
                    preparedRow[medDuration] = med.body.activityDuration.review.period+''+med.body.activityDuration.review.periodUnit;
                    let timeStr = med.body.time.toString();
                    let medTime = "Medication"+medIndex+" Time";
                    this.exportFields[medTime] = medTime;
                    preparedRow[medTime] = timeStr;
                  });
                  
                  this.preparedExportData.push(preparedRow);
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
          "/patients/all-mongo?per_page=" +
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
    // if (this.$route.query.search && this.$route.query.search != undefined) {
    //   this.search = this.$route.query.search;
    // }
    this.getPatients();
    this.scrollToTop();
  },
};
</script>
