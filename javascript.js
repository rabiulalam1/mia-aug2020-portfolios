function portfolioSubmit() {
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

function gameSubmit() {
  let teamName = document.querySelector("#team-name-input").value;
  let gameName = document.querySelector("#game-name-input").value;
  let gUrl = document.querySelector("#gUrl").value;

  axios
    .post(`https://ironrest.herokuapp.com/mia-aug2020-webdevs-games`, {
      team_name: teamName,
      game_name: gameName,
      website: gUrl,
    })
    .then((res) => {
      createGameTable();
      location.reload();
    });
}

function remove(e) {
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

function gameRemove(e) {
  let deleteItem = e.target.parentElement.parentElement;
  let deleteName = deleteItem.querySelector(".team-name span").innerHTML;

  axios
    .delete(
      `https://ironrest.herokuapp.com/deleteOne/mia-aug2020-webdevs-games?team_name=` +
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
        let row = document.createElement("tr");
        row.classList.add("portfolios");
        row.innerHTML =
          `<td class="first-name">
                          <span id=` +
          i._id +
          `>` +
          i.first_name +
          `</span>
                        </td>
                        <td class="last-name">
                          <span>` +
          i.last_name +
          `</span>
                        </td>
                        <td class="link">
                          <span><a href="` +
          i.website +
          `">` +
          i.first_name +
          `'s Portfolio</a></span>
                        </td>
                        <td class="action">
                          <button class="btn btn-remove">Remove</button>
                          <button class="btn btn-edit">Edit</button>
                        </td>`;

        row.querySelector(".btn-remove").onclick = remove;
        row.querySelector(".btn-edit").onclick = edit;
        document.querySelector("#tablePortfolio").appendChild(row);
      }
    });
}

function createGameTable() {
  axios
    .get(`https://ironrest.herokuapp.com/mia-aug2020-webdevs-games`)
    .then((res) => {
      for (let i of res.data) {
        let row = document.createElement("tr");
        row.classList.add("game");
        row.innerHTML =
          `<td class="team-name">
                          <span id=` +
          i._id +
          `>` +
          i.team_name +
          `</span>
                        </td>
                        <td class="game-name">
                          <span>` +
          i.game_name +
          `</span>
                        </td>
                        <td class="gameLink">
                          <span><a href="` +
          i.website +
          `">` +
          i.game_name +
          `'s Website</a></span>
                        </td>
                        <td class="action">
                          <button class="btn btn-remove">Remove</button>
                          <button class="btn btn-edit">Edit</button>
                        </td>`;

        row.querySelector(".btn-remove").onclick = gameRemove;
        row.querySelector(".btn-edit").onclick = gameEdit;
        document.querySelector("#tableGame").appendChild(row);
      }
    });
}

createTable();
createGameTable();
let targetId = 0;

function edit(e) {
  let editItem = e.target.parentElement.parentElement;
  targetId = editItem.querySelector(".first-name span").getAttribute("id");

  let targetFirstName = editItem.querySelector(".first-name span").innerHTML;
  let targetLastName = editItem.querySelector(".last-name span").innerHTML;
  let targetUrl = editItem.querySelector(".link a").getAttribute("href");

  let editRow = document.createElement("tr");
  editRow.classList.add("portfolio-input");
  editRow.innerHTML = `<td>
                        <input id="update-first-name-input" type="text" name="${targetFirstName}" placeholder="${targetFirstName}" required="required" />
                      </td>
                      <td>
                          <input id="update-last-name-input" type="text" name="${targetLastName}" placeholder="${targetLastName}" required="required"/>
                      </td>
                      <td>
                          <input type="url" name="${targetUrl}" id="update-url" placeholder="${targetUrl}" pattern="https://.*" size="30" required="required">
                      </td>
                      <td>
                          <button id="update" class="btn btn-update" onclick="updateFunction()">Update</button>
                      </td>`;

  editItem.innerHTML = editRow.innerHTML;
}

function gameEdit(e) {
  let editItem = e.target.parentElement.parentElement;
  targetId = editItem.querySelector(".team-name span").getAttribute("id");

  let targetTeamName = editItem.querySelector(".team-name span").innerHTML;
  let targetGameName = editItem.querySelector(".game-name span").innerHTML;
  let targetUrl = editItem.querySelector(".gameLink a").getAttribute("href");

  let editRow = document.createElement("tr");
  editRow.classList.add("game-input");
  editRow.innerHTML = `<td>
                        <input id="update-team-name-input" type="text" name="${targetTeamName}" placeholder="${targetTeamName}" required="required" />
                      </td>
                      <td>
                          <input id="update-game-name-input" type="text" name="${targetGameName}" placeholder="${targetGameName}" required="required"/>
                      </td>
                      <td>
                          <input type="url" name="${targetUrl}" id="update-gUrl" placeholder="${targetUrl}" pattern="https://.*" size="30" required="required">
                      </td>
                      <td>
                          <button id="update" class="btn btn-update" onclick="updateGameFunction()">Update</button>
                      </td>`;

  editItem.innerHTML = editRow.innerHTML;
}

function updateFunction() {
  let firstName = document.querySelector("#update-first-name-input").value;
  let lastName = document.querySelector("#update-last-name-input").value;
  let url = document.querySelector("#update-url").value;

  if (!firstName) {
    firstName = document.querySelector("#update-first-name-input").name;
  }
  if (!lastName) {
    lastName = document.querySelector("#update-last-name-input").name;
  }
  if (!url) {
    url = document.querySelector("#update-url").name;
  }

  axios
    .put(`https://ironrest.herokuapp.com/mia-aug2020-webdevs/${targetId}`, {
      first_name: firstName,
      last_name: lastName,
      website: url,
    })
    .then((res) => {
      createTable();
      location.reload();
    });
}

function updateGameFunction() {
  let teamName = document.querySelector("#update-team-name-input").value;
  let gameName = document.querySelector("#update-game-name-input").value;
  let url = document.querySelector("#update-gUrl").value;

  if (!teamName) {
    teamName = document.querySelector("#update-team-name-input").name;
  }
  if (!gameName) {
    gameName = document.querySelector("#update-game-name-input").name;
  }
  if (!url) {
    url = document.querySelector("#update-gUrl").name;
  }

  axios
    .put(
      `https://ironrest.herokuapp.com/mia-aug2020-webdevs-games/${targetId}`,
      {
        team_name: teamName,
        game_name: gameName,
        website: url,
      }
    )
    .then((res) => {
      createGameTable();
      location.reload();
    });
}

// ****This codesnippet is to get data from database****
// axios
//         .get(`https://ironrest.herokuapp.com/mia-aug2020-webdevs`)
//         .then((res)=>{
//           for (let i of res.data)
//             console.log(i.first_name)
//         })
