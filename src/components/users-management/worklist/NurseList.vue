<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-lg-12 d-flex breadcrumb-wrap">
          <i class="fa fa-arrow-left text-secondary back-icon" @click="$router.go(-1)"></i>
          <div class>
            <h4>Worklists</h4>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="patient-search">
            <div class="search">
              <div class="input-group md-form form-sm form-1 pl-0">
                <div class="input-group-prepend">
                  <span class="input-group-text lighten-3" id="basic-text1">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </span>
                </div>
                <input
                  class="form-control my-0 py-1 border-left-0"
                  type="text"
                  v-model="filter"
                  placeholder="Nurse Name, Patient Name"
                  aria-label="Search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="patient-list-items">
            <div class="table-responsive">
              <datatable :columns="columns" :data="worklists" :filter-by="filter" :class="'table border-bottom'">
                <template slot-scope="{ row }">
                  <tr>
                    <td scope="row">
                      <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id name="example1" />
                        <label class="custom-control-label" for></label>
                      </div>
                    </td>
                    <td scope="row">
                      <span v-if="row.collector">{{ row.collector.name }}</span>
                      <span v-else>N/A</span>
                    </td>
                    <td scope="row">{{ row.patient.first_name}} {{ row.patient.last_name}}</td>
                    <td scope="row">{{ row.body.title }}</td>
                    <td scope="row">{{ row.body.activityDuration.end | moment("Do MMMM YYYY") }}</td>
                    <td v-if="row.meta.status === 'pending'" class="pending">Pending</td>
                    <td v-else class="success">Completed</td>
                  </tr>
                </template>
              </datatable>

              <!-- <table class="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id name="example1" />
                        <label class="custom-control-label" for></label>
                      </div>
                    </th>
                    <th scope="col">Nurse Name</th>
                    <th scope="col">Paitent Name</th>
                    <th scope="col">Care Plan Action</th>
                    <th scope="col">Care Plan Due Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="pointer"
                    v-for="(worklist, index) in worklists"
                    :key="index"
                    @click="$router.push({ name: 'nurseWorklist', params: { nurseId: nurse.uid } })"
                  >
                    <template>
                      <th scope="row">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id name="example1" />
                          <label class="custom-control-label" for></label>
                        </div>
                      </th>
                      <td>{{ worklist.name}}</td>
                      <th scope="col">Care Plan Action</th>
                      <th scope="col">Participant Name</th>
                      <th scope="col">Care Plan Due Date</th>
                      <th scope="col">Status</th>
                    </template>
                  </tr>
                </tbody>
              </table>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import { VuejsDatatableFactory } from "vuejs-datatable";

Vue.use(VuejsDatatableFactory);

export default {
  name: "nurse-list",
  components: {},
  data() {
    return {
      worklists: [],
      filter: "",
      columns: [
        {label: ''},
        { label: "Nurse Name", align: "left"},
        {
          label: "Patient Name",
          align: "left"
        },
        { label: "Care Plan Action", align: "left"},
        { label: "Care Plan Due Date", align: "left"},
        { label: "Status", align: "left" },
      ]
    };
  },
  methods: {
    getNurses() {
      let loader = this.$loading.show();
      this.$http.get("care-plans/work-list").then(
        response => {
          if (response.status == 200) {
            this.worklists = response.data.data;
            loader.hide();
          }
        },
        error => {
          loader.hide();
        }
      );
    },

    getId(identifier, type) {
      if (!identifier) {
        return "";
      }
      let id = identifier.find(x => x.use === type);

      if (id) {
        return id.value;
      }
      return "";
    }
  },
  mounted() {
    this.getNurses();
  }
};
</script>

<style lang="">
</style>
