import React, { useEffect, useState, useContext } from "react";
import { AgCharts } from "ag-charts-react";
import dayjs from "dayjs";
import { TheamContext } from '../App';
import { BarChart3, TrendingUp } from 'lucide-react';

const ActivityBar = ({ projects }) => {
  const { theam } = useContext(TheamContext);
  const [options, setOptions] = useState({});
  const [totalTasks, setTotalTasks] = useState(0);
  const [monthlyGrowth, setMonthlyGrowth] = useState(0);

  useEffect(() => {
    if (!projects || !Array.isArray(projects)) return;
    
    const now = dayjs();
    const fourMonthsLater = now.add(4, "month");
    const lastMonth = now.subtract(1, "month");

    const filteredProjects = projects.filter((project) => {
      const start = dayjs(project.start);
      return start.isBefore(fourMonthsLater);
    });

    const currentMonthTasks = filteredProjects.filter(project => 
      dayjs(project.start).isAfter(now.startOf('month'))
    ).length;

    const lastMonthTasks = filteredProjects.filter(project => 
      dayjs(project.start).isAfter(lastMonth.startOf('month')) &&
      dayjs(project.start).isBefore(now.startOf('month'))
    ).length;

    setTotalTasks(currentMonthTasks);
    setMonthlyGrowth(lastMonthTasks ? 
      ((currentMonthTasks - lastMonthTasks) / lastMonthTasks) * 100 
      : 0
    );

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

    const monthsOrder = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const data = monthsOrder
      .filter((month) => groupedByMonth[month])
      .map((month) => ({
        month,
        Easy: groupedByMonth[month].easy ?? 0,
        Medium: groupedByMonth[month].medium ?? 0,
        Hard: groupedByMonth[month].hard ?? 0,
      }));

    setOptions({
      theme: {
        palette: {
          fills: ['#22c55e', '#f97316', '#ef4444'],
          strokes: ['#22c55e', '#f97316', '#ef4444'],
        },
        overrides: {
          bar: {
            series: {
              strokeWidth: 0,
              highlightStyle: {
                item: {
                  fill: ['#22c55e', '#f97316', '#ef4444'],
                  strokeWidth: 0,
                },
              },
            },
          },
        },
      },
      background: {
        fill: 'transparent',
      },
      data,
      series: [
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'Easy',
          yName: 'Easy',
          stacked: true,
          cornerRadius: 3,
          tooltip: {
            renderer: (params) => {
              return `<div style="padding: 4px 8px;"><b>Easy Tasks:</b> ${params.datum.Easy}</div>`;
            },
          },
        },
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'Medium',
          yName: 'Medium',
          stacked: true,
          cornerRadius: 3,
          tooltip: {
            renderer: (params) => {
              return `<div style="padding: 4px 8px;"><b>Medium Tasks:</b> ${params.datum.Medium}</div>`;
            },
          },
        },
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'Hard',
          yName: 'Hard',
          stacked: true,
          cornerRadius: 3,
          tooltip: {
            renderer: (params) => {
              return `<div style="padding: 4px 8px;"><b>Hard Tasks:</b> ${params.datum.Hard}</div>`;
            },
          },
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Months',
            enabled: false,
          },
          label: {
            color: theam ? '#e5e7eb' : '#374151',
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
          },
          line: {
            color: theam ? 'rgba(107, 114, 128, 0.3)' : 'rgba(209, 213, 219, 0.5)',
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Tasks',
            enabled: false,
          },
          label: {
            color: theam ? '#e5e7eb' : '#374151',
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
          },
          line: {
            color: theam ? 'rgba(107, 114, 128, 0.3)' : 'rgba(209, 213, 219, 0.5)',
          },
          tick: {
            color: theam ? 'rgba(107, 114, 128, 0.3)' : 'rgba(209, 213, 219, 0.5)',
          },
        },
      ],
      legend: {
        position: 'top',
        spacing: 40,
        item: {
          label: {
            color: theam ? '#e5e7eb' : '#374151',
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
          },
          marker: {
            padding: 8,
            shape: 'square',
            cornerRadius: 3,
          },
        },
      },
    });
  }, [projects, theam]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className={`rounded-lg p-3 ${theam ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={18} className="text-blue-500" />
            <span className="text-sm font-medium">Total Projects</span>
          </div>
          <div className="text-xl font-bold">{totalTasks}</div>
          <div className={`text-xs ${theam ? 'text-gray-400' : 'text-gray-600'}`}>
            This month
          </div>
        </div>
        
        <div className={`rounded-lg p-3 ${theam ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={18} className={monthlyGrowth >= 0 ? 'text-green-500' : 'text-red-500'} />
            <span className="text-sm font-medium">Monthly Growth</span>
          </div>
          <div className={`text-xl font-bold ${
            monthlyGrowth >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {monthlyGrowth >= 0 ? '+' : ''}{monthlyGrowth.toFixed(1)}%
          </div>
          <div className={`text-xs ${theam ? 'text-gray-400' : 'text-gray-600'}`}>
            vs last month
          </div>
        </div>
      </div>

      <div className="flex-1 w-full" style={{ minHeight: '200px' }}>
        <AgCharts 
          options={{
            ...options,
            width: '100%',
            height: '100%',
            autoSize: true,
            container: {
              width: '100%',
              height: '100%'
            },
            padding: {
              top: 20,
              right: 20,
              bottom: 20,
              left: 40
            }
          }} 
        />
      </div>
    </div>
  );
};

export default ActivityBar;
