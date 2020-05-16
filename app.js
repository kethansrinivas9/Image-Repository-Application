(
  function (){
    'use strict';

    var myapp = angular.module('image_repository_app', ['ngFileUpload', 'ngRoute', 'infinite-scroll']);

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
      $scope.ShowLoadMore = true;
      $scope.maxItemsToDisplay = 4;
      $scope.showSpinner = true;

      $scope.getAllImages = function () {
        $http.get('http://localhost:3002/getAllImages/').then(function(response) {
            console.log("Getting all images from database...")
            $scope.images = response["data"];
            $scope.showSpinner = false;
            $scope.maxRecordsLength = $scope.images.length;
        });
      }

      // Invoke the function getAllImages() only if the function getAllImages is not invoked before
      if ($scope.maxRecordsLength == undefined){
        console.log($scope.maxRecordsLength);
        $scope.getAllImages();
      }

      // Load more images function is invoked only when there are more images to display
      $scope.loadMore = function () {
        console.log("loading more images...");
        if($scope.maxRecordsLength - $scope.maxItemsToDisplay >= 4){
            $scope.maxItemsToDisplay += 4;
        } else if(typeof $scope.maxRecordsLength != "undefined"){
          $scope.maxItemsToDisplay = $scope.maxRecordsLength;
          $scope.ShowLoadMore = false;
        }
      };


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

      // This code is to make the tab in the navigation bar active
      $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path();
      };
    }

  }
)();
