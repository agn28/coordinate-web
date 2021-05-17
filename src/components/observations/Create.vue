<template>
  <div class="content">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-6">
          <div class="card mt-4">
            <div class="card-header py-3">
              <a href @click.prevent="$router.go(-1)">
                <i class="fa fa-arrow-left float-left mr-4 text-secondary"></i>
              </a>
              <h4 class="font-weight-bold">Add New Observation</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <form>
                    <div class="form-group">
                      <label for>Type</label>
                      <select v-model="observation.type" class="form-control" @change="prepareDropdown()">
                        <option value="height">Height</option>
                        <option value="weight">Weight</option>
                        <option value="bmi">BMI</option>
                        <option value="body_fat">Body Fat</option>
                        <option value="visceral_fat">Visceral Fat</option>
                        <option value="muscle">Muscle</option>
                        <option value="systolic">Systolic Blood Pressure</option>
                        <option value="diastolic">Diastolic Blood Pressure</option>
                        <option value="heart rate">Heart Rate</option>
                        <option value="waist">Waist</option>
                        <option value="hip">Hip</option>
                        <option value="fev1">FEV1</option>
                        <option value="fvc">FVC</option>
                        <option value="pefr">PEFR</option>
                        <option value="hdl">HDL</option>
                        <option value="ldl">LDL</option>
                        <option value="tg">Triglycerides</option>
                        <option value="a1c">A1C</option>
                        <option value="blood_sugar">Blood Sugar</option>
                        <option value="total_cholesterol">Total Cholesterol</option>
                        <option value="chronic kidney disease">Chronic kidney disease</option>
                        <option value="angina">Angina</option>
                        <option value="lung disease">Lung Disease</option>
                        <option value="smoking status">Smoking Status</option>
                        <option value="alcohol use">Alcohol Use</option>
                        <option value="diet">Diet</option>
                        <option value="physical activity">Physical Activity</option>
                      </select>
                    </div>
                    <div v-if="!isValueDropdown" class="form-group">
                      <label for>Value</label>
                      <input v-model="observation.value" type="text" class="form-control" />
                    </div>
                    <div v-if="!isValueDropdown" class="form-group">
                      <label for>Unit</label>
                      <select v-model="observation.unit" name id class="form-control">
                        <option value="cm">cm</option>
                        <option value="kg">kg</option>
                        <option value="kg/m2">kg/m2</option>
                        <option value="bpm">bpm</option>
                        <option value="%">%</option>
                        <option value="L">L</option>
                        <option value="L/min">L/min</option>
                        <option value="mmol/L">mmol/L</option>
                        <option value="units">units</option>
                      </select>
                    </div>

                    <div v-if="isValueDropdown" class="form-group">
                      <label for>Value</label>
                      <select v-model="observation.value" class="form-control">
                        <option v-for="(option, index) in preparedOptions" :key="index" :value="option" class="text-capitalize">{{ option }}</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for>Assessment Date</label>
                      <input v-model="observation.assessment_date" type="date" class="form-control" />
                    </div>

                    <button @click.prevent="save()" class="btn btn-primary float-right">Submit</button>
                  </form>
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

export default {
  name: "patients",
  components: {},
  data() {
    return {
      patientId: "",
      encounterId: "",
      observation: {},
      preparedOptions: [],
      isValueDropdown: false,
      smokingOptions: ['current', 'ex', 'non-smoker'],
      dietOptions: ['below', 'on target'],
      physicalOptions: ['sedentary', 'below', 'target', 'on target']
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    save() {
      var path =
        "/patients/" +
        this.patientId +
        "/encounters/" +
        this.encounterId +
        "/observations";
      this.$http.post(path, this.observation).then(response => {
        if (response.status == 200) {
          this.$router.push(this.$route.query.redirect || path);
        }
      });
    },

    prepareDropdown() {
      if (this.observation.type == 'smoking status') {
        this.isValueDropdown = true;
        this.preparedOptions = this.smokingOptions
      } else if (this.observation.type == 'diet') {
        this.isValueDropdown = true;
        this.preparedOptions = this.dietOptions
      } else if (this.observation.type == 'physical activity') {
        this.isValueDropdown = true;
        this.preparedOptions = this.physicalOptions
      } else {
        this.isValueDropdown = false
        this.observation.value = ''
      }
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.encounterId = this.$route.params.encounterId;
    this.scrollToTop();
  }
};
</script>

<style lang="">
</style>
