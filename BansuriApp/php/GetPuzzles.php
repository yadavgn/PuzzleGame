<?php
include_once("Puzzle.php");

	$response = "";
	$data = "";
switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET': 
		$the_request = &$_GET; 
		//echo "this is a GET  request"; 
		//$data = new Puzzle(); 
	echo json_encode(GetPuzzles());
		break;
	case 'POST': 
		$the_request = &$_POST; 
		//echo "this is a POST  request"; 
		break;
	case 'PUT': $the_request = &$_POST; echo "this is a PUT  request"; break;
	case 'DELETE': $the_request = &$_DELETE; echo "this is a DELETE  request"; break;
	
	default: echo "<br> This method is not supported yet";
}


?>