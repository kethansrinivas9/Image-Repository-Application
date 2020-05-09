(
  function (){
    'use strict';

    angular.module('image_repository_app', ['ngFileUpload']).controller('mainController', mainController);

    mainController.$inject = ['$scope', 'Upload', '$http'];

    function mainController($scope, Upload, $http){
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
            //["data"][0].image.data
            $scope.images = response["data"];
        });
    }
    }
  }
)();
