import Login from '../components/login/Login'
import ForgotPassword from '../components/login/Forgot-password'
import Dashboard from '../components/Dashboard'
import HealthList from '../components/health-records/List'
import HealthDetail from '../components/health-records/Show'
import Assessments from '../components/health-records/assessments/Show'
import Patients from '../components/patients/List'
import PatientsOverview from '../components/patients/Overview'
import PatientCarePlans from '../components/patients/CarePlans'
import PatientCreate from '../components/patients/Create'
import PatientEdit from '../components/patients/Edit'
import PatientRegistration from '../components/patients/NewRegistration'
import PatientCreatedComplete from "../components/patients/PatientCreatedComplete";
import PastAssessments from "../components/past-assessments/PastAssessments";
import PastAssessmentList from "../components/past-assessments/PastAssessmentList";

import PendingReviews from '../components/pending-reviews/List'
import PendingReviewDetail from '../components/pending-reviews/Show'
import PendingReviewGenerate from '../components/pending-reviews/Generate'
import PendingReviewBloodPressure from '../components/pending-reviews/BloodPressure'

import Tobacco from '../components/questionnaire/Tobacco'
import Alcohol from '../components/questionnaire/Alcohol'
import Diet from '../components/questionnaire/Diet'
import Physical from '../components/questionnaire/Physical-activity'
import Medication from '../components/questionnaire/Medication'
import Medical from '../components/questionnaire/Medical'

import Encounters from '../components/encounters/List'
import PastEncounters from "../components/encounters/PastEncounters";
import EncounterCreate from '../components/encounters/Create'
import BloodPressure from "../components/encounters/BloodPressure";
import BodyMeasurement from "../components/encounters/BodyMeasurement";
import BloodTests from "../components/encounters/BloodTests";
import Questionnaire from "../components/encounters/Questionnaire";
import EncounterTobacco from "../components/encounters/encounter-questionnaires/Tobacco"
import EncounterAlcohol from "../components/encounters/encounter-questionnaires/Alcohol"
import EncounterDiet from "../components/encounters/encounter-questionnaires/Diet"
import EncounterMedical from "../components/encounters/encounter-questionnaires/Medical"
import EncounterMedication from "../components/encounters/encounter-questionnaires/Medication"

import CarePlan from "../components/care-plan/CarePlan";
import CarePlanAction from "../components/care-plan/CarePlanAction";

import Allergy from '../components/allergy/List'
import AllergyCreate from '../components/allergy/Create'

import FamilyMembers from '../components/family-members/List'
import FamilyMemberCreate from '../components/family-members/Create'

import Specimen from '../components/specimen/List'
import SpecimenCreate from '../components/specimen/Create'

import Observations from '../components/observations/List'
import ObservationCreate from '../components/observations/Create'

import Conditions from '../components/conditions/List'
import ConditionCreate from '../components/conditions/Create'

import Diagnostics from '../components/diagnostics/List'
import DiagnosticCreate from '../components/diagnostics/Create'

import HealthEncounters from '../components/health-records/encounters/List'

import NewHealthAssessment from "../components/health-assessment/NewHealthAssessment";
import CreatedHealthAssessment from "../components/health-assessment/CreatedHealthAssessment";
import PastHealthAssessment from "../components/health-assessment/PastHealthAssessment";
import HealthAssessment from "../components/health-assessment/HealthAssessment";


import store from "../store/store";
import VueRouter from "vue-router";
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/forgot-password',
    name: 'forgot-pass',
    component: ForgotPassword
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/health-records/list',
    name: 'healthList',
    component: HealthList,
  },
  {
    path: '/health-records/view/:participantId',
    name: 'healthDetail',
    component: HealthDetail,
  },
  {
    path: '/health-records/patients/:participantId/encounters/:encounterId/assessments',
    name: 'assessments',
    component: Assessments,
  },
  {
    path: '/health-records/patients/:participantId/encounters',
    name: 'healthEncounters',
    component: HealthEncounters,
  },
  {
    path: '/patients/list',
    name: 'patients',
    component: Patients,
  },
  {
    path: '/patients/:patientId/overview',
    name: 'patientOverview',
    component: PatientsOverview
  },
  {
    path: '/patients/:patientId/care-plans',
    name: 'patientCarePlans',
    component: PatientCarePlans
  },
  {
    path: '/patients/create',
    name: 'patientCreate',
    component: PatientCreate,
  },
  {
    path: '/patients/new-registration',
    name: 'patientRegistration',
    component: PatientRegistration
  },
  {
    path: '/patients/complete-registration',
    name: 'patientCreatedComplete',
    component: PatientCreatedComplete
  },

  {
    path: '/patients/:patientId',
    name: 'patientEdit',
    component: PatientEdit,
  },
  {
    path: '/patients/:patientId/past-assessments',
    name:'pastAssessmentList',
    component: PastAssessmentList
  },
  {
    path: '/patients/:assessmentId/past-assessment-details',
    name:'pastAssessment',
    component: PastAssessments
  },

  {
    path: '/patients/:patientId/encounters',
    name: 'encounters',
    component: Encounters,
  },
  {
    path: '/patients/:patientId/past-encounter',
    name: 'pastEncounter',
    component: PastEncounters,
  },
  {
    path: '/patients/:patientId/encounters/create',
    name: 'encounterCreate',
    component: EncounterCreate,
  },
  {
    path: '/patients/:patientId/encounters/blood-pressure',
    name: 'bloodPressure',
    component: BloodPressure,
  },
  {
    path: '/patients/:patientId/encounters/body-measurement',
    name: 'bodyMeasurement',
    component: BodyMeasurement,
  },
  {
    path: '/patients/:patientId/encounters/blood-tests',
    name: 'bloodTests',
    component: BloodTests,
  },
  {
    path: '/patients/:patientId/encounters/questionnaire',
    name: 'questionnaire',
    component: Questionnaire,
  },
  {
    path: '/patients/:patientId/encounters/questionnaire/tobacco',
    name: 'encounterTobacco',
    component: EncounterTobacco,
  },
  {
    path: '/patients/:patientId/encounters/questionnaire/alcohol',
    name: 'encounterAlcohol',
    component: EncounterAlcohol,
  },
  {
    path: '/patients/:patientId/encounters/questionnaire/diet',
    name: 'encounterDiet',
    component: EncounterDiet,
  },
  {
    path: '/patients/:patientId/encounters/questionnaire/medical',
    name: 'encounterMedical',
    component: EncounterMedical,
  },
  {
    path: '/patients/:patientId/encounters/questionnaire/medication',
    name: 'encounterMedication',
    component: EncounterMedication,
  },
  {
    path: '/patients/:patientId/allergy',
    name: 'allergy',
    component: Allergy,
  },
  {
    path: '/patients/:patientId/allergy/create',
    name: 'allergyCreate',
    component: AllergyCreate,
  },
  {
    path: '/patients/:patientId/family-members',
    name: 'familyMembers',
    component: FamilyMembers,
  },
  {
    path: '/patients/:patientId/family-members/create',
    name: 'familyMemberCreate',
    component: FamilyMemberCreate,
  },
  {
    path: '/patients/:patientId/specimen',
    name: 'specimen',
    component: Specimen,
  },
  {
    path: '/patients/:patientId/specimen/create',
    name: 'specimenCreate',
    component: SpecimenCreate,
  },

  {
    path: '/patients/:patientId/encounters/:encounterId/observations',
    name: 'observations',
    component: Observations,
  },
  {
    path: '/patients/:patientId/encounters/:encounterId/observations/create',
    name: 'observationCreate',
    component: ObservationCreate,
  },
  {
    path: '/patients/:patientId/encounters/:encounterId/conditions',
    name: 'conditions',
    component: Conditions,
  },
  {
    path: '/patients/:patientId/encounters/:encounterId/conditions/create',
    name: 'conditionCreate',
    component: ConditionCreate,
  },
  {
    path: '/patients/:patientId/encounters/:encounterId/diagnostics',
    name: 'diagnostics',
    component: Diagnostics,
  },
  {
    path: '/patients/:patientId/encounters/:encounterId/diagnostics/create',
    name: 'diagnosticCreate',
    component: DiagnosticCreate,
  },

  {
    path: '/care-plan',
    name: 'carePlan',
    component: CarePlan
  },
  {
    path: '/care-plan/:carePlanId/action',
    name: 'carePlanAction',
    component: CarePlanAction
  },

  {
    path: '/pending-reviews/list',
    name: 'pendingReviews',
    component: PendingReviews
  },
  {
    path: '/pending-reviews/:reviewId',
    name: 'pendingReviewDetail',
    component: PendingReviewDetail
  },
  {
    path: '/pending-reviews/:reviewId/generate',
    name: 'pendingReviewGenerate',
    component: PendingReviewGenerate
  },
  {
    path: '/pending-reviews/:reviewId/blood-pressure',
    name: 'pendingReviewBloodPressure',
    component: PendingReviewBloodPressure
  },

  {
    path: '/questionnaire/tobacco',
    name: 'tobacco',
    component: Tobacco
  },

  {
    path: '/questionnaire/alcohol',
    name: 'alcohol',
    component: Alcohol
  },

  {
    path: '/questionnaire/diet',
    name: 'diet',
    component: Diet
  },

  {
    path: '/questionnaire/physical-activity',
    name: 'physical',
    component: Physical
  },

  {
    path: '/questionnaire/medication',
    name: 'medication',
    component: Medication
  },

  {
    path: '/questionnaire/medical',
    name: 'medical',
    component: Medical
  },
  {
    path: '/health-assessment',
    name: 'healthAssessment',
    component: HealthAssessment
  },
  {
    path: '/health-assessment/new-health-assessment',
    name: 'newHealthAssessment',
    component: NewHealthAssessment
  },
  {
    path: '/health-assessment/health-assessment-created',
    name: 'healthAssessmentCreated',
    component: CreatedHealthAssessment
  },
  {
    path: '/health-assessment/past-health-assessment',
    name: 'pastHealthAssessment',
    component: PastHealthAssessment
  }


]
const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    next('/login');
  } else if(loggedIn && !authRequired){
      next('/dashboard')
  } else {
    next();
  }
})
export default router;
