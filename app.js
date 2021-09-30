const elMenu = selectElem('.home__list');
const elForm = selectElem('.header__form');
const elFilter = selectElem('.form__quality');
const elSelect = selectElem('.home__type');
const elRoomInput = selectElem('.room__number');
const elSearch = selectElem('.form__search');
const elTemplate = selectElem('#template').content;
const elHeaderLike = selectElem('.header__like');
let modal = selectElem('.modal');
let modalExit = selectElem('.modal__exit', modal);
let modalList = selectElem('.modal__list', modal);


function renderHomes(homesArr, element){
    element.innerHTML = null;
    homesArr.forEach((home) =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        selectElem('.home__img', cloneTemplate).src = home.img;
        selectElem('.home__title', cloneTemplate).textContent = home.title;
        selectElem('.home__rooms', cloneTemplate).textContent = "Xonalar soni: " + home.rooms;
        selectElem('.home__area', cloneTemplate).textContent = "Maydoni: " + home.area + "kv.m";
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
        selectElem('.home__like', cloneTemplate).dataset.id = home.id
        
        element.appendChild(cloneTemplate);

        // cloneTemplate.addEventListener('click', () =>{

        // })
    })
}
renderHomes(homes, elMenu);



//render for like

function renderLikes(homesArr, element){
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
        selectElem('.home__like', cloneTemplate).dataset.id = home.id
        selectElem('.home__like',cloneTemplate).innerHTML='<i class="fas fa-trash"></i>' ;
        selectElem('.home__like',cloneTemplate).classList = ('trash');
        
        element.appendChild(cloneTemplate);
    })
}



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

    // const roomgex = new RegExp(roomValue, 'gi');
    // const filteredRooms = homes.filter((home)=> home.rooms.match(roomgex));
    
    let foundHomes = [];
    
    if(selectValue === 'All'){
        foundHomes = filteredHomes;
    }else{
        foundHomes = filteredHomes.filter(home => home.type.includes(selectValue));
    }

    // console.log(foundHomes)
    // if(selectValue === 'All'){
    //     foundHomes = filteredRooms;
    // }else{
    //     foundHomes = filteredRooms.filter(home => home.rooms.includes(roomValue));
    // }
    
    if(filterValue === 'ch-e'){
        foundHomes.sort((a, b) => {
            if(a.price > b.price){
                return 1
            }else if( a.price < b.price){
                return -1
            }else{
                return 0
            } 
        })
    }else if(filterValue === 'e-ch'){
        foundHomes.sort((a, b) => {
            if(a.price > b.price){
                return -1
            }else if( a.price < b.price){
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
    if(filterValue === 'small-big'){
        foundHomes.sort((a, b) => {
            if(a.area > b.area){
                return 1
            }else if( a.area < b.area){
                return -1
            }else{
                return 0
            }
        })
    }else if(filterValue === 'big-small'){
        foundHomes.sort((a, b) => {
            if(a.area > b.area){
                return -1
            }else if( a.area < b.area){
                return 1
            }else{
                return 0
            }
        })
    }
    elSearch.value = null;
    // elRoomInput.value = null;
    renderHomes(foundHomes, elMenu);
})
