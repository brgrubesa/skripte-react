import React, { useRef, useState} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {ReactComponent as SvgDotPatternIcon} from "../../images/dot-pattern.svg"
import emailjs from '@emailjs/browser';
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { db, storage } from "../../firebase";
import config from "../../config";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`

const HiddenInput = tw.input`hidden`;

export default () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Access the file input directly
    const fileInput = form.current.elements["attachment-input"];
    const file = fileInput.files[0];

    // Create a reference to the Firebase Storage bucket
    const uniqueFileName = `${file.name}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const storageRef = ref(storage, `attachments/${uniqueFileName}`);

    // const formData = new FormData(form.current);
    try {
      // Upload the file to Firebase Storage if a file is selected
      if (file) {
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
  
        // Send the email using emailjs.send
        await emailjs.send(
          config.emailjs.serviceId,
          config.emailjs.templateId,
          emailContent, // Pass the email content object
          config.emailjs.userId,
        );
  
        console.log("Email sent successfully.");
        e.target.reset();
      }
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
