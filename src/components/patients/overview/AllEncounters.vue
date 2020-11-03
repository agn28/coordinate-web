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
  props: ['encounters', 'users', 'patientId'],
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
    encounterDetails(encounter) {
      this.$emit('goToEncounterDetails', encounter);
      this.$router.replace({ name: "patientOverview", params: { patientId: this.patientId }, query: { encounter: encounter.id } })
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

  
  },
  mounted() {

  },
};
</script>

<style lang="scss">

</style>
