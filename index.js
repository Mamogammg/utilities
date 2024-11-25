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

// Puerto dinámico para Vercel
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
