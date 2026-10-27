import { Text } from '@pickle-ui/react-native';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { ScopedVariables, useUniwind } from 'uniwind';

import { type Brand } from '../brands';
import { NewProjectForm } from '../components/NewProjectForm';
import { ProjectList } from '../components/ProjectList';
import { ThemeControls } from '../components/ThemeControls';
import { INITIAL_PROJECTS, type Project } from '../projects';

export default function Projects() {
  const { theme } = useUniwind();
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [brand, setBrand] = useState<Brand | null>(null);

  const addProject = (project: Omit<Project, 'id'>) =>
    setProjects((current) => [
      ...current,
      { ...project, id: String(Date.now()) },
    ]);

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      className="bg-background flex-1"
      contentContainerClassName="gap-6 p-5 pb-12"
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
    >
      <Text tone="muted">
        Pickle UI tokens on React Native, through Uniwind.
      </Text>

      <ThemeControls brand={brand} onBrandChange={setBrand} />

      {/*
       * Customization 1b: override tokens at runtime for a subtree. Wrap the
       * root layout to rebrand the whole app. Without a brand, the values
       * from global.css apply.
       */}
      <ScopedVariables variables={brand ? brand.theme[theme] : {}}>
        <ProjectList projects={projects} />
        <NewProjectForm onCreate={addProject} />
      </ScopedVariables>
    </ScrollView>
  );
}
