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

// Import individual project pages
import FullStackShowcasePage from "@/pages/projects/FullStackShowcasePage";
import SharedMemoryKernelPage from "@/pages/projects/SharedMemoryKernelPage";
import MelanomaCnnPage from "@/pages/projects/MelanomaCnnPage";
import PsychotherapistSchedulerPage from "@/pages/projects/PsychotherapistSchedulerPage";
import PortfolioExplainerPage from "@/pages/projects/PortfolioExplainerPage";
import DataVisEnginePage from "@/pages/projects/DataVisEnginePage";
import MultithreadedWordFinderPage from "@/pages/projects/MultithreadedWordFinderPage";

function AppRoutes() {
    return (
        <Switch>
            <Route path="/"                             component={Home}                        />
            <Route path="/projects/grid"                component={ProjectsGridPage}            />
            <Route path="/projects/table"               component={ProjectsTablePage}           />
            
            {/* Individual project routes */}
            <Route path="/projects/full-stack-showcase"        component={FullStackShowcasePage}       />
            <Route path="/projects/shared-memory-kernel"       component={SharedMemoryKernelPage}      />
            <Route path="/projects/melanoma-cnn"               component={MelanomaCnnPage}             />
            <Route path="/projects/psychotherapist-scheduler"  component={PsychotherapistSchedulerPage} />
            <Route path="/projects/portfolio-explainer"        component={PortfolioExplainerPage}      />
            <Route path="/projects/data-vis-engine"            component={DataVisEnginePage}           />
            <Route path="/projects/multithreaded-word-finder"  component={MultithreadedWordFinderPage} />
            
            <Route                                      component={NotFound}                    />
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
