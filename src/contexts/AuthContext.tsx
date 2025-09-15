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

  // Config Antd message để toast hiện rõ ràng (top-right, 5s)
  useEffect(() => {
    message.config({
      top: 100, // Vị trí từ top
      duration: 5, // Thời gian hiển thị (giây)
      maxCount: 3, // Tối đa 3 toast cùng lúc
    });
  }, []);

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

        // Check banned và logout + hiển thị message ngay (toast cho user)
        const status = profile?.status || "ongoing";
        if (status === "banned") {
          console.log("User banned detected, signing out..."); // Chỉ dev thấy
          message.error(
            "Your account has been banned. Please contact support."
          ); // User thấy toast đỏ!
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

    // Lấy session lần đầu
    supabase.auth.getSession().then(({ data }) => {
      fetchProfile(data?.session ?? null);
    });

    // Lắng nghe thay đổi session
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
