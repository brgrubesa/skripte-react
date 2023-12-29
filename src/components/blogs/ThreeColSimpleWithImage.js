import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-3.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const ThreeColumn = tw.div`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap`;
const Column = tw.div`mt-24 lg:w-1/3`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Card = tw.div`lg:mx-4 xl:mx-8 max-w-sm lg:max-w-xs`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-cover bg-center h-80 lg:h-64 rounded`
]);
const Category = tw.div`mt-4 text-secondary-100 font-bold text-sm`;
const Title = tw.h4`mt-2 leading-relaxed font-bold text-lg`;
const Link = tw.a`inline-block mt-2 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`-z-10 absolute bottom-0 right-0 w-48 h-48 transform translate-x-40 -translate-y-8 opacity-25`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`-z-10 absolute top-0 left-0 w-48 h-48 transform -translate-x-32 translate-y-full opacity-25`;

export default () => {
  const blogPosts = [
    {
      imageSrc:
        "https://img.freepik.com/free-photo/biotechnology-specialist-laboratory-conducting-experiments_23-2150468696.jpg?size=626&ext=jpg&ga=GA1.1.1100786455.1670434427&semt=ais0",
      category: "Vaš Izvor za Medicinska Istraživanja",
      title: "PubMed je sveobuhvatna baza znanstvenih članaka i studija, pružajući bogatstvo informacija o različitim medicinskim temama.",
      url: "https://pubmed.ncbi.nlm.nih.gov/"
    },
    {
      imageSrc:
        "https://img.freepik.com/free-photo/man-drawing-graph_1134-212.jpg?size=626&ext=jpg&ga=GA1.1.1100786455.1670434427&semt=ais",
      category: "Pristup Znanstvenim Radovima",
      title: "Sci-Hub pruža pristup znanstvenim člancima i istraživačkim radovima, čineći akademsko znanje široko dostupnim.",
      url: "https://www.sci-hub.se/"
    },
    {
      imageSrc:
        "https://img.freepik.com/premium-photo/financial-statistics-medical-medication-bottle-pills-with-graphs-charts_175682-10829.jpg?size=626&ext=jpg&ga=GA1.1.1100786455.1670434427&semt=ais",
      category: "Resursi za Nutricionizam i Suplemente",
      title: "Examine.com je vrijedan izvor informacija utemeljenih na dokazima o prehrani, suplementima i temama vezanim uz zdravlje.",
      url: "https://examine.com/"
    }
  ];
  return (
    <Container>
      <Content>
        <HeadingInfoContainer>
          <HeadingTitle>Farmaceutski Portal</HeadingTitle>
          <HeadingDescription> Vaša ulaznica u najnovija farmaceutska istraživanja, akademske materijale i znanstveno znanje.</HeadingDescription>
        </HeadingInfoContainer>
        <ThreeColumn>
          {blogPosts.map((post, index) => (
            <Column key={index}>
              <Card>
                <Image imageSrc={post.imageSrc} />
                <Category>{post.category}</Category>
                <Title>{post.title}</Title>
                <Link href={post.url} target="_blank">Posjeti stranicu</Link>
              </Card>
            </Column>
          ))}
        </ThreeColumn>
      </Content>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
