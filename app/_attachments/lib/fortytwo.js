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
	},
	post_vote: function(id, vote, fn) {
		var url = '../../_update/vote/' + id + '?vote=' + vote;
		$.ajax({
			url: url,
			type: 'PUT',
			dataType: 'json',
			success: function(data) {
				var votes = data.votes;
				fn(votes);
			},
			error: function(a, b, c) {
				if(console) console.log(a);
			}
		});
	}
}