<template>
  <div class="content patient-overview">
    <TopNavBar heading="Care Plan Confirmation"></TopNavBar>

    <div class="patient-summary  pl-4 pr-4">
      <!-- <form id="body-measurements" class="form-sharp-corner" @submit.prevent="createInvestigations"> -->
        <div class="row mb-3">
            <div class="col-md-6">
              <div class="card tab-card card-blue-header">
                  <div class="card-header">Patient Information</div>
                  <div class="table-responsive">
                    <table v-if="patient" class="table table-borderless mt-2">
                      <tbody>
                        <tr>
                          <td width="30%" >Patient ID</td>
                          <td width="5%" class="text-center">:</td>
                          <td width="65%">{{ patient.body.pid }}</td>
                        </tr>
                        <tr>
                          <td width="30%" >Name</td>
                          <td width="5%" class="text-center">:</td>
                          <td width="65%">{{ patient.body.first_name + ' ' + patient.body.last_name }}</td>
                        </tr>
                        <tr>
                          <td  width="30%" >Guardian Name</td>
                          <td width="5%" class="text-center">:</td>
                          <td width="65%">{{ patient.body.father_name ||  patient.body.husband_name}}</td>
                        </tr>
                        <tr>
                          <td  width="30%" >Date Of Birth</td>
                          <td width="5%" class="text-center">:</td>
                          <td width="65%">{{ patient.body.birth_date }}</td>
                        </tr>
                        <tr>
                          <td  width="30%">Age</td>
                          <td width="5%" class="text-center">:</td>
                          <td width="65%">{{ patient.body.age }} years</td>
                        </tr>
                        <tr>
                          <td  width="30%" >Gender</td>
                          <td width="5%" class="text-center">:</td>
                          <td width="65%">{{ patient.body.gender }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Date</div>
                <p class="p-3 mb-0">14 Mar 2021</p>
              </div>
               <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Doctor</div>
                <p class="p-3 mb-0">Mehedi Hasan</p>
              </div>
            </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-12">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">List of incomplete care plan action</div>
                 <div class="table-responsive">
                    <table class="table tbl-bordered-td mt-2">
                      <thead>
                        <tr>
                          <th class="border-top-0">Action</th>
                          <th class="border-top-0">Date Added</th>
                          <th class="border-top-0">Completed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Counselling about diet / physical activity to imporve glycemic control</td>
                          <td>5 Jan 2021</td>
                          <td> 
                              <div class="custom-control custom-switch">
                              <input type="checkbox" class="custom-control-input" id="addtocalreplan-1">
                              <label class="custom-control-label " for="addtocalreplan-1"></label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Counselling about diet / physical activity to imporve glycemic control</td>
                          <td>5 Jan 2021</td>
                          <td>
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" checked id="addtocalreplan-2" >
                                <label class="custom-control-label " for="addtocalreplan-2"></label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
        </div>

        <!-- pending careplan Intervention -->
        <div class="row mb-3">
          <div class="col-md-12">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Pending care plan Intervention</div>
                 <div class="table-responsive">
                    <table class="table tbl-bordered-td mt-2">
                      <thead>
                        <tr>
                          <th width="80%" class="border-top-0">Action</th>
                          <th  width="20%" class="border-top-0">Date Added</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Counselling on imporving diet</td>
                          <td>5 Jan 2021</td>
                        </tr>
                        <tr>
                          <td>Counselling on imporving diet</td>
                          <td>5 Jan 2021</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-12">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Medication</div>
                 <div class="table-responsive">
                    <table class="table tbl-bordered-td mt-2">
                      <thead>
                        <tr>
                          <th class="border-top-0">Drug name</th>
                          <th class="border-top-0">Dosage</th>
                          <th class="border-top-0">Unit</th>
                          <th class="border-top-0">Frequency</th>
                          <th class="border-top-0">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Initiate first line therapy for hypertension</td>
                          <td>20</td>
                          <td>mg</td>
                          <td>Once per day</td>
                          <td>3 months</td>
                        </tr>
                        <tr>
                          <td>Initiate first line therapy for hypertension</td>
                          <td>20</td>
                          <td>mg</td>
                          <td>Once per day</td>
                          <td>3 months</td>
                        </tr>
                        <tr>
                          <td>Initiate first line therapy for hypertension</td>
                          <td>20</td>
                          <td>mg</td>
                          <td>Once per day</td>
                          <td>3 months</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
        </div>

        <!-- investigations  -->
        <div class="row mb-3">
            <div class="col-md-6">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Investigation Requested</div>
                  <div class="table-responsive">
                    <table class="table tbl-bordered-td">
                      <thead>
                        <tr>
                          <th class="border-top-0">Investigation Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Serum creatinine test</td>
                        </tr>
                        <tr>
                          <td>Chext X-Ray</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Diagnosised Conditions</div>
                  <div class="table-responsive">
                    <table class="table tbl-bordered-td">
                      <thead>
                        <tr>
                          <th class="border-top-0">Diagnosis</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Hypertension</td>
                        </tr>
                         <tr>
                          <td>Blood pressure</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
        </div>

        <!-- follow up  -->
        <div class="row mb-3">
            <div class="col-md-6">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Next Follow Up Date</div>
                  <div class="follow-up-date p-3"> 25 Mar 2021</div>
              </div>
            </div>
        </div>

        <div class="text-center  py-3">
            
            <button type="submit" class="btn btn-primary px-5 radious-0 m-auto">Confirm New Care Plan</button>
        </div>
        <div class="py-3 mb-3">
            <a href="javascript:void(0)" @click="$router.go(-1)" class="text-secondary " > <i class="fa fa-arrow-left text-secondary" ></i> Back to reivew</a>
        </div>
      <!-- </form> -->


    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";
import TopNavBar from "../TopNavBar";

export default {
  name: "CarePlanCreate",
  components: {
    VueJsonPretty,
    TopNavBar,
  },
  // props: ["patientId"],
  data() {
    return {
      patientId: '',
      patient: null,
    };
  },
  methods: {
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
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.getPatients();
  },
  
  created() {},
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
    border: 1px solid #7299c1;
    border-radius: 0;
    th {
      font-size: 16px !important;
    }
  }
  .txt-red {
    color: #f72b34;
  }
  .txt-grey {
    color: #00b0a6;
  }
  table {
    td {
      padding: 0.2rem 0.75rem;
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
.modal-blue-header {
  .modal-header {
      background-color: blue;
      color:  #fff;
      &:first-child {
        border-radius: 0;
      }
  }
}
</style>
