<template>
    <div class="content past-encounter">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon"></i>
                <div class="">
                    <h4>Past Encounters</h4>
                    <div class="breadcrumb"><span>Patients / Jahanara Begum </span>/ Past Encounters</div>
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
                <div class="col-lg-12">
                    <div class="past-encounter-list">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Performed by</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <template>
                                        <td>Jan 25, 2019</td>


                                        <td>In-Clinic</td>
                                        <td>Dr. Jahangir Khan<span><i class="fas fa-arrow-right"></i></span></td>

                                    </template>
                                </tr>
                                <tr>
                                    <template>
                                        <td>Jan 25, 2019</td>
                                        <td>Home Visit</td>
                                        <td>Jahanara Khatun <span><i class="fas fa-arrow-right"></i></span></td>

                                    </template>
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
        name: "PastEncounters"
    }
</script>

<style scoped>

</style>