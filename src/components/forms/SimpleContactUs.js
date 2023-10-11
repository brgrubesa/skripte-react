import React, { useRef, useState} from "react";
import { Container, Content, FormContainer, TwoColumn, Column, InputContainer, Label, Input, TextArea,
  SubmitButton, SvgDotPattern1, HiddenInput,} from '../../styles/SimpleContactUsStyle.js';
import emailjs from '@emailjs/browser';
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { db, storage } from "../../firebase";
import config from "../../config";


export default () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        console.log(uniqueFileName);

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
        console.log(emailContent);
        // Send the email using emailjs.send
        await emailjs.send(
          config.emailjs.serviceId,
          config.emailjs.templateId,
          emailContent, // Pass the email content object
          config.emailjs.userId,
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
            <h2>Contribute with Study Materials or Get in Touch</h2>
            <form ref={form} onSubmit={sendEmail}>
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input">Your Name</Label>
                    <Input id="name-input" type="text" name="name" placeholder="E.g. John Doe" />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="email-input">Your Email Address</Label>
                    <Input id="email-input" type="email" name="email" placeholder="E.g. john@mail.com" />
                  </InputContainer>
                </Column>
                <Column>
                  <InputContainer tw="flex-1">
                    <Label htmlFor="name-input">Your Message</Label>
                    <TextArea id="message-input" name="message" placeholder="E.g. Details about your event" maxLength={72}/>
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="attachment-input">Attach File</Label>
                    <Input id="attachment-input" type="file" name="attachment" accept=".pdf,.doc,.docx"/>
                  </InputContainer>
                  {/* Hidden input to store the download URL */}
                  <HiddenInput type="text" name="attachment-url" />
                </Column>
              </TwoColumn>
              <SubmitButton type="submit" value="Submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Submit"}</SubmitButton>
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
  );
};
