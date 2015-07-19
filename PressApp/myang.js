


UserProfile = function(name,lname, mobile, address1, address2, address3,email)
{
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
    this.OrderDate = new Date();
    this.PickupTimes = [ "8AM", "9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM"];
    this.PickupDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.pickupDaySelected = this.PickupDays[0];
    this.pickupTimeSelected = this.PickupTimes[0];
    
    this.PickUpDate = new Date();
    
    this.UpdatePickUpDate = function() {
        var t = new Date();
        //var dayofWeek = t.getDate();
        //var dayofWeek = t.getDay();
    };
    
    this.dayOfMonth = function() {
        return this.PickupDays.indexOf( this.pickupDaySelected );
    };
    
    this.dayOfWeek = function() {
        return this.pickupDaySelected;
    };
    this.pickupDate  = new Date();
    this.pickupTime = " Pickup Time";
    
    this.dayOfOrderPickup = function() {
        var pickIndex = this.PickupDays.indexOf( this.pickupDaySelected );
        var todayIndex = this.OrderDate.getDay();
        var daysfromToday = pickIndex - todayIndex;
        if(  daysfromToday < 0 ){
            daysfromToday += 7;
        }
        this.PickUpDate.setDate(this.pickupDate.getDate() + daysfromToday);
        this.PickUpDate.setHours(this.PickupTimes.indexOf(this.pickupTimeSelected) + 9);
        
        var timeIndex = this.PickupTimes.indexOf(this.pickupTimeSelected);
        
        this.pickupTime = this.pickupTimeSelected ;
        if(timeIndex < this.PickupTimes.length-1) 
            this.pickupTime += " to "+ (this.PickupTimes[timeIndex+1] );
        else 
            this.pickupTime += " to 10PM" ;

        return daysfromToday;
    };


};

// slect Day as today.
Order.prototype.UpdateDateTime = function(){
    this.pickupDaySelected = this.PickupDays[this.OrderDate.getDay()];
    this.pickupTimeSelected = this.PickupTimes[this.PickupTimes.length-1];
};


MyApp = function($scope,$http) {
    var app = this;
    app.myserver = "http://localhost/mywebs/TestApp/AngularPressAPp";
    app.OpenStartPage = function() {
        $.mobile.pageContainer.pagecontainer("change", "#start", {
            transition: "pop"
        });
    };

    
    app.saveProfile = function() {
        app.userProfile.saveUserProfile();
    };
    
    app.UpdateProfile = function() {
        
        app.userProfile.update(app.updatedProfile); 
        console.log("updated profile");
        
        app.RegisterUserToServer();
        
        app.saveProfile();
        console.log("User Profile saved");
        
        app.OpenStartPage();
    };
    
    app.RegisterUserToServer = function() {
        var _method ="PUT";
        if(app.userProfile.userID === undefined) _method = "POST";
        
        console.info("userProfile is: "+ app.userProfile);
        $http({
            url: app.myserver+'/php/RegisterUser.php',
            method: _method,
            data: app.userProfile
        })
        .then(function(response) {
            // success
            console.info(response.data);
            var data = response.data;
            if(data != 'undefined' && data.status == 'Success')
            {
                app.userProfile.userID = data.userID;
                app.saveProfile();
            }else if( data!= 'undefined' && data.status != 'Success')
            {
                // something is wrong please show appropriate error message.
            }
        }, 
        function(response) { // optional
            // failed
            console.info(response.data);
        });

    };
    app.RegisterUserProfile = function() {
        app.saveProfile();
        app.RegisterUserToServer();
        app.OpenStartPage();
    };
    
    app.OpenNewOrderPage = function() {
        
        if(app.Order == undefined) app.Order = new Order();
        
        $.mobile.pageContainer.pagecontainer("change", "#newOrder", {
            transition: "pop"
        });
        return false;
    };
    app.OpenProfilePage = function() {
        if(app.updatedProfile == undefined) 
            app.updatedProfile = new UserProfile();
        app.updatedProfile.update (app.userProfile); // create an updated copy of user profile.
        
        $.mobile.pageContainer.pagecontainer("change", "#profile", {
            transition: "pop"
        });
    };
    
    app.isAValidOrder = function(){
        var today = new Date();
        
        if(app.Order.PickUpDate > today)
            return true;
        return false;
    };
    
    app.PlaceOrder = function() {
            if(app.isAValidOrder() ) {

                app.OpenOrderConfirmatinPage();
            };
    };

    app.OpenOrderConfirmatinPage = function() {
        
        $.mobile.pageContainer.pagecontainer("change", "#confirmOrder", {
            transition: "pop"
        });
    };
    app.OnConfirmOrder = function() {
        //TODO: send this order Details to server and on success open Confirmation page.
        $http.get(app.server).then( function(data) {
            console.log(data);
        });
    }
    
    app.Order = new Order();

    app.GetSelected = function() {
        return 0;
    };
    // Check if User is already registered.
    if(app.userProfile == undefined) app.userProfile = new UserProfile();
    if( app.userProfile.isRegistered() ){
        app.userProfile.loadUserProfile();
        app.OpenStartPage();
    }
    
  }; 

// This code must be after MyApp Object is defined other wise it doesn't work.
angular.module('mApp', [])
       .controller('MainController', MyApp);


$( document ).on( "pagecontainerbeforechange", function ( event, data ) {
   	console.log('to Page: '+data.toPage );
});

