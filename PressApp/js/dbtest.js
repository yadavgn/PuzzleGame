
MyApp = function($scope,$http) {
    var app = this;
    app.myserver = "http://localhost/mywebs/PuzzleGame/PressApp";
    
    
    app.userProfile = undefined;
        
    // Check if User is already registered.
    if(app.userProfile == undefined) app.userProfile = new UserProfile();
    if( app.userProfile.isRegistered() ){
        app.userProfile.loadUserProfile();
        //app.OpenStartPage();
        
        //app.RetrievePreviousOrders();
    }else{
        
    }
    
    app.RegisterUser = function() {
        var _method ="PUT";
        _method = "POST";
        //app.showLoader("Registring request", true);
        var data = app.userProfile;
        data.RequestType = "RegisterUserProfile";
        data.UserID = app.userProfile.userID;
        
        $http({
            url: './php/Press.php',
            method: _method,
            data: data
        })
        .then(function(response) {
            app.response = response;
            // success
            console.info(response.data);
            var data = response.data;
            //app.showLoader(data, true);
            if(data != 'undefined' && data.status == 'Success')
            {
            	
                app.userProfile.userID = data.userID;
                //app.saveProfile();
                app.DisplayMessage(data.message, true,1000);

                
            }else if( data!= 'undefined' && data.status != 'Success')
            {

            	app.DisplayMessage(data.message, true, 1000); 
                // something is wrong please show appropriate error message.
            }
        }, 
        function(response) { // optional
            // failed
            console.info(response.data);
            app.DisplayMessage(data, true, 500); 
        });
        
    };
    
    
    
    app.UpdateUser = function() {
    
        var _method ="PUT";
        _method = "POST";
        //app.showLoader("Registring request", true);
        var data = app.userProfile;
        data.RequestType = "UpdateUserProfile";
        data.UserID = app.userProfile.userID;
        
        $http({
            url: './php/Press.php',
            method: _method,
            data: data
        })
        .then(function(response) {
            app.response = response;
            // success
            console.info(response.data);
            var data = response.data;
            //app.showLoader(data, true);
            if(data != 'undefined' && data.status == 'Success')
            {
            	
                app.userProfile.userID = data.userID;
                //app.saveProfile();
                app.DisplayMessage(data.message, true,1000);

                
            }else if( data!= 'undefined' && data.status != 'Success')
            {
            	
            	app.DisplayMessage(data.message, true, 1000); 
                // something is wrong please show appropriate error message.
            }
        }, 
        function(response) { // optional
            // failed
            console.info(response.data);
            app.DisplayMessage(data, true, 500); 
        });
        
        
    };
    
    app.response;
    
    
    app.showLoader = function(msgText, withtext) {
        var $this = $( '<div class="show-page-loading-msg" data-textonly="false" data-textvisible="true" data-msgtext="" data-inline="true">Icon + text</div>' ),
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