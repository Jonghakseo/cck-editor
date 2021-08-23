import React, {useEffect} from "react";
import CustomEditor from "../components/CustomEditor";
import styled from "styled-components";

export interface Props {}

const MainPage: React.FC<Props> = (props: Props) => {
  return (
    <EditorWrapper>
      <CustomEditor />
    </EditorWrapper>
  );
};

MainPage.defaultProps = {};
export default MainPage;

const EditorWrapper = styled.section`
  width: 800px;
`;
