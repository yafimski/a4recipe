import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// interface ingredients {
//   name: string;
// }

// interface subgroups {
//   name: string;
// }

// interface instructions {
//   name: string;
// }
