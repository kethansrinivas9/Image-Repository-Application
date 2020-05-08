(
  function (){
    'use strict';

    angular.module('image_repository_app', ['ngFileUpload']).controller('mainController', mainController);

    mainController.$inject = ['$scope', 'Upload', '$timeout'];

    function mainController($scope, Upload, $timeout){
      $scope.myHeader="my custom text";


      $scope.uploadFiles = function (files) {
          $scope.files = files;
          if (files && files.length) {
                  console.log(files);
                  var formdata = new FormData();
                  formdata.append('files', files);

              Upload.upload({
                    url: 'http://localhost:3002/imageUpload',
                    processData: false, // important
                    contentType: false, // important
                    data: {files: files}
                }).then(function (response) {
                  $timeout(function () {
                      $scope.result = response.data;
                  });
              }, function (response) {
                  if (response.status > 0) {
                      $scope.errorMsg = response.status + ': ' + response.data;
                  }
              }, function (evt) {
                  $scope.progress =
                      Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
              });
          }
      };
    }
  }
)();
