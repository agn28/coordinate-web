<template>
    <div class="content new-health-assessment">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
                <div v-if="patient" >
                    <h4>Create Health Assessment</h4>
                    <div class="breadcrumb"><span>Patients </span>/ {{ patient.body.first_name + " " + patient.body.last_name }}</div>
                </div>
            </div>

            <div v-if="patient" class="col-lg-12 border-top border-bottom">
                <div class="patient">
                    <div class="patient-image mr-4">
                        <img v-if="patient.body.avatar" :src="patient.body.avatar" class="rounded-circle img-fluid" width="100" height="100" :alt="patient.body.first_name" onerror="this.src='data:image/png;base64,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'">
                        <img v-else src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
                    </div>
                    <div class="patient-details">
                        <div class="patient-name">{{ patient.body.first_name + " " + patient.body.last_name }}</div>
                        <div class="details">
                            <div class="age">{{ patient.body.age }} {{ patient.body.gender }}</div>
                            <div class="nid">NID: {{ patient.body.nid}}</div>
                            <!-- <div class="pid">PID: {{ patient.body.pid }}</div> -->
                            <div class="register-date">Registered on {{ patient.meta.created_at }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="assessment" class="row">
                <div class="col-lg-12">
                    <div class="patient-condition-content">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="existing-conditions">
                                            <div class="title">Existing Conditions</div>
                                            <div class="list text-capitalize" v-for="(condition, index) in medicalHistory" :key="index" >{{ condition }}</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="existing-conditions">
                                            <div class="title">Current Medications</div>
                                            <div class="list" v-for="(medication, index) in medications" :key="index">{{ medication }}</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="assessment" class="row" >
                            <div class="col-lg-12">
                                <div class="card mb-4 mt-2">
                                    <div class="card-body">
                                        <div class="patient-lifestyle">
                                            <div class="row">
                                                <div class="lifestyle-title">Lifestyle</div>
                                            </div>
                                            <div class="row">
                                                <div v-if="assessment.assessments.lifestyle.components.smoking" class="col-xl-2 col-lg-2 col-md-4">
                                                    <div class="category-type">
                                                        <img src="../../assets/images/lifestyle/icon_smoker.png"
                                                             class="danger" alt="">
                                                        <div class="title">Smoker</div>
                                                        <div class="status" :class="assessment.assessments.lifestyle.components.smoking.tfl">
                                                            {{ assessment.assessments.lifestyle.components.smoking.eval == 'Smoker' ? 'Yes' : 'No' }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="assessment.assessments.lifestyle.components.alcohol" class="col-xl-2 col-lg-2 col-md-4">
                                                    <div class="category-type">
                                                        <img src="../../assets/images/lifestyle/icon_alcohol.png"
                                                             class="danger" alt="">
                                                        <div class="title">Alcohol consumption</div>
                                                        <div class="status" :class="assessment.assessments.lifestyle.components.alcohol.tfl">
                                                            {{ assessment.assessments.lifestyle.components.alcohol.eval }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="assessment.assessments.lifestyle.components.diet.components.fruit" class="col-xl-2 col-lg-2 col-md-4">
                                                    <div class="category-type">
                                                        <img src="../../assets/images/lifestyle/icon_fruits.png"
                                                             class="safe" alt="">
                                                        <div class="title">Fruit consumption</div>
                                                        <div class="status" :class="assessment.assessments.lifestyle.components.diet.components.fruit.tfl">
                                                            {{ assessment.assessments.lifestyle.components.diet.components.fruit.eval }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="assessment.assessments.lifestyle.components.diet.components.vegetable" class="col-xl-2 col-lg-2 col-md-4">
                                                    <div class="category-type">
                                                        <img src="../../assets/images/lifestyle/icon_vegetables.png"
                                                             class="safe" alt="">
                                                        <div class="title">Vegetable consumption</div>
                                                        <div class="status" :class="assessment.assessments.lifestyle.components.diet.components.vegetable.tfl">
                                                            {{ assessment.assessments.lifestyle.components.diet.components.vegetable.eval }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="assessment.assessments.lifestyle.components.physical_activity" class="col-xl-2 col-lg-2 col-md-4">
                                                    <div class="category-type">
                                                        <img src="../../assets/images/lifestyle/icon_physical-activity.png"
                                                             class="danger" alt="">
                                                        <div class="title">Physical activity</div>
                                                        <div class="status" :class="assessment.assessments.lifestyle.components.physical_activity.tfl">
                                                            {{ assessment.assessments.lifestyle.components.physical_activity.eval }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="lifestyle-result">
                                                        <div v-if="assessment.assessments.lifestyle.components.smoking" class="list">{{ assessment.assessments.lifestyle.components.smoking.message }}</div>
                                                        <div v-if="assessment.assessments.lifestyle.components.alcohol" class="list">{{ assessment.assessments.lifestyle.components.alcohol.message }}</div>
                                                        <div v-if="assessment.assessments.lifestyle.components.diet.components.fruit_vegetable" class="list">{{ assessment.assessments.lifestyle.components.diet.components.fruit_vegetable.message }}</div>
                                                        <div v-if="assessment.assessments.lifestyle.components.physical_activity" class="list">{{ assessment.assessments.lifestyle.components.physical_activity.message }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row" v-if="assessment">
                            <div class="col-lg-12">
                                <div class="card mb-4 mt-2">
                                    <div class="card-body">
                                        <div class="patient-body-checkup">
                                            <div class="composition-title">Body Composition</div>
                                            <div class="row">
                                                <div v-if="assessment.assessments.body_composition.components.bmi" class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="title">BMI</div>
                                                        <div class="measurement">
                                                            <div class="result" :class="assessment.assessments.body_composition.components.bmi.tfl">{{ assessment.assessments.body_composition.components.bmi.value }}</div>
                                                            <div class="status" :class="assessment.assessments.body_composition.components.bmi.tfl">{{ assessment.assessments.body_composition.components.bmi.eval }}</div>
                                                            <div class="color-code" id="">
                                                                <div v-for="(bar, index) in bars" :key="index"  class="color-bar mr-2" :class="getClass(bar, assessment.assessments.body_composition.components.bmi.tfl)"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">{{ assessment.assessments.body_composition.components.bmi.target }}</div>
                                                    </div>

                                                </div>
                                                <div v-if="assessment.assessments.body_composition.components.whr" class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="title">Hip/Waist Ratio</div>
                                                        <div class="measurement">
                                                            <div class="result" :class="assessment.assessments.body_composition.components.whr.tfl">{{ assessment.assessments.body_composition.components.whr.value }}</div>
                                                            <div class="status" :class="assessment.assessments.body_composition.components.whr.tfl">{{ assessment.assessments.body_composition.components.whr.eval }}</div>
                                                            <div class="color-code">
                                                                <div v-for="(bar, index) in bars" :key="index"  class="color-bar mr-2" :class="getClass(bar, assessment.assessments.body_composition.components.whr.tfl)"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">{{ assessment.assessments.body_composition.components.whr.target }}</div>
                                                    </div>

                                                </div>
                                                <div v-if="assessment.assessments.body_composition.components.body_fat" class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="title">Fat</div>
                                                        <div class="measurement">
                                                            <div class="result" :class="assessment.assessments.body_composition.components.body_fat.tfl">{{ assessment.assessments.body_composition.components.body_fat.value }}</div>
                                                            <div class="status" :class="assessment.assessments.body_composition.components.body_fat.tfl">{{ assessment.assessments.body_composition.components.body_fat.eval }}</div>
                                                            <div class="color-code">
                                                                <div v-for="(bar, index) in bars" :key="index"  class="color-bar mr-2" :class="getClass(bar, assessment.assessments.body_composition.components.body_fat.tfl)"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">{{ assessment.assessments.body_composition.components.body_fat.target }}</div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="advise">{{ assessment.assessments.body_composition.message }}</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card mb-4 mt-2">
                                    <div class="card-body">
                                        <div v-if="assessment.assessments.blood_pressure" class="patient-body-checkup">
                                            <div class="composition-title">Blood Pressure</div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="measurement">
                                                            <div class="result" :class="assessment.assessments.blood_pressure.tfl">{{ assessment.assessments.blood_pressure.value }}</div>
                                                            <div class="status" :class="assessment.assessments.blood_pressure.tfl">{{ assessment.assessments.blood_pressure.eval }}</div>
                                                            <div class="color-code">
                                                                <div v-for="(bar, index) in bars" :key="index"  class="color-bar mr-2" :class="getClass(bar, assessment.assessments.blood_pressure.tfl)"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">{{ assessment.assessments.blood_pressure.target }}</div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="advise">
                                                    {{ assessment.assessments.blood_pressure.message }}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card mb-4 mt-2">
                                    <div class="card-body">
                                        <div v-if="assessment.assessments.diabetes" class="patient-body-checkup">
                                            <div class="composition-title">Diabetese</div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="title">Blood Sugar</div>
                                                        <div class="measurement">
                                                            <div class="result" :class="assessment.assessments.diabetes.tfl">{{ assessment.assessments.diabetes.value }}</div>
                                                            <div class="status" :class="assessment.assessments.diabetes.tfl">{{ assessment.assessments.diabetes.eval }}</div>
                                                            <div class="color-code">
                                                                <div v-for="(bar, index) in bars" :key="index"  class="color-bar mr-2" :class="getClass(bar, assessment.assessments.diabetes.tfl)"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">{{ assessment.assessments.diabetes.target }}</div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="advise">
                                                    {{ assessment.assessments.diabetes.message }}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card mb-4 mt-2">
                                    <div class="card-body">
                                        <div v-if="assessment.assessments.cholesterol.components.total_cholesterol" class="patient-body-checkup">
                                            <div class="composition-title">Cholesterol</div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="title">Total Cholesterol</div>
                                                        <div class="measurement">
                                                            <div class="result" :class="assessment.assessments.cholesterol.components.total_cholesterol.tfl" >{{ assessment.assessments.cholesterol.components.total_cholesterol.value }}</div>
                                                            <div class="status" :class="assessment.assessments.cholesterol.components.total_cholesterol.tfl" >{{ assessment.assessments.cholesterol.components.total_cholesterol.eval }}</div>
                                                            <div class="color-code">
                                                                <div v-for="(bar, index) in bars" :key="index"  class="color-bar mr-2" :class="getClass(bar, assessment.assessments.cholesterol.components.total_cholesterol.tfl)"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">{{ assessment.assessments.cholesterol.components.total_cholesterol.target }}</div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="advise">
                                                    {{ assessment.assessments.cholesterol.components.total_cholesterol.message }}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card mb-4 mt-2">
                                    <div class="card-body">
                                        <div v-if="assessment.assessments.cvd" class="patient-body-checkup">
                                            <div class="composition-title">Cardiovascular Risk</div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="title">Your 10 year risk</div>
                                                        <div class="measurement">
                                                            <div class="result" :class="assessment.assessments.cvd.tfl" >{{ assessment.assessments.cvd.value }}</div>
                                                            <div class="status" :class="assessment.assessments.cvd.tfl">{{ assessment.assessments.cvd.eval }}</div>
                                                            <div class="color-code">
                                                                <div v-for="(bar, index) in bars" :key="index"  class="color-bar mr-2" :class="getClass(bar, assessment.assessments.cvd.tfl)"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">20-30%</div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="advise">
                                                    {{ assessment.assessments.cvd.message }}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card mb-4 mt-2">
                                    <div class="card-body">
                                        <div class="referral-required">
                                            <div class="referral-title">Referral Required</div>
                                            <div class="referral-msg">Generate a referral before submitting</div>
                                            <button class="btn btn-light"><span><i class="fas fa-plus"></i></span>Generate
                                                Referral
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="submit-row">
                                    <button class="btn btn-primary" @click="confirmAssessment()">Submit for Confirmation</button>
                                    <button class="btn btn-light">Cancel</button>
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
    export default {
        name: "PastHealthAssessment",
        data() {
            return {
                encounters: [],
                patientId: '',
                assessment: null,
                assessmentId: '',
                patient: null,
                observations: null,
                medicalHistory: [],
                medications: [],
                bars: [
                    'BLUE',
                    'GREEN',
                    'AMBER',
                    'RED',
                    'DEEP-RED',
                ]
            };
        },
        methods: {

            getPatient() {
                let loader = this.$loading.show();
                this.$http.get("/patients/" + this.patientId).then(response => {
                    loader.hide();
                    if (response.status == 200) {
                    this.patient = response.data.data;
                    }
                },
                error => {
                    loader.hide()
                });

            },
            convertTime(assessment) {
                return moment(assessment.report_date._seconds*1000).format('MMMM DD YYYY');
            },

            confirmAssessment() {
                let loader = this.$loading.show();
                let today = new Date();
                let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                let dateTime = date + ' ' + time;
                var data = {
                    "id": this.$uuid.v4(),
                    "meta": {
                        "collected_by": this.$store.state.auth.user.uid,
                        "created_at": dateTime,
                    },
                    "body": {
                        "patient_id": this.patientId,
                        "comment": '',
                        "result": this.assessment
                    }
                };
                console.log(data);

                this.$http
                .post("/health-reports/", data)
                .then(response => {
                    loader.hide();
                    if (response.status == 201) {
                        this.$router.push({
                            name: "healthAssessmentCreated",
                            params: { patientId: this.patientId }
                        });
                    }
                }, 
                error => {
                    loader.hide()
                }
                );
            },

            getAssessments() {
                let loader = this.$loading.show();

                this.$http
                .post("/health-reports/generate/" + this.patientId)
                .then(response => {
                    loader.hide();
                    if (!response.data.error) {
                        this.assessment = response.data;
                    } else {
                        console.log(response.data);
                    }
                }, 
                error => {
                    loader.hide()
                }
                );
            },

            getClass(bar, tfl) {
                if (bar == tfl) {
                    return 'back-' + bar + ' ' + bar+'-before';
                }
                return 'back-' + bar;
            },

            getObservation() {
                this.$http.get("/observations/" )
                .then(response => {
                    if (!response.data.error) {
                        console.log(response.data)
                        this.observations = response.data.data;
                        this.prepareSurveyData();
                    }
                });
                
            },

            prepareSurveyData() {
                this.observations.forEach((obs) => {
                    if (obs.body.patient_id == this.patientId && obs.body.type == 'survey') {
                        // console.log(obs.body);
                        if (obs.body.data.name == 'medical_history') {
                            Object.keys(obs.body.data).forEach((key) => {
                                if (obs.body.data[key] == 'yes') {
                                    if (!this.medicalHistory.includes(key.replace(/_/g, ' '))) {
                                        this.medicalHistory.push(key.replace(/_/g, ' '));
                                    }
                                }
                            })
                        }

                        if (obs.body.data.name == 'current_medication') {
                            this.medications = obs.body.data.medications;
                        }   

                        
                    }
                });
            }
        },

        mounted() {
            this.patientId = this.$route.params.patientId;
            this.getPatient();
            this.getAssessments();
            this.getObservation();
        }
    }
</script>

<style scoped>

</style>
