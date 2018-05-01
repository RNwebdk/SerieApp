function getShow(name){
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    console.log('http://api.tvmaze.com/singlesearch/shows?q=' + name);
    xhr.open('GET', 'http://api.tvmaze.com/singlesearch/shows?q=' + name, true);
    // xhr.open('GET', `http://api.tvmaze.com/singlesearch/shows?q=${name}`, true);
    // xhr.open('GET', `http://api.tvmaze.com/shows/4?embed=nextepisode`, true);

    xhr.onload = function() {
      if(this.status === 200) {
        const response = JSON.parse(this.responseText);
        // let output = template(response);

        let show = {
          'id': response.id,
          'title': response.name, 
          'image': response.image['original'], 
          'desc': response.summary
        }

        data.push(show);

        // document.querySelector('.test').innerHTML = output;
        resolve(response.id);
      }else{
        reject("error: could not get show from API");
      }
    }
    xhr.send();

  });
}



function nextEpisode(id){
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    console.log('this is the id for nextEpisode');
    console.log(id);
    // xhr.open('GET', 'http://api.tvmaze.com/singlesearch/shows?q=arrow', true);
    // xhr.open('GET', `http://api.tvmaze.com/singlesearch/shows?q=${name}`, true);
    xhr.open('GET', `http://api.tvmaze.com/shows/${id}?embed=nextepisode`, true);

    xhr.onload = function() {
      if(this.status === 200) {
        const response = JSON.parse(this.responseText);

        let nextEpisode;
        if (response.hasOwnProperty('_embedded')) {
          let nextSeason = response._embedded.nextepisode.season;
          let episode = response._embedded.nextepisode.number;
          nextEpisode = "S0" + nextSeason + "E" + episode;
          
        }else{
          nextEpisode = 'Unknown';
        }
        // console.log(response._embedded.nextepisode.season);
        
        for (var i = 0; i < data.length; i++) {
          if (data[i].id == id) {
            data[i].nextEpisode = nextEpisode;
          }
        }
        console.log(data);
        resolve();
      }else{
        reject('next episode was not found');
      }
    }
    xhr.send();
  });
}

function fetchShows(){
  return new Promise(function(resolve, reject){
      data.forEach(function(show){
        document.getElementById('test').innerHTML = template(show);
      })
  });
}

function template(data){

  // console.log(`${nextEpisode(data.id)}`);
  return `
    <div class="card u-clearfix">    
      <div class="card-media">
        <img src="${data.image}" alt="" class="card-media-img" />
        <div class="u-clearfix"></div>
        <div class="nextdate">Next: ${data.nextEpisode}</div>
        <div class="watched">Seen: S03E44</div>
      </div>
      
      <div class="card-body">
        <h2 class="card-body-heading">${data.title}</h2>
        <div class="summary">${data.desc}</div>
    </div>
    `;
}

let data = [];

getShow('friends')
.then(nextEpisode)
.then(fetchShows)
.catch(function(err){
  console.log(err);
});