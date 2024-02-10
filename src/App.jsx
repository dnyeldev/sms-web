/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { persistCache } from 'apollo-cache-persist'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-mui'
import client, { cache } from './CoreClient'
import LoginProvider from './pages/login/loginProvider'
import 'react-datepicker/dist/react-datepicker.css'

// Templates
import Template from './pages/app'

// Pages
import LandingPage from './pages/landingPage'
import TuteeController, {
  RegisterStudent,
  StudentDashboard,
  RegisterSuccess,
  StudentSection,
  StudentGrades,
  StudentSubjects
} from './pages/students'
import Login from './pages/login'
import TemplateTest from './pages/template'

import SchoolAdminController, {
  SchoolAdminDashboard,
  SchoolAdminUsers,
  SchoolAdminStudents,
  SchoolAdminAddUser,
  SchoolAdminUserProfile,
  SchoolAdminSchoolYears,
  SchoolAdminSection,
  SchoolAdminSections,
  SchoolAdminSubjects
} from './pages/schoolAdmin'

import TeacherController, {
  TeacherDashboard,
  TeacherSection,
  TeacherSections,
  TeacherSectionSubject
} from './pages/teacher'

import RegistrarController, {
  RegistrarDashboard,
  RegistrarStudents,
  RegistrarStudentRegistrations,
  RegistrarSection,
  RegistrarSections,
  RegistrarBroadcast
} from './pages/registrar'

import ProfilePage from './pages/profile'
import Profile from './pages/profile/profile'
import SchoolYears from './pages/schoolYears'
import Subjects from './pages/subjects'
import Subject from './pages/subjects/subject'

import TermsServices from './pages/TermsAndPrivacy/termsServices'
import PrivacyPolicy from './pages/TermsAndPrivacy/privacyPolicy'
import Faq from './pages/faq/faq'

const CAN_OFFLINE = JSON.parse(process.env.REACT_APP_CAN_OFFLINE)
const CACHE_FIRST = JSON.parse(process.env.REACT_APP_CACHE_FIRST)
// const SYSTEM_MAINTENANCE = JSON.parse(process.env.REACT_APP_SYSTEM_MAINTENANCE) || false;

export const waitOnCache = () => {
  if (!CAN_OFFLINE && !CACHE_FIRST) {
    return null
  }

  const storage = window.localStorage
  return persistCache({ cache, storage })
}

// optional configuration
const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 1000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

export default function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <BrowserRouter>
      <ApolloProvider client={client}>
        <LoginProvider>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Routes>
              <Route path='/' element={<Template />}>
                <Route index element={<LandingPage />} />
                <Route path='/terms-of-services' element={<TermsServices />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/faq' element={<Faq />} />

                <Route path='/student' element={<TuteeController />}>
                  <Route index element={<StudentDashboard />} />
                  <Route path='section' element={<StudentSection />} />
                  <Route path='grades' element={<StudentGrades />} />
                  <Route path='subjects' element={<StudentSubjects />} />
                </Route>

                <Route path='/school-admin' element={<SchoolAdminController />}>
                  <Route index element={<SchoolAdminDashboard />} />
                  <Route path='users' element={<SchoolAdminUsers />} />
                  <Route path='users/add' element={<SchoolAdminAddUser />} />
                  <Route
                    path='users/profile'
                    element={<SchoolAdminUserProfile />}
                  />
                  <Route path='students' element={<SchoolAdminStudents />} />
                  <Route
                    path='school-year'
                    element={<SchoolAdminSchoolYears />}
                  />
                  <Route path='sections' element={<SchoolAdminSections />} />
                  <Route path='section' element={<SchoolAdminSection />} />
                  <Route path='subjects' element={<SchoolAdminSubjects />} />
                </Route>

                <Route path='/teacher' element={<TeacherController />}>
                  <Route index element={<TeacherDashboard />} />
                  <Route path='section' element={<TeacherSection />} />
                  <Route path='sections' element={<TeacherSections />} />
                  <Route
                    path='section/subject'
                    element={<TeacherSectionSubject />}
                  />
                </Route>

                <Route path='/registrar' element={<RegistrarController />}>
                  <Route index element={<RegistrarDashboard />} />
                  <Route path='enrollments' element={<RegistrarStudents />} />
                  <Route
                    path='admissions'
                    element={<RegistrarStudentRegistrations />}
                  />
                  <Route path='sections' element={<RegistrarSections />} />
                  <Route path='section' element={<RegistrarSection />} />
                  <Route path='school-years' element={<SchoolYears />} />
                  <Route path='subjects' element={<Subjects />} />
                  <Route path='subject' element={<Subject />} />
                  <Route path='broadcast' element={<RegistrarBroadcast />} />
                </Route>

                <Route path='/profile' element={<ProfilePage />}>
                  <Route index element={<Profile />} />
                </Route>
              </Route>

              <Route path='/register'>
                <Route index element={<RegisterStudent />} />
                <Route path='success' element={<RegisterSuccess />} />
              </Route>

              <Route path='/login' element={<Login />} />
              <Route path='/template' element={<TemplateTest />} />
            </Routes>
          </AlertProvider>
        </LoginProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}
