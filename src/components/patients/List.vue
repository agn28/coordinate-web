<template>
  <div class="content patient-list-page">
    <div class="animated fadeIn">
      <TopNavBar heading="Patients"></TopNavBar>
      <div class="row">
        <div class="col-lg-12">
          <div class="patient-content">
            <div class="title">Patient List</div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="patient-search">
             <div class="search">
              <div class="input-group md-form form-sm form-1 pl-0">
                <input
                  class="form-control my-0 py-1 border-right-0"
                  type="text"
                  placeholder="Patient Name, ID, NID"
                  aria-label="Search"
                  v-model="search"
                  @keyup.enter="getPatients('', 'last_item')"
                />
                <div class="input-group-prepend">
                  <a href="javascript:void(0)" @click="getPatients('', 'last_item')" class="input-group-text lighten-3 text-decoration-none" id="btn-search">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div> 

          </div>
        </div>
      </div>
      <div class="row mt-0">
        <div class="col-lg-12">
          <div class="patient-list" v-if="patients.length > 0">
            <div class="table-responsive" >
              <table class="table" >
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Center</th>
                    <th scope="col">NID</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Registration Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="pointer bg-white tr-border-bttom-grey"
                    v-for="(patient, index) in patients"
                    :key="index"
                    @click="
                      $router.push({
                        name: 'patientOverview',
                        params: { patientId: patient.id },
                      })
                    "
                  >
                    <template>
                      <td> {{
                          patient.body.first_name + " " + patient.body.last_name }}
                      </td>
                      <td>{{ patient.body.center.name }}</td>
                      <td>{{ patient.body.nid }}</td>
                      <td>{{ patient.body.age }}</td>
                      <td>{{ patient.body.gender.toUpperCase()
                        }}</td>
                      <td>{{ patient.body.registration_date }}
                        <span class="pull-right"
                          ><i class="fas fa-arrow-right"></i
                        ></span>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- <nav aria-label="Page navigation" class="d-none">
              <ul class="pagination mt-3 mb-5">
                <li class="page-item">
                  <button type="button" class="page-link" v-if="paginationOptions.currentPage != 1" @click="paginationOptions.currentPage--"> Previous </button>
                </li>
                <li class="page-item">
                  <button type="button" class="page-link" v-for="(pageNumber, index) in paginationOptions.pages.slice(paginationOptions.currentPage - 1, paginationOptions.currentPage + 10)" @click="paginationOptions.currentPage = pageNumber" :key="index" :disabled="paginationOptions.currentPage == pageNumber ? true : false" > {{ pageNumber }} </button>
                </li>
                <li class="page-item">
                  <button type="button" @click="paginationOptions.currentPage++" v-if="paginationOptions.currentPage < paginationOptions.pages.length" class="page-link"> Next </button>
                </li>
              </ul>
            </nav>	 -->

            <nav aria-label="Page navigation" >
              <ul class="pagination my-3">
                <li class="page-item">
                  <button type="button" class="page-link"  @click="nextPrevPage('prev')" :disabled="disablePrevButton"> Previous </button>
                </li>
                <li class="page-item">
                  <button type="button" @click="nextPrevPage('next')"  class="page-link" :disabled="disableNextButton"> Next </button>
                </li>
              </ul>
            </nav>
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
import TopNavBar from '../TopNavBar.vue';
Vue.use(VuejsDatatableFactory);

export default {
  name: "patients",
  components: {TopNavBar},
  data() {
    return {
      patients: [],
      search: "",
      paginationOptions: {
        currentPage: 1,
        perPage: 20,
        // totalItems: 500,
        pages: []
      },
      lastItemId: '',
      disablePrevButton: false,
      disableNextButton: false,
    };
  },
  computed: {
    filteredList() {
      return this.patients.filter((patient) => {
        return (
          patient.body.first_name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          patient.body.last_name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          patient.body.nid.toString().includes(this.search.toLowerCase())
        );
      });
    },
  },
 
  methods: {
    getPatients(lastItemId = '', queryItemkey = 'last_item') {
      let loader = this.$loading.show();
      let searchKey = '';
      this.disablePrevButton = false;
      this.disableNextButton = false;
      
      if(this.search) {
        if(isNaN(this.search)) {
          searchKey = '&name=' + this.search;
        } else {
          searchKey = '&nid=' + this.search;
        }
      }
      this.$http.get("/patients?per_page=" + this.paginationOptions.perPage + '&' + queryItemkey + '=' + lastItemId + searchKey).then(
        (response) => {
          if (response.status == 200) {
            loader.hide();
            console.log('patients: ', response.data);
            if (response.data.error == true) {
              // let msg = queryItemkey == 'last_item' ? 'Reached Last Record' : 'Reached First Record';
              let msg = 'No record found';
              if ( queryItemkey == 'last_item') {
                this.disableNextButton = true;
              } 

              if ( queryItemkey == 'first_item') {
                this.disablePrevButton = true;
              }
              this.$toast.open({ message: msg, type: 'error'});
              // this.patients = [];
              return;
            }

            this.patients = response.data.data;
            this.scrollToTop();
          }
        },
        (error) => {
          console.log(error)
          loader.hide();
        }
      );
    },
    nextPrevPage(type) {
      let dataLength = this.patients.length;

      if (type == 'next') {
        let lastItemId = '';
        if ( dataLength > 0) {
          lastItemId = this.patients[dataLength - 1].id;
        }
        this.getPatients(lastItemId, 'last_item');
      }

      if (type == 'prev') {
         let firstItemId = dataLength > 0 ? this.patients[0].id : '';
        this.getPatients(firstItemId, 'first_item');
      }
    },
    setPages() {
      let numberOfPages = Math.ceil(this.paginationOptions.totalItems / this.paginationOptions.perPage);
			for (let index = 1; index <= numberOfPages; index ++) {
				this.paginationOptions.pages.push(index);
			}
    },
    getId(identifier, type) {
      if (!identifier) {
        return "";
      }
      let id = identifier.find((x) => x.use === type);

      if (id) {
        return id.value;
      }
      return "";
    },
    scrollToTop() {
        window.scrollTo(0,0);
    }
  },
  mounted() {
    if(this.$route.query.search && this.$route.query.search != undefined){
      this.search = this.$route.query.search;
    }
    this.getPatients();
  },
};
</script>

