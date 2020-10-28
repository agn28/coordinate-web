<template>


    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" v-if="['login']">

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
        <li class="nav-item" :class="this.$route.path.includes('patients') ? 'active' : ''">
            <router-link to="/patients/list" class="nav-link">
                <i class="fas fa-fw fa-h-square"></i><span>Patients</span>
            </router-link>
        </li>
        <li v-if="user.role == 'admin'" class="nav-item" :class="this.$route.path.includes('work-lists') ? 'active' : ''">
            <router-link class="nav-link" :to="{ name: 'worklistPatient' }">
              <i class="fas fa-fw fa-list"></i><span>Work list</span>
            </router-link>
        </li>

        <li v-if="user.role == 'admin'" class="nav-item" :class="this.$route.path.includes('referrals') ? 'active' : ''">
            <router-link class="nav-link" :to="{ name: 'referrals' }">
              <i class="fas fa-bezier-curve"></i><span>Referrals</span>
            </router-link>
        </li>

        <li v-if="user.role == 'admin'" class="nav-item" :class="this.$route.path.includes('management') ? 'active' : ''">
            <a class="nav-link" :class="this.$route.path.includes('management') ? '' : 'collapsed'" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <i class="fas fa-fw fa-user"></i>
            <span>User Management</span>
            </a>
            <div id="collapseTwo" class="collapse" :class="this.$route.path.includes('management') ? 'show' : ''" aria-labelledby="headingTwo" data-parent="#accordionSidebar" style="">
              <div class="bg-white py-2 collapse-inner rounded">
                  <router-link class="collapse-item" :class="this.$route.path.includes('management/users') ? 'active' : ''" :to="{ name: 'users' }">Users</router-link>
                  <router-link class="collapse-item" :class="this.$route.path.includes('management/roles') ? 'active' : ''" :to="{ name: 'roles' }">Roles</router-link>
                  <router-link class="collapse-item" :class="this.$route.path.includes('management/permissions') ? 'active' : ''" :to="{ name: 'permissions' }">Permissions</router-link>
              </div>
            </div>
        </li>  

        <li v-if="user.role == 'admin'" class="nav-item" :class="this.$route.path.includes('settings') ? 'active' : ''">
            <a class="nav-link" :class="this.$route.path.includes('settings') ? '' : 'collapsed'" href="#" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <i class="fas fa-fw fa-cog"></i>
              <span>Settings</span>
            </a>
            <div id="collapseThree" class="collapse" :class="this.$route.path.includes('settings') ? 'show' : ''" aria-labelledby="headingThree" data-parent="#accordionSidebar" style="">
              <div class="bg-white py-2 collapse-inner rounded">
                  <router-link class="collapse-item" :class="this.$route.path.includes('settings/symptoms') ? 'active' : ''" :to="{ name: 'symptoms' }">Symptoms</router-link>
                  <router-link class="collapse-item" :class="this.$route.path.includes('settings/medications') ? 'active' : ''" :to="{ name: 'medications' }">Medications</router-link>
                  <router-link class="collapse-item" :class="this.$route.path.includes('settings/devices') ? 'active' : ''" :to="{ name: 'devices' }">Devices</router-link>
                  <router-link class="collapse-item" :class="this.$route.path.includes('settings/questionnaires') ? 'active' : ''" :to="{ name: 'questionnaires' }">Questionnaires</router-link>
              </div>
            </div>
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
