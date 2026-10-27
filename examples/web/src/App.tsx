import { buttonVariants } from '@pickle-ui/react/button';
import { Text } from '@pickle-ui/react/text';
import { Toast } from '@pickle-ui/react/toast';
import { useState } from 'react';

import { NewProjectForm } from './components/NewProjectForm';
import { ProjectTable } from './components/ProjectTable';
import { ThemeControls } from './components/ThemeControls';
import { INITIAL_PROJECTS, type Project } from './projects';

export function App() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  const addProject = (project: Omit<Project, 'id'>) =>
    setProjects((current) => [
      ...current,
      // Not `crypto.randomUUID()`: it only exists on https and localhost.
      { ...project, id: String(Date.now()) },
    ]);

  const removeProject = (id: string) =>
    setProjects((current) => current.filter((project) => project.id !== id));

  return (
    // One provider per app: `Toast.useToast()` works anywhere below it.
    <Toast.Provider>
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Text variant="h1">Pickle projects</Text>
            <Text tone="muted">
              A mini app built with <code>@pickle-ui/react</code>.
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <ThemeControls />
            {/* Customization 3: reuse `buttonVariants` on an element Pickle does not render. */}
            <a
              className={buttonVariants({ variant: 'ghost' })}
              href="https://ugogo.github.io/pickle-ui/"
              rel="noreferrer"
              target="_blank"
            >
              Storybook
            </a>
          </div>
        </header>

        <div className="grid items-start gap-6 md:grid-cols-[1fr_20rem]">
          <ProjectTable onRemove={removeProject} projects={projects} />
          <NewProjectForm onCreate={addProject} />
        </div>
      </div>
    </Toast.Provider>
  );
}
