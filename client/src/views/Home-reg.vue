<template>
  <body>
    <div class="row" id="rowContainer">
      <div class="col-md-4" id="parentContainer">
        <form id="registrationForm">
          <h2 class="text-center mb-5">Create an account</h2>
          <div class="form-floating mb-4">
            <input type="text" class="form-control form-control-lg" id="fName" placeholder="a" required>
            <label>First Name</label>
          </div>

          <div class="form-floating mb-4">
            <input type="text" class="form-control form-control-lg" id="lName" placeholder="b" required>
            <label>Last Name</label>
          </div>

          <div class="form-floating mb-4">
            <input type="email" class="form-control form-control-lg" id="email" placeholder="deeznuts@mail.com"
                   required>
            <label>Email</label>
          </div>

          <div class="form-floating mb-4">
            <input type="password" class="form-control form-control-lg" id="pass" placeholder="b" required>
            <label>Password</label>
          </div>

          <div class="form-floating mb-4">
            <input type="password" class="form-control form-control-lg" id="confPass" placeholder="b" required>
            <label>Confirm Password</label>
          </div>

          <div class="form-check d-flex mb-2">
            <input class="form-check-input me-2" type="checkbox" value="" id="tosCheckbox"/>
            <label class="form-check-label">I accept the <a href="#!" class="text-body"><u>Terms of Service</u></a>
            </label>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 150px; height: 50px">Sing Up</button>

          <p class="text-center text-muted mt-3 mb-2">Already have an account?
            <a href="#!" class="fw-bold text-body"> <u>Login here</u></a>
          </p>
        </form>
      </div>
    </div>
  </body>
</template>

<script>
// @ is an alias to /src
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  let forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()
</script>

<style>

#rowContainer {
  height: 100%;
  padding: 10px;
}

#registrationForm {
  width: auto;
  vertical-align: auto;
}

Html, body {
  height: 100vh;
  align-items: center;
}

#parentContainer {
  vertical-align: middle;
  display: table-cell;
  background-color: greenyellow;
  width: 600px;
  padding: 50px;
  height: 700px;
  margin: auto;
  border-radius: 14px;
}

#button1 {
  background-color: cornflowerblue;
  border-color: cornflowerblue;
}
</style>
