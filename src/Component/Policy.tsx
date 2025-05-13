
import { Box, Typography, styled } from '@mui/material';

const CenteredContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', 
  padding: theme.spacing(4),
  fontFamily: 'sans-serif',
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

const StyledParagraph = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  color:'black',
  lineHeight: 1.6,
  width: '100%', 
  maxWidth: 800
}));

const Policy = () => {
  return (
    <CenteredContainer>
      <StyledHeading variant="h5">Privacy Policy</StyledHeading>
      <StyledParagraph variant="body1">
        This is Color Hunt's Privacy Policy for www.colorhunt.co. This document explains Color
        Hunt policies for the collection, use, and disclosure of personal information on
        www.colorhunt.co.This privacy policy deals with personally-identifiable information
        (referred to as "data" below) that may be collected by this site.
      </StyledParagraph>

      <StyledHeading variant="h5">Collection of data</StyledHeading>
      <StyledParagraph variant="body1">
        As on many websites, the site editor may automatically receive general information that
        is contained in server log files, such as your IP address, and cookie information.
        Information about how advertising may be served on this site (if it is indeed the site
        editor's policy to display advertising) is set forth below.
      </StyledParagraph>

      <StyledHeading variant="h5">Use of data </StyledHeading>
      <StyledParagraph variant="body1">
        Data may be used to customize and improve your user experience on this site. Efforts will
        be made to prevent your data from being made available to third parties unless
        <br />
        provided for otherwise in this Privacy Policy;
        <br />
        your consent is obtained, such as when you choose to opt-in or opt-out for the sharing
        of data;
        <br />
        a service provided on our site requires interaction with a third party, or is provided
        by a third party, such as an application service provider; (iv) pursuant to legal action
        or law enforcement;
        <br />
        it is found that your use of this site violates the site editor's policy, terms of
        service, or other usage guidelines, or if it is deemed reasonably necessary by the site
        editor to protect the site editor's legal rights and/or property; or
        <br />
        this site is purchased by a third party, in which case that third party will be able to
        use the data in the same manner as set forth in this policy.
      </StyledParagraph>
      <StyledParagraph variant="body1">
        In the event you choose to use links displayed on this website to visit other websites,
        you are advised to read the privacy policies published on those sites. Color Hunt uses
        third-party advertising companies to serve ads when you visit our website. These companies
        may use information (not including your name, address, email address, or telephone
        number) about your visits to this and other websites in order to provide advertisements
        about goods and services of interest to you.
      </StyledParagraph>

      <StyledHeading variant="h5">Cookies</StyledHeading>
      <StyledParagraph variant="body1">
        Like many websites, this website sets and uses cookies to enhance your user experience —
        to remember your personal settings, for instance. Advertisements may display on this
        website and, if so, may set and access cookies on your computer; such cookies are subject
        to the privacy policy of the parties providing the advertisement. However, the parties
        providing the advertising do not have access to this site's cookies. These parties
        usually use non-personally-identifiable or anonymous codes to obtain information about
        your visits to this site.
      </StyledParagraph>

      <StyledParagraph variant="body1">
        Please note that turning off advertising cookies won’t mean that you are not served any
        advertising, merely that it will not be tailored to your interests.
      </StyledParagraph>
    </CenteredContainer>
  );
};

export default Policy;