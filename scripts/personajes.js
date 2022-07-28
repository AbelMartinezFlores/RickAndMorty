'use strict'

const URL = "https://rickandmortyapi.com/api/character/?";
const icons = {
    Human: 'fa-solid fa-user',
    Alien: 'fa-brands fa-reddit-alien',
    Humanoid: 'fa-solid fa-user-astronaut',
    Poopybutthole: 'fa-solid fa-bacterium',
    'Mythological Creature': 'fa-solid fa-gem',
    Robot: 'fa-solid fa-robot',
    Animal: 'fa-solid fa-paw'
};

function fetchCharacters(url,numberPage){
    let urlFinal;
    
    if(localStorage.getItem('url') !== null  && url){

            if(url.includes('&page=')){
                urlFinal = url.split("&page=")[0] + '&page=' + numberPage;
            }
            else{
                urlFinal = url  + '&page=' + numberPage;  
            }
    }
    else{
        console.log('hola');
        urlFinal = URL;
        urlFinal +=  "&page=1";
    }
    
    localStorage.setItem('url', urlFinal);

    fetch(urlFinal)
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
                    <h2 class="text-white mb-0">${character.name}</h2>
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

    return false;
}
// ------------ Para aplicar los filtros de busqueda ----------
const formCharacters = document.querySelector('#formCharacters');
formCharacters.addEventListener('submit', (e) =>{
    e.preventDefault();

    let name = document.querySelector('#nameCharacter').value;
    let species = document.querySelector('#specieCharacter').value;
    let gender = document.querySelector('#inputGroupGender').value;
    let status = document.querySelector('#inputGroupStatus').value;
    
    let url = URL;

    let count = 0;

    if(name && name!==''){
        url += 'name=' + name;
    }

    if(species && species!==''){
        count ++;
        url += count > 0 ? '&' : '';
        url += 'species=' + species;
    }

    if(gender !== 'Sin eleccion'){
        count ++;
        url += count > 0 ? '&' : '';
        url += 'gender=' + gender;
    }

    if(status !== 'Sin eleccion'){
        count ++;
        url += count > 0 ? '&' : '';
        url += 'status=' + status;
    }

    fetchCharacters(url,1);
});

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
            <a  class="page-link " href="#" onclick="fetchCharacters('${localStorage.getItem('url')}',1)">&laquo;</a>
        </li>
        <li id="prev-page" class="page-item">
            <a  class="page-link" href="#" onclick="fetchCharacters('${localStorage.getItem('url')}',${anterior})">${anterior}</a>
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
            <a id="next-page"  class="page-link" href="#" onclick="fetchCharacters('${localStorage.getItem('url')}',${siguiente})">${siguiente}</a>
        </li>
        <li class="page-item">
            <a id="last-page" class="page-link" href="#" onclick="fetchCharacters('${localStorage.getItem('url')}',${pages})">&raquo;</a>
        </li>
        `;
    }
}
