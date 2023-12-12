import { ElementType } from 'react';

type TestProps = {
  message: string;
};

const Test: ElementType<TestProps> = (props: TestProps) => {
  const { message } = props;
  return (
    <div>
      <p> {message}</p>
    </div>
  );
};

export default Test;
