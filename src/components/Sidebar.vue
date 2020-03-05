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
                <i class="fas fa-fw fa-home"></i><span>Home</span>
            </router-link>
        </li>


        <!-- Nav Item - Dashboard -->
        <li class="nav-item d-none" :class="this.$route.path.includes('health-records') ? 'active' : ''">
            <router-link to="/health-records/list" class="nav-link">
                <i class="fas fa-fw fa-h-square"></i><span>Health Record</span>
            </router-link>
        </li>
        <!-- Nav Item - Dashboard -->
        <li class="nav-item d-none" :class="this.$route.path.includes('patients') ? 'active' : ''">
            <router-link to="/patients/list" class="nav-link">
                <i class="fas fa-fw fa-h-square"></i><span>Patients</span>
            </router-link>
        </li>

        <!-- Nav Item - Dashboard -->
        <li class="nav-item d-none">
            <router-link to="/settings" class="nav-link">
                <i class="fas fa-fw fa-cog"></i><span>Settings</span>
            </router-link>
        </li>


        <div class="account-info d-flex justify-content-between align-items-center">
            <div class="account-item d-flex">
                <img src="/images/avatar/avatar.svg" alt="">
                <div class="ml-3">
                    <span class="user-title font-weight-bold">{{ user.name}}</span>
                    <span class="d-block text-capitalize">{{ user.role}}</span>
                </div>

            </div>
            <div class="account-item">
                <a href="#" @click.prevent="signOut">
                    <i class="large material-icons bg-icon">exit_to_app</i>
                </a>
            </div>
        </div>
        <!--     Sidebar Toggler (Sidebar)-->
        <div class="bottom">
            <button class="border-0" id="sidebarToggle"></button>
        </div>

    </ul>
    <!-- End of Sidebar -->

</template>

<script>
  export default {
    computed: {
      user() {
        return this.$store.state.auth.user;
      },
    },
    mounted() {},
    methods: {
      signOut() {
        this.$store.dispatch('auth/logout');
        this.$router.replace({
          name: 'login'
        })
      }
    },
  };
</script>

<style>
</style>
