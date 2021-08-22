import { useCallback } from 'react';

import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Textfield from '@atlaskit/textfield';
import styled from '@emotion/styled';
import { Contributor } from 'types';

const RootContainer = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
`;

const StyledTextfield = styled(Textfield)`
  margin-right: 8px;
`;

interface Props {
  contributor: Contributor;
  onChange: (updatedContributor: Contributor) => void;
  onDelete: (deletedContributor: Contributor) => void;
}

const ContributorRow = ({ contributor, onChange, onDelete }: Props) => {
  const { isEnabled } = contributor;

  const handleContributorChange = useCallback(
    (
      field: 'isEnabled' | 'name' | 'percentWorking' | 'vacationDays',
      value: string | number | boolean
    ) => {
      const updatedContributor: Contributor = {
        ...contributor,
        [field]: value,
      };

      onChange(updatedContributor);
    },
    [contributor, onChange]
  );

  return (
    <RootContainer>
      <Checkbox
        isChecked={isEnabled}
        size={'large'}
        onChange={(event) =>
          handleContributorChange('isEnabled', event.currentTarget.checked)
        }
        name="checkbox-default"
      />
      <StyledTextfield
        isDisabled={!isEnabled}
        width={200}
        placeholder={'Name'}
        value={contributor.name}
        onChange={(event) =>
          handleContributorChange('name', event.currentTarget.value)
        }
      />
      <StyledTextfield
        value={contributor.percentWorking}
        isDisabled={!isEnabled}
        width={100}
        type={'number'}
        min={0}
        max={100}
        onChange={(event) =>
          handleContributorChange('percentWorking', event.currentTarget.value)
        }
      />
      <StyledTextfield
        value={contributor.vacationDays}
        isDisabled={!isEnabled}
        width={100}
        type={'number'}
        min={0}
        placeholder="0"
        onChange={(event) =>
          handleContributorChange('vacationDays', event.currentTarget.value)
        }
      />
      <Button
        onClick={() => onDelete(contributor)}
        iconBefore={<CrossIcon label="Cross icon" size="small" />}
        appearance="subtle"
      />
    </RootContainer>
  );
};

export default ContributorRow;
