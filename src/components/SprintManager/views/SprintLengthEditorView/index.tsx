import { useCallback, useMemo, useState } from 'react';

import Button from '@atlaskit/button';
import { DatePicker } from '@atlaskit/datetime-picker';
import { Field } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import styled from '@emotion/styled';
import ViewStackManager from 'components/generic/ViewStackManager';
import { SprintManagerViewStackContext } from 'components/SprintManager';
import { useSprintContext } from 'contexts/SprintContext';
import { useViewStackContext } from 'contexts/ViewStackContext';
import { DateTime } from 'luxon';
import pluralize from 'pluralize';
import { getNumBusinessDays } from 'utils/date';

const ViewUI = ViewStackManager.Styled;

const DateContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  > div:first-of-type {
    margin-right: 1rem !important;
  }
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
    previous: 'Previous',
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
      <ViewUI.PageHeader>{strings.title}</ViewUI.PageHeader>
      <ViewUI.Body>
        <DateContainer>
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
        </DateContainer>
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
        <ViewUI.SummaryContainer>
          <ViewUI.SummaryText>
            {strings.dayCount(numBusinessDaysInSprint - numHolidays)}
          </ViewUI.SummaryText>
          <ViewUI.SummarySubtext>
            {strings.excludesWeekends}
          </ViewUI.SummarySubtext>
        </ViewUI.SummaryContainer>
      </ViewUI.Body>
      <ViewUI.Footer>
        <Button onClick={popView}>{strings.buttons.previous}</Button>
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
