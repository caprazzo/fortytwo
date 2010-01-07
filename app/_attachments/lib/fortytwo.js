var FortyTwo = {
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