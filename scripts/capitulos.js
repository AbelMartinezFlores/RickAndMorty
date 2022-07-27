const carousel = document.querySelector('.container-carousel');
const episodes = document.querySelectorAll('.episode');

const leftArrow = document.querySelector('#left-arrow');
const rightArrow = document.querySelector('#right-arrow');

rightArrow.addEventListener('click', () => {
    carousel.scrollLeft += carousel.offsetWidth;

    const activeInidicator = document.querySelector('.indicators .active');
    let nextIndicator = activeInidicator.nextSibling;
    if(nextIndicator){
        nextIndicator.classList.add('active');
        activeInidicator.classList.remove('active');
    }
});

leftArrow.addEventListener('click', () => {
    carousel.scrollLeft -= carousel.offsetWidth;

    const activeInidicator = document.querySelector('.indicators .active');
    let prevIndicator = activeInidicator.previousSibling;
    if(prevIndicator){
        prevIndicator.classList.add('active');
        activeInidicator.classList.remove('active');
    }
});

//paginacion del carousel
const numberPages = Math.ceil(episodes.length/5);
for( let i = 0 ; i < numberPages; i++){

    const indicator = document.createElement('div');

    if (i === 0){
        indicator.classList.add('active');
    }

    document.querySelector('.indicators').appendChild(indicator);

    indicator.addEventListener('click', (e) => {
        carousel.scrollLeft = i* carousel.offsetWidth;

        document.querySelector('.indicators .active').classList.remove('active');
        e.target.classList.add('active');

    });
}