<template>
  <div class="patient-summary pl-4 pr-4">
    <div class="row">
      <div class="col-md-6">
        <div class="card tab-card  card-blue-header">
          <div class="card-header ">
            Patient Information
            <div
              class="text-xs pt-2 float-right last-encounter"
              v-if="lastEncounter"
            >
              Last Encounter Date: {{ getDate(lastEncounter) }}
            </div>
          </div>
          <div class="table-responsive">
            <table
              v-if="patient"
              class="table table-patient table-borderless mt-2"
            >
              <tbody>
                <tr>
                  <td width="30%" class="font-weight-bold">Patient ID</td>
                  <td width="5%" class="text-center">:</td>
                  <td width="65%">{{ patient.body.pid }}</td>
                </tr>
                <tr>
                  <td width="30%" class="font-weight-bold">Name</td>
                  <td width="5%" class="text-center">:</td>
                  <td width="65%">
                    {{ patient.body.first_name + " " + patient.body.last_name }}
                  </td>
                </tr>
                <tr>
                  <td width="30%" class="font-weight-bold">Guardian Name</td>
                  <td width="5%" class="text-center">:</td>
                  <td width="65%">
                    {{ patient.body.father_name || patient.body.husband_name }}
                  </td>
                </tr>
                <tr>
                  <td width="30%" class="font-weight-bold">Date Of Birth</td>
                  <td width="5%" class="text-center">:</td>
                  <td width="65%">{{ patient.body.birth_date }}</td>
                </tr>
                <tr>
                  <td width="30%" class="font-weight-bold">Age</td>
                  <td width="5%" class="text-center">:</td>
                  <td width="65%">{{ patient.body.age }} years</td>
                </tr>
                <tr>
                  <td width="30%" class="font-weight-bold">Gender</td>
                  <td width="5%" class="text-center">:</td>
                  <td width="65%">{{ patient.body.gender }}</td>
                </tr>
                <tr>
                  <td width="30%" class="font-weight-bold">Village</td>
                  <td width="5%" class="text-center">:</td>
                  <td width="65%">
                    {{
                      patient.body.address ? patient.body.address.village : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <td width="30%" class="font-weight-bold">Union</td>
                  <td width="5%" class="text-center">:</td>
                  <td width="65%">
                    {{ patient.body.address ? patient.body.address.union : "" }}
                  </td>
                </tr>
                <tr>
                  <td width="30%" class="font-weight-bold">Upazila</td>
                  <td width="5%" class="text-center">:</td>
                  <td width="65%">
                    {{
                      patient.body.address ? patient.body.address.upazila : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <td width="30%" class="font-weight-bold">District</td>
                  <td width="5%" class="text-center">:</td>
                  <td width="65%">
                    {{
                      patient.body.address ? patient.body.address.district : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="">
                    <div
                      class="d-flex align-items-center patient-summary__action mt-3"
                    >
                      <a
                        href="javascript:void(0)"
                        class="btn btn-cust"
                        data-toggle="modal"
                        data-target="#modal-patient-details"
                        >See Details</a
                      >
                      <router-link
                        :to="{
                          name: 'encounters',
                          params: { patientId: patientId },
                        }"
                        tag="a"
                        class="btn btn-cust"
                        >See History</router-link
                      >
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card mb-3 tab-card card-blue-header">
          <div class="card-header">CVD</div>
          <div class="table-responsive mt-2">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td width="30%" class="font-weight-bold">
                    10 year CVD risk score
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="65%"
                    class="text-capitalize"
                    :class="this.cvdRisk.tfl || ''"
                  >
                    {{ this.cvdRisk.value || "N/A" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card tab-card card-red-header">
          <div class="card-header">Risk Factors</div>
          <div class="table-responsive mt-2">
            <table
              v-if="riskFactors && riskFactors.body && riskFactors.body.data"
              class="table table-borderless"
            >
              <tbody>
                <tr>
                  <td width="65%" class="font-weight-bold">Smoking status</td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="getColor(riskFactors.body.data.smoking, false)"
                  >
                    {{ riskFactors.body.data.smoking || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Smokeless tobacco
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(riskFactors.body.data.smokeless_tobacco, false)
                    "
                  >
                    {{ riskFactors.body.data.smokeless_tobacco || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Betel Nut
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(riskFactors.body.data.betel_nut, false)
                    "
                  >
                    {{ riskFactors.body.data.betel_nut || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Diet: Fruit & Vegetable Intake
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(riskFactors.body.data.fruits_vegetables_daily, true)
                    "
                  >
                    {{ riskFactors.body.data.fruits_vegetables_daily || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Diet: Additional salt:
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="getColor(riskFactors.body.data.extra_salt, false)"
                  >
                    {{ riskFactors.body.data.extra_salt || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Diet: Salty Foods Intake
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(riskFactors.body.data.salty_foods, false)
                    "
                  >
                    {{ riskFactors.body.data.salty_foods || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Diet: Sugar intake:
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(riskFactors.body.data.sugary_drinks, false)
                    "
                  >
                    {{ riskFactors.body.data.sugary_drinks || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Diet: Processed food:
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(riskFactors.body.data.processed_foods, false)
                    "
                  >
                    {{ riskFactors.body.data.processed_foods || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Diet: Red Meat Intake
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(riskFactors.body.data.red_meat, false)
                    "
                  >
                    {{ riskFactors.body.data.red_meat || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Physical activity high:
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(riskFactors.body.data.physical_activity_high, true)
                    "
                  >
                    {{ riskFactors.body.data.physical_activity_high || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Physical activity moderate:
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(
                        riskFactors.body.data.physical_activity_moderate,
                        true
                      )
                    "
                  >
                    {{
                      riskFactors.body.data.physical_activity_moderate || "N/A"
                    }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Alcohol consumption:
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="getColor(riskFactors.body.data.alcohol, false)"
                  >
                    {{ riskFactors.body.data.alcohol || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Family history of Stroke:
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(patientFamilyHistory.stroke, false)
                    "
                  >
                    {{ patientFamilyHistory.stroke || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Family history of Heart Attack:
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(patientFamilyHistory.heart_attack, false)
                    "
                  >
                    {{ patientFamilyHistory.heart_attack || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Family history of HTN:
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(patientFamilyHistory.high_blood_pressure, false)
                    "
                  >
                    {{ patientFamilyHistory.high_blood_pressure || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Family history of Diabetes:
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(patientFamilyHistory.diabetes, false)
                    "
                  >
                    {{ patientFamilyHistory.diabetes || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Family history of Asthma:
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(patientFamilyHistory.asthma, false)
                    "
                  >
                    {{ patientFamilyHistory.asthma || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">
                    Family history of Cancer:
                  </td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="30%"
                    class="text-capitalize"
                    :class="
                      getColor(patientFamilyHistory.cancer, false)
                    "
                  >
                    {{ patientFamilyHistory.cancer || "N/A" }}
                  </td>
                </tr>
                <tr>
                  <td width="65%" class="font-weight-bold">Last captured:</td>
                  <td width="5%" class="text-center">:</td>
                  <td width="30%">
                    {{
                      riskFactors.assessment
                        ? moment(riskFactors.assessment.meta.created_at).format(
                            "Do MMMM YYYY"
                          )
                        : ""
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="card tab-card card-blue-header">
          <div class="card-header ">Disease history</div>
          <div class="table-responsive mt-2">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td>Diabetes mellitus:</td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="65%"
                    class="text-capitalize"
                    :class="getColor(details.diabetes, false)"
                  >
                    {{ details.diabetes }}
                  </td>
                </tr>
                <tr>
                  <td width="30%">Hypertension:</td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="65%"
                    class="text-capitalize"
                    :class="getColor(details.hypertension, false)"
                  >
                    {{ details.hypertension }}
                  </td>
                </tr>
                <tr>
                  <td>Stroke:</td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="65%"
                    class="text-capitalize"
                    :class="getColor(details.stroke, false)"
                  >
                    {{ details.stroke }}
                  </td>
                </tr>
                <tr>
                  <td width="30%">Heart attack:</td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="65%"
                    class="text-capitalize"
                    :class="getColor(details.heart_attack, false)"
                  >
                    {{ details.heart_attack }}
                  </td>
                </tr>
                <tr>
                  <td width="30%">Asthma / COPD:</td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="65%"
                    class="text-capitalize"
                    :class="getColor(details.asthma, false)"
                  >
                    {{ details.asthma }}
                  </td>
                </tr>
                <tr>
                  <td width="30%">Cancer:</td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="65%"
                    class="text-capitalize"
                    :class="getColor(details.cancer, false)"
                  >
                    {{ details.cancer }}
                  </td>
                </tr>
                <tr>
                  <td width="30%">Chronic kidney disease:</td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="65%"
                    class="text-capitalize"
                    :class="getColor(details.kidney_disease, false)"
                  >
                    {{ details.kidney_disease }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card tab-card card-blue-header mb-3">
          <div class="card-header ">Diagnosed conditions</div>
          <div class="table-responsive mt-2">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td width="30%">Diabetes mellitus:</td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="65%"
                    class="text-capitalize"
                    :class="getColor(details.diabetes, false)"
                  >
                    {{ details.diabetes }}
                  </td>
                </tr>
                <tr>
                  <td width="30%">Hypertension:</td>
                  <td width="5%" class="text-center">:</td>
                  <td
                    width="65%"
                    class="text-capitalize"
                    :class="getColor(details.hypertension, false)"
                  >
                    {{ details.hypertension }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card tab-card mt-1 card-blue-header">
          <div class="card-header">Medication:</div>
          <div class="table-responsive" v-if="medications && medications.length > 0">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th class="border-top-0">Drug Name</th>
                  <th class="border-top-0">Dosage</th>
                  <th class="border-top-0">Unit</th>
                  <th class="border-top-0">Frequency</th>
                  <th class="border-top-0">Duration</th>
                  <th class="border-top-0">Dispensed</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in medications" :key="index"> 
                  <!-- <td>{{ item.body.title }}</td> -->
                  <td>{{ item.body.title }}</td>
                  <td>{{ item.body.dosage ? item.body.dosage : '--'}}</td>
                  <td>{{ item.body.unit ? item.body.unit : '--'}}</td>
                  <td>{{ item.body.activityDuration.repeat.frequency }} {{ item.body.activityDuration.repeat.periodUnit }}</td> 
                  <td>{{ item.body.activityDuration.review.period }} {{ item.body.activityDuration.review.periodUnit }}</td> 
                  <td>{{ item.body.dispense ? item.body.dispense : '0' }}</td>
                </tr>
              </tbody>
            </table>
            <div class="text-secondary text-center"  v-if="medications.length == 0">
              No Data found
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- body measurements 
     -->
    <div class="row mb-3">
      <div class="col-md-6">
        <div class="card tab-card mb-3 card-blue-header">
          <div class="card-header">Body measurements</div>
          <div class="table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col" class="mb-2">Measurement:</th>
                  <th scope="col" class="mb-2">Reading:</th>
                  <th scope="col" class="mb-2">Unit:</th>
                  <th scope="col" class="mb-2">Date:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Blood pressure:</td>
                  <td :class="getBpColor()">
                    {{
                      details.blood_pressure ? details.blood_pressure.value : ""
                    }}
                  </td>
                  <td>{{ details.blood_pressure ? "mmHg" : "" }}</td>
                  <td>
                    {{
                      details.blood_pressure ? details.blood_pressure.date : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Height:</td>
                  <td>{{ details.height ? details.height.value : "" }}</td>
                  <td>{{ details.height ? details.height.unit : "" }}</td>
                  <td>{{ details.height ? details.height.date : "" }}</td>
                </tr>

                <tr>
                  <td>Weight:</td>
                  <td>{{ details.weight ? details.weight.value : "" }}</td>
                  <td>{{ details.weight ? details.weight.unit : "" }}</td>
                  <td>{{ details.weight ? details.weight.date : "" }}</td>
                </tr>

                <tr>
                  <td>Waist:</td>
                  <td>{{ details.waist ? details.waist.value : "" }}</td>
                  <td>{{ details.waist ? details.waist.unit : "" }}</td>
                  <td>{{ details.waist ? details.waist.date : "" }}</td>
                </tr>

                <tr>
                  <td>Hip:</td>
                  <td>{{ details.hip ? details.hip.value : "" }}</td>
                  <td>{{ details.hip ? details.hip.unit : "" }}</td>
                  <td>{{ details.hip ? details.hip.date : "" }}</td>
                </tr>

                <tr>
                  <td>BMI:</td>
                  <!-- //TODO: Calculate BMI -->
                  <td>{{ getBmi() }}</td>
                  <td>kg/m2</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card tab-card mb-3 card-blue-header">
          <div class="card-header ">Investigations</div>
          <span class="sub-title">Blood Sugar</span>
          <div class="table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col" class="mb-2">Measurement:</th>
                  <th scope="col" class="mb-2">Reading:</th>
                  <th scope="col" class="mb-2">Unit:</th>
                  <th scope="col" class="mb-2">Date:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Random blood sugar:</td>
                  <td>
                    {{
                      details.random_blood_sugar
                        ? details.random_blood_sugar.value
                        : ""
                    }}
                  </td>
                  <td>
                    {{
                      details.random_blood_sugar
                        ? details.random_blood_sugar.unit
                        : ""
                    }}
                  </td>
                  <td>
                    {{
                      details.random_blood_sugar
                        ? details.random_blood_sugar.date
                        : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <td>Fasting blood sugar:</td>
                  <td>
                    {{
                      details.fasting_blood_sugar
                        ? details.fasting_blood_sugar.value
                        : ""
                    }}
                  </td>
                  <td>
                    {{
                      details.fasting_blood_sugar
                        ? details.fasting_blood_sugar.unit
                        : ""
                    }}
                  </td>
                  <td>
                    {{
                      details.fasting_blood_sugar
                        ? details.fasting_blood_sugar.date
                        : ""
                    }}
                  </td>
                </tr>

                <tr>
                  <td>2HABF:</td>
                  <td>{{ details.habf ? details.habf.value : "" }}</td>
                  <td>{{ details.habf ? details.habf.unit : "" }}</td>
                  <td>{{ details.habf ? details.habf.date : "" }}</td>
                </tr>
                <tr>
                  <td>HbA1c:</td>
                  <td>{{ details.a1c ? details.a1c.value : "" }}</td>
                  <td>{{ details.a1c ? details.a1c.unit : "" }}</td>
                  <td>{{ details.a1c ? details.a1c.date : "" }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <span class="sub-title">Urine</span>
          <div class="table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col" class="mb-2">Measurement:</th>
                  <th scope="col" class="mb-2">Reading:</th>
                  <th scope="col" class="mb-2">Unit:</th>
                  <th scope="col" class="mb-2">Date:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Urinary Ketone:</td>
                  <td>{{ details.ketones? details.ketones.value : "" }}</td>
                  <td>{{ details.ketones ? details.ketones.unit : "" }}</td>
                  <td>{{ details.ketones ? details.ketones.date : "" }}</td>
                </tr>
                <tr>
                  <td>Urinary protein:</td>
                 <td>{{ details.protein? details.protein.value : "" }}</td>
                  <td>{{ details.protein ? details.protein.unit : "" }}</td>
                  <td>{{ details.protein ? details.protein.date : "" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card mb-3 tab-card card-blue-header">
          <div class="card-header">Last Care plan generated</div>
          <div class="table-responsive" v-if="lastReports">
            <table class="table table-borderless mt-2">
              <tbody>
                <tr v-for="(report, index) in lastReports" :key="index">
                  <td width="30%">{{ report.meta.generated_by.name }}</td>
                  <td width="5%" class="text-center">:</td>
                  <td width="60%">
                    {{ moment(report.meta.created_at).format("DD-MM-YYYY") }}
                  </td>
                  <td width="5%">
                    <!-- <a href="javascript:void(0)">View</a> -->
                    <router-link
                      :to="{
                        name: 'carePlanSummary',
                        params: { carePlanId: report.id, patientId: patientId },
                      }"
                      >View</router-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              v-if="lastReports.length == 0"
              class="text-secondary text-center"
            >
              No data available
            </div>
          </div>
        </div>

        <div class="card tab-card card-blue-header">
          <div class="card-header">Blood test</div>
          <div class="table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col" class="mb-2">Measurement:</th>
                  <th scope="col" class="mb-2">Reading:</th>
                  <th scope="col" class="mb-2">Unit:</th>
                  <th scope="col" class="mb-2">Date:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Serum cholesterol:</td>
                  <td>{{ details.cholesterol ? details.cholesterol.value : "N/A" }}</td>
                  <td>{{ details.cholesterol ? details.cholesterol.unit : "" }}</td>
                  <td>{{ details.cholesterol ? details.cholesterol.date : "" }}</td>
                </tr>
                <tr>
                  <td>Triglycerides:</td>
                  <td>{{ details.triglycerides ? details.triglycerides.value : "N/A" }}</td>
                  <td>{{ details.triglycerides ? details.triglycerides.unit : "" }}</td>
                  <td>{{ details.triglycerides ? details.triglycerides.date : "" }}</td>
                </tr>
                <tr>
                  <td>HDL:</td>
                  <td>{{ details.hdl ? details.hdl.value : "N/A" }}</td>
                  <td>{{ details.hdl ? details.hdl.unit : "" }}</td>
                  <td>{{ details.hdl ? details.hdl.date : "" }}</td>
                </tr>
                <tr>
                  <td>LDL:</td>
                  <td>{{ details.ldl ? details.ldl.value : "N/A" }}</td>
                  <td>{{ details.ldl ? details.ldl.unit : "" }}</td>
                  <td>{{ details.ldl ? details.ldl.date : "" }}</td>
                </tr>
                <tr>
                  <td>Serum Creatinine:</td>
                  <td>
                    {{ details.creatinine ? details.creatinine.value : "N/A" }}
                  </td>
                  <td>
                    {{ details.creatinine ? details.creatinine.unit : "" }}
                  </td>
                  <td>
                    {{ details.creatinine ? details.creatinine.date : "" }}
                  </td>
                </tr>
                <tr>
                  <td>Serum Na+:</td>
                  <td>{{ details.sodium ? details.sodium.value : "N/A" }}</td>
                  <td>{{ details.sodium ? details.sodium.unit : "" }}</td>
                  <td>{{ details.sodium ? details.sodium.date : "" }}</td>
                </tr>
                <tr>
                  <td>Serum K+:</td>
                  <td>
                    {{ details.potassium ? details.potassium.value : "N/A" }}
                  </td>
                  <td>{{ details.potassium ? details.potassium.unit : "" }}</td>
                  <td>{{ details.potassium ? details.potassium.date : "" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-3 mb-5">
      <!-- <div
        v-if="patient && patient.meta.is_synced !== undefined && !patient.meta.is_synced"
        class="alert alert-danger"
        role="alert"
      >
        This patient's data is syncing, you can not generate care plan now.
      </div> -->
      <router-link
        :to="{ name: 'carePlanCreate', params: { patientId: patientId } }"
        class="btn btn-primary radious-0 mb-3 d-block btn-proceed"
        tag="button"
      >
        <span>Proceed To Care Plan </span>
      </router-link>

      <router-link
        :to="{
          name: 'addPatientInvestigations',
          params: { patientId: patientId },
        }"
        class="btn btn-xs btn-info px-2 py-1 radious-0"
      >
        Update
      </router-link>
    </div>

    <div class="row mb-3">
      <div class="col-md-12">
        <div class="card tab-card mb-3 card-blue-header">
          <div class="card-header mb-2">
            Complain / Note
          </div>
          <div class="table-responsive" v-if="patientNotes.length">
            <table class="table table-borderless">
              <tbody>
                <tr
                  class="td-border-bottom"
                  v-for="(note, index) in patientNotes"
                  :key="index"
                >
                  <td class="td-grey p-2">{{ note.body.notes }}</td>
                  <td class="td-grey p-2">{{ note.user.name }}</td>
                  <td class="td-grey p-2">
                    {{ moment(note.meta.created_at).format("DD MMM YYYY") }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-muted text-center" v-if="!isComplainAvailable">
            No complain / note found
          </div>
          <a
            href="javascript:void(0)"
            class="btn btn-primary add-note"
            data-toggle="modal"
            data-target="#modal-add-notes"
            ><i class="fa fa-plus"> Add</i></a
          >
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-12">
        <div class="card tab-card mb-3 card-blue-header">
          <div class="card-header mb-2">
            Investigations
          </div>
          <div class="table-responsive">
            <table
              class="table table-borderless"
              v-if="pendingInvestigations.length"
            >
              <thead>
                <tr class="td-border-bottom">
                  <th class="p-2">Investigation</th>
                  <th class="p-2">Created On</th>
                  <th class="p-2">Doctor</th>
                  <th class="p-2">Status</th>
                  <th class="p-2">Last Updated</th>
                  <th class="p-2">Updated By</th>
                  <th class="p-2">Mark as complete</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="td-border-bottom"
                  v-for="(item, index) in pendingInvestigations"
                  :key="index"
                >
                  <td class="td-grey p-2">{{ item.body.title }}</td>
                  <td class="td-grey p-2">{{ getFormatedDate(item.meta.created_at._seconds) }}</td>
                  <td class="td-grey p-2">{{ getCollectedUser(item.meta.collected_by) }}</td>
                  <td class="td-grey p-2">
                    {{ item.meta.status }}
                  </td>
                  <td class="td-grey p-2">{{ item.meta ? (item.meta.updated_at ? getFormatedDate(item.meta.updated_at._seconds) : 'N/A') : 'N/A' }}</td>
                  <td class="td-grey p-2">{{ item.meta ? (item.meta.updated_by ? getCollectedUser(item.meta.updated_by) : 'N/A') : 'N/A' }}</td>
                  <td class="td-grey p-2">
                    <div
                      v-if="item.meta.status == 'pending'"
                      class="custom-control custom-checkbox custom-control-inline ml-5"
                    >
                      <input
                        type="checkbox"
                        name="follow_up"
                        value="complete"
                        class="custom-control-input"
                        :id="'ir-' + index"
                        v-model="pendingInvestigations[index].meta.statusBool"
                      />
                      <label
                        class="custom-control-label"
                        :for="'ir-' + index"
                      ></label>
                    </div>
                    <div v-else>
                      Completed
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-else class="px-2 text-secondary text-center">
              No investigation data available
            </p>
          </div>
          <a
            href="javascript:void(0)"
            @click="updateInvestigation"
            class="btn btn-primary add-note"
            v-if="pendingInvestigations.length"
            >Save</a
          >
        </div>
      </div>
    </div>

    <!-- add Complains/ Notes -->
    <div
      class="modal fade"
      id="modal-add-notes"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-add-notes"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal-blue-header p-0 radious-0">
          <div class="modal-header py-2 px-3">
            <h5 class="modal-title text-white">Add Complain / Note</h5>
            <button
              type="button"
              ref="elCloseNoteModal"
              class="close text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="addNote">
            <div class="modal-body p-3">
              <div class="form-row">
                <div class="col-md-12 mb-3">
                  <label for="validationCustom01">Enter Complain / Note</label>
                  <textarea
                    class="form-control"
                    required
                    v-model="note"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer p-3">
              <button type="submit" class="btn btn-primary radious-0">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Patient details -->
    <div
      class="modal fade"
      id="modal-patient-details"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-patient-details"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal-blue-header p-0 radious-0">
          <div class="modal-header py-2 px-3">
            <h5 class="modal-title text-white">Patient Details</h5>
            <button
              type="button"
              ref="elCloseInvestigation"
              class="close text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-3">
            <div class="table-responsive">
              <table
                v-if="patient"
                class="table table-patient table-borderless mt-2"
              >
                <tbody>
                  <tr>
                    <td width="30%" class="font-weight-bold">Patient ID</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">{{ patient.body.pid }}</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Name</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">
                      {{
                        patient.body.first_name + " " + patient.body.last_name
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Guardian Name</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">
                      {{
                        patient.body.father_name || patient.body.husband_name
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Date Of Birth</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">{{ patient.body.birth_date }}</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Age</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">{{ patient.body.age }} years</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Gender</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">{{ patient.body.gender }}</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Village</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">
                      {{
                        patient.body.address ? patient.body.address.village : ""
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Union</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">
                      {{
                        patient.body.address ? patient.body.address.union : ""
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Upazila</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">
                      {{
                        patient.body.address ? patient.body.address.upazila : ""
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">District</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">
                      {{
                        patient.body.address
                          ? patient.body.address.district
                          : ""
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Patient NID</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">
                      {{ patient.body.nid ? patient.body.nid : "" }}
                    </td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">
                      Centre Assigned
                    </td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">
                      {{ patient.body.center ? patient.body.center.name : "" }}
                    </td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Religion</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">{{ patientAdditionalInfo.religion }}</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Education</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">{{ patientAdditionalInfo.education }}</td>
                  </tr>
                  <tr>
                    <td width="30%" class="font-weight-bold">Occupation</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">{{ patientAdditionalInfo.occupation }}</td>
                  </tr>
                  <!-- <tr>
                      <td  width="30%" class="font-weight-bold">Ethnicity</td>
                      <td width="5%" class="text-center">:</td>
                      <td width="65%">{{ patientAdditionalInfo.ethnicity }}</td>
                    </tr> -->
                  <tr>
                    <td width="30%" class="font-weight-bold">Monthly Income</td>
                    <td width="5%" class="text-center">:</td>
                    <td width="65%">
                      {{ patientAdditionalInfo.monthly_income }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- <div class="modal-footer p-3">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";
import VueJsonPretty from "vue-json-pretty";

export default {
  name: "patients",
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      patientId: "",
      cvdRisk: {},
      patient_history: {},
      fullPage: true,
      patient: null,
      patientId: "",
      carePlans: "",
      showIcon: true,
      groupedCareplans: [],
      encounters: [],
      history: [],
      users: [],
      report: null,
      data: [],
      observations: [],
      bpChart: {},
      heartChart: {},
      bmiChart: {},
      bloodPressures: [],
      avgDiastolic: 0,
      avgSystolic: 0,
      avgPulse: 0,
      avgBMI: 0,
      totalBMI: 0,
      currentEncounter: null,
      previousEncounter: null,
      reports: null,
      currentAssessment: null,
      dataLoaded: false,
      medicalHistory: [],
      followups: null,
      bpConditions: [],
      lastEncounter: null,
      details: {},
      note: null,
      patientNotes: [],
      generatedCareplan: null,
      pendingInvestigations: [],
      lastReports: [],
      riskFactors: null,
      isComplainAvailable: true,
      patientAdditionalInfo: {
        monthly_income: "",
        religion: "",
        education: "",
        occupation: "",
        ethnicity: "",
      },
      patientFamilyHistory: {},
      medications: []
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    getGeneratedCareplans() {
      this.$http.get("/generated-care-plans/patient-mongo/" + this.patientId).then(
        (response) => {
          if (response.status == 200) {
            if (response.data.data) {
              this.lastReports = response.data.data.slice(0, 3);
            }
          }
        },
        (error) => {}
      );
    },

    getBmi() {
      if (this.details.height && this.details.weight) {
        if (this.details.height.value && this.details.weight.value) {
          return (
            this.details.weight.value /
            (this.details.height.value / 100) ** 2
          ).toFixed(2);
        }
      }
      return "";
    },

    getColor(value, condition) {
      if (!value || value == "N/A") {
        return "";
      }
      if (condition) {
        return value == "yes" ? "txt-success" : "txt-red";
      }
      return value == "no" ? "txt-success" : "txt-red";
    },

    getBpColor() {
      let color = "";

      if (this.details.blood_pressure) {
        let data = this.details.blood_pressure.value.split("/");
        let sbp = data[0];
        let dbp = data[1];

        this.bpConditions.forEach((condition) => {
          if (condition.sbp) {
            if (sbp >= condition.sbp.from && sbp <= condition.sbp.to) {
              color = condition.sbp.color;
            }
          }
        });
      }

      return color;
    },

    getMedicationsByPatient() {
      let loader = this.$loading.show();
      this.$http.get("/patients/" + this.patientId + "/medications-mongo").then(
        (response) => {
          loader.hide();
          if (response.status == 201) {
            if (response.data.data) {
              this.medications = response.data.data;
            }
            
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },

    prepareBpConditions() {
      this.bpConditions = [
        {
          sbp: {
            from: 60,
            to: 89,
            color: "AMBER",
          },
        },
        {
          sbp: {
            from: 90,
            to: 120,
            color: "GREEN",
          },
          dbp: {
            from: 60,
            to: 80,
            color: "GREEN",
          },
        },
        {
          sbp: {
            from: 121,
            to: 140,
            color: "AMBER",
          },
          dbp: {
            from: 81,
            to: 90,
            color: "AMBER",
          },
        },
      ];
    },

    getDate(history) {
      let date = "";
      if (history.created_at) {
        date = moment
          .unix(history.created_at._seconds)
          .format("Do MMMM YYYY hh:mm:ss a");
      }
      return date;
    },
    getFormatedDate(data) {
      let date = moment.unix(data).format("DD MMM YYYY h:mm:ss a");

      return date;
    },
    getCollectedUser(userId) {
      let user = this.users.find((user) => user.uid == userId);
      if (user) {
        return user.name;
      }
    },

    onTabClick() {
      if (this.$route.query.encounter || this.$route.query.assessment) {
        this.$router.replace({});
      }
    },
    goToEncounterDetails(encounter) {
      this.currentEncounter = encounter;

      this.previousEncounter = this.encounters[
        this.encounters.indexOf(encounter)
      ];
      // console.log('this.previousEncounter');
      // console.log(this.previousEncounter);
      // console.log(encounter.id)
      // console.log(this.currentEncounter.id)
      // console.log(document.getElementById("three-tab"))
      document.getElementById("three-tab").click();
      // console.log(encounter);
    },
    goToAssessmentDetails(report) {
      this.currentAssessment = report;

      // console.log(this.currentAssessment)
      // console.log(document.getElementById("five-tab"))
      document.getElementById("five-tab").click();
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    showFHIR(id) {
      let loader = this.$loading.show();
      this.$http.get("/care-plans/fhir/" + this.patientId).then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            this.data = response.data.data;

            this.$bvModal.show("fhir-modal");
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },
    getLastEncounterDate() {
      let dates = this.encounters.map((encounter) =>
        moment(encounter.meta.created_at)
      );
      return moment.max(dates).format("MMMM DD, YYYY");
    },
    isObservationAvailable(encounter, observation) {
      if (encounter) {
        let obs = encounter.body.observations.find((item) => {
          if (item && item.body.type == observation) {
            return item;
          }
        });
      }

      return obs;
    },
    getDate(encounter) {
      let date = "";
      console.log('encounter', encounter);
      if (typeof encounter.meta != 'undefined') {
        date = moment(encounter.meta.created_at).format("Do MMMM YYYY");
      }
      return date;
    },
    onClickAccordion(followup, index) {
      this.showIcon = !this.showIcon;
    },
    getUser(encounter) {
      let user = {};
      if (encounter.meta.collected_by) {
        user = this.users.find(
          (user) => user.uid == encounter.meta.collected_by
        );
      }
      return user.name || "";
    },

    getLastReport() {
      let loader = this.$loading.show();
      this.$http
        .get("/health-reports/patient/" + this.patientId + "/last-mongo")
        .then(
          (response) => {
            loader.hide();
            if (response.status == 200) {
              if (response.data.data) {
                this.report = response.data.data;
                if (
                  this.report.body &&
                  this.report.body.result.assessments &&
                  this.report.body.result.assessments.cvd
                ) {
                  this.cvdRisk = this.report.body.result.assessments.cvd;
                }
              }
            }
          },
          (error) => {
            loader.hide();
          }
        );
    },

    getReports() {
      let loader = this.$loading.show();
      this.$http.get("/health-reports/patient/" + this.patientId).then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            // console.log(response, 'resp');
            this.reports = response.data.data;

            if (this.reports && this.reports.length > 0) {
              this.currentAssessment = this.reports[this.reports.length - 1];
            }
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },

    getUsers() {
      this.$http.get("/users").then(
        (response) => {
          if (response.status == 200) {
            this.users = response.data;
          }
        },
        (error) => {}
      );
    },

    getCount() {
      let goals = this.groupedCareplans.length;
      let actions = 0;
      this.groupedCareplans.forEach((careplan) => {
        careplan.items.forEach((item) => {
          if (item.meta.status == "pending") {
            actions += 1;
          }
        });
      });

      return goals + " goals & " + actions + " actions";
    },
    getPatients() {
      let loader = this.$loading.show();
      this.$http.get("/patients/mongo/" + this.patientId).then(
        (response) => {
          loader.hide();
          if (response.status == 200) {
            this.patient = response.data.data;
            console.log('pat', this.patient);
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },

    getLastEncounter() {
      this.$http.get("/assessments/patients/" + this.patientId + "/last-mongo").then(
        (response) => {
          if (response.status == 200) {
            this.lastEncounter = response.data.data;
          }
        },
        (error) => {}
      );
    },

    getEncounters() {
      this.$http.get("/patients/" + this.patientId + "/assessments").then(
        (response) => {
          if (response.status == 200) {
            this.encounters = response.data.data;

            if (this.encounters) {
              this.encounters = this.encounters.sort(
                (a, b) =>
                  new Date(b.meta.created_at) - new Date(a.meta.created_at)
              );

              this.getObservations();
            }
          }
        },
        (error) => {}
      );
    },

    sortObservations(observations) {
      return observations.sort((a, b) => {
        return new Date(a.meta.created_at) - new Date(b.meta.created_at)
      })
    },

    getObservations() {
      let loader = this.$loading.show();
      let encounters = this.encounters;
      this.$http.get("/patients/" + this.patientId + "/observations-mongo").then(
        (response) => {
          loader.hide();

          if (response.status == 200) {
            this.observations = this.sortObservations(response.data.data);
              console.log('body_measurement',response.data );
            
            if (this.observations) {
              this.observations.forEach((obs) => {
                let observation = obs.body;
                if (observation.type == "survey") {
                  if (observation.data.name == "medical_history") {
                    this.details.diabetes = observation.data.diabetes || this.details.diabetes || "N/A";
                    this.details.hypertension =
                      observation.data.hypertension || this.details.hypertension || "N/A";
                    this.details.stroke = observation.data.stroke || this.details.stroke || "N/A";
                    this.details.asthma = observation.data.asthma || this.details.asthma || "N/A";
                    this.details.heart_attack =
                      observation.data.heart_attack || this.details.heart_attack || "N/A";
                    this.details.cancer = observation.data.cancer || this.details.cancer || "N/A";
                    this.details.kidney_disease =
                      observation.data.kidney_disease || this.details.kidney_disease || "N/A";
                  } else if (observation.data.name == "risk_factors") {
                    this.details.smoking = observation.data.smoking || "N/A";
                    this.details.smokeles_tobacco =
                      observation.data.smokeles_tobacco || "N/A";
                    this.details.extra_salt =
                      observation.data.extra_salt || "N/A";
                    this.details.sugar =
                      observation.data.sugary_drinks || "N/A";
                    this.details.processed_foods =
                      observation.data.processed_foods || "N/A";
                    this.details.physical_activity_moderate =
                      observation.data.physical_activity_moderate || "N/A";
                    this.details.alcohol = observation.data.alcohol || "N/A";
                  } else if (observation.data.name == "medication") {
                    this.details.hypertension_medication =
                      observation.data.hypertension_medication;
                    this.details.hypertension_medication_regular =
                      observation.data.hypertension_medication_regular || "N/A";
                  } else if (observation.data.name == "relative_problems") {
                    this.patientFamilyHistory.stroke = observation.data.stroke;
                    this.patientFamilyHistory.heart_attack = observation.data.heart_attack;
                    this.patientFamilyHistory.high_blood_pressure = observation.data.high_blood_pressure;
                    this.patientFamilyHistory.diabetes = observation.data.diabetes;
                    this.patientFamilyHistory.asthma = observation.data.asthma;
                    this.patientFamilyHistory.cancer = observation.data.cancer;
                    if (observation.data.monthly_income) {
                      this.patientAdditionalInfo.monthly_income =
                        observation.data.monthly_income;
                    }
                    if (observation.data.religion) {
                      this.patientAdditionalInfo.religion =
                        observation.data.religion;
                    }
                    if (observation.data.education) {
                      this.patientAdditionalInfo.education =
                        observation.data.education;
                    }
                    if (observation.data.occupation) {
                      this.patientAdditionalInfo.occupation =
                        observation.data.occupation;
                    }
                    if (observation.data.ethnicity) {
                      this.patientAdditionalInfo.ethnicity =
                        observation.data.ethnicity;
                    }
                  }
                } else if (observation.type == "blood_pressure") {
                  this.details.blood_pressure = {
                    value:
                      observation.data.systolic +
                      "/" +
                      observation.data.diastolic,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                  };
                } else if (observation.type == "blood_test") {
                  if (observation.data.name == "blood_sugar" && observation.data.type != 'fasting') {
                    this.details.random_blood_sugar = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if ((observation.data.name == "blood_sugar" || observation.data.name == "blood_glucose") && observation.data.type == 'fasting') {
                    this.details.fasting_blood_sugar = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "2habf") {
                    this.details.habf = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "a1c") {
                    this.details.a1c = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "total_cholesterol") {
                    this.details.cholesterol = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "triglycerides") {
                    this.details.triglycerides = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "hdl") {
                    this.details.hdl = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "ldl") {
                    this.details.ldl = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "hdl") {
                    this.details.hdl = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "sodium") {
                    this.details.sodium = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "potassium") {
                    this.details.potassium = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "ketones") {
                    this.details.ketones = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "protein") {
                    this.details.protein = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "creatinine") {
                    this.details.creatinine = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  }
                } else if (observation.type == "body_measurement") {
                  if (observation.data.name == "height") {
                    this.details.height = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "weight") {
                    this.details.weight = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "waist") {
                    this.details.waist = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  } else if (observation.data.name == "hip") {
                    this.details.hip = {
                      value: observation.data.value,
                      unit: observation.data.unit,
                      date: (moment(obs.meta.created_at).format('YYYY-MM-DD HH:mm:ss'))
                    };
                  }
                }
              });
            }



            this.$forceUpdate();
          }
        },
        (error) => {}
      );
    },

    getObservationsForPatientDetails() {
      let loader = this.$loading.show();
      let encounters = this.encounters;
      this.$http
        .get("/patients/" + this.patientId + "/observations/patient-details")
        .then(
          (response) => {
            loader.hide();
            if (response.status == 200) {
              this.observations = response.data.data;
              // console.log('observations');
              // console.log(this.observations[0]);
              // if (encounters && this.observations) {
            }

            if (this.encounters.length > 0) {
              this.currentEncounter = this.encounters[0];
              if (this.encounters.length > 1) {
                this.previousEncounter = this.encounters[1];
              } else {
                this.previousEncounter = this.currentEncounter;
              }

              // console.log(this.$route);
              if (this.$route.query.encounter) {
                // this.currentEncounter = this.encounters[0];
                let matchedEncounter = this.encounters.find(
                  (item) => item.id == this.$route.query.encounter
                );
                if (matchedEncounter) {
                  this.currentEncounter = matchedEncounter;
                  this.previousEncounter = this.encounters[
                    this.encounters.indexOf(matchedEncounter) - 1
                  ];
                  // console.log(this.previousEncounter)
                  // if () {

                  // }
                  document.getElementById("three-tab").click();
                }
              }
            }
          },
          (error) => {}
        );
    },

    getMedications() {
      let ob = this.observations.find((o) => {
        if (o) {
          return (
            o.body.type === "survey" &&
            o.body.data.name === "current_medication"
          );
        }
      });

      if (ob) {
        return ob.body.data.medications.join(", ");
      }
    },

    getAllergies() {
      let ob = this.observations.find((o) => {
        if (o) {
          return (
            o.body.type === "survey" &&
            o.body.data.name === "medical_history" &&
            o.body.data.allergies === "yes"
          );
        }
      });

      if (ob) {
        return ob.body.data.allergy_types.join(", ");
      }
    },

    prepareCarePlans() {
      this.carePlans.forEach((item) => {
        if (item) {
          let existdCp = this.groupedCareplans.find(
            (cp) => cp.id == item.body.goal.id
          );
          if (!existdCp) {
            let items = [];
            items.push(item);
            this.groupedCareplans.push({
              items: items,
              title: item.body.goal.title,
              id: item.body.goal.id,
            });
          } else {
            this.groupedCareplans[
              this.groupedCareplans.indexOf(existdCp)
            ].items.push(item);
          }
        }
      });
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
    getHistory() {
      this.$http.get("/patients/" + this.patientId + "/history").then(
        (response) => {
          if (response.status == 200) {
            this.history = response.data.data.patient_history;
          }
        },
        (error) => {}
      );
    },
    getFollowups() {
      this.$http.get("/patients/" + this.patientId + "/followups").then(
        (response) => {
          if (response.status == 200) {
            this.followups = response.data.data.length
              ? response.data.data[response.data.data.length - 1]
              : null;
          }
        },
        (error) => {}
      );
    },
    prepareSurveyData(observations) {
      let medicalHistory = [];
      if (observations) {
        observations.forEach((obs) => {
          if (
            obs &&
            obs.body.patient_id == this.patientId &&
            obs.body.type == "survey"
          ) {
            if (obs.body.data) {
              Object.keys(obs.body.data).forEach((key) => {
                if (obs.body.data[key] == "yes") {
                  if (!medicalHistory.includes(key.replace(/_/g, " "))) {
                    medicalHistory.push(key.replace(/_/g, " "));
                  }
                }
              });
            }
          }
        });
      }
      return medicalHistory;
    },
    addNote() {
      let loader = this.$loading.show();
      this.$refs.elCloseNoteModal.click();

      let data = {
        meta: {
          created_by: this.user.uid,
          created_at: moment(),
        },
        body: {
          patient_id: this.patientId,
          notes: this.note,
        },
      };

      this.$http.post("/patients/" + this.patientId + "/notes", data).then(
        (response) => {
          loader.hide();
          if (response.status != 201) {
            this.note = "";
            alert("Could not save complain / note");
          } else {
            this.getNote();
          }
        },
        (error) => {
          loader.hide();
        }
      );
    },
    getNote() {
      this.$http.get("/patients/" + this.patientId + "/notes").then(
        (response) => {
          if (
            response.data &&
            response.data.error == false &&
            response.data.data
          ) {
            this.patientNotes = response.data.data;
            return;
          }
          this.isComplainAvailable = false;
        },
        (error) => {
          loader.hide();
          console.log(error);
        }
      );
    },
    getCarePlanReport() {
      this.$http.get("/care-plans/patient/" + this.patientId + "/all-mongo").then(
        (response) => {
          this.pendingInvestigations = [];
          if (response.status == 200) {
            if (response.data.data) {
              console.log(response.data.data, 'res data')
              response.data.data.filter((item) => {
                if (
                  item.body.category == "investigation" &&
                  item.meta.status == "pending"
                ) {
                  item.meta.statusBool = false;

                  this.pendingInvestigations.push(item);
                }
                else if (item.body.category == "investigation" && item.meta.status == "completed") {
                  item.meta.statusBool = true;
                  this.pendingInvestigations.push(item);
                }
              });
              console.log(this.pendingInvestigations, 'inv')
            }
          }
        },
        (error) => {}
      );
    },

    getLastRiskFactors() {
      this.$http
        .get("/observations/patient/" + this.patientId + "/last-risk-factors-mongo")
        .then(
          (response) => {
            this.pendingInvestigations = [];
            if (response.status == 200) {
              if (response.data.data) {
                this.riskFactors = response.data.data;
                console.log('this.riskFactors', this.riskFactors);
              }
            }
          },
          (error) => {}
        );
    },
    updateInvestigation() {
      if (this.pendingInvestigations.length) {
        let loader = this.$loading.show();
        let completedItems = [];
        completedItems = this.pendingInvestigations.filter(
          (item) => item.meta.statusBool == true
        );
        if (completedItems && completedItems.length > 0) {
          let data = {
            status: "completed",
            // "comment": '',
            completed_at: moment()
          };
          completedItems.forEach((item) => {
            this.$http.put("/care-plans/" + item.id, data).then(
              (response) => {
                if (response.status == 200) {
                  this.getCarePlanReport();
                  loader.hide();
                }
              },
              (error) => {
                loader.hide();
              }
            );
          });
        } else {
          loader.hide();
        }
      }
    },
    async initialData() {
      this.patientId = this.$route.params.patientId;
      await this.getPatients();
      await this.getLastRiskFactors();
      await this.getObservations();
      await this.prepareBpConditions();
      // this.getCarePlans();
      await this.getLastEncounter();
      await this.getNote();
      await this.getCarePlanReport();
      await this.getGeneratedCareplans();
      await this.getLastReport();
      await this.getMedicationsByPatient();
      await this.getUsers();
    }
  },
  created() {},

  mounted() {
    this.scrollToTop();
    this.initialData();
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style lang="scss">
.patient-overview {
  .patient-history {
    .timeline-wrapper {
      margin-left: 25px;
      .timeline-border {
        position: absolute;
        border-left: 1.5px solid #01579b;
        height: 115px;
        left: -20px;
        top: 40px;
      }
      .icon-wrapper {
        top: 30px;
        left: -30px;
      }
      .timeline-data {
        .title {
          margin-bottom: 0;
        }
      }
    }
  }
}
.patient-summary {
  .card {
    //   border-color: red;
    border: 1px solid #c4c4c4;
    border-radius: 0;
    th {
      font-size: 18px;
    }

    .card-header {
      border-radius: 0;
      // height: 35px;
      font-size: 20px;
      padding: 5px 15px;
      color: #fff;
      &.patient-info {
        background-color: #489cfc;
      }
    }
  }
  .sub-title {
    font-size: 16px;
    background-color: #d2e1ff;
    padding: 7px 15px;
    width: fit-content;
    margin: 10px 0 0 10px;
  }
  .custom-title {
    font-size: 20px;
    padding: 0.75rem;
    margin-bottom: 0;
  }
  .txt-red {
    color: #f72b34;
  }
  .txt-success {
    color: #00b0a6;
  }
  table {
    td {
      padding: 0.2rem 0.75rem;
    }
  }
  .add-note {
    border-radius: 0 !important;
    text-align: right;
    margin: 0 10px 10px auto;
    padding: 5px 15px;
  }
  .td-grey {
    background: #e6e6e6;
  }
  .td-border-bottom {
    border: 4px solid white;
  }
  .card-red-header {
    border-color: #ff5959 !important;
    .card-header {
      background-color: #ff5959 !important;
      color: #fff;
      &:first-child {
        border-radius: 0;
      }
    }
  }

  .card-blue-header {
    border-color: #489cfc !important;
    .card-header {
      background-color: #489cfc !important;
      color: #fff;
      &:first-child {
        border-radius: 0;
      }
    }
  }
  .btn-cust {
    border-radius: 0;
    padding: 5px 15px;
    background-color: #d2e1ff;
    border: 1px solid #648dc3;
    color: #01579b;
  }
  .patient-summary__action a:first-of-type {
    margin-right: 20px;
  }
  .patient-summary__action a {
    display: block;
    width: 100%;
  }
  .table-patient {
    height: 429px;
  }
  .btn-proceed {
    max-width: 200px;
    margin: 0 auto;
  }
  .btn-proceed:disabled {
    cursor: not-allowed;
  }
}
</style>
