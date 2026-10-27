import { AlertDialog } from '@pickle-ui/react/alert-dialog';
import { Badge } from '@pickle-ui/react/badge';
import { Button } from '@pickle-ui/react/button';
import { Card } from '@pickle-ui/react/card';
import { Table } from '@pickle-ui/react/table';
import { Text } from '@pickle-ui/react/text';
import { Toast } from '@pickle-ui/react/toast';
import { IconTrash } from '@tabler/icons-react';

import { type Project, STATUS_LABELS } from '../projects';

type ProjectTableProps = {
  onRemove: (id: string) => void;
  projects: Project[];
};

export function ProjectTable({ onRemove, projects }: ProjectTableProps) {
  const toast = Toast.useToast();

  return (
    <Card>
      <Card.Header>
        <Card.Title>Projects</Card.Title>
        <Card.Description>{projects.length} in the pipeline</Card.Description>
      </Card.Header>
      <Card.Content>
        {projects.length === 0 ? (
          <Text tone="muted">No projects yet. Create one with the form.</Text>
        ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head>Owner</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head className="w-0" />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {projects.map((project) => (
                <Table.Row key={project.id}>
                  <Table.Cell className="font-medium">
                    {project.name}
                  </Table.Cell>
                  <Table.Cell>{project.owner}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={project.status}>
                      {STATUS_LABELS[project.status]}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <AlertDialog>
                      <AlertDialog.Trigger
                        render={
                          <Button
                            aria-label={`Delete ${project.name}`}
                            size="icon-sm"
                            variant="ghost"
                          />
                        }
                      >
                        <IconTrash />
                      </AlertDialog.Trigger>
                      <AlertDialog.Content>
                        <AlertDialog.Header>
                          <AlertDialog.Title>
                            Delete {project.name}?
                          </AlertDialog.Title>
                          <AlertDialog.Description>
                            This removes the project from the list.
                          </AlertDialog.Description>
                        </AlertDialog.Header>
                        <AlertDialog.Footer>
                          <AlertDialog.Close
                            render={<Button variant="outline" />}
                          >
                            Cancel
                          </AlertDialog.Close>
                          <AlertDialog.Close
                            onClick={() => {
                              onRemove(project.id);
                              toast.add({
                                title: `${project.name} deleted`,
                                type: 'success',
                              });
                            }}
                            render={<Button variant="destructive" />}
                          >
                            Delete
                          </AlertDialog.Close>
                        </AlertDialog.Footer>
                      </AlertDialog.Content>
                    </AlertDialog>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </Card.Content>
    </Card>
  );
}
