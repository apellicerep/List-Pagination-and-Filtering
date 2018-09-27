/******************************************
List Filter and Pagination --
******************************************/


// Add variables that store DOM elements I will need to reference and/or manipulate

const listUsers = document.querySelectorAll(".student-item");//select all students and I put them in Array.
const usersPerPage = 10;
const pages= Math.ceil(listUsers.length/usersPerPage); //number of pages.
const page = document.querySelector(".page");


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

//BUTTONBACK
const buttonBack = document.createElement("button");
buttonBack.textContent="Back";
buttonBack.className="back";



// Create and append the pagination links, and returns <ul> with the correct number of li depending
//on how many Students and Students per Page.
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


//Cleans the value in the input.
function cleanInput(){
  let input = document.querySelector("input");
  input.value = "";
}

//active or inactive the pagination anchor.
function activate1stPage(){
  let active = document.querySelector(".active");
  let inactiveToActive = document.querySelector("a");
  active.className="inactive";
  inactiveToActive.className="active";


}


//function receive nº of pages and creates an Array of "1"(show) and "0".(hide).
//Calculates the limits of Students to show depending of the page clicked.
//Example: if page is  1 => [1,1,1,1,1,1,1,1,1,1,0,0,0,0,.....]
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

//receive and array of words from Input and search/match in listUsers if that user exists.
//then returns an Array with the index of the users that matched.
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
          }
        }
    if(ok===arrayWords.length){
      arrayIndexStudentsSearch.push(i);
      console.log(listUsers[i]);
      }
  }
  return arrayIndexStudentsSearch; //Array with index of students to show.
}

//recevie and array with index of users that matches and creates and array of "0" and "1".
//Example: arrayIndexStudentsSearch = [2,4] then ==> arrayIndexStudentToShow =[0,1,0,1,0,0,0,....]
function arrayIndexStudentsSearch(arrayIndexStudentsSearch){
  console.log(arrayIndexStudentsSearch);
  let arrayIndexStudentToShow = [];
  for (let i=0;i<listUsers.length;i++){ //initialize array with all "0"
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


//function receive Array of Students that contains "1" and "0". if "1" display user, else block.
function hideShowStudents(arrayIndexStudentToShow){
  let count =0;
  let pagination = document.querySelector(".pagination");
  console.log(arrayIndexStudentToShow);
    for(let i=0; i<arrayIndexStudentToShow.length;i++){
        if(arrayIndexStudentToShow[i]==="1"){
          listUsers[i].style.display="block";
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
      }
      else{
        buttonBack.style.display="none";

      }
  }

//initialize in page 1 when html and css is Loaded.
hideShowStudents(arrayIndexStudentsToShow2(1));

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


//EventListener in Input, when user keyup I get value
input.addEventListener("keyup",(e)=>{
  let pagination = document.querySelector(".pagination");
  pagination.style.display="none";
  let arrayWords =[];
  let word = input.value.toLowerCase();
  console.log(word);
  word.split("");
  if(word===""){
    hideShowStudents(arrayIndexStudentsToShow2(1));
    pagination.style.display="block";
    activate1stPage();

  }else{

  hideShowStudents(arrayIndexStudentsSearch(searchStudent(word)));
}
})

//eventListener in Button Back.
buttonBack.addEventListener("click",(e)=>{
  hideShowStudents(arrayIndexStudentsToShow2(1));
  pagination.style.display="block";
  cleanInput();
  activate1stPage();

})
