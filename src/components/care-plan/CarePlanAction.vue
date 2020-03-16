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


            <div v-if="carePlan.patient" class="col-lg-12 border-top border-bottom">
                <div class="patient mt-2 mb-3">
                    <div class="patient-image mr-3">
                        <img src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid"
                             width="100" height="100" alt="">
                    </div>
                    <div class="patient-details">
                        <div class="patient-name">{{ carePlan.patient.first_name + ' ' + carePlan.patient.last_name }}</div>
                        <div class="details">
                            <div class="age">{{ carePlan.patient.age }}  {{ carePlan.patient.gender.toUpperCase() }}</div>
                            <div class="nid">NID: {{ carePlan.patient.nid }}</div>
                            <div class="pid">PID: N-121233333</div>
                            <!-- <div class="register-date">Registered on Jan 5, 2019</div> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="care-plane-action" v-if="carePlan.body">
                        <template v-for="(component, index) in carePlan.body.components">
                            <div v-if="component.type == 'form'" class="form-check d-flex mt-4" :key="index">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                <label class="form-check-label" for="exampleCheck1"> Fill up the form <span class="text-primary"> Click Here</span></label>
                            </div>
                        </template>

                        <template v-for="(component, index) in carePlan.body.components">
                            <div v-if="component.type == 'video'" class="form-check d-flex mt-4" :key="index">
                                <input type="checkbox" class="form-check-input" id="exampleCheck2">
                                <label class="form-check-label" for="exampleCheck2"> Watch the video <span class="text-primary youtube-click" @click="openVideo(component)">Click Here</span></label>
                            </div>
                        </template>

                        <b-modal size="lg" id="modal-video" class="modal-video">
                            <!-- <template v-slot:modal-header>
                                <span class="title">Confirm Discard</span>
                            </template> -->

                            <div class="text-center">
                                <iframe width="560" autoplay="true" height="315" :src="videoUrl" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>

                            <template v-slot:modal-footer>
                                <div></div>
                                <!-- <div class="w-100">
                                    <b-button variant="link" size="md"
                                            class="float-right font-weight-bold p-0 pl-4 pr-1"
                                            @click="$router.push({ name: 'dashboard'})">
                                    Leave without saving
                                    </b-button>
                                    <b-button variant="link" size="md"
                                            class="float-right font-weight-bold p-0"
                                            @click="$bvModal.hide('modal-discard')">
                                        Go Back
                                    </b-button>
                                </div> -->
                            </template>
                        </b-modal>

                        <div class="comment-section">
                            <div class="form-group">
                                <label for="">Comments/Notes (Optional)</label>
                                <textarea v-model="comment" class="form-control" id="" rows="4" cols="50"></textarea>
                            </div>
                        </div>

                        <button @click="completeCarePlan()" class="btn">Mark as Completed</button>

                    </div>
                </div>
            </div>

        </div>
    </div>


</template>

<script>
    export default {
        name: "CarePlaneAction",
        data() {
            return {
                carePlanId: '',
                carePlan: {},
                videoUrl: '',
                comment: ''
            }
        },
        mounted() {
            this.carePlanId = this.$route.params.carePlanId;
            // this.carePlanId = '96cbc640-6289-11ea-9b18-ef033de922f5';
            console.log(this.$route)
            this.getCarePlan();
        },
        methods: {
            getCarePlan() {
                let loader = this.$loading.show();
                this.$http.get("/care-plans/" + this.carePlanId, ).then(
                    response => {
                    if (response.status == 200) {
                        console.log(response.data);
                        this.carePlan = response.data.data;
                    }
                    loader.hide();
                    },
                    error => {
                    loader.hide();
                    }
                );
            },

            completeCarePlan() {
                let loader = this.$loading.show();
                this.$http.put("/care-plans/" + this.carePlanId, {
                    "status": "completed",
                    "comment": this.comment,
                    "completed_at": ""
                }).then(
                    response => {
                    if (response.status == 200) {
                        // console.log(response.data);
                        // this.$router.push({ name: 'carePlan' })
                        this.$router.go(-1);
                    }
                    loader.hide();
                    },
                    error => {
                    loader.hide();
                    }
                );
            },

            openVideo(component) {
                // this.videoUrl = component.uri;
                this.videoUrl = component.uri;
                this.$bvModal.show('modal-video')
            }
        },


    }
</script>

<style scoped>

</style>
