import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store/StoreConfig'

export const useTypedDispatch = () =>  useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector