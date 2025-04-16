/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */




let animeList = [];
let fileText =  "";

fetch('anime.csv').then(response => { return response.text()})
.then(data => 
{
  fileText = data;
  ///used to print to console to see result it creates
  console.log(fileText);
  ///funciton to put the values in file to  animeList 
  convertCSV(fileText);
  displayAnimes();
}
)



///takes the comma separated values file and puts it into animeList
function convertCSV(fileText)
{
  /// .trim() removes characters like spaces, tabs, new lines

  fileText = fileText.trim();

  /// .split() cuts the string once it sees the character passed to this
  /// in this case it's an endline/ newline or enter
  const rows = fileText.split('\n');

  ///grabs the header by going to row at index 0 and splitting the string
  ///at commas to get title of each section
  const header = rows[0].split(',');


///.length fiinds length of array  and .length() is for strings
  for( let i = 1 ; i < rows.length;i++)
    {

      const value = rows[i].split(','); 
 ///creates an object to contain the 
 let anime = 
 {
   ///changes the string value into an int value
   /// to organize by largest to smallest # 
   /// or vice versa
   anime_id: parseInt(value[0]), 

   ///string to int not needed because organize by name doesn't
   ///reqiure numbers
   name: value[1], 

   ///split is needed for animes with multiple genres
   genre: value[2].split(','),

   type: value[3],
   episodes: parseInt(value[4]),
   rating: parseFloat(value[5]),
   ///number of mmebers in community for that anime
   members: parseInt(value[6]),
  };

  ///within the for loop to push the object(anime) to animeList
    animeList.push(anime);
  }

}

function filterByGenre(genre)
{
  ///anime is parameters and things after the arrow is the function
  return animeList.filter(anime => anime.genre.some(hi =>hi.toLowerCase() === genre.toLowerCase()));
}


function compareForDescending(a, b)
{
  return b.rating - a.rating;
}

function sortByRatingDescending()
{
  animeList.sort(compareForDescending);
}


function matchesSearchTerm(anime, searchTerm)
{
  ///.includes changes to see if the part of the word is inside the string 
  return anime.name.toLowerCase().includes(searchTerm.toLowerCase());
}

function searchAnimeByName(searchTerm)
{
  return animeList.filter(function(anime){
    return matchesSearchTerm(anime, searchTerm)
  });
}



// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array
function displayAnimes() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (let i = 0; i < animeList.length; i++) 
    {
    const anime = animeList[i];
    const nextCard = templateCard.cloneNode(true); // Copy the template card

    ///.join(',') gets the genre in commas
    editCardContent(nextCard, anime.name, anime.genre.join(','),anime.episodes,anime.rating, anime.members);
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}
function displayFilteredAnimes(filteredAnimes) 
{
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (let i = 0; i < filteredAnimes.length; i++) 
    {
    const anime = filteredAnimes[i];
    const nextCard = templateCard.cloneNode(true); // Copy the template card

    ///.join(',') gets the genre in commas
    editCardContent(nextCard, anime.name, anime.genre.join(','),anime.episodes,anime.rating, anime.members);
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, newTitle, newGenre, newEpisodes, newRating, newMembers) 
{
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle;

  const cardList = card.querySelector("ul");
  cardList.innerHTML = `
  <li>Genres: ${newGenre}</li> 
  <li>Episodes: ${newEpisodes}</li>
  <li>Rating: ${newRating}</li>
  <li>Members: ${newMembers}</li>
  `;

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", displayAnimes);



// document.addEventListener("DOMContentLoaded", ()=> 
// {
//   displayAnimes();
// });

document.getElementById("action-button").addEventListener("click", () => 
{
   const filteredAnimes = filterByGenre("Action");
   displayFilteredAnimes(filteredAnimes);
})