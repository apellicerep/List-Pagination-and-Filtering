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
