<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8">
          <form class="form-row sharp-input">
            <div class="form-group mb-2 col">
              <label for="staticEmail2" class="font-weight-bold">Date Range </label>
              <select id="" class="form-control">
                <option selected>Last 30</option>
                <option>Last 90</option>
                <option>Last Quarter</option>
                <option>Last Year</option>
              </select>
            </div>
            <div class="form-group mx-sm-3 mb-2 col">
              <label for="inputPassword2" class="font-weight-bold">Center</label>
               <select id="" class="form-control">
                <option selected>Center name</option>
                <option>...</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary mb-2 mt-auto h-fit src-btn">Go</button>
          </form>
        </div>
        <div class="col-lg-4 exportbtn-container">
            <button type="submit" class="btn btn-primary mb-2 mt-auto">Export <img src="../../assets/images/export-icon.png" alt="Export"></button>
        </div>
      </div>

      <div class="mt-4">
        <a class="metrics-title" href="javascript:void(0)">Operational Metrics</a>
      </div>

       <div class="row summery-tables mt-0">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="w-100">
              <tbody>
                <tr>
                  <th class="p-2"></th>
                  <th class="p-2">Total Patient</th>
                  <th class="p-2">Male</th>
                  <th class="p-2">Female</th>
                  <th class="p-2">Male Ratio</th>
                  <th class="p-2">Female Ration</th>
                </tr>
                <tr class="bg-white tr-border-bttom">
                  <td class="p-2">Total Patients Enrolled</td>
                  <td class="p-2">1000</td>
                  <td class="p-2">500</td>
                  <td class="p-2">500</td>
                  <td class="p-2">50%</td>
                  <td class="p-2">50%</td>
                </tr>
                <tr class="bg-white tr-border-bttom">
                  <td class="p-2">Total Newly Enrolled</td>
                  <td class="p-2">1000</td>
                  <td class="p-2">500</td>
                  <td class="p-2">500</td>
                  <td class="p-2">50%</td>
                  <td class="p-2">50%</td>
                </tr>
                <tr class="bg-yellow tr-border-bttom">
                  <td class="p-2">Total Patients with hypertension</td>
                  <td class="p-2">1000</td>
                  <td class="p-2">500</td>
                  <td class="p-2">500</td>
                  <td class="p-2">50%</td>
                  <td class="p-2">50%</td>
                </tr>
                <tr class="bg-grey tr-border-bttom">
                  <td class="p-2">Total Patients with diabetes</td>
                  <td class="p-2">1000</td>
                  <td class="p-2">500</td>
                  <td class="p-2">500</td>
                  <td class="p-2">50%</td>
                  <td class="p-2">50%</td>
                </tr>
                <tr class="bg-grey tr-border-bttom">
                  <td class="p-2">Total Patients with HTN and DM</td>
                  <td class="p-2">1000</td>
                  <td class="p-2">500</td>
                  <td class="p-2">500</td>
                  <td class="p-2">50%</td>
                  <td class="p-2">50%</td>
                </tr>
                <tr class="bg-white tr-border-bttom">
                  <td class="p-2">Number of new centre visits</td>
                  <td class="p-2">1000</td>
                  <td class="p-2">500</td>
                  <td class="p-2">500</td>
                  <td class="p-2">50%</td>
                  <td class="p-2">50%</td>
                </tr>
                <tr class="bg-white tr-border-bttom">
                  <td class="p-2">Number of follow up centre visits</td>
                  <td class="p-2">1000</td>
                  <td class="p-2">500</td>
                  <td class="p-2">500</td>
                  <td class="p-2">50%</td>
                  <td class="p-2">50%</td>
                </tr>
                <tr class="bg-white tr-border-bttom">
                  <td class="p-2">Number of follow up home visits</td>
                  <td class="p-2">1000</td>
                  <td class="p-2">500</td>
                  <td class="p-2">500</td>
                  <td class="p-2">50%</td>
                  <td class="p-2">50%</td>
                </tr>
                <tr class="bg-white tr-border-bttom">
                  <td class="p-2">Number of referrals from centre</td>
                  <td class="p-2">1000</td>
                  <td class="p-2">500</td>
                  <td class="p-2">500</td>
                  <td class="p-2">50%</td>
                  <td class="p-2">50%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
       </div>

      <div class="mt-4">
        <a class="metrics-title" href="javascript:void(0)">Outcome Metrics </a>
      </div>

       <div class="row summery-tables mt-0">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="w-100">
              <tbody>
                <tr>
                  <th class="p-2"></th>
                  <th class="p-2">Total Patient</th>
                  <th class="p-2">Male</th>
                  <th class="p-2">Female</th>
                  <th class="p-2">Male Ratio</th>
                  <th class="p-2">Female Ration</th>
                </tr>
                <tr class="bg-white tr-border-bttom">
                  <td class="p-2">% of patients reduce HbA1c > 1%</td>
                  <td class="p-2">1000</td>
                  <td class="p-2">500</td>
                  <td class="p-2">500</td>
                  <td class="p-2">50%</td>
                  <td class="p-2">50%</td>
                </tr>
               
                <tr class="bg-grey tr-border-bttom">
                  <td class="p-2">% of patients reduce HbA1c < 7%</td>
                  <td class="p-2">1000</td>
                  <td class="p-2">500</td>
                  <td class="p-2">500</td>
                  <td class="p-2">50%</td>
                  <td class="p-2">50%</td>
                </tr>
                <tr class="bg-white tr-border-bttom">
                  <td class="p-2">% of patience reduce SBP > 10 mmHg</td>
                  <td class="p-2">1000</td>
                  <td class="p-2">500</td>
                  <td class="p-2">500</td>
                  <td class="p-2">50%</td>
                  <td class="p-2">50%</td>
                </tr>
                <tr class="bg-white tr-border-bttom">
                  <td class="p-2">% of patience reduce DBP > 5 mmHg</td>
                  <td class="p-2">1000</td>
                  <td class="p-2">500</td>
                  <td class="p-2">500</td>
                  <td class="p-2">50%</td>
                  <td class="p-2">50%</td>
                </tr>
               
              </tbody>
            </table>
          </div>
        </div>
       </div>

      <!-- <div class="row">
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-body">
                <span class>Total Patients</span>
                <p class="text-black text-bold mt-3">{{ patientStat.total_patient}}</p>

                <router-link tag="a" class="text-link custom-text-link" :to="{name: 'patients'}">Manage an Existing Patient</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-body">
                <span class>Patients Pending Recommendations</span>

                <p class="text-black text-bold mt-3">{{ total_pending}}</p>

                <router-link
                  :to="{name: 'pendingReviews'}"
                  class="text-link custom-text-link"
                >View Patients Pending Review</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-body">
                <span class>Patients Pending Care Plan</span>

                <p class="text-black text-bold mt-3">{{ total_pending_careplan_patients }}</p>

                <router-link class="text-link custom-text-link" :to="{ name: 'carePlanPatients'}">View</router-link>
              </div>
            </div>
          </div>
        </div> -->

      <!-- <div class="mt-5">
        <div class="col-md-12">
          <h2 class="title text-20">Assessment Performance</h2>
        </div>
        <div class="col-md-12 col-lg-12">
          <form action class="assessmentForm mt-4">
            <div class="row w-100">
              <div class="col-md-8 col-lg-5">
                <div class="mb-2">
                  <label class="mr-1">Period: &nbsp;</label>
                  <date-range-picker v-model="dateRange"></date-range-picker>
                </div>
              </div>
              <div class="col-md-4 col-lg-3">
                <div class="d-flex justify-content-center md-2">
                  <input
                    type="button"
                    class="border-0 chartSelectBtn activeBtn"
                    value="Week"
                  />
                  <input
                    type="button"
                    class="border-0 chartSelectBtn"
                    value="Day"
                  />
                  <input
                    type="button"
                    class="border-0 chartSelectBtn"
                    value="Month"
                  />
                </div>
              </div>
              <div class="col-md-12 col-lg-4">
                <div class="d-flex justify-content-center mb-2">
                  <button class="border-0 chartSelectBtn w-100">
                    <span class="bttn1"></span>Participant Registered
                  </button>
                  <button class="border-0 chartSelectBtn w-100">
                    <span class="bttn2"></span>Screenings completed
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-12">
          <bar-chart v-if="data" :stats="data"></bar-chart>
        </div>
      </div> -->

      <!-- <div class="row summery-tables">
        <div class="col-md-4">
          <div class="table-responsive my-5 px-3">
            <h2 class="title text-20">Enrollment of total patients</h2>
            <table class="w-100">
              <tbody>
                <tr class="male-patients">
                  <td class="p-2 pl-4">Male</td>
                  <td class="text-right pr-4">
                    {{ patientStat.male_patients }}
                  </td>
                </tr>
                <tr class="female-patients">
                  <td class="p-2 pl-4">Female</td>
                  <td class="text-right pr-4">
                    {{ patientStat.female_patients }}
                  </td>
                </tr>
                <tr class="total-patients">
                  <td class="p-2 pl-4">Total</td>
                  <td class="text-right pr-4">
                    {{ patientStat.total_patient }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="table-responsive my-5 px-3">
            <h2 class="title text-20">
              Patient Retention from Total Enrolled Patients
            </h2>
            <table class="w-100">
              <tbody>
                <tr class="male-patients">
                  <td class="p-2 pl-4">Male</td>
                  <td class="text-right pr-4">
                    {{ patientStat.male_patients }}
                  </td>
                </tr>
                <tr class="female-patients">
                  <td class="p-2 pl-4">Female</td>
                  <td class="text-right pr-4">
                    {{ patientStat.female_patients }}
                  </td>
                </tr>
                <tr class="total-patients">
                  <td class="p-2 pl-4">Total</td>
                  <td class="text-right pr-4">
                    {{ patientStat.total_patient }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="table-responsive my-5 px-3">
            <h2 class="title text-20">Patients Follow up at Center</h2>
            <table class="w-100">
              <tbody>
                <tr class="male-patients">
                  <td class="p-2 pl-4">Male</td>
                  <td class="text-right pr-4">
                    {{ patientStat.male_patients }}
                  </td>
                </tr>
                <tr class="female-patients">
                  <td class="p-2 pl-4">Female</td>
                  <td class="text-right pr-4">
                    {{ patientStat.female_patients }}
                  </td>
                </tr>
                <tr class="total-patients">
                  <td class="p-2 pl-4">Total</td>
                  <td class="text-right pr-4">
                    {{ patientStat.total_patient }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="table-responsive my-5 px-3">
            <h2 class="title text-20">
              Follow up for Self Monitor Patients by CHW
            </h2>
            <table class="w-100">
              <tbody>
                <tr class="male-patients">
                  <td class="p-2 pl-4">Male</td>
                  <td class="text-right pr-4">
                    {{ patientStat.male_patients }}
                  </td>
                </tr>
                <tr class="female-patients">
                  <td class="p-2 pl-4">Female</td>
                  <td class="text-right pr-4">
                    {{ patientStat.female_patients }}
                  </td>
                </tr>
                <tr class="total-patients">
                  <td class="p-2 pl-4">Total</td>
                  <td class="text-right pr-4">
                    {{ patientStat.total_patient }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-4">
          <div class="table-responsive my-5 px-3">
            <h2 class="title text-20">Age group distribution (all patients)</h2>
            <table class="w-100">
              <thead>
                <tr class="table-heading">
                  <th class="py-2 text-center">Ages</th>
                  <th class="py-2 text-center">Male</th>
                  <th class="py-2 text-center">Female</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="py-2 text-center horizontal-heading">30 to 39</th>
                  <td class="text-center male-patients">
                    {{
                      Math.round(
                        (patientStat.male_age_30_to_39 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                  <td class="text-center female-patients">
                    {{
                      Math.round(
                        (patientStat.female_age_30_to_39 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                </tr>
                <tr>
                  <th class="py-2 text-center horizontal-heading">40 to 49</th>
                  <td class="text-center male-patients">
                    {{
                      Math.round(
                        (patientStat.male_age_40_to_49 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                  <td class="text-center female-patients">
                    {{
                      Math.round(
                        (patientStat.female_age_40_to_49 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                </tr>
                <tr>
                  <th class="py-2 text-center horizontal-heading">50 to 59</th>
                  <td class="text-center male-patients">
                    {{
                      Math.round(
                        (patientStat.male_age_50_to_59 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                  <td class="text-center female-patients">
                    {{
                      Math.round(
                        (patientStat.female_age_50_to_59 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                </tr>
                <tr>
                  <th class="py-2 text-center horizontal-heading">60 to 69</th>
                  <td class="text-center male-patients">
                    {{
                      Math.round(
                        (patientStat.male_age_60_to_69 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                  <td class="text-center female-patients">
                    {{
                      Math.round(
                        (patientStat.female_age_60_to_69 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                </tr>
                <tr>
                  <th class="py-2 text-center horizontal-heading">70 +</th>
                  <td class="text-center male-patients">
                    {{
                      Math.round(
                        (patientStat.male_age_70_plus /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                  <td class="text-center female-patients">
                    {{
                      Math.round(
                        (patientStat.female_age_70_plus /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                </tr>
                <tr>
                  <th class="py-2 text-center horizontal-heading">Total</th>
                  <td class="text-center male-patients">
                    {{
                      Math.round(
                        (patientStat.male_patients /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                  <td class="text-center female-patients">
                    {{
                      Math.round(
                        (patientStat.female_patients /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="table-responsive my-5 px-3">
            <h2 class="title text-20">Patients Reduce HbA1C ≥ 1%</h2>
            <table class="w-100">
              <tbody>
                <tr class="male-patients">
                  <td class="p-2 pl-4">Male</td>
                  <td class="text-right pr-4">
                    {{ patientStat.male_patients }}
                  </td>
                </tr>
                <tr class="female-patients">
                  <td class="p-2 pl-4">Female</td>
                  <td class="text-right pr-4">
                    {{ patientStat.female_patients }}
                  </td>
                </tr>
                <tr class="total-patients">
                  <td class="p-2 pl-4">Total</td>
                  <td class="text-right pr-4">
                    {{ patientStat.total_patient }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-4">
          <div class="table-responsive my-5 px-3">
            <h2 class="title text-20">Disease distribution (all patients)</h2>
            <table class="w-100">
              <thead>
                <tr class="table-heading">
                  <th class="p-2 pl-4">Disease</th>
                  <th class="p-2 text-center">Male</th>
                  <th class="p-2 text-center">Female</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="py-2 pl-4 horizontal-heading">Diabetes</th>
                  <td class="text-center male-patients">
                    {{
                      Math.round(
                        (patientStat.male_age_30_to_39 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                  <td class="text-center female-patients">
                    {{
                      Math.round(
                        (patientStat.female_age_30_to_39 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                </tr>
                <tr>
                  <th class="py-2 pl-4 horizontal-heading">Hypertension</th>
                  <td class="text-center male-patients">
                    {{
                      Math.round(
                        (patientStat.male_age_40_to_49 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                  <td class="text-center female-patients">
                    {{
                      Math.round(
                        (patientStat.female_age_40_to_49 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                </tr>
                <tr>
                  <th class="py-2 pl-4 horizontal-heading">
                    Diabetes and Hypertension
                  </th>
                  <td class="text-center male-patients">
                    {{
                      Math.round(
                        (patientStat.male_age_40_to_49 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                  <td class="text-center female-patients">
                    {{
                      Math.round(
                        (patientStat.female_age_40_to_49 /
                          patientStat.total_patient) *
                          100
                      )
                    }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> -->
    </div>
    <!-- /.container-fluid -->
  </div>
</template>


<script>
import BarChart from "../utils/BarChart.vue";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
export default {
  components: {
    BarChart,
    DateRangePicker,
  },
  props: [
    "patients",
    "patientStat",
    "total_pending",
    "total_pending_careplan_patients",
    "data",
  ],
  data() {
    return {
      dateRange: {
        startDate: "2020-01-01",
        endDate: "2020-01-10",
        format: "DD-MM-YYYY",
      },
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
  },
  mounted () {
    this.scrollToTop();
  },
  computed: {},
};
</script>


<style lang="scss">
.filter-data {
  display: flex;
  justify-content: space-between;
}
.row {
  margin-top: 30px;
}

.dropdown-filter {
  button {
    width: 200px;
    background: #01579b;
    color: #fff;
  }
  ul {
    width: 200px;
  }
  label {
    font-weight: 400;

    display: block;
    padding: 3px 20px;
    clear: both;
    line-height: 1.42857143;
    color: #333;
    white-space: nowrap;
    cursor: pointer;

    &:hover,
    &:focus {
      color: #262626;
      text-decoration: none;
      background-color: #f5f5f5;
    }

    input[type="checkbox"],
    input[type="radio"] {
      margin-right: 0.5em;
    }
  }
}

.dropdown-actions {
  margin-top: 5px;
  margin-left: 10px;
}
.male-patients {
  background: #c5e6ff;
}
.female-patients {
  background: #e8dec7;
}
// table tr:first-child td:first-child {
//   border-top-left-radius: 10px;
// }
// table tr:first-child td:last-child {
//     border-top-right-radius: 10px;
// }
// table tr:last-child td:first-child {
//   border-bottom-left-radius: 10px;
// }
// table tr:last-child td:last-child {
//     border-bottom-right-radius: 10px;
// }
.total-patients {
  background: #ceedef;
}
.summery-tables table tr {
  // border: 1px solid #01579B;
  border-radius: 5px;
}
.table-heading {
  background: #a6d4e1;
}
.horizontal-heading {
  background: #ceedef;
}
.src-btn{
  border-radius: 0 !important;
  padding: 11px 30px
}
</style>