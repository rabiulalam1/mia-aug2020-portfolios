function submitFunction() {
  let firstName = document.querySelector("#first-name-input").value;
  let lasttName = document.querySelector("#last-name-input").value;
  let url = document.querySelector("#url").value;

  axios
    .post(`https://ironrest.herokuapp.com/mia-aug2020-webdevs`, {
      first_name: firstName,
      last_name: lasttName,
      website: url,
    })
    .then((res) => {
      createTable();
      location.reload();
    });
}

function remove(e) {
  console.log("hello", e);
  let deleteItem = e.target.parentElement.parentElement;
  let deleteName = deleteItem.querySelector(".first-name span").innerHTML;

  axios
    .delete(
      `https://ironrest.herokuapp.com/deleteOne/mia-aug2020-webdevs?first_name=` +
        deleteName
    )
    .then((res) => {
      location.reload();
    });
}

function createTable() {
  axios
    .get(`https://ironrest.herokuapp.com/mia-aug2020-webdevs`)
    .then((res) => {
      for (let i of res.data) {
        let row = document.createElement('tr')
        row.classList.add('portfolios')
        row.innerHTML = `
        <td class="first-name">
          <span>` +
      i.first_name +
      `</span>
        </td>
        <td class="last-name"><span>` +
      i.last_name +
      `</span></td>
        <td class="link">
          <span><a href="` +
      i.website +
      `">` +
      i.first_name +
      `'s Portfolio</a></span>
        </td>
        <td class="action">
          <button class="btn btn-remove">Remove</button>
        </td>` 

        row.querySelector('.btn-remove').onclick = remove;
        document.querySelector("#tableBody").appendChild(row);
    
      }
    });
}

createTable();

// ****This codesnippet is to get data from database****
// axios
//         .get(`https://ironrest.herokuapp.com/mia-aug2020-webdevs`)
//         .then((res)=>{
//           for (let i of res.data)
//             console.log(i.first_name)
//         })
