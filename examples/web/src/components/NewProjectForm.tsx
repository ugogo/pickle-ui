import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@pickle-ui/react/card';
import { Form } from '@pickle-ui/react/form';
import { Toast } from '@pickle-ui/react/toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { type Project, STATUS_LABELS } from '../projects';

const schema = z.object({
  name: z.string().trim().min(1, 'Name the project.'),
  owner: z.string().trim().min(1, 'Who owns it?'),
  status: z.enum(['inProgress', 'inReview', 'success']),
});

type NewProjectFormProps = {
  onCreate: (project: Omit<Project, 'id'>) => void;
};

type Values = z.infer<typeof schema>;

export function NewProjectForm({ onCreate }: NewProjectFormProps) {
  const toast = Toast.useToast();
  const form = useForm<Values>({
    defaultValues: { name: '', owner: '', status: 'inProgress' },
    resolver: zodResolver(schema),
  });

  return (
    <Card>
      <Card.Header>
        <Card.Title>New project</Card.Title>
        <Card.Description>
          Validated with React Hook Form and Zod.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Form
          form={form}
          onSubmit={(values) => {
            onCreate(values);
            form.reset();
            toast.add({ title: `${values.name} created`, type: 'success' });
          }}
        >
          <Form.Field label="Name" name="name">
            <Form.Input placeholder="Pickle jar API" />
          </Form.Field>

          <Form.Field label="Owner" name="owner">
            <Form.Input placeholder="Ada" />
          </Form.Field>

          <Form.Field label="Status" name="status">
            <Form.Select items={STATUS_LABELS}>
              <Form.Select.Trigger className="w-full">
                <Form.Select.Value />
              </Form.Select.Trigger>
              <Form.Select.Content>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <Form.Select.Item key={value} value={value}>
                    {label}
                  </Form.Select.Item>
                ))}
              </Form.Select.Content>
            </Form.Select>
          </Form.Field>

          {/* Customization 2: `className` is merged last, so it wins over Pickle's classes. */}
          <Form.Button className="w-full rounded-full" type="submit">
            Create project
          </Form.Button>
        </Form>
      </Card.Content>
    </Card>
  );
}
