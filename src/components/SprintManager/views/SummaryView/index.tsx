import { useCallback, useMemo, useState } from 'react';

import Button from '@atlaskit/button';
import { colors } from '@atlaskit/theme';
import styled from '@emotion/styled';
import ViewStackManager from 'components/generic/ViewStackManager';
import { SprintManagerViewStackContext } from 'components/SprintManager';
import { useSprintContext } from 'contexts/SprintContext';
import { useViewStackContext } from 'contexts/ViewStackContext';
import { getRolloverPoints } from 'utils/sprint';

const ViewUI = ViewStackManager.Styled;

const TextContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${colors.DN800};
`;

const Text = styled.p`
  margin: 0 0.5rem 0 0;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.DN60};
`;

const BoldText = styled.p`
  margin: 0;
  font-size: 22px;
  font-weight: 500;
  color: ${colors.DN10};
`;

const strings = {
  title: `Sprint summary`,
  buttons: {
    confirm: 'Confirm sprint',
    previous: 'Previous',
  },
};

const SummaryView = () => {
  const { sprintState, updateSprintValue } = useSprintContext();
  const { pushView, popView } = useViewStackContext(
    SprintManagerViewStackContext
  );
  const {
    totalWorkingDays,
    numPointsCompletedLastSprint,
    numPointsCommittedLastSprint,
    pointsPerWorkingDayLastSprint,
  } = sprintState;
  const rolloverPoints = getRolloverPoints(
    numPointsCommittedLastSprint,
    numPointsCompletedLastSprint
  );

  const handleConfirm = useCallback(() => {
    // pushView({
    //   title: 'hi',
    //   component: SprintLengthEditorView,
    // });
  }, []);

  return (
    <ViewUI.Container>
      <ViewUI.PageHeader>{strings.title}</ViewUI.PageHeader>
      <ViewUI.Body>
        <TextContainer>
          <Text>Total working days</Text>
          <BoldText>{totalWorkingDays} days</BoldText>
        </TextContainer>
        <TextContainer>
          <Text>Velocity per person each day last sprint</Text>
          <BoldText>{pointsPerWorkingDayLastSprint} points</BoldText>
        </TextContainer>
        <TextContainer>
          <Text>Recommended points this sprint</Text>
          <BoldText>{numPointsCompletedLastSprint} points</BoldText>
        </TextContainer>
        <TextContainer>
          <Text>New points after rollover</Text>
          <BoldText>
            {numPointsCompletedLastSprint - rolloverPoints} points
          </BoldText>
        </TextContainer>
      </ViewUI.Body>
      <ViewUI.Footer>
        <Button onClick={popView}>{strings.buttons.previous}</Button>
        <Button appearance={'primary'} onClick={handleConfirm}>
          {strings.buttons.confirm}
        </Button>
      </ViewUI.Footer>
    </ViewUI.Container>
  );
};

export default SummaryView;
