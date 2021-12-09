<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex breadcrumb-wrap">
        <i
          class="fa fa-arrow-left text-secondary back-icon"
          @click="$router.push({ name: 'dashboard'})"
        ></i>
        <div class>
          <h4>Observations</h4>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="patient-search">
            <div class="search">
              <div class="input-group md-form form-sm form-1 pl-0">
                <div class="input-group-prepend">
                  <span class="input-group-text lighten-3" id="basic-text1">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </span>
                </div>
                <input
                  class="form-control my-0 py-1 border-left-0"
                  type="text"
                  placeholder="Type, Value"
                  aria-label="Search"
                  v-model="search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12 d-flex justify-content-end">
        <a class="btn btn-success mb-2" @click.prevent="showFHIR(patientId)" href="#">Show FHIR</a>
      </div>
      <div class="col-lg-12">
        <div class="care-plan-list">
          <div class="table-responsive">
            <table class="table border-bottom">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Type</th>
                  <th scope="col">Value</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Assessment Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(obs, index) in filteredList" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ obs.type }}</td>
                  <td>{{ obs.value }}</td>
                  <td>{{ obs.unit }}</td>
                  <td>{{ obs.assessment_date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <b-modal id="fhir-modal" class="modal-header" size="xl">
        <template v-slot:modal-header>
          <span class="title">Healthcare FHIR Resources</span>
        </template>
        <div class="data">
          <vue-json-pretty :path="'res'" :data="fhirData"></vue-json-pretty>
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
import VueJsonPretty from "vue-json-pretty";
export default {
  name: "patients",
  components: {
    VueJsonPretty
  },
  data() {
    return {
      patientId: "",
      encounterId: "",
      observations: [],
      encounter: {},
      patient: {},
      search: "",
      fhirData: []
    };
  },
  computed: {
    filteredList() {
      if (this.observations.length == 0) {
        return "";
      }

      return this.observations.filter(observation => {
        if (typeof observation.value == "string") {
          return (
            observation.value
              .toLowerCase()
              .includes(this.search.toLowerCase()) ||
            observation.type.toLowerCase().includes(this.search.toLowerCase())
          );
        }

        return observation.value
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()) || observation.type
            .toLowerCase()
            .includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
     showFHIR(id) {
      let loader = this.$loading.show();
      this.$http.get("/observations/fhir/" + this.encounterId).then(
        response => {
          loader.hide();
          if (response.status == 200) {
            this.fhirData = response.data.data;

            this.$bvModal.show("fhir-modal");
          }
        },
        error => {
          loader.hide();
        }
      );
    },
    getObservations() {
      this.$http
        .get(
          "/observations/all-mongo?patient_id=" +
            this.patientId +
            "&assessment_id=" +
            this.encounterId
        )
        .then(response => {
          // console.log(response.data);
          this.prepareObservations(response.data.data);
        });
    },

    prepareObservations(data) {
      // console.log(data);
      data.forEach(entry => {
        this.observations.push({
          type: this.getName(entry),
          assessment_date: entry.meta.created_at,
          value: this.getValue(entry),
          unit: this.getUnit(entry)
        });
      });
    },

    getName(entry) {
      if (entry.body.type == "blood_pressure") {
        return "Blood Pressure";
      }
      return entry.body.data.name;
    },

    getValue(entry) {
      if (entry.body.type == "blood_pressure") {
        return (
          "Diastolic: " +
          entry.body.data.diastolic +
          ", Systolic: " +
          entry.body.data.systolic +
          ", Pulse Rate: " +
          entry.body.data.pulse_rate
        );
      }

      if (entry.body.type != "survey") {
        return entry.body.data.value;
      }

      if (entry.body.data.name == "current_medication") {
        return entry.body.data.medications.join(", ");
      }

      if (
        [
          "medical_history",
          "diet",
          "physical_activity",
          "alcohol",
          "tobacco"
        ].includes(entry.body.data.name)
      ) {
        let medical = [];
        for (const [key, value] of Object.entries(entry.body.data)) {
          if (key == "name") {
            continue;
          }
          medical.push(`${key}: ${value}`);
        }
        return medical.join(", ");
      }

      console.log(entry);
      return "";
    },

    getUnit(entry) {
      if (entry.body.type == "blood_pressure") {
        return "mmHg";
      }

      if (entry.body.type != "survey") {
        return entry.body.data.unit;
      }
      return "N/A";
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.encounterId = this.$route.params.encounterId;
    this.getObservations();
    this.scrollToTop();
  }
};
</script>

<style lang="">
</style>
