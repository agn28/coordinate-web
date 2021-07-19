<template>
  <div class="content patient-overview">
    <TopNavBar heading="Add Patient Investigations"></TopNavBar>

    <div class="row pl-4 pr-4">
      <div class="col-lg-6">
        <div class="patient-search">
          <h4 class="">Patient Investigations</h4>
        </div>
      </div>
    </div>
    <div class="patient-summary pl-4 pr-4">
      <form id="body-measurements" class="form-sharp-corner" @submit.prevent="onEncounterCreate">
        <div class="row mb-3">
            <div class="col-md-6">
            <div class="card tab-card card-blue-header">
                <div class="card-header">Blood Test</div>
                <h5 class="p-3 mb-0">Blood Sugar</h5>
                <div class="form-row p-3">
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Random Blood Sugar</label>
                        <input type="text" 
                            v-model="random_blood_sugar"
                            class="form-control" 
                            name="random_blood_sugar" 
                            placeholder="Random Blood Sugar" value=""  
                        />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="random_blood_sugar_unit" v-model="random_blood_sugar_unit">
                            <option value="mmol/L" :selected="random_blood_sugar_unit == 'mmol/L'">mmol/L</option>
                            <option value="mg/dL">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Fasting Blood Sugar</label>
                        <input type="text" class="form-control" name="fasting_blood_sugar" v-model="fasting_blood_sugar" placeholder="Fasting Blood Sugar" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="fasting_blood_sugar_unit" v-model="fasting_blood_sugar_unit">
                            <option value="mmol/L" :selected="fasting_blood_sugar_unit == 'mmol/L'">mmol/L</option>
                            <option value="mg/dL" :selected="fasting_blood_sugar_unit == 'mg/dL'">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">2HABF</label>
                        <input type="text" class="form-control" v-model="habf" name="2habf" placeholder="2HABF" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="2habf_unit" v-model="habf_unit">
                            <option value="mmol/L" :selected="habf_unit == 'mmol/L'">mmol/L</option>
                            <option value="mg/dL" :selected="habf_unit == 'mg/dL'">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">HbA1c</label>
                        <input type="text" class="form-control" v-model="hba1c" name="hba1c" placeholder="HbA1c" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="hba1c_unit" v-model="hba1c_unit">
                            <option value="%" :selected="hba1c_unit == '%'">%</option>
                        </select>
                    </div>
                </div>

                <h5 class="p-3 mb-0">Lipid Profile</h5>
                <div class="form-row p-3">
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Total Cholesterol</label>
                        <input type="text" class="form-control" name="cholesterol" v-model="cholesterol" placeholder="Cholesterol" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="cholesterol_unit" v-model="cholesterol_unit">
                            <option value="mmol/L" :selected="cholesterol_unit == 'mmol/L'">mmol/L</option>
                            <option value="mg/dL" :selected="cholesterol_unit == 'mg/dL'">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">HDL</label>
                        <input type="text" class="form-control" v-model="hdl" name="hdl" placeholder="HDL" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="hdl_unit" v-model="hdl_unit">
                            <option value="mmol/L" :selected="hdl_unit == 'mmol/L'">mmol/L</option>
                            <option value="mg/dL" :selected="hdl_unit == 'mg/dL'">mg/dL</option>
                        </select>
                    </div>
                    
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">LDL</label>
                        <input type="text" class="form-control" v-model="ldl" name="ldl" placeholder="LDL" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="ldl_unit" v-model="ldl_unit">
                            <option value="mmol/L" :selected="ldl_unit == 'mmol/L'">mmol/L</option>
                            <option value="mg/dL" :selected="ldl_unit == 'mg/dL'">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Triglycerides</label>
                        <input type="text" class="form-control" v-model="triglycerides" name="triglycerides" placeholder="Triglycerides" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="triglycerides_unit" v-model="triglycerides_unit">
                            <option value="mmol/L" :selected="triglycerides_unit == 'mmol/L'">mmol/L</option>
                            <option value="mg/dL" :selected="triglycerides_unit == 'mg/dL'">mg/dL</option>
                        </select>
                    </div>
                </div>

                <h5 class="p-3 mb-0">Additional</h5>
                <div class="form-row p-3">
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Creatinine</label>
                        <input type="text" class="form-control" v-model="creatinine" name="creatinine" placeholder="Creatinine" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="creatinine_unit" v-model="creatinine_unit">
                             <option value="mmol/L" :selected="creatinine_unit == 'mmol/L'">mmol/L</option>
                            <option value="mg/dL" :selected="creatinine_unit == 'mg/dL'">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Sodium</label>
                        <input type="text" class="form-control" v-model="sodium" name="sodium" placeholder="Sodium" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="sodium_unit" v-model="sodium_unit">
                            <option value="mmol/L" :selected="sodium_unit == 'mmol/L'">mmol/L</option>
                            <option value="mg/dL" :selected="sodium_unit == 'mg/dL'">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Potassium</label>
                        <input type="text" class="form-control" v-model="potassium" name="potassium" placeholder="Potassium" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="potassium_unit" v-model="potassium_unit">
                            <option value="mmol/L" :selected="potassium_unit == 'mmol/L'">mmol/L</option>
                            <option value="mg/dL" :selected="potassium_unit == 'mg/dL'">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Ketones</label>
                        <input type="text" class="form-control" v-model="ketones" name="ketones" placeholder="Ketones" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="ketones_unit" v-model="ketones_unit">
                            <option value="mmol/L" :selected="ketones_unit == 'mmol/L'">mmol/L</option>
                            <option value="mg/dL" :selected="ketones_unit == 'mg/dL'">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Protein</label>
                        <input type="text" class="form-control" v-model="protein" name="protein" placeholder="Protein" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="ketones_unit" v-model="protein_unit">
                            <option value="mmol/L" :selected="protein_unit == 'mmol/L'">mmol/L</option>
                            <option value="mg/dL" :selected="protein_unit == 'mg/dL'">mg/dL</option>
                        </select>
                    </div>
                </div>
            </div>
            </div>

            <div class="col-md-6">
            <div class="card tab-card mb-3 card-red-header">
                <div class="card-header">Body Measurements</div>
                <div class="form-row p-3">
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Height</label>
                        <input type="text" class="form-control" v-model="height" placeholder="Height" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="height_unit" v-model="height_unit">
                            <option value="cm" :selected="height_unit == 'cm'">CM</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Weight</label>
                        <input type="text" class="form-control" v-model="weight" placeholder="weight" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="weight_unit" v-model="weight_unit">
                            <option value="kg" :selected="weight_unit == 'kg'">KG</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Hip</label>
                        <input type="text" class="form-control" v-model="hip" placeholder="hip" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="hip_unit" v-model="hip_unit">
                            <option value="cm" :selected="hip_unit == 'cm'">CM</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="">Waist</label>
                        <input type="text" class="form-control" v-model="waist" placeholder="waist" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="waist_unit" v-model="waist_unit">
                            <option value="cm" :selected="waist_unit == 'cm'">CM</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Blood Pressure</div>
                <div class="form-row p-3">
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Systolic Blood Pressure</label>
                        <input type="text" class="form-control" v-model="systolic_blood_pressure" name="systolic_blood_pressure" placeholder="Systolic Blood Pressure" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Diastolic Blood Pressure</label>
                        <input type="text" class="form-control" v-model="diastolic_blood_pressure" name="diastolic_blood_pressure" placeholder="Diastolic Blood Pressure" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Pulse Rate</label>
                        <input type="text" class="form-control"  v-model="pulse_rate" name="pulse_rate" placeholder="Pulse Rate" value="" />
                    </div>
                </div>
            </div>
            </div>
        </div>

        <div class="text-left py-3 mb-3">
            <button type="submit" class="btn btn-primary px-5">Create</button> {{   }}
        </div>
      </form>
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";
import TopNavBar from "../TopNavBar";

export default {
  name: "PatientInvestigationsCreate",
  components: {
    VueJsonPretty,
    TopNavBar,
  },
  // props: ["patientId"],
  data() {
    return {
      random_blood_sugar: '',
      random_blood_sugar_unit: 'mg/dL',
      fasting_blood_sugar: '',
      fasting_blood_sugar_unit: 'mg/dL',
      habf: '',
      habf_unit: 'mg/dL',
      hba1c: '',
      hba1c_unit: '%',
      cholesterol: '',
      cholesterol_unit: 'mg/dL',
      hdl: '',
      hdl_unit: 'mg/dL',
      ldl: '',
      ldl_unit: 'mg/dL',
      triglycerides: '',
      triglycerides_unit: 'mg/dL',
      creatinine: '',
      creatinine_unit: 'mg/dL',
      sodium: '',
      sodium_unit: 'mg/dL',
      potassium: '',
      potassium_unit: 'mg/dL',
      ketones: '',
      ketones_unit: 'mg/dL',
      height: '',
      height_unit: 'cm',
      weight: '',
      weight_unit: 'kg',
      hip: '',
      hip_unit: 'cm',
      waist: '',
      waist_unit: 'cm',
      systolic_blood_pressure: '',
      diastolic_blood_pressure: '',
      pulse_rate: '',
      protein: '',
      protein_unit: 'mg/dL',
      assessment_id: '',
      patientId: ''
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    onEncounterCreate() {
      this.createEncounter();
    },
    createEncounter() {
      let collected_by = this.user.uid;
      this.assessment_id = this.$uuid.v4();
      let data = {
        "meta": {
          "collected_by": collected_by,
          "created_at": new Date(),
        },
        "body": {
          "type": 'doctor consultation',
          "screening_type": 'doctor-consultation',
          "comment": '',
          "performed_by": collected_by,
          "assessment_date": moment().format('YYYY-MM-DD hh:mm:ss a'),
          "patient_id": this.patientId
        },
        id: this.assessment_id
      };
      
      this.$http.post("/assessments/except-oha", data).then(response => { 
        let loader = this.$loading.show();
        if (response.status == 201) {
          this.addBloodPressure();
          this.addBodyMeasurement();
          this.addBloodTest();
          let self = this;
          setTimeout(function() {
           loader.hide();
           self.$router.push({ name: 'patientOverview', params: { patientId: self.patientId } });
          }, 2000);
        } else {
          loader.hide();
        }
        
      }).catch(error => {
        console.log(error)
      });
    },
    addBloodPressure() {
      if (this.systolic_blood_pressure && this.diastolic_blood_pressure && this.pulse_rate) {
        let data = {
          "meta": {
            "collected_by": this.user.uid,
            "created_at": new Date()
          },
          "body": {
            "type": "blood_pressure",
            "data": {
              'arm': 'left',
              'systolic': parseInt(this.systolic_blood_pressure),
              'diastolic': parseInt(this.diastolic_blood_pressure),
              'pulse_rate': this.pulse_rate,
            },
            "comment": '',
            'patient_id': this.patientId,
            "assessment_id": this.assessment_id,
          },
          
          id: this.$uuid.v4()
        }

        // console.log('bl0od p.data; ', data);
        //create
        if (this.systolic_blood_pressure && this.diastolic_blood_pressure && this.pulse_rate) {
          this.$http.post("/observations", data).then(response => {
            console.log('blod press res: ', response);
          }).catch(error => {
            console.log(error);
          });
        }
        
      }
    },
    addBodyMeasurement() {
      let created_at  = new Date();
     
      //create height
      if (this.height && this.height_unit) {
         let dataHeight  = this.prepareBodyMeasurementData(this.user.uid, created_at, 'body_measurement', 'height', this.height_unit, this.height, '', this.patientId, this.assessment_id);
        this.$http.post("/observations", dataHeight).then(response => {
          console.log('Height response: ', response)
        }).catch(error => { console.log(error) });
      }
      

      //create weight
      if (this.weight && this.weight_unit) {
        let dataWeight  = this.prepareBodyMeasurementData(this.user.uid, created_at, 'body_measurement', 'weight', this.weight_unit, this.weight, '', this.patientId, this.assessment_id);
        this.$http.post("/observations", dataWeight).then(response => {
          console.log('Weight response: ', response)
        }).catch(error => { console.log(error) });
      }

      //create waist
      if (this.waist && this.waist_unit) {
        let dataWaist   = this.prepareBodyMeasurementData(this.user.uid, created_at, 'body_measurement', 'waist', this.waist_unit, this.waist, '', this.patientId, this.assessment_id);
        this.$http.post("/observations", dataWaist).then(response => {
          console.log('Waist response: ', response)
        }).catch(error => { console.log(error) });
      }

      //create hip
      if (this.hip && this.hip_unit) {
        let dataHip     = this.prepareBodyMeasurementData(this.user.uid, created_at, 'body_measurement', 'hip', this.hip_unit, this.hip, '', this.patientId, this.assessment_id);
        this.$http.post("/observations", dataHip).then(response => {
          console.log('Hip response: ', response)
        }).catch(error => { console.log(error) });
      }
    },
    addBloodTest() {
      let created_at = new Date();

      //colesterol
      if (this.cholesterol && this.cholesterol_unit) {
        let dataColesterol = this.prepareBloodTestData(this.user.uid, created_at , 'blood_test', 'total_cholesterol', this.cholesterol_unit, this.cholesterol, '', this.patientId, this.assessment_id);
        this.saveObservationData(dataColesterol);
      }
      //RBS
      if (this.random_blood_sugar && this.random_blood_sugar_unit) {
         let dataRBS = this.prepareBloodTestData(this.user.uid, created_at, 'blood_test', 'blood_sugar', this.random_blood_sugar_unit, this.random_blood_sugar, '', this.patientId, this.assessment_id);
        this.saveObservationData(dataRBS);
      }
      //FBS
      if (this.fasting_blood_sugar && this.fasting_blood_sugar_unit) { 
        let dataFBS = this.prepareBloodTestData(this.user.uid, created_at, 'blood_test', 'blood_glucose', this.fasting_blood_sugar_unit, this.fasting_blood_sugar, '', this.patientId, this.assessment_id);
        this.saveObservationData(dataFBS);
      }
      //HABF
      if (this.habf && this.habf_unit) { 
        let dataHABF = this.prepareBloodTestData(this.user.uid, created_at, 'blood_test', '2habf', this.habf_unit, this.habf, '', this.patientId, this.assessment_id);
        this.saveObservationData(dataHABF);
      }

       //HBA1C
      if (this.hba1c && this.hba1c_unit) { 
        let dataHbA1c = this.prepareBloodTestData(this.user.uid, created_at, 'blood_test', 'a1c', this.hba1c_unit, this.hba1c, '', this.patientId, this.assessment_id);
        this.saveObservationData(dataHbA1c);
      }

      //HDL
      if (this.hdl && this.hdl_unit) { 
        let dataHDL = this.prepareBloodTestData(this.user.uid, created_at, 'blood_test', 'hdl', this.hdl_unit, this.hdl, '', this.patientId, this.assessment_id);
        this.saveObservationData(dataHDL);
      }
      //LDL
      if (this.ldl && this.ldl_unit) { 
        let dataLDL = this.prepareBloodTestData(this.user.uid, created_at, 'blood_test', 'ldl', this.ldl_unit, this.ldl, '', this.patientId, this.assessment_id);
        this.saveObservationData(dataLDL);
      }
      //triglycerides
      if (this.triglycerides && this.triglycerides_unit) { 
        let dataTriglycerides = this.prepareBloodTestData(this.user.uid, created_at, 'blood_test', 'triglycerides', this.triglycerides_unit, this.triglycerides, '', this.patientId, this.assessment_id);
        this.saveObservationData(dataTriglycerides);
      }
      //triglycerides
      if (this.creatinine && this.creatinine_unit) { 
         let dataCreatinine = this.prepareBloodTestData(this.user.uid, created_at, 'blood_test', 'creatinine', this.creatinine_unit, this.creatinine, '', this.patientId, this.assessment_id);
        this.saveObservationData(dataCreatinine);
      }

      //sodium
      if (this.sodium && this.sodium_unit) { 
        let dataSodium = this.prepareBloodTestData(this.user.uid, created_at, 'blood_test', 'sodium', this.sodium_unit, this.sodium, '', this.patientId, this.assessment_id);
        this.saveObservationData(dataSodium);
      }

       //potassium
      if (this.potassium && this.potassium_unit) { 
        let dataPotassium = this.prepareBloodTestData(this.user.uid, created_at, 'blood_test', 'potassium', this.potassium_unit, this.potassium, '', this.patientId, this.assessment_id);
        this.saveObservationData(dataPotassium);
      }

      //ketones
      if (this.ketones && this.ketones_unit) { 
       let dataKetones = this.prepareBloodTestData(this.user.uid, created_at, 'blood_test', 'ketones', this.ketones_unit, this.ketones, '', this.patientId, this.assessment_id);
        this.saveObservationData(dataKetones);
      }

      //protein
      if (this.protein && this.protein_unit) { 
       let dataKetones = this.prepareBloodTestData(this.user.uid, created_at, 'blood_test', 'protein', this.protein_unit, this.protein, '', this.patientId, this.assessment_id);
        this.saveObservationData(dataKetones);
      }
    },

    prepareBodyMeasurementData(collected_by, created_at, type, name, unit, value, comment, patientId, assessment_id) {
      let data = {
        "meta": {
          "collected_by": collected_by,
          "device_id": '',
          "created_at": created_at
        },
        "body": {
          "type": type,
          "data": {
            'name': name,
            'unit': unit,
            'value': parseInt(value),
            'comment': comment,
            'device': ''
          },
        "patient_id": patientId,
        "assessment_id": assessment_id
        },
        id: this.$uuid.v4()
      }

      return data;
    },

    prepareBloodTestData(collected_by, created_at, type, name, unit, value, comment, patientId, assessment_id) {
      let data = {
        "meta": {
          "collected_by": collected_by,
          "device_id": '',
          "created_at": created_at
        },
        "body": {
          "type": type,
          "data": {
          'name': name,
          'unit': unit,
          'value': parseInt(value),
          'comment': comment,
          'device': '',
        },
        "patient_id": patientId,
        'assessment_id' : assessment_id
        },
        id: this.$uuid.v4()
      }

      return data;
    }, 
    saveObservationData(data) {
      console.log('called obser: ', data)
      this.$http.post("/observations", data).then(response => {
        console.log('Observation response: ', response)
      }).catch(error => { console.log(error) });
    }
  },
  created() { },

  mounted() { 
    this.patientId = this.$route.params.patientId;
    this.scrollToTop();
   },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    
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
    border: 1px solid #7299c1;
    border-radius: 0;
    th {
      font-size: 20px;
    }
  }
  .custom-title {
    font-size: 20px;
    padding: 0.75rem;
    margin-bottom: 0;
  }
  .txt-red {
    color: #f72b34;
  }
  .txt-grey {
    color: #00b0a6;
  }
  table {
    td {
      padding: 0.1rem 0.75rem;
    }
  }
  .add-note {
    border-radius: 50%;
  }
  .td-grey {
    background: #e6e6e6;
  }
  .td-border-bottom {
    border: 4px solid white;
  }

}
</style>
