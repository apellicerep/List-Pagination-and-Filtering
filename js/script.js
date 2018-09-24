/******************************************
List Filter and Pagination
******************************************/

// Add variables that store DOM elements I will need to reference and/or manipulate

const listUsers = document.querySelectorAll(".student-item");
const usersPerPage = 10;
const pages= Math.ceil(listUsers.length/usersPerPage); //number of pages.
const liPages=[]; //array of <li>
const page = document.querySelector(".page");
const pagination = document.querySelector(".pagination");
const anchor = document.querySelectorAll("a");



// Create a function to hide all of the items in the list excpet for the ten I want to show
// with a list of 54 studetns, the last page will only display four

//function that shows just the numbers betwen limitBottom and limitTop.
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

// Create and append the pagination links - Create a function.
function createPagination(){

  function createElement(tag){
    let element = document.createElement(tag);
    return element;
  }

  //create Array of <il>
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

// Add functionality to the pagination buttons so that they show and hide the correct items

createPagination();//Create Pagination.
hideItems(0,10); //Initilize always with page 1.

pagination.addEventListener("click",(e)=>{
  if(e.target.tagName =="A"){
    let page = e.target.textContent;
    let limitBottom=(usersPerPage*page)-usersPerPage;
    let limitTop=(usersPerPage*page)-1;
    for(let i=0;i<anchor.length;i++){
      anchor[i].className="";
    }
    e.target.className="active"
    hideItems(limitBottom,limitTop);
  }
})
