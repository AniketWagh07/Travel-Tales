/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav_menu')
const navToggle = document.getElementById('nav_toggle')
const navClose = document.getElementById('nav_close')


if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show_menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show_menu')
    })
}


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav_link')

const linkAction = () => {
    const navMenu = document.getElementById('nav_menu')
    navMenu.classList.remove('show_menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () => {
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('bg_header')
                        : header.classList.remove('bg_header')
}
window.addEventListener('scroll', bgHeader)


// // Function to calculate the distance using the Haversine formula
// function calculateDistance(lat1, lon1, lat2, lon2) {
//     const toRadians = (degrees) => (degrees * Math.PI) / 180;

//     const R = 6371; // Radius of the Earth in km
//     const dLat = toRadians(lat2 - lat1);
//     const dLon = toRadians(lon2 - lon1);
//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in km
// }

// // Get user's location and calculate distance
// function getDistance(lat2, lon2, callback) {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const userLatitude = position.coords.latitude;
//                 const userLongitude = position.coords.longitude;

//                 // Calculate distance
//                 const dist = calculateDistance(userLatitude, userLongitude, lat2, lon2);

//                 // Pass the result to the callback
//                 callback(dist);
//             },
//             (error) => {
//                 console.error("Error occurred: ", error);
//                 callback(null);
//             }
//         );
//     } else {
//         console.log("Geolocation is not supported by your browser.");
//         callback(null);
//     }
// }

// // Call the function and use a callback to handle the result
// getDistance(20.552037, 75.703053, (distance) => {
//     if (distance !== null) {
//         d = distance;
//         console.log(`Distance: ${distance.toFixed(2)} km`);
//     } else {
//         console.log("Unable to calculate the distance.");
//     }
// });



// Fetching data from JSON
let cards = document.getElementById("cards");
let cardsContainer = document.getElementById("container");

async function details() {
    // let data = await fetch("detail.json");
    // console.log(data);
    let data = await fetch("x.json");
    let main = await data.json();

    console.log(main.places)

    main.places.map((e) => {
        cardsContainer.innerHTML += `
            <div id="${e.productId}">
            <img src="${e.imageUrl[0]}" alt="${e.name}" />
            <i class="fa-solid fa-heart"></i>
            <div class="h4">
              <h4>${e.name}</h4>
            </div>
            <h5><i class="fa-solid fa-location-dot"></i>   ${e.location}</h5>
            <p><i class="fa-solid fa-compass"></i>    65 kilometres away</p>
          </div>
        `
    });

    let category = document.querySelectorAll("#heading > div > h5");
    // console.log(category)

    category.forEach((a) => {
        a.addEventListener("click",(x) => {
            cardsContainer.innerHTML = "";

            category.forEach((l) => {
                l.classList.remove("bgActive");
            });
            a.classList.add("bgActive");
        

            if(a.id == "all"){
                main.places.map((e) => {
                    cardsContainer.innerHTML += `
                        <div id="${e.productId}">
                        <img src="${e.imageUrl[0]}" alt="${e.name}" />
                        <i class="fa-solid fa-heart"></i>
                        <div class="h4">
                        <h4>${e.name}</h4>
                        </div>
                        <h5><i class="fa-solid fa-location-dot"></i>   ${e.location}</h5>
                        <p><i class="fa-solid fa-compass"></i>    65 kilometres away</p>
                    </div>
                    `
                });
            }else{
                main.places.map((e) => {
                    if(a.id == e.category){
                        cardsContainer.innerHTML += `
                            <div id="${e.productId}">
                            <img src="${e.imageUrl[0]}" alt="${e.name}" />
                            <i class="fa-solid fa-heart"></i>
                            <div class="h4">
                            <h4>${e.name}</h4>
                            </div>
                            <h5><i class="fa-solid fa-location-dot"></i>   ${e.location}</h5>
                            <p><i class="fa-solid fa-compass"></i>    65 kilometres away</p>
                        </div>
                        `
                    }
                })
            }
        })
    })
}
details()