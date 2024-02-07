import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Loader,
  Select,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
// eslint-disable-next-line no-unused-vars
import React, { useMemo, useState } from "react";
import Page from "../components/Page";
import JobOpenings from "../components/JobOpenings";
import {
  useGetallDepartmentsQuery,
  useGetallFunctionsQuery,
  useGetallLocationsQuery,
  useJobOpeningsQuery,
} from "../redux/api";
import { IconX } from "@tabler/icons-react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("");

  const { data: jobsData, isLoading: isJobsLoading } = useJobOpeningsQuery();
  const {
    isFetching: isDeptFetching,
    data: deptsData,
    isLoading: isDeptLoading,
  } = useGetallDepartmentsQuery();
  const { data: locations } = useGetallLocationsQuery();

  const { data: jobFunctions } = useGetallFunctionsQuery();

  const jobsByDepartment = jobsData;

  const onDeptChange = (event) => {
    setSelectedDepartment(event);
  };

  const onLocationChange = (event) => {
    setSelectedLocation(event);
  };
  const onFunctionChange = (event) => {
    setSelectedFunction(event);
  };

  let appliedFilter = [];

  const filteredJobs = useMemo(() => {
    let filteredData = jobsByDepartment || [];

    // Apply search filter
    filteredData = Object.keys(filteredData).reduce((acc, department) => {
      acc[department] = filteredData[department].filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log(filteredData);
      return acc;
    }, {});

    // Apply department filter
    if (selectedDepartment) {
      console.log(selectedDepartment);
      filteredData = {
        [selectedDepartment]: filteredData[selectedDepartment] || [],
      };

      appliedFilter.push({ key: "department", value: selectedDepartment });
    }

    // Apply location filter
    // if (selectedLocation) {
    //   filteredData = Object.keys(filteredData).reduce((acc, department) => {
    //     acc[department] = filteredData[department].filter(
    //       (job) => job.location?.title === selectedLocation
    //     );
    //     appliedFilter.push({ key: "location", value: selectedLocation });
    //     return acc;
    //   }, {});
    // }

    if (selectedLocation) {
      filteredData = {};
      Object.keys(jobsByDepartment).forEach((department) => {
        const filteredJobs = jobsByDepartment[department].filter(
          (job) => job.location?.title === selectedLocation
        );

        if (filteredJobs.length > 0) {
          filteredData[department] = filteredJobs;
        }
      });

      appliedFilter.push({ key: "location", value: selectedLocation });
    }

    // Apply function filter
    // if (selectedFunction) {
    //   filteredData = Object.keys(filteredData).reduce((acc, department) => {
    //     acc[department] = filteredData[department].filter(
    //       (job) => job.jobFunction?.title === selectedFunction
    //     );
    //     appliedFilter.push({ key: "function", value: selectedFunction });
    //     return acc;
    //   }, {});
    // }
    // Apply function filter
    if (selectedFunction) {
      filteredData = {};
      Object.keys(jobsByDepartment).forEach((department) => {
        const filteredJobs = jobsByDepartment[department].filter(
          (job) => job.jobFunction?.title === selectedFunction
        );

        if (filteredJobs.length > 0) {
          filteredData[department] = filteredJobs;
        }
      });

      appliedFilter.push({ key: "function", value: selectedFunction });
    }

    return filteredData;
  }, [
    jobsByDepartment,
    selectedDepartment,
    selectedLocation,
    selectedFunction,
    searchQuery,
    appliedFilter,
  ]);

  const options = useMemo(() => {
    const departments = deptsData || [];
    console.log(departments);
    return (
      departments?.map((department) => ({
        value: department.title,
        label: department.title,
      })) || []
    );
  }, [deptsData]);

  const locationOptions = useMemo(() => {
    const location = locations || [];
    return (
      location?.map((location) => ({
        value: location.title,
        label: location.title,
      })) || []
    );
  }, [locations]);

  const functionOptions = useMemo(() => {
    const jobFunction = jobFunctions || [];
    return (
      jobFunction?.map((jobfunc) => ({
        value: jobfunc.title,
        label: jobfunc.title,
      })) || []
    );
  }, [jobFunctions]);

  const removeFilter = (filterType) => {
    let updatedFilter = appliedFilter.filter((filter) => filter !== filterType);
    console.log(filterType);
    switch (filterType) {
      case "department":
        setSelectedDepartment("");
        break;
      case "location":
        setSelectedLocation("");
        break;
      case "function":
        setSelectedFunction("");
        break;
      default:
        break;
    }

    appliedFilter = updatedFilter;
  };

  return (
    <Page size="md">
      <Card pb={30}>
        <Title order={1} align="center" color="#24537b" fw="normal">
          Discover your next role
        </Title>
        <Title order={4} align="center" fw="lighter">
          We are looking for smart, talented professionals with an obsession for
          building quality software products.
        </Title>
      </Card>
      {isDeptLoading || isDeptFetching ? (
        <Page size="sm">
          <Loader />
        </Page>
      ) : (
        <Card padding="lg" radius="md" sx={{ backgroundColor: "#f4f4f4" }}>
          <TextInput
            placeholder="Search for Jobs..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
          />
          <Group
            grow
            position="apart"
            my={20}
            sx={{
              flexWrap: "nowrap",
              "@media (max-width: 425px)": {
                flexWrap: "wrap",
              },
            }}
          >
            <Select
              data={options}
              withinPortal
              placeholder="Department"
              value={selectedDepartment}
              onChange={onDeptChange}
            ></Select>
            <Select
              data={locationOptions}
              withinPortal
              placeholder="Location"
              value={selectedLocation}
              onChange={onLocationChange}
            ></Select>
            <Select
              data={functionOptions}
              withinPortal
              placeholder="Function"
              value={selectedFunction}
              onChange={onFunctionChange}
            ></Select>
          </Group>
        </Card>
      )}

      {selectedDepartment || selectedFunction || selectedLocation ? (
        <Card
          padding="lg"
          radius="md"
          sx={{ backgroundColor: "#f4f4f4", marginTop: "10px" }}
        >
          {appliedFilter.map((filter, index) => (
            <Badge
              key={index}
              variant="outline"
              rightSection={
                <ActionIcon
                  size="xs"
                  color="blue"
                  radius="xl"
                  variant="transparent"
                  onClick={() => removeFilter(filter.key)}
                >
                  <IconX size={rem(10)} />
                </ActionIcon>
              }
            >
              {filter.value}
            </Badge>
          ))}
        </Card>
      ) : null}
      <JobOpenings data={filteredJobs} isLoading={isJobsLoading} />
    </Page>
  );
};

export default Home;
