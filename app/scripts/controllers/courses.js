'use strict';

/**
 * @ngdoc function
 * @name contosoUniversityApp.controller:CoursesCtrl
 * @description
 * # CoursesCtrl
 * Controller of the contosoUniversityApp
 */
angular.module('contosoUniversityApp')
  .controller('CoursesCtrl', ['$scope', 'coursesService',
    function ($scope, coursesService) {

      $scope.status='';
      $scope.courses=[];
      $scope.loading = true;

      getCourses();

      //UI Grid configuration
      //Column definitions
      $scope.columns = [
        { name: 'id', visible: false },
        { name: 'course', displayName: 'Course' },
        { name: 'credits', displayName: 'Credits' },
        { name: 'departmentId', visible: false },
        { name: 'department', displayName: 'Department', enableCellEdit: false}
      ];

      //Options for displaying the grid
      $scope.gridOptions = {
        data: $scope.courses,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 5,
        enableSorting: true,
        enableGridMenu: true,
        enableFiltering: true,
        enableColumnResize: true,
        enableCellEditOnFocus: false,
        columnDefs: $scope.columns,
        onRegisterApi: function (gridApi) {
          //set gridApi on scope
          $scope.gridApi = gridApi;
          gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
        }
      };

      $scope.saveRow = function( rowEntity ) {
        var course = {
          CourseID: rowEntity.id,
          Title: rowEntity.course,
          Credits: rowEntity.credits,
          DepartmentID: rowEntity.departmentId
        };
        var promise = $scope.updateCourse(rowEntity.id, course);
        $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise);
      };

      //REST API Calls
      function getCourses() {
        coursesService.getCourses()
          .then(function(data) {
            $scope.gridOptions.data = data;
          }, function(error) {
            $scope.status = 'Unable to load course data: ' + error;
          })
          .finally(function() {
            $scope.loading = false;
          });
      }

      $scope.addData= function () {
        var course = {
          Title: $('course').val(),
          Credits: $('credits').val(),
          DepartmentID: $('department').val()
        };

        coursesService.insertCourse(course)
          .then(function(data) {
            $scope.gridOptions.data = data;
          }, function(error) {
            $scope.status = 'Unable to load course data: ' + error;
          })
          .finally(function() {
            $scope.loading = false;
          });
      }

      $scope.getCourse = function (id) {
        var promise = coursesService.getCourse(id)
        promise.then(function(data) {
          return data;
        }, function(error) {
          $scope.status = 'Course was not found!';
        }).finally(function() {
          $scope.loading = false;
        });
      };

      $scope.insertCourse = function (course) {
        var promise = coursesService.insertCourse(course);
        promise.then(function(data) {
          $scope.status = 'Inserted Course! Refreshing course list.';
          $scope.courses.push(course);
        }, function(error) {
          $scope.status = 'Unable to insert course: ' + msg + " " + code;
        }).finally(function() {
          $scope.loading = false;
        });

        return promise;
      };

      $scope.updateCourse = function (id, course) {
        var promise = coursesService.updateCourse(id, course);
        promise.then(function(data) {
          $scope.status = 'Updated Course! Refreshing course list.';
          $scope.courses.push(course);
        }, function(error) {
          $scope.status = 'Unable to update course: ' + error.message;
        }).finally(function() {
          $scope.loading = false;
        });

        return promise;
      };

      $scope.deleteCourse = function (id) {
        var promise = coursesService.deleteCourse(id);
        promise.then(function(data) {
          $scope.status = 'Deleted Course! Refreshing course list.';
          $scope.courses.push(course);
        }, function(error) {
          $scope.status = 'Unable to delete course: ' + error.message;
        }).finally(function() {
          $scope.loading = false;
        });

        return promise;
      };
    }]);
