/**
 * Created by haider on 1/26/2016.
 */

angular.module('app')
    .controller("signinController", function($scope, $state, Auth, $rootScope){
        console.log("haider ali");

        /*var ref = new Firebase("https://haileetodo.firebaseio.com");*/
        $scope.login = function() {
            Auth.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);

                    $rootScope.authData = authData;
                    $state.go("home");


                }
            });
        }



    });
