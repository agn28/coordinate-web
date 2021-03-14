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
      <form id="body-measurements" class="form-sharp-corner" @submit.prevent="createInvestigations">
        <div class="row mb-3">
            <div class="col-md-6">
            <div class="card tab-card card-blue-header">
                <div class="card-header">Blood Test</div>
                <h5 class="p-3 mb-0">Blood Sugar</h5>
                <div class="form-row p-3">
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Random Blood Sugar</label>
                        <input type="text" 
                            v-model="form.random_blood_sugar"
                            class="form-control" 
                            name="random_blood_sugar" 
                            placeholder="Random Blood Sugar" value=""  
                        />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="random_blood_sugar_unit">
                            <option value="">Choose.....</option>
                            <option value="mmol/L" selected>mmol/L</option>
                            <option value="mg/dL">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Fasting Blood Sugar</label>
                        <input type="text" class="form-control" name="fasting_blood_sugar" placeholder="Fasting Blood Sugar" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="fasting_blood_sugar_unit">
                            <option value="">Choose.....</option>
                            <option value="mmol/L" selected>mmol/L</option>
                            <option value="mg/dL">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">2HABF</label>
                        <input type="text" class="form-control" name="2habf" placeholder="2HABF" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="2habf_unit">
                            <option value="">Choose.....</option>
                            <option value="mmol/L" selected>mmol/L</option>
                            <option value="mg/dL">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">HbA1c</label>
                        <input type="text" class="form-control" name="hba1c" placeholder="HbA1c" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="hba1c_unit">
                            <option value="%" selected>%</option>
                        </select>
                    </div>
                </div>

                <h5 class="p-3 mb-0">Lipid Profile</h5>
                <div class="form-row p-3">
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Total Cholesterol</label>
                        <input type="text" class="form-control" name="cholesterol" placeholder="Cholesterol" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="cholesterol_unit">
                            <option value="">Choose.....</option>
                            <option value="mmol/L" selected>mmol/L</option>
                            <option value="mg/dL">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">HDL</label>
                        <input type="text" class="form-control" name="hdl" placeholder="HDL" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="hdl_unit">
                            <option value="">Choose.....</option>
                            <option value="mmol/L" selected>mmol/L</option>
                            <option value="mg/dL">mg/dL</option>
                        </select>
                    </div>
                    
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">LDL</label>
                        <input type="text" class="form-control" name="ldl" placeholder="LDL" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="ldl_unit">
                            <option value="">Choose.....</option>
                            <option value="mmol/L" selected>mmol/L</option>
                            <option value="mg/dL">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Triglycerides</label>
                        <input type="text" class="form-control" name="triglycerides" placeholder="Triglycerides" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="triglycerides_unit">
                            <option value="">Choose.....</option>
                            <option value="mmol/L" selected>mmol/L</option>
                            <option value="mg/dL">mg/dL</option>
                        </select>
                    </div>
                </div>

                <h5 class="p-3 mb-0">Additional</h5>
                <div class="form-row p-3">
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Creatinine</label>
                        <input type="text" class="form-control" name="creatinine" placeholder="Creatinine" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="creatinine_unit">
                            <option value="">Choose.....</option>
                            <option value="mmol/L" selected>mmol/L</option>
                            <option value="mg/dL">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Sodium</label>
                        <input type="text" class="form-control" name="sodium" placeholder="Sodium" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="sodium_unit">
                            <option value="">Choose.....</option>
                            <option value="mmol/L" selected>mmol/L</option>
                            <option value="mg/dL">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Potassium</label>
                        <input type="text" class="form-control" name="potassium" placeholder="Potassium" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="potassium_unit">
                            <option value="">Choose.....</option>
                            <option value="mmol/L" selected>mmol/L</option>
                            <option value="mg/dL">mg/dL</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Ketones</label>
                        <input type="text" class="form-control" name="ketones" placeholder="Ketones" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="ketones_unit">
                            <option value="">Choose.....</option>
                            <option value="mmol/L" selected>mmol/L</option>
                            <option value="mg/dL">mg/dL</option>
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
                        <input type="text" class="form-control" placeholder="Height" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="height_unit">
                            <option value="cm" selected>CM</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Weight</label>
                        <input type="text" class="form-control" placeholder="weight" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="weight_unit">
                            <option value="kg" selected>KG</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Hip</label>
                        <input type="text" class="form-control" placeholder="hip" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="hip_unit">
                            <option value="cm" selected>CM</option>
                        </select>
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="">Waist</label>
                        <input type="text" class="form-control" placeholder="waist" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Unit</label>
                        <select class="form-control" name="waist_unit">
                            <option value="cm" selected>CM</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Blood Pressure</div>
                <div class="form-row p-3">
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Systolic Blood Pressure</label>
                        <input type="text" class="form-control" name="systolic_blood_pressure" placeholder="Systolic Blood Pressure" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Diastolic Blood Pressure</label>
                        <input type="text" class="form-control" name="diastolic_blood_pressure" placeholder="Diastolic Blood Pressure" value="" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Pulse Rate</label>
                        <input type="text" class="form-control" name="pulse_rate" placeholder="Pulse Rate" value="" />
                    </div>
                </div>
            </div>
            </div>
        </div>

        <div class="text-left py-3 mb-3">
            <button type="submit" class="btn btn-primary px-5">Create</button>
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
  name: "PatientInvestigations",
  components: {
    VueJsonPretty,
    TopNavBar,
  },
  props: ["patientId"],
  data() {
    return {
      form: {
        random_blood_sugar: ''
      }
    };
  },
  methods: {
    getDate(history) {
      let date = "";
      if (history.created_at) {
        date = moment
          .unix(history.created_at._seconds)
          .format("Do MMMM YYYY hh:mm:ss a");
      }
      return date;
    },
    createInvestigations() {
      console.log('dd');
    },
  },
  created() {},

  mounted() {},
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
