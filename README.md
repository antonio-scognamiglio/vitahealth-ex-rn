# VitaHealth Activity Tracker

A React Native application built with Expo to track and review weekly physical activities. The application was developed with the intent of demonstrating a clean, maintainable architecture, handling data fetching, state management, and UI states according to modern React Native best practices.

## Overview

The application consists of two main screens:

1.  **Activity List**: Displays a summary of the user's activities for the **current week**.
2.  **Activity Detail**: Shows detailed information for a selected activity.

The application implements the following core features:

- **Loading States**: Visual feedback during asynchronous data fetching.
- **Error Handling**: Robust error recovery with user-initiated retry mechanisms.
- **Empty States**: Clear messaging when no activities are available for the current period.

## Tech Stack

- **Framework**: [Expo](https://expo.dev/) (Managed Workflow)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Testing**: [Jest](https://jestjs.io/) & [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- **Code Quality**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd vitahealth-ex-rn
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npm start
```

- **Physical Device (Expo Go)**: Scan the QR code using the camera (iOS) or the Expo Go app (Android). _Note: The app has been verified using Expo Go._
- **iOS Simulator**: Press `i` in the terminal.
- **Android Emulator**: Press `a` in the terminal.

### Running Tests

Execute the test suite to verify business logic and UI components:

```bash
npm test
```

### Code Quality

Run the linter to check for code style issues and potential errors:

```bash
npm run lint
```

## Key Implementation Decisions

### 1. File-Based Routing with Expo Router

While React Navigation is the standard, I chose **Expo Router** to leverage the modern, file-system-based routing paradigm standard in the React ecosystem (similar to Next.js). This opinionated structure significantly reduces boilerplate and enforces a clear project organization, making it easier for other engineers to understand and extend the application, directly aligning with the assignment's maintainability goals.

### 2. Custom Hooks & Separation of Concerns

I utilized custom hooks (e.g., `useActivities`) to encapsulate business logic and state management, keeping UI components purely presentational.

- **Why**: To enforce a strict separation of concerns. The UI is responsible only for rendering, while the hook manages data fetching and state synchronization.
- **Benefit**: This architecture improves **reusability** and **testability**. Hooks can be tested in isolation, and UI components can be tested with simple mocked data without needing to mock the complex Redux provider chain.

### 3. "Evergreen" Data Simulation

Instead of using static dates in the mock JSON (which would make the "Current Week" logic obsolete in a future review), I implemented a **Relative Date Mapper**.

- **Mechanism**: The raw data contains a `daysAgo` field. A mapper transforms this into ISO dates relative to `new Date()` at runtime.
- **Benefit**: The application always displays relevant data for the "Current Week" regardless of when the application is run, ensuring the `ActivityList` is never empty due to date decay.

### 4. Network Simulation & State Handling

Although data is local, the `ActivityService` injects a simulated network delay (1.5s).

- **Why**: To effectively demonstrate the **Loading State** and ensure the UI remains responsive during asynchronous operations, preventing "flickering". While the mock service defaults to success, the architecture includes full **Error Handling** capabilities (Redux states, Error Boundary UI) to satisfy production-readiness standards.

### 5. Redux Toolkit & AsyncThunk

I utilized **Redux Toolkit (RTK)** with `createAsyncThunk` for side effects.

- **Why**: RTK standardizes the Redux boilerplate. `createAsyncThunk` automatically generates action creators for the promise lifecycle (`pending`, `fulfilled`, `rejected`), ensuring consistent state transitions for fetching operations without writing manual action types.

## Assumptions & Limitations

- **User Timezone**: The "Current Week" filter logic assumes the user's device time. Comparing UTC dates against local user time might result in edge cases around midnight boundaries.
- **Blocking Error Strategy**: In case of a data fetch error, the app displays a full-screen error view with a "Retry" button, assuming the activity list is critical functionality without which the app provides no value.
- **Device Orientation**: The application is **locked to Portrait Mode** via configuration. Landscape layouts are disabled to ensure a consistent user experience on mobile devices.
- **Localization**: The application assumes **en-US** locale for date formatting and strings. Multi-language support was omitted to reduce architectural complexity.
- **Relative Data**: Activity dates are generated relative to the execution time to ensure data availability. This design choice means the dataset changes based on when the application is run.

## Future Improvements

With more time, I would consider the following enhancements:

- **Accessibility (a11y)**: Enhancing the semantic structure and ARIA labels to ensure full support for VoiceOver and TalkBack users, complying with WCAG guidelines.
- **Local Data Persistence**: Integrating `redux-persist` and `AsyncStorage` to store the application state locally, ensuring user data remains available across app restarts and offline sessions.
- **User-Generated Content**: Adding a "Create Activity" feature with form validation (e.g., using `react-hook-form` and `zod`) to allow users to input their own workout data, moving beyond read-only functionality.
- **Dark Mode Support**: Extending the theming system to fully support system-wide Dark Mode preferences, enhancing user experience in low-light environments.
- **Internationalization (i18n)**: Abstracting hardcoded strings into translation files (using `i18next`) to support multiple languages and locale-aware date formatting.
