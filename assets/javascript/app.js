let topiclist = ['Spongebob', 'Kim Possible', 'Looney Tunes', 'Tom and Jerry', 'Teen Titans'],
    moretopic = document.querySelector('#userinput'),
    makebtn,
    gif

const topicbtn = () => {
    document.querySelector('#userinput').value = ''
    document.querySelector('#topics').innerHTML = ''
    for (i = 0; i < topiclist.length; i++) {
        makebtn = document.createElement('button')
        makebtn.textContent = topiclist[i]
        makebtn.value = topiclist[i]
        makebtn.className = 'gifbtns'
        document.querySelector('#topics').append(makebtn)
    }
}

document.addEventListener('click', e => {
    if(e.target.id === 'submit' && moretopic.value){
        e.preventDefault()
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
        document.querySelector('#gifs').innerHTML = ''
        fetch(`http://api.giphy.com/v1/gifs/search?q=${e.target.value}&api_key=hisHnd4J8mVXb4QHuGyDQthEz43XLytH&limit=10`)
        .then (r => r.json())
        .then (r => {
            r.data.forEach(gif => {
                let addgifs = document.createElement('img')
                addgifs.setAttribute('src', gif.images.fixed_height_still.url)
                addgifs.setAttribute('data-still', gif.images.fixed_height_still.url)
                addgifs.setAttribute('data-play', gif.images.fixed_height.url)
                addgifs.id = 'play'
                addgifs.value = e.target.value
                document.querySelector('#gifs').appendChild(addgifs)

                let rating = document.createElement('div')
                rating.innerHTML = `Title: ${gif.title} <br/> Rating: ${gif.rating} `
                rating.className = 'rating'
                document.querySelector('#gifs').appendChild(rating)
            })
        })
        .catch (e => console.error(e))
    }else if (e.target.id === 'play') {
        if (e.target.src === e.target.dataset.still) {
            e.target.src = e.target.dataset.play
        } else if (e.target.src === e.target.dataset.play) {
            e.target.src = e.target.dataset.still
        }
    }else if (e.target.className === 'searchtitle') {
        fetch(`http://www.omdbapi.com/?apikey=d467d7fe&t=${e.target.value}`)
        .then(r => r.json())
        .then(r => {
            document.querySelector('.showinfo').innerHTML = `
            <h3>${r.Title}</h3>
            <h3>${r.Year}</h3>
            <h3>${r.Genre}</h3>
            <h3>${r.Plot}</h3> 
            `
        })
        .catch(e => (console.error(e)))
    }
})
topicbtn()