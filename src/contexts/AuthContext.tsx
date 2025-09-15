/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/services/supabase";
import { message } from "antd"; // Import message từ Antd để hiển thị toast cho user

export type UserWithRole = User & {
  role?: string;
  full_name?: string;
  avatar_url?: string;
  status?: string; // 'ongoing' hoặc 'banned'
};

export type AuthContextType = {
  session: Session | null;
  user: UserWithRole | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async (sessionObj: Session | null) => {
      if (!isMounted) return;
      if (sessionObj) {
        setSession(sessionObj);
        const userId = sessionObj.user.id;
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role, full_name, avatar_url, status")
          .eq("id", userId)
          .single();
        // Handle query error
        if (error) {
          console.error("Profile fetch error:", error);
          message.error("Failed to fetch profile");
          await supabase.auth.signOut();
          setSession(null);
          setUser(null);
          setLoading(false);
          return;
        }

        // Check user status and block login if banned
        const status = profile?.status || "ongoing";
        if (status === "banned") {
          console.log("User banned detected, signing out...");
          message.error(
            "Your account has been banned. Please contact support."
          );
          await supabase.auth.signOut();
          setSession(null);
          setUser(null);
          setLoading(false);
          return;
        }

        const userWithRole = {
          ...sessionObj.user,
          role: profile?.role,
          full_name: profile?.full_name,
          avatar_url: profile?.avatar_url,
          status: status,
        };
        setUser(userWithRole);
        setLoading(false);
        console.log("AuthProvider (profile fetch):", {
          user: userWithRole,
          session: sessionObj,
        });
      } else {
        setSession(null);
        setUser(null);
        setLoading(false);
        console.log("AuthProvider (no session):", {
          user: null,
          session: null,
        });
      }
    };

    supabase.auth.getSession().then(({ data }) => {
      fetchProfile(data?.session ?? null);
    });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        fetchProfile(newSession);
      }
    );
    return () => {
      isMounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
