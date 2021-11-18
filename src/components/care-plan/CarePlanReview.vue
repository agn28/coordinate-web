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
                <p class="p-3 mb-0">{{ moment().format('DD MMM YYYY') }}</p>
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
                <div class="card-header">Pending care plan Intervention</div>
                 <div class="table-responsive" v-if="previousData && previousData.careplan.activities">
                    <table class="table tbl-bordered-td mt-2">
                      <thead>
                        <tr>
                          <th class="border-top-0">Action</th>
                          <th class="border-top-0">Generated On</th>
                          <!-- <th class="border-top-0">Assigned To</th> -->
                          <th class="border-top-0">Completed At</th>
                          <th class="border-top-0">Status</th>
                          <th class="border-top-0">Outcome</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in previousData.careplan.activities" :key="index" v-if="item.category == 'survey'">
                          <td class="align-middle">{{ item.title }}</td>
                          <td class="text-center align-middle">{{ item.meta ? (item.meta.created_at ? getFormatedDate(item.meta.created_at._seconds) : 'N/A') : 'N/A'}}</td>
                          <!-- <td>{{ item.meta ? (item.meta.assigned_to ? getUserName(item.meta.assigned_to) : 'N/A') : 'N/A'}}</td> -->
                          <td class="text-center align-middle">{{ item.meta ? (item.meta.completed_at ? getFormatedDate(item.meta.completed_at._seconds) : 'N/A') : 'N/A'}}</td>
                          <td class="text-capitalize">{{ item.meta ? (item.meta.status ? item.meta.status : 'N/A') : 'N/A'}}</td>
                          <td> {{ item.body ? (item.body.comment ? item.body.comment : 'N/A') : 'N/A' }}</td>
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
                 <div class="table-responsive" v-if="previousData && previousData.careplan.activities">
                    <table class="table tbl-bordered-td mt-2">
                      <thead>
                        <tr>
                          <th class="border-top-0">Drug name</th>
                          <th class="border-top-0">Dosage</th>
                          <th class="border-top-0">Unit</th>
                          <th class="border-top-0">Frequency</th>
                          <th class="border-top-0">Duration</th>
                          <th class="border-top-0">Dispensed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in medications" :key="index"> 
                          <td>{{ item.body.title }}</td>
                          <td>{{ item.body.dosage ? item.body.dosage : '--'}}</td>
                          <td>{{ item.body.unit ? item.body.unit : '--'}}</td>
                          <td>{{ item.body.activityDuration.repeat.frequency }} {{ item.body.activityDuration.repeat.periodUnit }}</td> 
                          <td>{{ item.body.activityDuration.review.period }} {{ item.body.activityDuration.review.periodUnit }}</td>
                          <td>{{ item.body.dispense ? item.body.dispense : '0' }}</td>
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
                        <tr v-for="(item, index) in investigations" :key="index">
                          <td class="text-capitalize">{{ item }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div v-if="investigations.length == 0" class="text-center mt-2">No investigation added</div>
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
                        <tr v-for="(item, index) in newDiagnosis" :key="index">
                          <td class="text-capitalize" >{{ item.name }}</td>
                          <td>{{ item.comment }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div v-if="newDiagnosis.length == 0" class="text-center mt-2">No diagnosis added</div>
                  </div>
              </div>
            </div>
        </div>

        <div class="row mb-3">
            <!-- chw follow up  -->
            <div class="col-md-6">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Next Community Center Follow Up</div>
                  <div class="chw-follow-up-date p-3" v-if="chwFollowUpDate">Date: {{ moment(chwFollowUpDate, 'YYYY-MM-DD').format('DD MMM YYYY') }}</div>
                  <div class="chw-follow-up-place p-3" v-if="chwFollowUpPlace">Place: {{chwFollowUpPlace}} </div>
              </div>
            </div>
            <!-- cc follow up  -->
            <div class="col-md-6">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Next NCD Center Follow up</div>
                  <div class="cc-follow-up-date p-3" v-if="ccFollowUpDate">Date: {{ moment(ccFollowUpDate, 'YYYY-MM-DD').format('DD MMM YYYY') }}</div>
                  <div class="cc-follow-up-place p-3" v-if="ccFollowUpPlace">Place: {{ccFollowUpPlace}} </div>
              </div>
            </div>
        </div>
        <div class="row mb-3">
            <!-- care plan generation date -->
            <div class="col-md-6">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Care Plan Generation Date</div>
                  <div class="cc-follow-up-date p-3" v-if="careplanDate">Date: {{ moment(careplanDate, 'YYYY-MM-DD').format('DD MMM YYYY') }}</div>
              </div>
            </div>
        </div>

        <div class="text-center  py-3">
            <!-- <a href="javascript:void(0)" @click="$router.go(-1)" class="text-secondary " > <i class="fa fa-arrow-left text-secondary" ></i> Back to reivew</a> -->
            <button type="button" @click="$router.go(-1)" class="btn btn-primary px-5 radious-0 mx-2"> Back to reivew</button>
            <button type="button" @click.prevent="updateReviewData()" class="btn btn-primary px-5 radious-0 m-auto">Confirm New Care Plan</button>
        </div>
        <!-- <div class="py-3 mb-3">
            <a href="javascript:void(0)" @click="$router.go(-1)" class="text-secondary " > <i class="fa fa-arrow-left text-secondary" ></i> Back to reivew</a>
        </div> -->
      <!-- </form> -->


    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";
import TopNavBar from "../TopNavBar";
import html2canvas from 'html2canvas';

export default {
  name: "CarePlanCreate",
  components: {
    VueJsonPretty,
    TopNavBar
  },
  // props: ["patientId"],
  data() {
    return {
      pdfImage: null,
      patientId: '',
      patient: null,
      previousData: null,
      allData: null,
      newDiagnosis: [],
      investigations: [],
      reviewId: '',
      chwFollowUpDate: null,
      ccFollowUpDate: null,
      chwFollowUpPlace: null,
      ccFollowUpPlace: null,
      careplanDate: moment().format("YYYY-MM-DD"),
      assessment_id: null,
      medications: [],
      newMedications: [],
      removedCounsellings: [],
      users: []
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    filteredMedications() {
      console.log('filter medication ', this.medications.filter(item => {
        return (item.body);
      }))
      return this.medications.filter(item => {
        return item.body;
      });
    }
      
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getUserName(id) {
      let matchedUser = this.users.find(usr => usr.uid == id);
      return matchedUser ? matchedUser.name : '';
    },
    getUsers() {
        let loader = this.$loading.show();
        this.$http.get("/users").then(response => {
            if (response.status == 200) {
                loader.hide()
                this.users = response.data;
            }
        },
        error => {
            loader.hide();
        });
    },
    hasGenerated (event) {

    },
    onProgress(event) {

    },
    hasStartedGeneration() {

    },
    getPatients() {
      let loader = this.$loading.show();
      this.$http.get("/patients/mongo/" + this.patientId).then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            this.patient = response.data.data;
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },
    getFormatedDate(data) {
        let date = moment
          .unix(data)
          .format("DD MMM YYYY");
   
      return date;
    },
    getHealthReport() {
      this.$http.get('/health-reports/mongo/' + this.reviewId).then(response => {
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
    async updateReviewData() {

      let loader = this.$loading.show();
      this.isLoading = true;

      this.allData.data.body.result.careplan = this.previousData.careplan;
      this.allData.data.body.result.careplan.activities = this.allData.data.body.result.careplan.activities.filter((item => {
        if (item.category == 'survey') {
          return item;
        }
      }));
      this.allData.data.body.investigations = this.investigations;
      this.allData.data.body.diagnosis = this.newDiagnosis;
      // this.allData.data.body.chw_follow_up_date = this.chwFollowUpDate;
      // this.allData.data.body.cc_follow_up_date = this.ccFollowUpDate;
      this.allData.data.body.follow_up_info = [
        {
          type: "chw",
          date: this.chwFollowUpDate,
          place: this.chwFollowUpPlace
        },
        {
          type: "cc",
          date: this.ccFollowUpDate,
          place: this.ccFollowUpPlace
        }
      ];
      this.allData.data.body.medications = this.newMedications;

      let counsellings = this.previousData.careplan.activities.filter((item => {
        if (item.category == 'survey') {
          return item;
        }
      }));
      // this.allData.data.body.removed_counsellings = this.removedCounsellings.concat(counsellings);
      this.allData.data.body.removed_counsellings = counsellings;

      this.allData.data.meta.created_at = this.careplanDate;
      
      this.saveObservationData();

      //TODO: work from here

      this.$http.put('/health-reports/mongo/' + this.reviewId, this.allData.data).then( response => {
        loader.hide();
        this.isLoading = false;
        if (response.status == 200 ) {
          this.alert = response.data.message;
          let careplan_id = response.data.data ? response.data.data.careplan_id : '';

          this.newMedications.forEach(item => {
        
            let medicationData = {};
            medicationData.body = item.body;
            medicationData.body.careplan_id = careplan_id;
            medicationData.body.patient_id = this.patientId;
            medicationData.meta = {
              created_at: new Date()
            }

            this.$http.post('/patients/' + this.patientId + "/medications-mongo", medicationData).then( response => {
              this.isLoading = false;
              if (response.status == 200 ) {

              } else {
                this.alert = 'error'
              }
              
            }).catch(err => {
              console.log(err.message)
            })
          });
          
          localStorage.removeItem('report');
          localStorage.removeItem('diagnosis');
          localStorage.removeItem('investigations');
          localStorage.removeItem('removedCounsellings');
          localStorage.removeItem('medications');
          localStorage.removeItem('newMedications');
          localStorage.removeItem('chwSelectedFollowup');
          localStorage.removeItem('ccSelectedFollowup');
          localStorage.removeItem('chw_follow_up_date')
          localStorage.removeItem('cc_follow_up_date');
          localStorage.removeItem('chw_follow_up_place')
          localStorage.removeItem('cc_follow_up_place');
          localStorage.removeItem('care_plan_date');
          localStorage.removeItem('patientId');
          
          this.$router.push({ name: 'patients'});
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
        if (item.activityDuration.start  == '' || item.activityDuration.start  == null) {
          item.activityDuration.start = '2021-03-01';
        }

        if (item.activityDuration.endDate  == '' || item.activityDuration.endDate  == null) {
          item.activityDuration.end = '2021-03-20';
        }
        
      }

      return data;
    },

    prepareData() {
      this.patientId = this.$route.params.patientId;
      let localData = localStorage.getItem('report');
      let localRemovedCounsellings = localStorage.getItem('removedCounsellings');
      let localDiagnosis = localStorage.getItem('diagnosis');
      let localInvestigations = localStorage.getItem('investigations');
      let localMedications = localStorage.getItem('medications');
      let localNewMedications = localStorage.getItem('newMedications');
      this.previousData =  localData ? JSON.parse(localData) : null;
      this.newDiagnosis =  localDiagnosis ? JSON.parse(localDiagnosis) : [];
      this.investigations =  localInvestigations ? JSON.parse(localInvestigations) : [];
      this.medications =  localMedications ? JSON.parse(localMedications) : [];
      this.removedCounsellings =  localRemovedCounsellings ? JSON.parse(localRemovedCounsellings) : [];
      this.reviewId = this.previousData.report_id ? this.previousData.report_id : null;

      console.log('previousData');
      console.log(this.previousData);
      if (localNewMedications) {
        this.newMedications = JSON.parse(localNewMedications);
        this.medications = this.medications.concat(this.newMedications);
      }
      this.getHealthReport();
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
          "type": 'care plan generated',
          "screening_type": 'care-plan-generated',
          "comment": '',
          "performed_by": this.user.uid,
          "assessment_date": moment().format('YYYY-MM-DD hh:mm:ss a'),
          // "next_visit_date": this.followUpDate,
          "follow_up_info":[
            {
              type: "chw",
              date: this.chwFollowUpDate,
              place: this.chwFollowUpPlace
            },
            {
              type: "cc",
              date: this.ccFollowUpDate,
              place: this.ccFollowUpPlace
            }
          ],
          "patient_id": this.patientId
        },
        id: this.assessment_id
      };
      
      this.$http.post("/assessments/except-oha-mongo", data).then(response => {
        if (response.status == 201) {
          // this.saveInvestigation(created_at, this.assessment_id);
          this.saveDiagonosis(created_at, this.assessment_id);
        }
      }).catch(error => { console.log(error) });
    },
    saveInvestigation(created_at, assesment_id) {
      if (this.investigations.length > 0) {
        for (let i = 0; i < this.investigations.length; i ++) {
          let dataKey = this.investigations[i].replace("", "_");
          let data = this.prepareTestData(this.user.uid, created_at, 'survey', dataKey, 'yes', this.patientId, assesment_id);
        }
      }
    },
    saveDiagonosis(created_at, assesment_id) {
      if (this.newDiagnosis.length > 0) {
        let data = this.prepareDiagnosisData(this.user.uid, created_at, 'survey', this.patientId, assesment_id);
        this.$http.post("/observations/create-mongo", data).then(response => {
        }).catch(error => { console.log(error) });

      }
    },
    prepareDiagnosisData(collected_by, created_at, type, patientId, assessment_id) {
     
      let diabetes = '';
      let stroke = '';
      let heart_attack = '';
      let asthma = '';
      let kidney_disease ='';
      let cancer = '';
      let hypertension = '';
      let lupus = '';  
      let bronchitis = '';  
      let ciliac = ''; 
      let scleroderma = ''; 
      let abulia=  ''; 
      let agraphia = ''; 
      let chorea = ''; 
      let coma = ''
      let i = 0;

      for (i; i < this.newDiagnosis.length; i++) {
        if (this.newDiagnosis[i].name == 'diabetes') { diabetes = 'yes'; }
        if (this.newDiagnosis[i].name == 'stroke') { stroke = 'yes'; }
        if (this.newDiagnosis[i].name == 'heart_attack') { heart_attack = 'yes'; }
        if (this.newDiagnosis[i].name == 'asthma') { asthma = 'yes'; }
        if (this.newDiagnosis[i].name == 'kidney_disease') { kidney_disease = 'yes'; }
        if (this.newDiagnosis[i].name == 'cancer') { cancer = 'yes'; }
        if (this.newDiagnosis[i].name == 'hypertension') { hypertension = 'yes'; }
        if (this.newDiagnosis[i].name == 'bronchitis') { bronchitis = 'yes'; }
        if (this.newDiagnosis[i].name == 'lupus') { lupus = 'yes'; }
        if (this.newDiagnosis[i].name == 'Abulia') { abulia = 'yes'; }
        if (this.newDiagnosis[i].name == 'Scleroderma') { scleroderma = 'yes'; }
        if (this.newDiagnosis[i].name == 'Ciliac') { ciliac = 'yes'; }
        if (this.newDiagnosis[i].name == 'Agraphia') { agraphia = 'yes'; }
        if (this.newDiagnosis[i].name == 'Chorea') { chorea = 'yes'; }
        if (this.newDiagnosis[i].name == 'Coma') { coma = 'yes'; }
      }

      let data = {
        "meta": {
          "collected_by": collected_by,
          "device_id": '',
          "created_at": created_at
        },
        "body": {
          "type": type,
          "data": {
            'name': 'medical_history',
            'diabetes': diabetes,
            'stroke': stroke,
            'heart_attack':heart_attack,
            'asthma': asthma,
            'kidney_disease': kidney_disease,
            'cancer': cancer,
            'hypertension': hypertension,
            'lupus' : lupus,  
            'bronchitis' : bronchitis,  
            'ciliac' : ciliac, 
            'scleroderma' :scleroderma, 
            'abulia' : abulia, 
            'agraphia' : agraphia, 
            'chorea' : chorea, 
            'coma' : coma
          },
          "patient_id": patientId,
          'assessment_id' : assessment_id,
          "comment": ''
        },
        id: this.$uuid.v4()
      }

      return data;
    }, 
  },
  mounted() {
    this.chwFollowUpDate = localStorage.getItem('chw_follow_up_date');
    this.ccFollowUpDate = localStorage.getItem('cc_follow_up_date');
    this.chwFollowUpPlace = localStorage.getItem('chw_follow_up_place');
    this.ccFollowUpPlace = localStorage.getItem('cc_follow_up_place');
    this.careplanDate = localStorage.getItem('care_plan_date');
    this.prepareData();
    this.getPatients();
    this.scrollToTop();
    this.getUsers();
  },
  
  created() {},
};
</script>

<style lang="scss">
.prescription-section {
  position: relative;
}
#pdf-image {
  width: 300px;
  border: 2px solid #999;
  margin: 50px;
  position: absolute;
  top: 0;
  right: 0;
}
.prescripton-wrapper {
  opacity: 0;
  border: 1px solid grey;
  width: 800px;
  height: 1132px;
  // height: 0px;
  // display: none;
  // position: relative;
}
#prescription {
  background-color: #f2f2f2;
  height: 100%;
  // position: absolute;
}
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
