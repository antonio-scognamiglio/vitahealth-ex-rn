import React, { PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import activitiesReducer from "./store/activitiesSlice";
import { RootState } from "./store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
}

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

  function Wrapper({ children }: PropsWithChildren<{}>) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
