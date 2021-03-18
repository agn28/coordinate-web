<template>
  <div class="content patient-overview">
    <TopNavBar heading="Care Plan Review"></TopNavBar>

    <!-- <div class="row pl-4 pr-4">
      <div class="col-lg-6">
        <div class="patient-search">
          <h4 class="">Patient Investigations</h4>
        </div>
      </div>
    </div> -->

    <div class="patient-summary  pl-4 pr-4">
      <!-- <form id="body-measurements" class="form-sharp-corner" @submit.prevent="createInvestigations"> -->
        <div class="row mb-3">
            <div class="col-md-6">
              <div class="card tab-card card-blue-header">
                  <div class="card-header d-flex align-items-center justify-content-spacebetween">Patient Information <span class=" ml-auto last-encounter">Last Encounter 5 Jan 2021</span></div>
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
                <div class="card-header">Last Care Plan Generated</div>
                 <div class="table-responsive">
                    <table class="table table-borderless mt-2">
                      <tbody>
                        <tr>
                          <td width="30%" >Dr Aliul</td>
                          <td width="5%" class="text-center">:</td>
                          <td width="60%">5 Jan 2021</td>
                          <td width="5%"><a href="javascript:void(0)">View</a></td>
                        </tr>
                        <tr>
                          <td width="30%" >Dr Aliul</td>
                          <td width="5%" class="text-center">:</td>
                          <td width="60%">3 Jan 2021</td>
                          <td width="5%"><a href="javascript:void(0)">View</a></td>
                        </tr>
                        <tr>
                          <td width="30%" >Dr Aliul</td>
                          <td width="5%" class="text-center">:</td>
                          <td width="60%">2 Jan 2021</td>
                          <td width="5%"><a href="javascript:void(0)">View</a></td>
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
                <div class="card-header">Care Plan Intervention Status</div>
                 <div class="table-responsive">
                    <table class="table tbl-bordered-td mt-2">
                      <thead>
                        <tr>
                          <th class="border-top-0">Action</th>
                          <th class="border-top-0">Date Added</th>
                          <th class="border-top-0">Assigned To</th>
                          <th class="border-top-0">Completed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Counselling about diet / physical activity to imporve glycemic control</td>
                          <td>5 Jan 2021</td>
                          <td>Fatima Hasan</td>
                          <td>Not Completed</td>
                        </tr>
                        <tr>
                          <td>Counselling about diet / physical activity to imporve glycemic control</td>
                          <td>5 Jan 2021</td>
                          <td>N/A</td>
                          <td>Completed</td>
                        </tr>
                        <tr>
                          <td>Counselling about diet / physical activity to imporve glycemic control</td>
                          <td>5 Jan 2021</td>
                          <td>Fatima Hasan</td>
                          <td>Not Completed</td>
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
                <div class="card-header">New Recommendations From Decission Support Tool</div>
                 <div class="table-responsive">
                    <table class="table tbl-bordered-td mt-2">
                      <thead>
                        <tr>
                          <th class="border-top-0">Action</th>
                          <th class="border-top-0">Add To Care Plan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Initiate first line therapy for hypertension</td>
                          <td>
                            <div class="custom-control custom-switch">
                              <input type="checkbox" class="custom-control-input" id="addtocalreplan-1">
                              <label class="custom-control-label " for="addtocalreplan-1"></label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Counselling on medication adherence</td>
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

        <!-- mediation  -->
        <div class="row mb-3">
          <div class="col-md-12">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Medication Recommendations</div>
                  <button type="button" class="btn btn-primary right px-3 m-2 ml-auto radious-0"  data-toggle="modal" data-target="#modal-add-medication"><i class="fa fa-plus"></i> Add</button>
                  <h5 class="px-2">New Recommendations</h5>
                  <div class="table-responsive">
                    <table class="table tbl-bordered-td">
                    
                      <tbody>
                        <tr>  <td>Start on first line anti-cholesterol medication</td> </tr>
                         <tr>  <td>Start on first line anti-cholesterol medication</td> </tr>
                      </tbody>
                    </table>
                  </div>

                  <h5 class="px-2">Current Medication</h5>
                  <div class="table-responsive">
                    <table class="table tbl-bordered-td">
                      <thead>
                        <tr>
                          <th class="border-top-0">Drug Name</th>
                          <th class="border-top-0">Dosage</th>
                          <th class="border-top-0">Unit</th>
                          <th class="border-top-0">Frequency</th>
                          <th class="border-top-0">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Atorvastatin</td>
                          <td>20</td>
                          <td>mg</td>
                          <td>Once per day</td>
                          <td>3 months</td>
                        </tr>
                        <tr>
                          <td>Atorvastatin</td>
                          <td>20</td>
                          <td>mg</td>
                          <td>Once per day</td>
                          <td>3 months</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h5 class="px-2">New Medication</h5>
                  <div class="table-responsive">
                    <table class="table tbl-bordered-td" v-if="allData.data && allData.data.body && allData.data.body.result && allData.data.body.result.careplan && allData.data.body.result.careplan.activities">
                      <thead>
                        <tr>
                          <th class="border-top-0">Drug Name</th>
                          <th class="border-top-0">Dosage</th>
                          <th class="border-top-0">Unit</th>
                          <th class="border-top-0">Frequency</th>
                          <th class="border-top-0">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in allData.data.body.result.careplan.activities" :key="'activity-' + index" v-if="item.category == 'medication'">
                          <td>{{ item.title }}</td>
                          <td>{{ item.dosage }}</td>
                          <td>{{ item.unit }}</td>
                          <td>{{ item.activityDuration.repeat.frequency }} {{ item.activityDuration.repeat.durationFrequency }}</td>
                          <td>{{ item.activityDuration.repeat.period }} {{ item.activityDuration.repeat.periodUnit }} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
        </div>

        <!-- 
          
         -->
          <div class="row mb-3">
            <div class="col-md-12">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">New Counselling Care Plan Recommendations</div>
                  <!-- <button type="submit" class="btn btn-primary right px-3 m-2 ml-auto radious-0" ><i class="fa fa-plus"></i> Add</button> -->
                  <div class="table-responsive">
                    <table class="table tbl-bordered-td">
                      <thead>
                        <tr>
                          <th width="45%" class="border-top-0">Action</th>
                          <th width="5%" class="border-top-0 text-center">Action Completed?</th>
                          <th width="45%" class="border-top-0">Outcome</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="align-middle">Counselling on medicatoin adherence</td>
                          <td class="text-center align-middle">
                            <div class="custom-control custom-switch">
                              <input type="checkbox" class="custom-control-input" checked id="addtocalreplan-3" >
                              <label class="custom-control-label " for="addtocalreplan-3"></label>
                            </div>
                          </td>
                          <td class="align-middle">
                            <textarea class="form-control" value="Patient agred to take medication constantly"></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td class="align-middle">Counselling about diet / physical activity to imporve glycemic control</td>
                          <td class="text-center align-middle">
                            <div class="custom-control custom-switch">
                              <input type="checkbox" class="custom-control-input"  id="addtocalreplan-4" >
                              <label class="custom-control-label " for="addtocalreplan-4"></label>
                            </div>
                          </td>
                          <td class="align-middle">
                            <textarea class="form-control" value=""></textarea>
                          </td>
                        </tr>
                         <tr>
                          <td class="align-middle">Counselling on smoking cessation</td>
                          <td class="text-center align-middle">
                            <div class="custom-control custom-switch">
                              <input type="checkbox" class="custom-control-input"  id="addtocalreplan-4" >
                              <label class="custom-control-label " for="addtocalreplan-4"></label>
                            </div>
                          </td>
                          <td class="align-middle">
                            <textarea class="form-control" value=""></textarea>
                          </td>
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
                <div class="card-header">Add Investigation</div>
                  <button type="submit" class="btn btn-primary right px-3 m-2 ml-auto radious-0" data-toggle="modal" data-target="#modal-add-investigations"><i class="fa fa-plus"></i> Add</button>
                  <div class="table-responsive">
                    <table class="table tbl-bordered-td" v-if="investigations.length">
                      <thead>
                        <tr>
                          <th class="border-top-0" colspan="2">Investigation Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in investigations" :key="index">
                          <td>{{ item }}</td>
                          <td>
                            <!-- <i class="fa fa-times" @click="removeInvestigation(index)"></i> -->
                            </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">Add Diagnosis</div>
                  <button type="submit" class="btn btn-primary right px-3 m-2 ml-auto radious-0" data-toggle="modal" data-target="#modal-add-diagnosis"><i class="fa fa-plus"></i> Add</button>
                  <div class="table-responsive">
                    <table class="table tbl-bordered-td">
                      <thead>
                        <tr>
                          <th class="border-top-0">Diagnosis</th>
                          <th class="border-top-0">Comments</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Hypertension</td>
                          <td>Early Stage</td>
                        </tr>
                         <tr>
                          <td>Blood pressure</td>
                          <td>....</td>
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
                <div class="card-header">Follow Up</div>
                  
                  <div class="follow-up p-3">
                    <div class="custom-control custom-checkbox custom-control-inline">
                      <input type="checkbox" name="follow_up"  class="custom-control-input" id="one-week">
                      <label class="custom-control-label" for="one-week">1 week</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                      <input type="checkbox" name="follow_up"  class="custom-control-input" id="two-week">
                      <label class="custom-control-label" for="two-week">2 week</label>
                    </div>

                    <div class="custom-control custom-checkbox custom-control-inline">
                      <input type="checkbox" name="follow_up"  class="custom-control-input" id="one-month">
                      <label class="custom-control-label" for="one-month">1 month</label>
                    </div>

                    <div class="custom-control custom-checkbox custom-control-inline">
                      <input type="checkbox" name="follow_up"  class="custom-control-input" id="three-month">
                      <label class="custom-control-label" for="three-month">3 months</label>
                    </div>

                    <div class="custom-control custom-checkbox custom-control-inline">
                      <input type="checkbox" name="follow_up"  class="custom-control-input" id="six-month">
                      <label class="custom-control-label" for="six-month">6 months</label>
                    </div>

                    <div class="custom-control custom-checkbox custom-control-inline">
                      <input type="checkbox" name="follow_up"  class="custom-control-input" id="one-year">
                      <label class="custom-control-label" for="one-year">1 year</label>
                    </div>

                    <div class="follow-up-date mt-3"><b>Follow up date:</b> 25 Mar 2021</div>
                  </div>
              </div>
            </div>
        </div>

        <div class="text-center py-3 mb-3">
            <router-link :to="{name: 'carePlanReview', params: {patientId: patientId}}" class="btn btn-primary px-5 radious-0">Proceed To Confirmation</router-link>
        </div>
      <!-- </form> -->

      <!-- pop ups -->
      <div class="modal fade" id="modal-add-medication" tabindex="-1" role="dialog" aria-labelledby="modal-add-medication" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content modal-blue-header p-0 radious-0">
            <div class="modal-header py-2 px-3">
              <h5 class="modal-title text-white">Add Medication</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
             <form @submit.prevent="addMedication">
                <div class="modal-body p-3">
                  <div class="form-row">
                      <div class="col-md-4 mb-3">
                          <label >Drug Name</label>
                          <multiselect
                            v-model="medication.title"
                            :options="drugs"
                            label="name"
                            track-by="name"
                            :allow-empty="false"
                            :searchable="true"
                          ></multiselect>
                      </div>
                      <div class="col-md-4 mb-3">
                          <label for="validationCustom01">Dosage</label>
                          <input type="text" class="form-control" name="doages" placeholder="Dosage" v-model="medication.dosage" required/>
                      </div>
                      <div class="col-md-4 mb-3">
                          <label for="validationCustom01">Unit</label>
                          <select class="form-control" name="unit" required v-model="medication.unit">
                            <option value="mg">mg</option>
                            <option value="g">g</option>
                            <option value="ml">ml</option>
                          </select>
                      </div>
                      <div class="col-md-4 mb-3">
                          <label for="validationCustom01">Frequency</label>
                          <input class="form-control" v-model.number="medication.frequency" required />
                          
                      </div>
                      <div class="col-md-4 mb-3">
                          <label for="validationCustom01" class="">Frequency Duration</label>
                          <select class="form-control" required v-model="medication.durationFrequency">
                            <option selected value="">Please select one</option>
                            <option v-for="type in frequencyType"  :key="type.id" v-bind:value="type.value">{{type.title}}</option>
                          </select>
                      </div>
                      <div class="col-md-4 mb-3">
                          <label for="validationCustom01">Duration</label>
                          <select class="form-control" required v-model="medication.period">
                              <option selected value="">Please select one</option>
                              <option v-for="duration in durations" :key="duration.id" v-bind:value="duration.value">{{duration.title}}
                              </option>
                          </select>
                      </div>
                  </div>
                </div>
                <div class="modal-footer p-3">
                  <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                  <button type="submit" class="btn btn-primary radious-0" >Confirm</button>
                </div>
            </form>
          </div>
        </div>
      </div>

      <!-- add Diagnosis -->
      <div class="modal fade" id="modal-add-diagnosis" tabindex="-1" role="dialog" aria-labelledby="modal-add-diagnosis" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content modal-blue-header p-0 radious-0">
            <div class="modal-header py-2 px-3">
              <h5 class="modal-title text-white">Add Diagnosis</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body p-3">
              <div class="form-row">
                  <div class="col-md-12 mb-3">
                      <label for="validationCustom01">Diagnosis</label>
                      <select class="form-control" name="" v-model="diagnosisItem.name">
                        <option value="">Diagnosis Name</option>
                        <option value="">Diagnosis Name</option>
                        <option value="">Diagnosis Name</option>
                      </select>
                  </div>
                  <div class="col-md-12 ">
                      <label for="validationCustom01">Comments</label>
                      <textarea class="form-control" name="comments" placeholder="Comments"></textarea>
                  </div>
              </div>
            </div>
            <div class="modal-footer p-3">
              <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
              <button type="button" class="btn btn-primary radious-0">Confirm</button>
            </div>
          </div>
        </div>
      </div>

      <!-- add Investigations -->
      <div class="modal fade" id="modal-add-investigations" tabindex="-1" role="dialog" aria-labelledby="modal-add-investigations" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <form @submit.prevent="addInvestigation">
            <div class="modal-content modal-blue-header p-0 radious-0">
              <div class="modal-header py-2 px-3">
                <h5 class="modal-title text-white">Add Investigation</h5>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body p-3">
                <div class="form-row">
                    <div class="col-md-12 mb-3">
                        <label for="validationCustom01">Investigation</label>
                        <select class="form-control" v-model="investigation">
                          <option value="">Please Select</option>
                          <option value="serum creatinine test">Serum creatinine test</option>
                          <option value="chest X-ray">Chest X-ray</option>
                        </select>
                    </div>
                </div>
              </div>
              <div class="modal-footer p-3">
                <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                <button type="submit" class="btn btn-primary radious-0" >Confirm</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- end popups -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";
import TopNavBar from "../TopNavBar";
import Multiselect from "vue-multiselect";
export default {
  name: "CarePlanCreate",
  components: {
    VueJsonPretty,
    TopNavBar,
    Multiselect
  },
  // props: ["patientId"],
  data() {
    return {
      patientId: '',
      patient: null,
      drugs: [],
      medicationEnabled: false,
      medication: {},
      activity: {},
      frequencyType: [
        {
          "id": '1',
          "title": "Day",
          "value": "d"
        },
        {
          "id": '2',
          "title": "Week",
          "value": "w"
        },
        {
          "id": '3',
          "title": "Month",
          "value": "m"
        }
      ],
      durations: [
        {
          "id": "1",
          "title": "One Day",
          "value": "1d",
        },
        {
          "id": "2",
          "title": "3 Days",
          "value": "3d",
        },
        {
          "id": "3",
          "title": "5 Days",
          "value": "5d",
        },
        {
          "id": "4",
          "title": "1 Week",
          "value": "1w",
        },
        {
          "id": "5",
          "title": "2 Weeks",
          "value": "2w",
        },
        {
          "id": "6",
          "title": "15 Days",
          "value": "15d",
        },
        {
          "id": "7",
          "title": "1 Month",
          "value": "1m",
        },
        {
          "id": "8",
          "title": "3 Month",
          "value": "3m",
        },
      ],
      types: [
        {
          "id": "1",
          "text": "Within 1 month",
          "value": 30
        },
        {
          "id": "2",
          "text": "Within 2 month",
          "value": 60
        },
        {
          "id": "3",
          "text": "Within 3 month",
          "value": 90
        },
        {
          "id": "4",
          "text": "Within 4 month",
          "value": 120
        },
        {
          "id": "5",
          "text": "Within 5 month",
          "value": 150
        },
        {
          "id": "6",
          "text": "Within 6 month",
          "value": 180
        },
      ],
      allData: {
        data: {
          body: {
            result:{
              careplan: {
                activities: []
              }
            }
          }
        }
      },
      investigations: [],
      investigation: '',
      investigationItems: [
        {
          id: 1,
          name: 'Serum creatinine ' 
        },
        {
          id: 2,
          name: 'Chest X-ray' 
        }
      ],
      isInvestigationMsg: false,
      diagnosis: [],
      diagnosisItem: {},
      isDiagnosisMsg: false,
    };
  },
  methods: {
    getHealthReport() {
      this.$http.get('/health-reports/' + this.reviewId).then(response => {
        if (response.status == 200) {
          this.allData = response.data
          for (var item of this.allData.data.body.result.careplan.activities) {
            var index = this.allData.data.body.result.careplan.activities.indexOf(item)
            this.selectedDurations[index] = 'Within 1 month'

            var type = this.types.find(item => item.text == this.selectedDurations[index])
            let startDate = new Date()
            let endDate = new Date()
            endDate.addDays(type.value);

            item.activityDuration.start = startDate;
            item.activityDuration.end = endDate;
          }
          if (response.data.data && response.data.data.body && response.data.data.body.result && response.data.data.body.result.careplan && response.data.data.body.result.careplan.activities) {
            this.newActions = response.data.data.body.result.careplan.activities
          }
          // this.patientId = response.data.data.body.patient_id
          // this.getPatientInfo();
        }
      })
    },
    getPatients() {
      let loader = this.$loading.show();
      this.$http.get("/patients/" + this.patientId).then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            this.patient = response.data.data;
            console.log('patient: ', this.patient);
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },

    getDrugs() {
      this.$http.get('/drugs').then(response => {
        if (response.status == 200 && !response.data.error && response.data.error === false) {
          this.drugs = response.data.data
          console.log(response, 'drugs');
          this.isLoading = false
          this.dataReady = true
        }
      })
    },

    addMedication() {
      let startDate = new Date()
      let endDate = new Date()
      let period = this.medication.period.split(/(\d+)/).filter(Boolean)
      if (period[1] == 'w') {
        endDate = endDate.addDays(period[0] * 7)
      } else if (period[1] == 'm') {
        endDate = endDate.addDays(period[0] * 30)
      } else {
        endDate = endDate.addDays(period[0])
      }
      let startPeriod = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate()
      let endPeriod = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate()
      this.activity = {
        category: "medication",
        title: this.medication.title.name,
        description: this.medication.title.name,
        dosage: this.medication.dosage,
        unit: this.medication.unit,
        id: '',
        roles: ['doctor'],
        component: {},
        outcomeConcept: {},
        activityDuration: {
          start: startPeriod,
          end: endPeriod,
          repeat: {
            period: period[0],
            periodUnit: period[1],
            frequency: this.medication.frequency,
            durationFrequency: this.medication.durationFrequency
          }
        },
        comments: {
          comment: this.medication.comment ? this.medication.comment : null
        }
      }

      console.log('activity: ', this.activity);

      this.allData.data.body.result.careplan.activities.push(this.activity);
      console.log('all data: ', this.allData);
    },

    addInvestigation() {
      this.investigations.push(this.investigation);
    },

    removeInvestigation(index) {
      console.log('index: ', index);
      let findIndex = this.investigations.indexOf(index);
        if (findIndex > -1) {
        console.log('in')
        this.investigations = this.investigations.splice(findIndex, 1);
         console.log();
      }
    },

    addDiagnosis() {
      this.diagnosis.name = this.diagnosisItem.name;
      this.diagnosis.comment = this.diagnosisItem.comment;
      console('diag: ', this.diagnosis);
    },
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    // this.getHealthReport();
    this.getPatients();
    this.getDrugs();
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
.last-encounter {
  background-color: #FF8383;
  color: #fff;
  padding: 5px 10px;
}
</style>
