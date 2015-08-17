'use strict';

/**
 * @ngdoc service
 * @name contosoUniversityApp.coursesService
 * @description
 * # coursesService
 * Service in the contosoUniversityApp.
 */
angular.module('contosoUniversityApp')
  .service('coursesService', ['$http', '$q', function($http, $q) {
    var urlBase = 'http://localhost/api/courses';
    var coursesService = {};

    coursesService.getCourses = function () {
      var deferred = $q.defer();
      $http.get(urlBase)
        .success(function(data) {
          var transformedData = [];
          transformedData = jQuery.map(data, function (obj) {
            return {
              'id': obj.CourseID,
              'course': obj.Title,
              'credits': obj.Credits,
              'departmentId': obj.DepartmentID,
              'department': obj.DepartmentName
            };
          });
          deferred.resolve(transformedData);
        }).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
        });
      return deferred.promise;
    };

    coursesService.insertCourse = function (course) {
      var deferred = $q.defer();
      $http.post(urlBase, course)
        .success(function(data) {
          deferred.resolve(data);
        }).error(function(msg, code) {
          deferred.reject(msg);
        });
      return deferred.promise;
    };

    coursesService.updateCourse = function (id, course) {
      var deferred = $q.defer();
      var url = urlBase + '/' + id;
      $http.put(url, course)
        .success(function(data) {
          deferred.resolve(data);
        }).error(function(msg, code) {
          deferred.reject(msg);
        });
      return deferred.promise;
    };

     coursesService.getCourse = function (id) {
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

     coursesService.deleteCourse = function (id) {
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

    return coursesService;
  }]);
