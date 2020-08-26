function submitFunction() {
  let firstName = document.querySelector("#first-name-input").value;
  let lasttName = document.querySelector("#last-name-input").value;
  let url = document.querySelector("#url").value;

  axios
    .post(`https://ironrest.herokuapp.com/antguts`, {
      first_name: firstName,
      last_name: lasttName,
      website: url,
    })
    .then((res) => {
      createTable();
      location.reload();
    });
}

function createTable() {
  axios.get(`https://ironrest.herokuapp.com/antguts`).then((res) => {
    for (let i of res.data) {
      document.querySelector("#tableBody").innerHTML +=
        `<tr class="portfolios">
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
        `s Portfolio</a></span>
            </td>
            <td class="action">
              <button class="btn btn-remove" onclick="removeFunction()">Remove</button>
            </td>
          </tr>`;
    }
  });
}

createTable();

function removeFunction() {
  let removeButtons = document.querySelectorAll(".btn-remove");

  for (let i = 0; i < removeButtons.length; i++) {
    let eachButton = removeButtons[i];
    eachButton.onclick = function deleteData(e) {
      let deleteItem = e.target.parentElement.parentElement;
      let deleteName = deleteItem.querySelector(".first-name span").innerHTML;

      axios
        .delete(
          `https://ironrest.herokuapp.com/deleteOne/antguts?first_name=` +
            deleteName
        )
        .then((res) => {
          location.reload();
        });
    };
  }
}

// axios
//         .get(`https://ironrest.herokuapp.com/antguts`)
//         .then((res)=>{
//           for (let i=0; i<5 ; i++)
//             console.log(res.data[i].first_name)
//         })
