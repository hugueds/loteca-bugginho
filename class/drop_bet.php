<?php 

//Exclusão da Aposta conforme ID enviado

$index = $_GET['index'];
$bets_path = "../data/bets.json";


$lines = file($bets_path); 
unset($lines[$index]);

$fp = fopen($bets_path, 'w');
fwrite($fp, implode('', $lines)); 
fclose($fp);


?>