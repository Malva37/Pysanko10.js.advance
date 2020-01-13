$(document).ready(function () {

   const getId = id => document.getElementById(id);
   const getSel = sel => document.querySelector(sel);

   // $('.modal').hide();

   getId('search').onclick = () => {
      let allButtons = [];
      const xhr = new XMLHttpRequest();
      let titleMovieSearch = getId('titleMovieSearch').value;

      xhr.open('GET', `http://www.omdbapi.com/?s=${titleMovieSearch}&apikey=75e59b65`, true);
      xhr.onreadystatechange = function () {
         if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            let objectMovies = data.Search;
            for (let i = 0; i < objectMovies.length; i++) {

               let div = document.createElement('div');

               let poster = document.createElement('img');
               let titleInMovieBox = document.createElement('div');
               let typeInMovieBox = document.createElement('div');
               let yearInMovieBox = document.createElement('div');
               let moreDetails = document.createElement('button');


               let imdbID = document.createElement('div');
               imdbID.innerText = objectMovies[i].imdbID;
               imdbID.id = 'imdbID';

               poster.id = 'poster';
               poster.src = objectMovies[i].Poster;
               titleInMovieBox.id = 'titleInMovieBox';
               titleInMovieBox.innerText = objectMovies[i].Title;
               typeInMovieBox.id = 'typeInMovieBox';
               typeInMovieBox.innerText = objectMovies[i].Type;
               yearInMovieBox.id = 'yearInMovieBox';
               yearInMovieBox.innerText = objectMovies[i].Year;
               moreDetails.id = 'moreDetails';
               moreDetails.innerText = 'More details';
               allButtons.push(moreDetails);
               div.id = 'movieBox';
               div.append(poster, titleInMovieBox, typeInMovieBox, yearInMovieBox, moreDetails, imdbID)
               getId('main').appendChild(div);
               allButtons.id = allButtons;
            }
         }

         $('main>div>button').each(function (index, element) {
            $(element).click(function () {
               $('.modal').show();
               // getSel('.modal').style.display = 'block';

               getSel('.modal').classList.toggle("show-modal");
               let movieMainData = $(this).parent()[0];
               const xhr2 = new XMLHttpRequest();
               let idImdbID = movieMainData.children[5].innerText;
               xhr2.open('GET', `http://www.omdbapi.com/?i=${idImdbID}&plot=full&apikey=75e59b65`, true);
               xhr2.onreadystatechange = function () {
                  if (xhr2.readyState === 4 && xhr2.status === 200) {
                     const data = JSON.parse(xhr2.responseText);
                     $('#posterInModalBox').attr('src', data.Poster);
                     $('#titleInModalBox').text(data.Title);
                     $('#mixData').text(data.Rated + ' ' + data.Year + ' ' + data.Genre);
                     $('#plot').text(data.Plot);
                     $('#writtenBy').html("<b>Written by: </b>" + data.Writer);
                     $('#directedBy').html("<b>Directed by: </b>" + data.Director);
                     $('#starring').html("<b>Starring: </b>" + data.Actors);
                     $('#boxOffice').html("<b>BoxOffice: </b>" + data.BoxOffice);
                     $('#awards').html("<b>Awards: </b>" + data.Awards);
                     let textRating = '';
                     data.Ratings.forEach(element => {
                        textRating += element.Source + ' ' + element.Value + '<br/>';
                     });
                     $('#ratings').html("<b>Ratings:</b>" + '<br/>' + textRating);
                  }
               }
               xhr2.send();
            })
         })



         // $('#closeBtn').click(function () {
         //    $('.modal').hide();
         // })


      }
      xhr.send();
   }



   let modal = document.getElementById('id01');
   getSel('.modal').onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }


})