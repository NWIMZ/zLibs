function unique(array) {
    var result = [];
    for(var i = 0;i<array.length;i++){
        var item = array[i];
        if(result.indexOf(item) === -1){
            result.push(item);
        }
    }
    return result;
}
