import React, { useRef, useState} from "react";
import { Container, Content, FormContainer, TwoColumn, Column, InputContainer, Label, Input, TextArea,
  SubmitButton, SvgDotPattern1, HiddenInput,} from '../../styles/SimpleContactUsStyle.js';
import emailjs from '@emailjs/browser';
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { db, storage } from "../../firebase";
import config from "../../config";


export default () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const name = form.current.name.value;
    const email = form.current.email.value;
    const message = form.current.message.value;

     // Validate that name, email, and message are not empty
     if (!name || !email || !message) {
      setValidationError("Molimo Vas ispunite prva tri polja.");
      setIsSubmitting(false);
      return;
    } else {
      setValidationError(null);
    }

    // Access the file input directly
    const fileInput = form.current.elements["attachment-input"];
    const file = fileInput.files[0];

    // const formData = new FormData(form.current);
    try {
      // Upload the file to Firebase Storage if a file is selected
      if (file) {
        // Create a reference to the Firebase Storage bucket
        const uniqueFileName = `${file.name.replace(/\.[^/.]+$/, "")}_${Date.now()}.pdf`;
        const storageRef = ref(storage, `attachments/${uniqueFileName}`);
        // console.log(uniqueFileName);

        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, file);
  
        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
  
        // Build the email content with the download URL
        const emailContent = {
          name: form.current.name.value,
          email: form.current.email.value,
          message: form.current.message.value,
          attachment_url: downloadURL,
        };
        //console.log(emailContent);
        // Send the email using emailjs.send
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          emailContent, // Pass the email content object
          process.env.REACT_APP_EMAILJS_USER_ID,
        );
  
        console.log("Email sent successfully (WITH attachment).");
      } else {
          // No file selected, send email without uploading
        const emailContent = {
          name: form.current.name.value,
          email: form.current.email.value,
          message: form.current.message.value,
          attachment_url: null, // You can set this to null or an empty string as needed
        };

        // Send the email using emailjs.send
        await emailjs.send(
          config.emailjs.serviceId,
          config.emailjs.templateId,
          emailContent,
          config.emailjs.userId
        );

        console.log("Email sent successfully (without attachment).");
      }
      e.target.reset();
    } catch (error) {
      console.error("Error:", error);
    } finally{
      setIsSubmitting(false);
    }
    
  };


  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Pošalji skriptu ili recenziju</h2>
            {validationError && <div style={{ color: "red" }}>{validationError}</div>}
            <form ref={form} onSubmit={sendEmail}>
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input">Tvoje ime</Label>
                    <Input id="name-input" type="text" name="name" placeholder="Marko Zdravko" />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="email-input">Tvoj Email</Label>
                    <Input id="email-input" type="email" name="email" placeholder="marko@mail.com" />
                  </InputContainer>
                </Column>
                <Column>
                  <InputContainer tw="flex-1">
                    <Label htmlFor="name-input">Tvoja poruka</Label>
                    <TextArea id="message-input" name="message" placeholder="Detalji" maxLength={72}/>
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="attachment-input">Priložite dokument (.pdf) ako želite</Label>
                    <Input id="attachment-input" type="file" name="attachment" accept=".pdf,.doc,.docx"/>
                  </InputContainer>
                  {/* Hidden input to store the download URL */}
                  <HiddenInput type="text" name="attachment-url" />
                </Column>
              </TwoColumn>
              <SubmitButton type="submit" value="Submit" disabled={isSubmitting}>{isSubmitting ? "Šalje se..." : "Pošalji"}</SubmitButton>
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
  );
};
