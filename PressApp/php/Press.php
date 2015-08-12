<?php
include_once("orderDB.php");

	$response = "";
	$data = "";
switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET': 
		
    break;
	case 'POST': 
            try{
                $postdata = file_get_contents("php://input");

                $request = json_decode($postdata);
                if( isset($request->RequestType) ){
                    $requestType = $request->RequestType;
                }else {
                    $output["status"] = "Error"; 
                    $output["Message"] = "Somthing went wrong.";
                    $output["TechError"] = "RequestType is not defined.";
                    
                    echo json_encode($output);
                    return;
                }
                
                if( $requestType == "PlaceOrder" ) {
                    
                } else if( $requestType == "UpdateOrder" ){
                     
                } else if( $requestType == "GetOrders" ){
                     
                } else if( $requestType == "UpdateOrder" ){
                     
                } else if( $requestType == "UpdateOrder" ){
                    
                }
                
                if(isset($request->userID)) {
 
                    $userID = $request->userID;
                   //echo "This var is set so I will print.";
                }else {
                    echo "User ID is not defined.";
                    
                    return ;
                }
                
                $id = 1;

                $db = new orderDB();
                
                if( $requestType == "Get_Records" ){ /// get old orders for this user.
                    
                    $result = $db->Getorder($userID);
                    if( is_array($result) ){
                        $output["status"] = "Success";
                        //$output["Messages"] = "total data returnd " + $result.lenght();
                        
                        $output["result"] = $result;
                        echo json_encode($output);
                        log("order"+ $id +" registered Successfully");
                    }
                    else{
                        $output["status"] = "Error";
                        $output["Errorss"] = $result;
                        $output["Message"] = "Sorry "+ $id +", !! Ragistration Failed. Please try some time later";
                    }
                    
                
                }else if( $requestType == "Add_Records" ){
                    
                    $OrderDate = $request->OrderDate;
                    $PickUpDate = $request->PickUpDate;                    
                    $pickupTime = $request->PickUpTime;
                   
                    $result = $db->Addorder($id, $OrderDate, $PickUpDate, $userID, $pickupTime);
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
            }
        catch(Exception $e){
            $output["status"] = "Error";
            $output["Errors"] = $e;
            $output["Message"] = "Sorry "+ $fname +", !! Ragistration Failed. Please try some time later";
            log($e);
        }

		break;
	case 'PUT':  // Update order detailes for the given ID.
		
    
		//echo $orderID;
	break;
	case 'DELETE': $the_request = &$_DELETE; echo "this is a DELETE  request"; break;
	
	default: echo "<br> This method is not supported yet";
}


?>