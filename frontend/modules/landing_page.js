import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("From init()");
  console.log(config.backendEndpoint);
  
  let cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const response= await fetch(config.backendEndpoint+"/cities");
    const data=response.json();
    return data;
  }
  catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  //creating the text for the card
  const div_content=document.createElement("div");
  div_content.className="tile-text text-center";
  const h5=document.createElement("h5");
  h5.innerText=city;
  const p=document.createElement("p");
  p.innerText=description;
  div_content.append(h5);
  div_content.append(p);


  //getting the parent div
  const row=document.getElementById("data");

  //creating the column div
  const col=document.createElement("div");
  col.className="col-12 col-sm-6 col-lg-3 mb-4";
  //attaching the col to row
  row.append(col);

  //creating the div under a tag
  const a=document.createElement("a");
  a.href="pages/adventures/?city="+id;
  a.id=id;
  const tile=document.createElement("div");
  tile.className="tile";
  
  a.append(tile);

  var img=document.createElement("img");
  img.src=image;

  tile.append(img);
  tile.append(div_content);

  //appending the a tag to the col div
  col.append(a);
  

}

export { init, fetchCities, addCityToDOM };
