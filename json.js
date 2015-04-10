/*
  SystemJS JSON Format
  Provides the JSON module format definition.
*/
function _SYSTEM_addJSON(loader) {

	var jsonTest = /^[\s\n\r]*[\{\[]/;
	var loaderInstantiate = loader.instantiate;
	loader.instantiate = function(load) {
		var loader = this,
			parsed;

		if ( (load.metadata.format === 'json' || !load.metadata.format) && jsonTest.test(load.source)  ) {
		  
			try {
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
