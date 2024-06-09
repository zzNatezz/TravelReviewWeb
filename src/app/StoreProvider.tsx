"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, RootState } from "../redux/store";
import { persistStore } from "redux-persist";

persistStore(makeStore);

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const storeRef = useRef<RootState>();
  // if (!storeRef.current) {
  //   // Create the store instance the first time this renders
  //   storeRef.current = makeStore();
  // }

  return <Provider store={makeStore}>{children}</Provider>;
}
