import Login from '../components/login/Login'
import ForgotPassword from '../components/login/Forgot-password'
import Dashboard from '../components/Dashboard'
import HealthList from '../components/health-records/List'
import HealthDetail from '../components/health-records/Show'
import Assessments from '../components/health-records/assessments/Show'
import Patients from '../components/patients/List'
import PatientsOverview from '../components/patients/Overview'
import PatientCreate from '../components/patients/Create'
import PatientEdit from '../components/patients/Edit'

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
import EncounterCreate from '../components/encounters/Create'

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


import store from "../store/store";
import VueRouter from "vue-router";
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'dashboard'
        })
      }
      next()
    }
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
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/health-records/list',
    name: 'healthList',
    component: HealthList,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/health-records/view/:participantId',
    name: 'healthDetail',
    component: HealthDetail,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/health-records/patients/:participantId/encounters/:encounterId/assessments',
    name: 'assessments',
    component: Assessments,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/health-records/patients/:participantId/encounters',
    name: 'healthEncounters',
    component: HealthEncounters,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/list',
    name: 'patients',
    component: Patients,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId/overview',
    name: 'patientOverview',
    component: PatientsOverview
  },
  {
    path: '/patients/create',
    name: 'patientCreate',
    component: PatientCreate,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId',
    name: 'patientEdit',
    component: PatientEdit,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },

  {
    path: '/patients/:patientId/encounters',
    name: 'encounters',
    component: Encounters,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId/encounters/create',
    name: 'encounterCreate',
    component: EncounterCreate,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId/allergy',
    name: 'allergy',
    component: Allergy,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId/allergy/create',
    name: 'allergyCreate',
    component: AllergyCreate,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId/family-members',
    name: 'familyMembers',
    component: FamilyMembers,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId/family-members/create',
    name: 'familyMemberCreate',
    component: FamilyMemberCreate,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId/specimen',
    name: 'specimen',
    component: Specimen,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId/specimen/create',
    name: 'specimenCreate',
    component: SpecimenCreate,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },

  {
    path: '/patients/:patientId/encounters/:encounterId/observations',
    name: 'observations',
    component: Observations,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId/encounters/:encounterId/observations/create',
    name: 'observationCreate',
    component: ObservationCreate,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId/encounters/:encounterId/conditions',
    name: 'conditions',
    component: Conditions,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId/encounters/:encounterId/conditions/create',
    name: 'conditionCreate',
    component: ConditionCreate,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId/encounters/:encounterId/diagnostics',
    name: 'diagnostics',
    component: Diagnostics,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/patients/:patientId/encounters/:encounterId/diagnostics/create',
    name: 'diagnosticCreate',
    component: DiagnosticCreate,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
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


]
const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (store.getters['auth/userInfo']) {
    let expiration = new Date(store.getters['auth/userInfo'].expirationTime)
    expiration = expiration.addHours(12)
    expiration = expiration.getTime()
    let currentTime = new Date()
    currentTime = currentTime.getTime()

    if (currentTime > expiration) {
      store.commit('auth/SET_TOKEN', null)
      store.commit('auth/SET_USER', null)
      next({
        name: 'login'
      })
    }
    next()
  }
  next()
})
export default router;
