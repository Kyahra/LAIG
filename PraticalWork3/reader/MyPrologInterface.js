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

function getMove(board,player1, player2,callback){
  let requestString = 'getMove('
        + JSON.stringify(board).replace(/"/g, '') + ','
        + JSON.stringify(player1).replace(/"/g, '') + ','
        + JSON.stringify(player2).replace(/"/g, '') + ')';

  getPrologRequest(requestString,callback);

}


function humanPlay(board, initPos, finalPos, player1, player2, callback) {
    let requestString = 'humanPlay('
        + JSON.stringify(board).replace(/"/g, '') + ','
        + JSON.stringify(initPos) + ','
        + JSON.stringify(finalPos) + ','
        + JSON.stringify(player1).replace(/"/g, '') + ','
        + JSON.stringify(player2).replace(/"/g, '') + ')';

    getPrologRequest(requestString, callback);
}

function isGameOver(board, player1, player2, callback) {
    let requestString = 'isGameOver('
        + JSON.stringify(board).replace(/"/g, '') + ','
        + JSON.stringify(player1).replace(/"/g, '') + ','
        + JSON.stringify(player2).replace(/"/g, '') + ')';

    getPrologRequest(requestString, callback);
}
