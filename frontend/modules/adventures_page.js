import config from "../conf/index.js";
console.log(config.backendEndpoint);

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  console.log("search is="+search);
  var id=search.substring(search.lastIndexOf('=')+1);
  //console.log(id);
  return id;
}
//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    var id=getCityFromURL(city);
    const adventures=await fetch(config.backendEndpoint+"/adventures?city"+"="+id);
    const data=adventures.json();
    return data;
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //console.log(adventures);
  adventures.forEach((key)=>{
    var id=key.id;
    var category=key.category;
    var image=key.image;
    var name=key.name;
    var cost=key.costPerHead;
    var duration=key.duration;

    //console.log(category);
    const row=document.getElementById("data");
    const col=document.createElement("div");
    col.className="col-6 col-lg-3 mb-3";

    row.append(col);

    const a=document.createElement("a");
    col.append(a);

    a.href="detail/?adventure="+id;
    a.id=id;

    const activity_card=document.createElement("div");
    activity_card.className="card activity-card";
    a.append(activity_card);

    const img=document.createElement("img");
    img.src=image;
    img.className="activity-card img";
    activity_card.append(img);
    
    const catagory1=document.createElement("h6");
    catagory1.className="category-banner";
    catagory1.innerText=category;
    activity_card.append(catagory1);
    
    const contents=document.createElement("div");
    contents.className="card-body d-md-flex justify-content-between text-center contents-style";
    activity_card.append(contents);

    const h5=document.createElement("h5");
    h5.innerText=name;
    contents.append(h5);

    const p=document.createElement("p");
    p.innerText="₹"+cost;
    contents.append(p);

    const contents2=document.createElement("div");
    contents2.className="card-body d-md-flex justify-content-between text-center contents2-style";
    contents2.style.paddingTop=0;
    contents2.style.paddingBottom=0;

    const h51=document.createElement("h5");
    h51.innerText="Duration";
    contents2.append(h51);

    const p1=document.createElement("p");
    p1.innerText=duration + " Hours";
    contents2.append(p1);

    activity_card.appendChild(contents2);

  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList=[];

  list.map((key)=>{
    if(key.duration>low && key.duration<=high){
      filteredList.push(key);
    }
  });
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filteredList = [];
  categoryList.map((category) => {
    list.map((key) => {
      if (key.category === category) {
        filteredList.push(key);
      }
    });
  });

  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filteredList = [];
  console.log(filters["duration"]);
  // 3. Filter by duration and category together
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  // 2. Filter by duration only
  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    return filteredList;
  }

  // 1. Filter by category only
  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }

  // default case when there is no filter
  else {
    filteredList = list;
  }
  return filteredList;

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  filters["category"].map(key=>{
    let ele=document.createElement("div");
    ele.className="category-list";
    ele.innerHTML=`
    <div class="category-filter">${key}</div>
   `;

   document.getElementById("category-list").appendChild(ele);
 
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
