var data = [
    { name: "Fuad", surname: "Süleymanlı", id: 1, isHere: 1 },
    { name: "Cavid", surname: "Ağayev", id: 2, isHere: 0 },
    { name: "Mehran", surname: "Kəbirtəlai", id: 3, isHere: 0 },
    { name: "Kamal", surname: "Musayev", id: 4, isHere: 0 },
    { name: "Kənan", surname: "Həsənzadə", id: 5, isHere: 1 },
    { name: "Zalı", surname: "Nəcəfov", id: 6, isHere: 0 },
    { name: "Aygül", surname: "Abbaszadə", id: 7, isHere: 1 },
    { name: "Bənövşə", surname: "Məhərrəmova", id: 8, isHere: 1 },
    { name: "Tərlan", surname: "Zeynalov", id: 9, isHere: 0 },
  ];

  var mainData;
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(data));
  } else {
    mainData = JSON.parse(localStorage.getItem("users"));
    // mainData = JSON.parse(mainData)
  }

  // console.log( mainData)

  let tbody = document.querySelector("#tb");

  function renderData() {
    tbody.innerHTML = "";
    for (let i = 0; i < mainData.length; i++) {
      tbody.innerHTML += `<tr>
          <td>${i + 1}</td>
          <td>${mainData[i].name}</td>
          <td>${mainData[i].surname}</td>
          <td>${mainData[i].isHere ? "Buradadır" : "Yoxdur"}</td>
          <td class="del-td">
          <img src="./img/del.png" alt="Sil" title="Sil" style="width:30px;height:30px;" class="default-del" onclick=del(${i}) />
          <img src="./img/delFirst.png" alt="Sil"  style="width:30px;height:30px;" title="Sil" class="del" />
          
          
          </td>
        </tr>`;
    }
  }

  renderData();

  document
    .querySelector('input[type="submit"]')
    .addEventListener("click", function () {
      let newFirstName = document.querySelectorAll("input")[0].value;
      let newSurName = document.querySelectorAll("input")[1].value;
      let newStatus = document.querySelector("select").value;

      if (newFirstName && newSurName && newStatus) {
        mainData.push({
          name: newFirstName,
          surname: newSurName,
          isHere: +newStatus,
          id: mainData.length + 1,
        });

        swal(
          "Uğurlu əməliyyat",
          `Siyahıya  ${newFirstName + " " + newSurName} əlavə olundu`,
          "success"
        );
        renderData();

        localStorage.setItem("users", JSON.stringify(mainData));

        document.querySelector("#for-scrool").scrollTop =
          document.querySelector("#for-scrool").scrollHeight;

        document.querySelectorAll("input")[0].value = "";
        document.querySelectorAll("input")[1].value = "";
        document.querySelector("select").value = "1";
      } else {
        swal(
          "Uğursuz əməliyyat ",
          "Xahiş olunur bütün xanaları doldurun",
          "error"
        );
      }
    });

  function del(i) {
    swal({
      title: "Silmək istədiyinizdən əminsinizmi?",
      text: `Bəli seçsəniz "${
        mainData[i].name + " " + mainData[i].surname
      }" silinəcək!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mainData.splice(i, 1);
        localStorage.setItem("users", JSON.stringify(mainData));
        renderData();

        swal(` "${mainData[i].name + " " + mainData[i].surname}" silindi`, {
          icon: "success",
        });
      } else {
        swal(`"${mainData[i].name + " " + mainData[i].surname}" Silinmədi!`);
      }
    });
  }