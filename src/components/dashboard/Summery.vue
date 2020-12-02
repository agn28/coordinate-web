<template>
    <div>
      <div class="container-fluid mt-5">
        <div class="row">
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
        </div>

        <div class="mt-5">
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
                    <input type="button" class="border-0 chartSelectBtn activeBtn" value="Week" />
                    <input type="button" class="border-0 chartSelectBtn" value="Day" />
                    <input type="button" class="border-0 chartSelectBtn" value="Month" />
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
        </div>

        <div class="row">
          <div class="col-md-4">
            <div class="table-responsive my-5 px-3">
              <h2 class="title text-20">Enrollment of total patients</h2>
              <table class="table-bordered w-100">
                <tbody>
                  <tr>
                    <td class="p-2">Male</td>
                    <td class="text-right pr-3">{{ patientStat.male_patients }}</td>
                  </tr>
                  <tr>
                    <td class="p-2">Female</td>
                    <td class="text-right pr-3">{{ patientStat.female_patients }}</td>
                  </tr>
                  <tr>
                    <td class="p-2">Total</td>
                    <td class="text-right pr-3">{{ patientStat.total_patient }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="table-responsive my-5 px-3">
              <h2 class="title text-20">Patient Retention from Total Enrolled Patients</h2>
              <table class="table-bordered w-100">
                <tbody>
                  <tr>
                    <td class="p-2">Male</td>
                    <td class="text-right pr-3">{{ patientStat.male_patients }}</td>
                  </tr>
                  <tr>
                    <td class="p-2">Female</td>
                    <td class="text-right pr-3">{{ patientStat.female_patients }}</td>
                  </tr>
                  <tr>
                    <td class="p-2">Total</td>
                    <td class="text-right pr-3">{{ patientStat.total_patient }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="table-responsive my-5 px-3">
              <h2 class="title text-20">Patients Follow up at Center</h2>
              <table class="table-bordered w-100">
                <tbody>
                  <tr>
                    <td class="p-2">Male</td>
                    <td class="text-right pr-3">{{ patientStat.male_patients }}</td>
                  </tr>
                  <tr>
                    <td class="p-2">Female</td>
                    <td class="text-right pr-3">{{ patientStat.female_patients }}</td>
                  </tr>
                  <tr>
                    <td class="p-2">Total</td>
                    <td class="text-right pr-3">{{ patientStat.total_patient }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="table-responsive my-5 px-3">
              <h2 class="title text-20">Follow up for Self Monitor Patients by CHW</h2>
              <table class="table-bordered w-100">
                <tbody>
                  <tr>
                    <td class="p-2">Male</td>
                    <td class="text-right pr-3">{{ patientStat.male_patients }}</td>
                  </tr>
                  <tr>
                    <td class="p-2">Female</td>
                    <td class="text-right pr-3">{{ patientStat.female_patients }}</td>
                  </tr>
                  <tr>
                    <td class="p-2">Total</td>
                    <td class="text-right pr-3">{{ patientStat.total_patient }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-4">
            <div class="table-responsive my-5 px-3">
              <h2 class="title text-20">Age group distribution (all patients)</h2>
              <table class="table-bordered w-100">
                <thead>
                  <tr>
                    <th class="p-2">Ages</th>
                    <th class="p-2">Male</th>
                    <th class="p-2">Female</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th class="p-2">30 to 39</th>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.male_age_30_to_39 / patientStat.total_patient)*100)) }}%</td>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.female_age_30_to_39 / patientStat.total_patient)*100)) }}%</td>
                  </tr>
                  <tr>
                    <th class="p-2">40 to 49</th>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.male_age_40_to_49 / patientStat.total_patient)*100)) }}%</td>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.female_age_40_to_49 / patientStat.total_patient)*100)) }}%</td>
                  </tr>
                  <tr>
                    <th class="p-2">50 to 59</th>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.male_age_50_to_59 / patientStat.total_patient)*100)) }}%</td>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.female_age_50_to_59 / patientStat.total_patient)*100)) }}%</td>
                  </tr>
                  <tr>
                    <th class="p-2">60 to 69</th>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.male_age_60_to_69 / patientStat.total_patient)*100)) }}%</td>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.female_age_60_to_69 / patientStat.total_patient)*100)) }}%</td>
                  </tr>
                  <tr>
                    <th class="p-2">70 +</th>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.male_age_70_plus / patientStat.total_patient)*100)) }}%</td>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.female_age_70_plus / patientStat.total_patient)*100)) }}%</td>
                  </tr>
                  <tr>
                    <th class="p-2">Total</th>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.male_patients / patientStat.total_patient) * 100)) }}%</td>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.female_patients / patientStat.total_patient) * 100)) }}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="table-responsive my-5 px-3">
              <h2 class="title text-20">Patients Reduce HbA1C ≥ 1%</h2>
              <table class="table-bordered w-100">
                <tbody>
                  <tr>
                    <td class="p-2">Male</td>
                    <td class="text-right pr-3">{{ patientStat.male_patients }}</td>
                  </tr>
                  <tr>
                    <td class="p-2">Female</td>
                    <td class="text-right pr-3">{{ patientStat.female_patients }}</td>
                  </tr>
                  <tr>
                    <td class="p-2">Total</td>
                    <td class="text-right pr-3">{{ patientStat.total_patient }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-4">
            <div class="table-responsive my-5 px-3">
              <h2 class="title text-20">Disease distribution (all patients)</h2>
              <table class="table-bordered w-100">
                <thead>
                  <tr>
                    <th class="p-2">Disease</th>
                    <th class="p-2">Male</th>
                    <th class="p-2">Female</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th class="p-2">Diabetes</th>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.male_age_30_to_39 / patientStat.total_patient)*100)) }}%</td>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.female_age_30_to_39 / patientStat.total_patient)*100)) }}%</td>
                  </tr>
                  <tr>
                    <th class="p-2">Hypertension</th>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.male_age_40_to_49 / patientStat.total_patient)*100)) }}%</td>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.female_age_40_to_49 / patientStat.total_patient)*100)) }}%</td>
                  </tr>
                  <tr>
                    <th class="p-2">Diabetes and Hypertension</th>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.male_age_40_to_49 / patientStat.total_patient)*100)) }}%</td>
                    <td class="text-right pr-3">{{ Math.round(((patientStat.female_age_40_to_49 / patientStat.total_patient)*100)) }}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
    DateRangePicker
  },
    props: ['patients', 'patientStat', 'total_pending', 'total_pending_careplan_patients', 'data'],
    data() {
        return {
          dateRange: {
            startDate: "2020-01-01",
            endDate: "2020-01-10",
            format: "DD-MM-YYYY"
          },
        }
    },
    computed: {
        
    }
    
}
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
        background: #01579B;
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
    
    &:hover, &:focus {
      color: #262626;
    text-decoration: none;
    background-color: #f5f5f5;
    }
    
    input[type=checkbox], input[type=radio] {
      margin-right: .5em;
    }
  }
}

.dropdown-actions {
  margin-top: 5px;
  margin-left: 10px;
  }
</style>