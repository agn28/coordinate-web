<template>
    <div class="content encounter-body-measurement">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon"  @click.prevent="$router.go(-1)"></i>
                <div v-if="patient">
                    <h4>Body Measurements</h4>
                    <div class="breadcrumb"><span>Patients / {{ patient.body.first_name + " " + patient.body.last_name }} / Create a New Encounter </span>/ Body Measurements</div>
                </div>
            </div>

            <div class="col-lg-12 border-top border-bottom" v-if="patient">
                <div class="patient mt-2 mb-3">
                    <div class="patient-image mr-3">
                        <img v-if="patient.body.avatar" :src="patient.body.avatar" class="rounded-circle img-fluid" width="100" height="100" :alt="patient.body.first_name" onerror="this.src='data:image/png;base64,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'">
                        <img v-else src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
                    </div>
                    <div class="patient-details">
                        <div class="patient-name">{{ patient.body.first_name + " " + patient.body.last_name }}</div>
                        <div class="details">
                            <div class="age">{{ patient.body.age }} {{ patient.body.gender }}</div>
                            <div class="pid">PID: {{ patient.body.pid }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-header">
                        Complete all components
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-body">
                        <div class="row">
                            <div class="col-lg-6 mb-4">
                                <div class="card pointer" v-b-modal.modal-height>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_height.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Height</div>
                                                    <div v-if="height.value && height.unit && height.device" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status incomplete-color">Incomplete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <b-modal id="modal-height" class="modal-coordinate">
                                        <template v-slot:modal-header>
                                            <span class="title">Set Height</span>
                                        </template>
                                        <div class="d-flex align-items-center">
                                            <div class="form-group">
                                                <label for="patientHeight">Height</label>
                                                <input type="number" id="patientHeight" v-model.number="height.value" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="heightCm" name="height" v-model="height.unit" value="cm" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="heightCm">cm</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="heightInch" value="inch" v-model="height.unit" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="heightInch">inch</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="height.device">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="heightComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" v-model="height.comment" id="heightComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button @click="saveHeight" variant="link" :disabled="!height.value || !height.device || !height.unit" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                                    Set
                                                </b-button>

                                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-height')">
                                                    Cancel
                                                </b-button>
                                            </div>
                                        </template>
                                    </b-modal>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-4">
                                <div class="card pointer" v-b-modal.modal-weight>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_weight.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Weight</div>
                                                    <div v-if="weight.value && weight.unit && weight.device" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status skipped-color">Skipped</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <b-modal id="modal-weight" class="modal-coordinate">
                                        <template v-slot:modal-header>
                                            <span class="title">Set Weight</span>
                                        </template>
                                        <div class="d-flex align-items-center">
                                            <div class="form-group">
                                                <label for="">Weight</label>
                                                <input type="number" v-model.number="weight.value" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="weightPound" v-model="weight.unit" value="pound" name="customRadio" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="weightPound">pound</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="weightKg" v-model="weight.unit" value="kg" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="weightKg">kg</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="weight.device">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="weightComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" v-model="weight.comment" id="weightComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button @click="saveWeight" variant="link" :disabled="!weight.value || !weight.device" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                                    Set
                                                </b-button>

                                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-weight')">
                                                    Cancel
                                                </b-button>
                                            </div>
                                        </template>
                                    </b-modal>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-6 mb-4">
                                <div class="card pointer" v-b-modal.modal-waist>
                                    <div class="card-body">
                                        <div class="encounter-content" >
                                            <div class="content">
                                                <img src="../../assets/images/hip.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Waist/Hip</div>
                                                    <div v-if="hip.value && hip.unit && hip.device" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status incomplete-color">Incomplete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <b-modal id="modal-waist" class="modal-coordinate">
                                        <template v-slot:modal-header>
                                            <span class="title">Set Waist/Hip</span>
                                        </template>
                                        <div class="d-flex align-items-center">
                                            <div class="form-group">
                                                <label for="">Waist</label>
                                                <input type="number" v-model.number="hip.value" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="waistCm" v-model="hip.unit" value="cm" name="customRadio" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="waistCm">cm</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="waistInch" v-model="hip.unit" value="inch" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="waistInch">inch</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="hip.device">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="waistComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" v-model="hip.comment" id="waistComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button @click="saveWaist" variant="link" :disabled="!hip.value || !hip.device" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                                    Set
                                                </b-button>

                                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-waist')">
                                                    Cancel
                                                </b-button>
                                            </div>
                                        </template>
                                    </b-modal>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <button @click="saveAndContinue" class="btn btn-save mr-5">Save</button>

                                <button class="btn btn-cancel">Unable to Perform</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
  export default {
    name: "BodyMeasurement",
    data() {
      return {
        height: {
          unit: 'cm',
          device: '',
          name: "height",
          comment: '',
          value: '',
          codings: {},
        },
        weight: {
          unit: 'pound',
          device: '',
          name: "weight",
          comment: '',
          value: '',
          codings: {},
        },
        hip: {
          unit: 'cm',
          device: '',
          name: "waist",
          comment: '',
          value: '',
          codings: {},
        },

        patientId: null,
        patient: '',
        userId: null,
      }
    },
    created() {
      this.scrollToTop();
      this.patientId = this.$route.params.patientId;
      this.userId = this.$store.state.auth.user.uid
      this.getPatient()
      let measurements = this.$store.getters.getBodyMeasurement
      if (measurements) {
        measurements.forEach(item => {
          if (item.body.data.name == 'height') {
            this.height = item.body.data

          } else if (item.body.data.name == 'waist') {
            this.hip = item.body.data

          } else if (item.body.data.name == 'weight') {
            this.weight = item.body.data

          }
        });
      }
    },
    methods: {
    scrollToTop() {
        window.scrollTo(0,0);
    },
      saveHeight() {
        this.$bvModal.hide('modal-height')
        this.prepareData(this.height)
      },
      saveWeight() {
        this.$bvModal.hide('modal-weight')
        this.prepareData(this.weight)
      },
      saveWaist() {
        this.$bvModal.hide('modal-waist')
        this.prepareData(this.hip)
      },

      prepareData(body) {
        let today = new Date();
        let date = today.getFullYear()+ '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +('0'+today.getDate()).slice(-2);
        let time = ('0' + today.getHours()).slice(-2) + ":" + ('0' + today.getMinutes()).slice(-2) + ":" + ('0' + today.getSeconds()).slice(-2);
        let dateTime = date+' '+time;
        let finalData = {
          id: this.$uuid.v4(),
          meta: {
            collected_by: this.userId,
            created_at: dateTime,
            device_id: body.device
          },
          body: {
            type: 'body_measurement',
            patient_id: this.patientId,
            assessment_id: '',
            data: {
              device: body.device,
              unit: body.unit,
              name: body.name,
              value: body.value,
              comment: body.comment,
              codings: body.codings
            }
          }
        }

        this.$store.dispatch('addBodyMeasurements', finalData)
      },
      saveAndContinue() {
        this.$router.push({ name: 'encounterCreate', params: { patientId: this.patientId }})
      },
      getPatient() {
        let loader = this.$loading.show();
        this.$http.get("/patients/mongo/" + this.patientId).then(response => {
            loader.hide();
            if (response.status == 200) {
              this.patient = response.data.data;
            }
          },
          error => {
            loader.hide()
          });
      },
    }
  }
</script>

<style scoped>

</style>
