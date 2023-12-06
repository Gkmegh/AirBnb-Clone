document.addEventListener("DOMContentLoaded", function() {
    
const locationname = document.getElementById("location-input");
const checkin = document.getElementById("checkin-date");
const checkout = document.getElementById("checkout-date");
const guestname = document.getElementById("guest-name");
const searchbtn = document.getElementById("search-button");

const homepage = document.querySelector(".home-page");
const listingpage = document.querySelector(".listing-page");

searchbtn.addEventListener("click", searchdata);

async function searchdata(){
    const location = locationname.value.trim();
    const indate = checkin.value;
    const outdate = checkout.value;
    const guest = guestname.value;

    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${indate}&checkout=${outdate}&adults=1&children=0&infants=0&pets=0&page=1&currency=USD';`
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3e43a6e102mshddbd52f1670b63dp1900b6jsnbfff7a4bcf2f',
		    'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        console.log(result.results);
        standardsearch(result.results);
        displaymap(result.results);
        homepage.style.display = "none";
        listingpage.style.display ="block";
    } catch (error) {
        console.error(error);
    }
}


const hotelrooms = document.querySelector(".left-col");

function standardsearch(results){
    const firstline = document.createElement("p");
    firstline.innerHTML = `<p>200+ stays in ${results.city} </p>`;
    hotelrooms.appendChild(firstline);

    results.forEach(results => {    
        const roomscard = document.createElement("div");
        roomscard.className = "house";
        roomscard.innerHTML= `
                            <div class="house-img">
                                <a href="house.html"><img src="${results.images[0]}"></a>
                            </div>
                            <div class="house-info">
                                <p>Private Villa in ${results.city} </p>
                                <h3>${results.name}</h3>
                                <p>${results.bedrooms} Bedroom / ${results.bathrooms} Bathroom / ${results.previewAmenities[0]} / ${results.previewAmenities[1]}</p>
                                <p>${results.rating} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 3.95825L11.4583 8.54158H16.0417L12.2917 11.4583L13.5417 16.0416L10 13.1249L6.45834 16.0416L7.70834 11.4583L3.95834 8.54158H8.54168L10 3.95825Z" fill="#FCD34D" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> (${results.reviewsCount} reviews)</p>
                                <div class="house-price">
                                    <p>2 ${results.persons[0]} Guest</p>
                                    <h4>$ ${results.price.rate} <span>/ night</span></h4>
                                </div>
                            </div> `
        hotelrooms.appendChild(roomscard);
    });
}

    const mapcontainer = document.querySelector(".right-col");
    function displaymap(loc) {
        const mapdata = document.createElement("div");
        mapdata.className = "map";
        mapdata.innerHTML = `<iframe src="https://maps.google.com/maps?q=${loc[0].lat}, ${loc[0].lng}&z=15&output=embed"
                        src="https://maps.google.com/maps?q=28.56418, 77.25129&z=15&output=embed"
                        width="360" 
                        height="500"
                        frameborder="0"
                        style="border:0">

                    </iframe>`
        mapcontainer.appendChild(mapdata);
    }
});

