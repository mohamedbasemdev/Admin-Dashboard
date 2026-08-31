import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "../supabase/Client";
import type { Session } from "@supabase/supabase-js";
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [session, setSession] = useState<Session | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchRole = async(userId: string) =>{
    const {data, error} = await supabase
    .from("profiles")
    .select('role')
    .eq("id", userId)
    .single()

    if (error) {
      console.log(error)
      setRole(null)
      return
    }
    setRole(data?.role ?? null)
  }

  useEffect(() =>{
    supabase.auth.getSession().then(({data: {session}}) =>{
      setSession(session)
      if (session?.user?.id){
        fetchRole(session.user.id)
      }
      setLoading(false)
    }  
  )
  const {data: listener} = supabase.auth.onAuthStateChange(
    (_event, session) => {
      if (session?.user?.id){
        fetchRole(session.user.id)
      }else{
        setRole(null)
      }
    }
  )
  return () =>{
    listener.subscription.unsubscribe()
  }
  },[])
  const signOut = async() =>{
    await supabase.auth.signOut()
  }
  return (
    <AuthContext.Provider value={{session, role, loading, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider