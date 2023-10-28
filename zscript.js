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
            'X-RapidAPI-Key': '1eba737e6emsh4ccbb6f50f9766ap1ebdccjsndb6541b99697',
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


const housedetails =  document.querySelector(".house-details");


function displayhouse(){

    const roomdetail = document.createElement("div");
    roomdetail.className = "ho";
    roomdetail.innerHTML =  `<div class="house-title">
                        <h1>Wenge House</h1>
                        <div class="row">
                        <div class="row">
    
                            <span>245 Reviews</span>
                       
                            <p>Location: San Francisco, California, United States</p>
                       
                    </div>
                        </div>
                    </div>
                    <div class="gallery">
                    <div class="gallery-img-1"><img src="images/house-1.png"></div>
                    <div><img src="images/house-2.png"></div>
                    <div><img src="images/house-3.png"></div>
                    <div><img src="images/house-4.png"></div>
                    <div><img src="images/house-5.png"></div>
                </div>
                <div class="small-details">
                <h2>Entire rental unit hosted by Brandon</h2>
                <p>2 guest &nbsp; &nbsp; 2 beds &nbsp; &nbsp; 1 bathroom</p>
                <h4>$ 100 / day</h4>
            </div>
                    <hr class="line">
                    <form class="check-form">
                        <div>
                            <label>Check-in</label>
                            <input type="text" placeholder="Add date">
                        </div>
                        <div>
                            <label>Check-out</label>
                            <input type="text" placeholder="Add date">
                        </div>
                        <div class="guest-field">
                            <label>Guest</label>
                            <input type="text" placeholder="2 guest">
                        </div>
                        <button type="submit">Check Availability</button>
                    </form>

                    <ul class="details-list">
                        <li><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M9.00029 25.6671H23.0003C24.473 25.6671 25.667 24.4732 25.667 23.0004V13.0004L16.0003 6.33374L6.33362 13.0004V23.0004C6.33362 24.4732 7.52753 25.6671 9.00029 25.6671Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.9995 20.9989C12.9995 19.5262 14.1934 18.3323 15.6662 18.3323H16.3328C17.8056 18.3323 18.9995 19.5262 18.9995 20.9989V25.6656H12.9995V20.9989Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>Entire Home
                            <span>You’ll have the apartment to yourself</span>
                        </li>
                        <li><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M20 6.33325C20 10.0151 18.0153 13.3333 14.3334 13.3333C18.0153 13.3333 20 16.6514 20 20.3333C20 16.6514 21.9848 13.3333 25.6667 13.3333C21.9848 13.3333 20 10.0151 20 6.33325Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.6667 16.9999C10.6667 19.2091 8.54251 21.3333 6.33337 21.3333C8.54251 21.3333 10.6667 23.4574 10.6667 25.6666C10.6667 23.4574 12.7909 21.3333 15 21.3333C12.7909 21.3333 10.6667 19.2091 10.6667 16.9999Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>Enhanced Clean
                            <span>This host has committed to staybnb's cleaning process.</span>
                        </li>
                        <li><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M20.3333 6.33325H11.6667C10.1939 6.33325 9 7.52716 9 8.99992V25.6666H23V8.99992C23 7.52716 21.8061 6.33325 20.3333 6.33325Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.3333 15.9999C19.3333 16.3681 19.0349 16.6666 18.6667 16.6666C18.2985 16.6666 18 16.3681 18 15.9999C18 15.6317 18.2985 15.3333 18.6667 15.3333C19.0349 15.3333 19.3333 15.6317 19.3333 15.9999Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.33337 25.6667H25.6667" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>Self check-in
                            <span>Check yourself in with the keypad.</span>
                        </li>
                        <li><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M6.33337 11.6667C6.33337 10.1939 7.52728 9 9.00004 9H23C24.4728 9 25.6667 10.1939 25.6667 11.6667V23C25.6667 24.4728 24.4728 25.6667 23 25.6667H9.00004C7.52728 25.6667 6.33337 24.4728 6.33337 23V11.6667Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.6666 6.33325V10.9999" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21.3334 6.33325V10.9999" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.3334 14.3333H21.6667" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>Free cancellation before Nov 15
                        </li>
                    </ul>

                    <hr class="line">

                    <p class="home-desc">Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.</p>
                    <hr class="line">

                    <div class="map">
                    <h3>Location on map</h3>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21221.676224044128!2d-122.45917885570059!3d37.75203368896406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1641145357317!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    <b>San Francisco, California, United States</b>
                    <p>It's like a home away from home.</p>
                </div>

                    <hr class="line">

                    <div class="host">
                        <img src="images/host.png">
                        <div>
                            <h2>Hosted by Brandon</h2>
                            <p><span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M7.99996 3.16663L9.16663 6.83329H12.8333L9.83329 9.16663L10.8333 12.8333L7.99996 10.5L5.16663 12.8333L6.16663 9.16663L3.16663 6.83329H6.83329L7.99996 3.16663Z" stroke="#DE3151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                                
                            </span>&nbsp; &nbsp;  reviews &nbsp; &nbsp; Identity verified &nbsp; &nbsp; Superhost</p>
                        </div>
                    </div>
                    <a href="#" class="contact-host">Contact Host</a>
                    `

        housedetails.appendChild(roomdetail);

}
displayhouse();


});
