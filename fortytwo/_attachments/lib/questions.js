var Q = {
	make_id_from_string: function(title) {
		return title.toLowerCase()
			.replace('&','and')
			.replace(/[\(\)\{\}\[\]!%?*&\\\s]/g,'-')
			.replace(/-+/g,'-')
			.replace(/-$/,'');
	}	
}