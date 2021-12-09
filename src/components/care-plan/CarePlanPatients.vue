<template>
    <div class="content patient-list-page">
        <div class="animated fadeIn">
           <div class="row">
               <div class="col-lg-12 d-flex breadcrumb-wrap">
                   <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
                   <div class="">
                       <h4>Patients with Pending Care Plans</h4>
                   </div>
               </div>
           </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="patient-list">
                        <div class="table-responsive table-referrals">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="" name="example1">
                                            <label class="custom-control-label" for=""></label>
                                        </div>
                                    </th>
                                    <th scope="col">Name</th>
                                    <!-- <th scope="col">PID</th> -->
                                    <th scope="col">Age</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="pointer" v-for="(patient, index) in patients" :key="index" >
                                    <template>
                                        <th scope="row">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="" name="example1">
                                                <label class="custom-control-label" for=""></label>
                                            </div>
                                        </th>
                                        <td>{{ patient.body.first_name + ' ' + patient.body.last_name}}</td>


                                        <!-- <td>P2342343</td> -->
                                        <td>{{ patient.body.age }} </td>
                                        <td>{{ patient.body.gender.toUpperCase() }}<span class="pull-right"><i class="fas fa-arrow-right"></i></span>
                                        </td>
                                        <td>
                                           <router-link
                                            tag="a"
                                            :to="{ name: 'patientCarePlans', params: { patientId: patient.id } }"
                                            class="btn btn-primary btn-sm"
                                          >View Care Plans</router-link>
                                            
                                        </td>
                                    </template>
                                </tr>
                                    
                                </tbody>
                            </table>
                            <p v-if="patients.length == 0" class="text-center mt-5">No patients found</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>




</template>

<script>
    // @ is an alias to /src
  import Vue from 'vue';
  import moment from 'moment';
  import {VuejsDatatableFactory} from 'vuejs-datatable';

  Vue.use(VuejsDatatableFactory);

  export default {
    name: "patients",
    components: {},
    data() {
      return {
          patients: [],
          followups: [],
          followupPatients: [],
          selectedPatient: {},
          selectedStatus: '',
          carePlans: []
      };
    },
    methods: {
      scrollToTop() {
        window.scrollTo(0,0);
      },
      getPatients() {
        let loader = this.$loading.show();
        this.$http.get("/patients/all-mongo").then(response => {
          if (response.status == 200) {
            loader.hide()
            this.patients = response.data.data;
            this.filterPatints();
            if (this.patients.length > 0 ) {
            }
              
          }
        },
        error => {
          loader.hide();
        });
      },

      getDate(date) {
        let data = moment(date).format("DD MMM YYYY")
        return data
      },


      getId(identifier, type) {
        if (!identifier) {
          return '';
        }
        let id = identifier.find(x => x.use === type);

        if (id) {
          return id.value;
        }
        return '';
      },

      getCarePlans() {
        let loader = this.$loading.show();
        this.$http.get("/care-plans/mongo").then(
          response => {
            if (response.status == 200) {
              this.carePlans = response.data.data;
              this.getPatients();
              
            }
            loader.hide();
          },
          error => {
            loader.hide();
          }
        );
      },

      filterPatints() {
        this.patients = this.patients.filter(patient => {
          let hasCarePlan = this.carePlans.find(plan => plan.body.patient_id == patient.id);
          if (hasCarePlan){
            return patient;
          }
        });
      }
    },
    mounted() {
      this.getCarePlans();
      this.scrollToTop();
    }
  };
</script>

<style lang="">
</style>
