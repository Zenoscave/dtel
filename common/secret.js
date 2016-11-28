module.exports = function(time) {
    var hash = 1;
    while(time > 0) {
        hash *= time % 256 * 31;
        time = Math.floor(time/256);
    }
    return hash.toString(17) + hash.toString(23);
};