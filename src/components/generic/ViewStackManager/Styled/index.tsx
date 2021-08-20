import Button from '@atlaskit/button';
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large';
import PageHeader from '@atlaskit/page-header';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'footer';
  height: 100%;
  padding: 8px;
  background: white;
`;

const StyledPageHeader = styled(PageHeader)``;

const BackButton = styled(Button)`
  padding: 0 !important;
`;

BackButton.defaultProps = {
  iconBefore: <ChevronLeftLargeIcon label="Back arrow" />,
  appearance: 'link',
};

const Body = styled.div`
  flex: 1;
  overflow: auto;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Styled = {
  Container,
  PageHeader: StyledPageHeader,
  BackButton,
  Body,
  Footer,
};

export default Styled;
