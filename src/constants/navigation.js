export default {
  navigation: [
    {
      roleCode: 'DEFAULT',
      links: [
        {
          label: 'Home',
          path: '/'
        }
      ]
    },
    {
      roleCode: 'STUDENT',
      links: [
        {
          label: 'Home',
          path: '/'
        },
        {
          label: 'Dashboard',
          path: '/student'
        }
      ]
    },
    {
      roleCode: 'TEACHER',
      links: [
        {
          label: 'Home',
          path: '/'
        },
        {
          label: 'Dashboard',
          path: '/teacher'
        }
      ]
    },
    {
      roleCode: 'SYSTEM_ADMIN',
      links: [
        {
          label: 'Home',
          path: '/'
        },
        {
          label: 'Dashboard',
          path: '/system-admin'
        }
      ]
    },
    {
      roleCode: 'REGISTRAR',
      links: [
        {
          label: 'Home',
          path: '/'
        },
        {
          label: 'Dashboard',
          path: '/registrar'
        }
      ]
    },
    {
      roleCode: 'SCHOOL_ADMIN',
      links: [
        {
          label: 'Home',
          path: '/'
        },
        {
          label: 'Dashboard',
          path: '/school-admin'
        }
      ]
    }
  ],
  sideNav: [
    {
      roleCode: 'STUDENT',
      links: [
        {
          label: 'Dashboard',
          path: '/student',
          icon: 'fa-home'
        },
        {
          label: 'Section',
          path: '/student/section',
          icon: 'fa-users'
        },
        {
          label: 'Subjects',
          path: '/student/subjects',
          icon: 'fa-book-open'
        },
        {
          label: 'Grades',
          path: '/student/grades',
          icon: 'fa-user-graduate'
        }
        // {
        //   label: 'Calendar',
        //   path: '/student/calendar',
        //   icon: 'fa-calendar'
        // },
        // {
        //   label: 'Feeds',
        //   path: '/student/feeds',
        //   icon: 'fa-rss'
        // }
      ]
    },
    {
      roleCode: 'TEACHER',
      links: [
        {
          label: 'Dashboard',
          path: '/teacher',
          icon: 'fa-home'
        },
        {
          label: 'Sections',
          path: '/teacher/sections',
          icon: 'fa-users'
        }
      ]
    },
    {
      roleCode: 'SYSTEM_ADMIN',
      links: [
        {
          label: 'Dashboard',
          path: '/superadmin',
          icon: 'fa-home'
        },
        {
          label: 'My Profile',
          path: '/superadmin/my-profile',
          icon: 'fa-user-cog'
        },
        {
          label: 'User Management',
          path: '/superadmin/user-management',
          icon: 'fa-user-cog'
        },
        {
          label: 'Audit Trail',
          path: '/superadmin/audit-trail',
          icon: 'fa-list-alt'
        }
      ]
    },
    {
      roleCode: 'REGISTRAR',
      links: [
        {
          label: 'Dashboard',
          path: '/registrar',
          icon: 'fa-home'
        },
        {
          label: 'Admissions',
          path: '/registrar/admissions',
          icon: 'fa-users-cog'
        },
        {
          label: 'Enrollments',
          path: '/registrar/enrollments',
          icon: 'fa-users-cog'
        },
        {
          label: 'School Years',
          path: '/registrar/school-years',
          icon: 'fa-calendar'
        },
        {
          label: 'Subjects',
          path: '/registrar/subjects',
          icon: 'fa-book-open'
        },
        {
          label: 'Sections',
          path: '/registrar/sections',
          icon: 'fa-person-booth'
        },
        {
          label: 'Broadcast',
          path: '/registrar/broadcast',
          icon: 'fa-rss'
        }
      ]
    },
    {
      roleCode: 'SCHOOL_ADMIN',
      links: [
        {
          label: 'Dashboard',
          path: '/school-admin',
          icon: 'fa-home'
        },
        {
          label: 'Users',
          path: '/school-admin/users',
          icon: 'fa-users-cog'
        },
        {
          label: 'School Years',
          path: '/school-admin/school-year',
          icon: 'fa-calendar'
        },
        {
          label: 'Students',
          path: '/school-admin/students',
          icon: 'fa-user-cog'
        },
        {
          label: 'Sections',
          path: '/school-admin/sections',
          icon: 'fa-person-booth'
        }
      ]
    }
  ]
}
