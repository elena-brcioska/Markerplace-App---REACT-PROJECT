import React, { useState } from "react";
import { json, redirect, useActionData } from "react-router-dom";
import AuthenticationForm from "../components/AuthenticationForm/AuthenticationForm";

const Access = () => {

  return (
    <div>
      <AuthenticationForm />
    </div>
  );
};

export const action = ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode!" }, { status: 422 });
  }

  return request.formData().then((formData) => {
    const authData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    return fetch("http://localhost:8080/" + mode, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authData),
    })
      .then((response) => {
        if (response.status === 422 || response.status === 401) {
          return response;
        }

        if (!response.ok) {
          throw json(
            { message: "Could not authenticate user!" },
            { status: 500 }
          );
        }

        return response.json();
      })
      .then((response) => {
        if (response.token) {
          const user = authData.email;
          localStorage.setItem("user", user);
          const token = response.token;
          localStorage.setItem("token", token);
          const expiration = new Date();
          expiration.setHours(expiration.getHours() + 1);
          localStorage.setItem("expiration", expiration.toISOString());
          return redirect("/");
        } else {
          return response;
        }
      });
  });
};

export default Access;
