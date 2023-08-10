// Importing the `useDispatch` and `useSelector` hooks from the `react-redux` library.
// These hooks are essential for dispatching actions and accessing state in a React-Redux application.
import { useDispatch, useSelector } from 'react-redux';

// Importing TypeScript types. The `TypedUseSelectorHook` type from `react-redux`
// is used to create a strongly-typed version of the `useSelector` hook.
import type { TypedUseSelectorHook } from 'react-redux';

// Importing custom type definitions for our application's state (`RootState`) 
// and our application's dispatch method (`AppDispatch`) from the `./store` module.
import type { RootState, AppDispatch } from './store';

// Creating and exporting a strongly-typed version of the `useDispatch` hook.
// This hook will return the `AppDispatch` type when invoked, ensuring that 
// any dispatched actions adhere to the expected type definitions.
export const useAppDispatch: () => AppDispatch = useDispatch;

// Creating and exporting a strongly-typed version of the `useSelector` hook.
// This hook ensures that any selected state adheres to the `RootState` type definition.
// By using this custom hook in our components, we ensure type safety when accessing state.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;