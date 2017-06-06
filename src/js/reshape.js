
function reshape(test){
  var obj;
  var keys = Object.keys(test);
  var data = [];

  for(i=0; i<test[keys[0]].length ; i++){
    obj = {};
    for(key in keys){
      obj[keys[key]] = test[keys[key]][i];
    }
    data.push(obj);
  }

  return data;
}