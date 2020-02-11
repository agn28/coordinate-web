<template>
  <!-- Main Content -->
  <div id="content">

    <div class="col-md-12">
      <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top">
        <h2 class="title">Home</h2>

        <div class="navbar-nav ml-auto">
          <a href="#" class="btn btn-light btn-icon-split">
                    <span class="icon">
                      <i class="large material-icons">add</i>
                    </span>
            <span class="text">Register a New Patient</span>
          </a>
        </div>

      </nav>
    </div>

    <!-- Begin Page Content -->
    <div class="container-fluid mt-5">

      <div class="row">
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <span class="">Total Patients</span>

              <p class="text-black text-bold mt-3">2459</p>

              <a class="text-link" href="#">Manage an Existing Patient</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <span class="">Total Patients</span>

              <p class="text-black text-bold mt-3">2459</p>

              <a class="text-link" href="#">Manage an Existing Patient</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <span class="">Total Patients</span>

              <p class="text-black text-bold mt-3">2459</p>

              <a class="text-link" href="#">Manage an Existing Patient</a>
            </div>
          </div>
        </div>
      </div>


      <div class="mt-5">
        <div class="col-md-12">
          <h2 class="title text-20">Assessment Performance</h2>
        </div>
        <div class="col-md-12">
          <bar-chart></bar-chart>
        </div>
      </div>
    </div>
    <!-- /.container-fluid -->

  </div>
  <!-- End of Main Content -->
</template>

<script>
    import BarChart from './utils/BarChart.vue'
    export default {
        components: {
            BarChart
        },
    };
</script>

<style>
</style>
