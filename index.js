export default function handler(req, res) {
  const { t } = req.query; // Obtén el parámetro 't' de la URL.
  
  // Convierte 't' en texto plano para el archivo TXT.
  const text = decodeURIComponent(t || 'Texto por defecto');

  // Configura los headers para enviar un archivo de texto.
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', 'attachment; filename="archivo.txt"');

  // Envía el contenido.
  res.status(200).send(text);
}
