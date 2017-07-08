'use-strict';


const form = document.getElementById('registrar');
const input = form.querySelector('input');
const mainDiv = document.querySelector('.main');
const ul = document.getElementById('entryList');
const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckbox = document.createElement('input');
const span = document.createElement('span');


filterLabel.textContent = "Books Not Completed";
filterCheckbox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckbox);
mainDiv.insertBefore(div, ul);

filterCheckbox.addEventListener('change', (e) => {
  const isChecked = e.target.checked;
  const lis = ul.children;
  if (isChecked) {
    for(let i = 0; i < lis.length; i++) {
      let li = lis[i];
      if (li.className === 'responded') {
        li.style.display = 'none';
      } else {
        li.style.display = '';
      }
    }
  } else {
    for(let i = 0; i < lis.length; i++) {
      let li = lis[i];
    }
  }
});


function createLI(text) {
  function createElement(elementName, property, value) {
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
  }

  function appendToLI(elementName, property, value) {
    const element = createElement(elementName, property, value);
    li.appendChild(element);
    return element;
  }

  const li = document.createElement('li');

  appendToLI('span', 'textContent', text);


  appendToLI('label', 'textContent', 'Complete')
  .appendChild(createElement('input', 'type', 'checkbox'));


  const rating = document.createElement('label');
  rating.textContent = 'Rating:';
  for (let i = 0; i < 5; i++) {
    const stars = document.createElement('span');
    stars.className = 'fa fa-star';
    rating.appendChild(stars);
  }
  li.appendChild(rating);


  appendToLI('button', 'textContent', 'Edit');

  appendToLI('button', 'textContent', 'Remove');


  return li;
}


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const text = input.value;
  input.value = '';
  for(let i = 0; i < ul.children.length; i++) {
    if (text == ul.children[i].children[0].textContent) {
      alert("Oops that name is already taken please enter in another.");
      return;
    }
  }
  const li = createLI(text);
  ul.appendChild(li);
});

ul.addEventListener('change', (evt) => {
  const checkbox = evt.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  const text = listItem.getElementsByTagName('label')[0].childNodes[0];
  if (checked) {
    listItem.className = 'responded';
    text.textContent = 'Completed';

  } else {
    listItem.className = '';
    text.textContent = 'Complete';
  }
});


ul.addEventListener('click', (evt) => {
  const stars = evt.target;
  if (stars.className === 'fa fa-star')  {
    stars.style.color = '#FFD700';
  }
  if (evt.target.tagName === 'BUTTON') {
    const button = evt.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    const action = button.textContent.toLowerCase();

    const nameActions = {
      remove: () => {
        ul.removeChild(li);
      },
      edit: () => {
        const span =  li.firstElementChild;
        const input =  document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'Save';
      },
      save: () => {
        const input =  li.firstElementChild;
        const span =  document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(span);
        button.textContent = 'Edit';
      }
    };

    //Select and run in button name
    nameActions[action]();
  }
});
