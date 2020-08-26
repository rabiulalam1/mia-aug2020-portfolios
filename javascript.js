// document.querySelector("#calculate").onclick = calculateAll;

// function calculateAll() {
//   let ironhackRows = document.querySelectorAll(".product");
//   let total = 0;
//   for (let row of ironhackRows) {
//     let price = row.querySelector(".price span").innerHTML;
//     let quantity = row.querySelector(".quantity input").value;
//     let subtotal = price * quantity;
//     total += subtotal;

//     row.querySelector(".subtotal span").innerHTML = subtotal;
//   }
//   document.querySelector("#total-value span").innerHTML = total;
// }

// function deleteRow(e) {
//   let deleteItem = e.target.parentElement.parentElement;
//   console.log(deleteItem);
//   deleteItem.remove();
// }

// function wireUpRemoveButtons() {
//   let removeButtons = document.querySelectorAll(".btn-remove");
//   console.log(removeButtons);
//   for (let i = 0; i < removeButtons.length; i++) {
//     let eachButton = removeButtons[i];
//     eachButton.onclick = deleteRow;
//   }
// }
// wireUpRemoveButtons();

// document.querySelector("#create").onclick = createProduct;
// function createProduct() {
//   let productName = document.querySelector("#broccoli").value;
//   let productPrice = document.querySelector("#raspberries").value;
//   console.log(productName, productPrice);

//   let element = `<tr class="product">
//   <td class="name">
//     <span>${productName}</span>
//   </td>
//   <td class="price">$<span>${productPrice}</span></td>
//   <td class="quantity">
//     <input type="number" value="0" min="0" placeholder="Quantity" />
//   </td>
//   <td class="subtotal">$<span>0</span></td>
//   <td class="action">
//     <button class="btn btn-remove">Remove</button>
//   </td>
// </tr>`;

//   document.querySelector("#tableBody").innerHTML += element;

//   document.querySelector("#tableBody").innerHTML = element;

//   document.querySelector("#broccoli").value = "";
//   wireUpRemoveButtons();
// }


function submitFunction (){
  let firstName = document.querySelector("#first-name-input").value;
  let lasttName = document.querySelector("#last-name-input").value;
  let url = document.querySelector("#url").value;
  
  axios
        .post(`https://ironrest.herokuapp.com/antguts`, {first_name:firstName, last_name:lasttName,
        website:url})
        .then((res)=>{
          createTable();
        })
        
}

function createTable() {
  axios
        .get(`https://ironrest.herokuapp.com/antguts`)
        .then((res)=>{
          for (let i of res.data){
            document.querySelector("#tableBody").innerHTML += `<tr class="portfolios">
            <td class="first-name">
              <span>`+i.first_name+`</span>
            </td>
            <td class="last-name"><span>`+i.last_name+`</span></td>
            <td class="link">
              <span><a href="`+i.website+`">`+i.first_name+`s Portfolio</a></span>
            </td>
            <td class="action">
              <button class="btn btn-remove">Remove</button>
            </td>
          </tr>`;
        }
            
        })
}

createTable();






// axios
//         .delete(`https://ironrest.herokuapp.com/deleteOne/antguts?first_name=Test1`)
//         .then((res)=>{
//             console.log(res.data)
//         })

// function createEntry () {
//   let tableElement = `<tr class="portfolios">
//   <td class="first-name">
//     <span>${res.data[3].first_name}</span>
//   </td>
//   <td class="last-name"><span>${res.data[3].last_name}</span></td>
//   <td class="link">
//     <span><a href="${res.data[3].website}">${res.data[3].first_name}'s Portfolio</a></span>
//   </td>
//   <td class="action">
//     <button class="btn btn-remove">Remove</button>
//   </td>
// </tr>`

// document.querySelector("#tableBody").innerHTML += element;
// }

// axios
//         .get(`https://ironrest.herokuapp.com/antguts`)
//         .then((res)=>{
//           for (let i=0; i<5 ; i++)
//             console.log(res.data[i].first_name)
//         })