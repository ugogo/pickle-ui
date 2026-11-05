import { Badge, Card, cn, Drawer, Text, XStack } from '@pickle-ui/react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { type Project, STATUS_LABELS } from '../projects';

type ProjectListProps = {
  onShip: (id: string) => void;
  projects: Project[];
};

export function ProjectList({ onShip, projects }: ProjectListProps) {
  const [open, setOpen] = useState(false);
  // Kept after closing, so the drawer keeps its content while it slides away.
  const [selectedId, setSelectedId] = useState<null | string>(null);
  const selected = projects.find((project) => project.id === selectedId);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Projects</Card.Title>
        <Card.Description>
          {projects.length} in the pipeline. Tap one for its details.
        </Card.Description>
      </Card.Header>
      <Card.Content className="gap-0">
        {projects.map((project, index) => (
          <Pressable
            accessibilityHint="Shows the project's details"
            accessibilityRole="button"
            className={cn(
              'flex-row items-center justify-between py-3 active:opacity-60',
              index > 0 && 'border-border border-t',
            )}
            key={project.id}
            onPress={() => {
              setSelectedId(project.id);
              setOpen(true);
            }}
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
          </Pressable>
        ))}
      </Card.Content>

      {/* A controlled Drawer: the rows open it, so it needs no Drawer.Trigger. */}
      <Drawer onOpenChange={setOpen} open={open}>
        <Drawer.Content>
          {selected ? (
            <>
              <Drawer.Header>
                <Drawer.Title>{selected.name}</Drawer.Title>
                <Drawer.Description>
                  Owned by {selected.owner}
                </Drawer.Description>
              </Drawer.Header>
              <Drawer.Panel>
                <XStack align="center" justify="between">
                  <Text tone="muted">Status</Text>
                  <Badge variant={selected.status}>
                    {STATUS_LABELS[selected.status]}
                  </Badge>
                </XStack>
              </Drawer.Panel>
              <Drawer.Footer>
                <Drawer.Close variant="outline">Done</Drawer.Close>
                <Drawer.Close
                  disabled={selected.status === 'success'}
                  onPress={() => onShip(selected.id)}
                >
                  Mark as shipped
                </Drawer.Close>
              </Drawer.Footer>
            </>
          ) : null}
        </Drawer.Content>
      </Drawer>
    </Card>
  );
}
