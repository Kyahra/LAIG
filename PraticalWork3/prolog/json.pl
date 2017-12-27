json(List, Output):-
    is_list(List),
    list_to_json(List, Output).
