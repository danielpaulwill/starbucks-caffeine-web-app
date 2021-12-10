document.addEventListener('DOMContentLoaded', e => init())

function init() {
  console.log('Time to wake up!')
  initFetch()
  cardCreator()
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
    // let coffeeSpan = document.createElement('span')  
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
      // coffeeImage.className = 'coffeeCardImage'
      coffeeImage.src = coffee.image
      coffeeImgLi.append(coffeeImage)
      coffeeCard.append(coffeeImgLi)
    let coffeeServing = document.createElement('p')
      coffeeServing.innerText = `Serving Size: ${coffee.servingSize} fl oz`
      coffeeInfo.append(coffeeServing)
    let coffeeCaffeine = document.createElement('p')
      coffeeCaffeine.innerText = coffee.caffeineContent
      coffeeInfo.append(coffeeCaffeine)
    let coffeeSugar = document.createElement('p')
      coffeeSugar.innerText = coffee.sugarContent
      coffeeInfo.append(coffeeSugar)
    console.log(coffeeCard)
    let lineBreak = document.createElement('br')
    cardArea.append(lineBreak)
    coffeeCard.append(coffeeInfo)
    // coffeeCard.append(coffeeSpan)
    cardArea.append(coffeeCard)
    return coffeeCard
  })
}

