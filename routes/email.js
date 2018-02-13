const express = require('express');
const router = express.Router();
const validator = require('validator');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'cesarodriguez4@gmail.com',
        clientId: '899561628849-djspuphvri013rsio5rsofs8rji5673c.apps.googleusercontent.com',
        clientSecret: 'tCtoPOb7lGhzf-AUj0ejKvhZ',
        accessToken: 'ya29.GltgBWWrJsDtneZpIyLUXssta_KqtjIEyQx79cvCPiCHmD7Gc47eD-l5qScY-5mpaFdcDEjXujgZNgtUh25T7fYFYBcSI8w24Vivx3P4W4azsCcI-d9pBufdaG9s',
        refreshToken: '1/gmblXMlDIVgjjOdscO1uctJr94jKc4FUuXBB9vn85ZelKEil6Fq7_lTyv3yutYy7',
        expires: 3600
    }
});

transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Servidor listo para enviar correos electronicos');
   }
});

router.post('/', (req, res) => {
  if (validator.isEmail(req.body.email)) {
    const email1 = {
    from: 'cesarodriguez4@gmail.com',
    to: 'cesarodriguez4@gmail.com',
    subject: 'Tienes un nuevo mensaje de cesarjs.xyz!',
    text: `
    De: ${req.body.email},
    Nombre: ${req.body.name},
    Mensaje: ${req.body.message}.
    `};

    const email2 = {
    from: 'cesarodriguez4@gmail.com',
    to: req.body.email,
    subject: 'Cesar will be in touch with you soon!',
    text: `Thanks for writing, this is an automatic response 
    to let you know that your message was delivered successfully to Cesar. In a few hours he will be 
    responding you back. Have a great day.`
   };

    transporter.sendMail(email1, error=> {
      if(error) {
        res.send(error);
      }
    });
    transporter.sendMail(email2, error=> {
      if(error) {
        res.send(error);
      }
    });

    res.send({success: 'Email was delivered successfully'});

  } else {
    res.send({error: 'Email is required'});
  }
});

module.exports = router;
