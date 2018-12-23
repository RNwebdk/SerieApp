class UI{
	constructor(){
		this.tvmaze = new TVMaze;
		this.series = document.querySelector('#series');
		this.serie = document.querySelector('#serie');
		
		
	}

	getShows(shows){
		this.clearSearch();
			shows.forEach(show =>{
				this.series.innerHTML += this.searchTemplate(show);
			});

	}

	// http://placehold.it/300x400
	searchTemplate(serie){
		 return `
	    <div class="card card-inverse card-info">
	    	<div class="card-header">${serie.show.name}</div>
            <img class="card-img-top img-fluid" src="${serie.show.image.medium}">
            <div class="favoriteButton col-lg-12">Favorite</div>
        </div>`;

	}

	getNextEpisode(serie){
		if (serie._links.hasOwnProperty('nextepisode')) {
				// make new promise here
				let test = this.tvmaze.getNextEpisode(serie._links.nextepisode.href); 
				return test;
				
				// console.log(serie._links.nextepisode.href).then();
			}else{
				return "Unknown"
			}
	  //         let nextSeason = response._embedded.nextepisode.season;
	  //         let episode = response._embedded.nextepisode.number;
	  //         show.nextEpisode = "S0" + nextSeason + "E" + episode;
	  //       }else{
	  //         show.nextEpisode = 'Unknown';
	  //       }
	}

	clearSearch(){
		this.series.innerHTML = ''
	}

	saveToFavorite(){
		var testObject = { 'one': 1, 'two': 2, 'three': 3 };

		// Put the object into storage
		localStorage.setItem('testObject', JSON.stringify(testObject));

		// Retrieve the object from storage
		var retrievedObject = localStorage.getItem('testObject');

		console.log('retrievedObject: ', JSON.parse(retrievedObject));

	}

	LoadFromFavorite(){
		// Retrieve the object from storage
		var retrievedObject = localStorage.getItem('testObject');
	}

	clearFavorite(){
		console.log("favorite has been cleared");
		localStorage.clear();
	}
}