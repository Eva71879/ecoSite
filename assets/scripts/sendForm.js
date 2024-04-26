// function serializeForm(formNode) {
//   console.log(formNode.elements);
// }

// function handleFormSubmit(event) {
//   event.preventDefault();
//   serializeForm(applicantForm);
// }

// const applicantForm = document.getElementById("form");
// applicantForm.addEventListener("submit", handleFormSubmit);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();
    document.getElementById("message").innerHTML = "";
    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append("image", formImage.files[0]);

    if (error === 0) {
      form.classList.add("_sending");

      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = "";
        form.reset();
        form.classList.remove("_sending");
      } else {
        document.getElementById("message").innerHTML += "Ошибка отправки.<br>";
        form.classList.remove("_sending");
      }
    } else {
      document.getElementById("message").innerHTML +=
        "Пожалуйста, заполните обязательные поля.<br>";
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains("_phone")) {
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

  function emailTest(input) {
    return !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      input.value
    );
  }

  function phoneTest(input) {
    return !/(?<=^|\s|>|\;|\:|\))(?:\+|7|8|9|\()[\d\-\(\) ]{8,}\d/.test(
      input.value
    );
  }
});
