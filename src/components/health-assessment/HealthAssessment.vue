<template>
    <div class="content health-assessment">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon"></i>
                <div class="">
                    <h4>Health Assessment</h4>
                    <div class="breadcrumb"><span>Patients / Jahanara Begum </span>/ Health Assessment
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
                        <div class="patient-name">Jahanara Begum</div>
                        <div class="details">
                            <div class="age">31Y Female</div>
                            <div class="nid">NID: 1992121224343</div>
                            <div class="pid">PID: N-121233333</div>
                            <div class="register-date">Registered on Jan 5, 2019</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="patient-condition-content">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="assessment-date">Assessed on: Jan 5, 2019</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="existing-conditions">
                                            <div class="title">Existing Conditions</div>
                                            <div class="list">Diabetes</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="existing-conditions">
                                            <div class="title">Current Medications</div>
                                            <div class="list">Metfornin 50mg</div>
                                            <div class="list">Napa 20MG</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card mb-4 mt-2">
                                    <div class="card-body">
                                        <div class="patient-lifestyle">
                                            <div class="row">
                                                <div class="lifestyle-title">Lifestyle</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-2 col-lg-2 col-md-4">
                                                    <div class="category-type">
                                                        <img src="../../assets/images/lifestyle/icon_smoker.png"
                                                             class="danger" alt="">
                                                        <div class="title">Smoker</div>
                                                        <div class="status dange-color">Yes</div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-2 col-lg-2 col-md-4">
                                                    <div class="category-type">
                                                        <img src="../../assets/images/lifestyle/icon_alcohol.png"
                                                             class="danger" alt="">
                                                        <div class="title">Alcohol consumption</div>
                                                        <div class="status medium-color">Medium</div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-2 col-lg-2 col-md-4">
                                                    <div class="category-type">
                                                        <img src="../../assets/images/lifestyle/icon_fruits.png"
                                                             class="safe" alt="">
                                                        <div class="title">Fruit consumption</div>
                                                        <div class="status high-color">High</div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-2 col-lg-2 col-md-4">
                                                    <div class="category-type">
                                                        <img src="../../assets/images/lifestyle/icon_vegetables.png"
                                                             class="safe" alt="">
                                                        <div class="title">Vegetable consumption</div>
                                                        <div class="status high-color">High</div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-2 col-lg-2 col-md-4">
                                                    <div class="category-type">
                                                        <img src="../../assets/images/lifestyle/icon_physical-activity.png"
                                                             class="danger" alt="">
                                                        <div class="title">Physical activity</div>
                                                        <div class="status danger-color">Low activity</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="lifestyle-result">
                                                        <div class="list">Stop smoking</div>
                                                        <div class="list">Reduce alcohol consumption</div>
                                                        <div class="list">Eat more fruits</div>
                                                        <div class="list">Aim for regular excercise, 30 minutes a day
                                                        </div>
                                                    </div>
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
                                        <div class="patient-body-checkup">
                                            <div class="composition-title">Body Composition</div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="title">BMI</div>
                                                        <div class="measurement">
                                                            <div class="result danger-color">31.4</div>
                                                            <div class="status danger-color">Overweight</div>
                                                            <div class="color-code" id="assessmentBmi">
                                                                <div class="color-1"></div>
                                                                <div class="color-2"></div>
                                                                <div class="color-3"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">18.5 to 24.9</div>
                                                    </div>

                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="title">Hip/Waist Ratio</div>
                                                        <div class="measurement">
                                                            <div class="result danger-color">1.29</div>
                                                            <div class="status danger-color">Borderline</div>
                                                            <div class="color-code" id="assessmentWaist">
                                                                <div class="color-1"></div>
                                                                <div class="color-2"></div>
                                                                <div class="color-3"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">18.5 to 24.9</div>
                                                    </div>

                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="title">Fat</div>
                                                        <div class="measurement">
                                                            <div class="result danger-color">5%</div>
                                                            <div class="status danger-color">High</div>
                                                            <div class="color-code" id="assessmentFat">
                                                                <div class="color-1"></div>
                                                                <div class="color-2"></div>
                                                                <div class="color-3"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">18.5 to 24.9</div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="advise">Eat a balanced diet</div>
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
                                        <div class="patient-body-checkup">
                                            <div class="composition-title">Blood Pressure</div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="measurement">
                                                            <div class="result safe-color">110/120</div>
                                                            <div class="status safe-color">Normal</div>
                                                            <div class="color-code" id="assessmentPressure">
                                                                <div class="color-1"></div>
                                                                <div class="color-2"></div>
                                                                <div class="color-3"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">130/80</div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="advise">Since you’re on medications, your BP needs to be
                                                    controlled
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
                                        <div class="patient-body-checkup">
                                            <div class="composition-title">Diabetes status</div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="title">Blood Sugar</div>
                                                        <div class="measurement">
                                                            <div class="result medium-color">5.9</div>
                                                            <div class="status medium-color">Normal</div>
                                                            <div class="color-code" id="assessmentSugar">
                                                                <div class="color-1"></div>
                                                                <div class="color-2"></div>
                                                                <div class="color-3"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">130/80</div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="advise">You’re at a risk of developing diabetes Manage your
                                                    sugar intake
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
                                        <div class="patient-body-checkup">
                                            <div class="composition-title">Cholesterol</div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="title">Total Cholesterol</div>
                                                        <div class="measurement">
                                                            <div class="result danger-color">55 mmol/L</div>
                                                            <div class="status danger-color">High</div>
                                                            <div class="color-code" id="assessmentCholesterol">
                                                                <div class="color-1"></div>
                                                                <div class="color-2"></div>
                                                                <div class="color-3"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">130/80</div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="advise">Look at guidelines for recommendations. Treat based
                                                    on CVD risk rules
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
                                        <div class="patient-body-checkup">
                                            <div class="composition-title">Cardiovascular Risk</div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="composition-type">
                                                        <div class="title">Your 10 year risk</div>
                                                        <div class="measurement">
                                                            <div class="result safe-color">20%</div>
                                                            <div class="status safe-color">Low</div>
                                                            <div class="color-code" id="assessmentCardiovascular">
                                                                <div class="color-1"></div>
                                                                <div class="color-2"></div>
                                                                <div class="color-3"></div>
                                                            </div>
                                                        </div>
                                                        <div class="condition-range">20-30%</div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="advise">This means that over the next 10 years, your risk of
                                                    having a heart attack or stroke is approximately 10%, putting you in
                                                    the low risk population
                                                </div>
                                            </div>
                                        </div>

                                    </div>
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
        name: "HealthAssessment"
    }
</script>

<style scoped>

</style>
