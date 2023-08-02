<?php
require_once 'vendor/autoload.php'; // Asegúrate de tener instalada la librería de Azure Blob Storage
use MicrosoftAzure\Storage\Blob\BlobRestProxy;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Verificar si se recibió el archivo
  if (isset($_FILES["file"])) {
    $file = $_FILES["file"];
    $fileName = $file["name"];
    $fileTmpName = $file["tmp_name"];

    // Configurar la conexión con Azure Blob Storage
    $connectionString = "DefaultEndpointsProtocol=https;AccountName=martcomp;AccountKey=z1lvmbS4T4omvAqccdugz0Ih4zweztOiCtujfVmaZMmOnZjAUFBbx36CJuf/st57en0mwJCARDGz+ASt/SJkcQ==;EndpointSuffix=core.windows.net";
    $blobClient = BlobRestProxy::createBlobService($connectionString);
    $containerName = "martcomp"; // Cambia "documentos" por el nombre de tu contenedor

    // Subir el archivo al contenedor en Azure Blob Storage
    try {
      $blobClient->createBlockBlob($containerName, $fileName, fopen($fileTmpName, "r"));
      http_response_code(200);
    } catch (Exception $e) {
      http_response_code(500);
      echo "Error al subir el archivo a Azure Blob Storage: " . $e->getMessage();
    }
  } else {
    http_response_code(400);
    echo "No se recibió el archivo.";
  }
} else {
  http_response_code(405);
  echo "Método no permitido.";
}