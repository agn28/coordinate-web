<template>
    <div class="content encounter-blood-tests">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.push({ name: 'encounterCreate', params: { reviewId: '1234s'}})"></i>
                <div class="">
                    <h4>Blood Tests</h4>
                    <div class="breadcrumb"><span>Patients / Jahanara Begum / Create a New Encounter </span>/ Blood Tests</div>
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
                    <div class="encounter-msg">
                        Enter blood test results (where applicable)
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-header">
                        Lipid Profile
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-body">
                        <div class="row">
                            <div class="col-lg-6 mb-4">
                                <div class="card" v-b-modal.modal-cholesterol>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_lipid.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Total Cholesterol</div>
                                                    <div class="content-status incomplete-color">Incomplete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <b-modal id="modal-cholesterol" class="modal-coordinate">
                                        <template v-slot:modal-header>
                                            <span class="title">Set Total Cholesterol</span>
                                        </template>
                                        <div class="d-flex align-items-center">
                                            <div class="form-group">
                                                <label for="patientCholesterol">Cholesterol</label>
                                                <input type="number" id="patientCholesterol" v-model.number="patientCholesterol" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="cholesterolMg" name="height" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="cholesterolMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="cholesterolMm" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="cholesterolMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="cholesterolMeasurementDevice">
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

                                                <b-button variant="link" :disabled="!patientCholesterol || !cholesterolMeasurementDevice" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                                    Set
                                                </b-button>

                                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-cholesterol')">
                                                    Cancel
                                                </b-button>
                                            </div>
                                        </template>
                                    </b-modal>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-4">
                                <div class="card" v-b-modal.modal-hdl>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_lipid.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">HDL</div>
                                                    <div class="content-status skipped-color">Skipped</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <b-modal id="modal-hdl" class="modal-coordinate">
                                        <template v-slot:modal-header>
                                            <span class="title">Set HDL</span>
                                        </template>
                                        <div class="d-flex align-items-center">
                                            <div class="form-group">
                                                <label for="">HDL</label>
                                                <input type="number" v-model.number="patientHdl" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="hdlMg" name="customRadio" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="hdlMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="hdlMm" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="hdlMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="hdlMeasurementDevice">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="hdlComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" id="hdlComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!patientHdl || !hdlMeasurementDevice" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                                    Set
                                                </b-button>

                                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-hdl')">
                                                    Cancel
                                                </b-button>
                                            </div>
                                        </template>
                                    </b-modal>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card" v-b-modal.modal-triglycerides>
                                    <div class="card-body">
                                        <div class="encounter-content" >
                                            <div class="content">
                                                <img src="../../assets/images/illustration_lipid.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Triglycerides</div>
                                                    <div class="content-status complete-color">Complete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <b-modal id="modal-triglycerides" class="modal-coordinate">
                                        <template v-slot:modal-header>
                                            <span class="title">Set Triglycerides</span>
                                        </template>
                                        <div class="d-flex align-items-center">
                                            <div class="form-group">
                                                <label for="">Triglycerides</label>
                                                <input type="number" v-model.number="patientTriglycerides" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="triglyceridesMg" name="customRadio" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="triglyceridesMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="triglyceridesMm" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="triglyceridesMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="triglyceridesMeasurementDevice">
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

                                                <b-button variant="link" :disabled="!patientTriglycerides || !triglyceridesMeasurementDevice" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                                    Set
                                                </b-button>

                                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-triglycerides')">
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
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-header">
                        Blood Glucose
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-body">
                        <div class="row">
                            <div class="col-lg-6 mb-4">
                                <div class="card" v-b-modal.modal-glucose>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_blood_glucose.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Fasting Blood Glucose</div>
                                                    <div class="content-status incomplete-color">Incomplete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <b-modal id="modal-glucose" class="modal-coordinate">
                                        <template v-slot:modal-header>
                                            <span class="title">Set Fasting Blood Glucose</span>
                                        </template>
                                        <div class="d-flex align-items-center">
                                            <div class="form-group">
                                                <label for="patientCholesterol">Blood Glucose</label>
                                                <input type="number" id="patientGlucose" v-model.number="patientGlucose" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="glucoseMg" name="glucose" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="glucoseMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="glucoseMm" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="glucoseMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="glucoseMeasurementDevice">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="glucoseComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" id="glucoseComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!patientGlucose || !glucoseMeasurementDevice" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                                    Set
                                                </b-button>

                                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-glucose')">
                                                    Cancel
                                                </b-button>
                                            </div>
                                        </template>
                                    </b-modal>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="card" v-b-modal.modal-sugar>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_blood_glucose.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Random Blood Sugar</div>
                                                    <div class="content-status skipped-color">Skipped</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <b-modal id="modal-sugar" class="modal-coordinate">
                                        <template v-slot:modal-header>
                                            <span class="title">Set Random Blood Sugar</span>
                                        </template>
                                        <div class="d-flex align-items-center">
                                            <div class="form-group">
                                                <label for="">Blood Sugar</label>
                                                <input type="number" v-model.number="patientSugar" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="sugarMg" name="customRadio" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="sugarMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="sugarMm" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="sugarMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="sugarMeasurementDevice">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="sugarComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" id="sugarComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!patientSugar || !sugarMeasurementDevice" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                                    Set
                                                </b-button>

                                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-sugar')">
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
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-header">
                        Others
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="encounter-body">
                        <div class="row">
                            <div class="col-lg-6 mb-4">
                                <div class="card" v-b-modal.modal-hba>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_hba1c.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Hba1c</div>
                                                    <div class="content-status incomplete-color">Incomplete</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <b-modal id="modal-hba" class="modal-coordinate">
                                        <template v-slot:modal-header>
                                            <span class="title">Set Hba1c</span>
                                        </template>
                                        <div class="d-flex align-items-center">
                                            <div class="form-group">
                                                <label for="patientCholesterol">Hba1c</label>
                                                <input type="number" id="patientHba" v-model.number="patientHba" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="hbaMg" name="hba" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="hbaMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="hbaMm" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="hbaMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="hbaMeasurementDevice">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="hbaComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" id="hbaComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!patientHba || !hbaMeasurementDevice" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                                    Set
                                                </b-button>

                                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-hba')">
                                                    Cancel
                                                </b-button>
                                            </div>
                                        </template>
                                    </b-modal>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-4">
                                <div class="card" v-b-modal.modal-ogt>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_2h.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">2H OGTT</div>
                                                    <div class="content-status skipped-color">Skipped</div>
                                                </div>
                                            </div>
                                            <div class="content-link">
                                                <i class="fa fa-arrow-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <b-modal id="modal-ogt" class="modal-coordinate">
                                        <template v-slot:modal-header>
                                            <span class="title">Set 2H OGTT</span>
                                        </template>
                                        <div class="d-flex align-items-center">
                                            <div class="form-group">
                                                <label for="">2H OGTT</label>
                                                <input type="number" v-model.number="patientOgt" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="ogtMg" name="customRadio" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="ogtMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="ogtMm" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="ogtMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="ogtMeasurementDevice">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="ogtComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" id="ogtComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!patientOgt || !ogtMeasurementDevice" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1">
                                                    Set
                                                </b-button>

                                                <b-button variant="link" size="md" class="float-right font-weight-bold p-0" @click="$bvModal.hide('modal-ogt')">
                                                    Cancel
                                                </b-button>
                                            </div>
                                        </template>
                                    </b-modal>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
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
                patientCholesterol: '',
                cholesterolMeasurementDevice: '',
                patientHdl: '',
                hdlMeasurementDevice: '',
                patientTriglycerides: '',
                triglyceridesMeasurementDevice: '',
                patientGlucose: '',
                glucoseMeasurementDevice: '',
                patientSugar: '',
                sugarMeasurementDevice: '',
                patientHba: '',
                hbaMeasurementDevice: '',
                patientOgt: '',
                ogtMeasurementDevice: '',

            }
        }
    }
</script>

<style scoped>

</style>