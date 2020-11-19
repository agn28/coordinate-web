<template>
    <div>
        <div class="container-fluid mt-3">
            <div class="row">
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <span class>Gender Wise Patients ({{patientStat.total_patient}})</span>
              <!-- <p class="text-black text-bold mt-3">{{ total_patient}}</p> -->
              <div class="male-progress row mt-2">
                <div class="col-md-2">
                  <p>Male</p>
                </div>
                <div class="col-md-7">
                  <b-progress height="2rem" class="my-2 male-bar">
                    <b-progress-bar :value="((patientStat.male_patients / patientStat.total_patient)*100).toFixed(0)"></b-progress-bar>
                  </b-progress>
                </div>
                <div class="col-md-3">
                  <p>{{((patientStat.male_patients / patientStat.total_patient)*100).toFixed(0)}}% ({{patientStat.male_patients}})</p>
                </div>
              </div>
              <div class="female-progress row">
                <div class="col-md-2">
                  <p>Female</p>
                </div>
                <div class="col-md-7">
                  <b-progress height="2rem" class="my-2 female-bar">
                  <b-progress-bar :value="((patientStat.female_patients / patientStat.total_patient)*100).toFixed(0)"></b-progress-bar>
                </b-progress>
                </div>
                <div class="col-md-3">
                  <p>{{((patientStat.female_patients / patientStat.total_patient)*100).toFixed(0)}}% ({{patientStat.female_patients}})</p>
                </div>
                
              </div>
              <!-- <b-progress height="2rem" :value="20" show-progress class="my-2 female-bar"></b-progress> -->
              <router-link tag="a" class="text-link custom-text-link view-details" :to="{name: 'patients'}">View Details<i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>


          <div class="card mb-4">
            <div class="card-body">
              <span class>Patient Retention from Total Enrolled Patients</span>

              <div class="row">
                  <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              </div>
              

              <router-link tag="a" class="text-link custom-text-link view-details" :to="{name: 'patients'}">View Details<i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>


          <div class="card mb-4">
            <div class="card-body">
              <span class>Patients Follow up at Center</span>

              <div class="row">
                  <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              </div>
              

              <router-link tag="a" class="text-link custom-text-link view-details" :to="{name: 'patients'}">View Details<i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>


          <div class="card mb-4">
            <div class="card-body">
              <span class>Follow up for Self Monitor Patients by CHW</span>

              <div class="row">
                  <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              </div>
              

              <router-link tag="a" class="text-link custom-text-link view-details" :to="{name: 'patients'}">View Details<i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>


        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <span class>Age Group Distribution of Patients</span>
              
              <!-- <p class="text-black text-bold mt-3">{{ total_pending}}</p> -->
              <div class="male-progress row mt-2">
                <div class="col-md-2">
                  <p>30 - 39</p>
                </div>
                <div class="col-md-7 age-progress">
                  <b-progress height="2rem" class="my-2 female-age-bar">
                    <b-progress-bar :value="((patientStat.female_age_30_to_39 / patientStat.age_30_to_39)*100).toFixed(0)"></b-progress-bar>
                    <span>F: {{((patientStat.female_age_30_to_39 / patientStat.age_30_to_39)*100).toFixed(0)}}%</span>
                  </b-progress>
                  <b-progress height="2rem" class="my-2 male-age-bar">
                    <b-progress-bar :value="((patientStat.male_age_30_to_39 / patientStat.age_30_to_39)*100).toFixed(0)"></b-progress-bar>
                    <span>M: {{((patientStat.male_age_30_to_39 / patientStat.age_30_to_39)*100).toFixed(0)}}%</span>
                  </b-progress>
                </div>
                <div class="col-md-3">
                  <p>{{((patientStat.age_30_to_39 / patientStat.total_patient)*100).toFixed(0)}}% ({{patientStat.age_30_to_39}})</p>
                </div>
              </div>
              <div class="female-progress row">
                <div class="col-md-2">
                  <p>40 - 49</p>
                </div>
                <div class="col-md-7 age-progress">
                  <b-progress height="2rem" class="my-2 female-age-bar">
                    <b-progress-bar :value="((patientStat.female_age_40_to_49 / patientStat.age_40_to_49)*100).toFixed(0)"></b-progress-bar>
                    <span>F: {{((patientStat.female_age_40_to_49 / patientStat.age_40_to_49)*100).toFixed(0)}}%</span>
                  </b-progress>
                  <b-progress height="2rem" class="my-2 male-age-bar">
                    <b-progress-bar :value="((patientStat.male_age_40_to_49 / patientStat.age_40_to_49)*100).toFixed(0)"></b-progress-bar>
                    <span>M: {{((patientStat.male_age_40_to_49 / patientStat.age_40_to_49)*100).toFixed(0)}}%</span>
                  </b-progress>
                </div>
                <div class="col-md-3">
                  <p>{{((patientStat.age_40_to_49 / patientStat.total_patient)*100).toFixed(0)}}% ({{patientStat.age_40_to_49}})</p>
                </div>
                
              </div>
              <div class="female-progress row">
                <div class="col-md-2">
                  <p>50 - 59</p>
                </div>
                <div class="col-md-7 age-progress">
                  <b-progress height="2rem" class="my-2 female-age-bar">
                    <b-progress-bar :value="((patientStat.female_age_50_to_59 / patientStat.age_50_to_59)*100).toFixed(0)"></b-progress-bar>
                    <span>F: {{((patientStat.female_age_50_to_59 / patientStat.age_50_to_59)*100).toFixed(0)}}%</span>
                  </b-progress>
                  <b-progress height="2rem" class="my-2 male-age-bar">
                    <b-progress-bar :value="((patientStat.male_age_50_to_59 / patientStat.age_50_to_59)*100).toFixed(0)"></b-progress-bar>
                    <span>M: {{((patientStat.male_age_50_to_59 / patientStat.age_50_to_59)*100).toFixed(0)}}%</span>
                  </b-progress>
                </div>
                <div class="col-md-3">
                  <p>{{((patientStat.age_50_to_59 / patientStat.total_patient)*100).toFixed(0)}}% ({{patientStat.age_50_to_59}})</p>
                </div>
                
              </div>
              <div class="female-progress row">
                <div class="col-md-2">
                  <p>60 - 69</p>
                </div>
                <div class="col-md-7 age-progress">
                  <b-progress height="2rem" class="my-2 female-age-bar">
                    <b-progress-bar :value="((patientStat.female_age_60_to_69 / patientStat.age_60_to_69)*100).toFixed(0)"></b-progress-bar>
                    <span>F: {{((patientStat.female_age_60_to_69 / patientStat.age_60_to_69)*100).toFixed(0)}}%</span>
                  </b-progress>
                  <b-progress height="2rem" class="my-2 male-age-bar">
                    <b-progress-bar :value="((patientStat.male_age_60_to_69 / patientStat.age_60_to_69)*100).toFixed(0)"></b-progress-bar>
                    <span>M: {{((patientStat.male_age_60_to_69 / patientStat.age_60_to_69)*100).toFixed(0)}}%</span>
                  </b-progress>
                </div>
                <div class="col-md-3">
                  <p>{{((patientStat.age_60_to_69 / patientStat.total_patient)*100).toFixed(0)}}% ({{patientStat.age_60_to_69}})</p>
                </div>
                
              </div>
              <div class="female-progress row">
                <div class="col-md-2">
                  <p>70 +</p>
                </div>
                <div class="col-md-7 age-progress">
                  <b-progress height="2rem" class="my-2 female-age-bar">
                    <b-progress-bar :value="((patientStat.female_age_70_plus / patientStat.age_70_plus)*100).toFixed(0)"></b-progress-bar>
                    <span>F: {{((patientStat.female_age_70_plus / patientStat.age_70_plus)*100).toFixed(0)}}%</span>
                  </b-progress>
                  <b-progress height="2rem" class="my-2 male-age-bar">
                    <b-progress-bar :value="((patientStat.male_age_70_plus / patientStat.age_70_plus)*100).toFixed(0)"></b-progress-bar>
                    <span>M: {{((patientStat.male_age_70_plus / patientStat.age_70_plus)*100).toFixed(0)}}%</span>
                  </b-progress>
                </div>
                <div class="col-md-3">
                  <p>{{((patientStat.age_70_plus / patientStat.total_patient)*100).toFixed(0)}}% ({{patientStat.age_70_plus}})</p>
                </div>
                
              </div>
              <router-link tag="a" class="text-link custom-text-link view-details" :to="{name: 'patients'}">View Details<i class="fas fa-arrow-right"></i></router-link>
              <!-- <router-link
                :to="{name: 'pendingReviews'}"
                class="text-link custom-text-link"
              >View Patients Pending Review</router-link> -->
            </div>
          </div>


          <div class="card mb-4">
            <div class="card-body">
              <span class>Patients Reduce HbA1C ≥ 1%</span>

              <div class="row">
                  <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              </div>
              

              <router-link tag="a" class="text-link custom-text-link view-details" :to="{name: 'patients'}">View Details<i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>


          <div class="card mb-4">
            <div class="card-body">
              <span class>Patients Reduce Systolic BP  ≥ 10 mm of Hg</span>

              <div class="row">
                  <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              </div>
              

              <router-link tag="a" class="text-link custom-text-link view-details" :to="{name: 'patients'}">View Details<i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>




        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <span class>Disease Wise Patients Distribution</span>

              <!-- <p class="text-black text-bold mt-3">{{ total_pending_careplan_patients }}</p> -->
              <div class="female-progress row mt-2">
                <div class="col-md-2">
                  <p>HTN</p>
                </div>
                <div class="col-md-7 age-progress">
                  <b-progress height="2rem" class="my-2 female-age-bar">
                    <b-progress-bar :value="((patientStat.female_age_50_to_59 / patientStat.age_50_to_59)*100).toFixed(0)"></b-progress-bar>
                    <span>F: {{((patientStat.female_age_50_to_59 / patientStat.age_50_to_59)*100).toFixed(0)}}%</span>
                  </b-progress>
                  <b-progress height="2rem" class="my-2 male-age-bar">
                    <b-progress-bar :value="((patientStat.male_age_50_to_59 / patientStat.age_50_to_59)*100).toFixed(0)"></b-progress-bar>
                    <span>M: {{((patientStat.male_age_50_to_59 / patientStat.age_50_to_59)*100).toFixed(0)}}%</span>
                  </b-progress>
                </div>
                <div class="col-md-3">
                  <p>{{((patientStat.age_50_to_59 / patientStat.total_patient)*100).toFixed(0)}}% ({{patientStat.age_50_to_59}})</p>
                </div>
              </div>

              <div class="female-progress row mb-3">
                <div class="col-md-2">
                  <p>DM</p>
                </div>
                <div class="col-md-7 age-progress">
                  <b-progress height="2rem" class="my-2 female-age-bar">
                    <b-progress-bar :value="((patientStat.female_age_50_to_59 / patientStat.age_50_to_59)*100).toFixed(0)"></b-progress-bar>
                    <span>F: {{((patientStat.female_age_50_to_59 / patientStat.age_50_to_59)*100).toFixed(0)}}%</span>
                  </b-progress>
                  <b-progress height="2rem" class="my-2 male-age-bar">
                    <b-progress-bar :value="((patientStat.male_age_50_to_59 / patientStat.age_50_to_59)*100).toFixed(0)"></b-progress-bar>
                    <span>M: {{((patientStat.male_age_50_to_59 / patientStat.age_50_to_59)*100).toFixed(0)}}%</span>
                  </b-progress>
                </div>
                <div class="col-md-3">
                  <p>{{((patientStat.age_50_to_59 / patientStat.total_patient)*100).toFixed(0)}}% ({{patientStat.age_50_to_59}})</p>
                </div>
              </div>

              <span>Comorbid (DM+HTN)</span>
              

              <div class="row">
                  <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              </div>
              

              <router-link tag="a" class="text-link custom-text-link view-details" :to="{name: 'patients'}">View Details<i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>

          <div class="card mb-4">
            <div class="card-body">
              <span class>Patients Reduce HbA1C &lt; 7</span>

              <div class="row">
                  <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              </div>
              

              <router-link tag="a" class="text-link custom-text-link view-details" :to="{name: 'patients'}">View Details<i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>


          <div class="card mb-4">
            <div class="card-body">
              <span class>Patients Reduce Diastolic BP  ≥ 5 mm of Hg</span>

              <div class="row">
                  <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              <div id="chart" class="col-md-6">
                <apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
              </div>
              </div>
              

              <router-link tag="a" class="text-link custom-text-link view-details" :to="{name: 'patients'}">View Details<i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>


        </div>
      </div>
        </div>
    </div>
</template>

<script>
import HorizontalBar from '../utils/HorizontalBar.vue';
import CircularProgres from '../utils/CircularProgress';
export default {
  components: { HorizontalBar, CircularProgres },
  props: ['patientStat'],
    data() {
      return {
          series: [67],
          chartOptions: {
            chart: {
              height: 200,
              type: 'radialBar',
              offsetY: -10
            },
            colors: ["#01579B"],
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 135,
                track: {
                  background: '#e9ecef',
                  startAngle: -135,
                  endAngle: 135,
                },
                dataLabels: {
                  name: {
                    show: false,
                  },
                  value: {
                    fontSize: "30px",
                    show: true
                  }
                }
              }
            },
            fill: {
              type: "normal",
              gradient: {
                shade: "dark",
                type: "horizontal",
                gradientToColors: ["#01579B"],
                stops: [0, 100]
              }
            },
            stroke: {
              lineCap: "butt"
            },
            labels: ["Progress"]
          },
        }
    }
}
</script>

<style lang="scss">
  .male-progress {
    p {
      margin: 10px 0 0 0;
    }
    .male-bar {
      width: 100%;
      .progress-bar {
          background-color: #01579B;
          border-radius: 0 5px 5px 0;
      } 
    }
    .male-age-bar {
      position: relative;
      width: 50%;
      border-radius: 0 5px 5px 0;
      span {
        position: absolute;
        top: 17px;
        left: 10px;
        color: #fff;
      }
      .progress-bar {
        background-color: #01579B;
        border-radius: 0 5px 5px 0;
      } 
    }
    .female-age-bar {
      position: relative;
      width: 50%;
      display: flex;
      justify-content: flex-end;
      border-radius: 5px 0 0 5px;
      span {
        position: absolute;
        top: 17px;
        right: 10px;
      }
      .progress-bar {
          background-color: #F9A90C;
          border-radius: 5px 0 0 5px;
      } 
    }
    .age-progress {
      display: flex;
    }
  }
  .female-progress {
    .col-md-2 {
      padding: 0 0 0 15px;
    }
    p {
      margin: 10px 0 0 0;
    }
    .female-bar {
      width: 100%;
      .progress-bar {
          background-color: #F9A90C;
          border-radius: 0 5px 5px 0;
      } 
    }
    .male-age-bar {
      position: relative;
      width: 50%;
      border-radius: 0 5px 5px 0;
      span {
        position: absolute;
        top: 17px;
        left: 10px;
        color: #fff;
      }
      .progress-bar {
        background-color: #01579B;
        border-radius: 0 5px 5px 0;
      } 
    }
    .female-age-bar {
      position: relative;
      width: 50%;
      display: flex;
      justify-content: flex-end;
      border-radius: 5px 0 0 5px;
      span {
        position: absolute;
        top: 17px;
        right: 10px;
      }
      .progress-bar {
          background-color: #F9A90C;
          border-radius: 5px 0 0 5px;
      } 
    }
    .age-progress {
      display: flex;
    }
  }
  .view-details {
    float: right;
    margin: 20px 15px 0 0;
    text-decoration: none !important;
    i {
      margin-left: 5px;
      color: #000000;
    }
  }
    
</style>