angular.module('someApp', [])
  .controller('SomeController', function() {
    var vm = this;
    vm.personData = {
      name: "Jane Doe",
      age: 100,
      email: ""
    };

  });