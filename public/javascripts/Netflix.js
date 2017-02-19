
'use strict';

var app = angular.module('NetFlixSearch', []);

 app.filter('split', function() {
        return function(input, splitChar) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        }
      });

app.controller('SearchNetflix', function($scope, $http) {


 $scope.turnGreen = function (event){
    angular.element(event.target).toggleClass('color-change');
    };






// function to update search when user clicks on actor or director name
 $scope.updateVar = function (event) {
        $scope.searchQuery = angular.element(event.target).text().replace(/,|and/g, '').trim();
        getMovieResults();
        $scope.titleResult = [];
        $scope.directorResult=[];
        $scope.actorResult=[];
    };

    $scope.convertToArray = function(actorString,nb)
    {
      var array = actorString.split(',');
      $scope.actors = array;
    }

// Netflix  API Call 
    function getMovieResults () {
          $http.get("http://netflixroulette.net/api/api.php?title=" + $scope.searchQuery)
          .success(function(data)
            {   $scope.movietitle = true;
               $scope.titleResult.push(data);
              console.log(data);
            })
          .error(function()
            {
             $scope.movietitle = 'False'; 
            });
            
          $http.get("http://netflixroulette.net/api/api.php?director=" + $scope.searchQuery)
         .success(function(data)
            {
              $scope.director = true;
              for(var i=0;i<data.length;i++)
              $scope.directorResult.push(data[i]);
              console.log($scope.directorResult);
            })
            .error(function()
            {
             $scope.director = 'False'; 
            });
        


           $http.get("http://netflixroulette.net/api/api.php?actor=" + $scope.searchQuery)
           .success(function(data)
            {   
              $scope.actor=true;
              for(var i=0;i<data.length;i++)
              $scope.actorResult.push(data[i]);
              console.log(data);
            })
            .error(function()
            {
             $scope.actor = 'False'; 
            });
    }

    /**
     * binded to @user input form
     */
    $scope.fetchFromNetflix = function () {

      $scope.titleResult = [];
      $scope.directorResult=[];
      $scope.actorResult=[];
      $scope.movietitle = 'False';
      $scope.director = 'False';
      $scope.actor = 'False';
      getMovieResults();
    }

    
});