import { createContext } from "react";

import type { Session } from "@supabase/supabase-js";

type AuthContent = {
  session: Session | null
  role: string | null;
  loading: boolean;
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContent | undefined>(undefined)

