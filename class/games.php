<?php

//Retorna os jogos da mega armazenados em data/games.json
$games = file_get_contents('../data/games.json');
echo $games;

?>