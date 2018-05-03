function getShow(name) {
	return new Promise(function (resolve, reject) {
		const xhr = new XMLHttpRequest();
	    xhr.open('GET', 'http://api.tvmaze.com/search/shows?q=' + name, true);

	    xhr.onload = function() {
	    	if (this.status === 200) {
	    		const res = JSON.parse(this.responseText);

	    		let shows = [];
	    		res.forEach(item => {
	    			shows.push({
	    				id: item.show.id,
	    				title: item.show.title
	    			})
	    		})
	    	} else {
	    		reject("api error :)")
	    	}
	    }
	})
}