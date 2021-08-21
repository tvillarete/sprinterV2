import { useCallback } from 'react';

import Button from '@atlaskit/button';
import { Label } from '@atlaskit/field-base';
import { colors } from '@atlaskit/theme';
import styled from '@emotion/styled';
import { Member } from 'types';
import * as uuid from 'uuid';

import MemberRow from './MemberRow';

const EmptyText = styled.h3`
  margin: 0 0 0.75rem;
  font-weight: 500;
  font-size: 1.25rem;
  color: ${colors.DN300};
`;

const ColumnContainer = styled.div`
  display: flex;
  align-items: center;
`;

const columns = [
  {
    title: '',
    width: 40,
  },
  {
    title: 'Name',
    width: 190,
  },
  {
    title: '% Working',
    width: 110,
  },
  {
    title: 'Days off',
    width: 100,
  },
];

interface Props {
  members: Member[];
  onChange: (members: Member[]) => void;
}

const MemberList = ({ members, onChange }: Props) => {
  const handleAddMember = useCallback(() => {
    const newMember: Member = {
      id: uuid.v4(),
      name: 'Member',
      percentWorking: 100,
      vacationDays: 0,
      isEnabled: true,
    };

    const updatedMembers = [...members, newMember];

    onChange(updatedMembers);
  }, [members, onChange]);

  const handleUpdateMember = useCallback(
    (updatedMember) => {
      const updatedMembers = members.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      );

      onChange(updatedMembers);
    },
    [members, onChange]
  );

  const handleDeleteMember = useCallback(
    (deletedMember) => {
      const updatedMembers = members.filter(
        (member) => member.id !== deletedMember.id
      );

      onChange(updatedMembers);
    },
    [members, onChange]
  );

  return (
    <div>
      {members.length === 0 && <EmptyText>No members</EmptyText>}
      {members.length > 0 && (
        <ColumnContainer>
          {columns.map((column) => (
            <div
              key={`member-column-${column.title}`}
              style={{ width: column.width }}
            >
              <Label label={column.title} />
            </div>
          ))}
        </ColumnContainer>
      )}
      {members.map((member, i) => (
        <MemberRow
          key={member.id}
          member={member}
          onChange={handleUpdateMember}
          onDelete={handleDeleteMember}
        />
      ))}
      <Button onClick={handleAddMember} style={{ marginTop: 12 }}>
        Add member
      </Button>
    </div>
  );
};

export default MemberList;
