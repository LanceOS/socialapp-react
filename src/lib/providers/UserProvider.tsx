// src/context/UserContext.js
import React, { useState, useEffect } from "react";
import Pocketbase, { RecordModel } from "pocketbase";
import UserContext from "../contexts/UserContext";

const pb = new Pocketbase("http://127.0.0.0:8090");

interface IRegister {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<RecordModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await pb.authStore.model;
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const createUser = async (data: IRegister) => {
    console.log(data);
    await pb
      .collection("users")
      .create(data)
      .then(() => (window.location.href = "/signin"))
      .catch((err) => {
        console.error(err);
        throw new Error(err);
      });
  };

  const login = async (email: string, password: string) => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      setUser(authData.record);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await pb.authStore.clear();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, login, createUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
