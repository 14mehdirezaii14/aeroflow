'use client';

import type { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

/** Resolve a dotted path (e.g. "step1.fullName") in a nested object. */
function getPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/** Renders the react-hook-form error message for a field path (string or nested). */
export function FieldError({ name, className }: { name: string; className?: string }) {
  const { formState } = useFormContext();
  const error = getPath(formState.errors, name) as { message?: string } | undefined;
  if (!error?.message) return null;
  return (
    <p role="alert" className={cn('mt-1 text-xs font-medium text-destructive', className)}>
      {error.message}
    </p>
  );
}

export interface InputFieldProps<T extends FieldValues> {
  /** Field path key — can be dotted for nested schemas (e.g. step1.fullName). */
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  options?: RegisterOptions<T, Path<T>>;
  type?: string;
  placeholder?: string;
  inputMode?: 'decimal' | 'numeric' | 'tel' | 'email' | 'text';
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number | string;
  className?: string;
}

export function InputField<T extends FieldValues>({
  name,
  label,
  register,
  options,
  className,
  min,
  max,
  step,
  ...rest
}: InputFieldProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name as string}>{label}</Label>
      <Input
        id={name as string}
        className={className}
        min={min}
        max={max}
        step={step}
        {...register(name, options)}
        {...rest}
      />
      <FieldError name={name as string} />
    </div>
  );
}
