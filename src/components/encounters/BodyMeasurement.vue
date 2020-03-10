<template>
    <div class="content encounter-body-measurement">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.push({ name: 'encounterCreate', params: { reviewId: '1234s'}})"></i>
                <div class="">
                    <h4>Body Measurements</h4>
                    <div class="breadcrumb"><span>Patients / Jahanara Begum / Create a New Encounter </span>/ Body Measurements</div>
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
                        Complete all components
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-body">
                        <div class="row">
                            <div class="col-lg-6 mb-4">
                                <div class="card" v-b-modal.modal-height>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_height.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Height</div>
                                                    <div class="content-status incomplete-color">Incomplete</div>
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
                                                <input type="number" id="patientHeight" v-model.number="patientHeight" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="heightCm" name="height" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="heightCm">cm</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="heightInch" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="heightInch">inch</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="heightMeasurementDevice">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="heightComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" id="heightComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!patientHeight || !heightMeasurementDevice" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
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
                                <div class="card" v-b-modal.modal-weight>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_weight.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Weight</div>
                                                    <div class="content-status skipped-color">Skipped</div>
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
                                                <input type="number" v-model.number="patientWeight" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="weightPound" name="customRadio" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="weightPound">pound</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="weightKg" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="weightKg">kg</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="weightMeasurementDevice">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="weightComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" id="weightComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!patientWeight || !weightMeasurementDevice" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
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
                                <div class="card" v-b-modal.modal-waist>
                                    <div class="card-body">
                                        <div class="encounter-content" >
                                            <div class="content">
                                                <img src="../../assets/images/hip.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Waist/Hip</div>
                                                    <div class="content-status complete-color">Complete</div>
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
                                                <input type="number" v-model.number="patientWaist" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="waistCm" name="customRadio" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="waistCm">cm</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="waistInch" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="waistInch">inch</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="waistMeasurementDevice">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="waistComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" id="waistComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!patientWaist || !waistMeasurementDevice" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
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
                                <button class="btn btn-save mr-5">Save</button>

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
                patientHeight: '',
                heightMeasurementDevice: '',
                patientWeight: '',
                weightMeasurementDevice: '',
                patientWaist: '',
                waistMeasurementDevice: '',
            }
        }
    }
</script>

<style scoped>

</style>