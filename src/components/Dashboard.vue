<template>
  <!-- Main Content -->
  <div id="content">
    <!-- Top Nav Bar -->
    <TopNavBar heading="Dashboard" hideBackIcon="true"></TopNavBar>

    <div class="row">
      <div class="col-lg-12">
        <div class="encounter-stats">
          <div class="card tab-card bg-off-white border-0 border-radious-0">
            <div class="container-fluid px-5">
              <div class="row">
                <div class="col-lg-8">
                  <form class="form-row sharp-input">
                    <!-- <div class="form-group mb-2 col">
                      <label for="staticEmail2" class="font-weight-bold">Date Range </label>
                      <select @change="filterSummary" v-model="selectedDateRange" id="" class="form-control">
                        <option value="30">Last 30</option>
                        <option value="90">Last 90</option>
                        <option value="120">Last Quarter</option>
                        <option value="365">Last Year</option>
                      </select>
                    </div> -->
                    <div class="form-group mb-2 col">
                      <label for="staticEmail2" class="font-weight-bold"
                        >From</label
                      >
                      <input
                        type="date"
                        @change="filterSummary"
                        v-model="fromDate"
                        class="form-control"
                        :max="maxDate"
                      />
                    </div>
                    <div class="form-group mb-2 col">
                      <label for="staticEmail2" class="font-weight-bold"
                        >To</label
                      >
                      <input
                        type="date"
                        @change="filterSummary"
                        v-model="toDate"
                        class="form-control"
                        :max="maxDate"
                      />
                    </div>
                    <div class="form-group mx-sm-3 mb-2 col">
                      <label for="inputPassword2" class="font-weight-bold"
                        >Center</label
                      >
                      <select
                        @change="filterSummary"
                        v-model="selectedCenter"
                        class="form-control"
                      >
                        <option
                          :value="center.id"
                          v-for="center in centers"
                          :key="center.id"
                          >{{ center.name }}</option
                        >
                      </select>
                    </div>
                    <button
                      type="button"
                      @click="filterSummary"
                      class="btn btn-primary mb-2 mt-auto h-fit rounded-0"
                    >
                      Go
                    </button>
                    <button
                      type="button"
                      @click="resetFilter"
                      class="btn btn-primary mb-2 mt-auto h-fit rounded-0 ml-2"
                    >
                      <i class="fas fa-redo-alt"></i>
                    </button>
                  </form>
                </div>
                <div class="col-lg-4 exportbtn-container">
                  <button type="submit" class="btn btn-primary mb-2 mt-auto">
                    <download-excel
                      :data="exportData"
                      :export-fields="exportFields"
                      header="Summery of All Data"
                      name="summery.xls"
                    >
                      Export
                      <img
                        src="../assets/images/export-icon.png"
                        alt="Export"
                      />
                    </download-excel>
                  </button>
                </div>
              </div>

              <div class="mt-5" v-if="summary">
                <a class="metrics-title" href="javascript:void(0)"
                  >Operational Metrics</a
                >
              </div>

              <div class="row summery-tables mt-0">
                <div class="col-md-12">
                  <div class="table-responsive">
                    <table class="w-100" v-if="summary">
                      <tbody>
                        <tr>
                          <th class="p-2"></th>
                          <th class="p-2">Total</th>
                          <th class="p-2">Male</th>
                          <th class="p-2">Female</th>
                          <th class="p-2">Male %</th>
                          <th class="p-2">Female %</th>
                        </tr>
                        <tr class="bg-yellow tr-border-bttom">
                          <td class="p-2">Totals Enrolled</td>
                          <td class="p-2">
                            {{ summary.patients_total.total }}
                          </td>
                          <td class="p-2">{{ summary.patients_total.male }}</td>
                          <td class="p-2">
                            {{ summary.patients_total.female }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_total.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{ summary.patients_total.female_ratio }}%
                          </td>
                        </tr>
                        <tr class="bg-yellow tr-border-bttom">
                          <td class="p-2">Total Newly Enrolled</td>
                          <td class="p-2">{{ summary.patients_new.total }}</td>
                          <td class="p-2">{{ summary.patients_new.male }}</td>
                          <td class="p-2">{{ summary.patients_new.female }}</td>
                          <td class="p-2">
                            {{ summary.patients_new.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{ summary.patients_new.female_ratio }}%
                          </td>
                        </tr>
                        <tr class="bg-grey tr-border-bttom">
                          <td class="p-2">Totals with hypertension</td>
                          <td class="p-2">
                            {{ summary.patients_hypertension.total }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_hypertension.male }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_hypertension.female }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_hypertension.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{ summary.patients_hypertension.female_ratio }}%
                          </td>
                        </tr>
                        <tr class="bg-grey tr-border-bttom">
                          <td class="p-2">Totals with diabetes</td>
                          <td class="p-2">
                            {{ summary.patients_diabetes.total }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_diabetes.male }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_diabetes.female }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_diabetes.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{ summary.patients_diabetes.female_ratio }}%
                          </td>
                        </tr>
                        <tr class="bg-grey tr-border-bttom">
                          <td class="p-2">Totals with HTN and DM</td>
                          <td class="p-2">
                            {{ summary.patients_hypertension_diabetes.total }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_hypertension_diabetes.male }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_hypertension_diabetes.female }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_hypertension_diabetes.male_ratio
                            }}%
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_hypertension_diabetes
                                .female_ratio
                            }}%
                          </td>
                        </tr>
                        <tr class="bg-green tr-border-bttom">
                          <td class="p-2">Number of new centre visits</td>
                          <td class="p-2">
                            {{ summary.patients_new_center_visit.total }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_new_center_visit.male }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_new_center_visit.female }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_new_center_visit.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_new_center_visit.female_ratio
                            }}%
                          </td>
                        </tr>
                        <tr class="bg-green tr-border-bttom">
                          <td class="p-2">Number of follow up centre visits</td>
                          <td class="p-2">
                            {{ summary.patients_followup_center_visit.total }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_followup_center_visit.male }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_followup_center_visit.female }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_followup_center_visit.male_ratio
                            }}%
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_followup_center_visit
                                .female_ratio
                            }}%
                          </td>
                        </tr>
                        <tr class="bg-green tr-border-bttom">
                          <td class="p-2">Number of follow up home visits</td>
                          <td class="p-2">
                            {{
                              summary.patients_followup_community_visit.total
                            }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_followup_community_visit.male }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_followup_community_visit.female
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_followup_community_visit
                                .male_ratio
                            }}%
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_followup_community_visit
                                .female_ratio
                            }}%
                          </td>
                        </tr>
                        <tr class="bg-green tr-border-bttom">
                          <td class="p-2">Number of referrals from centre</td>
                          <td class="p-2">
                            {{ summary.patients_referral_center.total }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_referral_center.male }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_referral_center.female }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_referral_center.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{ summary.patients_referral_center.female_ratio }}%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="mt-5" v-if="summary">
                <a class="metrics-title" href="javascript:void(0)"
                  >Outcome Metrics
                </a>
              </div>

              <div class="row summery-tables mt-0">
                <div class="col-md-12">
                  <div class="table-responsive" v-if="summary">
                    <table class="w-100">
                      <tbody>
                        <tr>
                          <th class="p-2"></th>
                          <th class="p-2">Total</th>
                          <th class="p-2">Male</th>
                          <th class="p-2">Female</th>
                          <th class="p-2">Male %</th>
                          <th class="p-2">Female %</th>
                        </tr>
                        <tr class="bg-yellow tr-border-bttom">
                          <td class="p-2">% of patients reduce HbA1c > 1%</td>
                          <td class="p-2">
                            {{ summary.patients_a1c_reduced1.total }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_a1c_reduced1.male }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_a1c_reduced1.female }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_a1c_reduced1.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{ summary.patients_a1c_reduced1.female_ratio }}%
                          </td>
                        </tr>

                        <tr class="bg-yellow tr-border-bttom">
                          <td class="p-2">% of patients reduce HbA1c < 7%</td>
                          <td class="p-2">
                            {{ summary.patients_a1c_reduced7.total }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_a1c_reduced7.male }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_a1c_reduced7.female }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_a1c_reduced7.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{ summary.patients_a1c_reduced7.female_ratio }}%
                          </td>
                        </tr>
                        <tr class="bg-yellow tr-border-bttom">
                          <td class="p-2">
                            % of patience reduce SBP > 10 mmHg
                          </td>
                          <td class="p-2">
                            {{ summary.patients_systolic_reduced10.total }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_systolic_reduced10.male }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_systolic_reduced10.female }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_systolic_reduced10.male_ratio
                            }}%
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_systolic_reduced10.female_ratio
                            }}%
                          </td>
                        </tr>
                        <tr class="bg-yellow tr-border-bttom">
                          <td class="p-2">% of patience reduce DBP > 5 mmHg</td>
                          <td class="p-2">
                            {{ summary.patients_diastolic_reduced5.total }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_diastolic_reduced5.male }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_diastolic_reduced5.female }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_diastolic_reduced5.male_ratio
                            }}%
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_diastolic_reduced5.female_ratio
                            }}%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="mt-5" v-if="summary">
                <a class="metrics-title" href="javascript:void(0)"
                  >Additional Metrics
                </a>
              </div>

              <div class="row summery-tables mt-0">
                <div class="col-md-12">
                  <div class="table-responsive" v-if="summary">
                    <table class="w-100">
                      <tbody>
                        <tr>
                          <th class="p-2"></th>
                          <th class="p-2">Total</th>
                          <th class="p-2">Male</th>
                          <th class="p-2">Female</th>
                          <th class="p-2">Male %</th>
                          <th class="p-2">Female %</th>
                        </tr>
                        <tr class="bg-yellow tr-border-bttom">
                          <td class="p-2">% retention from total enrolled</td>
                          <td class="p-2">N/A</td>
                          <td class="p-2">N/A</td>
                          <td class="p-2">N/A</td>
                          <td class="p-2">N/A</td>
                          <td class="p-2">N/A</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="mt-5" v-if="summary">
                <a class="metrics-title" href="javascript:void(0)"
                  >Age Breakdown of patients
                </a>
              </div>

              <div class="row summery-tables mt-0">
                <div class="col-md-12">
                  <div class="table-responsive" v-if="summary">
                    <table class="w-100">
                      <tbody>
                        <tr>
                          <th class="p-2"></th>
                          <th class="p-2">Total</th>
                          <th class="p-2">Male</th>
                          <th class="p-2">Female</th>
                          <th class="p-2">Male %</th>
                          <th class="p-2">Female %</th>
                        </tr>
                        <tr class="bg-green tr-border-bttom">
                          <td class="p-2">Below 30</td>
                          <td class="p-2">
                            {{ summary.patients_below_30.total }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_below_30.male }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_below_30.female }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_below_30.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{ summary.patients_below_30.female_ratio }}%
                          </td>
                        </tr>
                        <tr class="bg-green tr-border-bttom">
                          <td class="p-2">30 to 39</td>
                          <td class="p-2">
                            {{ summary.patients_30_39.total }}
                          </td>
                          <td class="p-2">{{ summary.patients_30_39.male }}</td>
                          <td class="p-2">
                            {{ summary.patients_30_39.female }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_30_39.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{ summary.patients_30_39.female_ratio }}%
                          </td>
                        </tr>
                        <tr class="bg-green tr-border-bttom">
                          <td class="p-2">40 to 49</td>
                          <td class="p-2">
                            {{ summary.patients_40_49.total }}
                          </td>
                          <td class="p-2">{{ summary.patients_40_49.male }}</td>
                          <td class="p-2">
                            {{ summary.patients_40_49.female }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_40_49.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{ summary.patients_40_49.female_ratio }}%
                          </td>
                        </tr>
                        <tr class="bg-green tr-border-bttom">
                          <td class="p-2">50 to 59</td>
                          <td class="p-2">
                            {{ summary.patients_50_59.total }}
                          </td>
                          <td class="p-2">{{ summary.patients_50_59.male }}</td>
                          <td class="p-2">
                            {{ summary.patients_50_59.female }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_50_59.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{ summary.patients_50_59.female_ratio }}%
                          </td>
                        </tr>
                        <tr class="bg-green tr-border-bttom">
                          <td class="p-2">60 to 69</td>
                          <td class="p-2">
                            {{ summary.patients_60_69.total }}
                          </td>
                          <td class="p-2">{{ summary.patients_60_69.male }}</td>
                          <td class="p-2">
                            {{ summary.patients_60_69.female }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_60_69.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{ summary.patients_60_69.female_ratio }}%
                          </td>
                        </tr>
                        <tr class="bg-green tr-border-bttom">
                          <td class="p-2">70+</td>
                          <td class="p-2">
                            {{ summary.patients_over_70.total }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_over_70.male }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_over_70.female }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_over_70.male_ratio }}%
                          </td>
                          <td class="p-2">
                            {{ summary.patients_over_70.female_ratio }}%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="mt-5" v-if="summary">
                <a class="metrics-title" href="javascript:void(0)"
                  >Intervention Metrices</a
                >
              </div>

              <div class="row summery-tables mt-0">
                <div class="col-md-12">
                  <div class="table-responsive" v-if="summary">
                    <table class="w-100">
                      <tbody>
                        <tr>
                          <th class="p-2"></th>
                          <th class="p-2">Total</th>
                          <th class="p-2">Male</th>
                          <th class="p-2">Female</th>
                          <th class="p-2">Male %</th>
                          <th class="p-2">Female %</th>
                        </tr>
                        <tr class="bg-yellow tr-border-bttom">
                          <td class="p-2">Total counselling interventions</td>
                          <td class="p-2">
                            {{
                              summary.patients_counselling_interventions.total
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_counselling_interventions.male
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_counselling_interventions.female
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_counselling_interventions
                                .male_ratio
                            }}%
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_counselling_interventions
                                .female_ratio
                            }}%
                          </td>
                        </tr>
                        <tr class="bg-yellow tr-border-bttom">
                          <td class="p-2">
                            Smoking cessation counselling provided
                          </td>
                          <td class="p-2">
                            {{ summary.patients_smoking_counselling.total }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_smoking_counselling.male }}
                          </td>
                          <td class="p-2">
                            {{ summary.patients_smoking_counselling.female }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_smoking_counselling.male_ratio
                            }}%
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_smoking_counselling.female_ratio
                            }}%
                          </td>
                        </tr>
                        <tr class="bg-yellow tr-border-bttom">
                          <td class="p-2">
                            Smokeless tobacco cessation counselling provided
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_smokless_tobacco_counselling
                                .total
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_smokless_tobacco_counselling.male
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_smokless_tobacco_counselling
                                .female
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_smokless_tobacco_counselling
                                .male_ratio
                            }}%
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_smokless_tobacco_counselling
                                .female_ratio
                            }}%
                          </td>
                        </tr>
                        <tr class="bg-yellow tr-border-bttom">
                          <td class="p-2">
                            Salt reduction counselling provided
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_salt_reduction_counselling.total
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_salt_reduction_counselling.male
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_salt_reduction_counselling.female
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_salt_reduction_counselling
                                .male_ratio
                            }}%
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_salt_reduction_counselling
                                .female_ratio
                            }}%
                          </td>
                        </tr>
                        <tr class="bg-yellow tr-border-bttom">
                          <td class="p-2">
                            Physical activity counselling provided
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_physical_activity_counselling
                                .total
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_physical_activity_counselling
                                .male
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_physical_activity_counselling
                                .female
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_physical_activity_counselling
                                .male_ratio
                            }}%
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_physical_activity_counselling
                                .female_ratio
                            }}%
                          </td>
                        </tr>
                        <tr class="bg-yellow tr-border-bttom">
                          <td class="p-2">
                            Treatment adherence counselling provided
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_medical_adherence_counselling
                                .total
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_medical_adherence_counselling
                                .male
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_medical_adherence_counselling
                                .female
                            }}
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_medical_adherence_counselling
                                .male_ratio
                            }}%
                          </td>
                          <td class="p-2">
                            {{
                              summary.patients_medical_adherence_counselling
                                .female_ratio
                            }}%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Main Content -->
</template>

<script>
import BarChart from "./utils/BarChart.vue";
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import Analysis from "./dashboard/Analysis";
import Topbar from "./Topbar.vue";
import TopNavBar from "./TopNavBar.vue";
import moment from "moment";

export default {
  components: {
    BarChart,
    DateRangePicker,
    Analysis,
    Topbar,
    TopNavBar,
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      search: "",
      summary: null,
      patientStat: {
        total_patient: 0,
        male_patients: 0,
        female_patients: 0,
        age_30_to_39: 0,
        age_40_to_49: 0,
        age_50_to_59: 0,
        age_60_to_69: 0,
        age_70_plus: 0,
        male_age_30_to_39: 0,
        male_age_40_to_49: 0,
        male_age_50_to_59: 0,
        male_age_60_to_69: 0,
        male_age_70_plus: 0,
        female_age_30_to_39: 0,
        female_age_40_to_49: 0,
        female_age_50_to_59: 0,
        female_age_60_to_69: 0,
        female_age_70_plus: 0,
      },

      total_careplan: 0,
      total_pending: 0,
      total_pending_careplan_patients: 0,
      data: null,
      patients: null,
      selectedDateRange: "",
      selectedCenter: "",
      centers: [],
      fromDate: "",
      toDate: "",
      maxDate: "",
      exportData: [],
      exportFields: {
        "Metrics Type": "type",
        "Metrics Name": "metrics",
        Total: "total",
        Male: "male",
        Female: "female",
        "Male %": "male_percentage",
        "Female %": "female_percentage",
      },
    };
  },
  mounted() {
    this.getSummary();
    this.getCenters();
    this.maxDate = moment().format("YYYY-MM-DD");
    this.scrollToTop();
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    filterSummary() {
      let query = {};
      // if (this.selectedDateRange) {
      //   query.lastDays = this.selectedDateRange;
      // }
      if (this.fromDate && this.toDate) {
        if (this.fromDate > this.toDate) {
          this.$toast.open({
            message: "Invalid Date Range Selected",
            type: "error",
          });
          return;
        }
      }
      if (this.selectedCenter) {
        query.center = this.selectedCenter;
      }
      if (this.fromDate) {
        query.fromDate = this.fromDate;
      }
      if (this.toDate) {
        query.toDate = this.toDate;
      }

      if (query) {
        this.getSummary(query);
      }
    },
    onTabClick() {
      if (this.$route.query.encounter || this.$route.query.assessment) {
        this.$router.replace({});
      }
    },
    getSummary(query) {
      let loader = this.$loading.show();
      query = query || {};
      //TODO: add query params to request
      this.$http.get("/stats/summary-mongo", { params: query }).then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            this.summary = response.data.data.summary || {};
            this.prepareExportData();
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },
    resetFilter() {
      this.selectedCenter = "";
      this.fromDate = "";
      this.toDate = "";
      this.filterSummary();
    },
    getCenters() {
      this.$http.get("/centers/mongo").then(
        (response) => {
          if (response.status == 200) {
            this.centers = response.data.data;
          }
        },
        (error) => {}
      );
    },
    prepareExportData() {
      this.exportData = [
        {
          type: "Operational Metrics",
          metrics: "Total Enrolled",
          total: this.summary.patients_total.total,
          male: this.summary.patients_total.male,
          female: this.summary.patients_total.female,
          male_percentage: this.summary.patients_total.male_ratio,
          female_percentage: this.summary.patients_total.female_ratio,
        },
        {
          metrics: "Total Newly Enrolled",
          total: this.summary.patients_new.total,
          male: this.summary.patients_new.male,
          female: this.summary.patients_new.female,
          male_percentage: this.summary.patients_new.male_ratio,
          female_percentage: this.summary.patients_new.female_ratio,
        },
        {
          metrics: "Totals with hypertension",
          total: this.summary.patients_hypertension.total,
          male: this.summary.patients_hypertension.male,
          female: this.summary.patients_hypertension.female,
          male_percentage: this.summary.patients_hypertension.male_ratio,
          female_percentage: this.summary.patients_hypertension.female_ratio,
        },
        {
          metrics: "Totals with diabetes",
          total: this.summary.patients_diabetes.total,
          male: this.summary.patients_diabetes.male,
          female: this.summary.patients_diabetes.female,
          male_percentage: this.summary.patients_diabetes.male_ratio,
          female_percentage: this.summary.patients_diabetes.female_ratio,
        },
        {
          metrics: "Totals with HTN and DM",
          total: this.summary.patients_hypertension_diabetes.total,
          male: this.summary.patients_hypertension_diabetes.male,
          female: this.summary.patients_hypertension_diabetes.female,
          male_percentage: this.summary.patients_hypertension_diabetes
            .male_ratio,
          female_percentage: this.summary.patients_hypertension_diabetes
            .female_ratio,
        },
        {
          metrics: "Number of new centre visits",
          total: this.summary.patients_new_center_visit.total,
          male: this.summary.patients_new_center_visit.male,
          female: this.summary.patients_new_center_visit.female,
          male_percentage: this.summary.patients_new_center_visit.male_ratio,
          female_percentage: this.summary.patients_new_center_visit
            .female_ratio,
        },
        {
          metrics: "Number of follow up centre visits",
          total: this.summary.patients_followup_center_visit.total,
          male: this.summary.patients_followup_center_visit.male,
          female: this.summary.patients_followup_center_visit.female,
          male_percentage: this.summary.patients_followup_center_visit
            .male_ratio,
          female_percentage: this.summary.patients_followup_center_visit
            .female_ratio,
        },
        {
          metrics: "Number of follow up home visits",
          total: this.summary.patients_followup_community_visit.total,
          male: this.summary.patients_followup_community_visit.male,
          female: this.summary.patients_followup_community_visit.female,
          male_percentage: this.summary.patients_followup_community_visit
            .male_ratio,
          female_percentage: this.summary.patients_followup_community_visit
            .female_ratio,
        },
        {
          metrics: "Number of referrals from centre",
          total: this.summary.patients_referral_center.total,
          male: this.summary.patients_referral_center.male,
          female: this.summary.patients_referral_center.female,
          male_percentage: this.summary.patients_referral_center.male_ratio,
          female_percentage: this.summary.patients_referral_center.female_ratio,
        },
        {
          type: "Outcome Metrics",
          metrics: "% of patients reduce HbA1c > 1%",
          total: this.summary.patients_a1c_reduced1.total,
          male: this.summary.patients_a1c_reduced1.male,
          female: this.summary.patients_a1c_reduced1.female,
          male_percentage: this.summary.patients_a1c_reduced1.male_ratio,
          female_percentage: this.summary.patients_a1c_reduced1.female_ratio,
        },
        {
          metrics: "% of patients reduce HbA1c < 7%",
          total: this.summary.patients_a1c_reduced7.total,
          male: this.summary.patients_a1c_reduced7.male,
          female: this.summary.patients_a1c_reduced7.female,
          male_percentage: this.summary.patients_a1c_reduced7.male_ratio,
          female_percentage: this.summary.patients_a1c_reduced7.female_ratio,
        },
        {
          metrics: "% of patience reduce SBP > 10 mmHg",
          total: this.summary.patients_systolic_reduced10.total,
          male: this.summary.patients_systolic_reduced10.male,
          female: this.summary.patients_systolic_reduced10.female,
          male_percentage: this.summary.patients_systolic_reduced10.male_ratio,
          female_percentage: this.summary.patients_systolic_reduced10
            .female_ratio,
        },
        {
          metrics: "% of patience reduce DBP > 5 mmHg",
          total: this.summary.patients_diastolic_reduced5.total,
          male: this.summary.patients_diastolic_reduced5.male,
          female: this.summary.patients_diastolic_reduced5.female,
          male_percentage: this.summary.patients_diastolic_reduced5.male_ratio,
          female_percentage: this.summary.patients_diastolic_reduced5
            .female_ratio,
        },
        {
          type: "Additional Metrics",
          metrics: "% retention from total enrolled",
          total: "N/A",
          male: "N/A",
          female: "N/A",
          male_percentage: "N/A",
          female_percentage: "N/A",
        },
        {
          type: "Age Breakdown of Patients",
          metrics: "Below 30",
          total: this.summary.patients_below_30.total,
          male: this.summary.patients_below_30.male,
          female: this.summary.patients_below_30.female,
          male_percentage: this.summary.patients_below_30.male_ratio,
          female_percentage: this.summary.patients_below_30.female_ratio,
        },
        {
          metrics: "30 to 39",
          total: this.summary.patients_30_39.total,
          male: this.summary.patients_30_39.male,
          female: this.summary.patients_30_39.female,
          male_percentage: this.summary.patients_30_39.male_ratio,
          female_percentage: this.summary.patients_30_39.female_ratio,
        },
        {
          metrics: "40 to 49",
          total: this.summary.patients_40_49.total,
          male: this.summary.patients_40_49.male,
          female: this.summary.patients_40_49.female,
          male_percentage: this.summary.patients_40_49.male_ratio,
          female_percentage: this.summary.patients_40_49.female_ratio,
        },
        {
          metrics: "50 to 59",
          total: this.summary.patients_50_59.total,
          male: this.summary.patients_50_59.male,
          female: this.summary.patients_50_59.female,
          male_percentage: this.summary.patients_50_59.male_ratio,
          female_percentage: this.summary.patients_50_59.female_ratio,
        },
        {
          metrics: "60 to 69",
          total: this.summary.patients_60_69.total,
          male: this.summary.patients_60_69.male,
          female: this.summary.patients_60_69.female,
          male_percentage: this.summary.patients_60_69.male_ratio,
          female_percentage: this.summary.patients_60_69.female_ratio,
        },
        {
          metrics: "70+",
          total: this.summary.patients_over_70.total,
          male: this.summary.patients_over_70.male,
          female: this.summary.patients_over_70.female,
          male_percentage: this.summary.patients_over_70.male_ratio,
          female_percentage: this.summary.patients_over_70.female_ratio,
        },
        {
          type: "Intervention Metrics",
          metrics: "Total counselling interventions",
          total: this.summary.patients_counselling_interventions.total,
          male: this.summary.patients_counselling_interventions.male,
          female: this.summary.patients_counselling_interventions.female,
          male_percentage: this.summary.patients_counselling_interventions
            .male_ratio,
          female_percentage: this.summary.patients_counselling_interventions
            .female_ratio,
        },
        {
          metrics: "Smoking cessation counselling provided",
          total: this.summary.patients_smoking_counselling.total,
          male: this.summary.patients_smoking_counselling.male,
          female: this.summary.patients_smoking_counselling.female,
          male_percentage: this.summary.patients_smoking_counselling.male_ratio,
          female_percentage: this.summary.patients_smoking_counselling
            .female_ratio,
        },
        {
          metrics: "Smokeless tobacco cessation counselling provided",
          total: this.summary.patients_smokless_tobacco_counselling.total,
          male: this.summary.patients_smokless_tobacco_counselling.male,
          female: this.summary.patients_smokless_tobacco_counselling.female,
          male_percentage: this.summary.patients_smokless_tobacco_counselling
            .male_ratio,
          female_percentage: this.summary.patients_smokless_tobacco_counselling
            .female_ratio,
        },
        {
          metrics: "Salt reduction counselling provided",
          total: this.summary.patients_salt_reduction_counselling.total,
          male: this.summary.patients_salt_reduction_counselling.male,
          female: this.summary.patients_salt_reduction_counselling.female,
          male_percentage: this.summary.patients_salt_reduction_counselling
            .male_ratio,
          female_percentage: this.summary.patients_salt_reduction_counselling
            .female_ratio,
        },
        {
          metrics: "Physical activity counselling provided",
          total: this.summary.patients_physical_activity_counselling.total,
          male: this.summary.patients_physical_activity_counselling.male,
          female: this.summary.patients_physical_activity_counselling.female,
          male_percentage: this.summary.patients_physical_activity_counselling
            .male_ratio,
          female_percentage: this.summary.patients_physical_activity_counselling
            .female_ratio,
        },
        {
          metrics: "Treatment adherence counselling provided",
          total: this.summary.patients_medical_adherence_counselling.total,
          male: this.summary.patients_medical_adherence_counselling.male,
          female: this.summary.patients_medical_adherence_counselling.female,
          male_percentage: this.summary.patients_medical_adherence_counselling
            .male_ratio,
          female_percentage: this.summary.patients_medical_adherence_counselling
            .female_ratio,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
.encounter-stats {
  margin: 0;
}
#content {
  background-color: #f8f9fb;
}
.bg-off-white {
  background-color: #f8f9fb;
}
</style>
