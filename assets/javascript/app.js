let topiclist = ['Spongebob', 'Kim Possible', 'Looney Tunes', 'Tom and Jerry', 'Teen Titans'],
    moretopic = document.querySelector('#userinput'),
    makebtn,
    gif,
    addgifs,
    favgif =  JSON.parse(localStorage.getItem('favgif')) || []

const topicbtn = () => {
    document.querySelector('#userinput').value = ''
    document.querySelector('#topics').innerHTML = ''
    favgif.forEach(favorite => {
        let favgif = document.createElement('img')
        favgif.setAttribute('src', favorite)
        favgif.className = 'favgif'
        document.querySelector('.favgifs').append(favgif)
    })
    for (i = 0; i < topiclist.length; i++) {
        makebtn = document.createElement('button')
        makebtn.textContent = topiclist[i]
        makebtn.value = topiclist[i]
        makebtn.className = 'gifbtns'
        document.querySelector('#topics').append(makebtn)
    }
}

const getgif = e => {
    fetch(`https://api.giphy.com/v1/gifs/search?q=${e}&api_key=hisHnd4J8mVXb4QHuGyDQthEz43XLytH&limit=10`)
    .then (r => r.json())
    .then (r => {
        r.data.forEach(gif => {
            addgifs = document.createElement('img')
            addgifs.setAttribute('src', gif.images.fixed_height_still.url)
            addgifs.setAttribute('data-still', gif.images.fixed_height_still.url)
            addgifs.setAttribute('data-play', gif.images.fixed_height.url)
            addgifs.className = 'play'
            addgifs.name = gif.title
            document.querySelector('.gifs').appendChild(addgifs)

            let likebtn = document.createElement('input')
            likebtn.setAttribute('type', 'image')
            likebtn.src = './assets/css/like.png'
            likebtn.className = 'like'
            likebtn.play = addgifs.dataset.play
            document.querySelector('.gifs').appendChild(likebtn)

            let rating = document.createElement('span')
            rating.innerHTML = `Title: ${gif.title} <br/> Rating: ${gif.rating} `
            rating.className = 'rating'
            document.querySelector('.gifs').appendChild(rating)
        })
    })
    .catch (e => console.error(e))
}

const getinfo = i => {
    fetch(`https://www.omdbapi.com/?apikey=d467d7fe&t=${i}`)
    .then(r => r.json())
    .then(r => {
        document.querySelector('.infobtn').innerHTML = r.Response === 'False'
        ? `
        <h1>Sorry, there's no related movie or show.</h1>
        ` : `
        <h3>${r.Title}</h3>
        <h3>${r.Year}</h3>
        <h3>${r.Genre}</h3>
        <p>${r.Plot}</p> 
        `
    })
    .catch(e => (console.error(e)))
}

document.addEventListener('click', e => {
    if(e.target.id === 'submit' && moretopic.value){
        e.preventDefault()
        document.querySelector('.favgifs').innerHTML = ''
        topiclist.push(moretopic.value)
        topicbtn()
    } else if (e.target.id === 'submit' && !moretopic.value) {
        e.preventDefault()
    } else if (e.target.className === 'gifbtns') {
        document.querySelector('.infobtn').innerHTML = ''
        let searchtitle = document.createElement('button')
        searchtitle.textContent = 'Related movie/show'
        searchtitle.className = 'infomation'
        searchtitle.value = e.target.value
        document.querySelector('.infobtn').append(searchtitle)

        document.querySelector('.gifs').innerHTML = ''
        getgif(e.target.value)
    }else if (e.target.className === 'play') {
        if (e.target.src === e.target.dataset.still) {
            e.target.src = e.target.dataset.play
        } else if (e.target.src === e.target.dataset.play) {
            e.target.src = e.target.dataset.still
        }
    }else if (e.target.className === 'infomation') {
        getinfo(e.target.value)
    }else if (e.target.className === 'like' && favgif.indexOf(e.target.play)===-1){
        favgif.push(e.target.play)
        localStorage.setItem('favgif', JSON.stringify(favgif))
        document.querySelector('.favgifs').innerHTML = ''
        favgif.forEach(favorite => {
            let favgif = document.createElement('img')
            favgif.setAttribute('src', favorite)
            favgif.className = 'favgif'
            document.querySelector('.favgifs').append(favgif)
        })
        if(favgif.indexOf(e.target.play)===1) {
            e.preventDefault()
        }
    }
})
topicbtn()