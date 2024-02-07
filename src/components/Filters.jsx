import { Card, Group, Loader, Select, TextInput } from "@mantine/core";
import React, { useMemo, useState } from "react";
import {
  useGetallDepartmentsQuery,
  useGetallFunctionsQuery,
  useGetallLocationsQuery,
  useJobOpeningsQuery,
} from "../redux/api";

function Filters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("");
  const {
    data: jobsData,

    isLoading: isJobsLoading,
  } = useJobOpeningsQuery();
  const {
    isFetching: isDeptFetching,
    data: deptsData,

    isLoading: isDeptLoading,
  } = useGetallDepartmentsQuery();
  const { data: locations } = useGetallLocationsQuery();

  const { data: jobFunctions } = useGetallFunctionsQuery();

  const jobsByDepartment = jobsData;

  console.log(jobsByDepartment);

  const filteredJobs = useMemo(() => {
    let filteredData = jobsByDepartment || [];

    // Apply search filter
    filteredData = Object.keys(filteredData).reduce((acc, department) => {
      acc[department] = filteredData[department].filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return acc;
    }, {});

    // Apply department filter
    if (selectedDepartment) {
      filteredData = {
        [selectedDepartment]: filteredData[selectedDepartment] || [],
      };
    }

    // Apply location filter
    if (selectedLocation) {
      filteredData = Object.keys(filteredData).reduce((acc, department) => {
        acc[department] = filteredData[department].filter(
          (job) => job.location?.title === selectedLocation
        );
        return acc;
      }, {});
    }

    // Apply function filter
    if (selectedFunction) {
      filteredData = Object.keys(filteredData).reduce((acc, department) => {
        acc[department] = filteredData[department].filter(
          (job) => job.jobFunction?.title === selectedFunction
        );
        return acc;
      }, {});
    }

    return filteredData;
  }, [
    jobsByDepartment,
    searchQuery,
    selectedDepartment,
    selectedLocation,
    selectedFunction,
  ]);

  const options = useMemo(() => {
    const departments = deptsData || [];
    return (
      departments?.map((department) => ({
        value: department.id.toString(),
        label: department.title,
      })) || []
    );
  }, [deptsData]);

  const locationOptions = useMemo(() => {
    const location = locations || [];
    return (
      location?.map((location) => ({
        value: location.id.toString(),
        label: location.title,
      })) || []
    );
  }, [locations]);

  const functionOptions = useMemo(() => {
    const jobFunction = jobFunctions || [];
    return (
      jobFunction?.map((jobfunc) => ({
        value: jobfunc.id.toString(),
        label: jobfunc.title,
      })) || []
    );
  }, [jobFunctions]);

  if (isDeptLoading || isDeptFetching) {
    return <Loader></Loader>;
  }
  return (
    <>
      <Card padding="lg" radius="md" sx={{ backgroundColor: "#f4f4f4" }}>
        <TextInput
          placeholder="Search for Jobs..."
          value={selectedDepartment}
          onChange={(value) => setSelectedDepartment(value)}
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
          <Select data={options} withinPortal placeholder="Department"></Select>
          <Select
            data={locationOptions}
            withinPortal
            placeholder="Location"
          ></Select>
          <Select
            data={functionOptions}
            withinPortal
            placeholder="Function"
          ></Select>
        </Group>
      </Card>

      <Card
        padding="lg"
        radius="md"
        sx={{ backgroundColor: "#f4f4f4", marginTop: "10px" }}
      >
        {/* <MultiSelect data={data} withinPortal /> */}
      </Card>
    </>
  );
}

export default Filters;
