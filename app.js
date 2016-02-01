/**
 * Created by haider on 1/11/2016.
 */


angular

    .module('app', ["ngMaterial", "ngMdIcons", "firebase", "ui.router"])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'loginController',
                templateUrl: './views/login/login.html'
            })
            .state('signin', {
                url: '/signin',
                controller: 'signinController',
                templateUrl: './views/signin/signin.html'
            })
            .state('addTask', {
                url: '/addTask',
                controller: 'addTaskController',
                templateUrl: './views/addTask/addTask.html'
            })

            .state('home', {
                url: '/home',
                controller: 'homeController',
                templateUrl: './views/home/home.html'
        })

        ;
        $urlRouterProvider
            .otherwise('/signin');
    })






    .factory("Auth", function($firebaseAuth) {
        var usersRef = new Firebase("https//haileetodo.firebaseio.com/");
       /* var abc = [];
        usersRef.child("facebook:493416097488587").on('child_added', function(snapshot){
            console.log(snapshot.key())
            abc.push(snapshot.val())
            console.log(abc.length);
        });*/
        return usersRef;
    })

    .factory("task", function($firebaseArray, Auth, $rootScope) {
        itemsRef = new Firebase("https//haileetodo.firebaseio.com/" + $rootScope.authData.uid);
        return $firebaseArray(itemsRef);
    })


    .controller("oathPageController", function($scope, Auth, $rootScope){

        var ref = new Firebase("https://haileetodo.firebaseio.com");
        $scope.login = function() {
            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);

                    $rootScope.data = authData;


                }
            });
        }



    })

    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {

        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };
        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }
        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }
    })
    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };
    })
    .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    });
