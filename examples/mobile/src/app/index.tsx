import { useState } from 'react';
import { ScrollView, Switch, TextInput, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Text } from '../components/Text';
import { ThemeControls } from '../components/ThemeControls';
import { INITIAL_PROJECTS, STATUS_LABELS } from '../projects';

export default function Projects() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [name, setName] = useState('');
  const [shipped, setShipped] = useState(false);
  const [primary, muted, placeholder] = useCSSVariable([
    '--color-primary',
    '--color-muted',
    '--color-muted-foreground',
  ]);

  const addProject = () => {
    if (!name.trim()) return;
    setProjects((current) => [
      ...current,
      {
        id: String(Date.now()),
        name: name.trim(),
        owner: 'You',
        status: shipped ? 'success' : 'inProgress',
      },
    ]);
    setName('');
  };

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

      <ThemeControls />

      <Card>
        <Card.Header>
          <Card.Title>Projects</Card.Title>
          <Card.Description>{projects.length} in the pipeline</Card.Description>
        </Card.Header>
        <Card.Content className="gap-0">
          {projects.map((project, index) => (
            <View
              className={
                index > 0
                  ? 'border-border flex-row items-center justify-between border-t py-3'
                  : 'flex-row items-center justify-between py-3'
              }
              key={project.id}
            >
              <View className="gap-0.5">
                <Text className="font-medium">{project.name}</Text>
                <Text tone="muted" variant="small">
                  {project.owner}
                </Text>
              </View>
              <Badge variant={project.status}>
                {STATUS_LABELS[project.status]}
              </Badge>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>New project</Card.Title>
        </Card.Header>
        <Card.Content>
          <TextInput
            className="border-input bg-background text-foreground h-10 rounded-lg border px-3 text-sm"
            onChangeText={setName}
            onSubmitEditing={addProject}
            placeholder="Pickle jar API"
            placeholderTextColor={String(placeholder)}
            returnKeyType="done"
            value={name}
          />
          <View className="flex-row items-center justify-between">
            <Text>Already shipped</Text>
            {/* Native controls take colors, not classes: pass them the tokens. */}
            <Switch
              onValueChange={setShipped}
              trackColor={{ false: String(muted), true: String(primary) }}
              value={shipped}
            />
          </View>
          {/* Customization 2: `className` is merged last, so it wins over the variant. */}
          <Button className="rounded-full" onPress={addProject}>
            Create project
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
