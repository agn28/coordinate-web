<template>
  <div class="content encounter-create">
    <div class="animated fadeIn">
      <div class="col-lg-12 d-flex breadcrumb-wrap">
        <i class="fa fa-arrow-left text-secondary back-icon" @click.prevent="$router.go(-1)"></i>
        <div class="">
          <h4>Create a New Encounter</h4>
          <div class="breadcrumb"><span>Patients / Jahanara Begum </span>/ Create a New Encounter</div>
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
          <div class="encounter-header">
            Complete all the sections that are applicable
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="encounter-body">
            <div class="row">
              <div class="col-lg-6 mb-4">
                <div class="card" @click="$router.push({ name: 'questionnaire', params: { reviewId: '1234s'}})">
                  <div class="card-body">
                    <div class="encounter-content">
                      <div class="content">
                        <img src="../../assets/images/illustration_questionnaire.png" alt="">
                        <div class="content-details">
                          <div class="content-title">Questionnaire</div>
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
                <div class="card" @click="$router.push({ name: 'bodyMeasurement', params: { reviewId: '1234s'}})">
                  <div class="card-body">
                    <div class="encounter-content">
                      <div class="content">
                        <img src="../../assets/images/illustration_body-measurements.png" alt="">
                        <div class="content-details">
                          <div class="content-title">Body Measurements</div>
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
              <div class="col-lg-6 mb-4">
                <div class="card" @click="$router.push({ name: 'bloodPressure', params: { reviewId: '1234s'}})">
                  <div class="card-body">
                    <div class="encounter-content" >
                      <div class="content">
                        <img src="../../assets/images/illustration_blood-pressure.png" alt="">
                        <div class="content-details">
                          <div class="content-title">Blood Pressure</div>
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
                <div class="card" @click="$router.push({ name: 'bloodTests', params: { reviewId: '1234s'}})">
                  <div class="card-body">
                    <div class="encounter-content">
                      <div class="content">
                        <img src="../../assets/images/illustration_blood-tests.png" alt="">
                        <div class="content-details">
                          <div class="content-title">Blood Tests</div>
                          <div class="content-status skipped-color">Completed</div>
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
                <div class="comment-section">
                  <div class="form-group">
                    <label for="">Comments/Notes (Optional)</label>
                    <textarea class="form-control" id="" rows="4" cols="50"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xl-4 col-lg-4 col-md-6">
                <div class="encounter-type">
                  <div class="type-title">Encounter Type</div>
                  <div class="type-checkbox">
                    <div class="custom-control custom-radio">
                      <input type="radio" class="custom-control-input" id="inClinic"
                             name="example1" value="customEx">
                      <label class="custom-control-label" for="inClinic">In-clinic Screening</label>
                    </div>
                    <div class="custom-control custom-radio">
                      <input type="radio" class="custom-control-input" id="homeVisit"
                             name="example1" value="customEx">
                      <label class="custom-control-label" for="homeVisit">Home Visit</label>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <button class="btn btn-save mr-5" v-b-modal.modal-save>Save Encounter</button>
                <b-modal id="modal-save" class="modal-coordinate">
                  <template v-slot:modal-header>
                    <span class="title">Confirm Save</span>
                  </template>

                  <div class="discard-msg">
                    You have missing sections for this encounter. Are you sure you want to save?
                  </div>


                  <template v-slot:modal-footer>
                    <div class="w-100">
                      <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-4" >
                        Save
                      </b-button>
                      <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-1" @click="$bvModal.hide('modal-save')">
                        Cancel
                      </b-button>
                    </div>
                  </template>
                </b-modal>

                <button class="btn btn-cancel" v-b-modal.modal-discard>Cancel</button>
                <b-modal id="modal-discard" class="modal-coordinate">
                  <template v-slot:modal-header>
                    <span class="title">Confirm Discard</span>
                  </template>

                  <div class="discard-msg">
                    You have unsaved changes.Would you like to save changes?
                  </div>


                  <template v-slot:modal-footer>
                    <div class="w-100">
                      <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-4" >
                        Save & Discard
                      </b-button>
                      <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-4">
                        Discard without saving
                      </b-button>
                      <b-button variant="link" size="md" class="float-right font-weight-bold p-0 pl-1" @click="$bvModal.hide('modal-discard')">
                        Go Back
                      </b-button>
                    </div>
                  </template>
                </b-modal>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "patients",
  components: {},
  data() {
    return {

    };
  },
  methods: {

  },
  mounted() {

  }
};
</script>

<style lang="">
</style>
