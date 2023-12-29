import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Link } from 'react-scroll';

import LogoImage from "../../images/logo.png";
import { ReactComponent as FacebookIcon } from "../../images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "../../images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "../../images/youtube-icon.svg";

const Container = tw.div`relative bg-gray-200 -mx-8 -mb-8 px-8`;
const FiveColumns = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20 flex flex-wrap justify-between`;

const Column = tw.div`md:w-1/5`;
const WideColumn = tw(Column)`text-center md:text-left w-full md:w-2/5 mb-10 md:mb-0`;

const ColumnHeading = tw.h5`font-bold`;

const LinkList = tw.ul`mt-4 text-sm font-medium`;
const LinkListItem = tw.li`mt-3`;
const LinkElement = tw.a`border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition duration-300`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-xl font-black text-primary-500`;

const CompanyDescription = tw.p`mt-4 max-w-xs font-medium text-sm mx-auto md:mx-0 md:mr-4 `;

const SocialLinksContainer = tw.div`mt-4 `;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block p-2 rounded-full bg-gray-700 text-gray-100 hover:bg-gray-900 transition duration-300 mr-4`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

export default ({scrollToFeatures, scrollToBlog, scrollToTestimonial, scrollToContact}) => {
  return (
    <Container>
      <FiveColumns>
        <WideColumn>
          <LogoContainer>
            <LogoImg src={LogoImage} />
            <LogoText>Ivine Skripte.</LogoText>
          </LogoContainer>
          <CompanyDescription>
            Ova stranica je mjesto gdje će te uskoro moći naći sve skripte za Farmaceutsko-biokemijski fakultet.
          </CompanyDescription>
          <SocialLinksContainer>
            <SocialLink /*href="https://facebook.com"*/>
              <FacebookIcon />
            </SocialLink>
            <SocialLink>
              <TwitterIcon />
            </SocialLink>
            <SocialLink>
              <YoutubeIcon />
            </SocialLink>
          </SocialLinksContainer>
        </WideColumn>
        <Column>
          <ColumnHeading>Brzi Linkovi</ColumnHeading>
          <LinkList>
            <LinkListItem>
            <LinkElement>
              <Link to="features" spy={true} smooth={true} duration={500}>Skripte</Link>
            </LinkElement>
            </LinkListItem>
            <LinkListItem>
            <LinkElement>
              <Link to="blog" spy={true} smooth={true} duration={500}>Portal</Link>
            </LinkElement>
            </LinkListItem>
             {/* <LinkListItem>
              <LinkElement href="#">Support</LinkElement>
            </LinkListItem> */}
            <LinkListItem>
            <LinkElement>
              <Link to="contact" spy={true} smooth={true} duration={500}>Kontakt</Link>
            </LinkElement>
            </LinkListItem>
          </LinkList>
        </Column>
        <Column>
          {/* <ColumnHeading>Product</ColumnHeading>
          <LinkList>
            <LinkListItem>
              <LinkElement href="#">Log In</LinkElement>
            </LinkListItem>
            <LinkListItem>
              <LinkElement href="#">Personal</LinkElement>
            </LinkListItem>
            <LinkListItem>
              <LinkElement href="#">Business</LinkElement>
            </LinkListItem>
            <LinkListItem>
              <LinkElement href="#">Team</LinkElement>
            </LinkListItem>
          </LinkList> */}
        </Column>
        <Column>
          {/* <ColumnHeading>Legal</ColumnHeading>
          <LinkList>
            <LinkListItem>
              <LinkElement href="#">GDPR</LinkElement>
            </LinkListItem>
            <LinkListItem>
              <LinkElement href="#">Privacy Policy</LinkElement>
            </LinkListItem>
            <LinkListItem>
              <LinkElement href="#">Terms of Service</LinkElement>
            </LinkListItem>
            <LinkListItem>
              <LinkElement href="#">Disclaimer</LinkElement>
            </LinkListItem>
          </LinkList> */}
        </Column>
      </FiveColumns>
    </Container>
  );
};
