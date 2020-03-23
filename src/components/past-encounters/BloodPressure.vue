<template>
    <div class="content blood-pressure-add">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon pointer" @click.prevent="$router.go(-1)"></i>
                <div v-if="patient">
                    <h4>Blood Pressure</h4>
                    <div class="breadcrumb"><span>Patients</span>/ <span>{{ patient.body.first_name + " " + patient.body.last_name }}</span> / <span>Create a New Encounter</span> / Blood Pressure</div>
                </div>
            </div>

            <div class="col-lg-12 border-top border-bottom border" v-if="patient">
                <div class="patient">
                    <div class="patient-image">
                        <img v-if="patient.body.avatar" :src="patient.body.avatar" class="rounded-circle img-fluid" width="100" height="100" :alt="patient.body.first_name" onerror="this.src='data:image/png;base64,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'">
                        <img v-else src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
                    </div>
                    <div class="patient-details">
                        <div class="patient-name">{{ patient.body.first_name + " " + patient.body.last_name }}</div>
                        <div class="details">
                            <div class="age text-capitalize">{{ patient.body.age }} {{ patient.body.gender }}</div>
                            <div class="pid">PID: {{ patient.body.pid }}</div>
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
                                            <input type="radio" id="leftArm" v-model="pressure.arm" value="left" name="customRadio" class="custom-control-input" checked>
                                            <label class="custom-control-label" for="leftArm">Left</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <input type="radio" id="rightArm" name="customRadio" v-model="pressure.arm" value="right" class="custom-control-input" v-b-modal.modal-right>
                                            <label class="custom-control-label" for="rightArm">Right</label>
                                            <b-modal id="modal-right" class="modal-coordinate">
                                                <template v-slot:modal-header>
                                                    <span class="title">Reason for using Right Arm</span>
                                                </template>
                                                <div class="d-flex align-items-center">
                                                    <div class="reason-type">
                                                        <div class="form-group">
                                                            <div class="custom-control custom-radio">
                                                                <input type="radio" v-model="pressure.reason_right_arm" value="left-arm-is-missing" id="left-missing" name="left-missing" class="custom-control-input" >
                                                                <label class="custom-control-label" for="left-missing">Left arm is missing</label>
                                                            </div>
                                                            <div class="custom-control custom-radio">
                                                                <input type="radio" id="arm-broken" v-model="pressure.reason_right_arm" value="arm-broken" name="arm-broken" class="custom-control-input">
                                                                <label class="custom-control-label" for="arm-broken">Participant’s hand is broken into pieces</label>
                                                            </div>
                                                            <div class="custom-control custom-radio">
                                                                <input type="radio" id="other" v-model="pressure.reason_right_arm" value="other" name="other" class="custom-control-input">
                                                                <label class="custom-control-label" for="other">Other</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="comment-section">

                                                    <div class="form-group">
                                                        <label for="comment">State Reason</label>
                                                        <textarea class="form-control" v-model="pressure.reason_right_arm" id="comment" rows="4"></textarea>
                                                    </div>
                                                </div>

                                                <template v-slot:modal-footer>
                                                    <div class="w-100">
                                                        <b-button @click="saveMetaData" variant="link" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                                            Save
                                                        </b-button>

                                                        <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-right')">
                                                            Cancel
                                                        </b-button>
                                                    </div>
                                                </template>
                                            </b-modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-2 col-lg-2 col-md-3 col-sm-6">
                                <div class="form-group">
                                    <label for="">Systolic</label>
                                    <input type="text" v-model.number="pressure.systolic" class="form-control form-coordinate custom-pressure-input">
                                </div>
                            </div>
                            <div class="col-xl-2 col-lg-2 col-md-3 col-sm-6">
                                <div class="form-group">
                                    <label for="">Diastolic</label>
                                    <input type="text" v-model.number="pressure.diastolic" class="form-control form-coordinate custom-pressure-input">
                                </div>
                            </div>
                            <div class="col-xl-2 col-lg-2 col-md-3 col-sm-6">
                                <div class="form-group">
                                    <label for="">Pulse Rate</label>
                                    <input type="text" v-model.number="pressure.pulse_rate" class="form-control form-coordinate custom-pressure-input">
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                                <button class="btn btn-outline-primary btn-coordinate" :disabled="!pressure.pulse_rate || !pressure.systolic || !pressure.diastolic" @click="addBpMeasurement" v-b-modal.modal-diagnosis>
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
                                <tr v-if="bloodPressures.length == 0">
                                    <td class="no-data" align="center" colspan="5">No measurements added yet</td>
                                </tr>
                                <tr v-else v-for="(item, index ) in bloodPressures">
                                    <template>
                                        <td>{{ index + 1 }}</td>
                                        <td class="text-capitalize">{{ item.arm }}</td>
                                        <td>{{ item.systolic }}</td>
                                        <td>{{ item.diastolic }}</td>
                                        <td>{{ item.pulse_rate }}</td>
                                    </template>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <div class="warning-msg">

                        <p class="msg-section"><span><i class="fas fa-exclamation-circle"></i></span>Measurement added. Participant must rest for one or
                            two minutes before taking the next BP measurement.
                        </p>
                    </div>

                </div>
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <div class="comment-section mb-4">

                        <div class="form-group mb-4">
                            <label for="exampleFormControlTextarea3">Comments/Notes (Optional)</label>
                            <textarea class="form-control" v-model="pressure_meta.comment" id="exampleFormControlTextarea3" rows="4"></textarea>
                        </div>
                        <div class="select-device">
                            <h5>Select Device</h5>
                            <div class="select-wrapper">
                                <select class="select" v-model="pressure_meta.device">
                                    <option value=""></option>
                                    <option value="value1">Device 1</option>
                                    <option value="value1">Device 2</option>
                                </select>
                            </div>
                        </div>
                        <button class="btn btn-primary mr-4" @click="saveData">Save</button>
                        <button class="btn btn-light border" v-b-modal.modal-unable>Unable to Perform</button>
                        <b-modal id="modal-unable" class="modal-coordinate">
                            <template v-slot:modal-header>
                                <span class="title">Reason for Skipping</span>
                            </template>
                            <div class="d-flex align-items-center">
                                <div class="reason-type">
                                    <div class="form-group">
                                        <div class="custom-control custom-radio">
                                            <input type="radio" v-model="pressure_meta.skip_reason" value="patient_refused" id="refuse" name="" class="custom-control-input" >
                                            <label class="custom-control-label" for="refuse">Patient refused</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <input type="radio" v-model="pressure_meta.skip_reason" value="patient_unable" id="p-unable" name="" class="custom-control-input">
                                            <label class="custom-control-label" for="p-unable">Patient unable</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <input type="radio" id="ins-error" v-model="pressure_meta.skip_reason" value="instrument_error" name="" class="custom-control-input">
                                            <label class="custom-control-label" for="ins-error">Instrument error</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <input type="radio" id="other-skipping" v-model="pressure_meta.skip_reason" value="other" name="other" class="custom-control-input">
                                            <label class="custom-control-label" for="other-skipping">Other</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="comment-section">

                                <div class="form-group">
                                    <label for="comment-unable">State Reason</label>
                                    <textarea class="form-control" v-model="pressure_meta.state_reason" id="comment-unable" rows="4"></textarea>
                                </div>
                            </div>

                            <template v-slot:modal-footer>
                                <div class="w-100">
                                    <b-button variant="link" @click="saveMetaData" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                        Skip
                                    </b-button>

                                    <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-unable')">
                                        Cancel
                                    </b-button>
                                </div>
                            </template>
                        </b-modal>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
  export default {
    name: "BloodPressure",
    data () {
      return {
        userId: null,
        patientId: null,
        patient: '',
        rightArmReason: {},
        bloodPressures: [],
        bpData: {},
        pressure: {
          arm: 'left',
          reason_right_arm: '',
          codings: {}
        },
        pressure_meta: {},
      }
    },
    methods: {
      getPatient() {
        let loader = this.$loading.show();
        this.$http.get("/patients/" + this.patientId).then(response => {
            loader.hide();
            if (response.status == 200) {
              this.patient = response.data.data;
            }
          },
          error => {
            loader.hide()
          });
      },
      addBpMeasurement () {
        this.bloodPressures.push(this.pressure)

        this.pressure =  {
          arm: "left"
        }
      },
      saveMetaData () {
        this.$bvModal.hide('modal-right')
        this.$bvModal.hide('modal-unable')
      },
      saveData () {
        let today = new Date();
        let date = today.getFullYear()+ '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +('0'+today.getDate()).slice(-2);
        let time = ('0' + today.getHours()).slice(-2) + ":" + ('0' + today.getMinutes()).slice(-2) + ":" + ('0' + today.getSeconds()).slice(-2);
        let dateTime = date+' '+time;

        this.bloodPressures.forEach(item => {
          this.bpData = {
            id: this.$uuid.v4(),
            meta: {
              collected_by: this.userId,
              created_at: dateTime,
              device_id: this.pressure_meta.device
            },
            body: {
              comment: this.pressure_meta.comment,
              type: 'blood_pressure',
              patient_id: this.patientId,
              assessment_id: '',
              data: item
            }
          }
          this.$store.dispatch('addBloodPressure', this.bpData)
        })
        this.$router.push({ name: 'encounterCreate', params: { patientId: this.patientId }})
      }
    },
    created() {
      this.patientId = this.$route.params.patientId;
      this.userId = this.$store.state.auth.user.uid
      this.getPatient()
      let blood_data = this.$store.getters.getBloodPressure
      blood_data.forEach( item => {
        this.bloodPressures.push(item.body.data)
      })
    }
  }
</script>

<style scoped>

</style>
