function getShow(name) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
    	xhr.open('GET', 'http://api.tvmaze.com/singlesearch/shows?q=' + name, true);

    	xhr.onload = function() {
    		if (this.status === 200) {
    			const response = JSON.parse(this.responseText);

    			getNextEpisode(response.id)
    				.then(nextEpisode => {
    					resolve({
		    				id: response.id,
		    				title: response.name,
		    				image: response.image ? response.image.original : 'http://placehold.it/300x400',
		    				desc: response.summary,
		    				nextEpisode: nextEpisode
		    			});
	    			})
    				.catch(err => {
    					console.log(err);
    				});
    		} else {
    			reject('API Error: ' + this.responseText);
    		}
    	}

    	xhr.send();
	});
}

function getShows(name) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
	    xhr.open('GET', 'http://api.tvmaze.com/search/shows?q=' + name, true);

	    xhr.onload = function() {
	    	if (this.status === 200) {
	    		const res = JSON.parse(this.responseText);

	    		let shows = [];
	    		res.forEach(item => {
	    			shows.push({
	    				id: item.show.id,
	    				title: item.show.name,
	    				image: item.show.image ? item.show.image.original : 'http://placehold.it/300x400',
	    				desc: item.show.summary,
	    				nextEpisode: ''
	    			});
	    		});

	    		resolve(shows);
	    	} else {
	    		reject("API Error: " + this.responseText);
	    	}
	    }

	    xhr.send();
	});
}

function getNextEpisode(showId) {
	return new Promise((resolve, reject) => {
	    const xhr = new XMLHttpRequest();
	    xhr.open('GET', `http://api.tvmaze.com/shows/${showId}?embed=nextepisode`, true);

	    xhr.onload = function() {
	    	if (this.status === 200) {
	      		const response = JSON.parse(this.responseText);

		        if (response.hasOwnProperty('_embedded') && response._embedded.hasOwnProperty('nextepisode')) {
		    		let nextSeason = response._embedded.nextepisode.season;
		     		let episode = response._embedded.nextepisode.number;

		     		resolve(nextSeason > 9 ? 'S' : 'S0' + nextSeason + 'E' + episode);
		        } else {
		         	resolve('Unknown');
		        }
	    	} else {
	        	reject('API Error: ' + this.responseText);
	    	}
	    }

	    xhr.send();
	});
}

function getNextEpisodes(shows) {
	return new Promise((resolve, reject) => {
		if (Array.isArray(shows)) {
			let i = 1;
			shows.forEach(show => {
				getNextEpisode(show.id)
					.then(nextEpisode => {
						show.nextEpisode = nextEpisode;

						if (i++ === shows.length) {
							resolve(shows);
						}
					})
					.catch(err => {
						reject(err);
					});
			});
		} else {
			reject('Array was not provided.');
		}
	});
}

function getTemplate(show) {
  return `
    <div class="col-sm-6 col-md-4 col-lg-3 mt-4">
        <div class="card card-inverse card-info">
            <img class="card-img-top img-fluid" src="${show.image}">
            <div class="card-block">
                <h4 class="card-title">${show.title}</h4>
                <div class="card-text">
                    ${show.desc}
                </div>
            </div>
            <div class="card-footer">
                <small>Next Episode: ${show.nextEpisode}</small>
                <br>
                <small>Date: 28/03-2018</small>
                <button class="btn btn-success float-right btn-md">Tilføj serie</button>
            </div>
        </div>
    </div>
    `;
}

function getTemplates(shows) {
	return new Promise((resolve, reject) => {
		if (Array.isArray(shows)) {
			let templates = [];
			
			shows.forEach(show => {
				templates.push(getTemplate(show));
			});

			resolve(templates);
		} else {
			reject('Array was not provided.');
		}
	});
}

getShows('bad')
	.then(getNextEpisodes)
	.then(getTemplates)
	.then(templates => {
		templates.forEach(template => {
			document.querySelector('#test').innerHTML += template;
		});
	})
	.catch(err => {
		console.log(err);
	});