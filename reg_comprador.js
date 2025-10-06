function togglePassword() {
  const passwordInput = document.getElementById("password");
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
}

function toggleConfirmPassword() {
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const type = confirmPasswordInput.type === "password" ? "text" : "password";
  confirmPasswordInput.type = type;
}

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert(
        "Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente."
      );
      return;
    }

    alert("¡Registro exitoso! Bienvenido a CommerceTrust como comprador.");
  });
