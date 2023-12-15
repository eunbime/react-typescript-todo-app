import React, { FormEvent, useState } from "react";
import { Container } from "../../styles/styles";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks/redux";
import { toggleAddTodoModal } from "../../store/modules/modalSlice";
import { setTodoTitle } from "../../store/modules/todosSlice";

const AddForm = () => {
  const dispatch = useAppDispatch();

  const [text, setText] = useState("");

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const openModalHandler = () => {
    dispatch(toggleAddTodoModal(true));
    dispatch(setTodoTitle(text));
    setText("");
  };

  return (
    <Container>
      <FormWrapper
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          type="text"
          placeholder="Add todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={openModalHandler}>+</button>
      </FormWrapper>
    </Container>
  );
};

const FormWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  max-width: 650px;
  margin: 0 auto;

  input {
    font-size: large;
    padding: 0.5rem 1.25rem;
    border-radius: 1rem;
    width: 90%;
    outline: none;
    border: none;
    background-color: #eee;
  }

  button {
    font-size: large;
    width: 3rem;
    border-radius: 0.35rem;
    margin-left: 1rem;
  }
`;

export default AddForm;
