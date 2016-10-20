var angular;
var app = angular.module('App', []);




app.factory('betting', ['$http', ($http) => {

	var o = {
		bets : [],
		games : [],
		round : Number
	};

	o.getAllBets = function() {
		return $http.get('class/view_bet.php')
		.success(data => { angular.copy(data, o.bets) })
		.error(err => console.log(err));
	};

	o.getRound = function(){
		return $http.get('class/round.php')
		.success(data => { o.round = data; })
		.error(err => console.log(err));
	};

	o.getGames = function(){
		return $http.get('class/games.php')
		.success(data => { angular.copy(data.games, o.games) })
		.error(err => console.log(err)); 
	};

	o.createBet = function(bet) {
		return $http.post('class/bet.php', bet)
		.success(() => {console.log("Aposta criada com sucesso!")})
		.error(err => console.log(err)); 
	};

	o.deleteBet = function(index) {
		return $http.delete('class/drop_bet.php?index=' + index)
		.success(() => {console.log("Aposta removida com sucesso!")})
		.error(err => console.log(err)); 
	};


	return o;

}]);




app.controller('MainCtrl',['$scope', 'betting' ,($scope, betting)  => {

	betting.getGames().then(() => $scope.games = betting.games);
	betting.getRound().then(() => $scope.round = betting.round);
	betting.getAllBets().then(() => $scope.bets = betting.bets);

	$scope.title = "LOTERIA DO BUGGINHO";	

	$scope.price = '';
	$scope.err = '';

	$scope.getTens = (bet) => {		

		$scope.tens = [];
		bet = JSON.parse(bet);
		var min = bet.min;
		var max = bet.max;

		for (;min <= max; min++)
			$scope.tens.push(min);		
	};

	var saveBet = (bet) => {


		if (bet.ten == null)
			return $scope.err = "FAVOR PREENCHA AS DEZENAS!";

		$scope.err = "";

		$scope.selectedGame = JSON.parse(bet.game);

		bet = {
			round : parseInt($scope.round),
			game_id : $scope.selectedGame.id,
			game_name : $scope.selectedGame.name, 
			tens : parseInt(bet.ten),
			numbers : $scope.numbers,
			bet_amount : bet.amount,
			price : $scope.price,
			datetime : new Date().toJSON()
		};

		betting.createBet(bet);		

	};


	$scope.generateBet = (bet) => {
		
		if (bet.game == null)
			return $scope.err = "ESCOLHA O JOGO!";
		$scope.viewNumbers = '';
		$scope.numbers = [];
		var numbers = [];
		var tens = $scope.tens;
		var game = JSON.parse(bet.game);
		var price = game.prices[tens.indexOf(parseInt(bet.ten))];
		$scope.price = bet.amount * price;


		for (var j = 1; j <= bet.amount; j++){
			for (let i = 1; i <= bet.ten; i++){
				let exists;
				let random = Math.round(Math.random() * game.quantity);
				random == 0 ? random++ : random;
				exists = numbers.indexOf(random);
				exists < 0 ? numbers.push(random) : i--;
			};		

			$scope.numbers.push(numbers.sort((a, b) => a - b));	
			numbers = [];

			if (JSON.stringify($scope.numbers[j-1])==JSON.stringify($scope.numbers[j-2]))
				j--;			
		};

		saveBet(bet);
		betting.getAllBets(); 
	};	


	$scope.deleteBet = function(index){
		betting.deleteBet(index);		
		betting.getAllBets();
	};

	$scope.getViewNumbers = (game) => {
		$scope.viewNumbers = game.numbers;
		$scope.viewId = game.game_id;		
		$scope.numbers = '';
	};


	

}]);