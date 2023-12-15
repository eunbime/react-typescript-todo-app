import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { ModalContainer } from "../Modal.styles";
import dayjs from "dayjs";
import { Todo } from "../../../types/todo";
import TextEditor from "../../TextEditor/TextEditor";
import { toggleAddTodoModal } from "../../../store/modules/modalSlice";
import { v4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../../../api/todos";

const AddTodoModal: React.FC = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Response, unknown, string, void>(addTodo, {
    onSuccess: (data: Todo[]) => {
      console.log(data);
      queryClient.invalidateQueries("todos");
    },
    onError: (error: string) => {
      // mutation 이 에러가 났을 경우 error를 받을 수 있다.
      console.error(error);
    },
  });

  const dispatch = useAppDispatch();
  const { viewAddTodoModal } = useAppSelector((state) => state.modalSlice);
  const { editTitle } = useAppSelector((state) => state.todosSlice);

  const [title, setTitle] = useState<string>(editTitle || "");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    setTitle(editTitle);
  }, [editTitle]);

  const addTodoHandler = () => {
    if (!title || !content) return;

    const date = dayjs().format("DD/MM/YY h:mm A");

    const todo: Todo = {
      id: v4(),
      title,
      date,
      content,
      isDone: false,
      createdAt: new Date().getTime(),
    };

    mutation.mutate(todo);
    dispatch(addTodo(todo));
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
              <span onClick={() => dispatch(toggleAddTodoModal(false))}>X</span>
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
            <button onClick={addTodoHandler}>추가하기</button>
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
`;

const TopWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  font-size: large;
  font-weight: 600;
  margin-bottom: 0.35rem;
`;

export default AddTodoModal;
