<template>
    <div class="content encounter-questionnaire">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.push({ name: 'encounterCreate', params: { reviewId: '1234s'}})"></i>
                <div class="">
                    <h4>Blood Tests</h4>
                    <div class="breadcrumb"><span>Patients / Jahanara Begum / Create a New Encounter </span>/ Blood Tests</div>
                </div>
            </div>

            <div class="col-lg-12 border-top border-bottom">
                <div class="patient mt-2 mb-3">
                    <div class="patient-image mr-3">
                        <img src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid"
                             width="100" height="100" alt="">
                    </div>
                    <div class="patient-details">
                        <div class="patient-name">Jahanara Begum</div>
                        <div class="details">
                            <div class="age">31y Female</div>
                            <div class="pid">PID: N-121233333</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-msg">
                        Complete all the sections that are applicable
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-body">
                        <div class="row">
                            <div class="col-lg-6 mb-4">
                                <div class="card" @click="$router.push({ name: 'tobacco'})">
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_tobacco.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Tobacco</div>
                                                    <div class="content-status incomplete-color">Incomplete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-4">
                                <div class="card" @click="$router.push({ name: 'alcohol'})">
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_alcohol.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Aclohol</div>
                                                    <div class="content-status skipped-color">Skipped</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card" @click="$router.push({ name: 'diet'})">
                                    <div class="card-body">
                                        <div class="encounter-content" >
                                            <div class="content">
                                                <img src="../../assets/images/illustration_diet.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Diet</div>
                                                    <div class="content-status complete-color">Complete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="card" @click="$router.push({ name: 'medication'})">
                                    <div class="card-body">
                                        <div class="encounter-content" >
                                            <div class="content">
                                                <img src="../../assets/images/illustration_medication.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Current Medication</div>
                                                    <div class="content-status complete-color">Complete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 mt-4">
                                <div class="card" @click="$router.push({ name: 'medical'})">
                                    <div class="card-body">
                                        <div class="encounter-content" >
                                            <div class="content">
                                                <img src="../../assets/images/illustration_medical-history.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Medical History</div>
                                                    <div class="content-status complete-color">Complete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4 mb-4">
                            <div class="col-lg-12">
                                <button class="btn btn-save mr-5">Save</button>

                                <button class="btn btn-cancel">Unable to Perform</button>
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
        name: "Questionnaire"
    }
</script>

<style scoped>

</style>