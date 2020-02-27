<template>
  <div class="content blood-pressure-add">
    <div class="loader" v-if="isLoading">
      <rotate-square2></rotate-square2>
    </div>
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex breadcrumb-wrap">
        <i class="fa fa-arrow-left text-secondary back-icon"></i>
        <div class="">
          <h4>Blood Pressure</h4>
          <div class="breadcrumb"><span>Patients</span>/ <span>Jahanara Begum</span> / <span>Create a New Encounter</span> / Blood Pressure</div>
        </div>
      </div>

      <div class="col-lg-12 border-top border-bottom border">
        <div class="patient">
          <div class="patient-image">
            <img src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
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
          <p class="require-msg">Take at least 2 blood pressure measurements, each 1 min apart</p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="pressure-add">
            <div class="row">
              <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                <div class="arm">
                  <h6>Arm</h6>
                  <div class="arm-select">
                    <div class="custom-control custom-radio">
                      <input type="radio" id="leftArm" name="customRadio" class="custom-control-input" checked>
                      <label class="custom-control-label" for="leftArm">Left</label>
                    </div>
                    <div class="custom-control custom-radio">
                      <input type="radio" id="rightArm" name="customRadio" class="custom-control-input">
                      <label class="custom-control-label" for="rightArm">Right</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-md-3 col-sm-6">
                <div class="form-group">
                  <label for="">Systolic</label>
                  <input type="text" class="form-control form-coordinate custom-pressure-input">
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-md-3 col-sm-6">
                <div class="form-group">
                  <label for="">Diastolic</label>
                  <input type="text" class="form-control form-coordinate custom-pressure-input">
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-md-3 col-sm-6">
                <div class="form-group">
                  <label for="">Pulse Rate</label>
                  <input type="text" class="form-control form-coordinate custom-pressure-input">
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                <button class="btn btn-outline-primary btn-coordinate" v-b-modal.modal-diagnosis>
                  <i class="fas fa-plus"></i>
                  Add BP Measurement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <div class="measurement-number">
            <div class="table-responsive">
              <table class="table border">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Arm</th>
                    <th>Systolic</th>
                    <th>Diastolic</th>
                    <th>Pulse Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="no-data" align="center" colspan="5">No measurements added yet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>



      <div class="row">
        <div class="col-lg-6">
          <div class="comment-section mb-4">

              <div class="form-group mb-4">
                <label for="exampleFormControlTextarea3">Comments/Notes (Optional)</label>
                <textarea class="form-control" id="exampleFormControlTextarea3" rows="4"></textarea>
              </div>
            <div class="select-device">
              <h5>Select Device</h5>
              <div class="select-wrapper">
                <select class="select">
                  <option value=""></option>
                  <option value="value1">Device 1</option>
                  <option value="value1">Device 2</option>
                </select>
              </div>
            </div>
              <button class="btn btn-primary mr-4" @click="$router.push({ name: 'pendingReviewGenerate', params: { reviewId: '1234s'}})">Save</button>
              <button class="btn btn-light border" >Unable to Perform</button>
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

