

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
