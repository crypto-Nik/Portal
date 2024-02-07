import { Container } from "@mantine/core";

// eslint-disable-next-line react/prop-types
const Page = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Page;
