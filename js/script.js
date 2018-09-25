/******************************************
List Filter and Pagination
******************************************/

// Add variables that store DOM elements I will need to reference and/or manipulate

const listUsers = document.querySelectorAll(".student-item");//select all students and I put them in Array.
const usersPerPage = 10;
const pages= Math.ceil(listUsers.length/usersPerPage); //number of pages.
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
function createPaginationElements(pages){
  let liPages=[];
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
  /*//append <ul> in div
  divPages.appendChild(ulPages);
  //append <div class = pagination> to <div class= page>
  page.appendChild(divPages);*/

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

function searchStudent(student){
  let studentSplit = student.split("");
  let ok;
  let arrayStudentsMostrar=[];
  for(let i=0;i<listUsers.length;i++){
    ok=0;
    let h3 = listUsers[i].firstElementChild.firstElementChild.nextElementSibling;
    let name = h3.textContent;
    let nameSplit = name.split("");
    let span = h3.nextElementSibling;
    let email = span.textContent;
    for(let i=0;i<studentSplit.length;i++){
        if(studentSplit[i]===nameSplit[i]){
          ok++;
          console.log(ok);
        }
      }
      if(ok===studentSplit.length){
        arrayStudentsMostrar.push(listUsers[i]);
        console.log(listUsers[i]);
    }
    }

  return arrayStudentsMostrar;
}


function hideAllStudents(){
  for(let i=0;i<listUsers.length;i++){
    listUsers[i].style.display="none";
  }
}
function showStudents(studentsToShow){
  //console.log(studentsToShow);
  for(i=0;i<studentsToShow.length;i++){
    studentsToShow[i].style.display="block";

  }

}

createSearchButton();
createPaginationElements(pages);//Create Pagination.
hideItems(0,9); //Initilize always showing items of page 1.

const pagination = document.querySelector(".pagination");
const anchor = document.querySelectorAll("a");

function calculateLimits(page){
  let arrayLimits = [];
  let limitBottom=(usersPerPage*page)-usersPerPage;//Example with nº page =1 =>(10*1)-10 = 0;
  let limitTop=(usersPerPage*page)-1;//Example with nº page =1=> (10*1)-1= 9;
  arrayLimits.push(limitBottom,limitTop);
  return arrayLimits;
}

function hideItemsSearch(){

}
/*function hideNumberPages(numberPage){
  const liNumberPages = pagination.firstElementChild.children;
  console.log(liNumberPages);
  for(let i=numberPage;i<liNumberPages;i++){
    liNumberPages[i].style.display=
  }


}*/

function appendPagesSearch (){


}



/*When user clics the page number it calculates the limits of a range of numbers.then it will pass that limits
to hide/show the elements.*/
pagination.addEventListener("click",(e)=>{
  if(e.target.tagName =="A"){
    let page = e.target.textContent;//get page nº
    //let limitBottom=(usersPerPage*page)-usersPerPage;//Example with nº page =1 =>(10*1)-10 = 0;
    //let limitTop=(usersPerPage*page)-1;//Example with nº page =1=> (10*1)-1= 9;
    let limits = calculateLimits(page);
    console.log(limits);
    let limitBottom = limits[0];
    let limitTop = limits[1];
    console.log(limitTop);
    for(let i=0;i<anchor.length;i++){//deactivate the class "active" in anchors
      anchor[i].className="";
    }
    e.target.className="active"//just "active" the anchor that was click.
    hideItems(limitBottom,limitTop);//call function to hide/show elements.
  }
})

const studentSearch = document.querySelector(".student-search");

studentSearch.addEventListener("click",(e)=>{
  let pagination = document.querySelector(".pagination");
  let ulPagination = pagination.firstElementChild;
  if(e.target.tagName =="BUTTON"){
    let student = e.target.previousElementSibling.value;
    student.toLowerCase();
    if(student === ""){
      hideItems(0,9);
    }else{
      let studentsToShow = searchStudent(student);
      console.log(studentsToShow);
      hideAllStudents();
      //page.removeChild(pagination);//remove pagination
      if(studentsToShow.length<10){
        pagination.removeChild(ulPagination);        //createPaginationElements(1);
        let page1 = document.createElement("li");
        ulPagination.appendChild(page1);
        pagination.appendChild(ulPagination);
      }else{
        let pagesSearch = Math.ceil(listUsers.length/studentsToShow.length);
        createPaginationElements(pagesSearch);
      }
      showStudents(studentsToShow);
      console.log("hola");
    }

  }
})
