<template>
    <div class="content new-patient-registration">
        <div class="animated fadeIn">
            <div class="col-lg-12 d-flex breadcrumb-wrap">
                <i class="fa fa-arrow-left text-secondary back-icon" v-b-modal.modal-discard></i>
                <b-modal id="modal-discard" class="modal-coordinate">
                    <template v-slot:modal-header>
                        <span class="title">Confirm Discard</span>
                    </template>

                    <div class="discard-msg">
                        Are you sure you want to leave without completing the registration?
                    </div>

                    <template v-slot:modal-footer>
                        <div class="w-100">
                            <b-button variant="link" size="md"
                                      class="float-right font-weight-bold p-0 pl-4 pr-1"
                                      @click="$router.push({ name: 'dashboard'})">
                               Leave without saving
                            </b-button>
                            <b-button variant="link" size="md"
                                      class="float-right font-weight-bold p-0"
                                      @click="$bvModal.hide('modal-discard')">
                                Go Back
                            </b-button>
                        </div>
                    </template>
                </b-modal>
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
                            <div class="row">
                                <div class="col-12">
                                    <div class="patient-details-content">

                                        <div class="row">
                                            <div class="col-lg-12 border-bottom">
                                                <div class="title">Contact Details</div>
                                                <div class="contact-details">
                                                    <div class="row">
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="contactFirstName">Contact’s First Name</label>
                                                                <input type="text" class="form-control" id="contactFirstName">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="contactLastName">Contact’s Last Name</label>
                                                                <input type="text" class="form-control" id="contactLastName">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label>Relationship with contact</label>
                                                                <select class="form-control" required v-model="relationContacts">
                                                                    <option>Please select one</option>
                                                                    <option v-for="relationship in relationshipWithContact" :value="relationship.id">{{ relationship.text}}</option>
                                                                </select>
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
                                                                <select class="form-control" required v-model="contactDistrict">
                                                                    <option>Please select one</option>
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="contactPostalCode">Postal Code</label>
                                                                <input type="text" class="form-control" id="contactPostalCode">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="contactTown">Town</label>
                                                                <input type="text" class="form-control" id="contactTown">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="contactVillage">Village</label>
                                                                <input type="text" class="form-control" id="contactVillage">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="contactStreetName">Street Name</label>
                                                                <input type="text" class="form-control" id="contactStreetName">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mt-4">
                                            <div class="col-lg-2">
                                                <div class="form-group">
                                                    <label for="contactMobilePhone">Contact’s Mobile Phone</label>
                                                    <input type="text" class="form-control" id="contactMobilePhone">
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <div class="form-group">
                                                    <label for="contactHomePhone">Contact’s Home Phone (Optional)</label>
                                                    <input type="text" class="form-control" id="contactHomePhone">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-2 mb-4">
                                                <div class="form-group">
                                                    <label for="contactEmail">Contact’s Email Address</label>
                                                    <input type="text" class="form-control" id="contactEmail">
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </tab-content>

                        <tab-content>
                            <div class="row">
                                <div class="col-12">
                                    <div class="patient-details-content">

                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="title">Take a Photo of the Patient</div>
                                                <div class="patient-image" v-if="!(imageData.length > 0)">
                                                    <label for="image">
                                                        <input type="file" name="image" id="image" style="display:none;" @change="previewImage" accept="image/*"/>
                                                        <img src="../../assets/images/photo_camera_24px.png" width="80" height="72" alt="">
                                                    </label>

                                                    <p>Add a Photo</p>

                                                </div>

                                                <div class="patient-image-preview" v-if="imageData.length > 0">
                                                    <div class="image-preview" v-if="imageData.length > 0">
                                                        <img class="preview" :src="imageData" alt="Responsive Image" >
                                                        <span class="imageDelete" @click="uploadDelete"><i class="fas fa-trash"></i></span>
                                                        <span class="imageAdd" @click="newImage"><i class="fas fa-pen"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </tab-content>

                        <tab-content>
                            <div class="row">
                                <div class="col-12">
                                    <div class="patient-details-content">

                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="title">Thumbprint</div>
                                                <div class="patient-thumbprint-image" v-if="!(thumbData.length > 0)">
                                                    <label for="thumbprintImage">
                                                        <input type="file" name="image" id="thumbprintImage" style="display:none;" @change="previewThumb" accept="image/*"/>
                                                        <span class="thumbprint"><i class="fas fa-fingerprint fa-6x"></i></span>
                                                    </label>

                                                    <p>Ask patient to touch the fingerprint sensor</p>

                                                </div>

                                                <div class="patient-thumbprint-preview" v-if="thumbData.length > 0">
                                                    <div class="image-preview" v-if="thumbData.length > 0">
                                                        <img class="preview" :src="thumbData" alt="Responsive Image" >
                                                        <span class="imageDelete" @click="uploadThumbDelete"><i class="fas fa-trash"></i></span>
                                                        <span class="imageAdd" @click="newThumb"><i class="fas fa-sync"></i></span>
                                                    </div>
                                                    <div class="thumbprint-receive">
                                                        <span><i class="fas fa-check"></i></span>Fingerprint Received
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </tab-content>

                        <template slot="footer" slot-scope="props">
                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="wizard-footer-left">
                                        <wizard-button v-if="props.activeTabIndex > 0 && !props.isLastStep"
                                                       @click.native="props.prevTab()"
                                                       :style="props.fillButtonStyle">Back
                                        </wizard-button>
                                    </div>
                                    <div class="wizard-footer-right">
                                        <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()"
                                                       class="wizard-footer-right" :style="props.fillButtonStyle">Next
                                        </wizard-button>

                                        <wizard-button v-else @click.native="alert('Done')"
                                                       class="wizard-footer-right finish-button"
                                                       :style="props.fillButtonStyle">{{props.isLastStep ? 'Complete registration' :
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
        name: "NewRegistration",
        data() {
            return {
                relationContacts: '',
                relationshipWithContact: [
                    {
                        "id": 1,
                        "text": "Father",
                    },
                    {
                        "id": 2,
                        "text": "Mother",
                    },
                    {
                        "id": 3,
                        "text": "Brother",
                    },
                    {
                        "id": 4,
                        "text": "Sister",
                    },
                    {
                        "id": 5,
                        "text": "Spouse",
                    },


                ],
                contactDistrict: '',
                imageData: '',
                thumbData: '',

            }
        },

        methods: {
            previewImage: function(event) {
                // Reference to the DOM input element
                var input = event.target;
                // Ensure that you have a file before attempting to read it
                if (input.files && input.files[0]) {
                    // create a new FileReader to read this image and convert to base64 format
                    var reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imageData = e.target.result;
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[0]);
                }
            },
            previewThumb: function(event) {
                // Reference to the DOM input element
                var input = event.target;
                // Ensure that you have a file before attempting to read it
                if (input.files && input.files[0]) {
                    // create a new FileReader to read this image and convert to base64 format
                    var reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.thumbData = e.target.result;
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[0]);
                }
            },
            uploadDelete: function (event) {
                this.imageData = '';
            },
            newImage: function (event) {
                this.imageData = '';
            },

            uploadThumbDelete: function (event) {
                this.thumbData = '';
            },
            newThumb: function (event) {
                this.thumbData = '';
            }
        }
    }
</script>

<style scoped>

</style>