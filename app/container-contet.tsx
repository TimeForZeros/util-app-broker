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

const ContainerContent = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 size-fit mx-auto">
      <Tabs defaultValue="Batch Sharp">
        <TabsList>
          <TabsTrigger value="Batch Sharp">Account</TabsTrigger>
          <TabsTrigger value="Set Filetype">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="Batch Sharp">
          <Card>
            <CardHeader>
              <CardTitle>Batch Sharp</CardTitle>
              <CardDescription>
                Convert and Resize Images
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <span>Form Goes Here</span>
            </CardContent>
            <CardFooter>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Set Filetype">
          <Card>
            <CardHeader>
              <CardTitle>Set Filetype</CardTitle>
              <CardDescription>
                Set data file type
              </CardDescription>
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
}

export default ContainerContent;