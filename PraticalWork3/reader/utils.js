
/**
 * Returns the midpoint between two points.
 * @param point1 First point.
 * @param point2 Second point.
 * @returns {[*,*,*,*]} Mid point
 */

function midPoint(point1, point2) {
    return [(point1[0] + point2[0]) / 1.5, (point1[1] + point2[1]) / 1.5, (point1[2] + point2[2]) / 1.5, (point1[3] + point2[3]) / 1.5];
}
/*
function midPoint(point1, point2) {
    return [(point1[0] + point2[0]) / 2, (point1[1] + point2[1]) / 2, (point1[2] + point2[2]) / 2, (point1[3] + point2[3]) / 2];
}*/


function addPoints(point1, point2) {
    return [point1[0] + point2[0], point1[1] + point2[1], point1[2] + point2[2]];
}

function subtractPoints(point1, point2) {
    return [point2[0] - point1[0], point2[1] - point1[1], point2[2] - point1[2]];
}

function dividePoint(point, divisor) {
    return [point[0]/divisor, point[1]/divisor, point[2] /divisor];
}

function distance(point1, point2) {
    return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2) + Math.pow(point1[2] - point2[2], 2));
}

function vectorNorm(vector) {
	var vMag = Math.sqrt(vector[0] * vector[0] + vector[1]* vector[1] + vector[2]* vector[2])
	return [vector[0] / vMag, vector[1] / vMag, vector[2] / vMag]
}


function dotProduct(vector1, vector2) {
	var v1 = vectorNorm(vector1);
	var v2 = vectorNorm(vector2);

    return (v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]);
}

function angleBetween(vector1, vector2) {
    return Math.acos(dotProduct(vector1, vector2));
}

radians = function(degrees) {
  return degrees * Math.PI / 180;
};

GAMEMODE = {
    HUMAN_VS_HUMAN: 0,
    HUMAN_VS_CPU: 1,
    CPU_VS_CPU: 2
};

THEME = {
    LEGACY: 0,
    NORMAL: 1
};
