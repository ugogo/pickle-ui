import {
  Button,
  Card,
  Input,
  Text,
  useColorToken,
} from '@pickle-ui/react-native';
import { useState } from 'react';
import { Switch, View } from 'react-native';

import { type Project } from '../projects';

type NewProjectFormProps = {
  onCreate: (project: Omit<Project, 'id'>) => void;
};

export function NewProjectForm({ onCreate }: NewProjectFormProps) {
  const [name, setName] = useState('');
  const [shipped, setShipped] = useState(false);
  const primary = useColorToken('primary');
  const muted = useColorToken('muted');

  const submit = () => {
    if (!name.trim()) return;
    onCreate({
      name: name.trim(),
      owner: 'You',
      status: shipped ? 'success' : 'inProgress',
    });
    setName('');
    setShipped(false);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>New project</Card.Title>
      </Card.Header>
      <Card.Content>
        <Input
          accessibilityLabel="Project name"
          onChangeText={setName}
          onSubmitEditing={submit}
          placeholder="Pickle jar API"
          returnKeyType="done"
          value={name}
        />
        <View className="flex-row items-center justify-between">
          <Text>Already shipped</Text>
          {/* Native controls take colors, not classes: pass them the tokens. */}
          <Switch
            accessibilityLabel="Already shipped"
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
