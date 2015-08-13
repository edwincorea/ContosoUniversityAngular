angular.module('contosoUniversityApp')
  .factory('coursesFactory', ['$http', function($http) {

    //var urlBase = '/api/courses';
    var urlBase = 'http://localhost:41787/api/courses';
    var coursesFactory = {};

    coursesFactory.getCourses = function () {
      return $http.get(urlBase);
    };

    coursesFactory.getCourse = function (id) {
      return $http.get(urlBase + '/' + id);
    };

    coursesFactory.insertCourse = function (course) {
      return $http.post(urlBase, course);
    };

    coursesFactory.updateCourse = function (course) {
      return $http.put(urlBase + '/' + course.ID, course)
    };

    coursesFactory.deleteCourse = function (id) {
      return $http.delete(urlBase + '/' + id);
    };

    return coursesFactory;
  }]);
