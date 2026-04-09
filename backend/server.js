

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "naimul.dev95@gmail.com",
      pass: "ksjj hrzv tjrv jijz",
    },
  });

  try {
    // mail to you
    await transporter.sendMail({
      from: email,
      to: "naimul.dev95@gmail.com",
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    // thank you mail
    await transporter.sendMail({
      from: "naimul.dev95@gmail.com",
      to: email,
      subject: "Thank You!",
      text: `Hi ${name},\n\nThanks for contacting me. I will reply soon.\n\n- Naimul`,
    });

    res.json({ success: true });;
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }


