/******************************************
List Filter and Pagination --
******************************************/

const listUsers = document.querySelectorAll(".student-item");//select all students and I put them in Array.
const numUsers=listUsers.length;
const usersPerPage = 10;
const pages= Math.ceil(listUsers.length/usersPerPage); //number of pages.
const page = document.querySelector(".page");
//Create div pagination
const divPagination = document.createElement("div")
divPagination.className="pagination"
const ulPagination = document.createElement("ul")
divPagination.appendChild(ulPagination)
page.appendChild(divPagination)


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



//initilize the number of page buttons
printListPagination(pages)

//Starts showing first page users
showUsers(1)



//Logic for displaying the Users
function showUsers(num){
  let max=num*10;
  let min=max-10;
  if(num==pages) max=numUsers;
  for(let i of listUsers){
    i.style.display="none"
  }
  for(let i=min;i<max;i++){
    listUsers[i].style.display="block"
  }
}

//Function that prints the pageButtons
function printListPagination(pages){
  let pageButton = ""
  for(let i=0;i<pages;i++){
    if(i==0){
      pageButton += `<li><a class="active">${i+1}</a></li>`
    }else{
       pageButton += `<li><a>${i+1}</a></li>`
    }
  }
  ulPagination.innerHTML= pageButton
}


//Add EventListener to de Input
input.addEventListener("keyup",(event)=>{
  let value = event.target.value
  let studentDetails = document.querySelectorAll(".student-details > h3")
  console.log(value)
  console.log(value)
  for(let i of studentDetails){
    i.parentNode.parentNode.style.display="none"
    let nombre = i.textContent
   if(nombre.includes(value)){
     i.parentNode.parentNode.style.display="block"
   }
  }
  if(value===""){
    showUsers(1)
    printListPagination(pages)
  }else{
    printListPagination(0)
  }
})


//Add EventListener to the pagination Button
ulPagination.addEventListener("click",(event)=>{
  console.log(event.target.tagName)
  let anchors=document.querySelectorAll("a")
  if(event.target.tagName=="A"){
    let valuePag =event.target.textContent
    showUsers(valuePag)
    for(let i of anchors){
      i.className="";
    }
    event.target.className="active"
    
  } 
  
})
