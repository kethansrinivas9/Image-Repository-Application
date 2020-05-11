(
  function (){
    'use strict';

    var myapp = angular.module('image_repository_app', ['ngFileUpload', 'ngRoute']);

    myapp.config(function($routeProvider){
      $routeProvider
            .when('/', {
              templateUrl: 'Client/index.html',
              controller  : 'mainController'
            })

            .when('/upload', {
              templateUrl: 'Client/up.html',
              controller  : 'mainController'
            })

            .when('/searchimages', {
              templateUrl: 'Client/searchimages.html',
              controller  : 'mainController'
            })

            .otherwise({
                redirectTo: "/somewhere"
            });
    });

    myapp.controller('mainController', mainController);
    mainController.$inject = ['$scope', 'Upload', '$http', '$location'];

    function mainController($scope, Upload, $http, $location){
      $scope.myHeader="my custom text";
      $scope.images = "";

      $scope.uploadFiles = function (files) {
          $scope.files = files;
          if (files && files.length) {
                  console.log(files);
                  var formdata = new FormData();
                  formdata.append('files', files);

              Upload.upload({
                    url: 'http://localhost:3002/imageUpload',
                    processData: false,
                    contentType: false,
                    data: {files: files}
                });
          }
      };

      $scope.getAllImages = function(){
        $http.get('http://localhost:3002/getAllImages/').then(function(response) {
            console.log(response["data"]);
            $scope.images = response["data"];
        });
      }

      $scope.getAllImages();

      $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path();
      };
    }

  }
)();
