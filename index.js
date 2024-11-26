const express = require('express');
const app = express();

// Endpoint para generar texto
app.get('/txt', (req, res) => {
  const text = decodeURIComponent(req.query.t || 'Texto por defecto');
  
  // Configura los headers para mostrar un archivo de texto
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', 'inline');

  // Envía el texto como respuesta
  res.send(text);
});

// Endpoint para procesar y mostrar el `data:URI`
app.get('/data', (req, res) => {
  const dataUri = req.query.d;

  if (!dataUri) {
    return res.status(400).send('Falta el parámetro "d"');
  }

  // Extraer el MIME type y la base64 data
  const matches = dataUri.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) {
    return res.status(400).send('Formato de data:URI inválido');
  }

  const mimeType = matches[1];
  const base64Data = matches[2];

  // Decodificar los datos binarios
  const binaryData = Buffer.from(base64Data, 'base64');

  // Configurar encabezados y enviar el archivo binario
  res.setHeader('Content-Type', mimeType);
  res.setHeader('Content-Disposition', 'inline');
  res.send(binaryData);
});

// Puerto dinámico para Vercel
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
