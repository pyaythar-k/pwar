import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

interface Props {
  children: React.ReactNode;
}
export default function FormButton({ children }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {children}
    </Button>
  );
}
