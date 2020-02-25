<template>
  <div class="content assessment">
    <div class="loader" v-if="isLoading">
      <rotate-square2></rotate-square2>
    </div>
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex mt-3 mb-3 ml-3">
        <a href=""><i class="fa fa-arrow-left mr-3 text-secondary"></i></a>
        <div class="patient-overview">
          <h4>Health Assessment</h4>
          <div class="breadcrumb"><span>Patients</span>/ patient name / Health Assessment</div>
        </div>
      </div>

      <div class="col-lg-12 border-top border-bottom">
        <div class="patient mt-2 mb-3 ml-3">
          <div class="patient-image mr-4">
            <img src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
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

      <div class="col-lg-12">
        <h4 class="text-bold mt-4 ml-3">Date of Generation: Jan 5, 2020</h4>
        <div class="patient-state mt-4 ml-1">
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-body">
                <span class="edit-icon"> <i class="fas fa-pen"></i></span>
                <h4 class="text-bold">Conditions</h4>
                <ul class="disease-list">
                  <li><img src="../../assets/images/diabetes.png" class="mr-2 mb-2" alt="">Diabetes</li>
                  <li><img src="../../assets/images/hypertension.png" class="mr-2" alt="">Hypertension</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-body">
                <span class="edit-icon"> <i class="fas fa-pen"></i></span>
                <h4 class="text-bold">Current Medications</h4>
                <ul class="medicine-list">
                  <li>None recorded</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="body-content">
          <div class="card">
          <h4>Lifestyle</h4>
          <div class="row">
            <div class="col-lg-3 mb-3">
              <div class="card-body">
                <div class="patient-habit ml-3 mr-3 mt-1">

                  <div class="habit-type">
                    <span class="edit-icon"> <i class="fas fa-pen"></i></span>
                    <img src="../../assets/images/tobacco.png" width="50" height="50" alt="" style="background: transparent">
                    <div class="type-name">Tobacco Use</div>
                    <div class="type-1">Smoke</div>
                    <div>Quit Tobacco</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 mb-3">
              <div class="card-body">
                <div class="patient-habit ml-3 mr-3 mt-1">
                  <div class="habit-type">
                    <span class="edit-icon"> <i class="fas fa-pen"></i></span>
                    <img src="../../assets/images/alcohol.png" width="50" height="50" alt="" style="background: transparent">
                    <div class="type-name">Alcohol Consumption</div>
                    <div class="type-2">None</div>
                    <div>Alcohol use prevention</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 mb-3">
              <div class="card-body">
                <div class="patient-habit ml-3 mr-3 mt-1">
                  <div class="habit-type">
                    <span class="edit-icon"> <i class="fas fa-pen"></i></span>
                    <img src="../../assets/images/diet.png" width="50" height="50" alt="" style="background: transparent">
                    <div class="type-name">Fruits and vegetables intake</div>
                    <div class="type-3">Adequate</div>
                    <div>Maintain current Status</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 mb-3">
              <div class="card-body">
                <div class="patient-habit ml-3 mr-3 mt-1">
                  <div class="habit-type">
                    <span class="edit-icon"> <i class="fas fa-pen"></i></span>
                    <img src="../../assets/images/diet.png" width="50" height="50" alt="" style="background: transparent">
                    <div class="type-name">Fruits and vegetables intake</div>
                    <div class="type-3">Adequate</div>
                    <div>Maintain current Status</div>
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

import {RotateSquare2} from 'vue-loading-spinner'

export default {
  name: "health-records",
  components: { RotateSquare2 },
  data() {
    return {
      isLoading: false,
      participants: [],
      participant_info: {},
      allergies: [],
      participantId: '',
      lifestyle: '',
      body_composition: '',
      blood_pressure: '',
      diabetes: '',
      cholesterol: '',
      cvd: '',
      goals: [],
      referrals: [],
      assessment_date: ''
    };
  },
  methods: {

  },
  mounted() {

  }
};
</script>

