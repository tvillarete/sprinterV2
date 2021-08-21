import { useCallback, useMemo, useState } from 'react';

import Button from '@atlaskit/button';
import ViewStackManager from 'components/generic/ViewStackManager';
import { SprintManagerViewStackContext } from 'components/SprintManager';
import { useSprintContext } from 'contexts/SprintContext';
import { useViewStackContext } from 'contexts/ViewStackContext';
import { Member } from 'types';

import Views from '../../views';
import { MemberList } from './components';

const ViewUI = ViewStackManager.Styled;

const strings = {
  title: `Sprint contributors`,
  buttons: {
    next: 'Next: Days in sprint',
    back: 'Back',
  },
};

const MemberEditorView = () => {
  const { sprintState, updateSprintValue } = useSprintContext();
  const [members, setMembers] = useState<Member[]>(sprintState.members);
  const { pushView } = useViewStackContext(SprintManagerViewStackContext);

  const isContinueButtonEnabled = useMemo(
    () => members.some((member) => member.isEnabled),
    [members]
  );

  const handleConfirm = useCallback(() => {
    updateSprintValue('members', members);

    pushView({
      title: 'Sprint contributors',
      component: Views.SprintLengthEditor,
    });
  }, [members, pushView, updateSprintValue]);

  return (
    <ViewUI.Container>
      <ViewUI.PageHeader>{strings.title}</ViewUI.PageHeader>
      <ViewUI.Body>
        <MemberList
          members={members}
          onChange={(updatedMembers) => setMembers(updatedMembers)}
        />
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

export default MemberEditorView;
