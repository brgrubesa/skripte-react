import React, { useState, useEffect } from "react";
import { Container, SingleColumn, HeadingInfoContainer, HeadingDescription, Content, Card, Image, Details,
  Subtitle, Title, Description, Link, SvgDotPattern1, SvgDotPattern2, SvgDotPattern3, SvgDotPattern4, } from "../../styles/DocumentsPageStyles";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import useFirebaseStorage from '../UseFirebaseStorage';
import { db } from '../../firebase';
import { collection, getDocs, onSnapshot, query, orderBy, addDoc, serverTimestamp, where } from 'firebase/firestore';


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
//     const date = new Date();
// const formattedDate = date.toLocaleString();

// console.log(formattedDate);

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
          <HeadingTitle>Skripte za Farmaceutsko-biokemijski fakultet - sve na jednom mjestu!</HeadingTitle>
          <HeadingDescription>
          “Nobody ever figures out what life is all about, and it doesn't matter. Explore the world. Nearly everything is really interesting if you go into it deeply enough.” - Richard P. Feynman
          </HeadingDescription>
        </HeadingInfoContainer>

        <Content>
          {data.map((item, i) => (
            <Card key={i} reversed={i % 2 === 1}>
              <Image imageSrc={item.imageSrc} />
              <Details>
                {/* <Subtitle>{item.subtitle}</Subtitle> */}
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
                <Link onClick={() => downloadFile(item.url, item.url.split('/').pop())}>Preuzmi skriptu</Link>
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
