function O(init) {
	if (init) { // shallow copy
		var F = function() {};
		F.prototype = init;
		init = new F();
	} else init = {}; 
	return function f(o) {	
		if (o !== undefined) {
			for (k in o)
				init[k] = o[k];
			return f;
		}
		return init;
	}
};