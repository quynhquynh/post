import React from "react";

const AuthenticateContext = React.createContext({});

export const AuthenticateProvider = AuthenticateContext.Provider;
export const AuthenticateConsumer = AuthenticateContext.Consumer;
