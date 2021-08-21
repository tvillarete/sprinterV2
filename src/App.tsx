import styled from '@emotion/styled';
import SprintManager from 'components/SprintManager';

const RootContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlowContainer = styled.div`
  height: 80vh;
  width: 100vw;
  max-width: 500px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  padding: 8px;
  background: white;
`;

function App() {
  return (
    <RootContainer>
      <FlowContainer>
        <SprintManager />
      </FlowContainer>
    </RootContainer>
  );
}

export default App;
