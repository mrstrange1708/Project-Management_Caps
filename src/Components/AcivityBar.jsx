import React, { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import dayjs from "dayjs";

const ActivityBar = ({ projects }) => {
  const [options, setOptions] = useState({});
  useEffect(() => {
    if (!projects || !Array.isArray(projects)) return;
    const now = dayjs();
    const fourMonthsLater = now.add(4, "month");

    const filteredProjects = projects.filter((project) => {
      const start = dayjs(project.start);
      return (
        (start.isBefore(fourMonthsLater))

      );
    });

    const groupedByMonth = {};
    filteredProjects.forEach((project) => {
      const month = dayjs(project.start).format("MMMM");
      if (!groupedByMonth[month]) {
        groupedByMonth[month] = { easy: 0, medium: 0, hard: 0 };
      }
      const priority = project.priority?.toLowerCase();
      if (["easy", "medium", "hard"].includes(priority)) {
        groupedByMonth[month][priority] += 1;
      }
    });

    const data = Object.entries(groupedByMonth).map(([month, counts]) => ({
      month,
      easy: counts.easy ?? 0,
      medium: counts.medium ?? 0,
      hard: counts.hard ?? 0,
    }));

    setOptions({
      title: {
        text: "Progress Bar",
      },
      data,
      series: [
        {
          type: "bar",
          xKey: "month",
          yKey: "easy",
          yName: "Easy",
          fill: "green",
        },
        {
          type: "bar",
          xKey: "month",
          yKey: "medium",
          yName: "Medium",
          fill: "orange",
        },
        {
          type: "bar",
          xKey: "month",
          yKey: "hard",
          yName: "Hard",
          fill: "red",
        },
      ],
    });
  }, [projects]);

  return <AgCharts options={options}  />;
};

export default ActivityBar;
