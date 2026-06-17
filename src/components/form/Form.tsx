'use client';

import * as React from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { InputGroup } from '@/components/InputGroup';
import { cn } from '@/lib/utils';

import { Checkbox } from './Checkbox';
import { Field } from './Field';
import { Label } from './Label';
import { RadioGroup } from './RadioGroup';
import { Select } from './Select';
import { Switch } from './Switch';

type FormProps = React.ComponentProps<'form'>;

function FormRoot({ className, ...props }: FormProps) {
  return (
    <form className={cn('space-y-6', className)} data-slot="form" {...props} />
  );
}

const Form = Object.assign(FormRoot, {
  Button,
  Checkbox,
  Field,
  Input,
  InputGroup,
  Label,
  RadioGroup,
  Select,
  Switch,
});

export { Form };
export type { FormProps };
