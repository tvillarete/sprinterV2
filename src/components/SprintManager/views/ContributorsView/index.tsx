import { useCallback, useMemo, useState } from 'react';

import Button from '@atlaskit/button';
import ViewStackManager from 'components/generic/ViewStackManager';
import { SprintManagerViewStackContext } from 'components/SprintManager';
import { useSprintContext } from 'contexts/SprintContext';
import { useViewStackContext } from 'contexts/ViewStackContext';
import pluralize from 'pluralize';
import { Contributor } from 'types';

import Views from '../';
import { ContributorsList } from './components';

const ViewUI = ViewStackManager.Styled;

const strings = {
  title: `Sprint contributors`,
  excludes: `Excludes unchecked rows`,
  numContributors: (numContributors: number) =>
    `${numContributors} ${pluralize('contributor', numContributors)}`,
  buttons: {
    next: 'Next: Days in sprint',
    back: 'Previous',
  },
};

const ContributorsView = () => {
  const { sprintState, updateSprintValue } = useSprintContext();
  const [contributors, setContributors] = useState<Contributor[]>(
    sprintState.contributors
  );
  const { pushView } = useViewStackContext(SprintManagerViewStackContext);

  const numActiveContributors = useMemo(
    () =>
      contributors.reduce((count, curContributor) => {
        return (count += curContributor.isEnabled ? 1 : 0);
      }, 0),
    [contributors]
  );

  const totalPercentWorking = useMemo(
    () =>
      contributors.reduce((count, curContributor) => {
        return (count +=
          (curContributor.isEnabled ? curContributor.percentWorking : 0) /
          numActiveContributors);
      }, 0),
    [contributors, numActiveContributors]
  );

  const isContinueButtonEnabled = useMemo(
    () => contributors.some((contributor) => contributor.isEnabled),
    [contributors]
  );

  const handleConfirm = useCallback(() => {
    updateSprintValue('contributors', contributors);

    pushView({
      title: 'Sprint contributors',
      component: Views.SprintLengthEditor,
    });
  }, [contributors, pushView, updateSprintValue]);

  return (
    <ViewUI.Container>
      <ViewUI.PageHeader>{strings.title}</ViewUI.PageHeader>
      <ViewUI.Body>
        <ViewUI.FlexContainer>
          <ContributorsList
            contributors={contributors}
            onChange={(updatedContributors) =>
              setContributors(updatedContributors)
            }
          />
        </ViewUI.FlexContainer>
        <ViewUI.SummaryContainer>
          <ViewUI.SummaryText>
            {strings.numContributors(numActiveContributors)}
          </ViewUI.SummaryText>
          <ViewUI.SummarySubtext>
            {totalPercentWorking.toFixed(0)}% capacity. {strings.excludes}
          </ViewUI.SummarySubtext>
        </ViewUI.SummaryContainer>
      </ViewUI.Body>
      <ViewUI.Footer>
        <Button
          isDisabled={!isContinueButtonEnabled}
          appearance={'primary'}
          onClick={handleConfirm}
        >
          {strings.buttons.next}
        </Button>
      </ViewUI.Footer>
    </ViewUI.Container>
  );
};

export default ContributorsView;
