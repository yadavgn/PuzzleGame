<?php
include_once("userDB.php");

	$response = "";
	$data = "";
switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET': 
		try{
                $postdata = file_get_contents("php://input");
                //log($postdata); // Log this received data first.

                $request = json_decode($postdata);

                $id = $request->userID;
                $var = new userDB();

                $result = $var->GetUser($id);
                if( is_array($result) ){
                    echo json_encode($result);
                   // log("User"+ $name +" registered Successfully");
                }
                else{
                    $output["status"] = "Error";
                    $output["Errorss"] = $result;
                    $output["Message"] = "Sorry "+ $name +", !! Ragistration Failed. Please try some time later";
                }
            }
        catch(Exception $e){
            $output["status"] = "Error";
            $output["Errors"] = $e;
            $output["Message"] = "Sorry "+ $fname +", !! Ragistration Failed. Please try some time later";
            log($e);
        }
    break;
	case 'POST': 
            try{
                $postdata = file_get_contents("php://input");
                //log($postdata); // Log this received data first.

                $request = json_decode($postdata);

                $name = $request->fname;
                $lastname = $request->lname;
                $email = $request->email;
                $address1 = $request->address1;
                $address2 = $request->address2;
                $address3 = $request->address3;
                $mobile  = $request->mobile;
                $id = 1;  // $request->userID;
                //echo $postdata;


                $var = new userDB();
                $result = $var->AddUser($id, $name,$lastname, $mobile, $address1, $address2, $address3, $email);
                if( is_array($result) ){
                    echo json_encode($result);
                    log("User"+ $name +" registered Successfully");
                }
                else{
                    $output["status"] = "Error";
                    $output["Errorss"] = $result;
                    $output["Message"] = "Sorry "+ $name +", !! Ragistration Failed. Please try some time later";
                }
            }
        catch(Exception $e){
            $output["status"] = "Error";
            $output["Errors"] = $e;
            $output["Message"] = "Sorry "+ $fname +", !! Ragistration Failed. Please try some time later";
            log($e);
        }

		break;
	case 'PUT': 
		//mysqli_connect("localhost","mywebsite","test","pressdb");
		
        try{
            $postdata = file_get_contents("php://input");
            //log($postdata); // Log this received data first.

            $request = json_decode($postdata);

            $name = $request->fname;
            $lastname = $request->lname;
            $email = $request->email;
            $address1 = $request->address1;
            $address2 = $request->address2;
            $address3 = $request->address3;
            $mobile  = $request->mobile;
            $id = $request->userID;
            //echo $postdata;
            //echo $id;


            $var = new userDB();
            $result = $var->AddUser($id, $name,$lastname, $mobile, $address1, $address2, $address3, $email);
            if( is_array($result) ){
                //$result["userIDFor"] = $id;
                echo json_encode($result);
                log("User"+ $name +" registered Successfully");
            }
            else{
                $output["status"] = "Error";
                $output["Errorss"] = $result;
                $output["Message"] = "Sorry "+ $name +", !! Ragistration Failed. Please try some time later";
            }
        }
        catch(Exception $e){
            $output["status"] = "Error";
            $output["Errors"] = $e;
            $output["Message"] = "Sorry "+ $fname +", !! Ragistration Failed. Please try some time later";
            log($e);
        }
		//echo $userID;
	break;
	case 'DELETE': $the_request = &$_DELETE; echo "this is a DELETE  request"; break;
	
	default: echo "<br> This method is not supported yet";
}


?>