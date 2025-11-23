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
import InputForm from './input-section';
import { inputGenerator } from './inputs';
import InputSection from './input-section';

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

const ContainerContent = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 size-fit mx-auto">
      <Tabs defaultValue="Batch Sharp">
        <TabsList>
          <TabsTrigger value="Batch Sharp">Batch Sharp</TabsTrigger>
          <TabsTrigger value="Set Filetype">Set Filetype</TabsTrigger>
        </TabsList>
        <TabsContent value="Batch Sharp">
          <InputSection />
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
