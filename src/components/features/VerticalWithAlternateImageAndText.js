import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import useFirebaseStorage from '../UseFirebaseStorage';
import { db } from '../../firebase';
import { collection, getDocs, onSnapshot, query, orderBy, addDoc, serverTimestamp, where } from 'firebase/firestore';


const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Content = tw.div`mt-16`;

const Card = styled.div(props => [
  tw`mt-24 md:flex justify-center items-center`,
  props.reversed ? tw`flex-row-reverse` : "flex-row"
]);
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8`
]);
const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
const Subtitle = tw.div`font-bold tracking-wide text-secondary-100`;
const Title = tw.h4`text-3xl font-bold text-gray-900`;
const Description = tw.p`mt-2 text-sm leading-loose`;
const Link = tw.a`inline-block mt-4 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern2 = tw(
  SvgDotPatternIcon
)`absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern3 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern4 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-x-20 rotate-90 -translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;

export default (featuresRef) => {

  const {
    setFileUpload,
    uploadFile,
    downloadFile,
  } = useFirebaseStorage();

  const [data, setData] = useState([]);

  useEffect(() => {
    // Real-time listener for Firestore collection
    const docRef = collection(db, 'documents');

    // addDoc(docRef, {
    //   imageSrc:
    //     "https://www.corpnet.com/wp-content/uploads/2022/01/Legal-Document.jpg",
    //   subtitle: "Paid",
    //   title: "Loachella, NYC",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //   url: 'images/slika.jpeg',
    //   timestamp: new Date()
    // })
    const date = new Date();
const formattedDate = date.toLocaleString();

console.log(formattedDate);

const q = query(docRef, orderBy('subtitle','asc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newData = [];
      querySnapshot.docs.forEach((doc) => {
        newData.push( {...doc.data(), id: doc.id});
      });
      // console.log(newData)
      setData(newData);
    });

    return () => {
      // Unsubscribe the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <Container>
      <SingleColumn>
        <HeadingInfoContainer>
          <HeadingTitle>Popular Materials</HeadingTitle>
          <HeadingDescription>
            Here are some of the popular Pharmacy Learning Materials.
          </HeadingDescription>
        </HeadingInfoContainer>

        <Content>
          {data.map((item, i) => (
            <Card key={i} reversed={i % 2 === 1}>
              <Image imageSrc={item.imageSrc} />
              <Details>
                <Subtitle>{item.subtitle}</Subtitle>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
                <Link onClick={() => downloadFile(item.url, item.url.split('/').pop())}>Download Document</Link>
              </Details>
            </Card>
          ))}
        </Content>
      </SingleColumn>
      <SvgDotPattern1 />
      <SvgDotPattern2 />
      <SvgDotPattern3 />
      <SvgDotPattern4 />
    </Container>
  );
};


// const [data, setData] = useState([]);

// useEffect(() => {
//   // Fetch data from Firestore when the component mounts
//   const fetchData = async () => {
//     const docRef = collection(db, 'documents'); // Replace with your Firestore collection name
//     const querySnapshot = await getDocs(docRef);
//     const newData = [];
    
//     querySnapshot.forEach((doc) => {
//       newData.push(doc.data());
//     });
    
//     setData(newData);
//   };

//   fetchData();
// }, []);