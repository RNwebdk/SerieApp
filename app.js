function getShows(name){
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.tvmaze.com/search/shows?q=' + name, true);

    xhr.onload = function() {
      if(this.status === 200) {
        console.log(this.responseText);
        const response = JSON.parse(this.responseText);
        let output = template(response);
        console.log(response);
        let shows = [];

        response.forEach(res => {
          shows.push({
            id: res.show.id,
            title: res.show.name, 
            image: res.show.image ? res.show.image.original : 'http://placehold.it/300x400',
            desc: res.show.summary,
            nextEpisode: ''
          });
        })

        resolve(shows);
      }else{
        reject("error: could not get show from API");
      }
    }
    xhr.send();

  });
}

function getShow(name) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    console.log('http://api.tvmaze.com/singlesearch/shows?q=' + name);
    xhr.open('GET', 'http://api.tvmaze.com/singlesearch/shows?q=' + name, true);

    xhr.onload = function() {
      if(this.status === 200) {
        const response = JSON.parse(this.responseText);

        let show = {
          id: response.id,
          title: response.name, 
          image: response.image ? response.image.original : null, 
          desc: response.summary,
          nextEpisode: null
        }
     
        resolve(show);
      }else{
        reject("error: could not get show from API");
      }
    }
    xhr.send();

  });
}


function nextEpisode(show) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://api.tvmaze.com/shows/${show.id}?embed=nextepisode`, true);

    xhr.onload = function() {
      if(this.status === 200) {
        const response = JSON.parse(this.responseText);

        if (response.hasOwnProperty('_embedded')) {
          let nextSeason = response._embedded.nextepisode.season;
          let episode = response._embedded.nextepisode.number;
          show.nextEpisode = "S0" + nextSeason + "E" + episode;
        }else{
          show.nextEpisode = 'Unknown';
        }

        resolve(show);
      }else{
        reject('next episode was not found');
      }
    }
    xhr.send();
  });
}

function nextEpisodes(shows) {
  let newShows = shows;
  return new Promise(function(resolve, reject) {
    for (let i = 0; i < shows.length; i++) {
      nextEpisode(shows[i])
        .then(show => {
          newShows.push(show);
        })
        .catch(err => {
          reject(err);
        });
    }

    resolve(newShows);
  });
}

function template(show) {
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

function templates(shows) {
  let templatesArr = [];
  shows.forEach(show => {
    templatesArr.push(template(show));
  });

  return templatesArr
}

getShows('test')
  .then(nextEpisodes)
  .then(shows => {
    templates(shows).forEach(templateStr => {
      console.log(templateStr);
      document.querySelector('#test').innerHTML += templateStr;
    });
  })
  .catch(err => {
    console.log(err);
  });
