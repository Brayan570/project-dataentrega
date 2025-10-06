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

document.getElementById("fileUpload").addEventListener("change", function (e) {
  const fileName = e.target.files[0]?.name;
  if (fileName) {
    const label = document.querySelector(".file-upload");
    label.style.borderColor = "#10b981";
    label.querySelector(".file-upload-text").innerHTML = `
                    <strong>Archivo seleccionado:</strong><br>${fileName}
                `;
  }
});

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

    if (password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    alert(
      "¡Registro exitoso! Tu cuenta será verificada en 24-48 horas. Te notificaremos por correo cuando puedas comenzar a vender."
    );
  });
