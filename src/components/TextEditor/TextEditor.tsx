import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

interface TextEditorType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor = ({ value, setValue }: TextEditorType) => {
  return (
    <Container>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </Container>
  );
};

const Container = styled.div`
  height: 300px;
`;

export default TextEditor;
