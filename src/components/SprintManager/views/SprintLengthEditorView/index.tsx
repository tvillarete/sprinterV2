import { useCallback, useMemo, useState } from 'react';

import Button from '@atlaskit/button';
import { DatePicker } from '@atlaskit/datetime-picker';
import { Field } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import { colors } from '@atlaskit/theme';
import styled from '@emotion/styled';
import ViewStackManager from 'components/generic/ViewStackManager';
import { SprintManagerViewStackContext } from 'components/SprintManager';
import { useSprintContext } from 'contexts/SprintContext';
import { useViewStackContext } from 'contexts/ViewStackContext';
import { DateTime } from 'luxon';
import pluralize from 'pluralize';
import { getNumBusinessDays } from 'utils/date';

const ViewUI = ViewStackManager.Styled;

const DayCountText = styled.h2`
  margin: 1rem 0 0;
  padding-top: 1rem;
  text-align: right;
  border-top: 1px solid ${colors.N30};
  color: ${colors.N800};
  font-size: 24px;
  font-weight: 700;
`;

const DayCountSubtext = styled(DayCountText)`
  margin: 0;
  border-top: none;
  padding-top: 0;
  font-weight: 500;
  font-size: 14px;
  color: ${colors.N400A};
`;

const weekendFilter = (date: string) => {
  const dayOfWeek = DateTime.fromISO(date).weekday;

  return dayOfWeek === 6 || dayOfWeek === 7;
};

const strings = {
  title: `Sprint length`,
  dayCount: (numDays: number) =>
    `${numDays} working ${pluralize('days', numDays)}`,
  excludesWeekends: `Excludes weekends & holidays`,
  buttons: {
    next: 'Next: Something',
    back: 'Sprint contributors',
  },
};

const SprintLengthEditorView = () => {
  const { sprintState, updateSprintValue } = useSprintContext();
  const [startDate, setStartDate] = useState(sprintState.startDate.toISODate());
  const [endDate, setEndDate] = useState(sprintState.endDate.toISODate());
  const [numHolidays, setNumHolidays] = useState(sprintState.numHolidays);
  const { pushView, popView } = useViewStackContext(
    SprintManagerViewStackContext
  );

  const numBusinessDaysInSprint = useMemo(() => {
    return getNumBusinessDays(startDate, endDate);
  }, [endDate, startDate]);

  const isNextButtonEnabled = numBusinessDaysInSprint - numHolidays > 0;

  const handleConfirm = useCallback(() => {
    updateSprintValue('startDate', DateTime.fromISO(startDate));
    updateSprintValue('endDate', DateTime.fromISO(endDate));
    updateSprintValue('numHolidays', numHolidays);

    pushView({
      title: 'hi',
      component: SprintLengthEditorView,
    });
  }, [endDate, numHolidays, pushView, startDate, updateSprintValue]);

  return (
    <ViewUI.Container>
      <ViewUI.PageHeader
        breadcrumbs={
          <ViewUI.BackButton onClick={popView}>
            {strings.buttons.back}
          </ViewUI.BackButton>
        }
      >
        {strings.title}
      </ViewUI.PageHeader>
      <ViewUI.Body>
        <Field name="startDate" label="Start date">
          {() => (
            <DatePicker
              onChange={(date) => setStartDate(date)}
              value={startDate}
              minDate={DateTime.now().toString()}
              maxDate={endDate}
              disabledDateFilter={weekendFilter}
            />
          )}
        </Field>
        <Field name="endDate" label="End date">
          {() => (
            <DatePicker
              value={endDate}
              minDate={startDate}
              disabledDateFilter={weekendFilter}
              onChange={(date) => setEndDate(date)}
            />
          )}
        </Field>
        <Field name="holidays" label="# of holidays">
          {() => (
            <Textfield
              placeholder="0"
              type="number"
              width="100"
              min="0"
              max={numBusinessDaysInSprint}
              value={numHolidays}
              onChange={(event) =>
                setNumHolidays(parseInt(event.currentTarget.value, 10) || 0)
              }
            />
          )}
        </Field>
        <DayCountText>
          {strings.dayCount(numBusinessDaysInSprint - numHolidays)}
        </DayCountText>
        <DayCountSubtext>{strings.excludesWeekends}</DayCountSubtext>
      </ViewUI.Body>
      <ViewUI.Footer>
        <Button
          isDisabled={!isNextButtonEnabled}
          appearance={'primary'}
          onClick={handleConfirm}
        >
          {strings.buttons.next}
        </Button>
      </ViewUI.Footer>
    </ViewUI.Container>
  );
};

export default SprintLengthEditorView;
