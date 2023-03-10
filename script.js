
'use strict';

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');
var apiKey = 'O2IeCrBTwGCVueYuTzgKLqqZgVlyqwbqTTTrZxTQ'
var requestUrl = 'https://api.watchmode.com/v1/genres/?apiKey=O2IeCrBTwGCVueYuTzgKLqqZgVlyqwbqTTTrZxTQ'
var submit = document.querySelector("#startbtn")
// selection
let action = document.querySelector(".action")
let anime = document.querySelector(".anime")
let comedy = document.querySelector(".comedy")
let documentary = document.querySelector(".documentary")
let scienceFiction = document.querySelector(".science-fiction")
let horror = document.querySelector(".horror")



// inputs
let actionInput = document.querySelector(".actionMovies")
let animeInput = document.querySelector(".animeMovies")
let comedyInput = document.querySelector(".comedyMovies")
let documentaryInput = document.querySelector(".documentaryMovies")
let sciFiInput = document.querySelector(".sciFiMovies")

let horrorInput = document.querySelector(".horrorMovies")
let button = document.querySelector("#startbtn")
console.log(actionInput)
console.log(animeInput)
console.log(comedyInput)
console.log(documentaryInput)
console.log(sciFiInput)
console.log(horrorInput)
// action.textContent="action"

//TWo dropdowns Comedy and 2012
//ON submit form event-> htpp://apiwatchmode/ + geredropwdown + & + yeardropdwon + "apikey"

function getAPI(){
  fetch('https://api.watchmode.com/v1/genres/?apiKey=O2IeCrBTwGCVueYuTzgKLqqZgVlyqwbqTTTrZxTQ&')
  .then(function (response){
    return response.json()
    
  }).then(function(data){
    console.log(data)
    action.textContent=data[0].name
    
    anime.textContent=data[5].name
    
    comedy.textContent=data[7].name
   
    documentary.textContent=data[9].name
    
    scienceFiction.textContent=data[26].name
    
    horror.textContent=data[10].name
    
  })
}
getAPI()
// get options on toggle board-----------------v
var genOptions = document.createElement("span")


// --------------------------------------^
function initCards(card, index) {
  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  });
  
  tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }
  });
});

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];

    card.classList.add('removed');

    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    initCards();

    event.preventDefault();
  };
}

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);

button.addEventListener('click',(e) => {
actionInput.setAttribute('checked') 
animeInput.setAttribute('checked') 
comedyInput.setAttribute('checked') 
documentaryInput.setAttribute('checked') 
sciFiInput.setAttribute('checked') 
horrorInput.setAttribute('checked') 
console.log(actionInput)
console.log(animeInput)
console.log(comedyInput)
console.log(documentaryInput)
console.log(sciFiInput)
console.log(horrorInput)
 
})
// actionInput.setAttribute('checked',true) 
console.log(actionInput)
// function to move from genre selection screen to cards screen 
function startSwipe() {
  document.querySelector("#genre-box").classList.add("hide")
  initCards()
}
submit.addEventListener("click",startSwipe);



