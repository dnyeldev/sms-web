import React from 'react'

export default function Index() {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />
        <title>Mentoring - Dashboard</title>
        <link rel="shortcut icon" href="/assets/img/favicon.png" type="image/x-icon" />

        <link rel="stylesheet" href="assets/css/bootstrap.min.css" />

        <link rel="stylesheet" href="assets/plugins/fontawesome/css/fontawesome.min.css" />
        <link rel="stylesheet" href="assets/plugins/fontawesome/css/all.min.css" />

        <link rel="stylesheet" href="assets/css/feathericon.min.css" />

        <link rel="stylesheet" href="assets/plugins/morris/morris.css" />

        <link rel="stylesheet" href="assets/css/style.css" />
      </head>

      <body>

        <div className="main-wrapper">

          <div className="header">

            <div className="header-left">
              <a href="index.html" className="logo">
                <img src="/assets/img/logo.png" alt="Logo" />
              </a>
              <a href="index.html" className="logo logo-small">
                <img src="/assets/img/logo-small.png" alt="Logo" width="30" height="30" />
              </a>
            </div>


            <a href="javascript:void(0);" id="toggle_btn">
              <i className="fe fe-text-align-left"></i>
            </a>

            <div className="top-nav-search">
              <form>
                <input type="text" className="form-control" placeholder="Search here" />
                <button className="btn" type="submit"><i className="fa fa-search"></i></button>
              </form>
            </div>

            <a className="mobile_btn" id="mobile_btn">
              <i className="fa fa-bars"></i>
            </a>


            <ul className="nav user-menu">

              <li className="nav-item dropdown noti-dropdown">
                <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                  <i className="fe fe-bell"></i> <span className="badge badge-pill">3</span>
                </a>
                <div className="dropdown-menu notifications">
                  <div className="topnav-dropdown-header">
                    <span className="notification-title">Notifications</span>
                    <a href="javascript:void(0)" className="clear-noti"> Clear All </a>
                  </div>
                  <div className="noti-content">
                    <ul className="notification-list">
                      <li className="notification-message">
                        <a href="#">
                          <div className="media d-flex">
                            <span className="avatar avatar-sm flex-shrink-0">
                              <img className="avatar-img rounded-circle" alt="User Image" src="/assets/img/user/user.jpg" />
                            </span>
                            <div className="media-body flex-grow-1">
                              <p className="noti-details"><span className="noti-title">Jonathan Doe</span> Schedule <span
                                className="noti-title">his appointment</span></p>
                              <p className="noti-time"><span className="notification-time">4 mins ago</span></p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="notification-message">
                        <a href="#">
                          <div className="media d-flex">
                            <span className="avatar avatar-sm flex-shrink-0">
                              <img className="avatar-img rounded-circle" alt="User Image" src="/assets/img/user/user1.jpg" />
                            </span>
                            <div className="media-body flex-grow-1">
                              <p className="noti-details"><span className="noti-title">Julie Pennington</span> has booked her
                                appointment to <span className="noti-title">Ruby Perrin</span></p>
                              <p className="noti-time"><span className="notification-time">6 mins ago</span></p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="notification-message">
                        <a href="#">
                          <div className="media d-flex">
                            <span className="avatar avatar-sm flex-shrink-0">
                              <img className="avatar-img rounded-circle" alt="User Image" src="/assets/img/user/user2.jpg" />
                            </span>
                            <div className="media-body flex-grow-1">
                              <p className="noti-details"><span className="noti-title">Tyrone Roberts</span> sent a amount of
                                $210 for his <span className="noti-title">appointment</span></p>
                              <p className="noti-time"><span className="notification-time">8 mins ago</span></p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="notification-message">
                        <a href="#">
                          <div className="media d-flex">
                            <span className="avatar avatar-sm flex-shrink-0">
                              <img className="avatar-img rounded-circle" alt="User Image" src="/assets/img/user/user4.jpg" />
                            </span>
                            <div className="media-body flex-grow-1">
                              <p className="noti-details"><span className="noti-title">Patricia Manzi</span> send a message
                                <span className="noti-title"> to his Mentee</span>
                              </p>
                              <p className="noti-time"><span className="notification-time">12 mins ago</span></p>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="topnav-dropdown-footer">
                    <a href="#">View all Notifications</a>
                  </div>
                </div>
              </li>


              <li className="nav-item dropdown has-arrow">
                <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                  <span className="user-img"><img className="rounded-circle" src="/assets/img/profiles/avatar-12.jpg"
                    width="31" alt="Ryan Taylor" /></span>
                </a>
                <div className="dropdown-menu">
                  <div className="user-header">
                    <div className="avatar avatar-sm">
                      <img src="/assets/img/profiles/avatar-12.jpg" alt="User Image" className="avatar-img rounded-circle" />
                    </div>
                    <div className="user-text">
                      <h6>Allen Davis</h6>
                      <p className="text-muted mb-0">Administrator</p>
                    </div>
                  </div>
                  <a className="dropdown-item" href="profile.html">My Profile</a>
                  <a className="dropdown-item" href="settings.html">Settings</a>
                  <a className="dropdown-item" href="login.html">Logout</a>
                </div>
              </li>

            </ul>

          </div>


          <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
              <div id="sidebar-menu" className="sidebar-menu">
                <ul>
                  <li className="menu-title">
                    <span>Main</span>
                  </li>
                  <li className="active">
                    <a href="index.html"><i data-feather="home"></i> <span>Dashboard</span></a>
                  </li>
                  <li>
                    <a href="mentor.html"><i data-feather="user"></i> <span>Mentor</span></a>
                  </li>
                  <li>
                    <a href="mentee.html"><i data-feather="users"></i> <span>Mentee</span></a>
                  </li>
                  <li>
                    <a href="booking-list.html"><i data-feather="file-text"></i> <span>Booking List</span></a>
                  </li>
                  <li>
                    <a href="categories.html"><i data-feather="package"></i> <span>Categories</span></a>
                  </li>
                  <li>
                    <a href="transactions-list.html"><i data-feather="credit-card"></i> <span>Transactions</span></a>
                  </li>
                  <li>
                    <a href="settings.html"><i data-feather="settings"></i> <span>Settings</span></a>
                  </li>
                  <li className="submenu">
                    <a href="#"><i data-feather="clipboard"></i><span> Reports</span> <span className="menu-arrow"></span></a>
                    <ul style={{ display: 'none' }}>
                      <li><a href="invoices.html">Invoices List</a></li>
                      <li><a href="invoice-grid.html">Invoices Grid</a></li>
                      <li><a href="add-invoice.html">Add Invoices</a></li>
                      <li><a href="edit-invoice.html">Edit Invoices</a></li>
                      <li><a href="view-invoice.html">Invoice Details</a></li>
                      <li><a href="invoices-settings.html">invoice settings</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="invoice-items.html"><i data-feather="star"></i><span>Items</span></a>
                  </li>
                  <li className="menu-title">
                    <span>Pages</span>
                  </li>
                  <li>
                    <a href="profile.html"><i data-feather="user-plus"></i> <span>My Profile</span></a>
                  </li>
                  <li className="submenu">
                    <a href="#"><i data-feather="book-open"></i> <span>Blog</span> <span className="menu-arrow"></span></a>
                    <ul style={{ display: 'none' }}>
                      <li><a href="blog.html"> Blog </a></li>
                      <li><a href="blog-details.html"> Blog Details </a></li>
                      <li><a href="add-blog.html"> Add Blog </a></li>
                      <li><a href="edit-blog.html"> Edit Blog </a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="#"><i data-feather="lock"></i> <span> Authentication </span> <span
                      className="menu-arrow"></span></a>
                    <ul>
                      <li><a href="login.html"> Login </a></li>
                      <li><a href="register.html"> Register </a></li>
                      <li><a href="forgot-password.html"> Forgot Password </a></li>
                      <li><a href="lock-screen.html"> Lock Screen </a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="#"><i data-feather="alert-octagon"></i> <span> Error Pages </span> <span
                      className="menu-arrow"></span></a>
                    <ul>
                      <li><a href="error-404.html">404 Error </a></li>
                      <li><a href="error-500.html">500 Error </a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="blank-page.html"><i data-feather="file"></i> <span>Blank Page</span></a>
                  </li>
                  <li className="menu-title">
                    <span>UI Interface</span>
                  </li>
                  <li>
                    <a href="components.html"><i data-feather="layers"></i> <span>Components</span></a>
                  </li>
                  <li className="submenu">
                    <a href="#"><i data-feather="columns"></i> <span> Forms </span> <span className="menu-arrow"></span></a>
                    <ul>
                      <li><a href="form-basic-inputs.html">Basic Inputs </a></li>
                      <li><a href="form-input-groups.html">Input Groups </a></li>
                      <li><a href="form-horizontal.html">Horizontal Form </a></li>
                      <li><a href="form-vertical.html"> Vertical Form </a></li>
                      <li><a href="form-mask.html"> Form Mask </a></li>
                      <li><a href="form-validation.html"> Form Validation </a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="#"><i data-feather="layout"></i> <span> Tables </span> <span className="menu-arrow"></span></a>
                    <ul style={{ display: 'none' }}>
                      <li><a href="tables-basic.html">Basic Tables </a></li>
                      <li><a href="data-tables.html">Data Table </a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="javascript:void(0);"><span>Multi Level</span> <span className="menu-arrow"></span></a>
                    <ul style={{ display: 'none' }}>
                      <li className="submenu">
                        <a href="javascript:void(0);"> <span>Level 1</span> <span className="menu-arrow"></span></a>
                        <ul style={{ display: 'none' }}>
                          <li><a href="javascript:void(0);"><span>Level 2</span></a></li>
                          <li className="submenu">
                            <a href="javascript:void(0);"> <span> Level 2</span> <span className="menu-arrow"></span></a>
                            <ul style={{ display: 'none' }}>
                              <li><a href="javascript:void(0);">Level 3</a></li>
                              <li><a href="javascript:void(0);">Level 3</a></li>
                            </ul>
                          </li>
                          <li><a href="javascript:void(0);"> <span>Level 2</span></a></li>
                        </ul>
                      </li>
                      <li>
                        <a href="javascript:void(0);"> <span>Level 1</span></a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>


          <div className="page-wrapper">
            <div className="content container-fluid">

              <div className="page-header">
                <div className="row">
                  <div className="col-sm-12">
                    <h3 className="page-title">Welcome Admin!</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item active">Dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="dash-widget-header">
                        <span className="dash-widget-icon text-primary bg-primary">
                          <i className="fe fe-users"></i>
                        </span>
                        <div className="dash-count">
                          <h3>168</h3>
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h6 className="text-muted">Members</h6>
                        <div className="progress progress-sm">
                          <div className="progress-bar bg-primary w-50"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="dash-widget-header">
                        <span className="dash-widget-icon text-success bg-success">
                          <i className="fe fe-credit-card"></i>
                        </span>
                        <div className="dash-count">
                          <h3>487</h3>
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h6 className="text-muted">Appointments</h6>
                        <div className="progress progress-sm">
                          <div className="progress-bar bg-success w-50"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="dash-widget-header">
                        <span className="dash-widget-icon text-danger bg-danger">
                          <i className="fe fe-star-o"></i>
                        </span>
                        <div className="dash-count">
                          <h3>485</h3>
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h6 className="text-muted">Mentoring Points</h6>
                        <div className="progress progress-sm">
                          <div className="progress-bar bg-danger w-50"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="dash-widget-header">
                        <span className="dash-widget-icon text-warning bg-warning">
                          <i className="fe fe-folder"></i>
                        </span>
                        <div className="dash-count">
                          <h3>$62523</h3>
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h6 className="text-muted">Revenue</h6>
                        <div className="progress progress-sm">
                          <div className="progress-bar bg-warning w-50"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-6">

                  <div className="card card-chart">
                    <div className="card-header">
                      <h4 className="card-title">Revenue</h4>
                    </div>
                    <div className="card-body">
                      <div id="morrisArea"></div>
                    </div>
                  </div>

                </div>
                <div className="col-md-12 col-lg-6">

                  <div className="card card-chart">
                    <div className="card-header">
                      <h4 className="card-title">Status</h4>
                    </div>
                    <div className="card-body">
                      <div id="morrisLine"></div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="row">
                <div className="col-md-6 d-flex">

                  <div className="card card-table flex-fill">
                    <div className="card-header">
                      <h4 className="card-title">Mentor List</h4>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>Mentor Name</th>
                              <th>Course</th>
                              <th>Earned</th>
                              <th>Reviews</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/profiles/avatar-08.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">James Amen</a>
                                </h2>
                              </td>
                              <td>Maths</td>
                              <td>$3200.00</td>
                              <td>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star-o text-secondary"></i>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/profiles/avatar-07.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Jessica Fogarty</a>
                                </h2>
                              </td>
                              <td>Business Maths</td>
                              <td>$3100.00</td>
                              <td>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star-o text-secondary"></i>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/profiles/avatar-17.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Jose Anderson</a>
                                </h2>
                              </td>
                              <td>Algebra</td>
                              <td>$4000.00</td>
                              <td>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star-o text-secondary"></i>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/profiles/avatar-06.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Sofia Brient</a>
                                </h2>
                              </td>
                              <td>Integrated Sum</td>
                              <td>$3200.00</td>
                              <td>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star-o text-secondary"></i>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/profiles/avatar-14.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Marvin Campbell</a>
                                </h2>
                              </td>
                              <td>Flow chart</td>
                              <td>$3500.00</td>
                              <td>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star text-warning"></i>
                                <i className="fe fe-star-o text-secondary"></i>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-md-6 d-flex">

                  <div className="card  card-table flex-fill">
                    <div className="card-header">
                      <h4 className="card-title">Mentee List</h4>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>Mentee Name</th>
                              <th>Phone</th>
                              <th>Last Visit</th>
                              <th>Paid</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/user/user.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Jonathan Doe </a>
                                </h2>
                              </td>
                              <td>8286329170</td>
                              <td>20 Oct 2019</td>
                              <td className="text-end">$100.00</td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/user/user1.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Julie Pennington </a>
                                </h2>
                              </td>
                              <td>2077299974</td>
                              <td>22 Oct 2019</td>
                              <td className="text-end">$200.00</td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/user/user2.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Tyrone Roberts</a>
                                </h2>
                              </td>
                              <td>2607247769</td>
                              <td>21 Oct 2019</td>
                              <td className="text-end">$250.00</td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/user/user3.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Allen Davis </a>
                                </h2>
                              </td>
                              <td>5043686874</td>
                              <td>21 Sep 2019</td>
                              <td className="text-end">$150.00</td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/user/user4.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Patricia Manzi </a>
                                </h2>
                              </td>
                              <td>9548207887</td>
                              <td>18 Sep 2019</td>
                              <td className="text-end">$350.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="row">
                <div className="col-md-12">

                  <div className="card card-table">
                    <div className="card-header">
                      <h4 className="card-title">Booking List</h4>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>Mentor Name</th>
                              <th>Course</th>
                              <th>Mentee Name</th>
                              <th>Booking Time</th>
                              <th>Status</th>
                              <th className="text-end">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/profiles/avatar-08.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">James Amen</a>
                                </h2>
                              </td>
                              <td>Maths</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/user/user.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Jonathan Doe </a>
                                </h2>
                              </td>
                              <td>9 Nov 2019 <span className="text-primary d-block">11.00 AM - 11.15 AM</span></td>
                              <td>
                                <div className="status-toggle">
                                  <input type="checkbox" id="status_1" className="check" checked />
                                  <label htmlFor="status_1" className="checktoggle">checkbox</label>
                                </div>
                              </td>
                              <td className="text-end">
                                $200.00
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/profiles/avatar-07.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Jessica Fogarty</a>
                                </h2>
                              </td>
                              <td>Business Maths</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/user/user1.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Julie Pennington </a>
                                </h2>
                              </td>
                              <td>5 Nov 2019 <span className="text-primary d-block">11.00 AM - 11.35 AM</span></td>
                              <td>
                                <div className="status-toggle">
                                  <input type="checkbox" id="status_2" className="check" checked />
                                  <label htmlFor="status_2" className="checktoggle">checkbox</label>
                                </div>
                              </td>
                              <td className="text-end">
                                $300.00
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/profiles/avatar-17.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Jose Anderson</a>
                                </h2>
                              </td>
                              <td>Algebra</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/user/user2.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Tyrone Roberts</a>
                                </h2>
                              </td>
                              <td>11 Nov 2019 <span className="text-primary d-block">12.00 PM - 12.15 PM</span></td>
                              <td>
                                <div className="status-toggle">
                                  <input type="checkbox" id="status_3" className="check" checked />
                                  <label htmlFor="status_3" className="checktoggle">checkbox</label>
                                </div>
                              </td>
                              <td className="text-end">
                                $150.00
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/profiles/avatar-06.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Sofia Brient</a>
                                </h2>
                              </td>
                              <td>Integrated Sum</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/user/user3.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Allen Davis </a>
                                </h2>
                              </td>
                              <td>7 Nov 2019<span className="text-primary d-block">1.00 PM - 1.20 PM</span></td>
                              <td>
                                <div className="status-toggle">
                                  <input type="checkbox" id="status_4" className="check" checked />
                                  <label htmlFor="status_4" className="checktoggle">checkbox</label>
                                </div>
                              </td>
                              <td className="text-end">
                                $150.00
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/profiles/avatar-14.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Marvin Campbell</a>
                                </h2>
                              </td>
                              <td>Flow chart</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a href="profile.html" className="avatar avatar-sm me-2"><img
                                    className="avatar-img rounded-circle" src="/assets/img/user/user4.jpg"
                                    alt="User Image" /></a>
                                  <a href="profile.html">Patricia Manzi </a>
                                </h2>
                              </td>
                              <td>15 Nov 2019 <span className="text-primary d-block">1.00 PM - 1.15 PM</span></td>
                              <td>
                                <div className="status-toggle">
                                  <input type="checkbox" id="status_5" className="check" checked />
                                  <label htmlFor="status_5" className="checktoggle">checkbox</label>
                                </div>
                              </td>
                              <td className="text-end">
                                $200.00
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


        <script src="assets/js/jquery-3.6.0.min.js"></script>

        <script src="assets/js/bootstrap.bundle.min.js"></script>

        <script src="assets/js/feather.min.js"></script>

        <script src="assets/plugins/slimscroll/jquery.slimscroll.min.js"></script>

        <script src="assets/plugins/raphael/raphael.min.js"></script>

        <script src="assets/plugins/morris/morris.min.js"></script>

        <script src="assets/js/chart.morris.js"></script>
        <script src="assets/js/script.js"></script>
      </body>

    </html >
  )
}