'use client';
import { createComment } from '@/actions';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import FormButton from '../common/form-button';

interface Props {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}
export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: Props) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    createComment.bind(null, { postId, parentId, startOpen }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  return (
    <div className="p-4">
      <Button size="sm" variant="outline" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && (
        <form action={action} ref={ref}>
          <div className="space-y-2 my-2">
            <Textarea name="content" placeholder="Enter your comment" />

            {formState.errors.content && (
              <div className="text-tertiaryColor text-sm">
                {formState.errors.content?.join('. ')}
              </div>
            )}

            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border rounded border-red-400">
                {formState.errors._form?.join(', ')}
              </div>
            ) : null}

            <FormButton>Create Comment</FormButton>
          </div>
        </form>
      )}
    </div>
  );
}
