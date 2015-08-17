<?php
include_once("orderDB.php");
include_once("userDB.php");

class OrderManager {
    
    private $UserID;
    private $Phone;
    private $Email;
    private $Add1;
    private $Add2;
    private $Add3;
    private $FirstName;
    private $LastName;
    
    private static $result;
    
    function RegisterUser ( $request ) {
        
        if( $this->ReadFirstName($request) &&
            $this->ReadMobileNumber($request) &&
            $this->ReadAddress($request) &&
            $this->ReadEmail($request) 
          ) {
            
            $var = new userDB();
            $result = $var->AddUser($this->UserID, $this->FirstName,$this->LastName, $this->Phone, $this->Add1, $this->Add2, $this->Add3, $this->Email);
            return $result;
        }
        
        return $this->result;
    }
    
    
    function ReadFirstName($request){
        if( isset( $request->fname ) ) {
            $FirstName = $request->fname;
            //return TRUE;
        }else {
            $this->result["status"] = "Fail";
            $this->result["message"] = "Please provide User name.";
            return FALSE;
        }
        
        if( isset( $request->lname ) ) {
            $LastName = $request->lname;
            //return TRUE;
        } else {
            $LastName = "";
            //$result["status"] = "Fail";
            //$result["message"] = "Please provide User name";
            //return FALSE;
        }
        return TRUE;
    }
    

    function ReadAddress($request){
        
        if( isset( $request->address1 ) ) {
            $Add1 = $request->address1;
            //return TRUE;
        }else {
            $this->result["status"] = "Fail";
            $this->result["message"] = "Please provide Address.";
            return FALSE;
        }
        
        if( isset( $request->address2 ) ) {
            $Add2 = $request->address2;
            //return TRUE;
        }else {
            $Add2 = null;
        }
        
        if( isset( $request->Address3 ) ) {
            $Add3 = $request->Address3;
            //return TRUE;
        }else {
            $Add3 = null;
        }
        
        return TRUE;
    }
    
    function ReadMobileNumber($request){
        if( isset( $request->mobile ) ) {
            $Phone = $request->mobile;
            //return TRUE;
        }else {
            $this->result["status"] = "Fail";
            $this->result["message"] = "Please provide Mobile Number.";
            return FALSE;
        }
        
        return TRUE;
    }
    
    function ReadEmail($request){
        if( isset( $request->Email ) ) {
            $Email = $request->Email;
            //return TRUE;
        }else {
            $Email = null;
        }
        
        return TRUE;
    }
}


?>