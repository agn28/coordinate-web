<template>
  <div class="content report">
    <div class="loader" v-if="isLoading">
      <rotate-square2></rotate-square2>
    </div>
    <div class="animated fadeIn">
      <div class="card mt-4">
        <div class="card-header py-2">
          <div class="row">
            <div class="col py-1">
              <a href @click.prevent="$router.go(-1)">
                <i class="fa fa-arrow-left float-left mr-4 text-secondary"></i>
              </a>
              <h4 class="font-weight-bold">Health Assessment Report</h4>
            </div>
          </div>
        </div>
        <div class="card-body px-5">
          <div class="row">
            <div class="col-sm-4 report-element">
              <div class="element-header">
                <h3>Lifestyle Risk Factors</h3>
              </div>
              <table class="table table-striped risk-factors">
                <tbody v-if="lifestyle.components">
                  <tr>
                    <td class="title">Smoker</td>
                    <td :class="lifestyle.components.smoking.tfl">{{ lifestyle.components.smoking ? lifestyle.components.smoking.eval : '' }}</td>
                  </tr>
                  <tr>
                    <td class="title">Alcohol Consumption</td>
                    <td :class="lifestyle.components.alcohol.tfl">{{ lifestyle.components.alcohol ? lifestyle.components.alcohol.eval : '' }}</td>
                  </tr>
                  <tr>
                    <td class="title">Fruit intake</td>
                    <td :class="lifestyle.components.diet.components.fruit.tfl">{{ lifestyle.components.diet && lifestyle.components.diet.components.fruit ? lifestyle.components.diet.components.fruit.eval : '' }}</td>
                  </tr>
                  <tr>
                    <td class="title">Vegetable intake</td>
                    <td :class="lifestyle.components.diet.components.vegetable.tfl">{{ lifestyle.components.diet && lifestyle.components.diet.components.vegetable ? lifestyle.components.diet.components.vegetable.eval : '' }}</td>
                  </tr>
                  <tr>
                    <td class="title">Fruit &amp; Vegetable intake</td>
                    <td :class="lifestyle.components.diet.components.fruit_vegetable.tfl">{{ lifestyle.components.diet && lifestyle.components.diet.components.fruit_vegetable ? lifestyle.components.diet.components.fruit_vegetable.eval : '' }}</td>
                  </tr>
                  <tr>
                    <td class="title">Physical Activity</td>
                    <td :class="lifestyle.components.physical_activity.tfl">{{ lifestyle.components.physical_activity ? lifestyle.components.physical_activity.eval : '' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-sm report-element" style="margin-left: 10px;">
              <div class="element-header">
                <h3>Body Composition</h3>
              </div>
              <table v-if="body_composition.components" class="table table-borderless">
                <tbody>
                  <tr>
                    <td>
                      <span class="title">BMI</span>
                      <small>
                        &nbsp; (h: 180cm, w: 80kg)
                      </small>
                      <br />
                    </td>
                    <td>
                      <span class="tfl value" :class="body_composition.components.bmi.tfl">{{ body_composition.components.bmi ? body_composition.components.bmi.value : '' }}</span>
                    </td>
                    <td class="target">{{ body_composition.components.bmi ? body_composition.components.bmi.target : '' }}</td>
                    <td>
                      <span class="tfl" :class="body_composition.components.bmi.tfl">{{ body_composition.components.bmi ? body_composition.components.bmi.eval : '' }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="title">Waist Circumference</span>
                      <br />
                    </td>
                    <td>
                      <span class="tfl value" :class="body_composition.components.waist_circ.tfl">{{ body_composition.components.waist_circ ? body_composition.components.waist_circ.value : '' }}</span>
                    </td>
                    <td class="target" >{{ body_composition.components.waist_circ ? body_composition.components.waist_circ.target : '' }}</td>
                    <td>
                      <span class="tfl" :class="body_composition.components.waist_circ.tfl">{{ body_composition.components.waist_circ ? body_composition.components.waist_circ.eval : '' }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="title">Body Fat</span>
                      <br />
                    </td>
                    <td>
                      <span class="tfl value" :class="body_composition.components.body_fat.tfl">{{ body_composition.components.body_fat ? body_composition.components.body_fat.value : '' }}</span>
                    </td>
                    <td class="target">{{ body_composition.components.body_fat ? body_composition.components.body_fat.target : '' }}</td>
                    <td>
                      <span class="tfl" :class="body_composition.components.body_fat.tfl">{{ body_composition.components.body_fat ? body_composition.components.body_fat.eval : '' }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="body_composition.components" class="recommendation">
                <p>{{ body_composition.message ? body_composition.message : '' }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4 report-element">
              <div class="element-header">
                <h3>Blood Pressure</h3>
              </div>
              <table v-if="blood_pressure != ''" class="table table-borderless element-data">
                <tbody>
                  <tr>
                    <td>
                      <span class="title">{{ blood_pressure.eval }}</span>
                      <br />
                    </td>
                    <td>
                      <span class="tfl value" :class="blood_pressure.tfl">{{ blood_pressure.value }}</span>
                      <span class="tfl" :class="blood_pressure.tfl" style="margin-left: 10px;">Elevated</span>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 0px 0.75rem;">
                      <span class="target">
                        Target:
                        {{ blood_pressure.target }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="recommendation">
                <p>{{ blood_pressure.message }}</p>
              </div>
            </div>
            <div class="col-sm report-element" style="margin-left: 10px;">
              <div class="element-header">
                <span class="badge badge-primary float-right">
                  Existing
                  Diabetes
                </span>
                <h3>Diabetes</h3>
              </div>
              <table v-if="diabetes != ''" class="table table-borderless element-data">
                <tbody>
                  <tr>
                    <td>
                      <span class="title">Blood Sugar</span>
                      <br />
                    </td>
                    <td>
                      <span class="tfl" :class="diabetes.tfl">{{ diabetes.value }}</span>
                      <span class="tfl" style="margin-left: 10px;">{{ diabetes.eval }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 0px 0.75rem;">
                      <span class="target">
                        Target:
                        {{ diabetes.target }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="recommendation">
                <p>{{ diabetes.message }}</p>
              </div>
            </div>
            <div class="col-sm report-element" style="margin-left: 10px;">
              <div class="element-header">
                <h3>Cholesterol</h3>
              </div>
              <table v-if="cholesterol.components" class="table table-borderless element-data">
                <tbody>
                  <tr>
                    <td>
                      <span class="title">TChol</span>
                      <br />
                    </td>
                    <td>
                      <span class="tfl value amber">{{ cholesterol.components.total_cholesterol ? cholesterol.components.total_cholesterol.value : '' }}</span>
                      <span class="tfl amber" style="margin-left: 10px;">{{ cholesterol.components.total_cholesterol ? cholesterol.components.total_cholesterol.eval : '' }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 0px 0.75rem;">
                      <span class="target">
                        Target:
                        {{ cholesterol.components.total_cholesterol ? cholesterol.components.total_cholesterol.target : '' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="cholesterol.components" class="recommendation">
                <p>{{ cholesterol.components.total_cholesterol ? cholesterol.components.total_cholesterol.message : '' }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="report-element col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="element-header">
                    <h3>Cardiovascular Risk</h3>
                    <p>
                      <small>
                        This is your calculated risk of having an event within the next 10 years. It
                        is based on a WHO Hearts Guidelines that consider a combination of modifiable
                        and non-modifiable risk factors.
                      </small>
                    </p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <table v-if="cvd != ''" class="table table-borderless element-data">
                    <tbody>
                      <tr>
                        <td>
                          <span class="title">10 year CVD risk</span>
                        </td>
                        <td>
                          <span class="tfl amber">{{ cvd.value }}</span>
                        </td>
                        <td>
                          <span class="tfl amber">{{ cvd.eval }}</span>
                        </td>
                        <td>{{ cvd.message }}</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="report-element">
                <div class="element-header">
                  <h3>Your Recommendations</h3>
                  <p class="lead">
                    Based on your assessment, you should focus on the following areas to improve
                    your health
                  </p>
                  <div class="risk-factors"></div>
                </div>
                <div v-if="referrals.refer"
                  style="background-color: rgb(230, 118, 38); padding: 15px 15px 2px 25px; border-radius: 6px; color: rgb(255, 255, 255); font-weight: bold;"
                >
                  <!---->
                  <!---->
                  <span v-for="(refer, index) in referrals.reasons" :key="index" class="badge badge-warning mr-2" style="text-transform: uppercase;">{{ refer.type }}</span>
                  <p class="text-light font-weight-bold">Referral Required</p>
                </div>
                <!---->
                <table class="table table-striped recommendations">
                  <tbody>
                    <tr v-for="(goal, index) in goals" :key="index">
                      <td class="title">
                        <small>
                          <span class="badge badge-info">{{ goal.code }}</span>
                        </small>
                        <br />{{ goal.eval }}
                      </td>
                      <td class="message">{{ goal.message }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="col-md report-element" style="margin-left: 10px;"  v-if="lifestyle.components">
              <div class="element-header">
                <h3>Diet and Exercise Advice</h3>
              </div>
              <div class="recommendation light">
                <h6 class="font-weight-bold">Nutrition</h6>
                <p>
                  Eat a diet that is rich in fruit and vegetables. Aim for 5 serves of vegetables and 2
                  servings of fruit daily
                </p>
                <ul>
                  <li>Reduce the amount of processed foods</li>
                  <li>Limit intake of free sugars to less than 6 teaspoons per day.</li>
                  <li>Avoid deep fried foods and fast foods</li>
                  <li>Replace deep frying with grilling or baking</li>
                  <li>Eat fish and lean cuts of meat</li>
                </ul>
                <h6 class="font-weight-bold">Physical Activity</h6>
                <p>
                  Aim for 150 minutes per week of moderate intensity exercise. Remember every little bit
                  counts. So move more! Examples of moderate intensity exercise include
                </p>
                <ul>
                  <li>Brisk walking, running, jogging</li>
                  <li>Dancing, Jumping Rope</li>
                  <li>Heavy gardening (continuous digging or hoeing)</li>
                  <li>Hiking uphill or with a heavy backpack</li>
                  <li>Riding a bicycle</li>
                </ul>

              </div>
            </div>
          </div>
          <div class="row footer">
            <div class="col-sm-12">
              <p class="text-left">
                <small>

                </small>
              </p>
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
import {RotateSquare2} from 'vue-loading-spinner'

export default {
  name: "health-records",
  components: {RotateSquare2},
  data() {
    return {
      isLoading: true,
      patients: [],
      allergies: [],
      participantId: '',
      encounterId: '',
      lifestyle: '',
      body_composition: '',
      blood_pressure: '',
      diabetes: '',
      cholesterol: '',
      cvd: '',
      goals: [],
      referrals: []
    };
  },
  methods: {
    getHealthRecords() {
      this.$http
        .get('patients/' + this.participantId + '/encounters/' + this.encounterId + '/assessments')
        .then(response => {
          this.lifestyle = response.data.hearts.assessments.lifestyle;
          this.body_composition = response.data.hearts.assessments.body_composition;
          this.blood_pressure = response.data.hearts.assessments.blood_pressure;
          this.diabetes = response.data.hearts.assessments.diabetes;
          this.cholesterol = response.data.hearts.assessments.cholesterol;
          this.cvd = response.data.hearts.assessments.cvd;
          this.goals = response.data.hearts.goals;
          this.referrals = response.data.hearts.referrals;
          this.isLoading = false;
        }).catch(error => {
          console.log(error)
        });
    },

  },
  mounted() {
    this.participantId = this.$route.params.participantId;
    this.encounterId = this.$route.params.encounterId;
    this.getHealthRecords();
  }
};
</script>
