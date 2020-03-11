<template>
    <div class="content patient-overview">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon"></i>
                <div class="">
                    <h4>Patient Overview</h4>
                    <div class="breadcrumb"><span>Patients </span>/ {{ patient.body.first_name + " " + patient.body.last_name }}</div>
                </div>
            </div>

            <div v-if="patient" class="col-lg-12 border-top border-bottom">
                <div class="patient">
                    <div class="patient-image mr-4">
                        <img src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid"
                             width="100" height="100" alt="">
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

            <div class="col-lg-12 border-bottom">
                <div class="patient-edit">
                    <div class="edit"><i class="fas fa-pen"></i>View/Edit Patient Details</div>
                    <div class="care-plane">
                        <router-link tag="a" :to="{ name: 'patientCarePlans', params: { patientId: patientId } }"><i
                                class="fas fa-user-check"></i>Care Plan
                        </router-link>
                    </div>
                    <div class="action"><i class="fas fa-circle"></i>3 Actions Pending</div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="patient-overview-content">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="content-header">
                                            <div class="title">Assessments</div>
                                            <div class="content-date">Last assessment on Jan 5, 2019</div>
                                        </div>
                                        <div class="content-body">
                                            <div class="create">
                                                <span><i class="fas fa-plus"></i></span>
                                                <p>Create a New Assessment</p>
                                            </div>
                                            <div class="view">
                                                <span><i class="fas fa-eye"></i></span>
                                                <p>View Past Assessments</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="content-header">
                                            <div class="title">Health Reports</div>
                                            <div class="content-date">Last assessment on Jan 5, 2019</div>
                                        </div>
                                        <div class="content-body">
                                            <div class="create">
                                                <span><i class="fas fa-plus"></i></span>
                                                <p>Create a New Health Report</p>
                                            </div>
                                            <div class="view">
                                                <span><i class="fas fa-eye"></i></span>
                                                <p>View Past Health Reports</p>
                                            </div>
                                            <div class="subtitle"> <i class="fas fa-circle"></i>Pending Recommendation</div>
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
                    <div class="patient-condition">
                        <div class="card mb-4">
                            <div class="card-body">
                                <div class="content-header">
                                    <div class="title">Existing Conditions</div>
                                </div>
                                <div class="content-body">
                                    <div class="create">
                                        <p>Diabetes</p>
                                    </div>
                                    <div class="view">
                                        <p>Hypertension</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

<!--          <div class="col-md-6">-->
<!--            <div class="card mb-4">-->
<!--              <div class="card-body">-->
<!--                <div class="card-title d-flex justify-content-between">-->
<!--                  <div class="title">Health Reports</div>-->
<!--                  <div class="card-date">Last report on Jan 5, 2020</div>-->
<!--                </div>-->

<!--                <router-link-->
<!--                  :to="{name: 'pendingReviews'}"-->
<!--                  class="text-link custom-text-link"-->
<!--                >View Patients Pending Review</router-link>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--      </div>-->

<!--      <div class="col-lg-12 mt-5">-->
<!--        <div class="row">-->
<!--          <div class="col-md-12">-->
<!--            <div class="card mb-4">-->
<!--              <div class="card-body">-->
<!--                <div class="card-title d-flex justify-content-between">-->
<!--                  <div class="title">Existing conditions</div>-->
<!--                  <div class="card-date">Last assessment on</div>-->
<!--                </div>-->

<!--                <router-link-->
<!--                  :to="{name: 'pendingReviews'}"-->
<!--                  class="text-link custom-text-link"-->
<!--                >View Patients Pending Review</router-link>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div> &ndash;&gt;-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
    // @ is an alias to /src


    export default {
        name: "patients",
        data() {
            return {
                fullPage: true,
                patient: null,
                patientId: '',
            };
        },
        methods: {
            getPatients() {
                let loader = this.$loading.show();
                this.$http.get("/patients/" + this.patientId).then(response => {
                        loader.hide();
                        if (response.status == 200) {
                            this.patient = response.data.data;
                        }
                    },
                    error => {
                        this.loading = false;
                    });
            },

    getId(identifier, type) {
      if (!identifier) {
        return '';
      }
      let id = identifier.find(x => x.use === type);

      if (id) {
        return id.value;
      }
      return "";
    }
  },
  mounted() {
    this.patientId = this.$route.params.patientId;
    this.getPatients();
  }
};
</script>

<style lang="">
</style>
