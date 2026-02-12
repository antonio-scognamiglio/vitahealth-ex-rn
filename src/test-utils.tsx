import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import activitiesReducer from './store/activitiesSlice';
import { RootState } from './store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
}

/**
 * Renders a React component wrapped in a Redux Provider mainly for testing purposes.
 * @param ui - The React component to render.
 * @param options - Configuration options:
 *   - preloadedState: Initial Redux state for testing specific scenarios (e.g., loading, error).
 *   - renderOptions: Additional options for @testing-library/react-native.
 * @returns The rendered component with a fully configured Redux store.
 */
export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState = {}, ...renderOptions }: ExtendedRenderOptions = {},
) {
  const store = configureStore({
    reducer: {
      activities: activitiesReducer,
    },
    preloadedState: preloadedState as RootState,
  });

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
