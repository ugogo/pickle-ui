import { useState } from 'react';
import { Switch, TextInput, View } from 'react-native';

import { useColorToken } from '../lib/useColorToken';
import { type Project } from '../projects';
import { Button } from './Button';
import { Card } from './Card';
import { Text } from './Text';

type NewProjectFormProps = {
  onCreate: (project: Omit<Project, 'id'>) => void;
};

export function NewProjectForm({ onCreate }: NewProjectFormProps) {
  const [name, setName] = useState('');
  const [shipped, setShipped] = useState(false);
  const primary = useColorToken('primary');
  const muted = useColorToken('muted');
  const mutedForeground = useColorToken('muted-foreground');

  const submit = () => {
    if (!name.trim()) return;
    onCreate({
      name: name.trim(),
      owner: 'You',
      status: shipped ? 'success' : 'inProgress',
    });
    setName('');
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>New project</Card.Title>
      </Card.Header>
      <Card.Content>
        <TextInput
          className="border-input bg-background text-foreground h-10 rounded-lg border px-3 text-sm"
          onChangeText={setName}
          onSubmitEditing={submit}
          placeholder="Pickle jar API"
          placeholderTextColor={mutedForeground}
          returnKeyType="done"
          value={name}
        />
        <View className="flex-row items-center justify-between">
          <Text>Already shipped</Text>
          {/* Native controls take colors, not classes: pass them the tokens. */}
          <Switch
            onValueChange={setShipped}
            trackColor={{ false: muted, true: primary }}
            value={shipped}
          />
        </View>
        {/* Customization 2: `className` is merged last, so it wins over the variant. */}
        <Button className="rounded-full" onPress={submit}>
          Create project
        </Button>
      </Card.Content>
    </Card>
  );
}
