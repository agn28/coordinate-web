<template>
    <div class="content past-assessment">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon"></i>
                <div class="">
                    <h4>Past Assessments</h4>
                    <div class="breadcrumb"><span>Patients / Jahanara Begum / Past Encounters </span>/ Encounter Details</div>
                </div>
            </div>
            <div class="col-lg-12 border-top border-bottom">
                <div class="patient">
                    <div class="patient-image mr-4">
                        <img src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
                    </div>
                    <div class="patient-details">
                        <div class="patient-name">Jahanara Begum</div>
                        <div class="details">
                            <div class="age">31Y Female</div>
                            <div class="nid">NID: 1992121224343 </div>
                            <div class="pid">PID: N-121233333</div>
                            <div class="register-date">Registered on Jan 5, 2019</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 border-bottom">
                    <div class="edit-past-assessment">
                        <div class="assessment-date">Jan 5, 2019</div>
                        <div class="in-clinic">In-Clinic</div>
                        <div class="edit-encounter"><span><i class="fas fa-pen"></i></span>Edit Encounter</div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="past-assessment-content">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="assessment-content">
                                            <div class="observe">Observation</div>
                                            <div class="title">Blood pressure</div>
                                            <div class="reading">Average reading: 139/78 mmHg</div>
                                            <div class="record">Recorded by: Malay Islam on Jan 5 2019 at 15:50</div>
                                            <div class="measured">Measured using M43KS23</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="assessment-content">
                                            <div class="observe">Observation</div>
                                            <div class="title">Fasting blood glucose</div>
                                            <div class="reading">Reading: 74 mg/dL</div>
                                            <div class="record">Recorded by: Malay Islam on Jan 5 2019 at 15:50</div>
                                            <div class="measured">Measured using M43KS23</div>
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
        name: "PastAssessments"
    }
</script>

<style scoped>

</style>