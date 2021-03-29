<template>
  <div class="content patient-overview">
    <TopNavBar heading="Care Plan Summary"></TopNavBar>

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
                <p class="p-3 mb-0">{{ generatedCarePlan ? moment(generatedCarePlan.meta.created_at).format('DD-MM-YYYY') : '' }}</p>
              </div>
               <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Doctor</div>
                <p class="p-3 mb-0">{{ user.name }}</p>
              </div>
            </div>
        </div>

        <!-- pending careplan Intervention -->
        <div class="row mb-3">
          <div class="col-md-12">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Care plan Intervention</div>
                 <div class="table-responsive">
                    <table class="table tbl-bordered-td mt-2">
                      <thead>
                        <tr>
                          <th width="80%" class="border-top-0">Action</th>
                          <th  width="20%" class="border-top-0">Date Added</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in counsellingInterventions" :key="index">
                          <td class="align-middle">{{ item.title }}</td>
                          <td class="text-center align-middle">
                            
                          </td>
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
                        <tr v-for="(item, index) in medications" :key="index"> 
                          <td>{{ item.body.title }}</td>
                          <td>{{ item.body.dosage ? item.body.dosage : '--'}}</td>
                          <td>{{ item.body.unit ? item.body.unit : '--'}}</td>
                          <td>{{ item.body.activityDuration.repeat.frequency }} {{ item.body.activityDuration.repeat.periodUnit }}</td> 
                          <td>{{ item.body.activityDuration.review.period }} {{ item.body.activityDuration.review.periodUnit }}</td>
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
                    <table class="table tbl-bordered-td" v-if="generatedCarePlan && generatedCarePlan.body.investigations">
                      <thead>
                        <tr>
                          <th class="border-top-0">Investigation Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in generatedCarePlan.body.investigations" :key="index">
                          <td>{{ item }}</td>
                          <td>
                            <!-- <i class="fa fa-times" @click="removeInvestigation(index)"></i> -->
                            </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- <div v-if="investigations.length == 0" class="text-center mt-2">No investigation added</div> -->
                  </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Diagnosised Conditions</div>
                  <div class="table-responsive">
                    <table class="table tbl-bordered-td" v-if="generatedCarePlan && generatedCarePlan.body.diagnosis">
                      <thead>
                        <tr>
                          <th class="border-top-0">Diagnosis</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in generatedCarePlan.body.diagnosis" :key="index">
                          <td>{{ item.name }}</td>
                          <td>{{ item.comment }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- <div v-if="newDiagnosis.length == 0" class="text-center mt-2">No diagnosis added</div> -->
                  </div>
              </div>
            </div>
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
      previousData: null,
      allData: null,
      newDiagnosis: [],
      investigations: [],
      reviewId: '',
      followUpDate: null,
      assessment_id: null,
      generatedCarePlanId: '',
      generatedCarePlan: null,
      counsellingInterventions: [],
      medications: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
      
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

    getMedicationsByCareplan() {
      let loader = this.$loading.show();
      this.$http.get("/generated-care-plans/" + this.generatedCarePlanId + "/medications").then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            console.log('data ', response.data.data);
            this.medications = response.data.data;
            // console.log(this.patient, 'patient')
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },

    getGeneratedCarePlan() {
      let loader = this.$loading.show();
      this.$http.get("/generated-care-plans/" + this.generatedCarePlanId).then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            this.generatedCarePlan = response.data.data;

            this.generatedCarePlan.body.care_plans.filter((carePlan) => {
              if (carePlan.category == 'survey') {
                this.counsellingInterventions.push(carePlan);
              } 
              // else if (carePlan.category == 'medication') {
              //   console.log('action ', carePlan);
              //   this.medications.push(carePlan);
              // }
            });
            console.log('care plan ', this.generatedCarePlan)
            // console.log(this.patient, 'patient')
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },

    

    getHealthReport() {
      this.$http.get('/health-reports/' + this.reviewId).then(response => {
        if (response.status == 200) {
          this.allData = response.data;

          // for (var item of this.previousData.data.body.result.careplan.activities) {
          //   var index = this.previousData.data.body.result.careplan.activities.indexOf(item)
          //   this.selectedDurations[index] = 'Within 1 month'

          //   var type = this.types.find(item => item.text == this.selectedDurations[index])
          //   let startDate = new Date()
          //   let endDate = new Date()
          //   endDate.addDays(type.value);

          //   item.activityDuration.start = startDate;
          //   item.activityDuration.end = endDate;
          // }
          // if (response.data.data && response.data.data.body && response.data.data.body.result && response.data.data.body.result.careplan && response.data.data.body.result.careplan.activities) {
          //   this.newActions = response.data.data.body.result.careplan.activities
          // }
        }
      })
    },
    updateReviewData() {
      let loader = this.$loading.show();
      this.isLoading = true;
      // var data = this.calculateDuration(this.allData.data);
      // console.log('generate careplan: ', JSON.stringify(data));
      // return data;

      console.log('all data: ', this.allData);
      console.log('Previous: ', this.previousData);

      this.allData.data.body.result.careplan = this.previousData.careplan;
      this.allData.data.body.investigations = this.investigations;
      this.allData.data.body.diagnosis = this.newDiagnosis;
      this.allData.data.body.follow_up_date = this.followUpDate;
      //let preparedData = this.prepareFinalData(this.allData);
      console.log('Final Data: ', this.allData);
      //console.log('prepared: ', preparedData);
      // this.saveObservationData();
      // loader.hide();
      // return;

      this.$http.put('/health-reports/' + this.reviewId, this.allData.data).then( response => {
        loader.hide();
        this.isLoading = false
        console.log('res: ', response.data)
        if (response.status == 200 ) {
          this.alert = response.data.message;
          // this.$router.push({ name: 'patientOverview', params: {patientId: this.patientId}});

        } else {
          this.alert = 'error'
        }
        

      }).catch(err => {
        console.log(err.message)
        loader.hide();
        this.isLoading = false
      })
    },

    prepareFinalData(data) {
      for (var item of data.data.body.result.careplan.activities) {
        if (item.status) {
          item.status == item.status == true ? 'completed' : 'pending';
        }
        if( item.activityDuration.start  == '' || item.activityDuration.start  == null) {
          item.activityDuration.start = '2021-03-01';
        }

        if( item.activityDuration.endDate  == '' || item.activityDuration.endDate  == null) {
          item.activityDuration.end = '2021-03-20';
        }
        
      }

      return data;

    },

    prepareData() {
      this.patientId = this.$route.params.patientId;
      this.generatedCarePlanId = this.$route.params.carePlanId;
      // let localData = localStorage.getItem('report');
      // let localDiagnosis = localStorage.getItem('diagnosis');
      // let localInvestigations = localStorage.getItem('investigations');
      // this.previousData =  localData ? JSON.parse(localData) : null;
      // this.newDiagnosis =  localDiagnosis ? JSON.parse(localDiagnosis) : [];
      // this.investigations =  localInvestigations ? JSON.parse(localInvestigations) : [];
      // this.reviewId = this.previousData.report_id ? this.previousData.report_id : null;
      // this.getHealthReport();
    },

    prepareTestData(collected_by, created_at, type, dataKey, value, patientId, assessment_id) {
      let data = {
        "meta": {
          "collected_by": collected_by,
          "device_id": '',
          "created_at": created_at
        },
        "body": {
          "type": "survey",
          "data": {
            'name': 'medical_history',
            dataKey: value,
          },
          "patient_id": patientId,
          'assessment_id' : assessment_id
        },
        id: this.$uuid.v4()
      }

      return data;
    }, 
    saveObservationData() {
      let created_at = new Date();
      this.assessment_id = this.$uuid.v4();
      let data = {
        "meta": {
          "collected_by": this.user.uid,
          "created_at": created_at,
        },
        "body": {
          "type": 'doctor consultation',
          "screening_type": 'doctor-consultation',
          "comment": '',
          "performed_by": this.user.uid,
          "assessment_date": moment().format('YYYY-MM-DD'),
          "patient_id": this.patientId
        },
        id: this.assessment_id
      };
      
      this.$http.post("/assessments/except-oha", data).then(response => {
        if (response.status == 201) {
          this.saveInvestigation(created_at, this.assessment_id);
          this.saveDiagonosis(created_at, this.assessment_id);
        }
      }).catch(error => { console.log(error) });
    },
    saveInvestigation(created_at, assesment_id) {
      if (this.investigations.length > 0) {
        for (let i = 0; i < this.investigations.length; i ++) {
          let dataKey = this.investigations[i].replace("", "_");
          console.log('kk', dataKey)
          let data = this.prepareTestData(this.user.uid, created_at, 'survey', dataKey, 'yes', this.patientId, assesment_id);
          console.log('investigations '+ i +': ', data);
          // this.$http.post("/observations", data).then(response => {
          //   console.log('Observation response: ', response)
          // }).catch(error => { console.log(error) });
        }
      }
    },
    saveDiagonosis(created_at, assesment_id) {
      if (this.newDiagnosis.length > 0) {
        for (let i = 0; i < this.newDiagnosis.length; i ++) {
          let data = this.prepareTestData(this.user.uid, created_at, 'survey', this.newDiagnosis[i].name, '', '', this.newDiagnosis[i].comment, this.patientId, assesment_id);
          console.log('diagonis '+ i +': ', data);
          // this.$http.post("/observations", data).then(response => {
          //   console.log('Observation response: ', response)
          // }).catch(error => { console.log(error) });
        }
      }
    }
  },
  mounted() {
    this.followUpDate = localStorage.getItem('follow_up_date');
    this.prepareData();
    this.getPatients();
    this.getGeneratedCarePlan();
    this.getMedicationsByCareplan();
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
