'use client';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { createTopic } from '@/actions';
import { useFormState } from 'react-dom';
import FormButton from '../common/form-button';

export default function TopicCreateForm() {
  const [formState, action] = useFormState(createTopic, { errors: {} });

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Create a Topic</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form
            action={action}
            className="flex flex-col gap-4 w-full align-items justify-start"
          >
            <DialogHeader>
              <DialogTitle>Create New Topic</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your toipc name..."
                className="col-span-3"
              />
            </div>
            {formState.errors.name && (
              <div className="text-tertiaryColor text-sm">
                {formState.errors.name?.join('. ')}
              </div>
            )}
            <div className="flex flex-col gap-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your topic..."
                className="col-span-3"
              />
            </div>
            {formState.errors.description && (
              <div className="text-tertiaryColor text-sm">
                {formState.errors.description?.join('. ')}
              </div>
            )}

            <DialogFooter>
              <FormButton>Save changes</FormButton>
            </DialogFooter>
            {formState.errors._form && (
              <div className="text-tertiaryColor text-sm">
                {formState.errors._form?.join('. ')}
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
