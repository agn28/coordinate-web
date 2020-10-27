<template>
  <div>
    <div class="row px-4 pt-4 pb-3 border-bottom-thick">
        <div class="col-12">
          <div class="header pb-3 w-100 d-flex justify-content-between">
            <h5 class>Patient History</h5>
            <a href class="btn-careplan">
              <i class="fas fa-filter"></i>
            </a>
          </div>

          <div class="timeline-wrapper">
            <div class="timeline">
              <div class="timeline-item">
                <div class="icon-wrapper">
                  <div class="icon"></div>
                </div>
                <div class="triangle-box"></div>
                <div class="timeline-data">
                  <div class="title text-capitalize">Health Worker #1 Created this profile </div>

                  </div>

                </div>

                <div class="timeline-item">
                <div class="icon-wrapper">
                  <div class="icon"></div>
                </div>
                <div class="triangle-box"></div>
                <div class="timeline-data">
                  <div class="title text-capitalize">Health Worker #1 Created this profile </div>

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
import VueJsonPretty from "vue-json-pretty";

export default {
  name: "patients",
  components: {
    VueJsonPretty,
  },
  props: ['encounters'],
  data() {
    return {

    };
  },
  methods: {
    
  
  },
  mounted() {

  },
};
</script>

<style lang="scss">
</style>
