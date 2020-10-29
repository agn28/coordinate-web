<template>
  <div>
    <div class="encounter-details" v-if="currentEncounterParent">
      <div class="row">
        <div class="col-sm-8">
          <div class="card p-3 card-big">
            <h6 class="mb-3">Vitals</h6>

            <table>
              <!-- <tr>
                <td class="text-secondary">Temperature:</td>
                <td>46 <span>&#176;</span></td>
              </tr> -->
              <tr>
                <td @click="test()" class="text-secondary">Heart Rate:</td>
                <td>{{ getBp(currentEncounterParent.body.observations) ? getBp(currentEncounterParent.body.observations).body.data.pulse_rate : ''}}</td>
              </tr>
              <tr>
                <td class="text-secondary">Blood Pressure:</td>
                <td>{{ getBp(currentEncounterParent.body.observations) ? getBp(currentEncounterParent.body.observations).body.data.systolic + '/' + getBp(currentEncounterParent.body.observations).body.data.diastolic : ''}}</td>
              </tr>
              <tr>
                <td class="text-secondary">Height:</td>
                <td>{{ getHeight(currentEncounterParent.body.observations) ? getHeight(currentEncounterParent.body.observations).body.data.value +' ' + getHeight(currentEncounterParent.body.observations).body.data.unit : '' }}</td>
              </tr>
              <tr>
                <td class="text-secondary">Weight:</td>
                <td>{{ getWeight(currentEncounterParent.body.observations) ? getWeight(currentEncounterParent.body.observations).body.data.value +' ' + getWeight(currentEncounterParent.body.observations).body.data.unit : '' }}</td>
              </tr>
              <!-- <tr>
                <td class="text-secondary">BMI:</td>
                <td>29</td>
              </tr> -->
            </table>
          </div>

          <div class="card p-3 card-big mt-3">
            <h6 class="mb-3">Labotory Tests</h6>

            <table>
              <tr>
                <td class="text-secondary">Floating Blood Sugar:</td>
                <td>{{ getBloodSugar(currentEncounterParent.body.observations) ? getBloodSugar(currentEncounterParent.body.observations).body.data.value +' ' + getBloodSugar(currentEncounterParent.body.observations).body.data.unit : '' }}</td>
              </tr>
            </table>
          </div>

        </div>

        <div class="col-sm-4">
          <div class="card p-3 card-small">
            <h6 class="mb-3">DIagnosis</h6>

          </div>
          <div class="card p-3 card-small mt-3">
            <h6 class="mb-3">Previous Encounter</h6>

            <div v-if="previousEncounterParent" class="previous-encounter bg-white">
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
  props: ['currentEncounterParent', 'previousEncounterParent', 'users', 'patientId'],
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
    test() {
      console.log(this.currentEncounterParent.id)
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
    }
  

  
  },
  mounted() {
    console.log('mounted');
  },
};
</script>

<style lang="scss">

</style>
