<template>
  <div>
    <div class="row px-4 pt-4 pb-3 border-bottom-thick patient-history">
        <div class="col-12">
          <div class="header pb-3 w-100 d-flex justify-content-between">
            <h5 class>Patient History</h5>
            <a href class="btn-careplan">
              <i class="fas fa-filter"></i>
            </a>
          </div>

          <div class="timeline-wrapper">
            <div class="timeline">
              <div class="timeline-item" v-for="(item, index) in history" :key="index">
                <div class="icon-wrapper">
                  <div class="icon"></div>
                </div>
                <div v-if="index != history.length-1" class="timeline-border"></div>
                <div class="triangle-box"></div>
                <div class="timeline-data">
                  <div class="title text-capitalize">{{item.type}} at {{getDate(item)}} by {{getCollectedUser(item.collected_by)}}</div>
                </div>

              </div>

              <!-- <div class="timeline-item">
                <div class="icon-wrapper">
                  <div class="icon"></div>
                </div>
                <div class="triangle-box"></div>
                <div class="timeline-data">
                  <div class="title text-capitalize">Health Worker #1 Created this profile </div>
                </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";

export default {
  name: "patients",
  components: {
    VueJsonPretty,
  },
  props: ['history', 'users'],
  data() {
    return {
      patientId: '',
      patient_history: {}
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    getDate(history) {
      let date = "";
      if (history.created_at) {
        date = moment.unix(history.created_at._seconds).format("Do MMMM YYYY hh:mm:ss a");;
      }
      return date;
    },
    getCollectedUser(userId) {
      let user = this.users.find(user => user.uid == userId);
      if (user) {
        return user.name;
      }
    }
  },
  created() {
  },

  mounted() {
    this.scrollToTop();
  },
};
</script>

<style lang="scss">
  .patient-overview {
    .patient-history {
      .timeline-wrapper {
        margin-left: 25px;
        .timeline-border {
          position: absolute;
          border-left: 1.5px solid #01579B;
          height: 115px;
          left: -20px;
          top: 40px;
        }
        .icon-wrapper {
          top: 30px;
          left: -30px;
        }
        .timeline-data {
          .title {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>
