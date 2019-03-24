let topiclist = ['Spongebob', 'Kim Possible', 'Looney Tunes', 'Tom and Jerry', 'Teen Titans'],
    moretopic = document.querySelector('#userinput'),
    makebtn,
    gif,
    addgifs,
    favgif =  JSON.parse(localStorage.getItem('favgif')) || []

const topicbtn = () => {
    document.querySelector('#userinput').value = ''
    document.querySelector('#topics').innerHTML = ''
    // localStorage.removeItem('favgif')
    favgif.forEach(favorite => {
        let favgif = document.createElement('img')
        favgif.setAttribute('src', favorite)
        favgif.className = 'favgif'
        document.querySelector('.favgif').append(favgif)
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
    fetch(`http://api.giphy.com/v1/gifs/search?q=${e}&api_key=hisHnd4J8mVXb4QHuGyDQthEz43XLytH&limit=10`)
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

            let rating = document.createElement('span')
            rating.innerHTML = `Title: ${gif.title} <br/> Rating: ${gif.rating} `
            rating.className = 'rating'
            document.querySelector('.gifs').appendChild(rating)

            let likebtn = document.createElement('button')
            likebtn.textContent = 'Like'
            likebtn.className = 'like'
            likebtn.play = addgifs.dataset.play
            document.querySelector('.gifs').appendChild(likebtn)
        })
    })
    .catch (e => console.error(e))
}

const getinfo = i => {
    fetch(`http://www.omdbapi.com/?apikey=d467d7fe&t=${i}`)
    .then(r => r.json())
    .then(r => {
        document.querySelector('.showinfo').innerHTML = r.Response === 'False'
        ? `
        <h1>Sorry, there's no movie or show with that title.</h1>
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
        document.querySelector('.favgif').innerHTML = ''
        topiclist.push(moretopic.value)
        topicbtn()
    } else if (e.target.id === 'submit' && !moretopic.value) {
        e.preventDefault()
    } else if (e.target.className === 'gifbtns') {
        document.querySelector('.infobtn').innerHTML = ''
        document.querySelector('.showinfo').innerHTML = ''
        let searchtitle = document.createElement('button')
        searchtitle.textContent = 'Show Infomation'
        searchtitle.className = 'searchtitle'
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
    }else if (e.target.className === 'searchtitle') {
        getinfo(e.target.value)
    }else if (e.target.className === 'like' && favgif.indexOf(e.target.play)===-1){
        favgif.push(e.target.play)
        localStorage.setItem('favgif', JSON.stringify(favgif))
        document.querySelector('.favgif').innerHTML = ''
        favgif.forEach(favorite => {
            let favgif = document.createElement('img')
            favgif.setAttribute('src', favorite)
            favgif.className = 'favgif'
            document.querySelector('.favgif').append(favgif)
        })
        if(favgif.indexOf(e.target.play)===1) {
            e.preventDefault()
        }
    }
})
topicbtn()