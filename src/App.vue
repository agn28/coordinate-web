<template>
  <!--<div id="app">-->
    <!--<sidebar></sidebar>-->
    <!--<div id="right-panel" class="right-panel">-->
      <!--<topbar></topbar>-->
      <!--<router-view></router-view>-->
    <!--</div>-->
  <!--</div>-->



  <!-- Page Wrapper -->
  <div id="wrapper">

    <sidebar v-if="loggedIn"></sidebar>

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <router-view></router-view>
      <!-- Footer -->
      <footer class="sticky-footer bg-white" v-if="!['login']">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2019</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'



export default {
  name: 'app',
  components: {
    Sidebar,
    Topbar
  },
  computed : {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
  #right-panel {
    overflow: hidden;
    min-height: 100vh;
  }
</style>
