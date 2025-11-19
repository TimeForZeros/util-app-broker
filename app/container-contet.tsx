'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useReducer, createContext, useContext } from 'react';

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

// const batchSharpFixture: BatchSharpInput = {
//   source: 'foo',
//   destination: 'bar',
//   format: 'avif',
//   auto: false,
//   quality: 80,
//   sizeLock: 1200,
//   effort: 4,
// };

type Input = {
  label?: string;
  type: 'number' | 'text' | 'file' | 'range' | 'select' | 'checkbox';
};
type NumberInput = Input & {
  min?: number;
  max?: number;
  default?: number;
};
type RangeInput = NumberInput & {
  step: number;
};

type SelectInput = Input & {
  options: string[];
  default?: string;
};

type CheckInput = Input & {
  default: boolean;
};

type InputTemplate = {
  title: string;
  id: string;
  basicSettings: Record<string, NumberInput | SelectInput | RangeInput | CheckInput>;
  advancedSettings?: Record<string, NumberInput | SelectInput | RangeInput | CheckInput>;
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
      default: 'avif',
    },
  },
  advancedSettings: {
    auto: {
      type: 'checkbox',
      default: false,
    },
    quality: {
      type: 'range',
      min: 0,
      max: 100,
      default: 80,
      step: 5,
    },
    sizeLock: {
      type: 'number',
      default: 1200,
    },
    effort: {
      type: 'range',
      default: 0,
      min: 0,
      max: 10,
      step: 1,
    },
  },
};

type TemplateState = {
  id: string;
  title: string;
  basicSettings: Record<string, string | number | boolean>;
  advancedSettings?: Record<string, string | number | boolean>;
};

const extractStateFromTemplate = (template: InputTemplate): TemplateState => {
  const templateState: TemplateState = {
    id: template.id,
    title: template.title,
    basicSettings: {},
  };
  Object.entries(template.basicSettings).forEach(([key, value]) => {
    templateState.basicSettings[key] = value.default ?? '';
  });
  if (template.advancedSettings) {
    templateState.advancedSettings = {};
    Object.entries(template.advancedSettings).forEach(([key, value]) => {
      templateState.advancedSettings![key] = value.default ?? '';
    });
  }
  return templateState;
};



const CheckboxComponent = ({ name, value, componentType }) => {
  const handleChange = (e) => {
    dispatch({
      type: componentType === 'basic' ? 'updateBasic' : 'updateAdvanced',
      payload: {
        key: name,
        value: e.target.checked,
      },
    });
  };
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input id={name} type="checkbox" onChange={handleChange} checked={value} />
    </div>
  );
};

const InputForm = ({ inputData }: { inputData: TemplateState }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{inputData.title}</CardTitle>
        <CardDescription>Convert and Resize Images</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <CheckboxComponent
          name="auto"
          value={inputData.advancedSettings.auto}
          componentType="advanced"
        />
      </CardContent>
      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
};

const ContainerContent = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 size-fit mx-auto">
      <Tabs defaultValue="Batch Sharp">
        <TabsList>
          <TabsTrigger value="Batch Sharp">Batch Sharp</TabsTrigger>
          <TabsTrigger value="Set Filetype">Set Filetype</TabsTrigger>
        </TabsList>
        <TabsContent value="Batch Sharp">
          <InputForm />
        </TabsContent>
        <TabsContent value="Set Filetype">
          <Card>
            <CardHeader>
              <CardTitle>Set Filetype</CardTitle>
              <CardDescription>Set data file type</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <span>Form Goes Here</span>
            </CardContent>
            <CardFooter>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContainerContent;
