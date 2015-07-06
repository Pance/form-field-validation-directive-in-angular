angular.module('someApp')
  .directive('formFieldValidation', function() {
    return {
      restrict: 'E',
      transclude: 'true',
      templateUrl: 'form-field-validation.html',
      link: {
        pre: function(scope, element, attrs) {
          scope.formField = attrs.formField;
        }
      }
    };
  });
