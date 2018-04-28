function unique(array) {
    var result = [];
    var hash = {};
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        var key = typeof(item) + item;
        if(hash[key] != -1){
            result.push(item);
            hash[key] = 1;
        }
    }
    return result;
}