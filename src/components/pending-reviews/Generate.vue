<template>
    <div class="content pending-review-generate">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon"></i>
                <div class="">
                    <h4>Health Assessment</h4>
                    <div class="breadcrumb"><span>Patients</span>/ {{ patientInfo.first_name + " " +
                        patientInfo.last_name }} / Health Assessment
                    </div>
                </div>
            </div>

            <div class="col-lg-12 border-top border-bottom">
                <div class="patient">
                    <div class="patient-image mr-4">
                        <img src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid"
                             width="100" height="100" alt="">
                    </div>
                    <div class="patient-details">
                        <div class="patient-name">{{ patientInfo.first_name + " " + patientInfo.last_name }}</div>
                        <div class="details">
                            <div class="age">{{ patientInfo.age }} {{ patientInfo.gender }}</div>
                            <div class="nid">NID: {{ patientInfo.nid}}</div>
                            <div class="pid">PID: {{ patientInfo.pid }}</div>
                            <div class="register-date">Registered on {{ patientMeta.created_at }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <b-alert v-if="alert == 'success'"
                     :show="dismissCountDown"
                     dismissible
                     variant="success"
                     @dismissed="dismissCountDown=0"
                     @dismiss-count-down="countDownChanged"
            >
                {{ message }}
            </b-alert>
            <div class="care-plans">

                <div class="care-plan-item d-none">
                    <div class="row ml-3">
                        <div class="col-lg-6 col-md-8 col-sm-9 col-11">
                            <div class="card card-form">
                                <div class="card-header">
                                    New Diagnosis
                                </div>
                                <div class="card-body">
                                    <ul class="diagnosis-list">
                                        <li class="d-flex justify-content-between">
                                            <span>Hypertension</span>
                                            <label class="switch">
                                                <input type="checkbox" checked>
                                                <span class="slider round"></span>
                                            </label>
                                        </li>
                                        <li class="d-flex justify-content-between">
                                            <span>High Blood Pressure</span>
                                            <label class="switch">
                                                <input type="checkbox">
                                                <span class="slider round"></span>
                                            </label>
                                        </li>
                                    </ul>

                                    <div class="card-actions">
                                        <button class="btn btn-outline-primary btn-coordinate w-100"
                                                v-b-modal.modal-diagnosis>
                                            <i class="fas fa-plus"></i>
                                            Add a Diagnosis
                                        </button>
                                    </div>

                                    <b-modal id="modal-diagnosis" class="modal-coordinate">
                                        <template v-slot:modal-header>
                                            <span class="title">Add Diagnosis</span>
                                        </template>
                                        <div class="form-group">
                                            <label for="">Diagnosis</label>
                                            <input type="text" class="form-control form-coordinate"
                                                   v-modal="newDiagnosis">
                                        </div>
                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md"
                                                          class="float-right font-weight-bold p-0 pl-4 pr-1"
                                                          @click="addDiagnosis()">
                                                    Add
                                                </b-button>

                                                <b-button @click="$bvModal.hide('modal-diagnosis')" variant="link"
                                                          size="md" class="float-right font-weight-bold p-0">
                                                    Cancel
                                                </b-button>
                                            </div>
                                        </template>
                                    </b-modal>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="care-plan-item">
                    <div class="row ml-3">
                        <div class="col-lg-6 col-md-8 col-sm-9 col-11">
                            <div class="card card-form">
                                <div class="card-header">
                                    Medications
                                </div>
                                <div class="card-body">
                                    <ul class="diagnosis-list">
                                        <li class="d-flex justify-content-between">
                                            <div v-if="dataReady">
                                                <div v-if="allData.data && allData.data.body && allData.data.body.result && allData.data.body.result.careplan && allData.data.body.result.careplan.activities">
                                                    <div v-for="item in allData.data.body.result.careplan.activities">
                                                        <div v-if="item.category == 'medication'">
                                                            <span> {{ item.title }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" checked>
                                                <span class="slider round"></span>
                                            </label>
                                        </li>
                                    </ul>
                                    <form @submit.prevent="addMedication">
                                        <div class="drugs">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label for="">Drug Name</label>
                                                        <input type="text" v-model="medication.title" required
                                                               class="form-control">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3">
                                                    <div class="form-group">
                                                        <label for="">Frequency</label>
                                                        <input type="number" v-model.number="medication.frequency" required
                                                               class="form-control">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3">
                                                    <div class="form-group">
                                                        <label></label>
                                                        <select class="form-control mt-2" required
                                                                v-model="medication.durationFrequency">
                                                            <option selected value="">Please select one</option>
                                                            <option v-for="type in frequencyType"
                                                                    v-bind:value="type.value">{{type.title}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Duration</label>
                                                        <select class="form-control" required
                                                                v-model="medication.period">
                                                            <option selected value="">Please select one</option>
                                                            <option v-for="duration in durations"
                                                                    v-bind:value="duration.value">{{duration.title}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label>Comment</label>
                                                        <textarea class="form-control" rows="1"
                                                                  v-model="medication.comment"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="card-actions">
                                            <button class="btn btn-outline-primary btn-coordinate  w-100" type="submit">
                                                <i class="fas fa-plus"></i>
                                                Add a Drug Category
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="care-plan-item">
                    <div class="row ml-3">
                        <div class="col-lg-6 col-md-8 col-sm-9 col-11">
                            <div class="card card-form">
                                <div class="card-header">
                                    Actions
                                </div>
                                <div class="card-body">

                                    <div class="actions">

                                        <div v-for="(action, index) in newActions">
                                            <div class="action-item" v-if="action.category != 'medication'">
                                                <div class="d-flex justify-content-between mb-2">
                                                    <span>{{ action.title }}</span>
                                                    <label class="switch">
                                                        <input type="checkbox" checked>
                                                        <span class="slider round"></span>
                                                    </label>
                                                </div>
                                                <div class="form-group">
                                                    <label for="">Duration</label>
                                                    <select v-model="selectedDurations[index]" class="form-control"
                                                            required>
                                                        <option v-for="type in types"
                                                                :selected="selectActionItem(type, action) ">
                                                            {{type.text}}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div class="card-actions">
                                        <div class="btn btn-outline-primary btn-coordinate w-100"
                                             v-b-modal.modal-actions>
                                            <i class="fas fa-plus"></i>
                                            Add an Action
                                        </div>
                                        <b-modal id="modal-actions" class="modal-coordinate">
                                            <template v-slot:modal-header>
                                                <span class="title">Add Actions</span>
                                            </template>
                                            <div class="form-group">
                                                <label for="">Title</label>
                                                <input type="text" class="form-control form-coordinate action-input"
                                                       required v-model="actionTitle">
                                            </div>

<!--                                            <div class="form-group mt-3">-->
<!--                                                <label for="">Duration</label>-->
<!--                                                <select class="form-control" required v-model="selectedOption">-->
<!--                                                    <option v-for="type in types"-->
<!--                                                            v-bind:value="{ id: type.id, text: type.text }">-->
<!--                                                        {{type.text}}-->
<!--                                                    </option>-->
<!--                                                </select>-->
<!--                                            </div>-->

                                            <template v-slot:modal-footer>
                                                <div class="w-100">
                                                    <b-button variant="link" size="md"
                                                              :disabled="!actionTitle"
                                                              class="float-right font-weight-bold p-0 pl-4 pr-1"
                                                              @click="addActionItem">
                                                        Add
                                                    </b-button>

                                                    <b-button variant="link" size="md"
                                                              class="float-right font-weight-bold p-0"
                                                              @click="$bvModal.hide('modal-actions')">
                                                        Cancel
                                                    </b-button>
                                                </div>
                                            </template>
                                        </b-modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="care-plan-item">
                    <div class="row ml-3">
                        <div class="col-lg-6 col-md-8 col-sm-9 col-11">
                            <div class="card card-form">
                                <div class="card-header">
                                    Follow Up
                                </div>
                                <div class="card-body">

                                    <div class="actions">

                                        <div class="action-item">
                                            <div class="d-flex justify-content-between mb-2">
                                                <span>Follow-up NCD health check in 6 months?</span>
                                                <label class="switch">
                                                    <input type="checkbox" v-model="checked">
                                                    <span class="slider round"></span>
                                                </label>
                                            </div>
                                            <span v-if="!checked">After how long should we follow up?</span>
                                            <div class="form-group mt-3" v-if="!checked">
                                                <label for="">Duration</label>
                                                <select name="" id="" class="form-control" v-model="followDuration">
                                                    <option v-for="type in types" :value="type.id">{{ type.text }}</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="care-plan-item">
                    <div class="row ml-3">
                        <div class="col-lg-6 col-md-8 col-sm-9 col-11">
                            <div class="comments">
                                <div class="form-group">
                                    <label for="">Comments/Notes (Optional)</label>
                                    <textarea v-model="comments" class="form-control" rows="4"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <button class="btn btn-primary btn-confirm" @click="updateReviewData">Confirm Care Plan</button>


        </div>
    </div>
</template>
<script>


    export default {
        name: "health-records",
        components: {},
        data() {
            return {
                medicationEnabled: false,
                medication: {},
                fullPage: true,
                participants: [],
                participant_info: {},
                allergies: [],
                participantId: '',
                lifestyle: '',
                body_composition: '',
                blood_pressure: '',
                diabetes: '',
                cholesterol: '',
                cvd: '',
                goals: [],
                referrals: [],
                assessment_date: '',
                newDiagnosis: '',
                patientId: '',
                patientMeta: '',
                patientInfo: '',
                comments: '',
                reviewId: '',
                newActions: [],
                actionTitle: '',
                activity: {},
                selectedOption: [],
                selectedDurations: [],
                frequency: '',
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
                        "id": "7",
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
                allData: '',
                dismissSecs: 5,
                dismissCountDown: 0,
                message: '',
                alert: '',
                dataReady: false,
                "checked": true,
                durationFrequency: '',
                followDuration: ''
            };
        },
        methods: {
            addDiagnosis() {
                // this.$bvModal.hide('modal-diagnosis');
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
                    title: this.medication.title,
                    description: this.medication.title,
                    id: '',
                    roles: ['doctor'],
                    component: {},
                    outcomeConcept: {},
                    activityDuration: {
                        start: startPeriod,
                        end: endPeriod,
                        repeat: {
                            period: period[0],
                            periodUnit: this.medication.durationFrequency,
                            frequency: this.medication.frequency

                        }
                    },
                    comments: {
                        comment: this.medication.comment
                    }
                }
                console.log(this.activity)
                this.allData.data.body.result.careplan.activities.push(this.activity)

            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            selectActionItem(item, action) {

                let itemValue = item.id
                let start = ''
                let end = ''
                if (action.activityDuration && action.activityDuration.start && action.activityDuration.end) {
                    start = action.activityDuration.start
                    end = action.activityDuration.end
                    let start_date = new Date(start)
                    let end_date = new Date(end)
                    let total_months = (end_date.getFullYear() - start_date.getFullYear()) * 12 + (end_date.getMonth() - start_date.getMonth())
                    if (total_months == itemValue) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            },

            updateReviewData() {
                this.isLoading = true;
                var data = this.calculateDuration(this.allData.data);
                this.$http.put('/health-reports/' + this.reviewId, data).then( response => {
                  if (response.status == 200 ) {
                    this.alert = 'success'
                  } else {
                    this.alert = 'error'
                  }
                  this.message = response.data.message
                  this.dismissCountDown = this.dismissSecs
                  this.isLoading = false

                })
            },
            calculateDuration(data) {
                // console.log(data.body.result.careplan.activities);
                for (var item of data.body.result.careplan.activities) {

                    var index = data.body.result.careplan.activities.indexOf(item);
                    // console.log(this.selectedDurations[index]);
                    var type = this.types.find(item => item.text == this.selectedDurations[index])
                    // console.log(type);

                    let startDate = new Date()
                    let endDate = new Date()
                    endDate.addDays(type.value);

                    item.activityDuration.start = startDate;
                    item.activityDuration.end = endDate;

                    console.log(item);

                    // console.log(startDate)
                    // console.log(endDate)


                }

                console.log(data);

                return data;

            },

            addActionItem() {
                this.activity = {}
                this.$bvModal.hide('modal-actions');

                let startDate = new Date()
                let endDate = new Date()
                endDate = endDate.addDays(this.selectedOption * 30)
                let startPeriod = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate()
                let endPeriod = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate()
                this.activity = {
                    category: "survey",
                    title: this.actionTitle,
                    description: this.actionTitle,
                    id: '',
                    roles: ['doctor'],
                    component: {},
                    outcomeConcept: {},
                    activityDuration: {
                        start: startPeriod,
                        end: endPeriod,
                        repeat: {
                            period: this.selectedOption,
                            periodUnit: 'm',
                            frequency: ''

                        }
                    },
                    comments: {
                        comment: ''
                    }
                }
              this.actionTitle = ''
                this.allData.data.body.result.careplan.activities.push(this.activity)
            },
            getHealthReport() {
                this.$http.get('/health-reports/' + this.reviewId).then(response => {
                    if (response.status == 200) {
                        this.allData = response.data
                        // console.log(this.selectedDurations);
                        for (var item of this.allData.data.body.result.careplan.activities) {
                            var index = this.allData.data.body.result.careplan.activities.indexOf(item)
                            this.selectedDurations[index] = 'Within 1 month'

                            var type = this.types.find(item => item.text == this.selectedDurations[index])
                            // console.log(type);

                            let startDate = new Date()
                            let endDate = new Date()
                            endDate.addDays(type.value);

                            item.activityDuration.start = startDate;
                            item.activityDuration.end = endDate;
                        }
                        // console.log(this.selectedDurations);
                        // console.log(this.allData);
                        if (response.data.data && response.data.data.body && response.data.data.body.result && response.data.data.body.result.careplan && response.data.data.body.result.careplan.activities) {
                            this.newActions = response.data.data.body.result.careplan.activities
                        }
                        this.patientId = response.data.data.body.patient_id
                        this.getPatientInfo()
                    }
                })
            },
            getPatientInfo() {
                this.$http.get('/patients/' + this.patientId).then(response => {
                    if (response.status == 200) {
                        this.patientMeta = response.data.data.meta
                        this.patientInfo = response.data.data.body
                        this.isLoading = false
                        this.dataReady = true
                    }
                })
            }
        },
        created() {
            if (this.$route.params.reviewId) {
                this.reviewId = this.$route.params.reviewId
                this.getHealthReport()
            }
        },
        mounted() {


        }
    };
</script>

