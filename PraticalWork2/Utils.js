

function distance(point1, point2) {
    return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2) + Math.pow(point1[2] - point2[2], 2));
}


function normalizeVector(vector) {
   let norm = distance([0, 0, 0], vector);
    return [vector[0]/norm, vector[1]/norm, vector[2]/norm];
}

function subtractPoints(point1, point2) {
    return [point2[0] - point1[0], point2[1] - point1[1], point2[2] - point1[2]];
}