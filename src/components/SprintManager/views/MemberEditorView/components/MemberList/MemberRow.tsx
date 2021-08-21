import { useCallback } from 'react';

import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Textfield from '@atlaskit/textfield';
import styled from '@emotion/styled';
import { Member } from 'types';

const RootContainer = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
`;

const StyledTextfield = styled(Textfield)`
  margin-right: 8px;
`;

interface Props {
  member: Member;
  onChange: (updatedMember: Member) => void;
  onDelete: (deletedMember: Member) => void;
}

const MemberRow = ({ member, onChange, onDelete }: Props) => {
  const { isEnabled } = member;

  const handleMemberChange = useCallback(
    (
      field: 'isEnabled' | 'name' | 'percentWorking' | 'vacationDays',
      value: string | number | boolean
    ) => {
      const updatedMember: Member = {
        ...member,
        [field]: value,
      };

      onChange(updatedMember);
    },
    [member, onChange]
  );

  return (
    <RootContainer>
      <Checkbox
        isChecked={isEnabled}
        size={'large'}
        onChange={(event) =>
          handleMemberChange('isEnabled', event.currentTarget.checked)
        }
        name="checkbox-default"
      />
      <StyledTextfield
        isDisabled={!isEnabled}
        width={200}
        placeholder={'Name'}
        value={member.name}
        onChange={(event) =>
          handleMemberChange('name', event.currentTarget.value)
        }
      />
      <StyledTextfield
        value={member.percentWorking}
        isDisabled={!isEnabled}
        width={100}
        type={'number'}
        min={0}
        max={100}
        onChange={(event) =>
          handleMemberChange('percentWorking', event.currentTarget.value)
        }
      />
      <StyledTextfield
        value={member.vacationDays}
        isDisabled={!isEnabled}
        width={100}
        type={'number'}
        min={0}
        placeholder="0"
        onChange={(event) =>
          handleMemberChange('vacationDays', event.currentTarget.value)
        }
      />
      <Button
        onClick={() => onDelete(member)}
        iconBefore={<CrossIcon label="Cross icon" size="small" />}
        appearance="subtle"
      />
    </RootContainer>
  );
};

export default MemberRow;
