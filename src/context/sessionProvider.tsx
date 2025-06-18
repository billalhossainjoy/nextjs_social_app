"use client";

import React, { createContext, PropsWithChildren, useContext } from "react";
import { Session, User } from "lucia";

interface SessionContext {
  user: User;
  session: Session;
}

const SessionContext = createContext<SessionContext | null>(null);

type ProviderProps = {
  children: React.ReactNode;
  value: SessionContext;
};

function SessionProvider({
  children,
  value,
}: PropsWithChildren<ProviderProps>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
}

export default SessionProvider;
