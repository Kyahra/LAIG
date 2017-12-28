function getPrologRequest(requestString, onSuccess, onError, port) {
    let requestPort = port || 8081;
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

    request.onload = onSuccess;

    request.onerror = onError || prologRequestError;

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}

function prologRequestError(data) {
    console.log('Prolog request error:');
    console.log(data);
}



function claimColor(color, colors, player, callback) {
    let requestString = 'claim('
        + color + ','
        + JSON.stringify(colors).replace(/"/g, '') + ','
        + JSON.stringify(player).replace(/"/g, '') + ')';

    getPrologRequest(requestString, callback);
}


function humanPlay(validMove, board, initPos, finalPos, player1, player2, colors, newBoard, newPlayer, newColors, callback) {
    let requestString = 'humanPlay('
        + validMove + ','
        + JSON.stringify(board) + ','
        + JSON.stringify(initPos) + ','
        + JSON.stringify(finalPos) + ','
        + JSON.stringify(player1) + ','
        + JSON.stringify(player2) + ','
        + JSON.stringify(colors) + ','
        + JSON.stringify(newBoard) + ','
        + JSON.stringify(newPlayer) + ','
        + JSON.stringify(newColors) + ')';

    getPrologRequest(requestString, callback);
}
