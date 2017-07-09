'use-strict';
  // Test for local storage
function supportsLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e) {
    return false;
  }
}
// Retrieve searches from Local Storage, return an array
function getRecentSearches() {
  const searches = localStorage.getItem('recentSearches');
  if (searches) {
    return JSON.parse(searches);
  }
  return [];
}
// Validate and save strings to store of past searches
function saveSearchString(str) {
  const searches = getRecentSearches();
  if (searches.indexOf(str) > -1 || !str) {
    return false;
  }
  searches.push(str);
  localStorage.setItem('recentSearches', JSON.stringify(searches));
  return true;
}
// Clear out searches
function removeSearches() {
  localStorage.removeItem('recentSearches');
}


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

// Empty the contents of an element (ul)
function clearList(listElement) {
  listElement.innerHTML = '';
}

window.onload = function() {
  // Make sure Local Storage exists before trying to use it
  if (supportsLocalStorage) {
    const form = document.getElementById('registrar');
    const input = form.querySelector('input');
    const mainDiv = document.querySelector('.main');
    const ul = document.getElementById('entryList');
    const div = document.createElement('div');
    const filterLabel = document.createElement('label');
    const filterCheckbox = document.createElement('input');
    const span = document.createElement('span');


    filterLabel.textContent = 'Books Not Completed';
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


    // Initialize display list
    const recentSearches = getRecentSearches();
    recentSearches.forEach(function(text) {
      const li = createLI(text);
      ul.appendChild(li);
    });


    // Event handlers
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const text = input.value;
      input.value = '';

      if (saveSearchString(text)) {
        const li = createLI(text);
        ul.appendChild(li);
      }

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
            removeSearches();
            clearList(li);
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
  }
};
