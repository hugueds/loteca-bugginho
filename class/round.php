<?php

//GERA RODADA ALEATÓRIA

$default = 1476837991;
$round =  ceil((mktime() - $default) / 1000) ;

echo $round;



?>