class TVMaze {

	constructor(){
		this.url = '';

	}

	async searchShows(searchWord){
		//get shows by search
		let encodeURL = encodeURIComponent(searchWord);
		let seriesResponse = await fetch(`http://api.tvmaze.com/search/shows?q=${encodeURL}`);
		let seriesData = await seriesResponse.json();

		
		
		// console.log();
		// let nextEpisodeResponse = await 
			
		// }

		return {
			seriesData: seriesData,
			// nextEpisodes:

		}

	}

	getNextEpisodes(series){
		//check if show has next episode
		let nextepisodeURL = []; 
		seriesData.forEach((serie) => {

			if (serie.show._links.hasOwnProperty('nextepisode')) {
				nextepisodeURL.push(serie.show._links.nextepisode)
				
			}else{
				nextepisodeURL.push('Unknown');
				
			}

			console.log(nextepisodeURL);

		});
	}

	// async getNextEpisode(url){
	// 	console.log(url);
	// 	let episodeResponse = await fetch(url);
	// 	let episodeData = await episodeResponse.json();

	// 	return {
	// 		episodeData: episodeData

	// 	}

	// }


}