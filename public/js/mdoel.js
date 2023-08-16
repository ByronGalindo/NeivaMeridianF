document.addEventListener("DOMContentLoaded", function() {
    const Contactanos = document.getElementById("Contactanos")

    Contactanos.addEventListener("submit", async function (e) { 
        e.preventDefault()

        const Nombre = document.getElementById("NombreRemitente").value;
        const EmailRemitente = document.getElementById("Remitente").value;
        const NumeroRemitente = document.getElementById("NumeroRemitente").value;
        const campoSelect = document.getElementById('NumeroPersonas');
        const NumeroPersonas = campoSelect.options[campoSelect.selectedIndex].value;
        const Mensaje = document.getElementById("Mensaje").value;
        
        const Cabecera = "Presentación del Cliente \n\n"+"Hola, mi nombre es " + Nombre.toString() + " mi  correo es " +
        EmailRemitente.toString() + " mi número de contacto es " + NumeroRemitente.toString() +
        " y me encuentro nteresado en una reserva para " + NumeroPersonas.toString() + " persona(s)";

        const Asunto =  "Informacion/ Reservas hotel";

        const Cuerpo = Cabecera + "\n\n" + "Mensaje del Cliente: \n\n" + Mensaje.toString();

        const mensaje = Asunto + "\n\n" + Cuerpo;
    
        const respuesta2 = await sendWP(mensaje);
        
        try {
          const respuesta2 = await sendWP(mensaje);
    
          if (respuesta2.success) {
            alert('¡Mensaje enviado exitosamente!');
          } else {
            alert('Ocurrió un error al enviar el mensaje');
          }
        } catch (error) {
          console.error(error);
          alert('Ocurrió un error al enviar el mensaje');
        }
      });
});




async function sendWP(mensaje){
  const url = '/enviar-wp';
  const data = {
    mensaje
  };
  try{
  const respuesta2 = await fetch(url, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return respuesta2.json();
} catch (error) {
  console.error(error);
  throw new Error('Error al enviar el mensaje de WhatsApp');
}
}

