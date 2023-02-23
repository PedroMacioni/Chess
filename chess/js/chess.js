$(function(){
	var initialPosition = {
		a8: 'rook-black',
		b8: 'knight-black',
		c8: 'bishop-black',
		d8: 'queen-black',
		e8: 'king-black',
		f8: 'bishop-black',
		g8: 'knight-black',
		h8: 'rook-black',

		a7: 'pawn-black',
		b7: 'pawn-black',
		c7: 'pawn-black',
		d7: 'pawn-black',
		e7: 'pawn-black',
		f7: 'pawn-black',
		g7: 'pawn-black',
		h7: 'pawn-black',

		a2: 'pawn-white',
		b2: 'pawn-white',
		c2: 'pawn-white',
		d2: 'pawn-white',
		e2: 'pawn-white',
		f2: 'pawn-white',
		g2: 'pawn-white',
		h2: 'pawn-white',

		a1: 'rook-white',
		b1: 'knight-white',
		c1: 'bishop-white',
		d1: 'queen-white',
		e1: 'king-white',
		f1: 'bishop-white',
		g1: 'knight-white',
		h1: 'rook-white'
	};

	var colunas = {};
	colunas[0] = 'a';
	colunas[1] = 'b';
	colunas[2] = 'c';
	colunas[3] = 'd';
	colunas[4] = 'e';
	colunas[5] = 'f';
	colunas[6] = 'g';
	colunas[7] = 'h';
	var mate = false;
	var movesKings = {'black':{}, 'white': {}};
	var movesPecaCheck = {};
	var checking = false;
	var checkLonge = false;

	var jogador = 'white';
	var vezdo = 'white';

	var clicou = 0;
	var pecaEscolhida = '';
	var ultimaCasaEscolhida = '';

	$('body').on('click', '.piece', function(){
		var classe = $(this).attr('class');
		var casa = $(this).parent();
		var casaId = casa.attr('id');

		if(vezdo == jogador){
			if(classe.indexOf(jogador) >= 0){
				clicou = 1;
				ultimaCasaEscolhida = casaId;
				pecaEscolhida = $(this);
				$('.square-board').removeClass('possible');
			}
		}
	});

	var vai_para = '';
	$('body').on('click', '.square-board', function(){
		var temPeca = $(this).find('.piece').size();
		var idCasa = $(this).attr('id');
		//verifyPiece(pecaEscolhida, ultimaCasaEscolhida);

		var movimentosPossiveis = verifyPiece(pecaEscolhida, ultimaCasaEscolhida);
		$.each(movimentosPossiveis, function(i, sqr){
			$('#'+sqr).addClass('possible');
		});


		if(idCasa != ultimaCasaEscolhida){
			vai_para = idCasa;

			if(objSearch(movimentosPossiveis, idCasa) != null){
				if(mate == false){
					//jogar($(this));
					alert('Pode jogar');
				}else{
					alert('Check mate');
				}

				//engine(vezdo, checking);
			}else{
				alert('Jogada é invalida');
			}
		}
	});

	function verifyPiece(piece, square){
		var tipo = piece.attr('class');
		var possibleMoves = {};

		if(tipo == 'piece pawn-black'){
			possibleMoves = findMovesPawn(square, 'black');
		}else if(tipo == 'piece pawn-white'){
			possibleMoves = findMovesPawn(square, 'white');
		}


		if(tipo.indexOf('bishop') >= 0){
			possibleMoves = findMovesBishop(square, tipo);
		}
		return possibleMoves;
	}


	function findMovesBishop(square, tipo){
		if(tipo.indexOf('black') >= 0){
			var typeAttack = 'white';
		}else{
			var typeAttack = 'black';
		}

		var line = Number(square[1]);
		var linha = line+1;
		var coluna = square[0];
		var x = 0;
		var moves = {};

		var nColunaAtual = '';
		var colTopRight = '';

	
		for(var i = 0; i <= 6; i++){
			if(nColunaAtual == ''){
				nColunaAtual = objSearch(colunas, coluna);
				colTopRight = nColunaAtual++;
			}

			if(objSearchIndex(colunas, colTopRight) != null){
				if(colunas[colTopRight] != coluna){
					var lineTopRight = linha++;
					var casa = colunas[colTopRight]+lineTopRight;

					if($('#'+casa).size() == 1){
						if($('#'+casa).find('.piece').size() == 1){
							var encontrada = $('#'+casa).find('.piece').attr('class');
							if(encontrada.indexOf(typeAttack) >= 0){
								x++;
								moves[x] = casa;
								break;
							}else{
								break;
							}
						}else{
							x++;
							moves[x] = casa;
						}
					}else{
						break;
					}
				}
				colTopRight++;
			}			
		}

		//top left
		nColunaAtual = '';
		var colTopLeft = '';
		linha = line+1;
		for(var i = 0; i <= 6; i++){
			if(nColunaAtual == ''){
				nColunaAtual = objSearch(colunas, coluna);
				colTopLeft = nColunaAtual-1;
			}
			if(objSearchIndex(colunas, colTopLeft) != null){
				if(colunas[colTopLeft] != coluna){
					var lineTopLeft = linha++;
					var casa = colunas[colTopLeft]+lineTopLeft;

					if($('#'+casa).size() == 1){
						if($('#'+casa).find('.piece').size() == 1){
							var encontrada = $('#'+casa).find('.piece').attr('class');
							if(encontrada.indexOf(typeAttack) >= 0){
								x++;
								moves[x] = casa;
								break;
							}else{
								break;
							}
						}else{
							x++;
							moves[x] = casa;
						}
					}else{
						break;
					}
				}
				colTopLeft--;
			}			
		}



		//bottom right
		nColunaAtual = '';
		linha = line+1;
		var lineDescer = line-1;
		var colBottomRight = '';
		for(var i = 0; i <= 6; i++){
			if(nColunaAtual == ''){
				nColunaAtual = objSearch(colunas, coluna);
				colBottomRight = nColunaAtual++;
			}
			if(objSearchIndex(colunas, colBottomRight) != null){
				if(colunas[colBottomRight] != coluna){
					var lineBottomRight = lineDescer--;
					var casa = colunas[colBottomRight]+lineBottomRight;

					if($('#'+casa).size() == 1){
						if($('#'+casa).find('.piece').size() == 1){
							var encontrada = $('#'+casa).find('.piece').attr('class');
							if(encontrada.indexOf(typeAttack) >= 0){
								x++;
								moves[x] = casa;
								break;
							}else{
								break;
							}
						}else{
							x++;
							moves[x] = casa;
						}
					}else{
						break;
					}
				}
				colBottomRight++;
			}			
		}


		//bottom left
		nColunaAtual = '';
		linha = line+1;
		lineDescer = line-1;
		var colBottomLeft = '';
		for(var i = 0; i <= 6; i++){
			if(nColunaAtual == ''){
				nColunaAtual = objSearch(colunas, coluna);
				colBottomLeft = nColunaAtual--;
			}
			if(objSearchIndex(colunas, colBottomLeft) != null){
				if(colunas[colBottomLeft] != coluna){
					var lineBottomLeft = lineDescer--;
					var casa = colunas[colBottomLeft]+lineBottomLeft;

					if($('#'+casa).size() == 1){
						if($('#'+casa).find('.piece').size() == 1){
							var encontrada = $('#'+casa).find('.piece').attr('class');
							if(encontrada.indexOf(typeAttack) >= 0){
								x++;
								moves[x] = casa;
								break;
							}else{
								break;
							}
						}else{
							x++;
							moves[x] = casa;
						}
					}else{
						break;
					}
				}
				colBottomLeft--;
			}			
		}
		return moves;
	}

	function findMovesPawn(square, type){

		var line = Number(square[1]);
		var column = square[0];
		var linha = line+1;
		var moves = {};
		var x = 0;

		var indiceColum = objSearch(colunas, column);
		var proxima = Number(indiceColum)+1;
		var anterior = Number(indiceColum)-1;

		if(type == 'white'){
			if(line == 2){
				//indo pra frente
				for(var i = 0; i <2; i++){
					var casa = $ ('#'+column+(linha++));
					if(casa.find('.piece').size() == 0){
						x++;
						moves[x] = casa.attr('id');
					}else{
						break;
					}
				}
			}else{
				//indo pra frente
				for(var i = 0; i<1; i++){
					var casa = $('#'+column+(linha++));
					if(casa.find('.piece').size() == 0){
						x++;
						moves[x] = casa.attr('id');
					}else{
						break;
					}
				}
			}

			//verifica duas diagonais
			var linhaDiagonal = line+1;
			if(objSearchIndex(colunas, proxima) != null){
				var coluna = colunas[proxima]+linhaDiagonal;
				//alert('encontrou '+coluna);
				if($('#'+coluna).find('.piece').size() == 1){
					var pecaEncontrada = $('#'+coluna).find('.piece').attr('class');
					if(pecaEncontrada.indexOf('black') >= 0){
						x++;
						moves[x] = coluna;
					}
				}
			}

			if(objSearchIndex(colunas, anterior) != null){
				var coluna = colunas[anterior]+linhaDiagonal;
				if($('#'+coluna).find('.piece').size() == 1){
					var pecaEncontrada = $('#'+coluna).find('.piece').attr('class');
					if(pecaEncontrada.indexOf('black') >= 0){
						x++;
						moves[x] = coluna;
					}
				}
			}
		}else{
			//movimentos peões pretos
			if(line == 7){
				//indo pra frente
				for(var i = 7; i>=5; --i){

					if(i != 7){
						var casa = $ ('#'+column+i);
						if(casa.find('.piece').size() == 0){
							x++;
							moves[x] = casa.attr('id');
						}else{
							break;
						}
					}
				}
			}else{
				//indo pra frente
				for(var i = line; i >= line-1; --i){
					if(i != line){
						var casa = $('#'+column+i);
						if(casa.find('.piece').size() == 0){
							x++;
							moves[x] = casa.attr('id');
						}else{
							break;
						}
					}
				}
			}

			//verifica duas diagonais
			var linhaDiagonal = line-1;
			if(objSearchIndex(colunas, proxima) != null){
				var coluna = colunas[proxima]+linhaDiagonal;
				//alert('encontrou '+coluna);
				if($('#'+coluna).find('.piece').size() == 1){
					var pecaEncontrada = $('#'+coluna).find('.piece').attr('class');
					if(pecaEncontrada.indexOf('white') >= 0){
						x++;
						moves[x] = coluna;
					}
				}
			}

			if(objSearchIndex(colunas, anterior) != null){
				var coluna = colunas[anterior]+linhaDiagonal;
				if($('#'+coluna).find('.piece').size() == 1){
					var pecaEncontrada = $('#'+coluna).find('.piece').attr('class');
					if(pecaEncontrada.indexOf('white') >= 0){
						x++;
						moves[x] = coluna;
					}
				}
			}
			//termina movimentos peões pretos
		}

		return moves;
	}
	function newGame(){
		$('.square-board').each(function(){
			var square = $(this);
			var sq = square.attr('id');

			if(objSearchIndex(initialPosition, sq) != null){
				//console.log('achou');
				$(this).html('<div class="piece '+initialPosition[sq]+'"></div>');
			}
		});
	}

	function printBoard(){
		var light = 1;
		var columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		for(var l = 8; l>=1; --l){
			for(var c = 0; c < columns.length; ++c){
				var sq = columns[c]+l;
				var lightdark = (light == 1) ? 'light' : 'dark';
				$('.board').append('<div class="square-board '+lightdark+'" id="'+sq+'"></div>');
				light ^= 1;
			}
			light ^= 1;
		}
	}

	//printBoard();
	//newGame();

	function objSearch(obj, valor){
		var retorno = null;
		$.each(obj, function(i, val){
			if(val == valor){
				retorno = i;
			}
		});

		return retorno;
	}

	function objSearchIndex(obj, index){
		var retorno = null;
		$.each(obj, function(i, val){
			if(i == index){
				retorno = i;
			}
		});

		return retorno;
	}
});