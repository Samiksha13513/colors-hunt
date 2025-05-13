
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
  width: '70%', 
  maxWidth: 800
}));

const Services = () => {
  return (
    <CenteredContainer>
      <StyledHeading variant="h5">Terms of Service</StyledHeading>
      <StyledParagraph variant="body1">
        Welcome to Color Hunt. By accessing or using our website, you agree to be bound by these
        Terms of Service. If you do not agree to these terms, you may not access or use our
        website.
      </StyledParagraph>

      <StyledHeading variant="h5">Limitation of Liability</StyledHeading>
      <StyledParagraph variant="body1">
        We make no warranties or representations about the accuracy or completeness of the content
        on our website, and we are not liable for any damages arising from your use of our website
        or the content on it. In no event shall our company be liable for any damages whatsoever
        arising out of or in connection with the use or inability to use our website or the content
        on it.
      </StyledParagraph>

      <StyledHeading variant="h5">Indemnification</StyledHeading>
      <StyledParagraph variant="body1">
        You agree to indemnify and hold our company, its officers, directors, employees, agents,
        and affiliates, harmless from any and all claims, damages, expenses, and liabilities,
        including reasonable attorneys' fees, arising out of or in connection with your use of our
        website or your violation of these Terms of Service.
      </StyledParagraph>

      <StyledHeading variant="h5">Termination</StyledHeading>
      <StyledParagraph variant="body1">
        We may terminate or suspend your access to our website, without prior notice or liability,
        for any reason whatsoever, including without limitation if you breach these Terms of
        Service.
      </StyledParagraph>

      <StyledHeading variant="h5">Changes to Terms of Service</StyledHeading>
      <StyledParagraph variant="body1">
        We reserve the right, at our sole discretion, to modify or replace these Terms of Service
        at any time. Your continued use of our website after any such changes constitutes your
        acceptance of the new Terms of Service.
      </StyledParagraph>
    </CenteredContainer>
  );
};

export default Services;