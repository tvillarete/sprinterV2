import Button from '@atlaskit/button';
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large';
import PageHeader from '@atlaskit/page-header';
import { colors } from '@atlaskit/theme';
import styled from '@emotion/styled';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'footer';
  height: 100%;
  padding: 16px;
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
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
`;

const FlexContainer = styled.div`
  flex: 1;
  padding-bottom: 1rem;
  overflow: auto;
`;

const Footer = styled.div`
  padding-top: 1rem;
  display: flex;
  justify-content: flex-end;

  > :not(:last-of-type) {
    margin-right: 8px !important;
  }
`;

const SummaryText = styled.h3`
  margin: 0;
  text-align: right;
  color: ${colors.N800};
  font-size: 24px;
  font-weight: 700;
`;

const SummarySubtext = styled(SummaryText)`
  font-weight: 500;
  font-size: 14px;
  color: ${colors.N400A};
`;

const SummaryContainer = styled.div`
  margin-top: auto;
  padding: 1rem 0 0.5rem;
  border-top: 1px solid ${colors.N30};
`;

const Styled = {
  Container,
  PageHeader: StyledPageHeader,
  BackButton,
  Body,
  FlexContainer,
  SummaryText,
  SummarySubtext,
  SummaryContainer,
  Footer,
};

export default Styled;
