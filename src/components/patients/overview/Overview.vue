<template>
  <div class="content patient-overview">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i
            class="fa fa-arrow-left text-secondary back-icon"
            @click="$router.go(-1)"
          ></i>
          <div class="">
            <h4>Patient Overview</h4>
          </div>
        </div>
      </div>

      <div class="row ml-3">
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
                  class="form-control my-0 py-1 border-left-0 form-control-search"
                  type="text"
                  placeholder="Patient Name, NID"
                  aria-label="Search"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span>All Patients</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6 text-right">
          <button
            class="btn btn-primary mr-3"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span>Create New Encounter</span>
          </button>
        </div>
      </div>

      <div v-if="patient" class="row">
        <div class="col-lg-12">
          <div class="encounter-stats">
            <div class="card mt-3 tab-card">
              <div class="card-header tab-card-header">
                <ul
                  class="nav nav-tabs card-header-tabs"
                  id="myTab"
                  role="tablist"
                >
                  <li class="nav-item">
                    <a
                      @click="onTabClick()"
                      class="nav-link active"
                      id="one-tab"
                      data-toggle="tab"
                      href="#one"
                      role="tab"
                      aria-controls="One"
                      aria-selected="true"
                      >Patient Chart</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      @click="onTabClick()"
                      class="nav-link"
                      id="two-tab"
                      data-toggle="tab"
                      href="#two"
                      role="tab"
                      aria-controls="Two"
                      aria-selected="false"
                      >All Encounters</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      @click="onTabClick()"
                      class="nav-link"
                      id="three-tab"
                      data-toggle="tab"
                      href="#three"
                      role="tab"
                      aria-controls="Two"
                      aria-selected="false"
                      >Current Encounters</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      @click="onTabClick()"
                      class="nav-link"
                      id="three-tab"
                      data-toggle="tab"
                      href="#four"
                      role="tab"
                      aria-controls="Three"
                      aria-selected="false"
                      >All Assessment</a
                    >
                  </li>

                  <li class="nav-item">
                    <a
                      @click="onTabClick()"
                      class="nav-link"
                      id="five-tab"
                      data-toggle="tab"
                      href="#five"
                      role="tab"
                      aria-controls="Five"
                      aria-selected="false"
                      >Current Assessment</a
                    >
                  </li>

                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="four-tab"
                      data-toggle="tab"
                      href="#six"
                      role="tab"
                      aria-controls="Three"
                      aria-selected="false"
                      >History</a
                    >
                  </li>
                </ul>
              </div>

              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active p-3"
                  id="one"
                  role="tabpanel"
                  aria-labelledby="one-tab"
                >
                  <patient-chart
                    v-if="report && dataLoaded"
                    :patient="patient"
                    :report="report"
                    :observations="observations"
                    :currentEncounter="currentEncounter"
                  ></patient-chart>
                </div>
                <div
                  class="tab-pane fade p-3"
                  id="two"
                  role="tabpanel"
                  aria-labelledby="three-tab"
                >
                  <all-encounters
                    v-if="encounters"
                    :encounters="encounters"
                    :users="users"
                    :patientId="patientId"
                    :lastReport="currentAssessment"
                    @goToEncounterDetails="goToEncounterDetails"
                  ></all-encounters>
                </div>
                <div
                  class="tab-pane fade p-3"
                  id="three"
                  role="tabpanel"
                  aria-labelledby="two-tab"
                >
                  <current-encounter
                    v-if="observations && encounters.length"
                    :currentEncounterParent="encounters[encounters.length-1]"
                    :previousEncounterParent="previousEncounter"
                    :users="users"
                    :patientId="patientId"
                    :lastReport="currentAssessment"
                  ></current-encounter>
                </div>

                <div
                  class="tab-pane fade p-3"
                  id="four"
                  role="tabpanel"
                  aria-labelledby="four-tab"
                >
                  <all-assessments
                    v-if="reports"
                    :reports="reports"
                    :encounters="encounters"
                    :users="users"
                    :patientId="patientId"
                    @goToAssessmentDetails="goToAssessmentDetails"
                  ></all-assessments>
                </div>

                <div
                  class="tab-pane fade p-3"
                  id="five"
                  role="tabpanel"
                  aria-labelledby="two-tab"
                >
                  <current-assessment
                    v-if="observations"
                    :assessment="currentAssessment"
                    :users="users"
                    :patientId="patientId"
                  ></current-assessment>
                </div>

                <div
                  class="tab-pane fade p-3"
                  id="six"
                  role="tabpanel"
                  aria-labelledby="four-tab"
                >
                  <history v-if="history" :reports="reports" :history="history" :users="users" :patientId="patientId"></history>
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
// @ is an alias to /src
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";
import LineChart from "./LineChart.js";
import PatientChart from "./PatientChart";
import AllEncounters from "./AllEncounters";
import CurrentEncounter from "./CurrentEncounter";
import AllAssessments from "./AllAssessments";
import CurrentAssessment from "./CurrentAssessment";
import History from "./History";

export default {
  name: "patients",
  components: {
    VueJsonPretty,
    LineChart,
    PatientChart,
    AllEncounters,
    CurrentEncounter,
    AllAssessments,
    CurrentAssessment,
    History,
  },
  data() {
    return {
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
      dataLoaded: false
    };
  },
  computed: {},
  methods: {
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
      let obs = encounter.body.observations.find((item) => {
        if (item.body.type == observation) {
          return item;
        }
      });

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
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },
    getCarePlans() {
      this.$http.get("/care-plans/patient/" + this.patientId).then(
        (response) => {
          if (response.status == 200 && !response.data.error && response.data.error === false) {
            // console.log(response, 'carePlans');
            this.carePlans = response.data.data;
            // console.log(this.carePlans, 'carePlans');
            this.prepareCarePlans();
          }
        },
        (error) => {}
      );
    },

    getEncounters() {
      this.$http.get("/patients/" + this.patientId + "/assessments").then(
        (response) => {
          if (response.status == 200) {
            this.encounters = response.data.data;

            this.encounters = this.encounters.sort(
              (a, b) =>
                new Date(b.meta.created_at) - new Date(a.meta.created_at)
            );

            this.getObservations();
          }
        },
        (error) => {}
      );
    },

    getObservations() {
      let loader = this.$loading.show();
      let encounters = this.encounters;
      this.$http.get("/patients/" + this.patientId + "/observations").then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            this.observations = response.data.data;
            // console.log('observations');
            // console.log(this.observations[0]);
            encounters.forEach((encounter, index) => {
              this.observations.forEach((obs) => {
                if (obs.body.assessment_id == encounter.id) {
                  if (this.encounters[index].body.observations) {
                    this.encounters[index].body.observations.push(obs);
                  } else {
                    this.encounters[index].body.observations = [];
                    this.encounters[index].body.observations.push(obs);
                  }

                }
              });

              this.dataLoaded = true;
            });
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
        return (
          o.body.type === "survey" && o.body.data.name === "current_medication"
        );
      });

      if (ob) {
        return ob.body.data.medications.join(", ");
      }
    },

    getAllergies() {
      let ob = this.observations.find((o) => {
        return (
          o.body.type === "survey" &&
          o.body.data.name === "medical_history" &&
          o.body.data.allergies === "yes"
        );
      });

      if (ob) {
        return ob.body.data.allergy_types.join(", ");
      }
    },

    prepareCarePlans() {
      this.carePlans.forEach((item) => {
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
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.getPatients();
    this.getCarePlans();
    this.getEncounters();
    this.getUsers();
    this.getLastReport();
    this.getReports();
    this.getHistory();
  },
};
</script>

<style lang="scss">
.lifestyle-card {
  border: 1px solid #095293 !important;
  padding: 13px;
  .lifestyle-item {
    border: 1px solid #095293;
    border-radius: 3px;
    padding: 4px 11px;
    margin-top: 10px;
    .title {
      img {
        margin-right: 20px;
      }
      span {
        font-weight: 600;
        font-size: 17px;
      }
    }
  }

  .lifestyle-item:first-child {
    margin-top: 0px;
  }
}
.patient-card {
  border: 1px solid #095293 !important;
  .header {
    border-bottom: none;
  }
}

.summary-card {
  border: 1px solid #095293 !important;
  height: 100%;
  td {
    width: 200px;
  }
}
.encounter-details {
  .card-big,
  .card-small {
    border: 1px solid #1765ab !important;

    table {
      width: 300px;
    }
  }
  .previous-encounter {
    border: 1px solid grey;
    border-radius: 3px;
    padding: 10px;

    .observation-icons img {
      margin-right: 10px;
    }
  }
}

.observation-icons {
  span {
    font-size: 12px;
  }
}
</style>
