$(document).ready(function() {
  $("#uploadForm").submit(function(e) {
    e.preventDefault();
    var formData = new FormData();
    var fileInput = document.getElementById("archivo");

    // Validación de archivos
    var tiposPermitidos = [".pdf", ".doc", ".docx"];
    var tamañoMaximoMB = 10; // Tamaño máximo permitido en MB

    if (fileInput.files.length > 0) {
      var archivo = fileInput.files[0];
      var tipoArchivo = '.' + archivo.name.split('.').pop().toLowerCase();

      if (!tiposPermitidos.includes(tipoArchivo)) {
        $("#message").text("Tipo de archivo no permitido. Los formatos permitidos son: " + tiposPermitidos.join(", "));
        fileInput.value = ""; // Limpiar el input de archivo
        return;
      }

      var tamañoMB = archivo.size / 1024 / 1024;
      if (tamañoMB > tamañoMaximoMB) {
        $("#message").text("El tamaño del archivo excede el límite permitido de " + tamañoMaximoMB + " MB.");
        fileInput.value = ""; // Limpiar el input de archivo
        return;
      }

      formData.append("file", archivo);

      // Si pasa la validación, realizar la carga del archivo
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
