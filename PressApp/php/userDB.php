<?php

class userDB
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
	
	public function Getuser($id)
	{
		$output = array();
		$this->OpenConnection();
		if( $this->isConnected() ){
			//echo 'test connection passed';
			$sql = "SELECT * FROM userdetails WHERE userID = $id";
            //$sql = "SELECT * FROM userdetails ";
			$result = $this->conn->query($sql);

			if ($result->num_rows > 0) {
				
				// output data of each row
				while($row = $result->fetch_assoc()) {
					array_push($output, $row);
				}
			} else {
				//echo "0 results"; return empty array.
			}
		} // return empty array if not connected.
		
		$this->CloseConnection();
		return $output;
	}
	
	public function AddUser($id, $name, $lastname, $mobile, $address1, $address2, $address3, $email){
		$output = array();

		$this->OpenConnection();
		if( $this->isConnected() ){
            if($this->isUserExists($id)) {
               return $this->UpdateUserProfile($id, $name,$lastname, $mobile, $address1, $address2, $address3, $email);
            }else {
              //$sql = "INSERT INTO `PressDB`.`userdetails` ( name, address1, address2, address3, email, lastname, mobile. ) 
                $sql = "INSERT INTO `userdetails`(`name`, `address1`, `address2`, `address3`, `email`, `lastname`, `mobile`, `CreatedOn` )
                                                VALUES ( \"$name\", \"$address1\", \"$address2\", \"$address3\", \"$email\", \"$lastname\", \"$mobile\", NOW())";

                if ($this->conn->query($sql) === TRUE) {
                    $output["status"] = "Success";
                    $output["userID"] =  $this->conn->insert_id;
                    $output["Query"] = $sql;
                } else {
                    //echo "Error: " . $sql . "<br>" . $this->conn->error;
                    $output["status"] = "Error";
                    $output["Error"] = $this->conn->error;
                    $output["Query"] = $sql;
                    $output["Message"] = "Corngratulations " + $name + ". you are Successfully registered";
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
    
    public function isUserExists($id){
        if($this->IsNullOrEmptyString($id)) return FALSE;
        $sql = "SELECT * FROM userdetails where userID = $id";
        $result = $this->conn->query($sql);
        //echo $id + '<br>';
        //return $result;
        if ($result->num_rows > 0) {  //  There is an error in query execution.
            return TRUE;
        }
        //echo $this->conn->error;
        return FALSE;
    }
    
    public function UpdateUserProfile($id, $name, $lastname, $mobile, $address1, $address2, $address3, $email){
        $output = array();
        
        if( !$this->isConnected() ){
            $this->OpenConnection();
        }


        //$sql = "UPDATE `userdetails` SET `name`=[$name],`address1`=[$address1],`address2`=[$address2],`address3`=[$address3],`email`=[$email],`lastname`=[$lastname],`mobile`=[$mobile] WHERE `userID`= [$id]";
        $sql = "UPDATE `userdetails` SET `name`='$name',`address1`='$address1',`address2`='$address2',`address3`='$address3',`email`='$email',`lastname`='$lastname',`mobile`='$mobile' 'UpdatedOn'='NOW()' WHERE `userID`= '$id'";
        //$sql = "UPDATE `userdetails` SET `name`='$name' WHERE `userID`= '$id'";
        
        //$sql = "UPDATE `PressDB`.`userdetails` SET `name`=\"$name\", `address1`=\"$address1\", `address2`=\"$address2\", `address3`=\"$address3\", `email`=$email, `lastname`=$lastname, `mobile`= $mobile WHERE `userID`= $id ";
//                                                VALUES ( \"$name\", \"$address1\", \"$address2\", \"$address3\", \"$email\", \"\", \"$mobile\")";
        if ($this->conn->query($sql) === TRUE) {
            $output["status"] = "Success";
            $output["Message"] = "Updated Successfully";
            $output["userID"] =  $id;
        } else {
            $output["status"] = "Error";
            $output["Message"] = "Could not Update profile.";
            $output["userID"] =  $id;
            $output["ErrorMsg"] = $this->conn->error;
            $output["sqlExe"] = $sql;
        }

        return $output;
        
    }
	
	public function AddPuzzle()
	{

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