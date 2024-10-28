import React, { useEffect, useState } from "react"; 
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";

const AreaSpaLine = () => {
  const [isDark] = useDarkMode();
 

  const [series, setSeries] = useState([
    {
      name: "Instagram",
      data: [0, 0, 0, 0, 0, 0, 0], 
    },
    {
      name: "Youtube",
      data: [0, 0, 0, 0, 0, 0, 0], 
    },
    {
      name: "Tiktok",
      data: [0, 0, 0, 0, 0, 0, 0], 
    },
  ]);

  
  const fetchInfluencerData = async () => {
    try {
      const response = await fetch('https://influencers-o6yr.onrender.com/stats/new-dashboard');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
  
     
      const instagramData = new Array(6).fill(0); // For Feb to Oct (9 months)
      const youtubeData = new Array(6).fill(0);
      const tiktokData = new Array(6).fill(0);
  
  
      data.data.totalMediaAcrossPlatform.monthlyBreakdown.forEach(item => {
        const monthIndex = item.month - 3; // Adjusting for Feb = 0
        if (monthIndex >= 0 && monthIndex < 7) {
          instagramData[monthIndex] = item.instagram;
          youtubeData[monthIndex] = item.youtube;
          tiktokData[monthIndex] = item.tiktok;
        }
      });
     // console.log("lll:", data.data.totalMediaAcrossPlatform.monthlyBreakdown);
    
      setSeries([
        { name: "Instagram", data: instagramData },
        { name: "Youtube", data: youtubeData },
        { name: "Tiktok", data: tiktokData },
      ]);
    } catch (error) {
      console.error('Failed to fetch influencer data:', error);
    }
  };

 // console.log(series);
  

  useEffect(() => {
    fetchInfluencerData(); 
  }, []);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#e2e8f0",
      strokeDashArray: 10,
      position: "back",
    },
    xaxis: {
      type: "category", // Change to category
      categories: [
        "April",   // Month names
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
      ],
      labels: {
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
    legend: {
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
      fontFamily: "Inter",
    },
    tooltip: {
      x: {
        format: "MMM", // Optional: format for tooltip
      },
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default AreaSpaLine;
