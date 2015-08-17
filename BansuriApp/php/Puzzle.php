<?php 

class Puzzle
{
	var $id, $src, $op1, $op2, $op3, $op4, $ans;
	//{id: "myImage1", src:"img/puzzles/bmw.png", op1: 'BMW', op2: 'AUDI', op3:'TOYOTA', op4:'TATA', ans:'op1' }
	function __construct()
	{
		$a = func_get_args(); 
        $i = func_num_args(); 
        if (method_exists($this,$f='__construct'.$i)) { 
            call_user_func_array(array($this,$f),$a); 
        } 
	}
	
	function __construct7($id, $src, $op1, $op2, $op3, $op4, $ans)
	{
		$this->id = $id;
		$this->src = $src;
		$this->op1 = $op1;
		$this->op2 = $op2;
		$this->op3 = $op3;
		$this->op4 = $op4;
		$this->ans = $ans;
	}
};

function getPuzzles(){
		$Puzzles;
		$Puzzles[0] = new Puzzle("myImage1","img/puzzles/bmw.png", 'BMW','AUDI','TOYOTA', 'TATA','op1');
		$Puzzles[1] = new Puzzle("myImage2","img/puzzles/audi.png",'BMW','nividia','TOYOTA','Audi', 'op4');
		$Puzzles[2] = new Puzzle("myImage3","img/puzzles/mercedes.png", 'BMW', 'AUDI', 'Mercedes','TATA','op3');
		$Puzzles[3] = new Puzzle("myImage4", "img/puzzles/Jaguar.png", 'Jaguar', 'AUDI', 'Mercedes', 'TATA', 'op1');
		$Puzzles[4] = new Puzzle("Renault", "img/puzzles/Renault.png", 'Renault', 'AUDI', 'Mercedes','TATA', 'op1');
		$Puzzles[5] = new Puzzle("farrari", "img/puzzles/farrari1.png",'Renault', 'AUDI','Mercedes','farrari', 'op4');
		$Puzzles[6] = new Puzzle("farrari", "img/puzzles/farrari1.png",'Renault', 'AUDI','Mercedes','farrari', 'op4');
		$Puzzles[7] = new Puzzle("farrari", "img/puzzles/farrari1.png",'Renault', 'AUDI','Mercedes','farrari', 'op4');
		/*
                   
                    {id: "AUDI", src:"img/puzzles/AUDI.JPG", op1: 'Renault', op2: 'AUDI', op3:'Mercedes', op4:'farrari', ans:'op4'}
					
				*/	
					
		return $Puzzles;
	}

?>