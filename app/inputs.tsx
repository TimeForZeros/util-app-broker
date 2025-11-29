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

type InputProps = {
  name: string;
  handleUpdate: (key: string, data: string | number | boolean) => void;
};

type Input = {
  label?: string;
  type: 'number' | 'text' | 'file' | 'range' | 'select' | 'checkbox';
};

type TextProps = InputProps & {
  defaultValue?: string;
};
export const TextComponent = ({ name, defaultValue, handleUpdate }: TextProps) => {
  return (
    <div>
      <Label htmlFor={name}>{name}</Label>
      <Input
        type="text"
        id={name}
        defaultValue={defaultValue}
        onChange={(e) => handleUpdate(name, e.target.value)}
      />
    </div>
  );
};

type NumberProps = InputProps & {
  min?: number;
  max?: number;
  defaultValue?: number;
};

export const NumberComponent = ({ name, min, max, defaultValue, handleUpdate }: NumberProps) => {
  console.log(name);
  return (
    <div>
      <Label htmlFor={name}>{name}</Label>
      <Input
        id={name}
        type="number"
        min={min}
        max={max}
        defaultValue={defaultValue}
        onChange={(e) => handleUpdate(name, parseInt(e.target.value))}
      />
    </div>
  );
};

type RangeProps = NumberProps & {
  step: number;
};

export const RangeComponent = ({
  name,
  max,
  min,
  defaultValue = 0,
  step,
  handleUpdate,
}: RangeProps) => {
  return (
    <div>
      <Label htmlFor={name}>
        {name}: {defaultValue}
      </Label>
      <Slider
        id={name}
        defaultValue={[defaultValue]}
        max={max}
        min={min}
        step={step}
        onValueChange={(value) => handleUpdate(name, value[0])}
      />
    </div>
  );
};

type SelectProps = InputProps & {
  options: string[];
  defaultValue?: string;
};

export const SelectComponent = ({ name, options, defaultValue, handleUpdate }: SelectProps) => {
  console.log(name);
  return (
    <Select defaultValue={defaultValue} onValueChange={(value) => handleUpdate(name, value)}>
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
  defaultValue?: boolean;
};
export const CheckboxComponent = ({ name, defaultValue, handleUpdate }: CheckboxProps) => {
  console.log(name);
  return (
    <div className="flex items-center gap-3">
      <Checkbox id={name} defaultChecked={defaultValue} onCheckedChange={(checked) => handleUpdate(name, checked)} />
      <Label htmlFor={name}>{name}</Label>
    </div>
  );
};

export const inputGenerator = (inputData) => {
  switch (inputData.type as Input['type']) {
    case 'text':
      return <TextComponent key={inputData.name} {...inputData} />;
    case 'checkbox':
      return <CheckboxComponent key={inputData.name} {...inputData} />;
    case 'number':
      return <NumberComponent key={inputData.name} {...inputData} />;
    case 'range':
      return <RangeComponent key={inputData.name} {...inputData} />;
  }
};
