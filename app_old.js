function getShow(name){

  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'http://api.tvmaze.com/singlesearch/shows?q=' + name, true);
  // xhr.open('GET', `http://api.tvmaze.com/singlesearch/shows?q=${name}`, true);
  // xhr.open('GET', `http://api.tvmaze.com/shows/4?embed=nextepisode`, true);
  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);
      // console.log(response.id);
      // console.log(nextEpisode(response.id));
      let show = {
        'title': response.name, 
        'image': response.image['original'], 
        'desc': response.summary,
      }

      data.push(show);
      // let output = template(response);

      // document.querySelector('.test').innerHTML = output;
    }else{
      console.log("there is something wrong bruh!");
    }
  }
  xhr.send();
}

function nextEpisode(id){
  console.log(id);
  const xhr = new XMLHttpRequest();

  // xhr.open('GET', 'http://api.tvmaze.com/singlesearch/shows?q=arrow', true);
  // xhr.open('GET', `http://api.tvmaze.com/singlesearch/shows?q=${name}`, true);
  xhr.open('GET', `http://api.tvmaze.com/shows/${id}?embed=nextepisode`, true);

  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);
      // console.log(response);
      let season = response._embedded.nextepisode.season;
      let episode = response._embedded.nextepisode.number;
      let nextEpisode = season + "X" + episode;
      console.log(nextEpisode); // ?????????????????????????????????????????????????????
      return nextEpisode;   
    }else{
      console.log("there is something wrong bruh!");
    }
  }
  xhr.send();
}

function template(show){
  console.log(show);
  return `
    <div class="card u-clearfix">    
      <div class="card-media">
        <img src="${show.image['original']}" alt="" class="card-media-img" />
        <div class="u-clearfix"></div>
        <div class="nextepisode">Next: </div>
        <div class="nextdate"></div>
        <div class="watched">Seen: S03E44</div>
      </div>
      
      <div class="card-body">
        <h2 class="card-body-heading">${show.name}</h2>
        <div class="summary">${show.summary}</div>
    </div>
    `;
}

function fetchAllShows(){
  data.forEach(function(show){
    // console.log(show);
    document.querySelector('.test').innerHTML += template(show);
  });
}



let data = [];

getShow('arrow');
setTimeout(function() {

  // fetchAllShows();
}, 2000);
console.log(data);

