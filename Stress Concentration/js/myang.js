


UserProfile = function(name,lname, mobile, address1, address2, address3,email) {
    this.userID = undefined; // This field must be populated from Web server to identify user.
	this.fname = name;
    this.lname = lname;
	this.mobile = mobile;
	this.address1 = address1;
	this.address2 = address2;
	this.address3 = address3;
	this.email = email;	
};

UserProfile.prototype.isRegistered = function() {
	return !(localStorage.userprofile === undefined);
};

///Read it from local storage and create object.
UserProfile.prototype.loadUserProfile = function() {
	
	var profile = JSON.parse(localStorage.userprofile);
	if(!this.isRegistered())	return this;
    
    this.userID = profile.userID;
	this.fname = profile.fname;
    this.lname = profile.lname;
	this.mobile = profile.mobile;
	this.address1 = profile.address1;
	this.address2 = profile.address2;
	this.address3 = profile.address3;
	this.email = profile.email;
    console.log("User Profile read from DB successfully.");
	return this;
};


UserProfile.prototype.saveUserProfile = function(){
    localStorage.userprofile = JSON.stringify(this);
    console.log("User Profile saved into local DB. Successfully");

};

UserProfile.prototype.update = function(newProfile){
    if(newProfile == undefined) return;
    
    this.userID = newProfile.userID;
    this.fname = newProfile.fname;
    this.lname = newProfile.lname;
    this.mobile = newProfile.mobile;
    this.address1 = newProfile.address1;
    this.address2 = newProfile.address2;
    this.address3 = newProfile.address3;
    this.email = newProfile.email;
};

UserProfile.prototype.isRegistered = function() {
	return !(localStorage.userprofile === undefined);
};

UserProfile.prototype.loadUserProfile = function() {
	
	var profile = JSON.parse(localStorage.userprofile);
	if(!this.isRegistered())	return this;

    this.userID = profile.userID;
	this.fname = profile.fname;
    this.lname = profile.lname;
	this.mobile = profile.mobile;
	this.address1 = profile.address1;
	this.address2 = profile.address2;
	this.address3 = profile.address3;
	this.email = profile.email;
	return this;
};

// This object which contains Order Details.
Order = function() {
    this.userID = undefined;
    this.Status = "New"
    this.OrderDate = new Date();
    this.PickupTimes = [ "8AM", "9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM"];
    this.PickupDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.pickupDaySelected = this.PickupDays[0];
    this.pickupTimeSelected = this.PickupTimes[0];
    
    this.PickUpDate = new Date();
    this.PickUpTime = "pickup Time";

    this.UpdatePickUpDate = function() {
        var pickIndex = this.PickupDays.indexOf( this.pickupDaySelected );
        var todayIndex = this.OrderDate.getDay();
        var daysfromToday = pickIndex - todayIndex;
        if(  daysfromToday < 0 ){
            daysfromToday += 7;
        }
        var today = new Date();
      
        this.PickUpDate.setDate(today.getDate() + daysfromToday);
        this.PickUpDate.setHours(this.PickupTimes.indexOf(this.pickupTimeSelected) + 8);


        ///// Updated Pick Time which should be displayed on Confirmatin page.
        var timeIndex = this.PickupTimes.indexOf(this.pickupTimeSelected);
        
        this.PickUpTime = this.pickupTimeSelected ;
        if(timeIndex < this.PickupTimes.length-1) 
            this.PickUpTime += " to "+ (this.PickupTimes[timeIndex+1] );
        else 
            this.PickUpTime += " to 10PM" ;

        return 1;
    };

    this.dayOfMonth = function() {
        return this.PickupDays.indexOf( this.pickupDaySelected );
    };
    
    this.dayOfWeek = function() {
        return this.pickupDaySelected;
    };
    
};


Sur = function(nm, duration) {
    this.name = nm;
    this.duration = duration;
};

Dhune = function(){
    this.name = "my dhune";
    this.Surs = new Array();
    this.PopulateDune = function(){
        //for(var i = 0; i <20; i++) {
            this.Surs.push(new Sur("Sa", 2));
            this.Surs.push(new Sur("Re", 2));
            this.Surs.push(new Sur("Ga", 2));
            this.Surs.push(new Sur("Ma", 2));
            this.Surs.push(new Sur("Pa", 2));
            this.Surs.push(new Sur("Da", 2));
            this.Surs.push(new Sur("Ni", 2));
            this.Surs.push(new Sur("Sa", 2));
        //}
    };
    //this.PopulateDune();
};

MyApp = function($scope,$http) {
    var app = this;
    
    this.currtheme = 'c'; 
    this.themes = [ 'a', 'b', 'c'];

    
    
    
    
    app.showLoader = function(msgText, withtext) {
        var $this = $( '<button class="show-page-loading-msg" data-textonly="false" data-textvisible="true" data-msgtext="" data-inline="true">Icon + text</button>' ),
            theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
            //msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
            textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
            textonly = !!$this.jqmData( "textonly" );
            html = $this.jqmData( "html" ) || "";
        $.mobile.loading( "show", {
                text: msgText,
                textVisible: true,
                theme: theme,
                textonly: withtext,
                html: html
        });
    };
    
	app.DisplayMessage = function (msg, withtext, duration){

		app.showLoader(msg, withtext); 
			setTimeout(function() {
				app.hideLoader();
				//app.OpenStartPage(); // Go back to Start Page.
		}, duration);
	};


    app.hideLoader = function() {
        $.mobile.loading( "hide" );
    };
    

  }; 

// This code must be after MyApp Object is defined other wise it doesn't work.
angular.module('mApp', [])
       .controller('MainController', MyApp);


$( document ).on( "pagecontainerbeforechange", function ( event, data ) {
   	console.log('to Page: '+data.toPage );
});

