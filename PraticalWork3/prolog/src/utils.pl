printLines(N) :-
       N > 0,
       nl,
       N1 is N - 1,
       printLines(N1).

printLines(_).

clearScreen :-
        printLines(65).



printList([H|T]) :-
  write(H), write('  '),
  printList(T).

printList([]):- write('').
printList(X):-  write(X).

index(Matrix, Row, Col, Value):-
  nth0(Row, Matrix, MatrixRow,_),
  nth0(Col, MatrixRow, Value,_).

transform(X,Y):-
  (
   X = red -> Y = r;
   X = blue -> Y = b;
   X = black -> Y = n;
   X = white -> Y = w;
   X = green-> Y = g;
   X = ivory -> Y = i;
   X = x -> Y = x;
   Y = '.'
   ).


getColumnNumber(X) :-
    X = _,
    max = _,
    read(X),
    number(X),
    X > -1 , X < 13.

getColumnNumber(X) :-
    write('Please pick a number between 0 and 13...'),
    getColumnNumber(X).


getLineNumber(X) :-
    X = _,
    max = _,
    read(X),
    number(X),
    X > -1 , X < 9.

getLineNumber(X) :-
    write('Please pick a number between 0 and 9...'),
    getLineNumber(X).

abs(X,Y):-
    ( X >= 0 -> Y is X; Y is -X).

is_set(Lst) :-
    setof(X, member(X, Lst), Set),
    length(Lst, N),
    length(Set, N).


initialize(Board):-
	board4(B),
    createBoard(B,Board).

claim(Color,Colors,Player,NewColors,NewPlayer):-
	length(Player,Length),
	Length <4,
	select(Color,Colors,NewColors),
	append(Player,[Color],NewPlayer).


% humanPlay(ValidMove, T, [6,0],[7,1],[0,1],[0,2],[ivory,green,red,blue,black], NewBoard, NewPlayer, NewColors)
% do not use NewBoard when ValidMove=0
humanPlay(Board,PosInit,PosFinal,P1,P2,NewBoard,NewPlayer,Final):-
       nth0(0,PosInit, Y1),
       nth0(1,PosInit, X1),
       nth0(0,PosFinal, Y2),
       nth0(1,PosFinal, X2),
       checkValidMove(Board,P1,P2,X1,Y1,X2,Y2),
       setPosition(Board, B, 0, 0, X1, Y1, [x]),
       index(Board,Y1,X1,InitPos),
       index(Board,Y2,X2,FinalPos),
       append(InitPos,FinalPos,Final),
       updatePlayer(B,P1,Final,X2,Y2,NewBoard,NewPlayer).

checkValidMove(Board,P1,P2,X1,Y1,X2,Y2):-
        checkPiece(Board,P2,X1,Y1),
        checkDiagonal(X1,X2,Y1,Y2),
        checkDiagonalPositions(Board,X1,X2,Y1,Y2),
        checkPosition(Board,X1,Y1),
        checkPosition(Board,X2,Y2),
        checkNeutralTop(Board,P1,X1,Y1,X2,Y2),
        checkFinalStack(Board,X1,Y1,X2,Y2).
