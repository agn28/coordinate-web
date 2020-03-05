<template>
    <div class="content new-patient-registration">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon"></i>
                <div class="">
                    <h4>Register a New Patient</h4>
                    <div class="breadcrumb"><span>Patients</span>/ Register a New Patient</div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <form-wizard>
                        <tab-content>
                            <div class="row">
                                <div class="col-12">
                                    <div class="patient-details-content">

                                        <div class="row">
                                            <div class="col-lg-12 border-bottom">
                                                <div class="title">Patient Details</div>
                                                <div class="gender">
                                                    <div class="gender-title">Gender</div>
                                                    <div class="gender-checkbox d-flex">
                                                        <div class="custom-control custom-radio">
                                                            <input type="radio" class="custom-control-input" id="male"
                                                                   name="example1" value="customEx">
                                                            <label class="custom-control-label" for="male">Male</label>
                                                        </div>
                                                        <div class="custom-control custom-radio">
                                                            <input type="radio" class="custom-control-input" id="female"
                                                                   name="example1" value="customEx">
                                                            <label class="custom-control-label"
                                                                   for="female">Female</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="birthday">
                                                    <div class="birthday-title">
                                                        Date of Birth
                                                    </div>

                                                    <div class="birthday-input-box">
                                                        <div class="row">
                                                            <div class="col-lg-2">
                                                                <div class="form-group">
                                                                    <label for="date">dd</label>
                                                                    <input type="text" class="form-control" id="date">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-2">
                                                                <div class="form-group">
                                                                    <label for="month">mm</label>
                                                                    <input type="text" class="form-control" id="month">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-2">
                                                                <div class="form-group">
                                                                    <label for="year">yy</label>
                                                                    <input type="text" class="form-control" id="year">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-12 border-bottom">
                                                <div class="address">
                                                    <div class="address-title">
                                                        Address
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label>District</label>
                                                                <select class="form-control" required>
                                                                    <option>Please select one</option>
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="postalCode">Postal Code</label>
                                                                <input type="text" class="form-control" id="postalCode">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="town">Town</label>
                                                                <input type="text" class="form-control" id="town">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="village">Village</label>
                                                                <input type="text" class="form-control" id="village">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="streetName">Street Name</label>
                                                                <input type="text" class="form-control" id="streetName">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mt-4">
                                            <div class="col-lg-2">
                                                <div class="form-group">
                                                    <label for="mobilePhone">Mobile Phone</label>
                                                    <input type="text" class="form-control" id="mobilePhone">
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <div class="form-group">
                                                    <label for="homePhone">Home Phone (Optional)</label>
                                                    <input type="text" class="form-control" id="homePhone">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-2">
                                                <div class="form-group">
                                                    <label for="email">Email Address</label>
                                                    <input type="text" class="form-control" id="email">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-lg-2">
                                                <div class="form-group">
                                                    <label for="nationalId">National ID</label>
                                                    <input type="text" class="form-control" id="nationalId">
                                                    <label for="nationalId" style="font-size: 14px">13 digit NID number</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </tab-content>

                        <tab-content>

                        </tab-content>

                        <template slot="footer" slot-scope="props">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="wizard-footer-left">
                                        <wizard-button v-if="props.activeTabIndex > 0 && !props.isLastStep"
                                                       @click.native="props.custom-buttons()"
                                                       :style="props.fillButtonStyle">Previous
                                        </wizard-button>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="wizard-footer-bullet">
                                        <div class="bullet-btn active"></div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="wizard-footer-right">
                                        <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()"
                                                       class="wizard-footer-right" :style="props.fillButtonStyle">Next
                                        </wizard-button>

                                        <wizard-button v-else @click.native="alert('Done')"
                                                       class="wizard-footer-right finish-button"
                                                       :style="props.fillButtonStyle">{{props.isLastStep ? 'Done' :
                                            'Next'}}
                                        </wizard-button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </form-wizard>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewRegistration"
    }
</script>

<style scoped>

</style>