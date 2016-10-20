<?php

define("ROOT", __DIR__);
define("VIEWS", ROOT.'//templates/');
define("EXT", ".html");

//Funcao para simplificar a chamada das Views
function require_view($view){
	require_once(VIEWS.$view.EXT);
};



require_view("head");
require_view("content");
require_view("footer");





?>

