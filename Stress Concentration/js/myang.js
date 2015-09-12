Module = function(name, title, status, image)
{
    this.name = name;
    this.title = title;
    this.status = status;
    this.image = image;
};

MyApp = function($scope,$http) {
    var app = this;
    
    this.currtheme = 'c'; 
    this.themes = [ 'a', 'b', 'c'];

    app.Modules = new Array();
    
    app.Modules.push( new Module( "Test Module 1", " This is title", "Not ready", "./imges/Img.png"));
    app.Modules.push( new Module( "Test Module 2", " This is title", "Not ready", "./imges/Img.png"));
    app.Modules.push( new Module( "Test Module 2", " This is title", "Not ready", "./imges/Img.png"));
    
    

  }; 

// This code must be after MyApp Object is defined other wise it doesn't work.
angular.module('mApp', [])
       .controller('MainController', MyApp);


$( document ).on( "pagecontainerbeforechange", function ( event, data ) {
   	console.log('to Page: '+data.toPage );
});

