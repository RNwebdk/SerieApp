



class App {

	constructor(){
		this.page = '';

		this.tvmaze = new TVMaze;
		this.ui = new UI;

		// Index page
		this.search = document.querySelector('#search');
		this.searchText = '';

		// Favorite page
		this.deleteFavorite = document.querySelector('#deleteFavorite');
		

		// Init a timeout variable to be used below
		this.timeout = null;
	}

	run(){
		//set navigation
		// this.setNavigation();

		this.setSearch();
		// this.ui.saveToFavorite();
		// this.deleteFavorite.addEventListener('click', this.ui.clearFavorite);

	}

	setNavigation(){
		let navLinks = document.querySelectorAll('.nav-link');

		navLinks.forEach((link) => {
			link.addEventListener('click', (e) =>{
				e.preventDefault();

				// if () {
					
				// }
			})
		});
	}

	setSearch(){
		this.search.addEventListener('keyup', (e) => {

			// Clear the timeout if it has already been set.
		    // This will prevent the previous task from executing
		    // if it has been less than <MILLISECONDS>
		    clearTimeout(this.timeout);


		    // Make a new timeout set to go off in 800ms
		    this.timeout = setTimeout(() => {
		        
		    	this.searchText = e.target.value;

		    	if (this.searchText !== '') {
					this.tvmaze.searchShows(this.searchText)
					.then(data => {
						// console.log(data);
						this.ui.getShows(data.seriesData);
					});
				}else{
					this.ui.clearSearch();
				}


		    }, 1000);
			
		});
	}


}

const app = new App;

app.run();