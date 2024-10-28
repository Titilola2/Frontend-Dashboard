import React, { useEffect, useState } from "react";
import { colors } from "@/constant/data";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";

const Calculation = ({ height = 335 }) => {
  const [isDark] = useDarkMode();
  const [series, setSeries] = useState([0, 0, 0]); // Initialize series with zeros

  const fetchInfluencerData = async () => {
    try {
      const response = await fetch('https://influencers-o6yr.onrender.com/stats/new-dashboard');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    
      const data = await response.json();
      //console.log('Fetched Data:', data);

      const instagram = data.data.totalInfluencersProfileAcrossPlatform.instagram;
         const tiktok = data.data.totalInfluencersProfileAcrossPlatform.tiktok;
    const youtube = data.data.totalInfluencersProfileAcrossPlatform.youtube;

      //console.log('Instagram:', instagram, "Tiktok", tiktok, "Youtube", youtube);
      setSeries([instagram, youtube, tiktok]); 
    } catch (error) {
      console.error('Failed to fetch influencer data:', error);
    }
  };

  useEffect(() => {
    fetchInfluencerData(); // Fetch influencer data on mount
  }, []);


  const options = {
    labels: ["Instagram", "Youtube", "Tiktok"],
    dataLabels: {
      enabled: true,
    },
    colors: [colors.success, colors.warning, "#A3A1FB"],
    legend: {
      position: "bottom",
      fontSize: "12px",
      fontFamily: "Inter",
      fontWeight: 400,
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
      markers: {
        width: 6,
        height: 6,
        offsetY: -1,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <Chart options={options} series={series} type="pie" height={height} />
    </>
  );
};

export default Calculation;