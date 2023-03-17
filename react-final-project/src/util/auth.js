import React from 'react';
import { redirect } from 'react-router-dom';

export const getAuthToken = () => {
    const token = localStorage.getItem("token");
    const tokenDuration = getTokenDuration();
  
    if (!token) {
      return null;
    }
  
    if (tokenDuration < 0) {
      return "EXPIRED";
    }
  
    return token;
  };
  
  export const tokenLoader = () => {
    return getAuthToken();
  };
  
  export const getTokenDuration = () => {
    const storedExpirationDate = localStorage.getItem("expiration");
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
  };
  
  export const checkAuthLoader = () => {
    const token = getAuthToken();
  
    if (!token) {
      return redirect("/access?mode=login");
    }
  
    return token;
  };

  export const getUser = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    return user;
  }
  