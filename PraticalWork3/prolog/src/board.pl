:-use_module(library(random)).

board([
         [.,.,.,.,.,.,x,.,.,.,.,.,.],
         [.,.,.,x,.,x,.,x,.,x,.,.,.],
         [x,.,x,.,x,.,x,.,x,.,x,.,x],
         [.,x,.,x,.,x,.,x,.,x,.,x,.],
         [x,.,x,.,x,.,x,.,x,.,x,.,x],
         [.,x,.,x,.,x,.,x,.,x,.,x,.],
         [x,.,x,.,x,.,x,.,x,.,x,.,x],
         [.,.,.,x,.,x,.,x,.,x,.,.,.],
         [.,.,.,.,.,.,x,.,.,.,.,.,.]

      ]).



board2([
         [.,.,.,.,.,.,p,.,.,.,.,.,.],
         [.,.,.,e,.,m,.,v,.,a,.,.,.],
         [m,.,e,.,a,.,e,.,e,.,b,.,a],
         [.,v,.,p,.,b,.,m,.,v,.,m,.],
         [b,.,b,.,a,.,e,.,p,.,b,.,p],
         [.,p,.,v,.,m,.,v,.,a,.,b,.],
         [e,.,v,.,a,.,e,.,e,.,m,.,b],
         [.,.,.,m,.,p,.,a,.,p,.,.,.],
         [.,.,.,.,.,.,v,.,.,.,.,.,.]

      ]).


board3([
         [[.],[.],[.],[.],[.],[.],[p,m,v],[.],[.],[.],[.],[.],[.]],
         [[.],[.],[.],[e],[.],[m],[.],[v],[.],[a],[.],[.],[.]],
         [[m],[.],[e],[.],[a],[.],[e],[.],[e],[.],[b,a,v],[.],[a]],
         [[.],[v],[.],[p],[.],[b,p],[.],[m],[.],[v],[.],[m,v],[.]],
         [[b],[.],[b],[.],[a],[.],[e,p,v,a,b],[.],[p],[.],[b],[.],[p]],
         [[.],[p,e,v,a,b],[.],[v],[.],[m],[.],[v],[.],[a,m,v],[.],[b],[.]],
         [[e],[.],[v],[.],[a],[.],[e],[.],[e],[.],[m],[.],[b]],
         [[.],[.],[.],[m,p,v],[.],[p],[.],[a],[.],[p,a,m,v],[.],[.],[.]],
         [[.],[.],[.],[.],[.],[.],[v],[.],[.],[.],[.],[.],[.]]

      ]).


board4([
        [[.],[.],[.],[.],[.],[.],[x],[.],[.],[.],[.],[.],[.]],
        [[.],[.],[.],[x],[.],[x],[.],[x],[.],[x],[.],[.],[.]],
        [[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x]],
        [[.],[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x],[.]],
        [[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x]],
        [[.],[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x],[.]],
        [[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x]],
        [[.],[.],[.],[x],[.],[x],[.],[x],[.],[x],[.],[.],[.]],
        [[.],[.],[.],[.],[.],[.],[x],[.],[.],[.],[.],[.],[.]]

      ]).


board5([
        [[.],[.],[.],[.],[.],[.],[blue],[.],[.],[.],[.],[.],[.]],
        [[.],[.],[.],[x],[.],[x],[.],[x],[.],[x],[.],[.],[.]],
        [[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x]],
        [[.],[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x],[.]],
        [[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[red],[.],[x]],
        [[.],[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x],[.]],
        [[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x],[.],[x]],
        [[.],[.],[.],[x],[.],[x],[.],[x],[.],[x],[.],[.],[.]],
        [[.],[.],[.],[.],[.],[.],[x],[.],[.],[.],[.],[.],[.]]

      ]).


printBoard(Board) :-
        nl,write('---------------------------------------------------------------------------------------------------------------------------------------------------------------'),nl,
        printRowByRow(Board,0), nl,nl,
        write('---------------------------------------------------------------------------------------------------------------------------------------------------------------'),nl,
        write(' |     0     |     1     |     2     |     3     |     4     |     5     |     6     |     7     |     8     |     9     |    10     |    11     |    12     | '),
        printBlackLine.

printBlackLine :-
        nl,
        write('---------------------------------------------------------------------------------------------------------------------------------------------------------------'),
        nl.

printRowByRow([],9).
printRowByRow([Line|Rest], N) :-
      %  write(' | '),
        write(' |           |           |           |           |           |           |           |           |           |           |           |           |           |'),nl,

        write(' | '),
        printSingleRow(Line, N),
              N1 is N+1,
        printRowByRow(Rest, N1).

printSingleRow([Cell], N):-
        printCell(Cell),
        write(' |      '),
        write(' | '),
        write(N),
        write(' | '),nl,
        write(' |           |           |           |           |           |           |           |           |           |           |           |           |           |'),nl,

        printBlackLine.

printSingleRow([Cell|More],N):-
        printCell(Cell),
        write(' | '),
        printSingleRow(More,N).


printCell(Cell):-
        lengthOf(Cell,L),
        cellLength(Cell,L).

cellLength(Cell,L):-
        L == 1,
        write('    '),
        printContent(Cell,1,1),
        write('    ').

cellLength(Cell,L):-
        L == 2,
        write('   '),
        printContent(Cell,1,2),
        write('   ').

cellLength(Cell,L):-
        L == 3,
        write('  '),
        printContent(Cell,1,3),
        write('  ').

cellLength(Cell,L):-
        L == 4,
        write(' '),
        printContent(Cell,1,4),
        write(' ').

cellLength(Cell,L):-
        L == 5,
        printContent(Cell,1,5).


printContent([],_,_).

printContent([H|_],N,L):-
       N == L,
       transform(H,X),
       write(X).


printContent([H|T],N,L):-
        N1 is N+1,
        transform(H,X), write(X), write(' '),
        printContent(T,N1,L).



lengthOf([], 0).
lengthOf([_|T], L):-
       lengthOf(T, TailLength),
       L is TailLength + 1.



%-------------------------------------------------%
%      Cria tabuleiro com posicoes aleatorias
%-------------------------------------------------%


createBoard(Board, FinalBoard) :-
        Positions = [ [6,0],
                     [3,1], [5,1], [7,1], [9,1],
                     [0,2], [2,2], [4,2], [6,2], [8,2], [10,2], [12,2],
                     [1,3], [3,3], [5,3], [7,3], [9,3], [11,3],
                     [0,4], [2,4], [4,4], [6,4], [8,4], [10,4], [12,4],
                     [1,5], [3,5], [5,5], [7,5], [9,5], [11,5],
                     [0,6], [2,6], [4,6], [6,6], [8,6], [10,6], [12,6],
                     [3,7], [5,7], [7,7], [9,7],
                     [6,8]
                    ],
        createBoard(Board, FinalBoard ,Positions, 1,[[red],[red],[red],[red],[red],[red],[red],[red],
                                                      [black],[black],[black],[black],[black],[black],[black],[black],
                                                      [ivory],[ivory],[ivory],[ivory],[ivory],[ivory],[ivory],[ivory],
                                                      [green],[green],[green],[green],[green],[green],[green],[green],
                                                      [blue],[blue],[blue],[blue],[blue],[blue],[blue],[blue],
                                                      [white],[white],[white]]).


createBoard(Board, FinalBoard, [Head| _], 43, List) :-
        X = _,
        L = _,
        random_select(X,List,L),
        setPosition(Board, FinalBoard, Head, X).


createBoard(Board, FinalBoard, [Head| Tail], N, List) :-
        N1 is N+1,
        X = _,
        L = _,
        random_select(X,List,L),
        setPosition(Board, TabuleiroTemp, Head, X),
        createBoard(TabuleiroTemp, FinalBoard, Tail, N1, L).

setPosition(Board, FinalBoard, [X | Y], Cell) :-
        setPosition(Board, FinalBoard, X, Y, Cell).

setPosition(Board, FinalBoard,  X, [Y | _], Cell) :-
        setPosition(Board, FinalBoard,0, 0, X, Y, Cell).


setPosition([H | T], [H2 | T2], _, Y, XLimit, YLimit, Cell) :-
        Y == YLimit,
        Y1 is Y + 1,
        setLinePosition(H, H2, 0, XLimit, Cell),
        setPosition(T, T2, 0, Y1, XLimit, YLimit, Cell).

setPosition([H | T], [H2 | T2], _, Y, XLimit, YLimit, Cell) :-
        Y < 9,
        Y1 is Y + 1,
        H2 = H,
        setPosition(T, T2, 0, Y1, XLimit, YLimit, Cell).

setPosition(_, _, _, _, _, _, _).


setLinePosition([_ | T], [H2 | T2], X, XLimit, Cell) :-
        X == XLimit,
        X1 is X + 1,
        H2 = Cell ,  % [Casa | vazio]
        setLinePosition(T, T2, X1, XLimit, Cell).

setLinePosition([H | T], [H2 | T2], X, XLimit, Cell) :-
        X < 13,
        X1 is X + 1,
        H2 = H,
        setLinePosition(T, T2, X1, XLimit, Cell).

setLinePosition(_, _, _, _, _).




getLinePosition([H | T], X, XLimit, Cell) :-
        X == XLimit,
        X1 is X + 1,
        Cell = H ,  % [Casa | vazio]
        getLinePosition(T, X1, XLimit, Cell).

getLinePosition([H | T], X, XLimit, Cell) :-
        X < 13,
        X1 is X + 1,
        getLinePosition(T, X1, XLimit, Cell).

getLinePosition(_, _, _, _).

%---- para testar
%- colocaCasa(T, T2, [6,0], 5), board(T), printBoard(T2).
