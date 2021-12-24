import { useCallback, useState } from 'react';

import Button from '@atlaskit/button';
import { Field } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import { colors } from '@atlaskit/theme';
import styled from '@emotion/styled';
import ViewStackManager from 'components/generic/ViewStackManager';
import { SprintManagerViewStackContext } from 'components/SprintManager';
import { useSprintContext } from 'contexts/SprintContext';
import { useViewStackContext } from 'contexts/ViewStackContext';
import { getRolloverPoints } from 'utils/sprint';

import Views from '../';

const ViewUI = ViewStackManager.Styled;

const FieldContainer = styled.div`
  display: flex;

  > div:not(:last-of-type) {
    margin-right: 8px;
  }
`;

const InstructionText = styled.p`
  margin: 0 0 1rem;
  color: ${colors.DN30};
`;

const strings = {
  title: `First time setup`,
  labels: {
    pointsCommitted: 'Points committed',
    pointsCompleted: 'Points completed',
  },
  buttons: {
    next: 'Next: Sprint summary',
    previous: 'Previous',
  },
};

const FirstTimeSetupView = () => {
  const { sprintState, updateSprintValue } = useSprintContext();
  const { totalWorkingDays } = sprintState;
  const [numPointsLastSprint, setNumPointsLastSprint] = useState(0);
  const [numPointsCompleted, setNumPointsCompleted] = useState(0);
  const { pushView, popView } = useViewStackContext(
    SprintManagerViewStackContext
  );

  const pointsPerWorkingDay = numPointsCompleted / totalWorkingDays;
  const percentComplete = (numPointsCompleted / numPointsLastSprint) * 100 || 0;
  const rolloverPoints = getRolloverPoints(
    numPointsLastSprint,
    numPointsCompleted
  );

  const handleConfirm = useCallback(() => {
    updateSprintValue('numPointsCommittedLastSprint', numPointsLastSprint);
    updateSprintValue('numPointsCompletedLastSprint', numPointsCompleted);
    updateSprintValue('pointsPerWorkingDayLastSprint', pointsPerWorkingDay);
    updateSprintValue('totalWorkingDays', totalWorkingDays);

    pushView({
      title: 'Next sprint summary',
      component: Views.Summary,
    });
  }, [
    numPointsCompleted,
    numPointsLastSprint,
    pointsPerWorkingDay,
    pushView,
    totalWorkingDays,
    updateSprintValue,
  ]);

  const textfieldProps = {
    placeholder: '0',
    type: 'number',
    width: '150',
    min: '0',
  };

  return (
    <ViewUI.Container>
      <ViewUI.PageHeader>{strings.title}</ViewUI.PageHeader>
      <ViewUI.Body>
        <InstructionText>
          This data will be used to calculate future sprint capacity. Input the
          story point info from your <em>previous</em> sprint below
        </InstructionText>
        <FieldContainer>
          <Field
            name="points-last-sprint"
            label={strings.labels.pointsCommitted}
          >
            {() => (
              <Textfield
                {...textfieldProps}
                value={numPointsLastSprint}
                onChange={(event) =>
                  setNumPointsLastSprint(
                    parseInt(event.currentTarget.value, 10) || 0
                  )
                }
              />
            )}
          </Field>
          <Field name="points-completed" label={strings.labels.pointsCompleted}>
            {() => (
              <Textfield
                {...textfieldProps}
                value={numPointsCompleted}
                onChange={(event) =>
                  setNumPointsCompleted(
                    parseInt(event.currentTarget.value, 10) || 0
                  )
                }
              />
            )}
          </Field>
        </FieldContainer>
        <ViewUI.SummaryContainer>
          <ViewUI.SummaryText>
            {pointsPerWorkingDay.toFixed(2)} Points / person each day
          </ViewUI.SummaryText>
          <ViewUI.SummarySubtext>
            <b>{totalWorkingDays.toFixed(0)}</b> total working days
          </ViewUI.SummarySubtext>
          <ViewUI.SummarySubtext>
            <b>{percentComplete.toFixed(0)}%</b> complete
          </ViewUI.SummarySubtext>
          <ViewUI.SummarySubtext>
            <b>{rolloverPoints}</b> rollover points
          </ViewUI.SummarySubtext>
        </ViewUI.SummaryContainer>
      </ViewUI.Body>
      <ViewUI.Footer>
        <Button onClick={popView}>{strings.buttons.previous}</Button>
        <Button appearance={'primary'} onClick={handleConfirm}>
          {strings.buttons.next}
        </Button>
      </ViewUI.Footer>
    </ViewUI.Container>
  );
};

export default FirstTimeSetupView;
