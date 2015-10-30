// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

    .run(function ($ionicPlatform, $ionicPopup, jpushService, $state) {
//
        //主页面显示退出提示框
        $ionicPlatform.registerBackButtonAction(function (e) {

            e.preventDefault();

            function showConfirm() {
                var confirmPopup = $ionicPopup.confirm({
                    title: '<strong>退出应用?</strong>',
                    template: '你确定要退出应用吗?',
                    okText: '退出',
                    cancelText: '取消'
                });

                confirmPopup.then(function (res) {
                    if (res) {

                        ionic.Platform.exitApp();
                    } else {
                        // Don't close
                    }
                });
            };
            showConfirm();
            return false;
        }, 101);



        $ionicPlatform.ready(function () {

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
            //var setTagsWithAliasCallback=function(event){
                //window.alert('result code:'+event.resultCode+' tags:'+event.tags+' alias:'+event.alias);
            //}\

            //安卓设备下的消息打开
            var openNotificationInAndroidCallback = function (data) {
                if (typeof data === 'string') {
                    var hh = JSON.parse(data);
                    //window.alert(hh.alert);
                    console.log(hh.alert);
                    if(hh.alert == '您的请假审核有结果了'){
                        if (window.localStorage['Name']) {
                            $state.go('leave_tab.myleave');
                        }else {
                            $ionicPopup.alert({
                                template: '请先登录账号！'
                            })
                            $state.go('login');
                        }
                    }else if(hh.alert == '有新的请假申请'){
                        if (window.localStorage['TeacherName']) {
                            $state.go('teacher_leavereview');
                        } else {
                            $ionicPopup.alert({
                                template: '请先登录账号！'
                            })
                            $state.go('login');
                        }
                    }else{
                        if (window.localStorage['Name']) {
                            window.localStorage['dege'] = '1';
                            $state.go('students_tabs');
                        } else if (window.localStorage['TeacherName']) {
                            $state.go('teacher_leavereview');
                        } else {
                            $ionicPopup.alert({
                                template: '请先登录账号！'
                            })
                            $state.go('login');
                        }
                    }
                }
            }
            var onOpenNotification = function (event) {
                var alertContent;
                if (device.platform == "Android") {
                    alertContent = window.plugins.jPushPlugin.openNotification.alert;
                    //console.log(alertContent);

                } else {
                    window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                    alertContent = event.aps.alert;
                    //console.log(alertContent)
                    if(alertContent == '您的请假审核有结果了'){
                        if (window.localStorage['Name']) {
                            $state.go('students_tabs');
                        }else {
                            $ionicPopup.alert({
                                template: '请先登录账号！'
                            })
                            $state.go('login');
                        }
                    }else if(alertContent == '有新的请假申请'){
                        if (window.localStorage['TeacherName']) {
                            $state.go('teacher_leavereview');
                        } else {
                            $ionicPopup.alert({
                                template: '请先登录账号！'
                            })
                            $state.go('login');
                        }
                    }else{
                        if (window.localStorage['Name']) {
                            window.localStorage['dege'] = '1';
                            $state.go('students_tabs');
                        } else if (window.localStorage['TeacherName']) {
                            $state.go('teacher_leavereview');
                        } else {
                            $ionicPopup.alert({
                                template: '请先登录账号！'
                            })
                            $state.go('login');
                        }
                    }
                }
            }
            var config = {
                stac: onOpenNotification,
                oniac: openNotificationInAndroidCallback
            };
            jpushService.init(config);
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        if(window.localStorage['Stu_Purview']){
            var Page_address = '/students_tabs'
        }else if(window.localStorage['tea_Purview']){
            var Page_address = '/teachers_tab'
        }else{
            var Page_address = '/login'
        }

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            //登录界面
            .state('login', {
                url: '/login',
                cache: false,
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            //忘记密码界面
            .state('forget_password', {
                url: '/forget_password',
                templateUrl: 'templates/forget_password.html',
                controller: 'forget_passwordCtrl'
            })
            //忘记密码、修改密码界面
            .state('change_password', {
                url: '/change_password',
                templateUrl: 'templates/change_password.html',
                controller: 'change_passwordCtrl'
            })
            //注册界面
            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            })
            //注册手机验证界面
            .state('register_phone', {
                url: '/register_phone',
                templateUrl: 'templates/register-phone.html',
                controller: 'Register_phoneCtrl'
            })

            //学生TABS
            .state('students_tabs', {
                url: '/students_tabs',
                cache: false,
                views: {
                    '': {
                        templateUrl: 'templates/students-tabs.html',
                        controller: 'StudentsTabsCtrl'
                    },
                    'study@students_tabs': {
                        templateUrl: 'templates/index-study.html',
                        controller: 'StudyCtrl',
                        cache: false
                    },
                    'alerts@students_tabs': {
                        templateUrl: 'templates/index-alerts.html',
                        controller: 'AlertsCtrl'
                    },
                    'information@students_tabs': {
                        templateUrl: 'templates/index-information.html',
                        controller: 'InformationCtrl'
                    }
                }
            })


            //.state('students_tabs', {
            //      abstract: true,
            //      templateUrl: 'templates/students-tabs.html',
            //      controller: 'StudentsTabsCtrl'
            //})
            //.state('students_tabs.study',{
            //    url:'/study',
            //    views:{
            //        "study":{
            //            templateUrl:'templates/index-study.html',
            //            controller: 'StudyCtrl'
            //        }
            //    }
            //})
            //.state('students_tabs.alerts',{
            //    url:'/alerts',
            //    views:{
            //        "alerts":{
            //            templateUrl:'templates/index-alerts.html',
            //            controller: 'AlertsCtrl'
            //        }
            //    }
            //})
            //.state('students_tabs.information',{
            //    url:'/information',
            //    views:{
            //        "information":{
            //            templateUrl:'templates/index-information.html',
            //            controller: 'InformationCtrl'
            //        }
            //    }
            //})
            //请假tabs
            .state('leave_tab', {
                url: '/leave_tab',
                abstract: true,
                templateUrl: 'templates/Leave-tabs.html'
            })
            //请假-提交请假页面
            .state('leave_tab.newleave', {
                url: '/newleave',
                views: {
                    'leave_tab-newleave': {
                        templateUrl: 'templates/Leave-newleave.html',
                        controller: 'NewleaveCtrl'
                    }
                }
            })
            //请假-我的请假页面
            .state('leave_tab.myleave', {
                url: '/myleave',
                views: {
                    'leave_tab-myleave': {
                        templateUrl: 'templates/Leave-myleave.html',
                        controller: 'MyleaveCtrl'
                    }
                }
            })
            //学生签到
            .state('student_getpoint', {
                url: '/student_getpoint',
                templateUrl: 'templates/student_getpoint.html',
                controller: 'student_getpointCtrl'
            })
            //班委签到tabs
            .state('Getpoint_tabs', {
                url: '/Getpoint_tabs',
                cache: false,
                abstract: true,
                templateUrl: 'templates/Getpoint-tabs.html'
            })
            //签到-班委个人签到页面
            .state('Getpoint_tabs.getpointstudent', {
                url: '/getpointstudent',
                cache: false,
                views: {
                    'Getpoint_tabs-getpointstudent': {
                        cache: false,
                        templateUrl: 'templates/student_getpoint.html',
                        controller: 'student_getpointCtrl'
                    }
                }
            })
            //签到-班级成员签到页面
            .state('Getpoint_tabs.members', {
                url: '/members',
                cache: false,
                views: {
                    'Getpoint_tabs-members': {
                        cache: false,
                        templateUrl: 'templates/Getpoint-members.html',
                        controller: 'MembersCtrl'
                    }
                }
            })

            //我的课表
            .state('MySchedule', {
                url: '/MySchedule',
                templateUrl: 'templates/MySchedule.html',
                controller: 'MyScheduleCtrl'
            })
            //      我的班级成员信息
            .state('myclass_students', {
                url: '/myclass_students',
                templateUrl: 'templates/myclass_students.html',
                controller: 'myclass_studentsCtrl'
            })
            //      我的班级成员详细信息
            .state('myclass_stu_preson', {
                url: '/myclass_students/:StuId',
                templateUrl: 'templates/myclass_stu_preson.html',
                controller: 'myclass_stu_presonCtrl'
            })
            //我的老师页面
            .state('myteachers', {
                url: '/myteachers',
                templateUrl: 'templates/students-myteacher.html',
                controller: 'MyTeachersCtrl'
            })

            //教师TABS
            .state('teachers_tab', {
                url: '/teachers_tab',
                cache: false,
                views: {
                    '': {
                        templateUrl: 'templates/teachers-tabs.html',
                        controller: 'TeachersTabsCtrl'
                    },
                    'index@teachers_tab': {
                        templateUrl: 'templates/teachers-index.html',
                        controller: 'TeachersIndexCtrl',
                        cache: false
                    },
                    'information@teachers_tab': {
                        templateUrl: 'templates/teachers-information.html',
                        controller: 'TeachersInformationCtrl',
                        cache: false
                    }

                }
            })

            ////教师tabs
            //.state('teachers_tab', {
            //    abstract: true,
            //    templateUrl: 'templates/teachers-tabs.html',
            //    controller: 'TeachersTabsCtrl'
            //})
            ////教师-首页九宫格页面
            //.state('teachers_tab.index',{
            //    url:'/index',
            //    views: {
            //        'teachers_tab-index' :{
            //            templateUrl: 'templates/teachers-index.html',
            //            controller: 'TeachersIndexCtrl'
            //        }
            //    }
            //})
            ////教师-个人信息页面
            //.state('teachers_tab.information',{
            //    url:'/teacherinformation',
            //    views: {
            //        'teachers_tab-information' :{
            //            templateUrl: 'templates/teachers-information.html',
            //            controller: 'TeachersInformationCtrl'
            //        }
            //    }
            //})
            //教师-信息发送页面
            .state('teacher_send', {
                url: '/teacher_send',
                templateUrl: 'templates/teacher-send.html',
                controller: 'TeacherSendCtrl'
            })

            //教师-调课tabs页面
            .state('teachaer_CourseAdjust_tab', {
                url: '/teachaer_CourseAdjust_tab',
                abstract: true,
                templateUrl: 'templates/teachaer-CourseAdjust-tabs.html'
            })
            //教师-调课申请页面
            .state('teachaer_CourseAdjust_tab.CourseAdjustment', {
                url: '/CourseAdjustment',
                views: {
                    'teachaer_CourseAdjust_tab-CourseAdjustment': {
                        templateUrl: 'templates/teacher-CourseAdjustment.html',
                        controller: 'CourseAdjustmentCtrl'
                    }
                }
            })
            //教师-申请情况页面
            .state('teachaer_CourseAdjust_tab.information', {
                url: '/CourseAdjustSituation',
                views: {
                    'teachaer_CourseAdjust_tab-CourseAdjustSituation': {
                        templateUrl: 'templates/teacher-CourseAdjustSituation.html',
                        controller: 'CourseAdjustSituationCtrl'
                    }
                }
            })
            //老师班级页面的学院列表
            .state('teacher_college',{
                url:'/teacher_college',
                templateUrl:'templates/teacher_class_college.html',
                controller:'teacher_collegeCtrl'
            })
            //老师班级页面的专业列表
            .state('teacher_profession',{
                url:'/teacher_college/:ColId',
                templateUrl:'templates/teacher_class_profession.html',
                controller:'teacher_professionCtrl'
            })
            //    老师页面的班级列表
            .state('teacher_class', {
                url: '/teacher_college/:ColId/:ProId',
                templateUrl: 'templates/teacher_class.html',
                controller: 'teacher_classCtrl'
            })
            //      老师页面的班级成员
            .state('teacher_students', {
                url: '/teacher_college/:ColId/:ProId/:ClaId',
                templateUrl: 'templates/teacher_students.html',
                controller: 'teacher_studentsCtrl'
            })
            //      老师页面的班级成员详情
            .state('teacher_stu_preson', {
                url: '/teacher_college/:ColId/:ProId/:ClaId/:StuId',
                templateUrl: 'templates/teacher_stu_preson.html',
                controller: 'teacher_stu_presonCtrl'
            })
            //老师审核请假页面
            .state('teacher_leavereview', {
                url: '/teacher_leavereview',
                templateUrl: 'templates/teacher-leavereview.html',
                controller: 'LeaveReviewCtrl'
            })
            //审核详情
            .state('teacher_leavereview_details', {
                url: '/teacher_leavereview/:LeaveId',
                templateUrl: 'templates/teacher-leavereview-details.html',
                controller: 'LeaveReviewDetailsCtrl'
            })
            //领导审核调课页面
            .state('teacher_Adjustreview', {
                url: '/teacher_Adjustreview',
                templateUrl: 'templates/teachaer-Adjustreview.html',
                controller: 'AdjustReviewCtrl'
            })
            //调课审核详情
            .state('teacher_Adjustreview_details', {
                url: '/teacher_Adjustreview/:AdjustId',
                templateUrl: 'templates/teachaer-Adjustreview-details.html',
                controller: 'AdjustReviewDetailsCtrl'
            })


            //教师权限在辅导员以上时候的考勤页面
            //考勤页面-学院列表
            .state('teacher_attendance_college',{
                url:'/teacher_attendance_college',
                templateUrl:'templates/teacher-attendance-college.html',
                controller:'AttCollegeCtrl'
            })
            //考勤页面-专业列表
            .state('teacher_attendance_profession',{
                url:'/teacher_attendance_college/:ColId',
                templateUrl:'templates/teacher-attendance-profession.html',
                controller:'AttProfessionCtrl'
            })
            //考勤页面-班级列表
            .state('teacher_attendance_class',{
                url:'/teacher_attendance_college/:ColId/:ProId',
                templateUrl:'templates/teacher-attendance-class.html',
                controller:'AttClassCtrl'
            })
            //考勤页面-班级考勤情况
            .state('teacher_attendance_personal',{
                url:'/teacher_attendance_college/:ColId/:ProId/:ClaId',
                templateUrl:'templates/teacher-attendance-personal.html',
                controller:'AttPersonalCtrl'
            })
            //考勤页面-班级成员个人旷课详情
            .state('teacher_attendance_personal_details',{
                url: '/teacher_attendance_college/:ColId/:ProId/:ClaId/:PreId',
                templateUrl: 'templates/teacher-attendance-personal-details.html',
                controller: 'AttDetailsCtrl'
            })



            //教师权限为3时的考勤页面
            //考勤情况
            .state('teacher_attendance',{
                url:'/teacher_attendance',
                templateUrl:'templates/teacher-attendance.html',
                controller:'AttendanceCtrl'
            })
            //考勤旷课详情
            .state('teacher_attendance_details',{
                url: '/teacher_attendance/:AttId',
                templateUrl: 'templates/teacher-attendance-details.html',
                controller: 'AttendanceDetailsCtrl'
            })

            .state('face',{
                url: '/face',
                templateUrl: 'templates/face.html',
                controller: 'FaceCtrl'
            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise(Page_address);
        //$urlRouterProvider.otherwise('face');
        $ionicConfigProvider.backButton.text('返回').icon('ion-chevron-left');
        $ionicConfigProvider.navBar.alignTitle("center"); //Places them at the bottom for all OS
        $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
        $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS
        $ionicConfigProvider.views.swipeBackEnabled(false); //禁用滑动返回
    })

