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
    let coffeeCard = document.createElement('li')
      coffeeCard.className = 'coffeeCard'
    let coffeeTitle = document.createElement('h5')
      coffeeTitle.innerText = coffee.name
      coffeeCard.append(coffeeTitle)
    let coffeeImage = document.createElement('img')
      coffeeImage.className = 'coffeeCardImage'
      coffeeImage.src = coffee.image
      coffeeCard.append(coffeeImage)
    let coffeeServing = document.createElement('p')
      coffeeServing.innerText = `Serving Size: ${coffee.servingSize} fl oz`
      coffeeCard.append(coffeeServing)
    let coffeeCaffeine = document.createElement('p')
      coffeeCaffeine.innerText = coffee.caffeineContent
      coffeeCard.append(coffeeCaffeine)
    let coffeeSugar = document.createElement('p')
      coffeeSugar.innerText = coffee.sugarContent
      coffeeCard.append(coffeeSugar)
    console.log(coffeeCard)
    cardArea.append(coffeeCard)
    return coffeeCard
  })
}

