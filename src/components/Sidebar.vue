<template>


  <!-- Sidebar -->
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-end justify-content-center" href="/dashboard">
      <div class="sidebar-brand-icon">
          <img src="/images/logo_nhealth_horizontal.svg" alt="">
      </div>
      <div class="sidebar-brand-text ml-2">Coordinate</div>
    </a>


    <!-- Nav Item - Dashboard -->
    <li class="nav-item" :class="this.$route.path.includes('dashboard') ? 'active' : ''">
      <router-link to="/dashboard" class="nav-link">
        <i class="fas fa-fw fa-tachometer-alt"></i><span>Home</span>
      </router-link>
    </li>


    <!-- Nav Item - Dashboard -->
    <li class="nav-item" :class="this.$route.path.includes('health-records') ? 'active' : ''">
      <router-link to="/health-records/list" class="nav-link">
        <i class="fas fa-fw fa-tachometer-alt"></i><span>Health Record</span>
      </router-link>
    </li>

    <!-- Sidebar Toggler (Sidebar) -->
    <!--<div class="text-center d-none d-md-inline">-->
      <!--<button class="rounded-circle border-0" id="sidebarToggle"></button>-->
    <!--</div>-->

    <div class="account-info d-flex justify-content-between align-items-center">
        <div class="account-item">
            <img src="/images/avatar/avatar.svg" alt="">
        </div>
        <div class="account-item">
            <span class="user-title font-weight-bold">User name</span>
            <span class="d-block">Role Here</span>
        </div>
        <div class="account-item">
          <a href="#">
              <i class="large material-icons bg-icon">exit_to_app</i>
          </a>
        </div>
    </div>

  </ul>
  <!-- End of Sidebar -->

</template>

<script>
export default {
  mounted() {}
};
</script>

<style>
</style>
