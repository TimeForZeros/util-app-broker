import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CheckboxComponent,
  NumberComponent,
  RangeComponent,
  SelectComponent,
  TextComponent,
} from './inputs';
import { Button } from '@/components/ui/button';

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

const InputSection = ({ inputData }: { inputData: TemplateState }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{inputData.title}</CardTitle>
        <CardDescription>Convert and Resize Images</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        
      </CardContent>
      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
};

export default InputSection;
