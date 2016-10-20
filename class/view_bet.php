<?php

//Retorna todas as apostas feitas
$bets = file_get_contents('../data/bets.json');
echo $bets;

?>