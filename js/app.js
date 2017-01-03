/**
 * Created by Administrator on 2016/8/31.
 */
    //1、创建模块
    //index.html的模块是studentApp,所以其他的模块必须注入到这个模块中
var studentApp = angular.module('studentApp', ['ui.router','studCtrlMod']);
//angularJS执行的第一个方法
studentApp.run(function($rootScope,$state,$stateParams){
    $rootScope.$state=$state;
    //全局都可以拿到$state这个服务,其他页面不需要引入ui.router
    $rootScope.$stateParams=$stateParams;
});
//2、配置路由
studentApp.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/login');
    $stateProvider.state('login',{
        //首页：login
        url:'/login',
        templateUrl:'./templs/login.html'
        //需要写一个login.html
    }).state('studList',{
        //列表页studList
        url:'/studList/{studSem:[0-9]{1,2}}',
        //第二种传参[0-9]{1,2}  0到9之间的数字取一到两位
        views:{
          '':{
              templateUrl:'./templs/studList.html'
          },
            'studSemester@studList':{
                templateUrl:'./templs/studSemester.html'
            },
            'studGrid@studList':{
                templateUrl:'./templs/studGrid.html'
            }
        }
    }).state('studAdd',{
        //新增页studAdd
        url:'/studAdd',
        templateUrl:'./templs/studAdd.html'
    }).state('studDetail',{
        //详情页 studDetail
        url:'/studDetail/:studSem/:studId',
        templateUrl:'./templs/studDetail.html'
    })
})

