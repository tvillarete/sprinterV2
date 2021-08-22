import { useCallback } from 'react';

import Button from '@atlaskit/button';
import { Label } from '@atlaskit/field-base';
import { colors } from '@atlaskit/theme';
import styled from '@emotion/styled';
import { Contributor } from 'types';
import * as uuid from 'uuid';

import ContributorRow from './ContributorRow';

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
    title: '% working',
    width: 110,
  },
  {
    title: 'Days off',
    width: 100,
  },
];

const strings = {
  buttons: {
    add: 'Add contributor',
  },
};

interface Props {
  contributors: Contributor[];
  onChange: (contributors: Contributor[]) => void;
}

const ContributorsList = ({ contributors, onChange }: Props) => {
  const handleAddContributor = useCallback(() => {
    const newContributor: Contributor = {
      id: uuid.v4(),
      name: 'Contributor',
      percentWorking: 100,
      vacationDays: 0,
      isEnabled: true,
    };

    const updatedContributors = [...contributors, newContributor];

    onChange(updatedContributors);
  }, [contributors, onChange]);

  const handleUpdateContributor = useCallback(
    (updatedContributor) => {
      const updatedContributors = contributors.map((contributor) =>
        contributor.id === updatedContributor.id
          ? updatedContributor
          : contributor
      );

      onChange(updatedContributors);
    },
    [contributors, onChange]
  );

  const handleDeleteContributor = useCallback(
    (deletedContributor) => {
      const updatedContributors = contributors.filter(
        (contributor) => contributor.id !== deletedContributor.id
      );

      onChange(updatedContributors);
    },
    [contributors, onChange]
  );

  return (
    <div>
      {contributors.length === 0 && <EmptyText>No contributors</EmptyText>}
      {contributors.length > 0 && (
        <ColumnContainer>
          {columns.map((column) => (
            <div
              key={`contributor-column-${column.title}`}
              style={{ width: column.width }}
            >
              <Label label={column.title} />
            </div>
          ))}
        </ColumnContainer>
      )}
      {contributors.map((contributor, i) => (
        <ContributorRow
          key={contributor.id}
          contributor={contributor}
          onChange={handleUpdateContributor}
          onDelete={handleDeleteContributor}
        />
      ))}
      <Button onClick={handleAddContributor} style={{ marginTop: 12 }}>
        {strings.buttons.add}
      </Button>
    </div>
  );
};

export default ContributorsList;
