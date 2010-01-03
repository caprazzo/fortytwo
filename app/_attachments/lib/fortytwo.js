var FortyTwo = {
	make_id_from_string: function(title) {
		if (!title) throw({error: 'title is not defined'});
		return title.toLowerCase()
			.replace('&','and')
			.replace(/[\(\)\{\}\[\]!%?*&\\\s]/g,'-')
			.replace(/-+/g,'-')
			.replace(/-$/,'');
	},
	
	zeropad: function(number, size) {
		var rt = number + '';
		while (rt.length < size) {
			rt = '0' + rt;
		}
		return rt;
	},
	make_timestamp_from_date: function(date) {
		return date.getUTCFullYear()
			+ '-' + FortyTwo.zeropad(date.getUTCMonth(), 2)
			+ '-' + FortyTwo.zeropad(date.getUTCDate() ,2)
			+ '-' + FortyTwo.zeropad(date.getUTCHours(), 2)
			+ FortyTwo.zeropad(date.getUTCMinutes(), 2);
		
	},
	question_details_link: function(question_id) {
		
	}
	
	
}