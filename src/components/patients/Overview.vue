<template>
  <div class="content patient-overview">
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex breadcrumb-wrap">
        <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
        <div v-if="patient">
          <h4>Patient Overview</h4>
          <div class="breadcrumb">
            <span>Patients</span>
            / {{ patient.body.first_name + " " + patient.body.last_name }}
          </div>
        </div>
      </div>

      <div v-if="patient" class="col-lg-12 border-top border-bottom">
        <div class="patient">
          <div class="patient-image mr-4">
            <img
              v-if="patient.body.avatar"
              :src="patient.body.avatar"
              class="rounded-circle img-fluid"
              width="100"
              height="100"
              :alt="patient.body.first_name"
              onerror="this.src='data:image/png;base64,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'"
            />
            <img
              v-else
              src="../../assets/images/avatar/dummy-man-570x570.png"
              class="rounded-circle img-fluid"
              width="100"
              height="100"
              alt
            />
          </div>
          <div class="patient-details">
            <div class="patient-name">{{ patient.body.first_name + " " + patient.body.last_name }}</div>
            <div class="info">
              <div
                class="info-age text-capitalize"
              >{{ patient.body.age }} Y {{ patient.body.gender }}</div>

              <div class="info-icon back-RED">
                <img src="../../assets/images/fruit.png" alt />
              </div>
              <div class="info-icon back-RED">
                <img src="../../assets/images/vegetables.png" alt />
              </div>
              <div class="info-icon back-AMBER">
                <img src="../../assets/images/activity.png" alt />
              </div>
            </div>
            <div class="assessment-pills">
              <div
                v-if="patient.body.assessments && patient.body.assessments.body_composition.components.bmi"
                class="pill-item"
                :class="patient.body.assessments.body_composition.components.bmi.tfl + ' border-' + patient.body.assessments && patient.body.assessments.body_composition.components.bmi.tfl"
              >BMI</div>
              <div
                v-if="patient.body.assessments && patient.body.assessments.blood_pressure"
                class="pill-item"
                :class="patient.body.assessments.blood_pressure.tfl + ' border-' + patient.body.assessments.blood_pressure.tfl"
              >BP</div>
              <div
                v-if="patient.body.assessments && patient.body.assessments.cvd"
                class="pill-item"
                :class="patient.body.assessments.cvd.tfl + ' border-' + patient.body.assessments.cvd.tfl"
              >CVD RISK</div>
              <div
                v-if="patient.body.assessments && patient.body.assessments.cholesterol.components.total_cholesterol"
                class="pill-item"
                :class="patient.body.assessments.cholesterol.components.total_cholesterol.tfl + ' border-' + patient.body.assessments.cholesterol.components.total_cholesterol.tfl"
              >Cholesterol</div>
            </div>
          </div>
        </div>
      </div>

      <div class="row px-4 pt-4 pb-3 border-bottom-thick">
        <div class="col-12">
          <table class="summary" v-if="encounters.length > 0">
            <tr>
              <td>Last Encounter on:</td>
              <td>{{ getLastEncounterDate() }}</td>
            </tr>
            <tr>
              <td>Next assessment due on:</td>
              <td>June 15, 2020</td>
            </tr>
            <tr>
              <td>Current Conditions:</td>
              <td>Hypertension, Diabetes</td>
            </tr>
            <tr>
              <td>Allergies:</td>
              <td>Pollen</td>
            </tr>
            <tr>
              <td>Medications:</td>
              <td>{{ getMedications()}}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="row px-4 pt-4 pb-5 border-bottom-thick">
        <div class="col-12">
          <div class="care-plans">
            <div class="header pb-3 w-100 d-flex justify-content-between">
              <h5 class>Care Plan Actions</h5>
              <div>
                <a class="btn-careplan mr-2" @click.prevent="showFHIR(patientId)" href="#">Show FHIR</a>
                <router-link
                  tag="a"
                  :to="{ name: 'patientCarePlans', params: { patientId: patientId } }"
                  class="btn-careplan"
                >View Care Plan</router-link>
              </div>
            </div>
            <div class="accordion" id="accordionCareplan">
              <div class="card">
                <div class="card-header d-flex justify-content-between" id="headingOne">
                  <button
                    @click="onClickAccordion()"
                    class="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#careplanCollapse"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    <i v-if="showIcon" class="fas fa-chevron-down pr-4"></i>
                    <i v-else class="fas fa-chevron-up pr-4"></i>
                    <span class="card-header-text">Due Today</span>
                  </button>
                  <span class="count">{{ getCount() }}</span>
                </div>

                <div
                  id="careplanCollapse"
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionCareplan"
                >
                  <div class="card-body">
                    <div v-if="groupedCareplans.length > 0" class="careplan-details">
                      <template v-for="(careplan, index) in groupedCareplans">
                        <div class="careplan-item" :key="index">
                          <span class="title">{{ careplan.title }}</span>
                          <template v-for="(action, index) in careplan.items">
                            <div
                              v-if="action.meta.status == 'pending'"
                              class="actions"
                              :key="index"
                            >
                              <router-link
                                tag="a"
                                :to="{ name: 'carePlanAction', params: { carePlanId: action.id }}"
                                class="d-flex justify-content-between"
                              >
                                <span>{{ action.body.title }}</span>
                                <i class="fas fa-chevron-right"></i>
                              </router-link>
                              <!-- <a href="" class=" d-flex justify-content-between">
                                                                <span>{{ action.body.title }}</span>
                                                                <i class="fas fa-chevron-right"></i>
                              </a>-->
                            </div>
                          </template>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row px-4 pt-4 pb-3 border-bottom-thick">
        <div class="col-12">
          <div class="header pb-3 w-100 d-flex justify-content-between">
            <h5 class>Patient History</h5>
            <a href class="btn-careplan">
              <i class="fas fa-filter"></i>
            </a>
          </div>

          <div class="timeline-wrapper" v-if="encounters.length > 0">
            <div class="timeline">
              <div class="timeline-item" v-for="(encounter, index) in encounters" :key="index">
                <div class="icon-wrapper">
                  <div class="icon"></div>
                </div>
                <div class="triangle-box"></div>
                <div class="timeline-data">
                  <div class="date">{{ getDate(encounter)}}</div>
                  <div class="title text-capitalize">Follow-up Encounter: {{ encounter.body.type }}</div>
                  <div class="doctor" v-if="users.length > 0">
                    <img
                      src="../../assets/images/avatar/dummy-man-570x570.png"
                      class="rounded-circle img-fluid"
                      width="30"
                      height="30"
                      alt
                    />
                    <span>{{ getUser(encounter) }}</span>
                  </div>
                  <div v-if="encounter.body.observations" class="observation-icons">
                    <img
                      v-if="isObservationAvailable(encounter, 'survey')"
                      src="../../assets/images/questionnaire.png"
                      class
                    />
                    <img
                      v-if="isObservationAvailable(encounter, 'body_measurement')"
                      src="../../assets/images/body_measurements.png"
                      class
                    />
                    <img
                      v-if="isObservationAvailable(encounter, 'blood_pressure')"
                      src="../../assets/images/blood_pressure_sm.png"
                      class
                    />
                    <img
                      v-if="isObservationAvailable(encounter, 'blood_test')"
                      src="../../assets/images/blood_test.png"
                      class
                    />
                  </div>

                  <!-- <div class="assessment-pills pb-2">
                                        
                                        <div class="pill-item RED border-RED">BMI</div>
                                        <div class="pill-item RED border-RED">BP</div>
                                        <div class="pill-item RED border-RED">CVD RISK</div>
                                        <div class="pill-item AMBER border-AMBER">Cholesterol</div>
                                        
                  </div>-->
                  <br />

                  <router-link
                    :to="{name: 'observations', params:{patientId: patientId, encounterId: encounter.id}}"
                    tag="a"
                    class="view"
                  >View Encounter Details</router-link>

                  <!-- <a href="view"> View Encounter Details</a> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="col-lg-12 border-bottom">
                <div class="patient-edit">
                    <router-link class="edit" :to="{ name: 'editPatient', params: { patientId: patientId} }"><i class="fas fa-pen"></i>View/Edit Patient Details</router-link>
                    <div class="care-plane">
                        <router-link tag="a" :to="{ name: 'patientCarePlans', params: { patientId: patientId } }"><i
                                class="fas fa-user-check"></i>Care Plan
                        </router-link>
                    </div>
                    <div class="action"><i class="fas fa-circle"></i>{{ carePlans ? carePlans.length : 0 }} Actions Pending</div>
                </div>
      </div>-->

      <!-- <div class="row">
                <div class="col-lg-12">
                    <div class="patient-overview-content">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="content-header">
                                            <div class="title">Encounter</div>
                                            <div class="content-date">Last encounter on Jan 5, 2019</div>
                                        </div>
                                        <div class="content-body">
                                            <div class="create">
                                                <span><i class="fas fa-plus"></i></span>
                                                <router-link :to="{ name: 'encounterCreate', params: { patientId: patientId }}">Create Encounters</router-link>
                                            </div>
                                            <div class="view">
                                                <span><i class="fas fa-eye"></i></span>
                                                <router-link :to="{ name: 'pastEncounterList', params: { patientId: patientId }}">View Past Encounters</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="content-header">
                                            <div class="title">Health Reports</div>
                                            <div class="content-date">Last assessment on Jan 5, 2019</div>
                                        </div>
                                        <div class="content-body">
                                            <div class="create">
                                                <span><i class="fas fa-plus"></i></span>
                                                <router-link :to="{ name: 'newHealthAssessment', params: { patientId: patientId }}">Create a New Health Report</router-link>
                                            </div>
                                            <div class="view">
                                                <span><i class="fas fa-eye"></i></span>
                                                <router-link :to="{ name: 'pastHealthAssessment', params: { patientId: patientId }}">View Past Health Reports</router-link>
                                            </div>
                                            <div class="subtitle mt-2"> <i class="fas fa-circle"></i>Pending Recommendation</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="patient-condition">
                        <div class="card mb-4">
                            <div class="card-body">
                                <div class="content-header">
                                    <div class="title">Existing Conditions</div>
                                </div>
                                <div class="content-body">
                                    <div class="create">
                                        <p>Diabetes</p>
                                    </div>
                                    <div class="view">
                                        <p>Hypertension</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
      </div>-->

      <b-modal id="fhir-modal" class="modal-header" size="xl">
        <template v-slot:modal-header>
          <span class="title">Healthcare FHIR Resources</span>
        </template>
        <div class="data">
          <vue-json-pretty :path="'res'" :data="data"></vue-json-pretty>
        </div>

        <template v-slot:modal-footer>
          <div class="w-100">
            <b-button
              variant="link"
              size="md"
              class="float-right font-weight-bold p-0"
              @click="$bvModal.hide('fhir-modal')"
            >Cancel</b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";

export default {
  name: "patients",
  components: {
    VueJsonPretty
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
      users: [],
      report: null,
      data: [],
      observations: []
    };
  },
  methods: {
    showFHIR(id) {
      let loader = this.$loading.show();
      this.$http.get("/care-plans/fhir/" + this.patientId).then(
        response => {
          loader.hide();
          if (response.status == 200) {
            this.data = response.data.data;

            this.$bvModal.show("fhir-modal");
          }
        },
        error => {
          loader.hide();
        }
      );
    },
    getLastEncounterDate() {
      let dates = this.encounters.map(encounter =>
        moment(encounter.meta.created_at)
      );
      return moment.max(dates).format("MMMM DD, YYYY");
    },
    isObservationAvailable(encounter, observation) {
      let obs = encounter.body.observations.find(item => {
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
        user = this.users.find(user => user.uid == encounter.meta.collected_by);
      }
      return user.name || "";
    },

    getLastReport() {
      let loader = this.$loading.show();
      this.$http
        .get("/health-reports/patient/" + this.patientId + "?filter=last")
        .then(
          response => {
            loader.hide();
            if (response.status == 200) {
              this.report = response.data.data;
              // console.log(this.report);
            }
          },
          error => {
            loader.hide();
          }
        );
    },

    getUsers() {
      this.$http.get("/users?role=nurse,doctor,chw").then(
        response => {
          if (response.status == 200) {
            this.users = response.data;
          }
        },
        error => {}
      );
    },

    getCount() {
      let goals = this.groupedCareplans.length;
      let actions = 0;
      this.groupedCareplans.forEach(careplan => {
        careplan.items.forEach(item => {
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
        response => {
          loader.hide();
          if (response.status == 200) {
            this.patient = response.data.data;
          }
        },
        error => {
          loader.hide();
        }
      );
    },
    getCarePlans() {
      this.$http.get("/care-plans/patient/" + this.patientId).then(
        response => {
          if (response.status == 200) {
            this.carePlans = response.data.data;
            this.prepareCarePlans();
          }
        },
        error => {}
      );
    },

    getEncounters() {
      this.$http.get("/patients/" + this.patientId + "/assessments").then(
        response => {
          if (response.status == 200) {
            this.encounters = response.data.data;

            this.getObservations();
          }
        },
        error => {}
      );
    },

    getObservations() {
      let loader = this.$loading.show();
      let encounters = this.encounters;
      this.$http.get("/patients/" + this.patientId + "/observations").then(
        response => {
          loader.hide();
          if (response.status == 200) {
            this.observations = response.data.data;

            encounters.forEach((encounter, index) => {
              this.encounters[index].body.observations = this.observations;
              // this.$http.get("/patients/" + this.patientId + "/observations").then(
              //   response => {
              //     loader.hide();
              //     if (response.status == 200) {
              //       this.encounters[index].body.observations = response.data.data;
              //     }
              //   },
              //   error => {}
              // );
            });
          }
        },
        error => {}
      );
    },

    getMedications() {
        let ob = this.observations.find(o => {
          return o.body.type === 'survey' && o.body.data.name === 'current_medication';
        });
        
        if (ob) {
          return ob.body.data.medications.join(", ");
        }
    },

    prepareCarePlans() {
      this.carePlans.forEach(item => {
        let existdCp = this.groupedCareplans.find(
          cp => cp.id == item.body.goal.id
        );
        if (!existdCp) {
          let items = [];
          items.push(item);
          this.groupedCareplans.push({
            items: items,
            title: item.body.goal.title,
            id: item.body.goal.id
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
      let id = identifier.find(x => x.use === type);

      if (id) {
        return id.value;
      }
      return "";
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.getPatients();
    this.getCarePlans();
    this.getEncounters();
    this.getUsers();
    this.getLastReport();
  }
};
</script>

<style lang="">
</style>
