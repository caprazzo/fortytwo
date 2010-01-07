var FortyTwo = {
	make_id_from_string: function(title) {
		if (!title) throw({error: 'title is not defined'});
		return title.toLowerCase()
			.replace('&','and')
			.replace(/[\(\)\{\}\[\]!%?*&\\\s]/g,'-')
			.replace(/-+/g,'-')
			.replace(/-$/,'')
			.replace(/"/g,'');
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
		
	},
	escape: function(s) {
		return s.toString().replace(/[&"<>\\]/g, function(s) {
			switch(s) {
				case "&": return "&amp;";
				case "\\": return "\\\\";;
				case '"': return '\"';;
				case "<": return "&lt;";
				case ">": return "&gt;";
				default: return s;
			}
		});
	},
	uuid: function(fn) {
		$.ajax({
			url: '/_uuids',
			dataType: 'json',
			success: function(data) {
				fn(data.uuids.shift());
			}
		})
	}
}