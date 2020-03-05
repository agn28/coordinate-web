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
                        <div class="login-title">
                            Login to Continue
                        </div>
                        <form @submit.prevent="handleLogin">
                            <div class="login-form">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text border-right-0"><i class="fas fa-envelope"></i></span>
                                    </div>
                                    <input type="text" v-validate="'required'" name="email" v-model="user.email" class="form-control border-left-0"
                                           placeholder="Email Address">
                                    <div
                                            v-if="errors.has('email')"
                                            class="alert alert-danger"
                                            role="alert"
                                    >Email is required!</div>
                                </div>

                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text  border-right-0"><i class="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" v-validate="'required'" name="password" v-model="user.password" placeholder="Password"
                                           class="form-control border-right-0 border-left-0">
                                    <div v-if="errors.has('password')"
                                            class="alert alert-danger"
                                            role="alert"
                                    >Password is required!</div>
                                    <div class="input-group-append">
                                        <span class="input-group-text border-left-0"><i class="fas fa-eye"></i></span>
                                    </div>
                                </div>

                                <button :disabled="loading" class="btn login-btn mb-4">
                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                    <span>Login</span>
                                </button>
                                <div class="forgot-pass">
                                    <a class="login-link" href="" @click="$router.push({ name: 'forgot-pass'})">Forgot
                                        Password?</a>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
   import User from "../../models/user";
    export default {
        components: {},
        name: "Login",
        data() {
            return {
                fullPage: true,
                user: new User('', ''),
                loading: false,
                message: ''
            };
        },
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      created() {
        if (this.loggedIn) {
          this.$router.push('/dashboard');
        }
      },
      methods: {
        handleLogin() {
          this.loading = true;
          this.$validator.validateAll().then(isValid => {
            if (!isValid) {
              this.loading = false;
              return;
            }

            if (this.user.email && this.user.password) {
              this.$store.dispatch('auth/login', this.user).then(
                () => {
                  this.$router.push('/dashboard');
                },
                error => {
                  this.loading = false;
                  this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                }
              );
            }
          });
        }
      }
    }

</script>

<style scoped>

</style>
