let peopleInfo = JSON.parse(localStorage.getItem("peopleInfo"));
if (peopleInfo === null) {
  localStorage.setItem("peopleInfo", JSON.stringify([]));
  peopleInfo = JSON.parse(localStorage.getItem("peopleInfo"));
}
let searchValue = "";

const sortAz = document.getElementById("sortAz");
sortAz.addEventListener("click", function (a, b) {
  let peopleInfo = JSON.parse(localStorage.getItem("peopleInfo"));
  peopleInfo.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
  localStorage.setItem("peopleInfo", JSON.stringify(peopleInfo));
  drawGestList();
});

const btn = document.getElementById("submit");
btn.addEventListener("click", function () {
  console.log("hhhhhhhhhy");
  let peopleInfo = JSON.parse(localStorage.getItem("peopleInfo"));

  let adressBookRow = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    edit: false,
    favorite: false,
  };
  console.log(adressBookRow.length);
  peopleInfo.push(adressBookRow);
  localStorage.setItem("peopleInfo", JSON.stringify(peopleInfo));

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phoneNumber").value = "";

  drawGestList();
});

let drawGestList = () => {
  document.getElementById("lists").textContent = "";
  let peopleInfo = JSON.parse(localStorage.getItem("peopleInfo"));
  console.log(peopleInfo);
  peopleInfo
    .filter((value) => value.name.toLowerCase().includes(searchValue))
    .forEach((adressBookRow, i) => {
      let myContent = document.createElement("li");

      let favouriteButton = document.createElement("button");
      favouriteButton.className = "favourite-btn";
      favouriteButton.textContent = adressBookRow.favorite ? "❤️" : "🖤";
      favouriteButton.addEventListener("click", function () {
        peopleInfo[i].favorite = !peopleInfo[i].favorite;
        localStorage.setItem("peopleInfo", JSON.stringify(peopleInfo));
        drawGestList();
      });
      myContent.appendChild(favouriteButton);

      let spanName = document.createElement(adressBookRow.edit ? "input" : "span");
      spanName[adressBookRow.edit ? "value" : "textContent"] = `${
        adressBookRow.edit ? "" : "🤸🏻"
      }‍ ${adressBookRow.name}`;
      myContent.appendChild(spanName);

      let spanEmail = document.createElement(adressBookRow.edit ? "input" : "span");
      spanEmail[adressBookRow.edit ? "value" : "textContent"] = `${
        adressBookRow.edit ? "" : "📫"
      } ${adressBookRow.email}`;
      myContent.appendChild(spanEmail);

      let spanPhoneNumber = document.createElement(adressBookRow.edit ? "input" : "span");
      spanPhoneNumber[adressBookRow.edit ? "value" : "textContent"] = `${
        adressBookRow.edit ? "" : "☎️"
      } ${adressBookRow.phoneNumber}`;
      myContent.appendChild(spanPhoneNumber);

      let editButton = document.createElement("button");
      editButton.className = "style";
      editButton.textContent = adressBookRow.edit ? "Save" : "Edit";
      editButton.addEventListener("click", function () {
        if (peopleInfo[i].edit) {
          peopleInfo[i].name = spanName.value;
          peopleInfo[i].email = spanEmail.value;
          peopleInfo[i].phoneNumber = spanPhoneNumber.value;
        }
        peopleInfo[i].edit = !peopleInfo[i].edit;
        localStorage.setItem("peopleInfo", JSON.stringify(peopleInfo));
        drawGestList();
      });
      myContent.appendChild(editButton);

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "style";
      deleteButton.addEventListener("click", function () {
        peopleInfo.splice(i, 1);
        localStorage.setItem("peopleInfo", JSON.stringify(peopleInfo));
        drawGestList();
      });
      myContent.appendChild(deleteButton);

      document.getElementById("lists").appendChild(myContent);
    });
};
drawGestList();

const searchUsers = document.getElementById("searchUsers");
searchUsers.addEventListener("input", function (e) {
  searchValue = e.target.value.toLowerCase();
  drawGestList();
});
