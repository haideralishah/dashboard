/**
 * Created by haider on 1/27/2016.
 */



angular.module('app')
    .controller("addTaskController", function($scope, $state, Auth, $rootScope, task){
        console.log("addTaskController");
        $scope.taskref = task;
        //console.log($scope.taskref.userName);
        //console.log(task);
        $scope.addItem = function (val) {
            console.log(val);
            $scope.taskref.$add({
                taskTitle : val.taskTitle,
                statusTask : false

            });
            $state.go("home")
        };



    });
