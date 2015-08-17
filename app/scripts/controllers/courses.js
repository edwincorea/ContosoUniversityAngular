'use strict';

/**
 * @ngdoc function
 * @name contosoUniversityApp.controller:CoursesCtrl
 * @description
 * # CoursesCtrl
 * Controller of the contosoUniversityApp
 */
angular.module('contosoUniversityApp')
  .controller('CoursesCtrl', ['$scope', 'coursesFactory',
    function ($scope, coursesFactory) {

      $scope.status;
      $scope.courses = [];

      getCourses();

      function getCourses() {
        coursesFactory.getCourses()
          .success(function (courses) {
            $scope.courses = courses;
          })
          .error(function (error) {
            $scope.status = 'Unable to load course data: ' + error.message;
          });
      }

      $scope.insertCourse = function () {
        //Fake course data
        var course = {
          ID: 10,
          FirstName: 'JoJo',
          LastName: 'Pikidily'
        };
        coursesFactory.insertCourse(course)
          .success(function () {
            $scope.status = 'Inserted Course! Refreshing course list.';
            $scope.courses.push(course);
          }).
          error(function(error) {
            $scope.status = 'Unable to insert course: ' + error.message;
          });
      };

      $scope.updateCourse = function (id) {
        var course;
        for (var i = 0; i < $scope.courses.length; i++) {
          var currCourse = $scope.courses[i];
          if (currCourse.ID === id) {
            course = currCourse;
            break;
          }
        }

        coursesFactory.updateCourse(course)
          .success(function () {
            $scope.status = 'Updated Course! Refreshing course list.';
          })
          .error(function (error) {
            $scope.status = 'Unable to update course: ' + error.message;
          });
      };

      $scope.deleteCourse = function (id) {
        coursesFactory.deleteCourse(id)
          .success(function () {
            $scope.status = 'Deleted Course! Refreshing course list.';
            for (var i = 0; i < $scope.courses.length; i++) {
              var course = $scope.courses[i];
              if (course.ID === id) {
                $scope.courses.splice(i, 1);
                break;
              }
            }
            $scope.courses = null;
          })
          .error(function (error) {
            $scope.status = 'Unable to delete course: ' + error.message;
          });
      };
    }]);
