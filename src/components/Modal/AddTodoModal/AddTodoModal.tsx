import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { ModalContainer } from "../Modal.styles";
import dayjs from "dayjs";
import { Todo } from "../../../types/todo";
import { __addTodos } from "../../../store/modules/todosSlice";
import TextEditor from "../../TextEditor/TextEditor";
import { toggleAddTodoModal } from "../../../store/modules/modalSlice";
import { v4 } from "uuid";

const AddTodoModal = () => {
  const dispatch = useAppDispatch();
  const { viewAddTodoModal } = useAppSelector((state) => state.modalSlice);
  const { editTitle } = useAppSelector((state) => state.todosSlice);

  const [title, setTitle] = useState(editTitle || "");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(editTitle);
  }, [editTitle]);

  const addTodoHandler = () => {
    if (!title || !content) {
      alert("제목 또는 내용을 입력해주세요");
      return;
    }

    const date = dayjs().format("DD/MM/YY h:mm A");

    let todo: Todo = {
      id: v4() as string,
      title,
      date,
      content,
      isDone: false,
      createdAt: new Date().getTime(),
    };

    dispatch(__addTodos(todo));
    dispatch(toggleAddTodoModal(false));
    setTitle("");
    setContent("");
  };

  const cancleHandler = () => {
    const answer = window.confirm("할일 추가를 취소하시겠습니까?");

    if (!answer) return;

    dispatch(toggleAddTodoModal(false));
    setTitle("");
    setContent("");
  };

  return (
    <>
      {viewAddTodoModal && (
        <ModalContainer>
          <ModalBox>
            <TopWrapper>
              <h1>Add todo</h1>
              <span onClick={cancleHandler}>X</span>
            </TopWrapper>
            <input
              type="text"
              value={title}
              placeholder="제목"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>
              <TextEditor value={content} setValue={setContent} />
            </div>

            <AddButton onClick={addTodoHandler}>추가하기</AddButton>
          </ModalBox>
        </ModalContainer>
      )}
    </>
  );
};

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: clamp(250px, 95%, 750px);
  background-color: #fff;

  input {
    padding: 0.5rem;
    font-size: medium;
    margin-bottom: 1rem;
    outline: none;
  }
`;

const TopWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  font-size: large;
  font-weight: 600;
  margin-bottom: 0.35rem;
  padding-bottom: 1rem;
  font-size: x-large;
  font-weight: 700;

  span {
    cursor: pointer;
  }
`;

const AddButton = styled.button`
  padding: 0.5rem;
  background-color: transparent;
  font-size: medium;
  font-weight: 700;
`;

export default AddTodoModal;
