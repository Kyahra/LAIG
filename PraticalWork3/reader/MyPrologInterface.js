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
		
	console.log(requestString);

    getPrologRequest(requestString, callback);
}

