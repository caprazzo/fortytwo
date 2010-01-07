var FortyTwo = {
	make_id_from_string: function(title) {
		if (!title) throw({error: 'title is not defined'});
		return title.toLowerCase()
			.replace('&','and')
			.replace(/[\(\)\{\}\[\]!%?*&\\\s]/g,'-')
			.replace(/-+/g,'-')
			.replace(/-$/,'')
			.replace(/"/g,'');
	}
	
}