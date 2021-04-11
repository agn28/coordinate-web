<template>
  <div class="content patient-overview">
    <TopNavBar heading="Care Plan Review"></TopNavBar>

    <div class="patient-summary  pl-4 pr-4">
      <!-- <form id="body-measurements" class="form-sharp-corner" @submit.prevent="createInvestigations"> -->
        <div class="row mb-3">
            <div class="col-md-6">
              <div class="card tab-card card-blue-header">
                  <div class="card-header d-flex align-items-center justify-content-spacebetween">Patient Information <span class=" ml-auto last-encounter" v-if="lastEncounter">Last Encounter: {{ lastEncounter }}</span></div>
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
                 <div class="table-responsive" v-if="lastReports">
                    <table class="table table-borderless mt-2">
                      <tbody>
                        <tr v-for="(report, index) in lastReports" :key="index">
                          <td width="30%" >{{ report.meta.generated_by.name }}</td>
                          <td width="5%" class="text-center">:</td>
                          <td width="60%">{{ moment(report.meta.created_at).format('DD-MM-YYYY')  }}</td>
                          <td width="5%">
                            <!-- <a href="javascript:void(0)">View</a> -->
                            <router-link :to="{name: 'carePlanSummary', params:{ carePlanId: report.id, patientId: patientId}}">View</router-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
        </div>

        <div v-if="missingData" class="alert alert-danger" role="alert">
          The patient does not have sufficient observations to generate careplan. Please try another one. 
          <a href="#" @click.prevent="$router.go(-1)">Go Back</a>
        </div>


        <div v-if="!missingData && !isLoading">

          <div class="row">
            <div class="col-sm-6">
              <div class="card mb-3 tab-card card-blue-header">
                <div class="card-header">CVD</div>
                <div class="table-responsive mt-2">
                  <table class="table table-borderless">

                    <tbody>
                      <tr>
                        <td width="30%" class="font-weight-bold">10 year CVD risk score</td>
                        <td width="5%" class="text-center">:</td>
                        <td width="65%" class="text-capitalize" :class="this.cvdRisk.tfl || ''">{{ this.cvdRisk.value || 'N/A' }}</td>
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
                  <div class="table-responsive" v-if="lastCareplans.length">
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
                          <tr v-for="(plan, index) in lastCareplans" :key="index">
                            <td>{{ plan.body.title }}</td>
                            <td>{{ getFormatedDate(plan.meta.created_at._seconds) }}</td>
                            <td>N/A</td>
                            <td class="text-capitalize">{{ plan.meta.status }}</td>
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
                    <div class="table-responsive mb-3" v-if="allData && allData.careplan && allData.careplan.activities">
                      <table class="table tbl-bordered-td">
                        <tbody>
                          <tr v-for="(item,index) in allData.careplan.activities" :key="index" v-if="item.category == 'medication' && item.comments"> 
                            <td>{{ item.title }}</td> 
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p class="px-2" v-else>Not available</p>

                    <h5 class="px-2">Current Medication</h5>
                    <div class="table-responsive  mb-3" v-if="medications && medications.length > 0">
                      <table class="table tbl-bordered-td">
                        <thead>
                          <tr>
                            <th class="border-top-0">Drug Name</th>
                            <th class="border-top-0">Dosage</th>
                            <th class="border-top-0">Unit</th>
                            <th class="border-top-0">Frequency</th>
                            <th class="border-top-0">Duration</th>
                            <th class="border-top-0"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in medications" :key="index"> 
                            <!-- <td>{{ item.body.title }}</td> -->
                            <td>{{ item.body.title }}</td>
                            <td>{{ item.body.dosage ? item.body.dosage : '--'}}</td>
                            <td>{{ item.body.unit ? item.body.unit : '--'}}</td>
                            <td>{{ item.body.activityDuration.repeat.frequency }} {{ item.body.activityDuration.repeat.periodUnit }}</td> 
                            <td>{{ item.body.activityDuration.review.period }} {{ item.body.activityDuration.review.periodUnit }}</td> 
                            <td>
                              <a href="javascript:void(0)" @click="removeMedication(index)" class="btn btn-sm btn-warning">
                                  <i class="fa fa-times text-white"></i>
                              </a>
                            </td> 
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p class="px-2" v-if="medications.length == 0">Not available</p>

                    <h5 class="px-2 mt-4">New Medication</h5>
                    <div class="table-responsive  mb-3" v-if="newMedication.length">
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
                          <tr v-for="(item, index) in newMedication" :key="index" >
                            <td>{{ item.body.title }}</td>
                            <td>{{ item.body.dosage }}</td>
                            <td>{{ item.body.unit }}</td>
                            <td>{{ item.body.activityDuration.repeat.frequency }}  {{ item.body.activityDuration.repeat.periodUnit }}</td>
                            <td>{{ item.body.activityDuration.review.period }} {{ item.body.activityDuration.review.periodUnit }} </td>
                            <td>
                              <a href="javascript:void(0)" @click="newMedication.splice(index, 1)" class="btn btn-sm btn-warning">
                                  <i class="fa fa-times text-white"></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
              </div>
          </div>

          <!-- New Counselling Care Plan Recommendations  -->
          <div class="row mb-3">
            <div class="col-md-12">
              <div class="card tab-card mb-3 card-blue-header">
                <div class="card-header">New Counselling Care Plan Recommendations</div>
                  <!-- <button type="submit" class="btn btn-primary right px-3 m-2 ml-auto radious-0" ><i class="fa fa-plus"></i> Add</button> -->
                  <div class="table-responsive" v-if="allData && allData.careplan && allData.careplan.activities">
                    <table class="table tbl-bordered-td">
                      <thead>
                        <tr>
                          <th width="45%" class="border-top-0">Action</th>
                          <th width="5%" class="border-top-0 text-center">Action Completed?</th>
                          <th width="45%" class="border-top-0">Outcome</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in allData.careplan.activities" :key="index" v-if="item.category == 'survey'">
                          <td class="align-middle">{{ item.title }}</td>
                          <td class="text-center align-middle">
                            <div class="custom-control custom-switch">
                              <input @change="onActionUpdate(index)" type="checkbox" class="custom-control-input" :id="'ncr-'+item.id" v-model="allData.careplan.activities[index].status">
                              <label class="custom-control-label " :for="'ncr-'+item.id"></label>
                            </div>
                          </td>
                          <td class="align-middle">
                            <textarea class="form-control" v-model="allData.careplan.activities[index].outcomeConcept.comment"></textarea>
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
                    <div class="table-responsive" v-if="newDiagnosis.length">
                      <table class="table tbl-bordered-td">
                        <thead>
                          <tr>
                            <th class="border-top-0">Diagnosis</th>
                            <th class="border-top-0">Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in newDiagnosis" :key="index">
                            <td>{{ item.name }}</td>
                            <td>{{ item.comment }}</td>
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
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="follow_up" value="1w" id="one-week" v-on:change="generateFollowUpDate" v-model="selectedFollowup">
                        <label class="form-check-label" for="one-week">1 week</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="follow_up" value="2w" id="two-week" v-on:change="generateFollowUpDate" v-model="selectedFollowup">
                        <label class="form-check-label" for="two-week">2 weeks</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="follow_up" value="1m" id="one-month" v-on:change="generateFollowUpDate" v-model="selectedFollowup">
                        <label class="form-check-label" for="one-month">1 month</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="follow_up" value="3m" id="three-month" v-on:change="generateFollowUpDate" v-model="selectedFollowup">
                        <label class="form-check-label" for="three-month">3 months</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="follow_up" value="6m" id="six-month" v-on:change="generateFollowUpDate" v-model="selectedFollowup">
                        <label class="form-check-label" for="six-month">6 months</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="follow_up" value="1y" id="one-year" v-on:change="generateFollowUpDate" v-model="selectedFollowup">
                        <label class="form-check-label" for="one-year">1 year</label>
                      </div>

                      <div class="follow-up-date mt-3" v-if="folloUpDate"><b>Follow up date:</b> {{  moment(folloUpDate, 'YYYY-MM-DD').format('DD MMM YYYY') }}</div>
                    </div>
                </div>
                    
                </div>
              </div>
          </div>

          <div class="text-center py-3 mb-3">
              <!-- <router-link :to="{name: 'carePlanReview', params: {patientId: patientId}}" class="btn btn-primary px-5 radious-0">Proceed To Confirmation</router-link> -->
              <button class="btn btn-primary px-5 radious-0" @click="proceed">Proceed To Confirmation</button>
          </div>
        </div>
      <!-- </form> -->

      <!-- pop ups -->
      <div class="modal fade" id="modal-add-medication" tabindex="-1" role="dialog" aria-labelledby="modal-add-medication" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content modal-blue-header p-0 radious-0">
            <div class="modal-header py-2 px-3">
              <h5 class="modal-title text-white">Add Medication</h5>
              <button type="button" ref="elCloseMedication" class="close text-white" data-dismiss="modal" aria-label="Close">
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
                          
                          <input v-if="medication.title && medication.title.name == 'other'" type="text" class="form-control mt-2" name="other_drug" placeholder="Enter Drug Name" v-model="other_drug_name" required />
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
                          <select class="form-control" required v-model="medication.period">
                            <option selected value="">Please select one</option>
                            <option v-for="type in frequencyType"  :key="type.id" v-bind:value="type.value">{{type.title}}</option>
                          </select>
                      </div>
                      <div class="col-md-4 mb-3">
                          <label for="validationCustom01">Duration</label>
                          <select class="form-control" required v-model="medication.review">
                              <option selected value="">Please select one</option>
                              <option v-for="duration in durations" :key="duration.id" v-bind:value="duration.value">{{duration.title }}
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
              <button type="button" ref="elCloseDiagnosis" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
             <form @submit.prevent="addDiagnosis">
            <div class="modal-body p-3">
              <div class="form-row">
                  <div class="col-md-12 mb-3">
                      <label for="validationCustom01">Diagnosis</label>
                      <select class="form-control diagnosis-dropdown" name="" v-model="diagnosis.name" required>
                        <option value="">Select diagnosis</option>
                        <option v-for="(item, index) in diagnosisList" :key="index" :value="item">{{ item }}</option>
                      </select>
                  </div>
                  <div class="col-md-12 ">
                      <label for="validationCustom01">Comments</label>
                      <textarea class="form-control" name="comments" placeholder="Comments" v-model="diagnosis.comment"></textarea>
                  </div>
              </div>
            </div>
            <div class="modal-footer p-3">
              <button type="submit" class="btn btn-primary radious-0">Confirm</button>
            </div>
             </form>
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
                <button type="button" ref="elCloseInvestigation" class="close text-white" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body p-3">
                <div class="form-row">
                    <div class="col-md-12 mb-3">
                        <label for="validationCustom01">Investigation</label>
                        <select class="form-control" v-model="investigation" required>
                          <option value="">Please Select</option>
                          <option :value="item.name" v-for="(item,index) in investigationLists" :key="index">{{ item.name }}</option>
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
  data() {
    return {
      missingData: false,
      cvdRisk: {},
      patientId: '',
      isLoading: false,
      patient: null,
      drugs: [],
      medicationEnabled: false,
      medication: {},
      medications: [],
      newMedication: [],
      activity: {},
      newActions: [],
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
      allData: null,
      investigations: [],
      investigation: '',
      investigationLists: [
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
      newDiagnosis: [],
      diagnosis: {},
      diagnosisList: ['lupus', 'diabetes', 'bronchitis', 'hypertension', 'cancer', 'Ciliac', 'Scleroderma', 'Abulia', 'Agraphia', 'Chorea', 'Coma'],
      isDiagnosisMsg: false,
      lastEncounter: null,
      lastReports: null,
      lastCareplans: [],
      folloUpDate: '',
      selectedFollowup:  null,
      removedCounsellings: [],
      other_drug_name: null
    };
  },
  methods: {
    onActionUpdate(index) {
      if (this.allData.careplan.activities[index].status) {
        this.removedCounsellings.push(this.allData.careplan.activities[index]);
        
        console.log(this.removedCounsellings)
      } else {
        let existingCounselling = this.removedCounsellings.indexOf(this.allData.careplan.activities[index]);
        this.removedCounsellings.splice(existingCounselling, 1)
      }

      console.log(this.removedCounsellings.length);
      // console.log(this.allData.careplan.activities[index].status);
    },
    getHealthReport() {
      // To do: remove below line
      // let pID = '13e781d8-702d-4f0f-ad6f-2e7d1cb1f013';
      this.isLoading = true;
      this.$http.post('/health-reports/generate/' + this.patientId).then(response => {
        this.isLoading = false;
        if (response.status == 200) {
          console.log('health report ', response.data);
          if (!response.data || response.data == {} || !response.data.careplan) {
            console.log('hello')
            this.missingData = true;
            return;
          }

          if (response.data.assessments && response.data.assessments.cvd) {
            this.cvdRisk = response.data.assessments.cvd;
            console.log('this cvd', this.cvdRisk);
          }
          // if ()
          this.allData = response.data;
          console.log('Report: ', this.allData);
        } else {
          this.missingData = true;
          console.log('error ');
        } 
      }).catch(err => {
        this.isLoading = false;
        this.missingData = true;
        console.log(err.message);
      })
    },
    getPatients() {
      let loader = this.$loading.show();
      this.$http.get("/patients/" + this.patientId).then(
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

    getMedicationsByPatient() {
      let loader = this.$loading.show();
      this.$http.get("/patients/" + this.patientId + "/medications").then(
        (response) => {
          loader.hide();
          console.log('medications sadas ', response);
          if (response.status == 201) {
            if (response.data.data) {
              this.medications = response.data.data;
              console.log('medications ', this.medications);
            }
            
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
          this.drugs = response.data.data;
          console.log('drugs: ', this.drugs);
          this.drugs.push({id: 'id_other', name: 'other'});
          this.isLoading = false
          this.dataReady = true
        }
      })
    },

    addMedication() {
      let startDate = new Date()
      let endDate = new Date()
      let period = this.medication.period.split(/(\d+)/).filter(Boolean);
      let review = this.medication.review.split(/(\d+)/).filter(Boolean);
      
      if (this.medication.title.name == 'other' && this.other_drug_name == '') {
        alert('Enter drug name');
        return;
      }

      let medicineTitle = this.medication.title.name != 'other' ? this.medication.title.name: this.other_drug_name;
     
      if (review[1] == 'w') {
        endDate = endDate.addDays(review[0] * 7)
      } else if (review[1] == 'm') {
        endDate = endDate.addDays(review[0] * 30)
      } else {
        endDate = endDate.addDays(review[0])
      }

      let startPeriod = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate()
      let endPeriod = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate()
      let activity = {
        category: "medication",
        title: medicineTitle,
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
            // period: period[0],
            periodUnit: period[0],
            frequency: this.medication.frequency
          },
          review: {
            period: review[0],
            periodUnit: review[1],
          }
        },
        comments: {
          comment: this.medication.comment ? this.medication.comment : null
        }
      }

      this.newMedication.push({body: activity});
      this.medication = {};
      this.$refs.elCloseMedication.click();
    },

    addInvestigation() {
      this.investigations.push(this.investigation);
      this.$refs.elCloseInvestigation.click();
      this.investigation = '';
    },

    removeMedication(index) {
      let findIndex = null;
      
      this.$http.delete('/patients/' + this.patientId + "/medications/" + this.medications[index].id).then( response => {
        this.isLoading = false

        if (response.status == 201) {
          this.medications.splice(index, 1);
        } else {
          this.alert = 'error'
        }
        

      }).catch(err => {
        console.log(err.message)
      })
    },

    addDiagnosis() {
      let data = {
        name: this.diagnosis.name,
        comment: this.diagnosis.comment
      };
      
      this.newDiagnosis.push(data);
      this.diagnosis = {};

      this.$refs.elCloseDiagnosis.click();

    },
    getGeneratedCareplans() {
      this.$http.get("/generated-care-plans/patient/" + this.patientId).then(
        (response) => {
          console.log('Last: ', response);
          if (response.status == 200) {
            if(response.data.data) {
              this.lastReports = response.data.data.slice(0, 3);
            }
          }
        },
        (error) => {}
      );
    },

    lastGeneratedCareplans() {
      this.$http.get("/care-plans/patient/" + this.patientId).then(
        (response) => {
          
          if (response.status == 200) {

            if (response.data.data) {
              let count = 0;
              let responseData = response.data.data;
              for (let i = 0; i < responseData.length; i ++) {
                if(responseData[i].body.category == 'survey') {
                  this.lastCareplans.push(responseData[i]);
                  count = 1 + count;
                }

                if(count == 3) {
                  return;
                }
              }
              
            }
          }

        },
        (error) => {}
      );
    },
    proceed() {
      if (!this.folloUpDate) {
        this.$toast.open({
          message: 'Please select a followup date',
          type: 'error',
          // all of other options may go here
        });
        return;
      }

      
      // if (this.newMedication.length) {
      //   this.newMedication.forEach(item => {
      //     this.allData.careplan.activities.push(item);
      //   })
      // }

      if (this.folloUpDate) {
        localStorage.setItem('follow_up_date', this.folloUpDate);
      }

      console.log('alldata ', this.allData.careplan.activities);
      console.log('removed ', this.removedCounsellings);

      this.allData.careplan.activities = this.allData.careplan.activities

      this.removedCounsellings.forEach(item => {
        let index = this.allData.careplan.activities.indexOf(item);
        if (index > -1) {
          this.allData.careplan.activities.splice(index, 1)
        }
      })
      // return;

      // console.log('Final:' , this.allData);
      // return;

      console.log('new medications ', this.newMedication);

      localStorage.setItem('report', JSON.stringify(this.allData));
      localStorage.setItem('selectedFollowup', this.selectedFollowup);
      localStorage.setItem('removedCounsellings', JSON.stringify(this.removedCounsellings));
      localStorage.setItem('patientId', this.patientId);
      localStorage.setItem('investigations', JSON.stringify(this.investigations));
      localStorage.setItem('diagnosis', JSON.stringify(this.newDiagnosis));
      localStorage.setItem('medications', JSON.stringify(this.medications));
      localStorage.setItem('newMedications', JSON.stringify(this.newMedication));
      this.$router.push({ name: 'carePlanReview', params: { patientId: this.patientId } } );
    },
    getLastEncounter() {
      this.$http.get("/assessments/patients/" + this.patientId + "/last").then(
        (response) => {
          if (response.status == 200) {
            if(response.data.data.meta.created_at) {
              this.lastEncounter =  moment(response.data.data.meta.created_at).format("Do MMMM YYYY")
            }
          }
        },
        (error) => {}
      );
    },

    getFormatedDate(data) {
        let date = moment
          .unix(data)
          .format("DD MMM YYYY");
   
      return date;
    },
    generateFollowUpDate() {
      console.log(this.folloUpDate);
      if (this.selectedFollowup) {
        let days = '';

        let dateStr = this.selectedFollowup.split(/(\d+)/).filter(Boolean);
        if (dateStr[1] == 'w') {
          days = parseInt(dateStr[0]) * 7;
        }

        if (dateStr[1] == 'm') {
          days = parseInt(dateStr[0]) * 30;
        }

        if (dateStr[1] == 'y') {
          days = parseInt(dateStr[0]) * 365;
        } 
        this.folloUpDate =  moment().add(days, 'days').format('YYYY-MM-DD');
      };
    },

    prepareData() {
      this.getDrugs();
      this.getPatients();
      this.getLastEncounter();
      this.getGeneratedCareplans();
      this.lastGeneratedCareplans();
      this.getMedicationsByPatient();
      
      if (this.patientId == localStorage.getItem('patientId')) {
        let localData = localStorage.getItem('report');
        let localDiagnosis = localStorage.getItem('diagnosis');
        let removedCounsellings = localStorage.getItem('removedCounsellings');
        let localInvestigations = localStorage.getItem('investigations');
        this.folloUpDate = localStorage.getItem('follow_up_date');
        this.selectedFollowup = localStorage.getItem('selectedFollowup');
        let localMedications = localStorage.getItem('medications');
        let localNewMedications = localStorage.getItem('newMedications');

        if (localData) {
          this.allData = JSON.parse(localData);
          this.cvdRisk = this.allData.assessments.cvd;
        }
        if (removedCounsellings) {
          this.removedCounsellings = JSON.parse(removedCounsellings);
          this.removedCounsellings.forEach(item => {
            this.allData.careplan.activities.push(item);
          })
        }

        if (localDiagnosis) {
          this.newDiagnosis = JSON.parse(localDiagnosis);
        }
        if (localMedications) {
          this.medications = JSON.parse(localMedications);
        }
        if (localNewMedications) {
          this.newMedication = JSON.parse(localNewMedications);
        }
        if (localInvestigations) {
          this.investigations =  JSON.parse(localInvestigations);
        }

        this.reviewId = this.allData.report_id ? this.allData.report_id : null;

        
        
        
      }
      else {
        this.getHealthReport();
        
      }
    },

  },
  mounted() {
    this.patientId = this.$route.params.patientId;

    this.prepareData();
    
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
  font-size: 15px;
}
.diagnosis-dropdown option {text-transform:capitalize}
</style>
