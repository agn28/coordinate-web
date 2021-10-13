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
                type="csv"
                header="Summery of Patient Data"
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
                  data.assessments.forEach((assessment, assessmentIndex) => {
                    // console.log('observations', assessment.observations);
                    let visitNumber = "visit_number"+assessmentIndex;
                    this.exportFields[("visit_number"+assessmentIndex)] = ("visit_number"+assessmentIndex);
                    preparedRow[("visit_number"+assessmentIndex)] = assessment.body.type;
                      //medical history
                    let mhStroke = "Stroke"+assessmentIndex;
                    this.exportFields[mhStroke] = mhStroke;
                    preparedRow[mhStroke] =assessment.observations.stroke;
                    let mhHa = "Heart Attack"+assessmentIndex;
                    this.exportFields[mhHa] = mhHa;
                    preparedRow[mhHa] =assessment.observations.heart_attack;
                    let mhHtn = "Hypertension"+assessmentIndex;
                    this.exportFields[mhHtn] = mhHtn;
                    preparedRow[mhHtn] =assessment.observations.hypertension;
                    let mhDiabetes = "Diabetes"+assessmentIndex;
                    this.exportFields[mhDiabetes] = mhDiabetes;
                    preparedRow[mhDiabetes] =assessment.observations.diabetes;
                    let mhAsthma = "Asthma"+assessmentIndex;
                    this.exportFields[mhAsthma] = mhAsthma;
                    preparedRow[mhAsthma] =assessment.observations.asthma;
                    let mhCancer= "Cancer"+assessmentIndex;
                    this.exportFields[mhCancer] = mhCancer;
                    preparedRow[mhCancer] =assessment.observations.cancer;
                    let mhKd= "CKD"+assessmentIndex;
                    this.exportFields[mhKd] = mhKd;
                    preparedRow[mhKd] =assessment.observations.kidney_disease;
                    //medications
                    let medAspirin= "Aspirin"+assessmentIndex;
                    this.exportFields[medAspirin] = medAspirin;
                    preparedRow[medAspirin] =assessment.observations.aspirin_medicine;
                    let medAspirinReg= "Aspirin Regular"+assessmentIndex;
                    this.exportFields[medAspirinReg] = medAspirinReg;
                    preparedRow[medAspirinReg] =assessment.observations.aspirin_regular_medicine;
                    let medCholesterol= "Cholesterol"+assessmentIndex;
                    this.exportFields[medCholesterol] = medCholesterol;
                    preparedRow[medCholesterol] =assessment.observations.cholesterol_medicine;
                    let medCholesterolReg= "Cholesterol Regular"+assessmentIndex;
                    this.exportFields[medCholesterolReg] = medCholesterolReg;
                    preparedRow[medCholesterolReg] =assessment.observations.cholesterol_regular_medicine;
                    let medDiabetes= "Diabetes"+assessmentIndex;
                    this.exportFields[medDiabetes] = medDiabetes;
                    preparedRow[medDiabetes] =assessment.observations.diabetes_medicine;
                    let medDiabetesReg= "Diabetes Regular"+assessmentIndex;
                    this.exportFields[medDiabetesReg] = medDiabetesReg;
                    preparedRow[medDiabetesReg] =assessment.observations.diabetes_regular_medicine;
                    let medHtn= "HTN"+assessmentIndex;
                    this.exportFields[medHtn] = medHtn;
                    preparedRow[medHtn] =assessment.observations.hypertension_medicine;
                    let medHtnReg= "HTN Regular"+assessmentIndex;
                    this.exportFields[medHtnReg] = medHtnReg;
                    preparedRow[medHtnReg] =assessment.observations.hypertension_regular_medicine;
                    //risk factors
                    let rfSmoke= "Smoking"+assessmentIndex;
                    this.exportFields[rfSmoke] = rfSmoke;
                    preparedRow[rfSmoke] =assessment.observations.smoking;
                    let rfSmokeLess= "Smokeless Tobacco"+assessmentIndex;
                    this.exportFields[rfSmokeLess] = rfSmokeLess;
                    preparedRow[rfSmokeLess] =assessment.observations.smokeless_tobacco;
                    let rfBetel= "Betel Nut"+assessmentIndex;
                    this.exportFields[rfBetel] = rfBetel;
                    preparedRow[rfBetel] =assessment.observations.betel_nut;
                    let rfFruitVeg= "Fruits Vegetables"+assessmentIndex;
                    this.exportFields[rfFruitVeg] = rfFruitVeg;
                    preparedRow[rfFruitVeg] =assessment.observations.fruits_vegetables_daily;
                    let rfSalt= "Extra Salt"+assessmentIndex;
                    this.exportFields[rfSalt] = rfSalt;
                    preparedRow[rfSalt] =assessment.observations.extra_salt;
                    let rfSalty= "Salty Foods"+assessmentIndex;
                    this.exportFields[rfSalty] = rfSalty;
                    preparedRow[rfSalty] =assessment.observations.salty_foods;
                    let rfSugary= "Sugary Drinks"+assessmentIndex;
                    this.exportFields[rfSugary] = rfSugary;
                    preparedRow[rfSugary] =assessment.observations.sugary_drinks;
                    let rfProcessed= "Processed Foods"+assessmentIndex;
                    this.exportFields[rfProcessed] = rfProcessed;
                    preparedRow[rfProcessed] =assessment.observations.processed_foods;
                    let rfMeat= "Red Meat"+assessmentIndex;
                    this.exportFields[rfMeat] = rfMeat;
                    preparedRow[rfMeat] =assessment.observations.red_meat;
                    let rfActivityMod= "Physical Activity Moderate"+assessmentIndex;
                    this.exportFields[rfActivityMod] = rfActivityMod;
                    preparedRow[rfActivityMod] =assessment.observations.physical_activity_moderate;
                    let rfActivityHigh= "Physical Activity High"+assessmentIndex;
                    this.exportFields[rfActivityHigh] = rfActivityHigh;
                    preparedRow[rfActivityHigh] =assessment.observations.physical_activity_high;
                    let rfAlcohol= "Alcohol"+assessmentIndex;
                    this.exportFields[rfAlcohol] = rfAlcohol;
                    preparedRow[rfAlcohol] =assessment.observations.alcohol;
                    //measurements
                    let height= "Height"+assessmentIndex;
                    this.exportFields[height] = height;
                    preparedRow[height] =assessment.observations.height;
                    let heightUnit= "Height Unit"+assessmentIndex;
                    this.exportFields[heightUnit] = heightUnit;
                    preparedRow[heightUnit] =assessment.observations.height_unit;
                    let weight= "Weight"+assessmentIndex;
                    this.exportFields[weight] = weight;
                    preparedRow[weight] =assessment.observations.weight;
                    let weightUnit= "Weight Unit"+assessmentIndex;
                    this.exportFields[weightUnit] = weightUnit;
                    preparedRow[weightUnit] =assessment.observations.weight_unit;
                    let bmi= "BMI"+assessmentIndex;
                    this.exportFields[bmi] = bmi;
                    preparedRow[bmi] =assessment.observations.bmi;
                    let rbs= "RBS"+assessmentIndex;
                    this.exportFields[rbs] = rbs;
                    preparedRow[rbs] =assessment.observations.rbs;
                    let rbsUnit= "RBS Unit"+assessmentIndex;
                    this.exportFields[rbsUnit] = rbsUnit;
                    preparedRow[rbsUnit] =assessment.observations.rbs_unit;
                    let fbs= "FBS"+assessmentIndex;
                    this.exportFields[fbs] = fbs;
                    preparedRow[fbs] =assessment.observations.fbs;
                    let fbsUnit= "FBS Unit"+assessmentIndex;
                    this.exportFields[fbsUnit] = fbsUnit;
                    preparedRow[fbsUnit] =assessment.observations.fbs_unit;
                    //relative problems
                    let relativeStroke= "Family stroke"+assessmentIndex;
                    this.exportFields[relativeStroke] = relativeStroke;
                    preparedRow[relativeStroke] =assessment.observations.relative_stroke;
                    let relativeHeartAttack= "Family Heart Attack"+assessmentIndex;
                    this.exportFields[relativeHeartAttack] = relativeHeartAttack;
                    preparedRow[relativeHeartAttack] =assessment.observations.relative_heart_attack;
                    let relativeHtn= "Family HTN"+assessmentIndex;
                    this.exportFields[relativeHtn] = relativeHtn;
                    preparedRow[relativeHtn] =assessment.observations.relative_hypertension;
                    let relativeDiabetes= "Family Diabetes"+assessmentIndex;
                    this.exportFields[relativeDiabetes] = relativeDiabetes;
                    preparedRow[relativeDiabetes] =assessment.observations.relative_diabetes;
                    let relativeAsthma= "Family Asthma"+assessmentIndex;
                    this.exportFields[relativeAsthma] = relativeAsthma;
                    preparedRow[relativeAsthma] =assessment.observations.relative_asthma;
                    let relativeCancer= "Family Cancer"+assessmentIndex;
                    this.exportFields[relativeCancer] = relativeCancer;
                    preparedRow[relativeCancer] =assessment.observations.relative_cancer;
                    //Personal Info
                    let religion= "Religion"+assessmentIndex;
                    this.exportFields[religion] = religion;
                    preparedRow[religion] = assessment.observations.religion;
                    let occupation= "Occupation"+assessmentIndex;
                    this.exportFields[occupation] = occupation;
                    preparedRow[occupation] = assessment.observations.occupation;
                    let income= "Income"+assessmentIndex;
                    this.exportFields[income] = income;
                    preparedRow[income] = assessment.observations.income;
                    let blood_group= "Blood Group"+assessmentIndex;
                    this.exportFields[blood_group] = blood_group;
                    preparedRow[blood_group] = assessment.observations.blood_group;
                    let education= "Education"+assessmentIndex;
                    this.exportFields[education] = education;
                    preparedRow[education] = assessment.observations.education;
                    let ethnicity= "Ethnicity"+assessmentIndex;
                    this.exportFields[ethnicity] = ethnicity;
                    preparedRow[ethnicity] = assessment.observations.ethnicity;
                    //   Counselling
                    let counsellingSmoking= "Counselling Smoking"+assessmentIndex;
                    this.exportFields[counsellingSmoking] = counsellingSmoking;
                    preparedRow[counsellingSmoking] =assessment.observations.counselling_smoking;
                    let counsellingSmokeless= "Counselling Smokeless"+assessmentIndex;
                    this.exportFields[counsellingSmokeless] = counsellingSmokeless;
                    preparedRow[counsellingSmokeless] =assessment.observations.counselling_smokeless_tobacco;
                    let counsellingFruitsVegetables= "Counselling Fruits Vegetables Intake"+assessmentIndex;
                    this.exportFields[counsellingFruitsVegetables] = counsellingFruitsVegetables;
                    preparedRow[counsellingFruitsVegetables] =assessment.observations.counselling_fruits_vegetables_daily;
                    let counsellingSalt= "Counselling Extra Salt"+assessmentIndex;
                    this.exportFields[counsellingSalt] = counsellingSalt;
                    preparedRow[counsellingSalt] =assessment.observations.counselling_extra_salt;
                    let counsellingSugary= "Counselling Sugary Item"+assessmentIndex;
                    this.exportFields[counsellingSugary] = counsellingSugary;
                    preparedRow[counsellingSugary] =assessment.observations.counselling_sugary_drinks;
                    let counsellingProcessed= "Counselling Processed Foods"+assessmentIndex;
                    this.exportFields[counsellingProcessed] = counsellingProcessed;
                    preparedRow[counsellingProcessed] =assessment.observations.counselling_processed_foods;
                    let counsellingMeat= "Counselling Red Meat"+assessmentIndex;
                    this.exportFields[counsellingMeat] = counsellingMeat;
                    preparedRow[counsellingMeat] =assessment.observations.counselling_red_meat;
                    let counsellingActivity= "Counselling Physical Inactivity"+assessmentIndex;
                    this.exportFields[counsellingActivity] = counsellingActivity;
                    preparedRow[counsellingActivity] =assessment.observations.counselling_physical_activity_moderate;
                    let counsellingAlcohol= "Counselling Alcohol"+assessmentIndex;
                    this.exportFields[counsellingAlcohol] = counsellingAlcohol;
                    preparedRow[counsellingAlcohol] =assessment.observations.counselling_alcohol;
                    let counsellingMed= "Counselling Medicine Adherence"+assessmentIndex;
                    this.exportFields[counsellingMed] = counsellingMed;
                    preparedRow[counsellingMed] =assessment.observations.counselling_medical_adherence;

                    // this.exportFields["Start Date"] = "start_date";
                    // let created_at = assessment.meta.created_at ? this.getFormatedDate(assessment.meta.created_at) : '';
                    // preparedRow.start_date = created_at;
                    // let rowData = {
                    //   assessment_name: assessment.body.type,
                    //   assessment_created_at: created_at,
                    //   //measurements
                    //   bp: assessment.observations.bp,
                    //   height: assessment.observations.height,
                    //   weight: assessment.observations.weight,
                    //   waist: assessment.observations.waist,
                    //   hip: assessment.observations.hip,
                    //   bmi: assessment.observations.bmi,
                    //   rbs: assessment.observations.bs,
                    //   fbs: assessment.observations.bg,
                    //   habf: assessment.observations.habf,
                    //   a1c: assessment.observations.a1c,
                    //   total_cholesterol: assessment.observations.total_cholesterol,
                    //   ldl: assessment.observations.ldl,
                    //   hdl: assessment.observations.hdl,
                    //   tg: assessment.observations.tg,
                    //   creatinine: assessment.observations.creatinine,
                    //   sodium: assessment.observations.sodium,
                    //   potassium: assessment.observations.potassium,
                    //   ketones: assessment.observations.ketones,
                    //   protein: assessment.observations.protein,
                    //   //medical history
                    //   stroke: assessment.observations.stroke,
                    //   heart_attack: assessment.observations.heart_attack,
                    //   hypertension: assessment.observations.hypertension,
                    //   diabetes: assessment.observations.diabetes,
                    //   asthma: assessment.observations.asthma,
                    //   cancer: assessment.observations.cancer,
                    //   kidney_disease: assessment.observations.kidney_disease,
                    //   //medications
                    //   aspirin_medicine: assessment.observations.aspirin_medicine,
                    //   aspirin_regular_medicine: assessment.observations.aspirin_regular_medicine,
                    //   cholesterol_medicine: assessment.observations.cholesterol_medicine,
                    //   cholesterol_regular_medicine: assessment.observations.cholesterol_regular_medicine,
                    //   diabetes_medicine: assessment.observations.diabetes_medicine,
                    //   diabetes_regular_medicine: assessment.observations.diabetes_regular_medicine,
                    //   hypertension_medicine: assessment.observations.hypertension_medicine,
                    //   hypertension_regular_medicine: assessment.observations.hypertension_regular_medicine,
                    //   //risk factors
                    //   smoking: assessment.observations.smoking,
                    //   smokeless_tobacco: assessment.observations.smokeless_tobacco,
                    //   betel_nut: assessment.observations.betel_nut,
                    //   fruits_vegetables_daily: assessment.observations.fruits_vegetables_daily,
                    //   extra_salt: assessment.observations.extra_salt,
                    //   salty_foods: assessment.observations.salty_foods,
                    //   sugary_drinks: assessment.observations.sugary_drinks,
                    //   processed_foods: assessment.observations.processed_foods,
                    //   red_meat: assessment.observations.red_meat,
                    //   physical_activity_moderate: assessment.observations.physical_activity_moderate,
                    //   physical_activity_high: assessment.observations.physical_activity_high,
                    //   alcohol: assessment.observations.alcohol,
                    //   //counselling
                    //   counselling_smoking: assessment.observations.counselling_smoking,
                    //   counselling_smokeless_tobacco: assessment.observations.counselling_smokeless_tobacco,
                    //   counselling_fruits_vegetables_daily: assessment.observations.counselling_fruits_vegetables_daily,
                    //   counselling_extra_salt: assessment.observations.counselling_extra_salt,
                    //   counselling_sugary_drinks: assessment.observations.counselling_sugary_drinks,
                    //   counselling_processed_foods: assessment.observations.counselling_processed_foods,
                    //   counselling_red_meat: assessment.observations.counselling_red_meat,
                    //   counselling_physical_activity_moderate: assessment.observations.counselling_physical_activity_moderate,
                    //   counselling_alcohol: assessment.observations.counselling_alcohol,
                    //   counselling_medical_adherence: assessment.observations.counselling_medical_adherence,
                    //   //relative problems
                    //   relative_stroke: assessment.observations.relative_stroke,
                    //   relative_heart_attack: assessment.observations.relative_heart_attack,
                    //   relative_hypertension: assessment.observations.relative_hypertension,
                    //   relative_diabetes: assessment.observations.relative_diabetes,
                    //   relative_asthma: assessment.observations.relative_asthma,
                    //   relative_cancer: assessment.observations.relative_cancer,
                    // };
                  });
                  if(typeof data.careplans != 'undefined') {
                    data.careplans.body.diagnosis.forEach((diag, diagIndex) => {
                      let diagTitle = "Diagnosis"+diagIndex;
                      this.exportFields[diagTitle] = diagTitle;
                      preparedRow[diagTitle] = diag.name;
                    });
                    data.careplans.body.investigations.forEach((investigation, investigationIndex) => {
                      let investigationTitle = "Investigation"+investigationIndex;
                      this.exportFields[investigationTitle] = investigationTitle;
                      preparedRow[investigationTitle] = investigation;
                    });
                  }

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

                  if(typeof data.careplans != 'undefined') {
                    let followupDateChw = "followupDate_Chw";
                    this.exportFields[followupDateChw] = followupDateChw;
                    preparedRow[followupDateChw] = typeof data.careplans.body.follow_up_info !='undefined' ? data.careplans.body.follow_up_info[0].date : '';
                    let followupDateCc = "followupDate_Cc";
                    this.exportFields[followupDateCc] = followupDateCc;
                    preparedRow[followupDateCc] = typeof data.careplans.body.follow_up_info !='undefined' ? data.careplans.body.follow_up_info[1].date : '';
                  }
                  
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
