//отправка формы из модального окна в header

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formModal");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();
    document.getElementById("messageModal").innerHTML = "";
    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add("_sending");

      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove("_sending");
      } else {
        document.getElementById("messageModal").innerHTML +=
          "Ошибка отправки.<br>";
        form.classList.remove("_sending");
      }
    } else {
      document.getElementById("messageModal").innerHTML +=
        "Пожалуйста, заполните обязательные поля.<br>";
    }
  }

  //валидация формы из модального окна в header

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._reqModal");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      if (input.classList.contains("_phone")) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.classList.remove("_error");
  }

  function phoneTest(input) {
    return !/^[\d\-\(\) ]+$/.test(input.value);
  }
});
