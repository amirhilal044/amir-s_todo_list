//use module exports to be able to use the functions
//exports are object, we just assign the params
exports.getDateTitle = function() {

    let date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

    return date.toLocaleDateString("en-US", options)
}

exports.getDate = function () {

    let date = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    return date.toLocaleDateString("en-US", options)
}


exports.getDay = function() {

    let date = new Date();
    const options = { weekday: 'long' };

    return date.toLocaleDateString("en-US", options);
}