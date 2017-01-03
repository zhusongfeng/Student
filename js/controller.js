/**
 * Created by Administrator on 2016/8/31.
 */
//用来写页面中用到的控制器
var studCtrlMod = angular.module('studCtrlMod', ['ngGrid']);
studCtrlMod.controller('loginCtrl',['$scope','$http','$state',function($scope,$http,$state){
    console.log($state);
    $scope.login=function(){
        //获取输入的内容
        $scope.userInfo={
            name:$scope.user_name,
            password:$scope.user_password
        };
        $http.get('./data/user.json').success(function(data){
            $scope.user=angular.fromJson(data);
            angular.forEach($scope.user,function(item){
                if(item.email==$scope.userInfo.name&&item.password==$scope.userInfo.password){
                    //实现页面跳转 $state是ui.route
                    $state.go('studList',{studSem:1});
                    //{studSem:1}传递冒号后面的参数。默认跳转到第一页
                    return;
                }
                alert('请先注册！谢谢')
            })
        })

    }
}]);
studCtrlMod.controller('gridCtrl',['$scope','$http','$stateParams',function($scope,$http,$stateParams){
    //定义分页部分数据
    $scope.totalServerItems=0;
    $scope.pagingOptions={
        pageSizes:[2,4,6],//定义下拉内容，显示
        pageSize:2,//定义默认下拉内容
        currentPage:1//定义默认是第几页

    };
    $scope.getpageData=function(pageSize,page){
        //参数1：pageSize当前页的数据条数
        // 参数2：page 当前展示的是哪一页
        //请求后台的数据   student1
        $http.get('./data/student'+$stateParams.studSem+'.json').success(function(data){
            //对数据截取的开始位置在在哪里  pageSize=2  page=1 page=2
            // 起始位置
            var start=(page-1)*pageSize;
            //slice 包前不包后，所以取值
            var end=data.length<=page*pageSize?data.length:page*pageSize;
            //获取当前页数据
            var pageData=angular.fromJson(data).slice(start,end);

            $scope.student=pageData;
            //设置数据的总条数
            $scope.totalServerItems=data.length;

        });
    };
    $scope.getpageData($scope.pagingOptions.pageSize,$scope.pagingOptions.currentPage);

    //监听pagingOptions的变化
    $scope.$watch('pagingOptions',function(newVal,oldVal){
        $scope.getpageData($scope.pagingOptions.pageSize,$scope.pagingOptions.currentPage);

    },true);
    //true深入比较，对象
    $scope.gridOptions={
        //将student数据绑定到表格中
        //当前页面展示的数据 student
        // 改变student中的数据
        data:'student',
        //对表格每一列的定义
        //rowTemplate:'',//行模块定义
        enableRowSelection:false,//取消默认样式
        columnDefs:[
            {
                field:'id',//每一列的属性名
                displayName:'序号'//每一列表头展示的名字
        },
            {
                field:'name',//每一列的属性名
                displayName:'姓名'//每一列表头展示的名字
            },
            {
                field:'sex',//每一列的属性名
                displayName:'性别'//每一列表头展示的名字
            },
            {
                field:'age',//每一列的属性名
                displayName:'年龄'//每一列表头展示的名字
            },
            {
                field:'tel',//每一列的属性名
                displayName:'电话',//每一列表头展示的名字
                width:'25%'//设置宽度25%或者100-->就是100px
            },
            {
                field:'semester',//每一列的属性名
                displayName:'学期'//每一列表头展示的名字
            },
            {
                //定义操作部分
                field:'id',//每一列的属性名
                displayName:'操作',//每一列表头展示的名字
                cellTemplate:'<div><a ui-sref="studDetail({studSem:$stateParams.studSem,studId:row.getProperty(col.field)})">详情</a></div>'//cellTemplate单元格模板
//row.getProprety(col.field)})固定写法，获取field的当前值
                //在HTML标签中$stateParams 需要取到的话，可以再$rootscope定义一个变量存储。如$rootscope.$stateParams=$stateParams
            }
        ],
        showFooter:true,//显示页脚部分
        enablePaging:true,//显示分页部分
        pagingOptions:$scope.pagingOptions,//在$scope定义这个值
        totalServerItems:'totalServerItems'//设置总条数
    }
    $scope.getpageData=function(pageSize,page){
        //参数1：pageSize当前页的数据条数
        // 参数2：page 当前展示的是哪一页
        //请求后台的数据   student1
            $http.get('./data/student'+$stateParams.studSem+'.json').success(function(data){
            //对数据截取的开始位置在在哪里  pageSize=2  page=1 page=2
            // 起始位置
            var start=(page-1)*pageSize;
            //slice 包前不包后，所以取值
            var end=data.length<=page*pageSize?data.length:page*pageSize;
            //获取当前页数据
            var pageData=angular.fromJson(data).slice(start,end);

            $scope.student=pageData;
            //设置数据的总条数
            $scope.totalServerItems=data.length;

        });
    };
}]);
studCtrlMod.controller('detailCtrl',['$scope','$stateParams','$http',function($scope,$stateParams,$http){
  //$stateParams 有两个属性名
    $http.get('./data/student'+$stateParams.studSem+'.json').success(function(data){
        $scope.students=angular.fromJson(data);
        //$scope.students是数组
        angular.forEach($scope.students,function(item){
            if(item.id==$stateParams.studId){
                //判断数据的ID值是否和参数一致
                $scope.student=item;
                // $scope.student 对象，需要
            }
        })
    })



}]);
studCtrlMod.controller('addCtrl',['$scope',function($scope){
    $scope.save=function(s){
        $scope.student=s;
       /* console.log( $scope.student);*/
    };
    // $scope.student 页面中需要保存的数据
    $scope.reset=function(){
        $scope.student={};
    }
}]);