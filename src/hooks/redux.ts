import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
// TypedUseSelectorHook를 사용하여 type 지정
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
