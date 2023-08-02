$(document).ready(function() {
  $("#uploadForm").submit(function(e) {
    e.preventDefault();
    var formData = new FormData();
    var fileInput = document.getElementById("fileInput");

    if (fileInput.files.length > 0) {
      formData.append("file", fileInput.files[0]);

      $.ajax({
        type: "POST",
        url: "../upload.php", // Ajusta esta URL para que apunte correctamente a tu archivo "upload.php" en el servidor.
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
          $("#message").text("Documento subido exitosamente.");
          // Aquí puedes agregar más lógica o mostrar una notificación al usuario
        },
        error: function(error) {
          $("#message").text("Error al subir el documento.");
          console.log(error);
        }
      });
    } else {
      $("#message").text("Por favor, selecciona un documento para subir.");
    }
  });
});