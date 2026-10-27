import { View } from 'react-native';

import { type Project, STATUS_LABELS } from '../projects';
import { Badge } from './Badge';
import { Card } from './Card';
import { Text } from './Text';

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
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
  );
}
