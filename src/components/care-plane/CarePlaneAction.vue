<template>
    <div class="content patient-care-plane-action">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.push({ name: 'carePlane'})"></i>
                <div class="">
                    <h4>Care Plan Action</h4>
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
                <div class="col-lg-12">
                    <div class="care-plane-action">
                        <div class="form-check d-flex mt-4">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Smoking cessation advise provided to patient</label>
                        </div>

                        <div class="comment-section">
                            <div class="form-group">
                                <label for="">Comments/Notes (Optional)</label>
                                <textarea class="form-control" id="" rows="4" cols="50"></textarea>
                            </div>
                        </div>

                        <button class="btn">Mark as Completed</button>

                    </div>
                </div>
            </div>

        </div>
    </div>


</template>

<script>
    export default {
        name: "CarePlaneAction"
    }
</script>

<style scoped>

</style>