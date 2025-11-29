import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { inputGenerator } from './inputs';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type ImageType = 'jpg' | 'jpeg' | 'avif' | 'png' | 'webp';

type BatchSharpInput = {
  source: string;
  destination: string;
  format: ImageType;
  auto: boolean;
  quality?: number;
  sizeLock?: number;
  effort?: number;
};

type Input = {
  label?: string;
  type: 'number' | 'text' | 'file' | 'range' | 'select' | 'checkbox';
};
type NumberInput = Input & {
  min?: number;
  max?: number;
  defaultValue?: number;
};
type RangeInput = NumberInput & {
  step: number;
};

type SelectInput = Input & {
  options: string[];
  defaultValue?: string;
};

type CheckInput = Input & {
  defaultValue: boolean;
};

type InputType = NumberInput | SelectInput | RangeInput | CheckInput;

type InputTemplate = {
  title: string;
  id: string;
  basicSettings: Record<string, InputType>;
  advancedSettings?: Record<string, InputType>;
};

const batchSharpTemplate: InputTemplate = {
  title: 'Batch Sharp',
  id: '62420',
  basicSettings: {
    source: {
      type: 'file',
    },
    destination: {
      type: 'file',
    },
    format: {
      type: 'select',
      options: ['jpg', 'jpeg', 'png', 'avif', 'webp'],
      defaultValue: 'avif',
    },
  },
  advancedSettings: {
    auto: {
      type: 'checkbox',
      defaultValue: false,
    },
    quality: {
      type: 'range',
      min: 0,
      max: 100,
      defaultValue: 80,
      step: 5,
    },
    sizeLock: {
      type: 'number',
      defaultValue: 1200,
    },
    effort: {
      type: 'range',
      defaultValue: 0,
      min: 0,
      max: 10,
      step: 1,
    },
  },
};

type TemplateState = {
  id: string;
  title: string;
  basicSettings: Record<string, InputType>;
  advancedSettings?: Record<string, InputType>;
};

type OutputSettings = Record<string, string | number | boolean>;
const setSettingsDefaults = (settingData?: Record<string, InputType>) => {
  console.log('hits');
  const outputSettings: OutputSettings = {};
  if (!settingData) return outputSettings;
  Object.entries(settingData).forEach(([key, value]) => {
    console.log(value);
    if (value.defaultValue === undefined) return;
    outputSettings[key] = value.defaultValue;
  });
  return outputSettings;
};

const InputSection = ({ inputData }: { inputData: TemplateState }) => {
  const [outputSettings, setOutputSettings] = useState<Record<string, OutputSettings>>({
    basicSettings: setSettingsDefaults(inputData.basicSettings),
    advancedSettings: setSettingsDefaults(inputData?.advancedSettings),
  });
  const basicSettings = Object.entries(inputData.basicSettings);
  const advancedSettings = inputData.advancedSettings
    ? Object.entries(inputData.advancedSettings)
    : [];
  const handleBasicUpdate = (key: string, value: number | boolean | string) => {
    const { basicSettings } = { ...outputSettings };
    basicSettings[key] = value;
    console.log(basicSettings);
    setOutputSettings({ ...outputSettings, basicSettings });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{inputData.title}</CardTitle>
        <CardDescription>Convert and Resize Images</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {basicSettings.map(([key, value]) =>
          inputGenerator({ ...value, name: key, handleUpdate: handleBasicUpdate }),
        )}
        {advancedSettings.length > 0 &&
          advancedSettings.map(([key, value]) =>
            inputGenerator({ ...value, name: key, handleUpdate: handleBasicUpdate }),
          )}
      </CardContent>
      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
};

export default InputSection;
