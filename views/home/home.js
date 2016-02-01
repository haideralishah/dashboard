
angular.module('app')
    .controller("homeController", function($scope, $state, Auth, $rootScope, task){
        console.log("haider ali");

        $scope.addTodo = function(){
            $state.go("addTask");

        };
        $scope.taskref = task;

        task.$loaded(function(){
            console.log($scope.taskref.length);
            var remainIngTask = [];
            var completedTask = [];
            for (i = 0; i < $scope.taskref.length; i++) {
                if ($scope.taskref[i].statusTask == false){
                    remainIngTask.push($scope.taskref);
                }
                else{
                    completedTask.push($scope.taskref);
                }
            }
            $scope.remainingTask = remainIngTask.length;
            $scope.completedTask = completedTask.length;
            console.log($scope.remainingTask);
            console.log($scope.completedTask);
        });




        //console.log(remId.length);
        $scope.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        $scope.update = function (val) {

                var refToEditedTask = task;
                console.log(val);
                val.statusTask = true;
                //var abc = {taskTitle: val.taskTitle, statusTask : val.statusTask};
                console.log(val);
                refToEditedTask.$save(val)

                .then(function() {
                    task.$loaded(function(){
                        console.log($scope.taskref.length);
                        var remainIngTask = [];
                        var completedTask = [];
                        for (i = 0; i < $scope.taskref.length; i++) {
                            if ($scope.taskref[i].statusTask == false){
                                remainIngTask.push($scope.taskref);
                            }
                            else{
                                completedTask.push($scope.taskref);
                            }
                        }
                        $scope.remainingTask = remainIngTask.length;
                        $scope.completedTask = completedTask.length;
                        console.log($scope.remainingTask);
                        console.log($scope.completedTask);
                    });
                 });



        };

        $scope.deleteTask = function (val) {
            console.log(val);
            console.log($scope.taskref);
            var remId = $scope.taskref.$getRecord(val);
            $scope.taskref.$remove(remId)
                .then(function() {
                    task.$loaded(function(){
                        console.log($scope.taskref.length);
                        var remainIngTask = [];
                        var completedTask = [];
                        for (i = 0; i < $scope.taskref.length; i++) {
                            if ($scope.taskref[i].statusTask == false){
                                remainIngTask.push($scope.taskref);
                            }
                            else{
                                completedTask.push($scope.taskref);
                            }
                        }
                        $scope.remainingTask = remainIngTask.length;
                        $scope.completedTask = completedTask.length;
                        console.log($scope.remainingTask);
                        console.log($scope.completedTask);
                    });
                });
        };


        $scope.unOath = function () {
            console.log($rootScope.authData);
            $rootScope.authData = "";
            $state.go("signin");
        }

    });
