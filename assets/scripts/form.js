document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const submitBtn = document.getElementById("submitBtn");

  submitBtn.addEventListener("click", formSend);

  async function formSend(e) {
    e.preventDefault();
    document.getElementById("message").innerHTML = "";
    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add("_sending");

      try {
        let response = await fetch("sendmail.php", {
          method: "POST",
          body: formData,
        });

        console.log("Response received");

        if (response.ok) {
          let result = await response.json();
          console.log("Result:", result);
          alert(result.message);
          form.reset();
        } else {
          document.getElementById("message").innerHTML +=
            "Ошибка отправки.<br>";
        }
      } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById("message").innerHTML += "Ошибка отправки.<br>";
      } finally {
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
    return !/^[\d\-\(\) ]+$/.test(input.value);
  }
});
