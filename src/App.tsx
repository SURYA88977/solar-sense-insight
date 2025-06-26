
import React from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Impact from "./pages/Impact";
import System from "./pages/System";
import Emergency from "./pages/Emergency";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return React.createElement(QueryClientProvider, { client: queryClient },
    React.createElement(TooltipProvider, null,
      React.createElement(Toaster),
      React.createElement(Sonner),
      React.createElement(BrowserRouter, null,
        React.createElement(Routes, null,
          React.createElement(Route, { path: "/", element: React.createElement(Navigate, { to: "/login", replace: true }) }),
          React.createElement(Route, { path: "/login", element: React.createElement(Login) }),
          React.createElement(Route, { path: "/", element: React.createElement(Layout) },
            React.createElement(Route, { path: "/dashboard", element: React.createElement(Dashboard) }),
            React.createElement(Route, { path: "/analytics", element: React.createElement(Analytics) }),
            React.createElement(Route, { path: "/impact", element: React.createElement(Impact) }),
            React.createElement(Route, { path: "/system", element: React.createElement(System) }),
            React.createElement(Route, { path: "/emergency", element: React.createElement(Emergency) })
          ),
          React.createElement(Route, { path: "*", element: React.createElement(NotFound) })
        )
      )
    )
  );
};

export default App;
