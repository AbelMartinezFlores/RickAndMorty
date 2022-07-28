// ------------- todo lo necesario para el carousel -------------

// ------------- aqui empiezo con las flechas de todos los carousel -------------
const leftArrow = document.querySelectorAll('.left-arrow');
const rightArrow = document.querySelectorAll('.right-arrow');

rightArrow.forEach( (e) => {

    e.addEventListener('click', (e) => {
        //para determinar el carousel pulsado y sacar que temporada es
        let carousel = e.currentTarget.previousSibling.previousSibling;
        let season = carousel.dataset.season;

        //movemos scroll a la derecha
        carousel.scrollLeft += carousel.offsetWidth;

        //encontramos indicador activado y lo desactivamos y activamos el siguiente
        const activeInidicator = document.querySelector(`#${season} .indicators .active`);
        let nextIndicator = activeInidicator.nextSibling;
        if(nextIndicator){
            nextIndicator.classList.add('active');
            activeInidicator.classList.remove('active');
        }
    });
});

leftArrow.forEach( (e) =>{
    e.addEventListener('click', (e) => {
        //para determinar el carousel pulsado y sacar que temporada es
        let carousel = e.currentTarget.nextSibling.nextSibling;
        let season = carousel.dataset.season;

        //movemos scroll a la derecha
        carousel.scrollLeft -= carousel.offsetWidth;

        //encontramos indicador activado y lo desactivamos y activamos el anterior
        const activeInidicator = document.querySelector(`#${season} .indicators .active`);
        let prevIndicator = activeInidicator.previousSibling;
        if(prevIndicator){
            prevIndicator.classList.add('active');
            activeInidicator.classList.remove('active');
        }
    });
});

// ------------- Paginacion de los episodios de cada carousel -------------
const containerCarousels = document.querySelectorAll('.carousel');
containerCarousels.forEach( (e) => {
    //sacamos que carousel es y vemoc suantos episodios tiene esa temporada para dividir la paginacion
    let carousel = e.parentElement;
    let season = e.attributes.id.nodeValue;
    const numberPages = Math.ceil(e.childElementCount/5);

    for( let i = 0 ; i < numberPages; i++){

        const indicator = document.createElement('div');
        //para que inicialmente el primer indicador sea el marcado
        if (i === 0) indicator.classList.add('active');
    
        document.querySelector(`#${season} .indicators`).appendChild(indicator);
        //para que todos los indicadores permitan desplazamiento
        indicator.addEventListener('click', (ind) => {
            carousel.scrollLeft = i* carousel.offsetWidth;
            document.querySelector(`#${season} .indicators .active`).classList.remove('active');
            ind.target.classList.add('active');
        });
    }   
});

// ---------- Programacion dinamica web ----------