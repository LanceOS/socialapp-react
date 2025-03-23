// src/context/UserContext.js
import React, { useState, useEffect } from "react";
import Pocketbase, { RecordModel } from "pocketbase";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import PBClient from "../classes/Pocketbase";

const pb = PBClient.pb;

interface IRegister {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface ISignin {
  email: string;
  password: string;
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<RecordModel | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = pb.authStore.record;
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
    await pb
      .collection("users")
      .create(data)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const login = async (data: ISignin) => {
    await pb
      .collection("users")
      .authWithPassword(data.email, data.password)
      .then((authData) => {
        setUser(authData.record);
        navigate("/");
        return authData.record;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logout = async () => {
    await pb.authStore.clear();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, createUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
