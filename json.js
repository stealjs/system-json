/*
  SystemJS JSON Format
  Provides the JSON module format definition.
*/
function _SYSTEM_addJSON(loader) {

  // if someone has a moduleName that is .json, make sure it loads a json file
  // no matter what paths might do
  //var loaderLocate = loader.locate;
  //loader.locate = function(load){
  //  return loaderLocate.apply(this, arguments).then(function(address){
  //    return address;
  //  });
  //};
  var jsonTest = /^[\s\n\r]*[\{\[]/;
  var loaderInstantiate = loader.instantiate;
  loader.instantiate = function(load) {
    var loader = this,
        parsed;

    if ( (load.metadata.format === 'json' || !load.metadata.format) && jsonTest.test(load.source)  ) {
      
      try{
        parsed = JSON.parse(load.source);
      } catch(e) {}
      if(parsed) {
        load.metadata.format = 'json';

	      load.metadata.execute = function(){
	        return parsed;
	      };
      }
      

    }
    return loaderInstantiate.call(loader, load);
  };

  return loader;
}

if (typeof System !== "undefined") {
  _SYSTEM_addJSON(System);
}
