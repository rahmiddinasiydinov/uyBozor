const elMenu = selectElem('.home__list');
const elForm = selectElem('.header__form');
const elSelect = selectElem('.form__quality');
const elTypeSelect = selectElem('.home__type');
const elRoomSelect = selectElem('.room__number');
const elSearch = selectElem('.form__submit');
const elTemplate = selectElem('#template').content;

function renderHomes(homesArr, element){
    element.innerHTML = null;
    homesArr.forEach((home) =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        selectElem('.home__img', cloneTemplate).src = home.img;
        selectElem('.home__title', cloneTemplate).textContent = home.title;
        selectElem('.home__rooms', cloneTemplate).textContent = "Xonalar soni: " + home.rooms;
        selectElem('.home__area', cloneTemplate).textContent = "Maydoni: " + home.area;
        selectElem('.home__price', cloneTemplate).textContent = "Narxi: " + home.price + "$";
        // selectElem('.home__turi', cloneTemplate).textContent = home.type;
        selectElem('.home__time', cloneTemplate).textContent = normalizeDate(home.release_date);
        selectElem('.home__time', cloneTemplate).datetime = normalizeDate(home.release_date);
        selectElem('.films__btn', cloneTemplate);
        
        element.appendChild(cloneTemplate);
    })
}
renderHomes(homes, elMenu);selectElem