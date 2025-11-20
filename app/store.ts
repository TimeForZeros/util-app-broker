import { create } from 'zustand';

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

type Settings = Record<string, NumberInput | SelectInput | RangeInput | CheckInput> | null;

type InputTemplate = {
  title: string;
  id: string;
  basicSettings: Settings;
  advancedSettings?: Settings;
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

type InputState = {
  id: string;
  title: string;
  basicSettings: Settings;
  advancedSettings?: Settings;
};

type InputAction = {
  setBasicSettings: (newSettings: Settings) => void;
  setAdvancedSettings: (newSettings: Settings) => void;
};

const InputStore = create<InputState & InputAction>((set) => ({

}));
