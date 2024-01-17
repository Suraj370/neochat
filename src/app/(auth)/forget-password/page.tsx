"use client";
import React, { SyntheticEvent, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { Button } from "@/components/ui/button";

const SignInPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);

  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  async function create(e: SyntheticEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(true);
      });
  }

  async function reset(e: SyntheticEvent) {
    e.preventDefault();

    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setComplete(true);
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(true);
      });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">
          {successfulCreation && !complete
            ? "Reset password"
            : "Forgot Password"}
        </h1>
        <form onSubmit={!successfulCreation ? create : reset}>
          {!successfulCreation && !complete && (
            <>
              <input
                type="email"
                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </>
          )}
          {successfulCreation && !complete && (
            <>
              <label htmlFor="password" className="text-primary">
                New password
              </label>
              <input
                type="password"
                value={password}
                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="text-primary">
                Reset password code
              </label>
              <input
                type="text"
                value={code}
                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none"
                onChange={(e) => setCode(e.target.value)}
              />
              <Button className="w-full" type="submit">
                Reset password
              </Button>
              {error && 'Invalid code or code expired'}
            </>
          )}
          {complete && "You successfully changed you password"}
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
