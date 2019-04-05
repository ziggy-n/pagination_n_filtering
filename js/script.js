/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

  let searchMode = false;

  // listElements contains array of all li elements, each representing a student
  const listElements = document.getElementsByTagName('li');

  // pageElement is the parent Element of all elements in listElements
  const pageElement = document.getElementsByClassName('page')[0];

  const nrListElements = listElements.length;

  const nrPages = Math.ceil(nrListElements / 10);

  // searchedListElements is an array that contains all students that qalify for the search criteria when in searchMode
  let searchedListElements = [];
  let nrPagesSearch = 0;
  let nrSearchedListElements = 0;

  // here a parant node for all buttons is created and inserted into the DOM
  const divButtons = document.createElement('div');
  pageElement.appendChild(divButtons);
  divButtons.setAttribute('id', 'pageButtons');

  // buttons is the array that contains all buttons to get to the different pages
  let buttons = [];

  // here a new form element is created and appended to its parent
  const pageHeader = document.getElementsByClassName('page-header cf')[0];
  const searchForm = document.createElement('form');
  pageHeader.appendChild(searchForm);

  // here a search box is created to type in the searches. Its parent is searchForm
  const searchBox = document.createElement('input');
  searchForm.appendChild(searchBox);
  searchBox.setAttribute('type', 'text');
  searchBox.setAttribute('id', 'searchField');

  // here a searchButton is created. Its parent is searchForm
  const searchButton = document.createElement('input');
  searchForm.appendChild(searchButton);
  searchButton.setAttribute('type', 'submit');
  searchButton.setAttribute('id', 'searchBtn');
  searchButton.setAttribute('value', 'Search');




  /*** createButtons() creates as many buttons as their are pages, stores them in buttons,
  appends them to their parent and sets their attributes
  ***/
  function createButtons(){
    for(let i = 0; i < nrPages; i++){
      buttons[i] = document.createElement('input');
      divButtons.appendChild(buttons[i]);
      buttons[i].setAttribute('type', 'button');
      buttons[i].setAttribute('value', `${i + 1}`);
    }
  }
  createButtons();



/***
       showPage iterates through listElements in 3 stages
       - first it hides all elements that are not on the page and come before the visible elements
       - then it makes visible all elements that are on the page
       - and lastly it hides all elements that are not on the page and come after the visible elements
***/
  function showPage(page){
    if(!searchMode){
      let lowerBound = page*10 - 10;
      let upperBound = page*10 - 1;

      if(nrPages === 0){
        lowerBound = nrListElements;
        upperBound = -1;
      }

      // hide elements that come before visible
      for(let i = 0; i < lowerBound; i++){
        listElements[i].style.display = 'none';
      }
      // show getElements
      for(let i = lowerBound; i < nrListElements &&  i <= upperBound; i++){
        listElements[i].style.display = 'block';
      }

      // hide elements after
      for(let i = upperBound + 1; i < nrListElements; i++){
        listElements[i].style.display = 'none';
      }

    } else {

      let lowerBound = page*10 - 10;
      let upperBound = page*10 - 1;

      let k = 0;

      // hide all elements
      for(let i = 0; i < nrListElements; i++){
        listElements[i].style.display = 'none';
      }

      if(nrPagesSearch > 0){
        // hide elements that come before visible
        for(let i = 0; i < lowerBound; i++){
          searchedListElements[k].style.display = 'none';
          k++;
        }
        // show getElements
        for(let i = lowerBound; i < nrSearchedListElements && i <= upperBound; i++){
          searchedListElements[k].style.display = 'block';
          k++;
        }

        // hide elements after
        for(let i = upperBound + 1; i < nrSearchedListElements; i++){
          searchedListElements[k].style.display = 'none';
          k++;
        }
      } else {
        // message for the case no result were found
        const mssg = document.createElement('p');
        pageHeader.appendChild(mssg);
        mssg.textContent += 'No Results Found';
      }


    }

  }
/*** to ensure that when loading the site we get the first page with the first 10 students,
 one calls showPage(1) ***/
  showPage(1);


/*** Event Listener is added to the parent of the page buttons
    Whenever a button is clicked showPage is called and the number of the button (representing the number of the page) is passed to
    showPage as an argument
***/
  document.getElementById('pageButtons').addEventListener('click', (event) => {
    const pressedButton = event.target;
    const nrOnButton = parseInt(pressedButton.getAttribute('value'), 10);
    showPage(nrOnButton);
  });



// checks if student name contains the string 'text'
  function checkName(text, element){
    const header3 = element.getElementsByTagName('h3')[0];
    const name = header3.textContent;
    return name.includes(text);
  }

// checks if email contains the string 'text'
  function checkEmail(text, element){
    const emailElement = element.getElementsByClassName('email')[0];
    const email = emailElement.textContent;
    return email.includes(text);
  }


/*** creates list of students that contain the string 'text' in their name or email
 sets searchMode to true, and sets nrPagesSearch and nrSearchedListElements
calls showPage(1) to display the first page of the search results
***/
  function searchFor(text){
    let count = 0;
    for(let i = 0; i < nrListElements; i++){
      const current = listElements[i];
      if(checkName(text, current) || checkEmail(text, current)){
        searchedListElements[count] = listElements[i];
        count++;
      }
    }
    nrPagesSearch = (count === 0)? 0 : Math.ceil(count / 10);
    nrSearchedListElements = searchedListElements.length
    searchMode = true;
    showPage(1);
  }


  /*** an event listener is added to searchForm
  ***/
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    searchFor(searchBox.value);
    searchBox.value = '';
  });


  // adds css to buttons
  function stylePageButtons(){
    divButtons.style.textAlign = 'center';
    for(let i = 0; i < nrPages; i++){
      buttons[i].style.borderRadius = '6px';
      buttons[i].style.padding = '5px 10px 5px px';
      buttons[i].style.margin = '5px 5px 5px 5px';
    }
  }
  stylePageButtons();

  // adds css to searchForm and searchBox
  function styleSearchField(){
    searchForm.style.textAlign = 'right';
  }
  styleSearchField();
