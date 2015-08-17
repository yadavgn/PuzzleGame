<?php

class PuzzleDB
{
	private $conn ='';
	public function __construct () {
		
	}

	public function isConnected()
	{
		if( $this->conn->connect_error ){
			return false;
		}
		return true;
	}
	
	public function GetPuzzles()
	{
		$output = array();
		$this->OpenConnection();
		if( $this->isConnected() ){
			//echo 'test connection passed';
			$sql = "SELECT * FROM puzzle";
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
	
	
	
	public function AddPuzzle()
	{
		
	}
	
	public function OpenConnection()
	{
		$this->conn = new mysqli("localhost", "website", "test", "test");
	}
	public function CloseConnection()
	{
		$this->conn->close();
	}
	
	
};

?>