'use strict';

/**
 * @ngdoc service
 * @name contosoUniversityApp.departmentsService
 * @description
 * # departmentsService
 * Service in the contosoUniversityApp.
 */
angular.module('contosoUniversityApp')
  .service('departmentsService', ['$http', '$q', function($http, $q) {
    var urlBase = 'http://localhost/api/departments';
    var departmentsService = {};

    departmentsService.getDepartments = function () {
      var deferred = $q.defer();
      $http.get(urlBase)
        .success(function(data) {
          var transformedData = [];
          transformedData = jQuery.map(data, function (obj) {
            return {
              'id': obj.DepartmentID,
              'name': obj.Name
            };
          });
          deferred.resolve(transformedData);
        }).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
        });
      return deferred.promise;
    };

    departmentsService.insertDepartment = function (department) {
      var deferred = $q.defer();
      $http.post(urlBase, department)
        .success(function(data) {
          deferred.resolve(data);
        }).error(function(msg, code) {
          deferred.reject(msg);
        });
      return deferred.promise;
    };

    departmentsService.updateDepartment = function (id, department) {
      var deferred = $q.defer();
      var url = urlBase + '/' + id;
      $http.put(url, department)
        .success(function(data) {
          deferred.resolve(data);
        }).error(function(msg, code) {
          deferred.reject(msg);
        });
      return deferred.promise;
    };

     departmentsService.getDepartment = function (id) {
       var deferred = $q.defer();
       var url = urlBase + '/' + id;
       $http.get(url)
         .success(function(data) {
           deferred.resolve(data);
         }).error(function(msg, code) {
           deferred.reject(msg);
         });
       return deferred.promise;
     };

     departmentsService.deleteDepartment = function (id) {
       var deferred = $q.defer();
       var url = urlBase + '/' + id;
       $http.delete(url)
         .success(function(data) {
           deferred.resolve(data);
         }).error(function(msg, code) {
           deferred.reject(msg);
         });
       return deferred.promise;
     };

    return departmentsService;
  }]);
