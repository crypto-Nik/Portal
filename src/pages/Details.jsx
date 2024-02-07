import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Loader,
  Paper,
  Text,
  Title,
} from "@mantine/core";
// eslint-disable-next-line no-unused-vars
import React from "react";
import DOMPurify from "dompurify";
import Page from "../components/Page";
import { IconBuilding, IconMapPinFilled } from "@tabler/icons-react";
import { useGetJobDetailsQuery, useJobOpeningsQuery } from "../redux/api";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
const Details = () => {
  const matches = useMediaQuery("(min-width: 26.00em)");
  const { id } = useParams();
  const { data, isLoading } = useGetJobDetailsQuery(id);
  const { data: otherJobs, isLoading: isOtherJobsLoading } =
    useJobOpeningsQuery();

  if (isLoading || isOtherJobsLoading) {
    return (
      <Page>
        <Loader size="xl" />
      </Page>
    );
  }

  let testData = Object.values(otherJobs || {}).flat();

  const sanitizedHTML = DOMPurify.sanitize(data.description);

  return (
    <Page size="lg">
      <Card>
        <Title order={4} color="#24537b" fw="normal">
          {data.department.title} Department At Teknorix Systems
        </Title>
        <Title order={2} fw="lighter">
          {data.title}
        </Title>
        <Group>
          <Text>
            <IconBuilding size={20} sx={{ alignItems: "baseline" }} />
            {data.department.title}
          </Text>

          <Text>
            <IconMapPinFilled size={20} />
            {data.location.title}
          </Text>
          <Badge>{data.type}</Badge>
        </Group>
        <Button
          mt={20}
          component="a"
          rel="noopener noreferrer"
          target="_blank"
          href={data.applyUrl}
        >
          Apply
        </Button>
        <Divider mt={40} />
      </Card>

      <Grid>
        <Grid.Col span={matches ? 12 : 8}>
          <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></div>
        </Grid.Col>
        <Grid.Col span={matches ? 12 : 8}>
          <Card sx={{ backgroundColor: "#f4f4f4" }} p={40}>
            <Title order={4} underline mb={20}>
              Other Openings
            </Title>
            {testData.map((job) => {
              return (
                <>
                  <Paper sx={{ backgroundColor: "#f0f3fb" }} mb={40}>
                    <Title order={6} mb={10}>
                      {job.title}
                    </Title>
                    <Group>
                      <Text>
                        <IconBuilding
                          size={20}
                          sx={{ alignItems: "baseline" }}
                        />
                        {job.department?.title ?? "Other"}
                      </Text>

                      <Text>
                        <IconMapPinFilled size={20} />
                        {job.location.state}
                      </Text>
                    </Group>
                  </Paper>
                </>
              );
            })}
          </Card>
        </Grid.Col>
      </Grid>
    </Page>
  );
};

export default Details;
