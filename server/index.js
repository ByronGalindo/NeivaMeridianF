const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const accountSid = 'AC382ad2adb1db0e645b38d662b493da91';
const authToken = '40ad668d38f63dd7078e9d1358a9eba7'; 
const client = require('twilio')(accountSid, authToken);


const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(express.static('public'));


app.post('/enviar-wp', (req, res) => {
  const { mensaje } = req.body;
  client.messages
    .create({
      body: mensaje,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+573213746609'
    })
    // Función para enviar un mensaje
    .then(message => {
      console.log(message.sid);
      res.json({ success: true, message: 'Mensaje enviado exitosamente' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ success: false, message: 'Ocurrió un error al enviar el mensaje' });
    });
});


const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});


