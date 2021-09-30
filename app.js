const elMenu = selectElem('.home__list');
const elForm = selectElem('.header__form');
const elFilter = selectElem('.form__quality');
const elSelect = selectElem('.home__type');
const elRoomInput = selectElem('.room__number');
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
        selectElem('.home__price', cloneTemplate).textContent = "Narxi: " + home.price + " $";
        let elTypes = selectElem('.home__turi', cloneTemplate)
        home.type.forEach((tip) =>{
            let newLi = createElem('li');
            newLi.textContent = tip;
            elTypes.appendChild(newLi);
        })
        selectElem('.home__time', cloneTemplate).textContent = normalizeDate(home.release_date);
        selectElem('.home__time', cloneTemplate).datetime = normalizeDate(home.release_date);
        selectElem('.films__btn', cloneTemplate);
        
        element.appendChild(cloneTemplate);
    })
}
renderHomes(homes, elMenu);

function renderTypes(typeArr, element){
    let result = []
    typeArr.forEach((home) =>{
        home.type.forEach(type =>{
            if(!result.includes(type)){
                result.push(type);
            }; 
        });
    });
    result.forEach(type =>{
        let newOption = createElem('option');
        newOption.textContent = type;
        newOption.value = type;
        
        element.appendChild(newOption);
    });
};
renderTypes(homes, elSelect);



elForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const inputValue = elSearch.value.trim();
    const selectValue = elSelect.value.trim();
    const filterValue = elFilter.value.trim();
    const roomValue = elRoomInput.value.trim();
    
    const regex = new RegExp(inputValue, 'gi');
    const filteredHomes = homes.filter((home)=> home.title.match(regex));

    const roomgex = new RegExp(roomValue, 'gi');
    const filteredRooms = homes.filter((home)=> home.rooms.match(roomgex));
    
    let foundHomes = [];
    
    if(selectValue === 'All'){
        foundHomes = filteredHomes;
    }else{
        foundHomes = filteredHomes.filter(home => home.types.includes(selectValue));
    }
    if(selectValue === 'All'){
        foundHomes = filteredRooms;
    }else{
        foundHomes = filteredRooms.filter(film => home.rooms.includes(roomValue));
    }
    
    if(filterValue === 'A_Z'){
        foundHomes.sort((a, b) => {
            if(a.title > b.title){
                return 1
            }else if( a.title < b.title){
                return -1
            }else{
                return 0
            } 
        })
    }else if(filterValue === 'Z_A'){
        foundHomes.sort((a, b) => {
            if(a.title > b.title){
                return -1
            }else if( a.title < b.title){
                return 1
            }else{
                return 0
            }
        })
    }
    if(filterValue === 'new_old'){
        foundHomes.sort((a, b) => {
            if(a.release_date > b.release_date){
                return 1
            }else if( a.release_date < b.release_date){
                return -1
            }else{
                return 0
            }
        })
    }else if(filterValue === 'old_new'){
        foundHomes.sort((a, b) => {
            if(a.release_date > b.release_date){
                return -1
            }else if( a.release_date < b.release_date){
                return 1
            }else{
                return 0
            }
        })
    }
    elSearch.value = null;
    elRoomInput.value = null;
    renderMovies(foundHomes, elMenu);
})