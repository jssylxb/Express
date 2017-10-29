var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
exports.getNumber = function() {
    var idx = Math.floor(Math.random() * numbers.length);
    return numbers[idx];
};