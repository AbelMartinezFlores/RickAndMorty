'use strict'

const URL = "https://rickandmortyapi.com/api";
console.log(URL);
/**/ 
const icons = {
    Human: 'fa-solid fa-user',
    Alien: 'fa-brands fa-reddit-alien',
    Humanoid: 'fa-solid fa-user-astronaut',
    Poopybutthole: 'fa-solid fa-bacterium',
    'Mythological Creature': 'fa-solid fa-gem',
    Robot: 'fa-solid fa-robot',
    Animal: 'fa-solid fa-paw'
}

function loadCharacters(numberPage){
    //si no se especifica url entonces se muestra pagina inicial
    let url = "https://rickandmortyapi.com/api/character?page=" + numberPage;
     
    fetch(url)
        .then(response => response.json())
        .then(data => {
        
            console.log(data);
            let characters = data.results;
            let groupCharacters = document.querySelector('#groupCharacters');
            groupCharacters.innerHTML= "";
            renderPagination(data.info);

            characters.forEach(character => {
                
                let div = document.createElement('div');

                div.classList.add('cardCharacter');

                div.innerHTML = 
                `
                <div class="imgCharacter">
                    <img src="${character.image}" alt="${character.name}">
                </div>
                <div class="infoCharacter">
                    <h3 class="text-white mb-0">${character.name}</h3>
                    <p class="text-white"><span class="${character.status.toLowerCase()}">${character.status}</span> - ${character.species} <i class="${icons[character.species]}"></i></p>
                    <p class="text-white">${character.gender}</p>
                    <p class="text-white-50 mb-0 small">Origen:</p>
                    <p class="text-white">${character.origin.name}</p>
                </div>
                `;

                groupCharacters.appendChild(div);
            });
            
    })
    .catch(err =>{
        console.log(err);
    });
}

function renderPagination ({next, pages, prev}){

    let numberCurrentPage;

    let ul = document.querySelector('.pagination');
    ul.innerHTML="";

    if(prev){
        let anterior = parseInt(prev.split("page=")[1]);
        numberCurrentPage = anterior + 1;
        ul.innerHTML += 
        `
        <li id="first-page" class="page-item ">
            <a  class="page-link " href="#" onclick="loadCharacters(1)">&laquo;</a>
        </li>
        <li id="prev-page" class="page-item">
            <a  class="page-link" href="#" onclick="loadCharacters(${anterior})">${anterior}</a>
        </li>
        <li class="page-item active" aria-current="page">
              <span id="current-page"  class="page-link" >${numberCurrentPage}</span>
        </li>
        `;
    }
    else{
        ul.innerHTML += 
        `
        <li class="page-item active" aria-current="page">
              <span id="current-page"  class="page-link" >1</span>
        </li>
        `;
    }

    if(next){
        let siguiente = parseInt(next.split("page=")[1]);
        numberCurrentPage = siguiente + 1;
        ul.innerHTML += `
        <li class="page-item">
            <a id="next-page"  class="page-link" href="#" onclick="loadCharacters(${siguiente})">${siguiente}</a>
        </li>
        <li class="page-item">
            <a id="last-page" class="page-link" href="#" onclick="loadCharacters(${pages})">&raquo;</a>
        </li>
        `;
    }
}
