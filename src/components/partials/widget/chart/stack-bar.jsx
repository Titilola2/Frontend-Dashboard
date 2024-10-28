import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { colors } from "@/constant/data";

const StackBarChart = ({ height = 410 }) => {
  const [isDark] = useDarkMode();
  const [series, setSeries] = useState([
    {
      name: "instagram",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    },
    {
      name: "youtube",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    },
    {
      name: "tiktok",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0], 
    },
  ]);

  
  const fetchInfluencerData = async () => {
    try {
      const response = await fetch('https://influencers-o6yr.onrender.com/stats/new-dashboard');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
  
      // Initialize arrays for the data
      const instagramData = new Array(9).fill(0); // For Feb to Oct (9 months)
      const youtubeData = new Array(9).fill(0);
      const tiktokData = new Array(9).fill(0);
  
      // Map the response data to the corresponding month index
      data.data.totalMediaAcrossPlatform.monthlyBreakdown.forEach(item => {
        const monthIndex = item.month - 2; // Adjusting for Feb = 0
        if (monthIndex >= 0 && monthIndex < 9) {
          instagramData[monthIndex] = item.instagram;
          youtubeData[monthIndex] = item.youtube;
          tiktokData[monthIndex] = item.tiktok;
        }
      });
  
    
      setSeries([
        { name: "instagram", data: instagramData },
        { name: "youtube", data: youtubeData },
        { name: "tiktok", data: tiktokData },
      ]);
    } catch (error) {
      console.error('Failed to fetch influencer data:', error);
    }
  };

  //console.log(series);

  useEffect(() => {
    fetchInfluencerData(); 
  }, []);

  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "55%",
      },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontFamily: "Inter",
      offsetY: 0,
      markers: {
        width: 6,
        height: 6,
        offsetY: 0,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 18,
        vertical: 0,
      },
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
      labels: {
        offsetY: -3,
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
    colors: [colors.primary, colors.info, colors.warning],
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#E2E8F0",
      strokeDashArray: 10,
      position: "back",
    },
  };

  return (
    <>
      <Chart options={options} series={series} type="bar" height={height} />
    </>
  );
};

export default StackBarChart;
