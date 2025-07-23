// src/App.tsx
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home               from "@/pages/Home";
import NotFound           from "@/pages/not-found";
import ProjectsGridPage   from "@/pages/projects";      // ← your existing projects.tsx
import ProjectsTablePage  from "@/pages/ProjectsPage"; // ← your existing ProjectsPage.tsx
import ProjectDetail      from "@/pages/ProjectDetail";


function AppRoutes() {
    return (
        <Switch>
            <Route path="/"                 component={Home}               />
            <Route path="/projects/grid"    component={ProjectsGridPage}   />
            <Route path="/projects/table"   component={ProjectsTablePage}  />
            <Route path="/projects/:slugOrId" component={ProjectDetail}      />
            <Route                          component={NotFound}          />
        </Switch>
    );
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <AppRoutes />
            </TooltipProvider>
        </QueryClientProvider>
    );
}
