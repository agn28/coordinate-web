<template>
    <div class="content patient-overview">
        <div class="animated fadeIn">
            <TopNavBar heading="Patient Follow-ups"></TopNavBar>
            <div v-if="patient" class="row">
                <div class="col-lg-12 border-bottom">
                    <div class="patient">
                        <div class="patient-image mr-4">
                            <img v-if="patient.body.avatar" :src="patient.body.avatar" class="rounded-circle img-fluid" width="100" height="100" :alt="patient.body.first_name" onerror="this.src='data:image/png;base64,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'">
                            <img v-else src="../../assets/images/avatar/dummy-man-570x570.png" class="rounded-circle img-fluid" width="100" height="100" alt="">
                        </div>
                        <div class="patient-details">
                            <div class="patient-name">{{ patient.body.first_name + " " + patient.body.last_name }}</div>
                            <div class="details">
                                <div class="age">{{ patient.body.age }} {{ patient.body.gender }}</div>
                                <div class="nid">NID: {{ patient.body.nid}}</div>
                                <!-- <div class="pid">PID: {{ patient.body.pid }}</div> -->
                                <div class="register-date">Registered on {{ patient.meta.created_at | moment("Do MMMM YYYY") }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="followup-content" v-if="followups">
                        <div class="accordion" id="accordionFollowup">

                            <div class="card" v-for="(followup, index) in followups" :key="index">
                                <div class="card-header" id="headingOne">
                                <h2 class="mb-0">
                                    <button @click="onClickAccordion(followup, index)" class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#followupCollapse' + index" aria-expanded="false" aria-controls="collapseOne">
                                        <i v-if="showIcon == index" class="fas fa-minus pr-4"></i>
                                        <i v-else class="fas fa-plus pr-4"></i>
                                        {{ getDate(followup) }}
                                    </button>
                                </h2>
                                </div>

                                <div :id="'followupCollapse' + index" class="collapse" :class="index == 0 ? 'show' : 'hide'" aria-labelledby="headingOne" data-parent="#accordionFollowup">
                                    <div class="card-body">
                                        <div class="followup-details">
                                            <template v-for="(item, index) in followup.body">
                                            
                                                <template v-if="index == 'causes' || index == 'issues'">
                                                    <div v-if="item.length > 0" class="followup-item pt-3" :key="index">
                                                        <h6  class="text-capitalize">{{ getTitle(index) }}</h6>
                                                        <p>
                                                            <span class="badge badge-secondary mr-2" v-for="(value, index) in item" :key="index">{{ value }}</span>
                                                        </p>
                                                        
                                                    </div>
                                                </template>

                                                <div v-else class="followup-item pt-3" :key="index">
                                                    <h6  class="text-capitalize">{{ getTitle(index) }}</h6>
                                                    <template v-if="index !== 'reason'">
                                                        <p v-for="(value, index) in item" :key="index">
                                                            <span class=""><span class="text-capitalize">{{ index }}</span>: {{ value }}</span>
                                                        </p>
                                                    </template>
                                                    <template v-else>
                                                        <p>
                                                            <span class="text-capitalize">
                                                                 {{ item }}</span>
                                                        </p>
                                                    </template>
                                                </div>      
                                                
                                            </template>
                                        </div>
                                    </div>
                                </div>
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
    import moment from 'moment';
    import TopNavBar from '../TopNavBar';
  export default {
    name: "patients",
    components: { TopNavBar },
    data() {
      return {
        fullPage: true,
        patient: null,
        patientId: '',
        followups: null,
        showIcon: 0
      };
    },
    methods: {

        getTitle(title) {
            return title.replace('_', ' ');
        },
        onClickAccordion(followup, index) {
            if (this.showIcon == index) {
                this.showIcon = -1;
            } else {
                this.showIcon = index;
            }
            
        },
      getPatients() {
        let loader = this.$loading.show();
        this.$http.get("/patients/" + this.patientId).then(response => {
            loader.hide();
            if (response.status == 200) {
              this.patient = response.data.data;
              loader.hide();
            }
          },
          error => {
            loader.hide()
          });

      },
      getFollowups() {
          let loader = this.$loading.show();
            this.$http.get("/patients/" + this.patientId + '/followups', ).then(
            response => {
                if (response.status == 200) {
                this.followups = response.data.data;
                loader.hide();
                }
            },
            error => {

            });
      },

      getDate(followup) {
          let date = moment(followup.meta.created_at._seconds * 1000).format("DD MMM YYYY")
          return date
      },

      getId(identifier, type) {
        if (!identifier) {
          return '';
        }
        let id = identifier.find(x => x.use === type);

        if (id) {
          return id.value;
        }
        return "";
      }
    },
    mounted() {
      this.patientId = this.$route.params.patientId;
      this.getPatients();
      this.getFollowups();
    }
  };
</script>

<style lang="">
</style>
