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
import { createPost, createTopic } from '@/actions';
import { useFormState } from 'react-dom';
import FormButton from '../common/form-button';

interface Props {
  slug: string;
}
export default function PostCreateForm({ slug }: Props) {
  const [formState, action] = useFormState(createPost.bind(null, slug), {
    errors: {},
  });
  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Create a Post</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form
            action={action}
            className="flex flex-col gap-4 w-full align-items justify-start"
          >
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter your post title..."
                className="col-span-3"
              />
            </div>
            {formState.errors.title && (
              <div className="text-tertiaryColor text-sm">
                {formState.errors.title?.join('. ')}
              </div>
            )}
            <div className="flex flex-col gap-4">
              <Label htmlFor="description">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Describe your topic content..."
                className="col-span-3"
              />
            </div>
            {formState.errors.content && (
              <div className="text-tertiaryColor text-sm">
                {formState.errors.content?.join('. ')}
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
