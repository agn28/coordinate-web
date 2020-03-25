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
                <b-modal id="modal-error" class="modal-coordinate">
                    <template v-slot:modal-header>
                        <span class="title">Input Field missing required values</span>
                    </template>

                    <div class="discard-msg">
                        <ul class="list-group list-group-flush text-danger">
                            <li v-for="error in errorMessages" class="list-group-item">{{ error.msg }}</li>
                        </ul>
                    </div>

                    <template v-slot:modal-footer>
                        <div class="w-100">
                            <b-button variant="link" size="lg"
                                      class="float-right  font-weight-bold p-0"
                                      @click="$bvModal.hide('modal-error')">
                                Close
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
                    <div class="alert-success my-5 alert" v-if="message">
                        <h5>{{ message }}</h5>
                    </div>
                    <form-wizard>
                        <div v-if="isInvalid" class="alert text-center alert-danger" role="alert">
                            Please Fill in the required Form Fields
                        </div>

                        <tab-content>
                            <div class="row">
                                <div class="col-12">
                                    <div class="patient-details-content">

                                        <div class="row">
                                            <div class="col-lg-12 border-bottom">
                                                <div class="title">Patient Details</div>
                                                <div class="row">
                                                    <div class="col-lg-2">
                                                        <div class="form-group">
                                                            <label for="date">First Name <span class="text-danger">*</span></label>
                                                            <input type="text"
                                                                   v-model="firstName"
                                                                   v-validate="'required'"
                                                                   v-bind:class="[errors.has('firstName') ? 'is-invalid' : '']"
                                                                   name="firstName"
                                                                   class="form-control" id="firstName">
                                                            <div class="text-danger error-message"
                                                                 v-if="errors.has('firstName')">
                                                               <p>First Name is required!</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <div class="form-group">
                                                            <label for="month">Last Name <span class="text-danger">*</span></label>
                                                            <input type="text" v-model="lastName"
                                                                   v-validate="'required'"
                                                                   v-bind:class="[errors.has('lastName') ? 'is-invalid' : '']"
                                                                   name="lastName"
                                                                   class="form-control" id="lastName">
                                                            <div class="text-danger error-message"
                                                                 v-if="errors.has('lastName')">
                                                                <p>Last Name is required!</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="gender">
                                                    <div class="gender-title">Gender <span class="text-danger">*</span></div>
                                                    <div class="gender-checkbox d-flex">
                                                        <div class="custom-control custom-radio">
                                                            <input type="radio" v-model="gender"
                                                                   class="custom-control-input" id="male" value="male">
                                                            <label class="custom-control-label" for="male">Male</label>
                                                        </div>
                                                        <div class="custom-control custom-radio">
                                                            <input type="radio" v-model="gender"
                                                                   class="custom-control-input" id="female"
                                                                   name="example1" value="female">
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
                                                                    <date-picker v-validate="'required'"
                                                                           v-bind:class="[errors.has('date') ? 'is-invalid' : '']"
                                                                           name="date" v-model="birthDate" :config="options"></date-picker>
                                                                </div>
                                                                <!-- <div class="form-group">
                                                                    <label for="date">DD <span class="text-danger">*</span></label>
                                                                    <input type="text" v-model.number="date"
                                                                           v-validate="'required|digits:2|max_value:31'"
                                                                           v-bind:class="[errors.has('date') ? 'is-invalid' : '']"
                                                                           name="date"
                                                                           class="form-control" id="date">
                                                                    <div class="text-danger error-message"
                                                                         v-if="errors.has('date')">
                                                                        <p>Date is invalid!</p>
                                                                    </div>
                                                                </div> -->
                                                            </div>
                                                            <!-- <div class="col-lg-2">
                                                                <div class="form-group">
                                                                    <label for="month">MM <span class="text-danger">*</span></label>
                                                                    <input type="text" v-model.number="month"
                                                                           v-validate="'required|digits:2|max_value:12'"
                                                                           v-bind:class="[errors.has('month') ? 'is-invalid' : '']"
                                                                           name="month"
                                                                           class="form-control" id="month">
                                                                    <div class="text-danger error-message"
                                                                         v-if="errors.has('month')">
                                                                        <p>Month is invalid!</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-2">
                                                                <div class="form-group">
                                                                    <label for="year">YYYY <span class="text-danger">*</span></label>
                                                                    <input type="text" v-model.number="year"
                                                                           v-validate="'required|digits:4'"
                                                                           v-bind:class="[errors.has('year') ? 'is-invalid' : '']"
                                                                           name="year"
                                                                           class="form-control" id="year">
                                                                    <div class="text-danger error-message"
                                                                         v-if="errors.has('year')">
                                                                        <p>Year is invalid!</p>
                                                                    </div>
                                                                </div>
                                                            </div> -->
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
                                                                <label>District <span class="text-danger">*</span></label>
                                                                <select class="form-control" v-model="address.district"
                                                                        v-validate="'required'"
                                                                        v-bind:class="[errors.has('district') ? 'is-invalid' : '']"
                                                                        name="district"
                                                                        required>
                                                                    <option>Please select one</option>
                                                                    <option value="dhaka">Dhaka</option>
                                                                </select>
                                                                <div class="text-danger error-message"
                                                                     v-if="errors.has('district')">
                                                                    <p>District is required!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="postalCode">Postal Code <span class="text-danger">*</span></label>
                                                                <input type="text" v-model="address.postal_code"
                                                                       v-validate="'required'"
                                                                       v-bind:class="[errors.has('postal_code') ? 'is-invalid' : '']"
                                                                       name="postal_code"
                                                                       class="form-control" id="postalCode">
                                                                <div class="text-danger error-message"
                                                                     v-if="errors.has('postal_code')">
                                                                    <p>Postal Code is required!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="town">Town <span class="text-danger">*</span></label>
                                                                <input type="text" v-model="address.town"
                                                                       v-validate="'required'"
                                                                       v-bind:class="[errors.has('town') ? 'is-invalid' : '']"
                                                                       name="town"
                                                                       class="form-control" id="town">
                                                                <div class="text-danger error-message"
                                                                     v-if="errors.has('town')">
                                                                    <p>Town is required!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="village">Village <span class="text-danger">*</span></label>
                                                                <input type="text" v-model="address.village"
                                                                       v-validate="'required'"
                                                                       v-bind:class="[errors.has('village') ? 'is-invalid' : '']"
                                                                       name="village"
                                                                       class="form-control" id="village">
                                                                <div class="text-danger error-message"
                                                                     v-if="errors.has('village')">
                                                                    <p>Village is required!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="streetName">Street Name <span class="text-danger">*</span></label>
                                                                <input type="text" v-model="address.street_name"
                                                                       v-validate="'required'"
                                                                       v-bind:class="[errors.has('street_name') ? 'is-invalid' : '']"
                                                                       name="street_name"
                                                                       class="form-control" id="streetName">
                                                                <div class="text-danger error-message"
                                                                     v-if="errors.has('street_name')">
                                                                    <p>Street Name is required!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mt-4">
                                            <div class="col-lg-2">
                                                <div class="form-group">
                                                    <label for="mobilePhone">Mobile Phone <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="mobile"
                                                           v-validate="'required'"
                                                           v-bind:class="[errors.has('mobile') ? 'is-invalid' : '']"
                                                           name="mobile"
                                                           class="form-control" id="mobilePhone">
                                                    <div class="text-danger error-message"
                                                         v-if="errors.has('mobile')">
                                                        <p>Mobile Phone is required!</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <div class="form-group">
                                                    <label for="homePhone">Home Phone (Optional)</label>
                                                    <input type="text" v-model="phone" class="form-control" id="homePhone">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-2">
                                                <div class="form-group">
                                                    <label for="email">Email Address</label>
                                                    <input type="email" v-model="email"
                                                           v-validate="'email'"
                                                           v-bind:class="[errors.has('email') ? 'is-invalid' : '']"
                                                           name="email"
                                                           class="form-control" id="email">
                                                    <div class="text-danger error-message"
                                                         v-if="errors.has('email')">
                                                        <p>Invalid Email Format!</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-lg-2">
                                                <div class="form-group">
                                                    <label for="nationalId">National ID <span class="text-danger">*</span></label>
                                                    <input type="text" v-model.number="nid"
                                                           v-validate="'required'"
                                                           v-bind:class="[errors.has('nid') ? 'is-invalid' : '']"
                                                           name="nid"
                                                           class="form-control" id="nationalId">
                                                    <label for="nationalId" style="font-size: 14px">13 digit NID number</label>
                                                    <div class="text-danger error-message"
                                                         v-if="errors.has('nid')">
                                                        <p>NID Number is required!</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <div class="form-group">
                                                    <label for="nationalId">PID</label>
                                                    <input type="text" v-model="pid"
                                                           name="pid"
                                                           class="form-control" id="pId">
                                                    <label for="nationalId" style="font-size: 14px">13 digit PID number</label>
                                                    <div class="text-danger error-message"
                                                         v-if="errors.has('pid')">
                                                        <p>PID Number is required!</p>
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
                                            <div class="col-lg-12 border-bottom">
                                                <div class="title">Contact Details</div>
                                                <div class="contact-details">
                                                    <div class="row">
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="contactFirstName">Contact’s First Name <span class="text-danger">*</span></label>
                                                                <input type="text" v-model="contact.first_name"
                                                                       v-validate="'required'"
                                                                       v-bind:class="[errors.has('contactFirstName') ? 'is-invalid' : '']"
                                                                       name="contactFirstName"
                                                                       class="form-control" id="contactFirstName">
                                                                <div class="text-danger error-message"
                                                                     v-if="errors.has('contactFirstName')">
                                                                    <p>Contact`s First Name is required!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="contactLastName">Contact’s Last Name <span class="text-danger">*</span></label>
                                                                <input type="text" v-model="contact.last_name"
                                                                       v-validate="'required'"
                                                                       v-bind:class="[errors.has('contactLastName') ? 'is-invalid' : '']"
                                                                       name="contactLastName"
                                                                       class="form-control" id="contactLastName">
                                                                <div class="text-danger error-message"
                                                                     v-if="errors.has('contactLastName')">
                                                                    <p>Contact`s Last Name is required!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label>Relationship with contact <span class="text-danger">*</span></label>
                                                                <select class="form-control" required v-model="contact.relationship"
                                                                        v-validate="'required'"
                                                                        v-bind:class="[errors.has('relationship') ? 'is-invalid' : '']"
                                                                        name="relationship"
                                                                >
                                                                    <option>Please select one</option>
                                                                    <option v-for="relationship in relationshipWithContact" :value="relationship.value">{{ relationship.text}}</option>
                                                                </select>
                                                                <div class="text-danger error-message"
                                                                     v-if="errors.has('relationship')">
                                                                    <p>Relationship with Contact is required!</p>
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
                                                                <label>District <span class="text-danger">*</span></label>
                                                                <select class="form-control" required v-model="contact.address.district"
                                                                        v-validate="'required'"
                                                                        v-bind:class="[errors.has('contactDistrict') ? 'is-invalid' : '']"
                                                                        name="contactDistrict"
                                                                >
                                                                    <option>Please select one</option>
                                                                    <option value="dhaka">Dhaka</option>
                                                                </select>
                                                                <div class="text-danger error-message"
                                                                     v-if="errors.has('contactDistrict')">
                                                                    <p>Contact's District is required!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="contactPostalCode">Postal Code <span class="text-danger">*</span></label>
                                                                <input type="text" class="form-control" v-model="contact.address.postal_code"
                                                                       v-validate="'required'"
                                                                       v-bind:class="[errors.has('contactPostalCode') ? 'is-invalid' : '']"
                                                                       name="contactPostalCode"
                                                                       id="contactPostalCode">
                                                                <div class="text-danger error-message"
                                                                     v-if="errors.has('contactPostalCode')">
                                                                    <p>Contact's Postal Code is required!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="contactTown">Town <span class="text-danger">*</span></label>
                                                                <input type="text" v-model="contact.address.town"
                                                                       v-validate="'required'"
                                                                       v-bind:class="[errors.has('contactTown') ? 'is-invalid' : '']"
                                                                       name="contactTown"
                                                                       class="form-control" id="contactTown">
                                                                <div class="text-danger error-message"
                                                                     v-if="errors.has('contactTown')">
                                                                    <p>Contact's Town is required!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="contactVillage">Village <span class="text-danger">*</span></label>
                                                                <input type="text" v-model="contact.address.village"
                                                                       v-validate="'required'"
                                                                       v-bind:class="[errors.has('contactVillage') ? 'is-invalid' : '']"
                                                                       name="contactVillage"
                                                                       class="form-control" id="contactVillage">
                                                                <div class="text-danger error-message"
                                                                     v-if="errors.has('contactVillage')">
                                                                    <p>Contact's Village is required!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="form-group">
                                                                <label for="contactStreetName">Street Name <span class="text-danger">*</span></label>
                                                                <input type="text" v-model="contact.address.street_name"
                                                                       v-validate="'required'"
                                                                       v-bind:class="[errors.has('contactStreetName') ? 'is-invalid' : '']"
                                                                       name="contactStreetName"
                                                                       class="form-control" id="contactStreetName">
                                                                <div class="text-danger error-message"
                                                                     v-if="errors.has('contactStreetName')">
                                                                    <p>Contact's Street Name is required!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mt-4">
                                            <div class="col-lg-2">
                                                <div class="form-group">
                                                    <label for="contactMobilePhone">Contact’s Mobile Phone <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="contact.mobile"
                                                           v-validate="'required'"
                                                           v-bind:class="[errors.has('contactMobilePhone') ? 'is-invalid' : '']"
                                                           name="contactMobilePhone"
                                                           class="form-control" id="contactMobilePhone">
                                                    <div class="text-danger error-message"
                                                         v-if="errors.has('contactMobilePhone')">
                                                        <p>Contact's Mobile is required!</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <div class="form-group">
                                                    <label for="contactHomePhone">Contact’s Home Phone (Optional)</label>
                                                    <input type="text" v-model="contact.phone" class="form-control" id="contactHomePhone">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-2 mb-4">
                                                <div class="form-group">
                                                    <label for="contactEmail">Contact’s Email Address</label>
                                                    <input type="email" v-model="contact.email"
                                                           name="contactEmail"
                                                           class="form-control" id="contactEmail">
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
                                <div class="col-lg-4">
                                    <div class="wizard-footer-left">
                                        <wizard-button v-if="props.activeTabIndex > 0"
                                                       @click.native="prevTab(props)"
                                                       :style="props.fillButtonStyle">Back
                                        </wizard-button>
                                    </div>
                                    <div class="wizard-footer-right">
                                        <wizard-button v-if="!props.isLastStep" :disabled='!isComplete' @click.native="nextTab(props)"
                                                       class="wizard-footer-right" :style="props.fillButtonStyle">Next
                                        </wizard-button>

                                        <wizard-button v-else @click.native="completeRegistration"
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
        activeTab: 0,
        birthDate: '',
        options: {
            format: 'YYYY-MM-DD',
            useCurrent: false,
        },
        relationContacts: '',
        relationshipWithContact: [
          {
            "id": 1,
            "value": 'father',
            "text": "Father",
          },
          {
            "id": 2,
            "value": 'mother',
            "text": "Mother",
          },
          {
            "id": 3,
            "value": 'brother',
            "text": "Brother",
          },
          {
            "id": 4,
            "value": 'sister',
            "text": "Sister",
          },
          {
            "id": 5,
            "value": 'spouse',
            "text": "Spouse",
          },


        ],
        isInvalid: false,
        userId: '',
        contactDistrict: '',
        imageData: '',
        thumbData: '',
        firstName: '',
        lastName: '',
        gender: 'male',
        phone: '',
        mobile: '',
        email: '',
        nid: '',
        pid: '',
        date: '',
        year: '',
        month: '',
        address: {
          district: '',
          village: '',
          town: '',
          postal_code: '',
          street_name: ''
        },
        errorMessages: '',
        message: '',
        contact: {
          address: {}
        }

      }
    },
    created() {
      this.userId = this.$store.state.auth.user.uid
    },
    computed: {
        isComplete () {
            if (this.activeTab == 0) {
                return this.firstName && this.lastName && this.birthDate && this.address.district && this.address.postal_code && this.address.town && this.address.village && this.address.street_name && this.mobile && this.nid;
            }
            if (this.activeTab == 1) {
                return this.contact.first_name && this.contact.last_name && this.contact.address.district && this.contact.address.postal_code && this.contact.address.town && this.contact.address.village && this.contact.address.street_name && this.contact.mobile;
            }
            return true;
        }
    },
    methods: {
    nextTab(props){
        console.log(props);
        this.activeTab = props.activeTabIndex + 1;
        props.nextTab();
    },
    prevTab(props){
        console.log(props);
        this.activeTab = props.activeTabIndex - 1;
        props.prevTab();
    },
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
      },

      completeRegistration() {
        let loader = this.$loading.show()

        this.$validator.validateAll().then(isValid => {
          if (!isValid) {
            this.isInvalid = true;
            setTimeout(() => {
              this.isInvalid = false;
            }, 1500);
            loader.hide()
            return;
          }
          this.isInvalid = false
          let today = new Date();
          let date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
          let time = ('0' + today.getHours()).slice(-2) + ":" + ('0' + today.getMinutes()).slice(-2) + ":" + ('0' + today.getSeconds()).slice(-2);
          let dateTime = date + ' ' + time;
          let age = today.getFullYear() - this.year
          let finaldata = {
            id: this.$uuid.v4(),
            meta: {
              collected_by: this.userId,
              created_at: dateTime
            },
            body: {
              mobile: this.mobile,
              nid: this.nid,
              age: age,
              pid: this.pid,
              first_name: this.firstName,
              last_name: this.lastName,
              contact: this.contact,
              avatar: this.imageData,
              registration_date: date,
              phone: this.phone,
              gender: this.gender,
              address: this.address,
              birth_date: this.birthDate,
              email: this.email,
            }
          }
          this.$http.post("/patients/", finaldata).then(response => {
              loader.hide();
              if (response.status == 201) {
                this.message = "Patient Created Successfully"
              }
            },
            error => {
              this.errorMessages = error.response.data.errors
              this.$bvModal.show('modal-error')
              loader.hide()
            });
        });
      }
    }
  }
</script>

<style scoped>

</style>
