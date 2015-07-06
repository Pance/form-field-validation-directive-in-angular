angular.module('someApp')
  .directive('formFieldValidation', function($compile) {
    return {
      restrict: 'E',
      transclude: 'true',
      templateUrl: 'field-validation.html',
      link: {
        pre: function(scope, element, attrs) {
          scope.formField = attrs.formField;
        }
      }
    };
  });
