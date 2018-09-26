/******************************************
List Filter and Pagination
******************************************/


// Add variables that store DOM elements I will need to reference and/or manipulate

const listUsers = document.querySelectorAll(".student-item");//select all students and I put them in Array.
const usersPerPage = 10;
const pages= Math.ceil(listUsers.length/usersPerPage); //number of pages.
const page = document.querySelector(".page");
const buttonBack = document.createElement("button");
buttonBack.textContent="Back";
buttonBack.className="back";

//SEARCHBOX
const divSearch = document.createElement("div");
divSearch.className="student-search";
const input = document.createElement("input");
input.placeholder ="Search Students...";
const button = document.createElement("button");
button.textContent ="Search";
divSearch.appendChild(input);
divSearch.appendChild(button);
page.firstElementChild.appendChild(divSearch);

//PAGINATION
const divPages = document.createElement("div")
//append <ul> in div
divPages.appendChild(createPaginationElements(pages));
divPages.className = "pagination";
//append <div class = pagination> to <div class= page>
page.appendChild(divPages);
//////////////

/*PAGINATION SEARCH

const divPagesSearch = document.createElement("div")
//append <ul> in div
divPagesSearch.appendChild(createPaginationElements(1));
divPagesSearch.className = "pagination";
//append <div class = pagination> to <div class= page>
page.appendChild(divPagesSearch);*/


//function recive Array of Students contains "1" = display.none,  "0" =display.block
function hideShowStudents(arrayIndexStudentToShow){
  let count =0;
  let countBlock=0;
  let pagination = document.querySelector(".pagination");
  console.log(arrayIndexStudentToShow);
    for(let i=0; i<arrayIndexStudentToShow.length;i++){
        if(arrayIndexStudentToShow[i]==="1"){
          listUsers[i].style.display="block";
          countBlock++;
          buttonBack.style.display="block";


      }else{
        listUsers[i].style.display="none";
        count++;
        buttonBack.style.display="block";
      }

      }

      if(count ===listUsers.length){

        pagination.style.display ="none";
        page.appendChild(buttonBack);
        buttonBack.style.display="block";

        //alert("0 results");
      }
      else{
        //pagination.style.display ="block";
        buttonBack.style.display="none";

      }
      return countBlock;
  }


// Create and append the pagination links
function createPaginationElements(pages){
  //let backButton = argument[2];
  let liPages=[];
  //create elements.
  function createElement(tag){
    let element = document.createElement(tag);
    return element;
  }

  //create Array of <il> with its <a>
  for(let i=0; i<pages;i++){
    let item = document.createElement("li");
    let anchor = document.createElement("a");
    if(i==0){
      anchor.className="active";//when page is load the first nº page is active.
    }
    anchor.href = "#";
    anchor.textContent = i+1;//nº page starts from 1 not from 0.
    item.append(anchor);
    liPages.push(item);
  }
  //Create <ul>
  let ulPages = document.createElement("ul");

  //append li in <ul>
  for(let i=0;i<liPages.length;i++){
    ulPages.appendChild(liPages[i]);
  }
  return ulPages;
}

function searchStudent(arrayWords){
  console.log(arrayWords);
  let ok;
  let arrayStudentsMostrar=[];
  let arrayIndexStudentsSearch=[];
  for(let i=0;i<listUsers.length;i++){
    ok=0;
    let h3 = listUsers[i].firstElementChild.firstElementChild.nextElementSibling;
    let name = h3.textContent;
    let nameSplit = name.split("");
    let span = h3.nextElementSibling;
    let email = span.textContent;
    for(let i=0;i<arrayWords.length;i++){
        if(arrayWords[i]===nameSplit[i]){
          ok++;
          console.log(ok);
        }
      }
      if(ok===arrayWords.length){
        //arrayStudentsMostrar.push(listUsers[i]);
        arrayIndexStudentsSearch.push(i);
        console.log(listUsers[i]);
      }
    }
    return arrayIndexStudentsSearch; //Array with index of students to show.
    }



function cleanInput(){
  let input = document.querySelector("input");
  input.value = "";
}

function activate1stPage(){
  let active = document.querySelector(".active");
  let inactiveToActive = document.querySelector("a");
  active.className="inactive";
  inactiveToActive.className="active";


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


hideShowStudents(arrayIndexStudentsToShow2(1));//initialize page 1.



//function receive nº of page and creates an Array of "1"(show) and "0".(hide).
function arrayIndexStudentsToShow2(page){
  let arrayIndexStudentToShow = [];
  for (let i=0;i<listUsers.length;i++){
    arrayIndexStudentToShow.push("0");
  }
  let limitBottom=(usersPerPage*page)-usersPerPage;//Example with nº page =1 =>(10*1)-10 = 0;
  let limitTop=(usersPerPage*page);//Example with nº page =1=> (10*1)-1= 9;
  for(limitBottom;limitBottom<limitTop;limitBottom++){
    for(let i=0;i<arrayIndexStudentToShow.length;i++){
      if(i==(limitBottom)){
        arrayIndexStudentToShow[i] ="1";
      }
  }
}
  return arrayIndexStudentToShow;
}

function arrayIndexStudentsSearch(arrayIndexStudentsSearch){
  console.log(arrayIndexStudentsSearch);
  let arrayIndexStudentToShow = [];
  for (let i=0;i<listUsers.length;i++){
    arrayIndexStudentToShow.push("0");
  }
  for(let i=0;i<arrayIndexStudentsSearch.length;i++){
    for(let j=0;j<listUsers.length;j++){
      if(arrayIndexStudentsSearch[i]===j){
        arrayIndexStudentToShow[j]="1";
      }

    }
  }
  console.log(arrayIndexStudentToShow);
  return arrayIndexStudentToShow;
}

function cleanInputValue(){
  let input = document.querySelector("input");
  input.value ="";
}




/*When user clics the page number it calculates the limits of a range of numbers.then it will pass that limits
to hide/show the elements.*/

const pagination = document.querySelector(".pagination");
pagination.addEventListener("click",(e)=>{
  let page = e.target.textContent;
  hideShowStudents(arrayIndexStudentsToShow2(page));
  if(e.target.tagName ==="A"){
    let anchor = document.querySelector(".active");
    anchor.className="inactive";
    e.target.className ="active";
    }
})

//const input1 = document.querySelector("input");

input.addEventListener("keyup",(e)=>{
  let pagination = document.querySelector(".pagination");
  pagination.style.display="none";
  let arrayWords =[];
  let word = input.value;
  console.log(word);
  word.split("");
  if(word===""){
    hideShowStudents(arrayIndexStudentsToShow2(1));
    pagination.style.display="block";
    activate1stPage();

  }else{

  let numberStudentsShowed =hideShowStudents(arrayIndexStudentsSearch(searchStudent(word)));
  let pagesToSearch=0;
}
})


buttonBack.addEventListener("click",(e)=>{
  hideShowStudents(arrayIndexStudentsToShow2(1));
  pagination.style.display="block";
  cleanInput();
  activate1stPage();


})
