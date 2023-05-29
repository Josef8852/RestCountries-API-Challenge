'use strict' ; 

let container = document.querySelector('.cards') ; 

let flags = document.querySelector('.flags') ; 

let darkMode = document.querySelector('.darkMode') ; 

let nav = document.querySelector('.nav') ; 

let select = document.querySelector('.select')

let options = document.querySelectorAll('.opt') ; 

let input = document.querySelector('.field') ; 

let icon = document.querySelector('.fa-magnifying-glass')  ;

let detailsContainer = document.querySelector('.details') ; 

let detailsSection = document.querySelector('.fullDetails') ;






let getData = async () => {
try {
  let response = await fetch('https://restcountries.com/v3.1/all') ;


  let data = await response.json() ; 

  return data ; 
}
catch (err) {
  let HTML = `<p class="error"> Something went Wrong⛔ </p>` ; 

  container.insertAdjacentHTML('afterbegin' , HTML) ;

  throw err;
}

};


  let countries = [] ,  cards  ; 



let showData = () => {
  detailsSection.classList.add('hide') ;
  getData().then((data) => {
    countries = data.map((element, index) => { 
      let HTML = `
      <div class="card">
      <div class="image">
        <img src="${element.flags.png}" alt="">
      </div>
    
      <div class="text">
        <h3>${element.name.common}</h3>
        <p><span>Population: </span>${element.population}</p>
        <p><span>Region: </span>${element.region}</p>
        <p><span>Capital: </span>${element.capital}</p>
      </div>
    
    </div>
      ` ; 
       container.insertAdjacentHTML('beforeend' , HTML)  ;
       cards = document.querySelectorAll('.card') ;
      return {countryName : element.name.common , card :  container.children[index], region : element.region}
     });
  });

}


showData() ;
  

let changeStyle = (collection , className) => {
  collection.forEach((element) => {
    element.classList.toggle(`${className}`) ; 
  })
  }

/* Dark mode  */

darkMode.addEventListener('click' , () => {
document.body.classList.toggle('dark-bg') ; 

document.body.classList.toggle('light-text') ;

nav.classList.toggle('dark-bg') ; 

select.classList.toggle('dark-bg') ;

select.classList.toggle('light-text') ; 

input.classList.toggle('dark-bg') ;

input.classList.toggle('light-text') ;

icon.classList.toggle('light-text') ;

changeStyle(options , 'dark-bg') ; 

changeStyle(options , 'light-text') ; 

}) ; 


/* Search */

input.addEventListener('input' , (e) => {
  let value = e.target.value ; 
  countries.forEach((element) => {
    let isEqual = element.countryName.includes(value) ; 
    element.card.classList.toggle('hide' , !isEqual) ; 
  }) ;
});


/* Filter by Region */

select.addEventListener('change' , (e) => {
let value = e.target.value ; 
countries.forEach((element) => {
  let isEqual = element.region === value || value === 'All'  ? true : false ; 
  element.card.classList.toggle('hide' , !isEqual) ; 
});

});


let hide = () => {
  input.classList.add('hide') ; 
  select.classList.add('hide') ;
  icon.classList.add('hide') ; 
  flags.classList.add('hide') ; 
  detailsSection.classList.add('show')
}

let show = () => {
  input.classList.remove('hide') ; 
  select.classList.remove('hide') ;
  icon.classList.remove('hide') ; 
  flags.classList.remove('hide') ; 
  detailsSection.classList.remove('show') ; 
}


let getKeys = (obj) => {
  let arr = [] ; 
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
  let val = obj[keys[i]];
  arr.push(val) ; 
}
return arr ; 
}


let getFullDetails = (element) => {
 let topLevelDomain = element.tld === undefined ? 'Does not Exist' : element.tld ; 

 let subRegion = element.subregion === undefined ? 'Does not Exist' : element.subregion ; 

 let currency = element.currencies === undefined ? 'No Currency' : element.currencies[Object.keys(element.currencies)[0]].name  ;


let HTML = `
<div>
<button class="removeDetails"><i class="fa-solid fa-arrow-left"></i> Back</button>
<div class="image">
<h3>${element.name.common}</h3>
  <img src="${element.flags.png}" alt="">
</div>
<div class="text">
  <p>Native Name: ${element.altSpellings[element.altSpellings.length-1]}</p>
  <p>Population: ${element.population} </p>
  <p>Region: ${element.region}</p>
  <p>Sub Region: ${subRegion} </p>
  <p>Capital: ${element.capital === undefined ? 'No Capital' : element.capital} </p>
  <p>Top Level Domain: (${topLevelDomain}) </p>
  <p>Currency: ${currency}  </p>
  <p>Languages: ${element.languages === undefined ? 'No languages' : getKeys(element.languages)}  </p>
</div>
</div>
`;


  detailsContainer.insertAdjacentHTML('afterbegin', HTML) ; 


/* Close Button */
setTimeout(() => {
  let button = document.querySelector('.removeDetails') ; 
 
   button.addEventListener('click' , () => {
      detailsContainer.removeChild(detailsContainer.firstElementChild) ; 
      show() ;
   });
 
 
 } ,100);



}


let getSelectedElement = (clickedElement) => {
let clickedName = clickedElement.children[1].children[0].textContent ; 
hide()  ;

getData().then((data) => {
 
data.forEach((element) => {
  if(element.name.common === clickedName) {
    getFullDetails(element) ; 
  }

}) ; 

});

}




setTimeout(() => {
cards = document.querySelectorAll('.card') ; 

cards.forEach((element) => {
  element.addEventListener('click' , () => {
    getSelectedElement(element)  ;
  });
})

} ,1000) ; 


















