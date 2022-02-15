import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  console.log(search);
  let url = new URLSearchParams(search);
  let advId = url.get("adventure");
  return advId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  console.log(adventureId);
  try {
    console.log(
      config.backendEndpoint + "/adventures/detail?adventure=" + adventureId
    );
    const res = await fetch(
      config.backendEndpoint + "/adventures/detail?adventure=" + adventureId
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  var name = adventure.name;
  var subtitle = adventure.subtitle;
  var content = adventure.content;
  //<h1 id="adventure-name"></h1>
  var header = document.getElementById("adventure-name");
  header.innerHTML = name;

  //<p style="font-size: 20px; color: #999" id="adventure-subtitle"></p>
  var para = document.getElementById("adventure-subtitle");
  para.innerHTML = subtitle;

  //<div class="row mb-3" id="photo-gallery"></div>
  var imageDiv = document.getElementById("photo-gallery");

  let imgArr = [];
  imgArr = adventure.images;
  //console.log(imgArr[0]);

  for (var i = 0; i < imgArr.length; i++) {
    let ele = document.createElement("div");
    ele.className = "col-lg-12";

    const img = document.createElement("img");
    img.src = imgArr[i];
    img.className = "activity-card-image pb-3 pb-md-0";
    ele.append(img);
    imageDiv.append(ele);
  }

  //<div id="adventure-content"></div>
  const adventureContent = document.getElementById("adventure-content");
  const content2 = document.createElement("p");
  content2.innerHTML = content;
  adventureContent.append(content2);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  // <div class="row mb-3" id="photo-gallery">
  //   <div class="col-lg-12">
  //     <img src="https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=650&amp;w=940" class="activity-card-image pb-3 pb-md-0"></div>
  //     <div class="col-lg-12">
  //       <img src="https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&amp;cs=tinysrgb&amp;h=650&amp;w=940" class="activity-card-image pb-3 pb-md-0"></div>
  //     <div class="col-lg-12">
  //       <img src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=650&amp;w=940" class="activity-card-image pb-3 pb-md-0"></div>
  //     </div>

  console.log(images);
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
    <div class="carousel-inner" id="carousel-inner">

    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

  images.map((image, idx) => {
    let ele = document.createElement("div");
    ele.className = `carousel-item ${idx === 0 ? "active" : ""}`;
    ele.innerHTML = `
    <img
        src=${image}
        alt=""
        srcset=""
        class="activity-card-image pb-3 pb-md-0"
      />
          `;

    document.getElementById("carousel-inner").appendChild(ele);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";

    //costPerHead
    //reservation-person-cost

    var res = document.getElementById("reservation-person-cost");
    res.innerHTML = adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  //reservation-cost
  var totalCost = adventure.costPerHead * persons;
  var res = document.getElementById("reservation-cost");
  res.innerHTML = totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let formData = document.getElementById("myForm");
  formData.addEventListener('submit', (event)=>{
    event.preventDefault();
    let name = formData.elements["name"].value;
    
    let date = formData.elements["date"].value;
    let person = formData.elements["person"].value;
    console.log(name+ date + person + " " + adventure.id);
    let id = adventure.id;
    let data = {
      name:name,
      date:date,
      person:person,
      adventure:id };
    console.log(data);
    makeReservation(data);
  });

  let makeReservation = async (data) => {
    let options = {
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
        },
      body : JSON.stringify(data)
    };
  
     const result = await fetch(config.backendEndpoint  + "/reservations/new",options)
     let response = await result.json();
     console.log(response);   
     if(result.status === 200){
       alert("Sucess!");
       location.reload(true);
     }
     else{
       alert("Failed");
       location.reload(true);
     }
     
  }
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let bannerDiv = document.getElementById("reserved-banner");
  if (adventure.reserved) {
    bannerDiv.style.display = "block";
  }
  else{
    bannerDiv.style.display = "none";
  } 
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
