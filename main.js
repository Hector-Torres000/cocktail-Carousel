const cocktailInput = document.querySelector('#cocktail');
const section = document.querySelector('section');
const form = document.querySelector('form');

let currentCock = 0;
const leftBtn = document.querySelector('#leftBtn');
const rightBtn = document.querySelector('#rightBtn');

function leftOrRightBtn() {
  const buttons = document.querySelectorAll('.btn');
  for (const button of buttons) {
    button.addEventListener('click', (e) => {
      const cocks = document.querySelectorAll('div');
      let maxCocks = cocks.length - 1;

      if (e.target.textContent == 'Right') {
        if (currentCock == maxCocks) {
          currentCock = 0;
        } else {
          currentCock++;
        }
        cocks.forEach((cock, index) => {
          cock.style.transform = `translateX(${(index - currentCock) * 100}%)`;
        });
      } else {
        if (currentCock == 0) {
          currentCock = maxCocks;
        } else {
          currentCock--;
        }
        cocks.forEach((cock, index) => {
          cock.style.transform = `translateX(${(index - currentCock) * 100}%)`;
        });
      }
    });
  }
}
leftOrRightBtn();

async function getCock(name) {
  try {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    );
    const data = await res.json();
    return data.drinks;
  } catch (err) {
    console.log(`${err}`);
  }
}

function definingTranslate() {
  const cocks = document.querySelectorAll('div');
  cocks.forEach((cock, index) => {
    cock.style.transform = `translateX(${index * 100}%)`;
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const promise = getCock(cocktailInput.value).then((data) => {
    console.log(data);
    section.textContent = '';
    for (let i = 0; i < data.length; i++) {
      const div = document.createElement('div');
      const h2 = document.createElement('h2');
      const img = document.createElement('img');
      const ul = document.createElement('ul');
      const p = document.createElement('p');

      h2.textContent = data[i].strDrink;

      img.setAttribute('src', data[i].strDrinkThumb);
      img.classList.add('drinkImg');

      p.textContent = data[i].strInstructions;

      const ingredients = Object.keys(data[i]).filter((key) => {
        if (key.startsWith('strIngredient')) {
          return data[i][key];
        }
      });

      for (let ingredient of ingredients) {
        const li = document.createElement('li');
        li.textContent = `${data[i][ingredient]}`;
        ul.append(li);
      }
      div.append(h2, img, ul, p);
      section.append(div);
    }
    definingTranslate();
  });
});

//the images/divs are actually stacked upon each other.
//we create an array holding those nodes.
//we create a small section holding those images in a row
//we create buttons that iterate over a div,
////giving that specific image/div to have an z-index of 1;
