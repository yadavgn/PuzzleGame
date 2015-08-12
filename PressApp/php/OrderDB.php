<?php

class orderDB
{
	private $conn ;
	public function __construct () {
		
	}

	public function isConnected()
	{
		if( $this->conn->connect_error ){
			return false;
		}
		return true;
	}
	
	public function Getorder($userID)
	{
		$output = array();
		$this->OpenConnection();
		if( $this->isConnected() ){
			//echo 'test connection passed';
			$sql = "SELECT * FROM orderdetail WHERE CustomerID = '$userID'";
            //$sql = "SELECT * FROM orderdetails ";
			$result = $this->conn->query($sql);

			if ( $result->num_rows > 0) {
				
				// output data of each row
				while($row = $result->fetch_assoc()) {
					array_push($output, $row);
				}
			} else {
				// echo "0 results"; return empty array.
			}
		} // return empty array if not connected.
		
		$this->CloseConnection();
		return $output;
	}
	
	public function Addorder($id, $OrderDate, $PickUpDate, $userID, $pickupTime){
		$output = array();

		$this->OpenConnection();
		if( $this->isConnected() ){
            
            if($this->isorderExists($id)) {
               return $this->UpdateorderProfile($id, $OrderDate, $PickUpDate, $userID, $pickupTime);
            }else {
              //$sql = "INSERT INTO `PressDB`.`orderdetails` ( name, address1, address2, address3, email, lastname, mobile. ) 
                $sql = "INSERT INTO `orderdetail`( `CustomerID`, `OrderDate`, `PickUpDate`, `PickupTime`)
                                                VALUES (  \"$userID\", \"$OrderDate\", \"$PickUpDate\", \"$pickupTime\")";

                if ($this->conn->query($sql) === TRUE) {
                    $output["status"] = "Success";
                    $output["orderID"] =  $this->conn->insert_id;
                    $output["Query"] = $sql;
                    $output["Message"] = "Corngratulations. your order is placed Successfully";
                } else {
                    //echo "Error: " . $sql . "<br>" . $this->conn->error;
                    $output["status"] = "Error";
                    $output["Error"] = $this->conn->error;
                    $output["Query"] = $sql;
                    $output["Message"] = "Sorry. Couldn't place the order. please try again after some time.";
                }
            }
			$this->conn->close();
		}
		return $output;
	}
    
    // Function for basic field validation (present and neither empty nor only white space
    function IsNullOrEmptyString($question){
        return (!isset($question) || trim($question)==='');
    }
    
    public function isorderExists($id){
        if($this->IsNullOrEmptyString($id)) return FALSE;
        $sql = "SELECT * FROM orderdetails where ID = $id";
        $result = $this->conn->query($sql);
        //echo $id + '<br>';
        //return $result;
        if( $result === FALSE) return FALSE;
        
        if ($result->num_rows > 0) {  //  There is an error in query execution.
            return TRUE;
        }
        //echo $this->conn->error;
        return FALSE;
    }
    
    public function UpdateorderProfile($id, $OrderDate, $PickUpDate, $userID, $pickupTime,$status){
        $output = array();
        
        if( !$this->isConnected() ){
            $this->OpenConnection();
        }
        
        $sql = "INSERT INTO `orderdetail`( `CustomerID`, `OrderDate`, `PickUpDate`, `PickupTime`, `Status`)
                                                VALUES (  \"$userID\", \"$OrderDate\", \"$PickUpDate\", \"$pickupTime\", \"$status\")";

        //$sql = "UPDATE `orderdetails` SET `name`=[$name],`address1`=[$address1],`address2`=[$address2],`address3`=[$address3],`email`=[$email],`lastname`=[$lastname],`mobile`=[$mobile] WHERE `orderID`= [$id]";
        
        //$sql = "UPDATE `orderdetails` SET `name`='$name',`address1`='$address1',`address2`='$address2',`address3`='$address3',`email`='$email',`lastname`='$lastname',`mobile`='$mobile' 'UpdatedOn'='NOW()' WHERE `orderID`= '$id'";
        
        //$sql = "UPDATE `orderdetails` SET `name`='$name' WHERE `orderID`= '$id'";
        
        //$sql = "UPDATE `PressDB`.`orderdetails` SET `name`=\"$name\", `address1`=\"$address1\", `address2`=\"$address2\", `address3`=\"$address3\", `email`=$email, `lastname`=$lastname, `mobile`= $mobile WHERE `orderID`= $id ";
//                                                VALUES ( \"$name\", \"$address1\", \"$address2\", \"$address3\", \"$email\", \"\", \"$mobile\")";
        if ($this->conn->query($sql) === TRUE) {
            $output["status"] = "Success";
            $output["Message"] = "Updated Successfully";
            $output["orderID"] =  $id;
        } else {
            $output["status"] = "Error";
            $output["Message"] = "Could not Update profile.";
            $output["orderID"] =  $id;
            $output["ErrorMsg"] = $this->conn->error;
            $output["sqlExe"] = $sql;
        }

        return $output;
        
    }
	
	public function OpenConnection()
	{
		$this->conn = new mysqli("localhost", "mywebsite", "test", "pressdb");
	}
	public function CloseConnection()
	{
		$this->conn->close();
	}
	
	
};

?>