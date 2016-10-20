<?php

//Rotina para salvar arquivos em formato JSON

$fileData = file_get_contents("php://input");
$objFileData = json_decode($fileData);

$bets_path = "../data/bets.json";


$lines = file($bets_path); 
$last = sizeof($lines) - 1 ; 
unset($lines[0]);
unset($lines[$last]); 


$fp = fopen($bets_path, 'w');
fwrite($fp, "[ {} \n");
fwrite($fp, implode('', $lines)); 
fwrite($fp, ",".$fileData."\n ]");
fclose($fp);



?>