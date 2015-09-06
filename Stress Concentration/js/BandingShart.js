MyApp = function($scope,$http) {
    var app = this;
    
    this.currtheme = 'c'; 
    this.themes = [ 'a', 'b', 'c'];

  }; 

// This code must be after MyApp Object is defined other wise it doesn't work.
angular.module('myApp', [])
       .controller('MainController', MyApp);


$( document ).on( "pagecontainerbeforechange", function ( event, data ) {
   	console.log('to Page: '+data.toPage );
});