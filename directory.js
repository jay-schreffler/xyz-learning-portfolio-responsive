// const allUsersUrl = (`https://randomuser.me/api/?inc=name,phone,email,picture,location
// /page=1&results=10&seed=abc`);

const usersPage1 = getAllUsers(100);
const groupTitle = document.querySelector('.group-filter-title');
const cards = document.querySelector('.cards');
const resultsEnd = document.querySelector('.group-filter-title');
const nextPageBtn = document.querySelector('#next-page');
const pageNav = document.querySelector('.page-nav');
const endOfResults = document.createElement('div');
let seed = 100;



function getAllUsers(seed) {
    fetch(`https://randomuser.me/api/?inc=name,phone,email,picture,location
    /page=1&results=10&seed=${seed}`)
    .then((res) => res.json())
    .then((data) => {
        const info = data.results;
        console.log(info)
        info.forEach((user) => {
            //build card
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card-wrapper');
            cards.append(cardContainer)
            // image
            const cardImg = document.createElement('img');
            cardContainer.append(cardImg);
            cardImg.classList.add('card-img')
            cardImg.src = user.picture.large;
            //text info
            const userName = document.createElement('p');
            cardContainer.append(userName);
            userName.classList.add('card-text');
            userName.textContent = `${user.name.first} ${user.name.last}`;
            const userPhone = document.createElement('a');
            const userEmail = document.createElement('a');
            cardContainer.append(userPhone,userEmail);
            userPhone.classList.add('card-text');
            userEmail.classList.add('card-text');
            userPhone.textContent = user.phone;
            userEmail.textContent = user.email;
        }) 
    })

}

// button 

//add previous button
const prevousPageBtn = document.createElement('button');
prevousPageBtn.classList.add('btn-style','hide-btn');
prevousPageBtn.textContent = 'Previous';
// before() inserts element before 
nextPageBtn.before(prevousPageBtn)

nextPageBtn.addEventListener('click', () => {
    //clear card div
    cards.innerHTML = ' '
    if(seed => 100) {
       prevousPageBtn.classList.remove('hide-btn')
    }
    seed = seed + 1;
    getAllUsers(seed)
    console.log(seed)
    if(seed > 101) {
        //remove cards and next button
        cards.classList.add('hide-btn')
        nextPageBtn.classList.add('hide-btn')
        endOfResults.classList.add('end-of-results')
        resultsEnd.append(endOfResults);
        endOfResults.innerHTML = '<p>End of results.</p>'
    }
})

prevousPageBtn.addEventListener('click', () => {
    if(seed >= 100) {
        prevousPageBtn.classList.add('hide-btn');
    }
        cards.innerHTML = ' ';
    cards.classList.remove('hide-btn')
    endOfResults.classList.remove('end-of-results')
    endOfResults.innerHTML = ' ';
    seed = seed - 1;
    getAllUsers(seed);
})