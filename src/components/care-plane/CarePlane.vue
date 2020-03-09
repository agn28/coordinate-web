<template>
    <div class="content patient-care-plane">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.push({ name: 'dashboard'})"></i>
                <div class="">
                    <h4>Care Plan</h4>
                    <div class="breadcrumb"><span>Patients / Jahanara Begum</span> / Care Plan</div>
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
                            <div class="nid">NID: 1992121224343</div>
                            <div class="pid">PID: N-121233333</div>
                            <div class="register-date">Registered on Jan 5, 2019</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 border-bottom">
                    <div class="care-plane-date">
                        <div class="row">
                            <div class="col-lg-3">
                                <div class="generate-date">Generated on Jan 5, 2019</div>
                            </div>

                            <div class="col-lg-3">
                                <div class="modified-date">Last modified on Jan 10, 2019</div>
                            </div>

                            <div class="col-lg-3">
                                <button class="btn generate-card">Generate Patient Card</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="care-plane-list">
                        <div class="table-responsive">
                            <table class="table border-bottom">
                                <thead>
                                <tr>
                                    <th scope="col">Action</th>
                                    <th scope="col">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr class="care-data" @click="$router.push({ name: 'carePlaneAction'})">
                                        <td>Provide diet advise</td>
                                        <td class="complete">Completed on Jan 10 2019 <span class="pull-right"><i class="fas fa-arrow-right"></i></span></td>
                                    </tr>
                                    <tr class="care-data" @click="$router.push({ name: 'carePlaneAction'})">
                                        <td>Provide Smoking cessation advise</td>
                                        <td class="pending">Pending <span class="pull-right"><i class="fas fa-arrow-right"></i></span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>


</template>

<script>
    export default {
        name: "CarePlane"
    }
</script>

<style scoped>

</style>