


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

    
    /*app.myserver = "http://localhost/mywebs/PuzzleGame/PressApp";
    app.OpenStartPage = function() {
        $.mobile.pageContainer.pagecontainer("change", "#start", {
            transition: "pop"
        });
    };

    this.OnCancelCurrentOrder = function() {
    	history.go(-1);
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
        
        //app.OpenStartPage();
    };
    
    app.RegisterUserToServer = function() {
        var _method ="PUT";
        if(app.userProfile.userID === undefined) _method = "POST";
        app.showLoader("Registring request", true);
        
        console.info("userProfile is: "+ app.userProfile);
        $http({
            url: './php/RegisterUser.php',
            method: _method,
            data: app.userProfile
        })
        .then(function(response) {
            // success
            console.info(response.data);
            var data = response.data;
            app.showLoader(data, true);
            if(data != 'undefined' && data.status == 'Success')
            {
            	
                app.userProfile.userID = data.userID;
                app.saveProfile();
                app.DisplayMessage(data.Message, true,1000);

                setTimeout(function() {
                	app.OpenStartPage(); // Go back to Start Page.
                }, 1000);
                
            }else if( data!= 'undefined' && data.status != 'Success')
            {
            	app.DisplayMessage("Somthing is wrong. Please try again later", true, 500); 
                // something is wrong please show appropriate error message.
            }
        }, 
        function(response) { // optional
            // failed
            console.info(response.data);
            app.DisplayMessage(data, true, 500); 
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
        var now = new Date();
        app.Order.UpdatePickUpDate();

        if(app.Order.PickUpDate > now)
            return true;
        return false;
    };
        
    app.Orders = new Array();
    
    app.PlaceOrder = function() {
            if(app.isAValidOrder() ) {

                app.OpenOrderConfirmatinPage();
            };
    };
    
    app.OpenOrderHistoryPage = function() {
        //app.Orders.push(new Order());
        var data1 = JSON.stringify(app.userProfile);
        console.log(data1);
        $http({
            url: app.myserver+'/php/RegisterOrder.php',
            method: "POST",
            params: {userID : "45"}
        })
        .then(function(response) {
            // success
            console.info(response.data);
            var data = response.data;
            if(data != 'undefined' && data.status == 'Success')
            {
                app.Orders.push(app.Order);
                //app.Order = new Order();
                //app.userProfile.userID = data.userID;
                //app.saveProfile();
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

    app.OpenOrderConfirmatinPage = function() {
        
        $.mobile.pageContainer.pagecontainer("change", "#confirmOrder", {
            transition: "pop"
        });
    };
    app.OnConfirmOrder = function() {
        
        app.Order.userID = app.userProfile.userID;
        //TODO: need to register First.
        
        if(app.userProfile.userID == undefined){
        
            app.OpenProfilePage();
            return ;
        }
        
        app.showLoader('test Text', true);
        
        
        console.info("userProfile is: "+ app.userProfile);
        $http({
            url: app.myserver+'/php/RegisterOrder.php',
            method: "POST",
            data: app.Order
        })
        .then(function(response) {
            // success
            console.info(response.data);
            var data = response.data;
            if(data != 'undefined' && data.status == 'Success')
            {
                app.Orders.push(app.Order);
                app.Order = new Order();
                //app.userProfile.userID = data.userID;
                //app.saveProfile();
            }else if( data!= 'undefined' && data.status != 'Success')
            {
                // something is wrong please show appropriate error message.
            }
            
            app.DisplayMessage("Order placed Successfully.", true, 700);
            
        }, 
        function(response) { // optional
            // failed
            console.info(response.data);
            app.showLoader("Couldn't place order please try again after some time.");
            setTimeout(app.hideLoader, 700);
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
    
    app.UpdateOrderHistory = function() {
        
        $http({
            url: app.myserver+'/php/GetOrders.php',
            method: "POST",
            data: app.userProfile
        })
        .then(function(response) {
            // success
            console.info(response.data);
            var data = response.data;
            if(data != 'undefined' && data.status == 'Success')
            {
                var result = data.result;
                for(var i=0; i< result.length; i++)
                {
                    app.Orders.push(result[i]);
                }
                
                app.Order = new Order();
                //app.userProfile.userID = data.userID;
                //app.saveProfile();
            }else if( data!= 'undefined' && data.status != 'Success')
            {
                // something is wrong please show appropriate error message.
            }
            
            //app.DisplayMessage("Order placed Successfully.", true, 700);
            
        }, 
        function(response) { // optional
            // failed
            console.info(response.data);
            //app.showLoader("Couldn't place order please try again after some time.");
            //setTimeout(app.hideLoader, 700);
        });
    };
    
    app.UpdateOrderHistory();
    
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
    
    */
  }; 

// This code must be after MyApp Object is defined other wise it doesn't work.
angular.module('mApp', [])
       .controller('MainController', MyApp);


$( document ).on( "pagecontainerbeforechange", function ( event, data ) {
   	console.log('to Page: '+data.toPage );
});

