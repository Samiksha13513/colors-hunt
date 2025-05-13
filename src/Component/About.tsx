
import { Box, Typography, styled } from '@mui/material';

import CenterGif from '../assets/color-hunt-logo-animation.gif';

const CenteredContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', 
  padding: theme.spacing(4),
  fontFamily: 'sans-serif',
}));

const CenteredParagraph = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  color:'black',
  lineHeight: 1.6,
  width: '100%', 
  maxWidth: 800, 
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

const About = () => {
  return (
    <CenteredContainer>
      <Box
        component="img"
        src={CenterGif}
        alt="Centered GIF"
        sx={{ marginBottom: (theme) => theme.spacing(3), maxWidth: '30%', height: '150px' }}
      />
      <StyledHeading variant="h5">Color Hunt</StyledHeading>
      <CenteredParagraph variant="body1">
        Color Hunt is an open collection of beautiful color palettes, created by{' '}
        <a href="https://colorhunt.co/user/GalShir" target="_blank" rel="noopener noreferrer">
          Gal Shir
        </a>
        . Color Hunt started as a personal small project built to share trendy color combinations
        between a group of designer friends. The collection scaled up and is now being used daily as a
        handy resource by thousands of people all over the world. Color Hunt was created with the
        goal of celebrating the beauty of colors, and to serve as a go-to resource for color
        inspiration.
      </CenteredParagraph>

      <StyledHeading variant="h5">Who creates the color palettes?</StyledHeading>
      <CenteredParagraph variant="body1">
        You, the users, are the ones who create the palettes using Color Hunt’s palette creator.
        The collection is open, and everyone can create and submit their own color combination.
        That’s how we keep Color Hunt diverse, colorful, social and inspiring. Each palette is a
        public property and not owned by a specific creator, nor by Color Hunt.
      </CenteredParagraph>

      <StyledHeading variant="h5">Which palettes get featured?</StyledHeading>
      <CenteredParagraph variant="body1">
        Color Hunt is open, but is also curated. It means that all the palettes are hand-picked by
        Color Hunt’s curators. Each submission of a color palette is being reviewed to make sure
        it fits the collection’s goals. Each day, the very best submission is being picked up and
        will be visible on the homepage in the day after.
      </CenteredParagraph>

      <StyledHeading variant="h5">Made by Gal Shir</StyledHeading>
      <CenteredParagraph variant="body1">
        Color Hunt was founded by{' '}
        <a href="https://colorhunt.co/user/GalShir" target="_blank" rel="noopener noreferrer">
          Gal Shir
        </a>
        , designer and artist from Tel Aviv who is passioned about colors. Gal runs Color Hunt
        since 2015 with the goal of sharing that passion with the world, and provide a handy
        resource for designers and artists.
      </CenteredParagraph>

      <StyledHeading variant="h5">Partnerships/sponsorships</StyledHeading>
      <CenteredParagraph variant="body1">
        Reach out to <a href="mailto:hello@galshir.com">hello@galshir.com</a>
      </CenteredParagraph>
    </CenteredContainer>
  );
};

export default About;