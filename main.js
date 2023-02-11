const cocktailInput = document.querySelector('#cocktail');
const section = document.querySelector('section');
const form = document.querySelector('form');

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

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const promise = getCock(cocktailInput.value).then((data) => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const div = document.createElement('div');
      const h2 = document.createElement('h2');
      const img = document.createElement('img');
      const ul = document.createElement('ul');
      const p = document.createElement('p');

      h2.textContent = data[i].strDrink;
      img.setAttribute('src', data[i].strDrinkThumb);
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
  });
});

///get the images, name, and ingredients from the API
//create a section to display the names and images
//they automatically move from left to right
////have that section to have a display of flex.
////have 4 on the screen at the time,
////if there are more than 4, then use a timeOut function that moves them every 30 seconds.
////each block has an order of 0. Everytime the block moves, it actually gets a display of none.
////the new block that gets introduced will have an order of -1 + -1 to be placed before the other ones.
////until the orginal 4 are shown, they all get order of 0.
