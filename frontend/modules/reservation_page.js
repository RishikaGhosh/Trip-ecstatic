import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(config.backendEndpoint + "/reservations/");
    const data = await res.json();
    //console.log(data);
    return data;
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  console.log(reservations);
  // <tr>
  //                           <th scope="col">Transaction ID</th>
  //                           <th scope="col">Booking Name</th>
  //                           <th scope="col">Adventure</th>
  //                           <th scope="col">Person(s)</th>
  //                           <th scope="col">Date</th>
  //                           <th scope="col">Price</th>
  //                           <th scope="col">Booking Time</th>
  //                           <th scope="col">Action</th>
  //                       </tr>
  if(reservations.length>0){
    document.getElementById("no-reservation-banner").style.display="none";
    document.getElementById("reservation-table-parent").style.display='block';

    const tBody=document.getElementById("reservation-table");
    reservations.forEach((key)=>{
      const mainRow=document.createElement("tr");
      const transactions=document.createElement("td");
      const bookingName=document.createElement("td");
      const adventure=document.createElement("td");
      const person=document.createElement("td");
      const date=document.createElement("td");
      const price=document.createElement("td");
      const time=document.createElement("td");
      const action=document.createElement("td");

      transactions.innerHTML=key.id;
      mainRow.append(transactions);

      bookingName.innerHTML=key.name;
      mainRow.append(bookingName);

      adventure.innerHTML=key.adventureName;
      mainRow.append(adventure);

      person.innerHTML=key.person;
      mainRow.append(person);

      date.innerHTML=new Date(key.date).toLocaleDateString("en-IN");
      mainRow.append(date);

      price.innerHTML=key.price;
      mainRow.append(price);

      time.innerHTML=new Date(key.time).toLocaleString('en-IN',{
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      })
      mainRow.append(time);

      action.innerHTML=`<div class="reservation-visit-button" id=${key.id}><a href="../detail/?adventure=${key.adventure}">Visit Adventure</a></div></td>`
      mainRow.append(action);
      tBody.append(mainRow);
    })

  }
  else{
    document.getElementById("no-reservation-banner").style.display="block";
    document.getElementById("reservation-table-parent").style.display='none';
  }
}

export { fetchReservations, addReservationToTable };
