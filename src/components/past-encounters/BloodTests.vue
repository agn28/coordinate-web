<template>
    <div class="content encounter-blood-tests">
        <div class="animated fadeIn" v-if="patient">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon" @click.prevent="$router.go(-1)"></i>
                <div class="">
                    <h4>Blood Tests</h4>
                    <div class="breadcrumb"><span>Patients / {{ patient.body.first_name + " " + patient.body.last_name }} / Create a New Encounter </span>/ Blood Tests</div>
                </div>
            </div>

            <div class="col-lg-12 border-top border-bottom">
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
                                <div class="card pointer" v-b-modal.modal-cholesterol>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_lipid.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Total Cholesterol</div>
                                                    <div v-if="cholesterolData.value && cholesterolData.device" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status incomplete-color">Incomplete</div>
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
                                                <input type="number" id="patientCholesterol" v-model.number="cholesterolData.value" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="cholesterolMg" v-model="cholesterolData.unit"  value="mg/dl" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="cholesterolMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="cholesterolMm" v-model="cholesterolData.unit" value="mmol/L" class="custom-control-input">
                                                    <label class="custom-control-label" for="cholesterolMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="cholesterolData.device">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="heightComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" v-model="cholesterolData.comment" id="heightComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1" @click="$bvModal.hide('modal-cholesterol')">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!cholesterolData.value || !cholesterolData.device" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1"
                                                    @click="saveCholesterolMeasurement"
                                                >
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
                                <div class="card pointer" v-b-modal.modal-hdl>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_lipid.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">HDL</div>
                                                    <div v-if="hdlData.value && hdlData.device" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status skipped-color">Skipped</div>
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
                                                <input type="number" v-model.number="hdlData.value" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="hdlMg" v-model="hdlData.unit" value="mg/dl" name="customRadio" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="hdlMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="hdlMm" v-model="hdlData.unit" value="mmol/L" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="hdlMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="hdlData.device">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="hdlComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" v-model="hdlData.comment" id="hdlComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1" @click="$bvModal.hide('modal-hdl')">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!hdlData.value || !hdlData.device || !hdlData.unit" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1"
                                                    @click="saveHDLMeasurement"
                                                >
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
                                <div class="card pointer" v-b-modal.modal-triglycerides>
                                    <div class="card-body">
                                        <div class="encounter-content" >
                                            <div class="content">
                                                <img src="../../assets/images/illustration_lipid.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Triglycerides</div>
                                                    <div v-if="triglyceridesData.value && triglyceridesData.unit && triglyceridesData.device" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status incomplete-color">Incomplete</div>
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
                                                <input type="number" v-model.number="triglyceridesData.value" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="triglyceridesMg" v-model="triglyceridesData.unit" name="customRadio" value="mg/dl" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="triglyceridesMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="triglyceridesMm" name="customRadio" v-model="triglyceridesData.unit" value="mmol/L" class="custom-control-input">
                                                    <label class="custom-control-label" for="triglyceridesMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="triglyceridesData.device">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="waistComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" v-model="triglyceridesData.comment" id="waistComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1" @click="$bvModal.hide('modal-triglycerides')">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!triglyceridesData.value || !triglyceridesData.unit || !triglyceridesData.device" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1"
                                                    @click="saveTriglyceridesMeasurement"
                                                >
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
                                <div class="card pointer" v-b-modal.modal-glucose>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_blood_glucose.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Fasting Blood Glucose</div>
                                                    <div v-if="glucoseData.value && glucoseData.unit && glucoseData.device" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status incomplete-color">Incomplete</div>
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
                                                <input type="number" id="patientGlucose" v-model.number="glucoseData.value" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="glucoseMg" v-model="glucoseData.unit" name="glucose" value="mg/dl" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="glucoseMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="glucoseMm" v-model="glucoseData.unit" value="mmol/L" name="customRadio" class="custom-control-input">
                                                    <label class="custom-control-label" for="glucoseMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="glucoseData.device">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="glucoseComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" v-model="glucoseData.comment" id="glucoseComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1" @click="$bvModal.hide('modal-glucose')">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!glucoseData.unit || !glucoseData.device || !glucoseData.value" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1"
                                                @click="saveGlucoseMeasurement()"
                                                >
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
                                <div class="card pointer" v-b-modal.modal-sugar>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_blood_glucose.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Random Blood Sugar</div>
                                                    <div v-if="sugarData.value && sugarData.unit && sugarData.device" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status skipped-color">Skipped</div>
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
                                                <input type="number" v-model.number="sugarData.value" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="sugarMg" v-model="sugarData.unit" name="customRadio" value="mg/dl" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="sugarMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="sugarMm" v-model="sugarData.unit" name="customRadio" value="mmol/L" class="custom-control-input">
                                                    <label class="custom-control-label" for="sugarMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="sugarData.device">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="sugarComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" v-model="sugarData.comment" id="sugarComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1" @click="$bvModal.hide('modal-sugar')">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!sugarData.value || !sugarData.device || !sugarData.unit" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1"
                                                 @click="saveSugarMeasurement"
                                                >
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
                                <div class="card pointer" v-b-modal.modal-hba>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_hba1c.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">Hba1c</div>
                                                    <div v-if="hbaData.value && hbaData.unit && hbaData.device" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status incomplete-color">Incomplete</div>
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
                                                <input type="number" id="patientHba" v-model.number="hbaData.value" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="hbaMg" v-model="hbaData.unit" value="mg/dl" name="hba" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="hbaMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="hbaMm" name="customRadio" v-model="hbaData.unit" value="mmol/L" class="custom-control-input">
                                                    <label class="custom-control-label" for="hbaMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="hbaData.device">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="hbaComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" v-model="hbaData.comment" id="hbaComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1" @click="$bvModal.hide('modal-hba')">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!hbaData.unit || !hbaData.device || !hbaData.value" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1"
                                                    @click="saveHBAMeasurement"
                                                >
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
                                <div class="card pointer" v-b-modal.modal-ogt>
                                    <div class="card-body">
                                        <div class="encounter-content">
                                            <div class="content">
                                                <img src="../../assets/images/illustration_2h.png" alt="">
                                                <div class="content-details">
                                                    <div class="content-title">2H OGTT</div>
                                                    <div v-if="ogtData.unit && ogtData.value && ogtData.device" class="content-status complete-color">Complete</div>
                                                    <div v-else class="content-status skipped-color">Skipped</div>
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
                                                <input type="number" v-model.number="ogtData.value" class="form-control form-coordinate height-input">
                                            </div>
                                            <div class="measurement-type">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="ogtMg" v-model="ogtData.unit" value="mg/dl" name="customRadio" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="ogtMg">mg/dl</label>
                                                </div>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="ogtMm" name="customRadio" v-model="ogtData.unit" value="mmol/L" class="custom-control-input">
                                                    <label class="custom-control-label" for="ogtMm">mmol/L</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="select-device">
                                            <h5>Select Device</h5>
                                            <div class="select-wrapper">
                                                <select class="select" v-model="ogtData.device">
                                                    <option value=""></option>
                                                    <option value="value1">Device 1</option>
                                                    <option value="value1">Device 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="comment-section">

                                            <div class="form-group">
                                                <label for="ogtComment">Comments/Notes (Optional)</label>
                                                <textarea class="form-control" v-model="ogtData.comment" id="ogtComment" rows="4"></textarea>
                                            </div>
                                        </div>

                                        <template v-slot:modal-footer>
                                            <div class="w-100">
                                                <b-button variant="link" size="md" class="float-left font-weight-bold p-0 pl-1" @click="$bvModal.hide('modal-ogt')">
                                                    Unable to Perform
                                                </b-button>

                                                <b-button variant="link" :disabled="!ogtData.value || !ogtData.device || !ogtData.unit" size="md" class="float-right font-weight-bold p-0 pl-4 pr-1"
                                                    @click="saveOGTMeasurement"
                                                >
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
                                <button class="btn btn-save mr-5" @click="saveAndContinue">Save</button>

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
    name: "BloodTests",
    data() {
      return {
        userId: null,
        patientId: null,
        patient: null,

        glucoseData: {
          unit: 'mmol/L',
          name: 'fasting_blood_glucose'
        },
        sugarData: {
          unit: 'mmol/L',
          name: 'random_blood_sugar'
        },
        hbaData: {
          unit: 'mmol/L',
          name: 'Hba1c',
        },
        ogtData: {
          unit: 'mmol/L',
          name: '2H_OGTT'
        },
        triglyceridesData: {
          unit: 'mmol/L',
          name: 'triglycerides'
        },
        hdlData: {
          unit: 'mmol/L',
          name: 'hdl'

        },
        cholesterolData: {
          unit: 'mmol/L',
          name: 'cholesterol'
        },


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
      prepareData(data) {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        let finalData = {
          id: this.$uuid.v4(),
          meta: {
            collected_by: this.userId,
            created_at: dateTime,
            device_id: data.device
          },
          body: {
            type: 'bloodTestData',
            patient_id: this.patientId,
            assessment_id: '',
            data
          }
        }
        this.$store.dispatch('addBloodTest', finalData)
      } ,
      saveCholesterolMeasurement() {
        this.$bvModal.hide('modal-cholesterol')
        this.prepareData(this.cholesterolData)

      },

      saveHDLMeasurement() {
        this.$bvModal.hide('modal-hdl')
        this.prepareData(this.hdlData)
      },

      saveTriglyceridesMeasurement() {
        this.$bvModal.hide('modal-triglycerides')
        this.prepareData(this.triglyceridesData)
      },

      saveGlucoseMeasurement() {
        this.$bvModal.hide('modal-glucose')
        this.prepareData(this.glucoseData)
      },

      saveSugarMeasurement() {
        this.$bvModal.hide('modal-sugar')
        this.prepareData(this.sugarData)
      },

      saveHBAMeasurement() {
        this.$bvModal.hide('modal-hba')
        this.prepareData(this.hbaData)
      },

      saveOGTMeasurement() {
        this.$bvModal.hide('modal-ogt')
        this.prepareData(this.ogtData)
      },

      saveAndContinue() {
        this.$router.push({ name: 'encounterCreate', params: { patientId: this.patientId }})
      }
    },
    created() {
      this.patientId = this.$route.params.patientId;
      this.userId = this.$store.state.auth.user.uid
      this.getPatient()
      let blood_tests =  this.$store.getters.getBloodTests
      if (blood_tests) {
        blood_tests.forEach(item => {
          if (item.body.data.name == 'cholesterol') {
            this.cholesterolData = item.body.data

          } else if(item.body.data.name == 'hdl') {
            this.hdlData = item.body.data

          } else if(item.body.data.name == 'Hba1c') {
            this.hbaData = item.body.data

          } else if (item.body.data.name == 'triglycerides') {
            this.triglyceridesData = item.body.data

          } else if(item.body.data.name == 'fasting_blood_glucose') {
            this.glucoseData = item.body.data

          } else if(item.body.data.name == 'random_blood_sugar') {
            this.sugarData = item.body.data

          } else if (item.body.data.name == '2H_OGTT') {
            this.ogtData = item.body.data
          }
        });
      }
    },

  }
</script>

<style scoped>

</style>
