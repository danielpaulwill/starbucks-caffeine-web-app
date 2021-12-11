document.addEventListener('DOMContentLoaded', e => init())

function init() {
  console.log('Time to wake up!')
  let coffeeCategoryMenu = document.getElementById('select')
  coffeeCategoryMenu.addEventListener('change', e => newSelection(e.target.value))
  initFetch()
}

function initFetch() {
  fetch('http://localhost:3000/coffee')
  .then(res => res.json())
  .then(data => cardCreator(data))
}

function cardCreator(array) {
  let cardArea = document.getElementById('cardArea')
  array.forEach(coffee => {
    let coffeeInfo = document.createElement('div')
      coffeeInfo.className = 'coffeeInfo'
    let coffeeCard = document.createElement('li')
    coffeeCard.addEventListener('mouseover', e => coffeeInfo.style.display = 'block')
    coffeeCard.addEventListener('mouseleave', e => coffeeInfo.style.display = 'none')
      coffeeCard.className = 'coffeeCard'
    let coffeeTitle = document.createElement('h5')
      coffeeTitle.innerText = coffee.name
      coffeeInfo.append(coffeeTitle)
    let coffeeImgLi = document.createElement('div')
      coffeeImgLi.className = 'coffeeCardImage'
    let coffeeImage = document.createElement('img')
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
    coffeeCard.append(coffeeInfo)
    cardArea.append(coffeeCard)
    cardArea.append(lineBreak)
  })
}

function newSelection (value) {
  document.getElementById('cardArea').innerHTML = ''
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
