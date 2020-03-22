<template>
    <div class="content past-encounter">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon" @click.prevent="$router.go(-1)"></i>
                <div class="">
                    <h4>Past Health Assessments</h4>
                    <div class="breadcrumb"><span>Patients / Jahanara Begum </span>/ Past Health Assessments</div>
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
                                    <th scope="col" width="10%">Date</th>
                                    <th scope="col" width="90%"></th>
                                </tr>
                                </thead>
                                <tbody v-if=assessments>
                                <tr v-for="(assessment, index) in assessments" :key="index" @click="$router.push({ name: 'pastHealthAssessmentDetails', params: { patientId: patientId, assessmentId: assessment.id } })">
                                    <template>
                                        <td width="10%">{{ convertTime(assessment) }}</td>
                                        <td align="left" width="90%" class="text-danger"><span><i class="fas fa-arrow-right"></i></span></td>
                                        <!-- <td align="left" width="90%" class="text-danger">Pending Recommendation<span><i class="fas fa-arrow-right"></i></span></td> -->

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
    import moment from 'moment'
    export default {
        name: "PastHealthAssessment",
        data() {
        return {
            encounters: [],
            patientId: '',
            assessments: null,
        };
  },
    methods: {
        convertTime(assessment) {
            return moment(assessment.report_date._seconds*1000).format('MMMM DD YYYY');
        },

        getAssessments() {
            let loader = this.$loading.show();

            this.$http
            .get("/health-reports/patient/" + this.patientId)
            .then(response => {
                loader.hide();
                if (!response.error) {
                    console.log(response.data);
                    this.assessments = response.data.data;
                }
            }, 
            error => {
                loader.hide()
            }
            );
        },
    },

    mounted() {
        console.log('heelllo');
        this.patientId = this.$route.params.patientId;
        this.getAssessments();
    }
}
</script>

<style scoped>

</style>
