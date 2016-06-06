'use strict';
angular
  .module('PitchEvaluator')
  .controller('TeamCtrl', function($rootScope, $scope, permissionsService, $firebaseObject, $firebaseArray, $location, loggedinCheck, teamService, userService, db_url) {

    loggedinCheck.check();

    if (!permissionsService.isPermitted('TeamView')) {
      if ($rootScope.role == 'Admin'){
          $location.path('view1');
      }
      else if ($rootScope.role == 'Judge'){
          $location.path('judge');
      }
      else {
        $location.path('login');
      }
    }

    var teamRef = new Firebase($rootScope.sessionRef + "/teams/" + $rootScope.teamID);
    var team = new $firebaseObject(teamRef);

    var reviewRef = new Firebase($rootScope.sessionRef + "/teams/" + $rootScope.teamID + "/reviews");
    $scope.reviews = $firebaseArray(reviewRef);

    $scope.avg = {};
    team.$loaded(function() {
      $rootScope.teamName = team.name;
      $scope.avg.q1 = team.q1Val;
      $scope.avg.q2 = team.q2Val;
      $scope.avg.q3 = team.q3Val;
      $scope.avg.q4 = team.q4Val;
      $scope.avg.q5 = team.q5Val;
      $scope.avg.q6 = team.q6Val;
      $scope.avg.q7 = team.q7Val;
    });

    $scope.check = function(str) {
      if (str!="") return true;
      else return false;
    }
    $scope.reviews.$loaded(function() {
      $scope.reviews.forEach(function(review) {
        if (review.q8=="1") {
          review.continue = "Yes";
        }
        else {
          review.continue = "No";
        }

      });
    });
  })
