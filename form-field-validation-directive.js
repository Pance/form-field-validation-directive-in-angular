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
  })
  .directive('validationErrorMessages', function() {
    // This directive will not work unless it is a child of a formFieldValidation directive

    return {
      restrict: 'E',
      transclude: 'true',
      templateUrl: 'validation-error-messages.html',
      scope: false, // use the same scope as the parent
      link: function(scope, element, attrs) {
        var formFieldSplit = scope.$parent.formField.split('.');
        var formName = formFieldSplit[0];
        var fieldName = formFieldSplit[1];

        //watch the form input field object for a couple of flags
        scope.$watchGroup([
            "$parent."+formName+"."+fieldName+".$invalid",
            "$parent."+formName+"."+fieldName+".$dirty"],
          determineVisibility);

        function determineVisibility(newValue) {
          var dvFormField = scope.$parent[formName][fieldName];
          // The links for this directive will be set up when the field does not exist in the form yet
          if(_.isUndefined(dvFormField)){
            // don't try to do anything with the form field because it is undefined, at the moment
            return;
          }

          if(dvFormField.$invalid && dvFormField.$dirty) {
            // we have some errors to show
            element.removeAttr('hidden');
          } else {
            element.attr('hidden', '');
          }
        }
      }
    };
  })
  .directive('invalidMessage', function() {
    return {
      restrict: 'E',
      transclude: 'true',
      templateUrl: 'invalid-message.html',
      scope: false,
      link: function(scope, element, attrs) {
        var formFieldSplit = scope.$parent.formField.split(".");
        var formName = formFieldSplit[0];
        var fieldName = formFieldSplit[1];

        var ifField = attrs.ifField;
        scope.$watch("$parent."+formName+"."+fieldName+"."+ifField, determineErrorMessageVisibility);

        function determineErrorMessageVisibility(newValue) {
          if(_.isUndefined(newValue)) {
            // undefined basically means there is NO error, so hide the error message
            element.attr("hidden", "");
          } else {
            element.removeAttr("hidden");
          }
        }
      }
    };
  });
