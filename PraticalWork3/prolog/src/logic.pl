
:-use_module(library(lists)).

:-include('board.pl').

startHvH:-
        board4(B),
        createBoard(B,RandomB),
        random(0,2,R),
        (
          R = 0 -> play(RandomB,[0,1],[0,2],[ivory,blue,red,green,black]);
          play(RandomB,[0,2],[0,1],[ivory,blue,red,green,black])
        ).


startCvC:-
        board4(B),
        createBoard(B,RandomB),
        random(0,2,R),
        
        L1 = [ivory,blue,red,green,black],
        
        random_select(C1,L1,L2),
        random_select(C2,L2,L3),
        random_select(C3,L3,L4),
        random_select(C4,L4,L),
        (
          R = 0 -> playCvC(RandomB,[0,1,C1,C2],[0,2,C3,C4]);
          playCvC(RandomB,[0,2,C1,C2],[0,1,C3,C4])
        ).
		

startPvC:-
        board4(B),
        createBoard(B,RandomB),
        random(0,2,R),
        
        L1 = [ivory,blue,red,green,black],
        
        random_select(C1,L1,L2),
        random_select(C2,L2,L3),
      
        (
          R = 0 ->  playPvC(RandomB,[0,1],[0,2,C1,C2],L3);
          playPvC(RandomB,[0,2],[0,1,C1,C2],L3)
        ).
		
playPvC(Board,Player1,Player2,Colors) :-
        getValidMoves(Board,Player1,Player2,0,0,0,0,[],[],Moves1),
        length(Moves1,L1),
        ( L1>0 -> turn(Board,Player1,Player2,Colors,NewBoard,P1,NewColors);
                 write(' There are no possible moves\n'),P1=Player1, NewBoard = Board,NewColors=Colors),
 
 
        getValidMoves(NewBoard,Player2,P1,0,0,0,0,[],[],Moves2),
        length(Moves2,L2),
        ( L2>0 -> turnCvC(NewBoard,Player2,P1,FinalBoard,P2);
                 write(' There are no possible moves\n'),P2=Player2,FinalBoard=NewBoard),
		FinalColors =NewColors,
 
        getValidMoves(FinalBoard,P1,P2,0,0,0,0,[],[],Moves3),
        length(Moves3,L3),
 
        ( L2 =0,L3=0 -> gameOver(P1,P2);
            playPvC(FinalBoard,P1,P2,FinalColors)).


playCvC(Board,Player1,Player2) :-
        getValidMoves(Board,Player1,Player2,0,0,0,0,[],[],Moves1),
        length(Moves1,L1),
        ( L1>0 -> turnCvC(Board,Player1,Player2,NewBoard,P1);
                 write(' There are no possible moves\n'),P1=Player1, NewBoard = Board),
 
 
        getValidMoves(NewBoard,Player2,P1,0,0,0,0,[],[],Moves2),
        length(Moves2,L2),
        ( L2>0 -> turnCvC(NewBoard,Player2,P1,FinalBoard,P2);
                 write(' There are no possible moves\n'),P2=Player2,FinalBoard=NewBoard),
 
        getValidMoves(FinalBoard,P1,P2,0,0,0,0,[],[],Moves3),
        length(Moves3,L3),
 
                ( L2 =0,L3=0 -> gameOver(P1,P2);
                         playCvC(FinalBoard,P1,P2)).


play(Board,Player1,Player2,Colors) :-
        getValidMoves(Board,Player1,Player2,0,0,0,0,[],[],Moves1),
        length(Moves1,L1),
        ( L1>0 -> turn(Board,Player1,Player2,Colors,NewBoard,P1,NewColors);
                 write(' There are no possible moves\n'),P1=Player1, NewBoard = Board,NewColors=Colors),
 
 
        getValidMoves(NewBoard,Player2,P1,0,0,0,0,[],[],Moves2),
        length(Moves2,L2),
        ( L2>0 -> turn(NewBoard,Player2,P1,NewColors,FinalBoard,P2,FinalColors);
                 write(' There are no possible moves\n'),P2=Player2,FinalBoard=NewBoard,FinalColors=NewColors),
 
        getValidMoves(FinalBoard,P1,P2,0,0,0,0,[],[],Moves3),
        length(Moves3,L3),
 
                ( L2 =0,L3=0 -> gameOver(P1,P2);
                         play(FinalBoard,P1,P2,FinalColors)).


gameOver(P1,P2):-
        nl,write('        || Game Over ||\n'),nl,
        nth0(0,P1,Points1),
        nth0(0,P2,Points2),
        (
          (Points1 > Points2) -> write(' Player 1 Wins!\n');
          (Points1 < Points2) -> write(' Player 2 Wins!\n');
          write(' It is a tie...')
        ).



turn(Board,Player1,Player2,Colors,NewBoard,NewPlayer,NewColors):-
        clearScreen,
        printBoard(Board),nl,
        printPlayerInfo(Player1),
        printPlayerInfo(Player2),
        printPlayer(Player1),

        makeMove(Complete,0,Board,Player1,Player2,Colors,NewBoard,NewPlayer,NewColors).

turnCvC(Board,Player1,Player2,NewBoard,NewPlayer):-
        clearScreen,
        printBoard(Board),nl,
        printPlayerInfo(Player1),
        printPlayerInfo(Player2),
        printPlayer(Player1),
        
        getValidMoves(Board,Player1,Player2,0,0,0,0,ValidMoves,NewValidMoves,Moves),
        
        nth0(0,Moves,Top),
        nth0(0,Moves,Top,Rest),
        nth0(0,Top,X1),
        nth0(0,Top,X1,RestY1),
        nth0(0,RestY1,Y1),      
        nth0(0,RestY1,Y1,RestX2),
        nth0(0,RestX2,X2),
        nth0(0,RestX2,X2,RestY2),
        nth0(0,RestY2,Y2),
        normalMoveCvC(Board,Player1,Player2,X1,Y1,X2,Y2,NewBoard,NewPlayer).
        

makeMove(Complete,Claimed,Board,P1,P2,Colors,NewBoard,NewPlayer,NewColors):-
        printMoveMenu,
        read(Option),
        (
                Option = 1 -> normalMove(Complete,Board,P1,P2,Colors,NewBoard,NewPlayer,NewColors),B1=Board,NP1 =P1, NC1 = Colors,Claimed1 is Claimed;
                Option = 2 -> lyngkMove(Complete,Board,Colors,P1,NewBoard,NewPlayer,NewColors),B1 = Board, NP1 = P1, NC1 = Colors,Claimed1 is Claimed;
                Option = 3 -> Complete is 0,
                              (Claimed \= 1  -> claimColor(Colors,NC1,P1,NP1), B1 = Board, Claimed1 is 1;
                              write(' || You have already claimed a color this turn ||'),nl,nl, Claimed1 is 1);
                Option = 4 -> halt;

                write(' || Please choose a valid option. ||'),nl,nl,Complete is 0
        ),
        (Complete \= 1 -> makeMove(Complete1,Claimed1,B1,NP1,P2,NC1,NewBoard,NewPlayer,NewColors); nl).


lyngkMove(Complete,Board,Colors,Player,NewBoard,NewPlayer,NewColors):-
        getInitialPos(X,Y),
        index(Board,Y,X,Piece),
        nth0(0,Piece,Top),
        ( \+(member(Top,Player)) ->
            nl,Complete is 0, write(' || Ivalid piece for LYNGK move ||\n');
            lyngkMenu(Complete,Board,X,Y,X,Y,Player,NewBoard,NewPlayer), NewColors =Colors
            ).

lyngkMenu(Complete,Board,X0,Y0,X1,Y1,Player,NewBoard,NewPlayer):-
          printLYNGKMenu,
          read(Option),
          (
            Option = 1 -> intermediateMove(Board,Player,X1,Y1,X,Y,Valid),
                          (Valid = 0 ->nl,write(' || Invalid Position ||\n'), lyngkMenu(Complete,Board,X0,Y0,X1,Y1,Player,NewBoard,NewPlayer);
                            lyngkMenu(Complete,Board,X0,Y0,X,Y,Player,NewBoard,NewPlayer));
            Option = 2 -> finalMove(Complete,Board,Player,X0,Y0,X1,Y1,NewBoard,NewPlayer);

            write(' || Please choose a valid option. ||'),nl,nl,lyngkMenu(Complete,Board,X1,Y1,Player,NewBoard,NewPlayer)
          ).

finalMove(Complete,Board,P1,X0,Y0,X1,Y1,NewBoard,NewPlayer):-
          getFinalPos(X2,Y2),
          checkValidLYNGK(Complete,Board,P1,X0,Y0,X1,Y1,X2,Y2),
          (Complete = 1 ->  setPosition(Board, B, 0, 0, X0, Y0, [x]),
                            index(Board,Y0,X0,InitPos),
                            index(Board,Y2,X2,FinalPos),
                            append(InitPos,FinalPos,Final),
                            updatePlayer(B,P1,Final,X2,Y2,NewBoard,NewPlayer);
                            write('')
                         ).

checkValidLYNGK(Complete,Board,P1,X0,Y0,X1,Y1,X2,Y2):-
          (
          checkPiece(Board,[],X0,Y0), nl,write(' -> valid piece\n'),
          checkDiagonal(X1,X2,Y1,Y2),write(' -> valid diagonal\n'),
          checkDiagonalPositions(Board,X1,X2,Y1,Y2), write(' -> valid diagonal positions\n'),
          checkPosition(Board,X1,Y1),write(' -> valid initial position\n'),
          checkPosition(Board,X2,Y2),write(' -> valid final position\n'),
          checkFinalStack(Board,X0,Y0,X2,Y2), write(' -> valid final stack\n'),Complete is 1;
          nl,write(' || Invalid Move ||'),nl,nl,Complete is 0).

intermediateMove(Board,Player,X1,Y1,X2,Y2,Valid):-
        nl,write(' Select Intermidiate position'),nl,
        write(' Column number '),
        getColumnNumber(X2),
        write(' Line number '),
        getLineNumber(Y2),
        A is X1 - X2,
        B is Y1 - Y2,
        abs(A,Aabs), abs(B,Babs),
        index(Board,Y2,X2,Piece),
        nth0(0,Piece,Top),
        (( Aabs==1,Babs ==1, member(Top,Player))->Valid is 1; Valid is 0).



normalMoveCvC(Board,P1,P2,X1,Y1,X2,Y2,NewBoard,NewPlayer):-
        setPosition(Board, B, 0, 0, X1, Y1, [x]),
        index(Board,Y1,X1,InitPos),
        index(Board,Y2,X2,FinalPos),
        append(InitPos,FinalPos,Final),
        updatePlayer(B,P1,Final,X2,Y2,NewBoard,NewPlayer).
  

normalMove(Complete,Board,P1,P2,Colors,NewBoard,NewPlayer,NewColors):-
        getInitialPos(X1,Y1),
        getFinalPos(X2,Y2),
        checkValidMove(Complete,Board,P1,P2,X1,Y1,X2,Y2),
        (Complete = 1 ->  setPosition(Board, B, 0, 0, X1, Y1, [x]),
                          index(Board,Y1,X1,InitPos),
                          index(Board,Y2,X2,FinalPos),
                          append(InitPos,FinalPos,Final),
                          updatePlayer(B,P1,Final,X2,Y2,NewBoard,NewPlayer),
						  NewColors =Colors;
                          write(' || Invalid Move ||')
                       ).

updatePlayer(B,P1,Final,X2,Y2,NewBoard,NewPlayer):-
          length(Final,L),
          nth0(0,Final,Top),
          (
            (L = 5, member(Top,P1))-> setPosition(B, NewBoard, 0, 0, X2, Y2, [x]),
                                     nth0(0,P1,Points,Rest),
                                     NewPoints is Points + 1,
                                     append([NewPoints],Rest,NewPlayer);
                                     setPosition(B, NewBoard, 0, 0, X2, Y2, Final),NewPlayer = P1
          ).



checkValidMove(Complete,Board,P1,P2,X1,Y1,X2,Y2):-
        (
          checkPiece(Board,P2,X1,Y1),
          checkDiagonal(X1,X2,Y1,Y2),
          checkDiagonalPositions(Board,X1,X2,Y1,Y2),
          checkPosition(Board,X1,Y1),
          checkPosition(Board,X2,Y2),
          checkNeutralTop(Board,P1,X1,Y1,X2,Y2),
          checkFinalStack(Board,X1,Y1,X2,Y2),Complete is 1;
          Complete is 0
        ).


checkNeutralTop(Board,P1,X1,Y1,X2,Y2):-
        index(Board,Y1,X1,Piece1),
        nth0(0,Piece1,Top),
        (
          \+(member(Top,P1))-> index(Board,Y2,X2,Piece2),
                               (is_list(Piece1) ->length(Piece1,L1);L1 is 1),
                               (is_list(Piece2) ->length(Piece2,L2);L2 is 1),
                               L2 =< L1;
                               write('')
        ).

checkFinalStack(Board,X1,Y1,X2,Y2):-
        index(Board,Y1,X1,Piece1),
        index(Board,Y2,X2,Piece2),
        (is_list(Piece1) ->length(Piece1,L1);L1 is 1),
        (is_list(Piece2) ->length(Piece2,L2);L2 is 1),
        Total is L1 + L2,
        Total =< 5,
        append(Piece1,Piece2,Final),
        delete(Final,white,F1),
        delete(F1,white,F2),
        is_set(F2).

checkPosition(Board,X,Y):-
        index(Board,Y,X,Piece),
        nth0(0,Piece,Top),
        \+(Top = '.'),
        \+(Top = x).

checkPiece(Board,P2,X,Y):-
        index(Board,Y,X,Piece),
        nth0(0,Piece,Top),
        length(Piece,L),
        \+(L=5),
        \+(member(Top,P2)),
        \+(Top = white).

checkDiagonal(X1,X2,Y1,Y2):-
        abs(X1,X1abs), abs(X2,X2abs),
        A is X1abs - X2abs,
        abs(Y1,Y1abs), abs(Y2,Y2abs),
        B is Y1abs - Y2abs,
        abs(A,Aabs),abs(B,Babs),
        Aabs == Babs.

checkDiagonalPositions(Board,X1,X2,Y1,Y2):-
        A is X2-X1,
        B is Y2-Y1,
        ( A >= 0 -> Dx is 1 ; Dx is -1 ),
        ( B >= 0 -> Dy is 1 ; Dy is -1 ),
        X is X1+Dx,
        Y is Y1+Dy,
        checkCell(Board, X,Y,Dx,Dy,X2).

checkCell(Board, X1,Y1,Dx,Dy,X2):-
        X1==X2,
        Top = _,
        index(Board,Y1,X1,Piece),
        nth0(0,Piece,Top),
        \+(Top = x).

checkCell(Board, X1,Y1,Dx,Dy,X2):-
        Top = _,
        index(Board,Y1,X1,Piece),
        nth0(0,Piece,Top),
        Top == x,
        X is X1+Dx,
        Y is Y1+Dy,
        checkCell(Board, X,Y,Dx,Dy,X2).



getInitialPos(X,Y):-
        nl,write(' Select initial position'),nl,
        write(' Column number '),
        getColumnNumber(X),
        write(' Line number '),
        getLineNumber(Y).

getFinalPos(X,Y):-
        nl,write(' Select final position'),nl,
        write(' Column number '),
        getColumnNumber(X),
        write(' Line number '),
        getLineNumber(Y).


claimColor(Colors,FinalColors,Player,NewPlayer):-
        	colorsMenu(Colors,Idx),
          nth0(Idx, Colors, Color),
        	select(Color,Colors,NewColors),

          length(Player,Plength),
          (
            Plength == 4 ->
            NewPlayer = Player,
            FinalColors =Colors,
            write('  || You can only claim 2 colors ||'),nl,nl;

            append(Player,[Color],NewPlayer),
            FinalColors= NewColors
          ).



getValidMoves(Board,P1,P2,X1,Y1,X2,Y2,ValidMoves,NewValidMoves,Final):-
       
       (Y2 < 9 ->
     
              (X2< 13 ->   
                            (Y1<9 -> (  
                                        (X1 < 13 ->        
                                                   checkMove(Board,P1,P2,X1,Y1,X2,Y2,ValidMoves,NewValidMoves),
                                                   Xn is X1+1,
                                                   ((Y2 =8, Xn =13)->  Final =NewValidMoves;
                                                   getValidMoves(Board,P1,P2,Xn,Y1,X2,Y2,NewValidMoves,_,Final)); 
                                                   
                                                   (Xn is 0,Yn is Y1+1,getValidMoves(Board,P1,P2,Xn,Yn,X2,Y2,ValidMoves,NewValidMoves,Final))                       
                                        )
                                   );
                                  (Xn is 0, Yn is 0, X2n is X2+1,getValidMoves(Board,P1,P2,Xn,Yn,X2n,Y2,ValidMoves,NewValidMoves,Final))             
                            );
                            (Xn is 0, Yn is 0, X2n is 0, Y2n is Y2+1,getValidMoves(Board,P1,P2,Xn,Yn,X2n,Y2n,ValidMoves,NewValidMoves,Final)) 
              );
              true
       ).

checkMove(Board,P1,P2,X1,Y1,X2,Y2,L,L1):-
        checkValidMove(Complete1,Board,P1,P2,X1,Y1,X2,Y2),
        (Complete1 = 1 -> append([[X1,Y1,X2,Y2]],L,L1);
                          L1=L      
        ).
                       
                      
  