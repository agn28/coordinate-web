<template>
  <div class="content patient-overview">
      <TopNavBar heading="Encounter Details"></TopNavBar>

      <!-- <div class="row pl-4 pr-4">
        <div class="col-lg-6">
          <div class="patient-search">
             <h4 class="">Patient Summary</h4>
          </div>
        </div>

        <div class="col-lg-6 text-right">
          <button
            class="btn btn-primary mr-3 radious-0"
            type="button"
          >
            <span>Proceed To Care Plan</span>
          </button>
        </div>
      </div> -->

      <!-- <div v-if="patient" class="row">
        <div class="col-lg-6">
          <PatientSummary></PatientSummary>
          
        </div>
      </div> -->
    <div class="patient-summary pl-4 pr-4">
      <div class="row">
        <div class="col-md-6">
          <div class="card tab-card mb-4 card-blue-header">
            <div class="card-header "> Encounter Information </div>
            <div class="table-responsive">
              <table v-if="encounter" class="table table-borderless mt-2">
                <tbody>
                  <tr>
                    <td width="30%" class="font-weight-bold">Type</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize">{{ encounter.body.type }}</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Date</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">{{ encounter.body.assessment_date }}</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>


          <div class="card tab-card  card-blue-header">
            <div class="card-header">Body measurements</div>
            <div class="table-responsive">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col" class="mb-2">Measurement: </th>
                    <th scope="col" class="mb-2">Reading: </th>
                    <th scope="col" class="mb-2">Unit: </th>
                    <th scope="col" class="mb-2">Date: </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td > Blood pressure:</td>
                    <td :class="getBpColor()">{{ details.blood_pressure ? details.blood_pressure.value : 'N/A' }}</td>
                    <td>{{ details.blood_pressure ? 'mmHg' : '' }}</td>
                    <td>{{ details.blood_pressure ? details.blood_pressure.date : '' }}</td>
                  </tr>
                  <tr>
                    <td >Height:</td>
                    <td>{{ details.height ? details.height.value : 'N/A' }}</td>
                    <td>{{ details.height ? details.height.unit : '' }}</td>
                    <td>{{ details.height ? details.height.date : '' }}</td>
                  </tr>

                  <tr>
                    <td >Weight:</td>
                    <td>{{ details.weight ? details.weight.value : 'N/A' }}</td>
                    <td>{{ details.weight ? details.weight.unit : '' }}</td>
                    <td>{{ details.weight ? details.weight.date : '' }}</td>
                  </tr>
                  <tr>
                    <td >BMI:</td>
                    <!-- //TODO: Calculate BMI -->
                    <!-- <td>23.1</td>
                    <td>kg/m2</td>
                    <td>5 Mar 2021</td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card tab-card card-red-header">
            <div class="card-header">Risk Factors</div>
            <div class="table-responsive mt-2">
              <table class="table table-borderless">

                <tbody>
                  <tr>
                    <td width="30%" class="font-weight-bold">Smoking status</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.smoking, false)">{{ this.details.smoking || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Smokeless tobacco</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.smokeless_tobacco, false)">{{ this.details.smokeless_tobacco || 'N/A'  }}</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Diet: Additional salt: </td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.extra_salt, false)">{{ this.details.extra_salt || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Diet: Sugar intake: </td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.sugar, false)">{{ this.details.sugar || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Diet: Processed food / red meat:</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.processed_foods, false)">{{ this.details.processed_foods || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Physical activity:</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.physical_activity_moderate, true)">{{ this.details.physical_activity_moderate || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Alcohol consumption:</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.alcohol, false)">{{ this.details.alcohol || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Family history of hypertension or diabetes: </td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
          <div class="col-md-6">
          <div class="card tab-card card-blue-header">
            <div class="card-header "> Disease history </div>
            <div class="table-responsive mt-2">
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td > Diabetes mellitus:</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.diabetes, false)">{{ details.diabetes || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <td width="30%">Hypertension:</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.hypertension, false)">{{ details.hypertension || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <td > Stroke:</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.stroke, false)">{{ details.stroke || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <td width="30%">Heart attack:</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.heart_attack, false)">{{ details.heart_attack || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <td width="30%">Asthma / COPD: </td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.asthma, false)">{{ details.asthma || 'N/A'}}</td>
                  </tr>
                  <tr>
                    <td width="30%">Cancer: </td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.cancer, false)">{{ details.cancer || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <td width="30%">Chronic kidney disease: </td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.kidney_disease, false)">{{ details.kidney_disease || 'N/A' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>  
        
        <div class="col-md-6">
          <div class="card tab-card card-blue-header">
            <div class="card-header">Diagnosed conditions </div>
            <div class="table-responsive mt-2">
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td width="30%">Diabetes mellitus:</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.diabetes, false)">{{ details.diabetes }}</td>
                  </tr>
                  <tr>
                    <td width="30%">Hypertension:</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%" class="text-capitalize" :class="getColor(details.hypertension, false)">{{ details.hypertension }}</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- body measurements 
      -->
      <div class="row mb-3">
          <div class="col-md-6">

          

          <div class="card tab-card mb-3 card-blue-header">
            <div class="card-header">Investigations
              <!-- <h4 class="custom-title font-weight-bold p-0">Investigations</h4> -->
              </div>
              <span class="sub-title">Blood Sugar</span>
            <div class="table-responsive">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col" class="mb-2">Measurement: </th>
                    <th scope="col" class="mb-2">Reading: </th>
                    <th scope="col" class="mb-2">Unit: </th>
                    <th scope="col" class="mb-2">Date: </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Random blood sugar:</td>
                    <td>{{ details.random_blood_sugar ? details.random_blood_sugar.value : '' }}</td>
                    <td>{{ details.random_blood_sugar ? details.random_blood_sugar.unit : '' }}</td>
                    <td>{{ details.random_blood_sugar ? details.random_blood_sugar.date : '' }}</td>
                  </tr>
                  <tr>
                    <td >Fasting blood sugar:</td>
                    <td>{{ details.fasting_blood_sugar ? details.fasting_blood_sugar.value : '' }}</td>
                    <td>{{ details.fasting_blood_sugar ? details.fasting_blood_sugar.unit : '' }}</td>
                    <td>{{ details.fasting_blood_sugar ? details.fasting_blood_sugar.date : '' }}</td>
                  </tr>

                  <tr>
                    <td >2HABF:</td>
                    <td>{{ details.habf ? details.habf.value : '' }}</td>
                    <td>{{ details.habf ? details.habf.unit : '' }}</td>
                    <td>{{ details.habf ? details.habf.date : '' }}</td>
                  </tr>
                  <tr>
                    <td >HbA1c:</td>
                    <td>{{ details.a1c ? details.a1c.value : '' }}</td>
                    <td>%</td>
                    <td>{{ details.a1c ? details.a1c.date : '' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <span class="sub-title">Urine</span>
                <div class="table-responsive">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col"  class="mb-2">Measurement: </th>
                    <th scope="col"  class="mb-2">Reading: </th>
                    <th scope="col" class="mb-2">Unit: </th>
                    <th scope="col"  class="mb-2">Date: </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td >Urinary ketone:</td>
                    <td>{{ details.ketones ? details.ketones.value : 'N/A' }}</td>
                    <td>{{ details.ketones ? details.ketones.unit : '' }}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td >Urinary protein:</td>
                    <td>{{ details.protein ? details.protein.value : 'N/A' }}</td>
                    <td>{{ details.protein ? details.protein.unit : '' }}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>  
        
        <div class="col-md-6">
            <div class="card tab-card card-blue-header">
            <div class="card-header">Blood test</div>
            <div class="table-responsive">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col"  class="mb-2">Measurement: </th>
                    <th scope="col"  class="mb-2">Reading: </th>
                    <th scope="col" class="mb-2">Unit: </th>
                    <th scope="col"  class="mb-2">Date: </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td >Serum cholesterol:</td>
                    <td>{{ details.serum ? details.serum.value : 'N/A' }}</td>
                    <td>{{ details.serum ? details.serum.unit : '' }}</td>
                    <td>{{ details.serum ? details.serum.date : '' }}</td>
                  </tr>
                  <tr>
                    <td >Triglycerides:</td>
                    <td>{{ details.tg ? details.tg.value : 'N/A' }}</td>
                    <td>{{ details.tg ? details.tg.unit : '' }}</td>
                    <td>{{ details.tg ? details.tg.date : '' }}</td>
                  </tr>
                  <tr>
                    <td >HDL:</td>
                    <td>{{ details.hdl ? details.hdl.value : 'N/A' }}</td>
                    <td>{{ details.hdl ? details.hdl.unit : '' }}</td>
                    <td>{{ details.hdl ? details.hdl.date : '' }}</td>
                  </tr>
                  <tr>
                    <td >LDL:</td>
                    <td>{{ details.ldl ? details.ldl.value : 'N/A' }}</td>
                    <td>{{ details.ldl ? details.ldl.unit : '' }}</td>
                    <td>{{ details.ldl ? details.ldl.date : '' }}</td>
                  </tr>
                  <tr>
                    <td >Serum Creatinine:</td>
                    <td>{{ details.creatinine ? details.creatinine.value : 'N/A' }}</td>
                    <td>{{ details.creatinine ? details.creatinine.unit : '' }}</td>
                    <td>{{ details.creatinine ? details.creatinine.date : '' }}</td>
                  </tr>
                  <tr>
                    <td >Serum Na+:</td>
                    <td>{{ details.sodium ? details.sodium.value : 'N/A' }}</td>
                    <td>{{ details.sodium ? details.sodium.unit : '' }}</td>
                    <td>{{ details.sodium ? details.sodium.date : '' }}</td>
                  </tr>
                  <tr>
                    <td >Serum K+:</td>
                    <td>{{ details.potassium ? details.potassium.value : 'N/A' }}</td>
                    <td>{{ details.potassium ? details.potassium.unit : '' }}</td>
                    <td>{{ details.potassium ? details.potassium.date : '' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center m-3 mb-5" >
      </div>
      <div class="row mb-3 d-none">
          <div class="col-md-12">
            <div class="card tab-card mb-3 card-blue-header">
              <div class="card-header">
                Complaints / Note
              </div>
            <div class="table-responsive">
              <table class="table table-borderless">
                <tbody>
                  <tr class="td-border-bottom">
                    <td class="td-grey p-2">Patient has regular fever every month of 39oC</td>
                    <td class="td-grey p-2">Dr Ali Hussein</td>
                    <td class="td-grey p-2">1 Jan 2021</td>
                  </tr>

                  <tr>
                    <td class="td-grey p-2">Patient has regular fever every month of 39oC</td>
                    <td class="td-grey p-2">Dr Ali Hussein</td>
                    <td class="td-grey p-2">1 Jan 2021</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a href="javascript:void(0)" class="btn btn-primary add-note"><i class="fa fa-plus"> Add</i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";
import TopNavBar from '../TopNavBar.vue';

export default {
  name: "patients",
  components: {
    VueJsonPretty,
    TopNavBar
  },
  data() {
    return {
      patientId: "",
      encounterId: "",
      encounter: null,
      patient_history: {},
      fullPage: true,
      patient: null,
      patientId: "",
      carePlans: "",
      showIcon: true,
      groupedCareplans: [],
      encounters: [],
      history: [],
      users: [],
      report: null,
      data: [],
      observations: [],
      bpChart: {},
      heartChart: {},
      bmiChart: {},
      bloodPressures: [],
      avgDiastolic: 0,
      avgSystolic: 0,
      avgPulse: 0,
      avgBMI: 0,
      totalBMI: 0,
      currentEncounter: null,
      previousEncounter: null,
      reports: null,
      currentAssessment: null,
      dataLoaded: false,
      medicalHistory: [],
      followups: null,
      bpConditions: [],
      lastEncounter: null,
      details: {},

    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getColor(value, condition) {
      // console.log('get color', value);
      if (!value || value == 'N/A') {
        return '';
      }
      if (condition) {
        return value == 'yes' ? 'txt-success' : 'txt-red'; 
      }
      return value == 'no' ? 'txt-success' : 'txt-red';
      
      
    },

    getBpColor() {
      // console.log(this.details.blood_pressure);
      let color = '';

      if (this.details.blood_pressure) {
        let data = this.details.blood_pressure.value.split('/');
        let sbp = data[0];
        let dbp = data[1];

        this.bpConditions.forEach(condition => {
          
          if (condition.sbp) {
            
            if (sbp >= condition.sbp.from && sbp <= condition.sbp.to) {
              console.log('condition ', condition);
              console.log('sbp ', sbp);
              color = condition.sbp.color;
            }
          }
        });
      }

      // console.log('color ', color)
      return color;
    },

    prepareBpConditions() {
      this.bpConditions = [
        {
          sbp: {
            from: 60,
            to: 89,
            color: 'AMBER'
          }
        },
        {
          sbp: {
            from: 90,
            to: 120,
            color: 'GREEN'
          },
          dbp: {
            from: 60,
            to: 80,
            color: 'GREEN'
          }
        },
        {
          sbp: {
            from: 121,
            to: 140,
            color: 'AMBER'
          },
          dbp: {
            from: 81,
            to: 90,
            color: 'AMBER'
          }
        }
      ];
    },

    getDate(history) {
      let date = "";
      if (history.created_at) {
        date = moment
          .unix(history.created_at._seconds)
          .format("Do MMMM YYYY hh:mm:ss a");
      }
      return date;
    },
    getCollectedUser(userId) {
      let user = this.users.find((user) => user.uid == userId);
      if (user) {
        return user.name;
      }
    },

    onTabClick() {
      if (this.$route.query.encounter || this.$route.query.assessment) {
        this.$router.replace({});
      }
    },
    goToEncounterDetails(encounter) {
      this.currentEncounter = encounter;

      this.previousEncounter = this.encounters[this.encounters.indexOf(encounter)];
      // console.log('this.previousEncounter');
      // console.log(this.previousEncounter);
      // console.log(encounter.id)
      // console.log(this.currentEncounter.id)
      // console.log(document.getElementById("three-tab"))
      document.getElementById("three-tab").click();
      // console.log(encounter);
    },
    goToAssessmentDetails(report) {
      this.currentAssessment = report;

      // console.log(this.currentAssessment)
      // console.log(document.getElementById("five-tab"))
      document.getElementById("five-tab").click();
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    showFHIR(id) {
      let loader = this.$loading.show();
      this.$http.get("/care-plans/fhir/" + this.patientId).then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            this.data = response.data.data;

            this.$bvModal.show("fhir-modal");
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },
    getLastEncounterDate() {
      let dates = this.encounters.map((encounter) =>
        moment(encounter.meta.created_at)
      );
      return moment.max(dates).format("MMMM DD, YYYY");
    },
    isObservationAvailable(encounter, observation) {
      if (encounter) {
        let obs = encounter.body.observations.find((item) => {
        if (item && item.body.type == observation) {
          return item;
        }
      });
      }

      return obs;
    },
    getDate(encounter) {
      let date = "";
      if (encounter.meta.created_at) {
        date = moment(encounter.meta.created_at).format("Do MMMM YYYY");
      }
      return date;
    },
    onClickAccordion(followup, index) {
      this.showIcon = !this.showIcon;
    },
    getUser(encounter) {
      let user = {};
      if (encounter.meta.collected_by) {
        user = this.users.find(
          (user) => user.uid == encounter.meta.collected_by
        );
      }
      return user.name || "";
    },

    getLastReport() {
      let loader = this.$loading.show();
      this.$http
        .get("/health-reports/patient/" + this.patientId + "?filter=last")
        .then(
          (response) => {
            loader.hide();
            if (response.status == 200) {
              this.report = response.data.data;
              console.log(this.report, 'last report');
            }
          },
          (error) => {
            loader.hide();
          }
        );
    },

    getReports() {
      let loader = this.$loading.show();
      this.$http.get("/health-reports/patient/" + this.patientId).then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            // console.log(response, 'resp');
            this.reports = response.data.data;
            console.log(this.reports, 'reports');
            if (this.reports && this.reports.length > 0) {
              this.currentAssessment = this.reports[this.reports.length - 1];
            }
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },

    getUsers() {
      this.$http.get("/users").then(
        (response) => {
          if (response.status == 200) {
            this.users = response.data;
          }
        },
        (error) => {}
      );
    },

    getCount() {
      let goals = this.groupedCareplans.length;
      let actions = 0;
      this.groupedCareplans.forEach((careplan) => {
        careplan.items.forEach((item) => {
          if (item.meta.status == "pending") {
            actions += 1;
          }
        });
      });

      return goals + " goals & " + actions + " actions";
    },
    getPatients() {
      let loader = this.$loading.show();
      this.$http.get("/patients/" + this.patientId).then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            this.patient = response.data.data;
            console.log(this.patient)
            // console.log(this.patient, 'patient')
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },

    getLastEncounter() {
      this.$http.get("/assessments/patients/" + this.patientId + "/last").then(
        (response) => {
          if (response.status == 200) {
            this.lastEncounter = response.data.data;
          }
        },
        (error) => {}
      );
    },

    getEncounter() {
      this.$http.get("/assessments/" + this.encounterId).then(
        (response) => {
          if (response.status == 200) {
            this.encounter = response.data.data;
          }
        },
        (error) => {}
      );
    },

    getObservations() {
      let loader = this.$loading.show();
      let encounters = this.encounters;
      this.$http.get("/assessments/" + this.encounterId + "/observations").then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            this.observations = response.data.data;
            // console.log('observations');
            console.log('observations ', this.observations);

            if (this.observations) {
              this.observations.forEach((obs) => {
                let observation = obs.body;
                if (observation.type == 'survey') {
                  console.log('survey')
                  if (observation.data.name == 'medical_history') {
                    console.log('medical_history')
                    this.details.diabetes = observation.data.diabetes || 'N/A';
                    this.details.hypertension = observation.data.hypertension || 'N/A';
                    this.details.stroke = observation.data.stroke || 'N/A';
                    this.details.asthma = observation.data.asthma || 'N/A';
                    this.details.heart_attack = observation.data.heart_attack || 'N/A';
                    this.details.cancer = observation.data.cancer || 'N/A';
                    this.details.kidney_disease = observation.data.kidney_disease || 'N/A';
                  }
                  else if (observation.data.name == 'risk_factors') {
                    console.log('risk_factors')
                    this.details.smoking = observation.data.smoking || 'N/A';
                    this.details.smokeles_tobacco = observation.data.smokeles_tobacco || 'N/A';
                    this.details.extra_salt = observation.data.extra_salt || 'N/A';
                    this.details.sugar = observation.data.sugary_drinks || 'N/A';
                    this.details.processed_foods = observation.data.processed_foods || 'N/A';
                    this.details.physical_activity_moderate = observation.data.physical_activity_moderate || 'N/A';
                    this.details.alcohol = observation.data.alcohol || 'N/A';
                  }
                  else if (observation.data.name == 'medication') {
                    console.log('medication')
                    this.details.hypertension_medication = observation.data.hypertension_medication;
                    this.details.hypertension_medication_regular = observation.data.hypertension_medication_regular || 'N/A';
                  }
                }
                else if (observation.type == 'blood_pressure') {
                  console.log('blood_pressure')
                  console.log(observation.data)
                  this.details.blood_pressure = {
                    value: observation.data.systolic + '/' + observation.data.diastolic,
                    date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                  };
                  console.log(this.details.blood_pressure)
                }
                else if (observation.type == 'blood_test') {
                  console.log('blood_test')
                  if (observation.data.name == 'blood_sugar' && observation.data.type != 'fasting') {
                    this.details.random_blood_sugar = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == 'blood_sugar' && observation.data.type == 'fasting') {
                    
                    this.details.fasting_blood_sugar = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == '2habf') {
                    this.details.habf = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == 'a1c') {
                    this.details.a1c = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == 'total_cholesterol') {
                    this.details.serum = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == 'triglycerides') {
                    this.details.tg = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == 'hdl') {
                    this.details.hdl = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == 'ldl') {
                    this.details.ldl = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == 'hdl') {
                    this.details.hdl = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == 'sodium') {
                    this.details.sodium = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == 'potassium') {
                    this.details.potassium = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == 'ketones') {
                    this.details.ketones = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == 'protein') {
                    this.details.protein = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == 'creatinine') {
                    this.details.creatinine = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                }
                else if (observation.type == 'body_measurement') {
                  if (observation.data.name == 'height') {
                    console.log('asdkjsakdj')
                    this.details.height = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  else if (observation.data.name == 'weight') {
                    this.details.weight = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    }
                  }
                  
                }
              });
            }
            
          }
          this.$forceUpdate();

        },
        (error) => {}
      );
    },

    getObservationsForPatientDetails() {
      let loader = this.$loading.show();
      let encounters = this.encounters;
      this.$http.get("/patients/" + this.patientId + "/observations/patient-details").then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            this.observations = response.data.data;
            // console.log('observations');
            // console.log(this.observations[0]);
            // if (encounters && this.observations) {
            
          }

          if (this.encounters.length > 0) {
            this.currentEncounter = this.encounters[0];
            if (this.encounters.length > 1) {
              this.previousEncounter = this.encounters[1];
            } else {
              this.previousEncounter = this.currentEncounter;
            }

            // console.log(this.$route);
            if (this.$route.query.encounter) {
              // this.currentEncounter = this.encounters[0];
              let matchedEncounter = this.encounters.find(item => item.id == this.$route.query.encounter);
              if (matchedEncounter) {
                this.currentEncounter = matchedEncounter;
                this.previousEncounter = this.encounters[this.encounters.indexOf(matchedEncounter) - 1];
                // console.log(this.previousEncounter)
                // if () {

                // }
                document.getElementById("three-tab").click();
              }

            }


          }
        },
        (error) => {}
      );
    },

    getMedications() {
      let ob = this.observations.find((o) => {
        if (o) {
          return (
          o.body.type === "survey" && o.body.data.name === "current_medication"
        );
        }
      });

      if (ob) {
        return ob.body.data.medications.join(", ");
      }
    },

    getAllergies() {
      let ob = this.observations.find((o) => {
        if (o) {
          return (
          o.body.type === "survey" &&
          o.body.data.name === "medical_history" &&
          o.body.data.allergies === "yes"
        );
        }
        
      });

      if (ob) {
        return ob.body.data.allergy_types.join(", ");
      }
    },

    prepareCarePlans() {
      this.carePlans.forEach((item) => {
        if (item) {
          let existdCp = this.groupedCareplans.find(
          (cp) => cp.id == item.body.goal.id
        );
        if (!existdCp) {
          let items = [];
          items.push(item);
          this.groupedCareplans.push({
            items: items,
            title: item.body.goal.title,
            id: item.body.goal.id,
          });
        } else {
          this.groupedCareplans[
            this.groupedCareplans.indexOf(existdCp)
          ].items.push(item);
        }
        }
        
        
      });
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
    getHistory() {
      this.$http.get("/patients/" + this.patientId + "/history").then(
        (response) => {
          if (response.status == 200) {
            this.history = response.data.data.patient_history;
          }
        },
        (error) => {}
      );
    },
    getFollowups() {
        this.$http.get("/patients/" + this.patientId + '/followups', ).then(
        response => {
            if (response.status == 200) {
            this.followups = response.data.data.length ? response.data.data[response.data.data.length-1]: null;
            console.log(this.followups, 'follow')
            }
        },
        error => {

      });
    },
    prepareSurveyData(observations) {
      let medicalHistory = []
      if (observations) {
        observations.forEach((obs) => {
          if (
            obs &&
            obs.body.patient_id == this.patientId &&
            obs.body.type == "survey"
          ) {
            
            if (obs.body.data) {
              Object.keys(obs.body.data).forEach((key) => {
                if (obs.body.data[key] == "yes") {
                  if (!medicalHistory.includes(key.replace(/_/g, " "))) {
                    medicalHistory.push(key.replace(/_/g, " "));
                  }
                }
              });
            }
          }
        });
        
      }
      return medicalHistory;
    }
  },
  created() {},

  mounted() {
    this.patientId = this.$route.params.patientId;
    this.encounterId = this.$route.params.encounterId;
    this.getEncounter();
    this.getObservations();
    this.prepareBpConditions();
    this.scrollToTop();
    // this.getCarePlans();
    // this.getLastEncounter();
  },
};
</script>

<style lang="scss">
.patient-overview {
  .patient-history {
    .timeline-wrapper {
      margin-left: 25px;
      .timeline-border {
        position: absolute;
        border-left: 1.5px solid #01579b;
        height: 115px;
        left: -20px;
        top: 40px;
      }
      .icon-wrapper {
        top: 30px;
        left: -30px;
      }
      .timeline-data {
        .title {
          margin-bottom: 0;
        }
      }
    }
  }
}
.patient-summary {
    .card {
    //   border-color: red;
    border: 1px solid #C4C4C4;
    border-radius: 0;
    th {font-size: 18px;}

      .card-header {
        border-radius:  0;
        // height: 35px;
        font-size: 20px;
        padding: 5px 15px;
        color: #fff;
        &.patient-info {
          background-color: #489CFC;
        }
      }
    }
    .sub-title {
      font-size: 16px;
      background-color: #d2e1ff;
      padding: 7px 15px;
      width: fit-content;
      margin: 10px 0 0 10px;
    }
    .custom-title {
        font-size: 20px;
        padding: 0.75rem;
        margin-bottom: 0;
    }
    .txt-red{color: #f72b34}
    .txt-success{color: #00b0a6}
    table {
        td {padding: 0.1rem .75rem}
    }
    .add-note{
      border-radius: 0 !important;
      text-align: right;
      margin: 0 10px 10px auto;
          padding: 5px 15px;
    }
    .td-grey {background: #e6e6e6;}
    .td-border-bottom {
        border: 4px solid white;
    }
  .card-red-header {
    border-color: #FF5959 !important;
    .card-header {
        background-color: #FF5959 !important;
        color:  #fff;
        &:first-child {
          border-radius: 0;
        }
    }
  }

  .card-blue-header {
    border-color: #489CFC !important;
    .card-header {
        background-color: #489CFC !important;
        color:  #fff;
        &:first-child {
          border-radius: 0;
        }
    }
  }
  .btn-cust {
    border-radius: 0;
    padding: 5px 15px;
    background-color: #d2e1ff;
    border: 1px solid #648dc3;
    color: #01579B;
  }
  .patient-summary__action a:first-of-type {
    margin-right: 20px;
  }
 .patient-summary__action a {
    display: block;
    width: 100%;
  }
}
</style>
