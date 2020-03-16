<template>
    <div class="content health-assessment-create">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap border-bottom">
                <i class="fa fa-arrow-left text-secondary back-icon"></i>
                <div class="">
                    <h4>Health Assessment Created</h4>
                    <div class="breadcrumb"><span>Patients / Jahanara Begum </span>/ Health Assessment Created
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-lg-6 mx-auto mt-4">
                    <div class="card mb-4 mt-2">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="check-register">
                                        <span><i class="fas fa-check"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="assessment-title">Health Assessment Created</div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="created-patient">
                                        <div class="patient-name">Jahanara Begum</div>
                                        <div class="patient-details">
                                            <div class="age">31Y Female</div>
                                            <div class="pid">PID: N-121233333</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="overview">Patient Overview <span><i class="fas fa-angle-right"></i></span></div>
                                </div>
                            </div>

                            <div class="card mb-4 mr-3 ml-3">
                                <div class="card-body">
                                    <div class="details-view">
                                        <div class="left-side">
                                            <img src="../../assets/images/illustration_patients.png" alt="">
                                            <div class="title">Patients</div>
                                        </div>
                                        <div class="right-side">
                                            <span><i class="fas fa-angle-right"></i></span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="card mb-4 mr-3 ml-3" @click="$router.push({name: 'dashboard'})">
                                <div class="card-body">
                                    <div class="details-view">
                                        <div class="left-side">
                                            <img src="../../assets/images/illustration_home.png" alt="">
                                            <div class="title">Go to Home</div>
                                        </div>
                                        <div class="right-side">
                                            <span><i class="fas fa-angle-right"></i></span>
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
        name: "CreatedHealthAssessment"
    }
</script>

<style scoped>

</style>