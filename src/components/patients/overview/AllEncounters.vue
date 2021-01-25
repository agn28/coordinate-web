<template>
  <div>
    <div class="encounter-details">
      <div class="row">
        <div class="col-sm-8"></div>
      </div>
    </div>

    <div class="timeline-wrapper" v-if="encounters.length > 0">
      <div class="timeline">
        <div class="row">
          <div
            class="col-lg-4 timeline-item"
            v-for="(encounter, index) in encounters"
            :key="index"
          >
            <div class="timeline-data bg-white">
              <div class="date">{{ getDate(encounter) }}</div>
              <div class="title text-capitalize">
                Follow-up Encounter: 
              </div>
              <div class="doctor" v-if="users.length > 0">
                <img
                  src="../../../assets/images/avatar/dummy-man-570x570.png"
                  class="rounded-circle img-fluid"
                  width="30"
                  height="30"
                  alt
                />
                <span>{{ getUser(encounter) }}</span>
              </div>

              <div class="observation-icons">
                <div class="row">
                  <div v-if="isObservationAvailable(encounter, 'body_measurement')" class="col-sm-3">
                    <img
                      
                      src="../../../assets/images/body_measurements_.png"
                      class
                    />
                    <br>
                    <span>Body Measurement</span>
                  </div>

                  <div v-if="isObservationAvailable(encounter, 'blood_pressure')" class="col-sm-3">
                    <img
                      src="../../../assets/images/blood_pressure_.png"
                      class
                    />
                    <br>
                    <span>Blood Pressure</span>
                  </div>

                  <div v-if="isObservationAvailable(encounter, 'blood_test')" class="col-sm-3">
                    <img
                      src="../../../assets/images/blood_test_.png"
                      class
                    />
                    <br>
                    <span>Blood Test</span>
                  </div>

                  <div v-if="isObservationAvailable(encounter, 'survey')" class="col-sm-3">
                    <img
                      src="../../../assets/images/medical_history_.png"
                      class
                    />
                    <br>
                    <span>Medical History</span>
                  </div>

                </div>
                
              </div>

              <!-- <div class="assessment-pills pb-2">
                                                
                  <div class="pill-item RED border-RED">BMI</div>
                  <div class="pill-item RED border-RED">BP</div>
                  <div class="pill-item RED border-RED">CVD RISK</div>
                  <div class="pill-item AMBER border-AMBER">Cholesterol</div>
                                                
              </div>-->
              <br />

              <div class="float-right"></div>
              <button
                @click="encounterDetails(encounter)"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
                class="btn btn-light float-right"
                >View Encounter Details
                <i class="fas fa-arrow-right"></i
              ></button>

              <!-- <router-link
                :to="{
                  name: 'observations',
                  params: {
                    patientId: patientId,
                    encounterId: encounter.id,
                  },
                }"
                tag="a"
                class="view float-right"
                >View Encounter Details
                <i class="fas fa-arrow-right"></i
              ></router-link> -->

              <!-- <a href="view"> View Encounter Details</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
              <h4 v-if="currentEncounterParent" class="modal-title" id="myLargeModalLabel">Follow-Up Encounter: {{ currentEncounterParent.body.type }}</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="encounter-details" v-if="currentEncounterParent">
                <div class="row">
                  <div class="col-sm-8">
                    <div class="card p-2 card-big">
                      <h6 class="mb-1">Encounter type: </h6>
                      <p class="mb-1">{{ currentEncounterParent.body.type }}</p>
                      <!-- <table>
                        <tr v-if="getBp(currentEncounterParent.body.observations)">
                          <td @click="test()" class="text-secondary">Heart Rate:</td>
                          <td>{{ getBp(currentEncounterParent.body.observations).body.data.pulse_rate }}</td>
                        </tr>
                        <tr v-if="getBp(currentEncounterParent.body.observations)">
                          <td class="text-secondary">Blood Pressure:</td>
                          <td>{{ getBp(currentEncounterParent.body.observations).body.data.systolic + '/' + getBp(currentEncounterParent.body.observations).body.data.diastolic }}</td>
                        </tr>
                        <tr v-if="getHeight(currentEncounterParent.body.observations)">
                          <td class="text-secondary">Height:</td>
                          <td>{{ getHeight(currentEncounterParent.body.observations).body.data.value +' ' + getHeight(currentEncounterParent.body.observations).body.data.unit }}</td>
                        </tr>
                        <tr v-if="getWeight(currentEncounterParent.body.observations)">
                          <td class="text-secondary">Weight:</td>
                          <td>{{ getWeight(currentEncounterParent.body.observations).body.data.value +' ' + getWeight(currentEncounterParent.body.observations).body.data.unit }}</td>
                        </tr>
                      </table> -->
                    </div>

                    <div class="card p-2 card-big mt-3">
                      <h6 class="mb-1"> Performed by: </h6>
                      <p class="mb-1">{{ getUser(currentEncounterParent) }}</p>
                    </div>

                    <div class="card p-2 card-big mt-3">
                      <h6 class="mb-1"> Measurements performed: </h6>
                      <table class="ml-2">
                        <tr>
                          <td>Height:</td>
                          <td v-if="getHeight(currentEncounterParent.body.observations) && getHeight(currentEncounterParent.body.observations).body.data.value">{{ getHeight(currentEncounterParent.body.observations).body.data.value +' ' + getHeight(currentEncounterParent.body.observations).body.data.unit }}</td>
                          <td v-else>Not measured</td>
                        </tr>
                        <tr>
                          <td>Weight:</td>
                          <td v-if="getHeight(currentEncounterParent.body.observations) && getWeight(currentEncounterParent.body.observations).body.data.value">{{ getWeight(currentEncounterParent.body.observations).body.data.value +' ' + getWeight(currentEncounterParent.body.observations).body.data.unit }}</td>
                          <td v-else>Not measured</td>
                        </tr>
                        <tr>
                          <td>BMI:</td>
                          <td v-if="getHeight(currentEncounterParent.body.observations)">{{ getBp(currentEncounterParent.body.observations).body.data.pulse_rate }}</td>
                          <td v-else>Not measured</td>
                        </tr>
                        <tr>
                          <td>Blood Pressure:</td>
                          <td v-if="getHeight(currentEncounterParent.body.observations) && getBp(currentEncounterParent.body.observations).body.data.systolic && getBp(currentEncounterParent.body.observations).body.data.diastolic">{{ getBp(currentEncounterParent.body.observations).body.data.systolic + '/' + getBp(currentEncounterParent.body.observations).body.data.diastolic }}</td>
                          <td v-else>Not measured</td>
                        </tr>
                      </table>
                    </div>

                    <div class="card p-2 card-big mt-3">
                      <h6 class="mb-1"> Blood tests performed: </h6>
                      <table class="ml-2">
                        <tr>
                          <td>Random blood glucose:</td>
                          <td v-if="getHeight(currentEncounterParent.body.observations) && getHeight(currentEncounterParent.body.observations).body.data.value">{{ getHeight(currentEncounterParent.body.observations).body.data.value +' ' + getHeight(currentEncounterParent.body.observations).body.data.unit }}</td>
                          <td v-else>Not measured</td>
                        </tr>
                        <tr>
                          <td> Fasting blood glucose:</td>
                          <td v-if="getHeight(currentEncounterParent.body.observations) && getWeight(currentEncounterParent.body.observations).body.data.value">{{ getWeight(currentEncounterParent.body.observations).body.data.value +' ' + getWeight(currentEncounterParent.body.observations).body.data.unit }}</td>
                          <td v-else>Not measured</td>
                        </tr>
                        <tr>
                          <td>Total cholesterol:</td>
                          <td v-if="getHeight(currentEncounterParent.body.observations)">{{ getBp(currentEncounterParent.body.observations).body.data.pulse_rate }}</td>
                          <td v-else>Not measured</td>
                        </tr>
                        <tr>
                          <td>HbA1c:</td>
                          <td v-if="getBp(currentEncounterParent.body.observations) && getBp(currentEncounterParent.body.observations).body.data.systolic && getBp(currentEncounterParent.body.observations).body.data.diastolic">{{ getBp(currentEncounterParent.body.observations).body.data.systolic + '/' + getBp(currentEncounterParent.body.observations).body.data.diastolic }}</td>
                          <td v-else>Not measured</td>
                        </tr>
                      </table>
                    </div>

                    <div class="card p-2 card-big mt-3">
                      <h6 class="mb-1"> Medical History: </h6>
                      <table class="ml-2">
                        <tr>
                          <td>  1. Chest pain present: </td>
                          <td >No</td>
                        </tr>
                        <tr>
                          <td>  2. Stroke symptoms present: </td>
                          <td >No</td>
                        </tr>
                        <tr>
                          <td>  3. Diabetes history: </td>
                          <td v-if="medicalHistory.includes('diabetes')">YES</td>
                          <td v-else>NO</td>
                        </tr>
                        <tr>
                          <td>  4. Stroke history: </td>
                          <td >No</td>
                        </tr>
                        <tr>
                          <td>  5. Heart attack history: </td>
                          <td >No</td>
                        </tr>
                        <tr>
                          <td>  6. Asthma / COPD history: </td>
                          <td >No</td>
                        </tr>
                        <tr>
                          <td>  7. CKD history: </td>
                          <td >No</td>
                        </tr>
                        <tr>
                          <td>  8. Cancer history: </td>
                          <td >No</td>
                        </tr>
                        <tr>
                          <td>  9. Hypertension history: </td>
                          <td v-if="medicalHistory.includes('hypertension')">YES</td>
                          <td v-else>NO</td>
                        </tr>
                        <tr>
                          <td>  10. Hypertension medication: </td>
                          <td v-if="medicalHistory.includes('hypertension medicine')">YES</td>
                          <td v-else>NO</td>
                        </tr>
                        <tr>
                          <td>  11. Diabetes medication: </td>
                          <td >No</td>
                        </tr>
                        <tr>
                          <td>  12. Aspirin / Clopidergrol: </td>
                          <td >No</td>
                        </tr>
                        <tr>
                          <td>  13. Cholesterol medication: </td>
                          <td >No</td>
                        </tr>
                        <tr>
                          <td>  14. Regular medication: </td>
                          <td >No</td>
                        </tr>
                        <tr>
                          <td>  15. Current smoker? </td>
                          <td v-if="medicalHistory.includes('smoking')">YES</td>
                          <td v-else>NO</td>
                        </tr>
                        <tr>
                          <td>  16. Current smokeless tobacco? </td>
                          <td v-if="medicalHistory.includes('tobacco')">YES</td>
                          <td v-else>NO</td>
                        </tr>
                        <tr>
                          <td>  17. Fruits and vegetables? </td>
                          <td >No</td>
                        </tr>
                        <tr>
                          <td>  18. Processed foods? </td>
                          <td v-if="medicalHistory.includes('processed foods')">YES</td>
                          <td v-else>NO</td>
                        </tr>
                        <tr>
                          <td>  19. Sugary drinks? </td>
                          <td v-if="medicalHistory.includes('sugary drinks')">YES</td>
                          <td v-else>NO</td>
                        </tr>
                        <tr>
                          <td>  20.  Extra salt? </td>
                          <td v-if="medicalHistory.includes('extra salt')">YES</td>
                          <td v-else>NO</td>
                        </tr>
                        <tr>
                          <td>  21. Physical activity moderate? </td>
                          <td >No</td>
                        </tr>
                        <tr>
                          <td>  22. Physical activity high? </td>
                          <td v-if="medicalHistory.includes('physical activity high')">YES</td>
                          <td v-else>NO</td>
                        </tr>
                      </table>
                    </div>

                  </div>

                  <div class="col-sm-4">
                    <div class="card p-2 card-small">
                      <h6 class="mb-1">Date: </h6>
                      <p class="mb-1">{{ getDate(currentEncounterParent) }}</p>
                    </div>
                    <div class="card p-2 card-small mt-3">
                      <h6 class="mb-3">New diagnosis: </h6>
                      <p>None</p>
                      <!-- <div v-if="previousEncounterParent" class="previous-encounter bg-white">
                          <div class="date">{{ getDate(previousEncounterParent) }}</div>
                          <div class="mt-2 text-capitalize"><strong> Follow-up Encounter: {{ previousEncounterParent.body.type }}</strong></div>
                          <div class="doctor mt-3" v-if="users.length > 0">
                            <img
                              src="../../../assets/images/avatar/dummy-man-570x570.png"
                              class="rounded-circle img-fluid"
                              width="30"
                              height="30"
                              alt
                            />
                            <span class="pl-2">{{ getUser(previousEncounterParent) }}</span>
                          </div>
                          <br />

                          <div class="float-right">
                            
                          </div>
                          
                        
                      </div> -->

                    </div>

                    <div class="card p-2 card-small mt-3">
                      <h6 class="mb-3">New referral:  </h6>
                      <p v-if="lastReport.result.referrals.reasons">Yes, <span v-for="(item, index) in lastReport.result.referrals.reasons" :key="index" class="text-capitalize"> {{ getTitle(item.type) }}, </span></p>
                    </div>

                    <div class="card p-2 card-small mt-3">
                      <h6 class="mb-3">Existing diagnosis: </h6>
                      <p>None</p>
                    </div>

                    <div class="card p-2 card-small mt-3">
                      <h6 class="mb-1">Medication: </h6>
                      <p v-if="getMedications(currentEncounterParent.body.observations)" class="mb-1">{{ getMedications(currentEncounterParent.body.observations) }}</p>
                      <p class="mb-1" v-else>None</p>
                    </div>

                    <div class="card p-2 card-small mt-3">
                      <h6 class="mb-1">Allergies: </h6>
                      <p v-if="getAllergies(currentEncounterParent.body.observations)" class="mb-1">{{ getAllergies(currentEncounterParent.body.observations) }}</p>
                      <p class="mb-1" v-else>None</p>
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
// @ is an alias to /src
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";

export default {
  name: "patients",
  components: {
    VueJsonPretty,
  },
  props: ['encounters', 'users', 'patientId', 'lastReport'],
  data() {
    return {
      currentEncounterParent: null,
      previousEncounterParent: null,
      medicalHistory: [],
      medications: []
    };
  },
  computed: {

  },
  methods: {
    getTitle(title) {
            return title.replace('_', ' ');
    },
    encounterDetails(encounter) {
      console.log(encounter, 'enc');
      this.currentEncounterParent = encounter;
      // this.previousEncounterParent = this.encounters[this.encounters.indexOf(encounter) - 1];
      this.prepareSurveyData(encounter.body.observations)
      // this.$emit('goToEncounterDetails', encounter);
      // this.$router.replace({ name: "patientOverview", params: { patientId: this.patientId }, query: { encounter: encounter.id } })
    },
    isObservationAvailable(encounter, observation) {
      // console.log('encounter.body.observations');
      console.log('encounter.body.observations');
      // console.log(encounter.body);
      let obs;
      // if (encounter && encounter.body.observations != undefined) {
      //   obs = encounter.body.observations.find((item) => {
      //     if (item.body.type == observation) {
      //       return item;
      //     }
      //   });
      // }
      

      return true;
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
    // getBp(observations) {
    //   return observations.find(obs => obs.body.type == 'blood_pressure')
    // },
    // getDate(encounter) {
    //   let date = "";
    //   if (encounter.meta.created_at) {
    //     date = moment(encounter.meta.created_at).format("Do MMMM YYYY");
    //   }
    //   return date;
    // },
    getBp(observations) {
      return observations.find(obs => obs.body.type == 'blood_pressure')
    },
    getDate(encounter) {
      let date = "";
      if (encounter.meta.created_at) {
        date = moment(encounter.meta.created_at).format("Do MMMM YYYY");
      }
      return date;
    },

    getBp(observations) {
      return observations.find(obs => obs.body.type == 'blood_pressure')
    },

    getHeight(observations) {
      return observations.find(obs => {
        if (obs.body.type == 'body_measurement') {
          if (obs.body.data.name == 'height') {
            return obs;
          }
        }
      })
    },
    getWeight(observations) {
      return observations.find(obs => {
        if (obs.body.type == 'body_measurement') {
          if (obs.body.data.name == 'weight') {
            return obs;
          }
        }
      })
    },

    getBloodSugar(observations) {
      return observations.find(obs => {
        if (obs.body.type == 'blood_test') {
          if (obs.body.data.name == 'blood_sugar') {
            return obs;
          }
        }
      })
    },

    getMedications(observations) {
      let ob = observations.find((o) => {
        return (
          o.body.type === "survey" && o.body.data.name === "current_medication"
        );
      });

      if (ob) {
        return ob.body.data.medications.join(", ");
      }
    },

    getAllergies(observations) {
      let ob = observations.find((o) => {
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
    prepareSurveyData(observations) {
      observations.forEach((obs) => {
        if (
          obs.body.patient_id == this.patientId &&
          obs.body.type == "survey"
        ) {
          // console.log(obs.body);
          // if (obs.body.data.name == "medical_history") {
            Object.keys(obs.body.data).forEach((key) => {
              if (obs.body.data[key] == "yes") {
                if (!this.medicalHistory.includes(key.replace(/_/g, " "))) {
                  this.medicalHistory.push(key.replace(/_/g, " "));
                }
              }
            });
          // }

          // if (obs.body.data.name == "current_medication") {
          //   this.medications = obs.body.data.medications;
          // }
        }
      });
      console.log(this.medicalHistory, 'history')
      console.log(this.medications, 'medications')
    }
  
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
  .encounter-details .card-big table {
    width: 100%;
    td {
       width: 50%;
      &:last-child {
        text-align: center;
      }
      
    }
  }
</style>
