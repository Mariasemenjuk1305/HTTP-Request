let getId = x => document.getElementById(x);

const posterFilm = [getId('img0'), getId('img1'), getId('img2'), getId('img3'), getId('img4'), getId('img5'), getId('img6'), getId('img7')];
const nameFilm = [getId('title0'), getId('title1'), getId('title2'), getId('title3'), getId('title4'), getId('title5'), getId('title6'), getId('title7')];
const yearFilm = [getId('year0'), getId('year1'), getId('year2'), getId('year3'), getId('year4'), getId('year5'), getId('year6'), getId('year7')];
const moreAboutFilm = [getId('read0'), getId('read1'), getId('read2'), getId('read3'), getId('read4'), getId('read5'), getId('read6'), getId('read7')];
const typeFilm = [getId('type0'), getId('type1'), getId('type2'), getId('type3'), getId('type4'), getId('type5'), getId('type6'), getId('type7')];
getId('search').onclick = function () {
    getId('resultSearch').style.display = 'flex'
    let searchFilm = getId('enter_film').value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?s=${searchFilm}&apikey=d6b92ae7`, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(xhr);
                console.log(xhr.responseText);
                let info = JSON.parse(xhr.responseText);
                for (let i = 0; i < 8; i++) {
                    posterFilm[i].src = info.Search[i].Poster;
                    nameFilm[i].innerHTML = `${info.Search[i].Title}`
                    yearFilm[i].innerHTML = `${info.Search[i].Year}`
                    typeFilm[i].innerHTML = `${info.Search[i].Type}`
                    console.log(info.Search[i].imdbID);

                    moreAboutFilm[i].onclick = function () {
                        getId('back_grey').style.display = 'flex';
                        let xhrNew = new XMLHttpRequest();
                        xhrNew.open('GET', `http://www.omdbapi.com/?i=${info.Search[i].imdbID}&apikey=d6b92ae7`, true);
                        xhrNew.onreadystatechange = function () {
                            if (xhrNew.readyState == 4) {
                                if (xhrNew.status == 200) {
                                    console.log(xhrNew);
                                    console.log(xhrNew.responseText);
                                    let {
                                        Title,
                                        Rated,
                                        Released,
                                        Genre,
                                        Poster,
                                        Plot,
                                        Writer,
                                        Director,
                                        Actors,
                                        BoxOffice,
                                        Awards,
                                        Ratings,

                                    } = JSON.parse(xhrNew.responseText);
                                    getId('poster2').src = Poster;
                                    getId('bigTitle').innerHTML = `${Title}`;
                                    getId('shortStory').innerHTML = `${Rated}, ${Released}, ${Genre}`;
                                    getId('bigStory').innerHTML = `${Plot}`;
                                    getId('written').innerHTML = `<b style="color: black">Written by: </b> ${Writer}`;
                                    getId('director').innerHTML = `<b style="color: black">Directed by: </b> ${Director}`;
                                    getId('starring').innerHTML = `<b style="color: black">Starring: </b>${Actors}`;
                                    getId('boxOffice').innerHTML = `<b style="color: black">Box office: </b>${BoxOffice}`;
                                    getId('awards').innerHTML = `<b style="color: black">Awards: </b>${Awards}`;
                                    getId('ratings').innerHTML = `<b style="color: black">Ratings:  </b>${Ratings[0].Source}: ${Ratings[0].Value}`;
                                }
                            }
                        }

                        xhrNew.send();
                    }

                }
                console.log(info.Search);
            }
        }

    }

    xhr.send();
}

getId('back_grey').onclick = () => {
    getId('back_grey').style.display = 'none';
}