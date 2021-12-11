document.addEventListener('DOMContentLoaded', e => init())

function init() {
  console.log('Time to wake up!')
  let coffeeCategoryMenu = document.getElementById('select')
  coffeeCategoryMenu.addEventListener('change', e => {
    if (e.target.value === 'start') {
      document.getElementById('cardArea').innerHTML = ''
      initFetch()
    } else {newSelection(e.target.value)}
  })
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
    let coffeeInfo = elementMaker('div')
      coffeeInfo.className = 'coffeeInfo'
    let coffeeCard = elementMaker('li')
    coffeeCard.addEventListener('mouseover', e => coffeeInfo.style.display = 'block')
    coffeeCard.addEventListener('mouseleave', e => coffeeInfo.style.display = 'none')
      coffeeCard.className = 'coffeeCard'
    let coffeeTitle = elementMaker('h5')
      coffeeTitle.innerText = coffee.name
      coffeeInfo.append(coffeeTitle)
    let coffeeImgLi = elementMaker('div')
      coffeeImgLi.className = 'coffeeCardImage'
    let coffeeImage = elementMaker('img')
      coffeeImage.src = coffee.image
      coffeeImgLi.append(coffeeImage)
      coffeeCard.append(coffeeImgLi)
    let coffeeServing = elementMaker('p')
      coffeeServing.innerHTML = `<b>Serving Size:</b> ${coffee.servingSize} fl oz`
      coffeeInfo.append(coffeeServing)
    let coffeeCaffeine = elementMaker('p')
      coffeeCaffeine.innerHTML = `<b>Caffeine Content:</b> ${coffee.caffeineContent}mg`
      coffeeInfo.append(coffeeCaffeine)
    let coffeeSugar = elementMaker('p')
      coffeeSugar.innerHTML = `<b>Sugar Content:</b> ${coffee.sugarContent}g`
      coffeeInfo.append(coffeeSugar)
    let lineBreak = elementMaker('br')
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
      }
    })
    cardCreator(coffeeArray)
  })}

  function elementMaker(elementType) {
    let element = document.createElement(`${elementType}`)
    return element
  }