<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 p-0">
                <div class="forgot-body">
                    <div class="row">
                        <div class="brand-header mb-5">
                            <div class="brand-icon">
                                <img src="/images/logo_nhealth_horizontal.svg" alt="">
                            </div>
                            <div class="brand-text">Coordinate</div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 mb-4">
                            <div class="forgot">
                                <div class="forgot-screen">
                                    <div class="forgot-title">
                                        Forgot Password
                                    </div>

                                    <div class="forgot-title-msg">
                                        <p>Enter your email address and submit a password reset request to your administrator</p>
                                    </div>

                                    <div class="forgot-form">
                                        <div class="input-group mb-4">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                            </div>
                                            <input type="text" class="form-control border-left-0 pl-1" placeholder="Email Address">
                                        </div>



                                        <button class="btn forgot-btn mb-4" href="#">Request Password Reset</button>


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
    export default {
        name: "Forgot-password"
    }
</script>

<style scoped>

</style>