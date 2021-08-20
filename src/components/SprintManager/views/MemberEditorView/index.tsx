import { useCallback, useMemo, useState } from 'react';

import Button from '@atlaskit/button';
import ViewStackManager from 'components/generic/ViewStackManager';
import { SprintManagerViewStackContext } from 'components/SprintManager';
import { useViewStackContext } from 'contexts/ViewStackContext';
import { Member } from 'types';

import { MemberList } from './components';

const ViewUI = ViewStackManager.Styled;

const MemberEditorView = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const { pushView, popView } = useViewStackContext(
    SprintManagerViewStackContext
  );

  const isContinueButtonEnabled = useMemo(
    () => members.some((member) => member.isEnabled),
    [members]
  );

  const handleConfirm = useCallback(() => {
    pushView({
      title: 'hi',
      component: MemberEditorView,
    });
  }, [pushView]);

  return (
    <ViewUI.Container>
      <ViewUI.PageHeader
        breadcrumbs={
          <ViewUI.BackButton onClick={popView}>Back</ViewUI.BackButton>
        }
      >
        Member Editor
      </ViewUI.PageHeader>
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
          Next: Days in sprint
        </Button>
      </ViewUI.Footer>
    </ViewUI.Container>
  );
};

export default MemberEditorView;
