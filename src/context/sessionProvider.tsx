"use client";

import React, { createContext, PropsWithChildren, useContext } from "react";
import { Session } from "lucia";
import { UserData } from "@/types";

interface SessionContext {
  user: UserData | null;
  session: Session | null;
}

const SessionContext = createContext<SessionContext | undefined>(undefined);

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

  if (!context?.user || !context.session) {
    throw new Error("useSession requires an authenticated user");
  }

  return context as { user: UserData; session: Session };
}

export function useOptionalSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
}

export default SessionProvider;
