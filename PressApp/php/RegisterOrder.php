<?php
include_once("orderDB.php");

	$response = "";
	$data = "";
switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET': 
		try{
            
            //$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));
            //echo "User ID is:" ;
            //echo $request[0];
            //$userID = $_GET['userID'];
            
            
            $postdata = file_get_contents("php://input");
            //log($postdata); // Log this received data first.
            echo "TEST" ;

            
            $request = json_decode($postdata);
            echo $request;
            echo "TEST" ;


            
            //echo $request->userID;
            $userID = $request->userID;
            //$id = $request->userID;

            
            //$pickupTime = $request->pickupTime;
            //$id = 1;     
            
            $var = new orderDB();

            $result = $var->Getorder($userID);
            if( is_array($result) ){
                echo json_encode($result);
               // log("order"+ $name +" registered Successfully");
            }
            else{
                $output["status"] = "Error";
                $output["Errorss"] = $result;
                $output["Message"] = "Sorry Fatching orders for "+ $userID +". Please try some time later";
            }
        }
        catch(Exception $e){
            $output["status"] = "Error";
            $output["Errors"] = $e;
            //$output["Message"] = "Sorry Fatching orders for "+ $userID +". Please try some time later";
            log($e);
        }
    break;
	case 'POST': // Add new for the given ID and return order ID for the request. 
            try{
                $postdata = file_get_contents("php://input");
                //log($postdata); // Log this received data first.

                $request = json_decode($postdata);

                $OrderDate = $request->OrderDate;
                $PickUpDate = $request->PickUpDate;
                $userID = $request->userID;
                $pickupTime = $request->pickupTime;
                $id = 1;

                $var = new orderDB();
                $result = $var->Addorder($id, $OrderDate, $PickUpDate, $userID, $pickupTime);
                if( is_array($result) ){
                    echo json_encode($result);
                    log("order"+ $id +" registered Successfully");
                }
                else{
                    $output["status"] = "Error";
                    $output["Errorss"] = $result;
                    $output["Message"] = "Sorry "+ $id +", !! Ragistration Failed. Please try some time later";
                }
            }
        catch(Exception $e){
            $output["status"] = "Error";
            $output["Errors"] = $e;
            $output["Message"] = "Sorry "+ $fname +", !! Ragistration Failed. Please try some time later";
            log($e);
        }

		break;
	case 'PUT':  // Update order detailes for the given ID.
		//mysqli_connect("localhost","mywebsite","test","pressdb");
		/*
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
            $id = $request->orderID;
            //echo $postdata;
            //echo $id;


            $var = new orderDB();
            $result = $var->Addorder($id, $name,$lastname, $mobile, $address1, $address2, $address3, $email);
            if( is_array($result) ){
                //$result["orderIDFor"] = $id;
                echo json_encode($result);
                log("order"+ $name +" registered Successfully");
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
        }*/
    
		//echo $orderID;
	break;
	case 'DELETE': $the_request = &$_DELETE; echo "this is a DELETE  request"; break;
	
	default: echo "<br> This method is not supported yet";
}


?>