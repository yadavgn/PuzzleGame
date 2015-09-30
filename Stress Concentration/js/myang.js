Module = function(name, title, status, image, moduleName)
{
    this.name = name;
    this.title = title;
    this.status = status;
    this.image = image;
    this.moduleName = moduleName;
    
};
Input = function( displayName, val, calcUnit, displayUnit){
    this.displayName = displayName;
    //this.val = val;
    this.displayUnit = displayUnit;
    this.calcUnit = calcUnit;
    this.calcValue =0;
    
    this.value = function() {
        if(this.val == undefined) 
            return ;
        //this.calcValue =  math.eval(this.val +' '+ this.displayUnit + ' to ' + this.calcUnit);
        if(this.displayUnit == this.calcUnit){
            this.calcValue = this.val;
            return this.calcValue
        }
        var v = math.unit(this.val + ' '+ this.displayUnit);
        this.calcValue = v.toNumber(this.calcUnit);
        return this.calcValue;
    }
}

BandingShaft = function()
{
    this.CalcName = "Bending Shaft";
    this._M = new Input("M", 0, "Nmm", "Nmm");
    this._D = new Input("D", 0, "mm", "mm");
    this._d = new Input("d", 0, "mm", "mm");
    this._r = new Input("r", 0, "mm", "mm");
    this._t = new Input("t", 0, "mm", "mm");
    this._SigmaNominal = new Input("Sigma Nominal", 0, "Mpa", "Mpa");
    this._PeakStress = new Input("Peak Stress", 0, "Mpa", "Mpa");
    //this._SigmaNominal.val =10;

    this.CA1 = function() {
        return 0.947+1.206* this.A1() - 0.131 * this._t_by_r();
    };
    this.CA2 = function() {
        return 0.022- 3.405* this.A1() - 0.915 * this._t_by_r();
    };
    this.CA3 = function() {
        return 0.869+1.777* this.A1() - 0.555 * this._t_by_r();
    };
    this.CA4 = function() {
        return -0.81 + 0.422 * this.A1() - 0.26 * this._t_by_r();
    };

    this.CB1 = function() {
        return 1.232+0.832* this.A1() - 0.008 * this._t_by_r();
    };
    this.CB2 = function() {
        return -3.813 + 0.968 * this.A1() - 0.26 * this._t_by_r();
    };
    this.CB3 = function() {
        return 7.423 - 4.868 * this.A1() - 0.869 * this._t_by_r();
    };
    this.CB4 = function() {
        return -3.839 + 3.07 * this.A1() - 0.6 * this._t_by_r();
    };
    

    this._t_by_r = function(){
        var t_by_r;
        if(this._r.value() > 0)
            t_by_r = this._t.value()/this._r.value();
        else
            return "-";
        
        return t_by_r;
    };
    
 
    this.A1 = function(){
        return Math.sqrt(this._t_by_r());
    };
    
    this.t2_by_D = function() {
        if(this._D.value() > 0)
            return (this._t.value()*2)/ this._D.value();
        
        return "";
    };
    
    this.Kt = function() {
        var t2_by_d = this.t2_by_D();
        var t_by_r = this._t_by_r();
        var C1 = 0;
        var C2 = 0;
        var C3 = 0;
        var C4 = 0;
        
        if(t_by_r >= 0.1 && t_by_r <= 2.0 ){
            C1 = this.CA1();
            C2 = this.CA2();
            C3 = this.CA3();
            C4 = this.CA4();
        }else if(t_by_r >= 0.1 && t_by_r <= 2.0){ 
            C1 = this.CB1();
            C2 = this.CB2();
            C3 = this.CB3();
            C4 = this.CB4();
        }else
            return "No Calculation for this inputs";
    
        return  C1 + 
               (C2* t2_by_d) + 
                C3* t2_by_d * t2_by_d +
                C4 * t2_by_d * t2_by_d * t2_by_d; 
    };
    
    this.SigmaNominal = function() {
        var M = this._M.value();
        var d = this._d.value();
        var output = (32 * M)/( 3.142 * d *d *d);
        
        
        //this._SigmaNominal.val = output;
        
        return output;
    };

    
    this.PeakStress = function() {
        
        var output = this.SigmaNominal() * this.Kt();
        //this._PeakStress.val = output;
        return output;
    };
    
    this.Calculate = function(){
        this._PeakStress.val = this.PeakStress();
        
        this._SigmaNominal.val = this.SigmaNominal();
    };
    
    this.Reset = function() {
        this._M.val = new Input("M", 0, "Nmm", "Nmm");
        this._D = new Input("D", 0, "mm", "mm");
        this._d = new Input("d", 0, "mm", "mm");
        this._r = new Input("r", 0, "mm", "mm");
        this._t = new Input("t", 0, "mm", "mm");
        this._SigmaNominal = new Input("Sigma Nominal", 0, "Mpa", "Mpa");
        this._PeakStress = new Input("Peak Stress", 0, "Mpa", "Mpa");
    };
};


MyApp = function($scope,$http) {
    var app = this;
    
    app.currtheme = 'f'; 

    app.Holes = new Array();
    
    app.Holes.push( new Module( "Central Hole (Tension)", " This is title", "Not ready", "./imges/Img.png", "#"));
    app.Holes.push( new Module( "Central Hole (Bending)", " This is title", "Not ready", "./imges/Img.png", "#"));
    app.Holes.push( new Module( "Central Hole (Out of plane Bending)", " This is title", "Not ready", "./imges/Img.png", "#"));
    
    app.Shafts = new Array();
    
    app.Shafts.push( new Module( "U Notch Circular Shaft (Tension)", " This is title", "Not ready", "./imges/Img.png", "#"));
    app.Shafts.push( new Module( "U Notch Circular Shaft (Bending)", " This is title", "Not ready", "./imges/Img.png", "#"));
    app.Shafts.push( new Module( "U Notch Circular Shaft (Torsion)", " This is title", "Not ready", "./imges/Img.png", "#"));
    app.Shafts.push( new Module( "Stepped Circular Shaft (Tension)", " This is title", "Not ready", "./imges/Img.png", "#"));
    app.Shafts.push( new Module( "Stepped Circular Shaft (Bending)", " This is title", "Not ready", "./imges/Img.png", "#"));
    app.Shafts.push( new Module( "Stepped Circular Shaft (Torsion)", " This is title", "Not ready", "./imges/Img.png", "#"));
    app.Shafts.push( new Module( "Radial Hole Circular Shaft (Tension)", " This is title", "Not ready", "./imges/Img.png", "#"));
    
    app.BandingShaft = new BandingShaft();
    //mo.MouleCalcs = new
    app.Shafts.push( new Module( "Radial Hole Circular Shaft (Bending)", " This is title", "Ready", "./imges/Img.png", "#BendingShaft"));
    
    
    app.Shafts.push( new Module( "Radial Hole Circular Shaft (Torsion)", " This is title", "Not ready", "./imges/Img.png", "#"));
    
    app.myvalue = app.BandingShaft._M;
  }; 

// This code must be after MyApp Object is defined other wise it doesn't work.
angular.module('mApp', [])
       .controller('MainController', MyApp);


$( document ).on( "pagecontainerbeforechange", function ( event, data ) {
   	console.log('to Page: '+data.toPage );
});

