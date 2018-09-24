/******************************************
List Filter and Pagination
******************************************/

// Add variables that store DOM elements I will need to reference and/or manipulate

const listUsers = document.querySelectorAll(".student-item");
const usersPerPage = 10;
const pages= Math.ceil(listUsers.length/usersPerPage); //number of pages.
const liPages=[];
const page = document.querySelector(".page");
console.log(pages);


// Create a function to hide all of the items in the list excpet for the ten I want to show
// with a list of 54 studetns, the last page will only display four


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

function createElement(tag){
  let element = document.createElement(tag);
  return element;
}

//create Array of <il>
for(let i=0; i<pages;i++){
  let item = createElement("li");
  let anchor = createElement("a");
  if(i==0){
    anchor.className="active";
  }
  anchor.href = "#";
  anchor.textContent = i+1;
  item.append(anchor);
  liPages.push(item);
}

const ulPages =createElement("ul");
const divPages = createElement("div");
divPages.className = "pagination";


//appned li in <ul>
for(let i=0;i<liPages.length;i++){
  ulPages.appendChild(liPages[i]);
}
//append <ul> in div
divPages.appendChild(ulPages);
//append <div class = pagination> to <div class= page>
page.appendChild(divPages);

console.log(divPages);

// Add functionality to the pagination buttons so that they show and hide the correct items

hideItems(0,10);

const pagination = document.querySelector(".pagination");

pagination.addEventListener("click",(e)=>{
  if(e.target.tagName =="A"){
    let page = e.target.textContent;
    let limitBottom=(usersPerPage*page)-usersPerPage;
    let limitTop=usersPerPage*page;
    hideItems(limitBottom,limitTop);
    console.log(limitBottom);
    console.log(limitTop);
  }
})
