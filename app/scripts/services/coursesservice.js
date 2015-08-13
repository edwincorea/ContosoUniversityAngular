'use strict';

/**
 * @ngdoc service
 * @name contosoUniversityApp.coursesService
 * @description
 * # coursesService
 * Service in the contosoUniversityApp.
 */
angular.module('contosoUniversityApp')
  .service('coursesService', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    //var urlBase = '/api/courses';
    var urlBase = 'http://localhost:41787/api/courses';

    this.getProducts = function () {
      return $http.get(urlBase);
    };

    this.getProduct = function (id) {
      return $http.get(urlBase + '/' + id);
    };

    this.insertProduct = function (course) {
      return $http.post(urlBase, course);
    };

    this.updateProduct = function (course) {
      return $http.put(urlBase + '/' + course.ID, course)
    };

    this.deleteProduct = function (id) {
      return $http.delete(urlBase + '/' + id);
    };
  }]);
