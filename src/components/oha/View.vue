<template>
    <div class="content patient-list-page">
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-lg-12 d-flex breadcrumb-wrap">
                    <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
                    <div>
                        <h4>Oha</h4>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="patient-list">
                        <div class>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Active Url</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td>{{ activeUrl }}</td>
                                    <td>
                                        <div>
                                            <button @click="openEditModal()" class="btn btn-info btn-sm">Edit</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <b-modal id="modal-edit-oha" class="modal-header">
                <template v-slot:modal-header>
                <span class="title">Change OHA url:</span>
                </template>
                <div class="form-group">
                  <label for="url">Set url</label>
                  <input
                      type="text"
                      id="url"
                      v-model="newUrl"
                      class="form-control form-coordinate height-input"
                    />
                    <small id="permissionHelp" class="form-text text-muted">
                      Example:
                      <b>https://api.bd.openhealthalgorithms.org/api/algorithm</b>
                    </small>
                </div>

                <template v-slot:modal-footer>
                <div class="w-100">
                    <b-button
                    @click.prevent="
                        setOhaUrl(selectedUrl)
                    "
                    :disabled="!newUrl"
                    variant="link"
                    size="md"
                    class="float-right font-weight-bold p-0 pl-4 pr-1"
                    >Save</b-button
                    >

                    <b-button
                    variant="link"
                    size="md"
                    class="float-right font-weight-bold p-0"
                    @click="closeEditModal()"
                    >Cancel</b-button
                    >
                </div>
                </template>
            </b-modal>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "oha",
  components: {},
  data() {
    return {
        urlType: "",
        selectedUrl: "",
        urlOptions: {
            bengali: "Bengali",
            english: "English"
        },
        activeUrl: "",
        activeUrlId: "",
        newUrl: ""
    };
  },

  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    openEditModal() {
      // this.selectedUrl = "";
      this.$bvModal.show("modal-edit-oha");
    },
    closeEditModal() {
      // this.selectedUrl = "";
      this.$bvModal.hide("modal-edit-oha");
    },
    async getActiveOhaUrl() {
      let loader = this.$loading.show();
      await this.$http.get("/ohas/active-oha-url").then(
        (response) => {
          if (response.status == 200) {
              console.log(response.data);
              // this.selectedUrl = response.data.data.url;
              this.activeUrl = response.data.data.url;
              this.activeUrlId = response.data.data.id;
              // if(this.selectedUrl == "https://api.bd.openhealthalgorithms.org/api/algorithm") {
              //     this. urlType = "Bengali";
              // } else if(this.selectedUrl == "https://demoservice.openhealthalgorithms.org/api/algorithm") {
              //     this. urlType = "English";
              // } else {
              //     this. urlType = "N/A";
              // }
            // this.users = response.data;
            // this.getAssignees()
          }
          loader.hide();
        },
        (error) => {
          loader.hide();
        }
      );
    },
    setOhaUrl(url) {
      if (!this.newUrl || !this.activeUrlId) {
        return;
      }
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm it!"
      }).then(result => {
        if (result.value) {
            console.log(this.newUrl);
            let loader = this.$loading.show();
            this.$http
                .post("ohas/active-oha-url", {
                  url: this.newUrl,
                  id: this.activeUrlId,
                })
                .then(response => {
                loader.hide();
                console.log('response');
                console.log(response);
                if (response.status == 200) {
                  // this.getActiveOhaUrl();
                  this.activeUrl = response.data.data.url;
                  this.newUrl = "";
                  this.$bvModal.hide("modal-edit-oha");
                  // this.$forceUpdate();
                  this.$toast.open({ message: 'New oha url is set', type: 'success'})
                  return;
                }
                this.$toast.open({ message: 'Failed to set oha url', type: 'error'});
                // if (response.status == 201) {
                //     if (this.patients.indexOf(patient) > -1) {
                //     this.patients.splice(this.patients.indexOf(patient), 1);
                //     }
                //     // careplan.meta.assigned_to = user.uid;
                //     this.selectedUrl = "";
                //     this.$bvModal.hide("modal-edit-oha");
                //     this.$forceUpdate();
                //     this.$toast.open({ message: 'Url is set', type: 'success'})
                //     return;
                // }
                
                // this.$toast.open({ message: 'Failed to set oha url', type: 'error'});
                })
                .catch(error => {
                    loader.hide();
                });
        }
      });
    },
    async initialData() {
      await this.getActiveOhaUrl();
    },
  },
  mounted() {
    this.scrollToTop();
    this.initialData();
  }
};
</script>
