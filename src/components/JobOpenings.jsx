// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Button,
  Card,
  Divider,
  Group,
  Loader,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import Page from "./Page";
import { IconBuilding, IconMapPinFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const JobOpenings = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const jobsByDepartment = data;

  if (isLoading) {
    return (
      <Page>
        <Loader size="xl" />
      </Page>
    );
  }

  return (
    <>
      {Object.entries(jobsByDepartment).map(([department, departmentJobs]) => {
        if (!departmentJobs.length) {
          return null;
        }
        return (
          <Paper key={department} pt={40}>
            <Title order={2} underline>
              {department}
            </Title>
            {departmentJobs.map((job) => (
              <Card key={job.id} padding={0} radius="md" my={20}>
                <Title order={3} fw="normal">
                  {job.title}
                </Title>
                <Divider />

                <Group
                  position="left"
                  my={20}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "nowrap",
                    "@media (max-width: 425px)": {
                      flexWrap: "wrap",
                    },
                  }}
                >
                  <Group>
                    <Text>
                      <IconBuilding size={20} sx={{ alignItems: "baseline" }} />
                      {job.department?.title ?? "Other"}
                    </Text>

                    <Text>
                      <IconMapPinFilled size={20} />
                      {job.location.state}
                    </Text>
                  </Group>
                  <Group position="right">
                    <Button
                      onClick={() => {
                        navigate(`/jobs/${job.id}`);
                      }}
                    >
                      view
                    </Button>
                    <Button
                      onClick={() => (window.location.href = job.applyUrl)}
                    >
                      Apply
                    </Button>
                  </Group>
                </Group>
              </Card>
            ))}
          </Paper>
        );
      })}
    </>
  );
};

export default JobOpenings;
