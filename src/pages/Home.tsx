import { Button, Result } from "antd";
import React from "react";

const Home: React.FC = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Home</Button>}
  />
);

export default Home;
