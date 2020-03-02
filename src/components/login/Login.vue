<template>
    <div class="row">
        <div class="container-fluid">
            <div class="login-body">
                <div class="brand-header mb-5">
                    <div class="brand-icon">
                        <img src="/images/logo_nhealth_horizontal.svg" alt="">
                    </div>
                    <div class="brand-text">Coordinate</div>
                </div>
                <div class="login">
                    <div class="login-screen">
                        <div class="app-title">
                            Login to Continue
                        </div>
                        <form @submit.prevent="login">
                        <div class="login-form">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                </div>
                                <input type="text" required v-model="form.email" class="form-control" placeholder="Email Address">
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                                </div>
                                <input type="password" required v-model="form.password" placeholder="Password" class="form-control">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="fas fa-eye"></i></span>
                                </div>
                            </div>

                            <button class="btn btn-primary btn-large btn-block" href="#">login</button>
                            <a class="login-link" href="#">Lost your password?</a>
                        </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: "Login",
    data() {
      return {
        form: {
          email: "",
          password: "",
          remember: ""
        }
      };
    },
    methods: {
      ...mapActions({
        signIn: 'auth/signIn'
      }),
      login() {
        this.signIn(this.form).then( (res) => {
          this.$router.push('/dashboard')
        }).catch((exception) => {
          console.log(exception)
        })
      }
    }
  }
</script>

<style scoped>

</style>
