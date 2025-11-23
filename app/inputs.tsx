import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

type InputProps = {
  name: string;
  componentType: 'basic' | 'advanced';
};

type Input = {
  label?: string;
  type: 'number' | 'text' | 'file' | 'range' | 'select' | 'checkbox';
};

type TextProps = InputProps & {
  value?: string;
};

export const TextComponent = ({ name, componentType, value }: TextProps) => {
  return (
    <div>
      <Label htmlFor={name}>{name}</Label>
      <Input type="text" id={name} value={value} />
    </div>
  );
};

type NumberProps = InputProps & {
  min?: number;
  max?: number;
  value?: number;
};

export const NumberComponent = ({ name, componentType, min, max, value }) => {
  return (
    <div>
      <Label htmlFor={name}>{name}</Label>
      <Input id={name} type="number" min={min} max={max} value={value} />
    </div>
  );
};

type RangeProps = NumberProps & {
  step: number;
};

export const RangeComponent = ({ name, componentType, max, min, value, step }: RangeProps) => {
  return (
    <div>
      <Label htmlFor={name}>
        {name}: {value}
      </Label>
      <Slider id={name} value={[value]} max={max} min={min} step={step} />
    </div>
  );
};

type SelectProps = InputProps & {
  options: string[];
  value?: string;
};

export const SelectComponent = ({ name, componentType, options, value }: SelectProps) => {
  return (
    <Select defaultValue={value}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{name}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

type CheckboxProps = InputProps & {
  value?: boolean;
};
export const CheckboxComponent = ({ name, value, componentType }: CheckboxProps) => {
  console.log(name)
  // const handleChange = (e) => console.log(e.target.checked)
  // };
  return (
    <div className="flex items-center gap-3">
      <Checkbox id={name} checked={value} />
      <Label htmlFor={name}>{name}</Label>
    </div>
  );
};

export const inputGenerator = (inputData, componentType) => {
  switch (inputData.type as Input['type']) {
    case 'checkbox':
      console.log('hit');
      return <CheckboxComponent { ...inputData} componentType={componentType} />;
    // case 'number':
    //   return <NumberComponent name={inputData.name} min={inputData.min} />;
  }
};
