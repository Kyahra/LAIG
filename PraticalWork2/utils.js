
function addPoints(point1, point2) {
    return [point1[0] + point2[0], point1[1] + point2[1], point1[2] + point2[2]];
}

function addPoints(point, divisor) {
    return [point[0]/divisor, point[1]/divisor, point[2] /divisor];
}

function distance(point1, point2) {
    return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2) + Math.pow(point1[2] - point2[2], 2));
}