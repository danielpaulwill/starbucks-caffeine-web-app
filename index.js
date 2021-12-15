document.addEventListener('DOMContentLoaded', e => init())

function init() {
  console.log('Time to wake up!')
  selectInput()
  initFetch()
}

function selectInput() {
  let coffeeCategoryMenu = document.getElementById('select')
  coffeeCategoryMenu.addEventListener('change', e => {
    scrollTo(0, 0)
    document.getElementById('cardArea').innerHTML = ''
    if (e.target.value === 'start') {
      initFetch()
    } else if (e.target.value === 'favorite') {
      favoriteSelection()
    } else newSelection(e.target.value)
  })
}

function initFetch() {
  fetch('http://localhost:3000/coffee')
  .then(res => res.json())
  .then(data => cardCreator(data))
}

function favoriteButton(coffee) {
  let favButton = document.createElement('button')
  favButtonType(coffee, favButton)
  return favButton
}

function favButtonType(coffee, favButton) {
  if (coffee.favorite === true) {
    favButton.innerHTML = '♥'
    favButton.style.color = 'red'
  } else if (coffee.favorite === false) {
    favButton.innerHTML = '♡'
    favButton.style.color = 'red'
  }
return favButton
}

function cardCreator(array) {
  let cardArea = document.getElementById('cardArea')
  array.forEach(coffee => {
    let coffeeCard = document.createElement('li')
    coffeeCard.addEventListener('mouseover', e => coffeeInfo.style.display = 'block')
    coffeeCard.addEventListener('mouseleave', e => coffeeInfo.style.display = 'none')
      coffeeCard.className = 'coffeeCard'
      coffeeCard.id = coffee.id
    let favButton = favoriteButton(coffee)
    favButton.className = 'favButton'
    favButton.addEventListener('click', e => favButtonSwitch(coffee, favButton))
    let coffeeInfo = document.createElement('div')
      coffeeInfo.className = 'coffeeInfo'
    let coffeeTitle = document.createElement('h5')
      coffeeTitle.innerText = coffee.name
      coffeeInfo.append(coffeeTitle)
    let coffeeImgLi = document.createElement('div')
    let coffeeImage = document.createElement('img')
    coffeeImage.className = 'coffeeCardImage'
      coffeeImage.src = coffee.image
      coffeeImgLi.append(coffeeImage)
      coffeeCard.append(coffeeImgLi)
    let coffeeServing = document.createElement('p')
      coffeeServing.innerHTML = `<b>Serving Size:</b> ${coffee.servingSize} fl oz`
      coffeeInfo.append(coffeeServing)
    let coffeeCaffeine = document.createElement('p')
      coffeeCaffeine.innerHTML = `<b>Caffeine Content:</b> ${coffee.caffeineContent}mg`
      coffeeInfo.append(coffeeCaffeine)
    let coffeeSugar = document.createElement('p')
      coffeeSugar.innerHTML = `<b>Sugar Content:</b> ${coffee.sugarContent}g`
      coffeeInfo.append(coffeeSugar)
    let lineBreak = document.createElement('br')
    coffeeInfo.append(favButton)
    coffeeCard.append(coffeeInfo)
    cardArea.append(coffeeCard)
    coffeeCard.append(lineBreak)
  })
}

function newSelection (value) {
  let coffeeArray = []
  fetch('http://localhost:3000/coffee')
  .then(res => res.json())
  .then(data => {
    data.forEach(coffee => {
      if (coffee.coffeeCategory === value) {
        coffeeArray.push(coffee)
    }})
    cardCreator(coffeeArray)
})}

function favoriteSelection() {
  let coffeeArray = []
  fetch('http://localhost:3000/coffee')
  .then(res => res.json())
  .then(data => {
    data.forEach(coffee => {
      if (coffee.favorite === true) {
        coffeeArray.push(coffee)
    }})
  cardCreator(coffeeArray)
})}

function favButtonSwitch(coffee, favButton) {
  coffee.favorite = !coffee.favorite
  fetch(`http://localhost:3000/coffee/${coffee.id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    favorite: coffee.favorite}),
  })
  .then(response => response.json())
  .then(data => console.log(data.favorite)),
  favButtonType(coffee, favButton)
}
