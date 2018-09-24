/******************************************
List Filter and Pagination
******************************************/

// Add variables that store DOM elements I will need to reference and/or manipulate

const listUsers = document.querySelectorAll(".student-item");//select all students and I put them in Array.
const usersPerPage = 10;
const pages= Math.ceil(listUsers.length/usersPerPage); //number of pages.
const liPages=[]; //array of <li>
const page = document.querySelector(".page");



//function that shows just the items(<li>) betwen limitBottom and limitTop.
function hideItems(limitBottom,limitTop){
for(let i=0;i<listUsers.length;i++){
  if((i>=limitBottom)&&(i<=limitTop)){
    listUsers[i].style.display= "block";
  }
  else{
    listUsers[i].style.display= "none";
  }
  }
}

// Create and append the pagination links
function createPaginationElements(){
  //create elements.
  function createElement(tag){
    let element = document.createElement(tag);
    return element;
  }

  //create Array of <il> with its <a>
  for(let i=0; i<pages;i++){
    let item = createElement("li");
    let anchor = createElement("a");
    if(i==0){
      anchor.className="active";//when page is load the first nº page is active.
    }
    anchor.href = "#";
    anchor.textContent = i+1;//nº page starts from 1 not from 0.
    item.append(anchor);
    liPages.push(item);
  }

  const ulPages =createElement("ul");//Create <ul>
  const divPages = createElement("div");//Create <div>
  divPages.className = "pagination";


  //append li in <ul>
  for(let i=0;i<liPages.length;i++){
    ulPages.appendChild(liPages[i]);
  }
  //append <ul> in div
  divPages.appendChild(ulPages);
  //append <div class = pagination> to <div class= page>
  page.appendChild(divPages);

}

function createSearchButton(){
  //create elements
  const divStudentSearch = document.createElement("div")
  const button = document.createElement("Button");
  const input = document.createElement("input");
  divStudentSearch.className = "student-search";
  button.textContent="Search";
  input.placeholder ="Search for students";

  //Append elements
  divStudentSearch.appendChild(input);
  divStudentSearch.appendChild(button);
  page.firstElementChild.appendChild(divStudentSearch);//append divStudentSearch in page-header.
}

createSearchButton();
createPaginationElements();//Create Pagination.
hideItems(0,9); //Initilize always showing items of page 1.

const pagination = document.querySelector(".pagination");
const anchor = document.querySelectorAll("a");

/*When user clics the page number it calculates the limits of a range of numbers.then it will pass that limits
to hide/show the elements.*/
pagination.addEventListener("click",(e)=>{
  if(e.target.tagName =="A"){
    let page = e.target.textContent;//get page nº
    let limitBottom=(usersPerPage*page)-usersPerPage;//Example with nº page =1 =>(10*1)-10 = 0;
    let limitTop=(usersPerPage*page)-1;//Example with nº page =1=> (10*1)-1= 9;
    for(let i=0;i<anchor.length;i++){//deactivate the class "active" in anchors
      anchor[i].className="";
    }
    e.target.className="active"//just "active" the anchor that was click.
    hideItems(limitBottom,limitTop);//call function to hide/show elements.
  }
})
