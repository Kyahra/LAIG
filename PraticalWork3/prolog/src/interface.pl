:-include('utils.pl').



%%%%%%%%%%%%%%%%% Main Menu %%%%%%%%%%%%%%%%%%%

mainMenu :-
        clearScreen,
        printMainMenu,
        read(Option),
        (
                Option = 1 -> playMenu;
                Option = 2 -> infoMenu;
                Option = 3 -> halt;

                mainMenu
        ).


printMainMenu :-
        write('========================================\n'),
        write('==                LYNGK               ==\n'),
        write('========================================\n'),
        write('==                                    ==\n'),
        write('==             1 - Play               ==\n'),
        write('==             2 - Info               ==\n'),
        write('==             3 - Exit               ==\n'),
        write('==                                    ==\n'),
        write('========================================\n').

%%%%%%%%%%%%%%%%% Play Menu %%%%%%%%%%%%%%%%%%%

playMenu :-
        clearScreen,
        printPlayMenu,
        read(Option),
        (
                Option = 1 -> startHvH;
                Option = 2 -> startPvC;
                Option = 3 -> startCvC;
                Option = 4 -> mainMenu;

                playMenu
        ).

printPlayMenu :-
        write('=================================================================\n'),
        write('==                LYNGK - Choose the type of game              ==\n'),
        write('==                        you wish to play                     ==\n'),
        write('=================================================================\n'),
        write('==                                                             ==\n'),
        write('==                   1 - Human vs Human                        ==\n'),
        write('==                   2 - Human vs PC                           ==\n'),
        write('==                   3 - PC vs PC                              ==\n'),
        write('==                   4 - Go back                               ==\n'),
        write('==                                                             ==\n'),
        write('=================================================================\n').

%%%%%%%%%%%%%%%%% Info Menu %%%%%%%%%%%%%%%%%%%

infoMenu :-
        clearScreen,
        printInfoMenu,
        read(_),
        mainMenu.

printInfoMenu :-
        write('======================================================================\n'),
        write('==                           LYNGK - Info                           ==\n'),
        write('======================================================================\n'),
        write('==                                                                  ==\n'),
        write('==  This is a project done in the subject of Logical Programming    ==\n'),
        write('==  at MIEIC course in FEUP.                                        ==\n'),
        write('==                                                                  ==\n'),
        write('==           Authors:                                               ==\n'),
        write('==                      Daniel Machado - 201506365                  ==\n'),
        write('==                      Sofia Alves    - 201504570                  ==\n'),
        write('==                                                                  ==\n'),
        write('======================================================================\n').


%%%%%%%%%%%%%%%%% Players %%%%%%%%%%%%%%%%%%%

printPlayer([H1|[H2|T1]]) :-
        printLines(2),
        write('=================================================================\n'),
        write('==                        PLAYER '),write(H2),write('`s turn                      ==\n'),
        write('=================================================================\n').

%%%%%%%%%%%%%%%%% Colors %%%%%%%%%%%%%%%%%%%

printPlayerInfo([H1|[H2|T1]]) :-
        write(' -> Player '), write(H2), write(': '), nl,
        write('      Points - '),write(H1),nl,
        write('      Colors - '),printList(T1),nl.

colorsMenu(Colors,Idx):-
        write(' Claim Color\n'),
        printColorsMenu(Colors,1),
        read(Option),
        length(Colors,Length),
        ( Option > Length -> colorsMenu(Colors,Idx); Idx is Option-1).



printColorsMenu([H|T],N):-
        write('   '), write(N), write(' - '),
        write(H), nl,
        N1 is N+1,
        printColorsMenu(T,N1).

printColorsMenu([],_).


%%%%%%%%%%%%%%%%% Move Menu %%%%%%%%%%%%%%%%%%

moveMenu(MoveType) :-

        (
                Option = 1 -> MoveType is 1;
                Option = 2 -> MoveType is 2;
                Option = 3 -> MoveType is 3;
                Option = 4 -> halt

        ).

printMoveMenu :-
        write(' Choose your move       \n'),
        write('   1 - Normal           \n'),
        write('   2 - LYNGK            \n'),
        write('   3 - Claim Color      \n'),
        write('   4 - Exit             \n'),
        write('                        \n').


printLYNGKMenu :-
        nl,
        write(' Choose your move       \n'),
        write('   1 - Intermidiate Move\n'),
        write('   2 - Final Move       \n'),
        nl.
