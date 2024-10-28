import React, { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import { minify } from "../../minify";



const GroupChart4 = () => {

  
  const [statistics, setStatistics] = useState([
    {
      title: "Total Influencers",
      count: "0", 
      bg: "bg-info-500",
      text: "text-info-500",
      percent: "25.67%",
      icon: "heroicons-outline:menu-alt-1",
    },
    {
      title: "Total Profiles",
      count: "0", 
      bg: "bg-warning-500",
      text: "text-warning-500",
      percent: "8.67%",
      icon: "heroicons-outline:chart-pie",
    },
    {
      title: "Uploaded Media",
      count: "0",
      bg: "bg-primary-500",
      text: "text-primary-500",
      percent: "1.67%",
      icon: "heroicons-outline:clock",
    },
    {
      title: "Total Followers",
      count: "0",
      bg: "bg-success-500",
      text: "text-success-500",
      percent: "11.67%",
      icon: "heroicons-outline:calculator",
    },
  ]);

  // Function to fetch statistics
  const fetchStatistics = async () => {
    try {
      const response = await fetch("https://influencers-o6yr.onrender.com/stats/new-dashboard");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const totalInfluencers = data.data.totalInfluencersAcrossPlatform; 
      const totalProfiles = data.data.totalInfluencersProfileAcrossPlatform.total; 
      const totalMedia = data.data.totalMediaAcrossPlatform.total; 
      const totalFollowers = data.data.totalFollowersAcrossPlatform.total; 

      // Update the statistics state
      setStatistics((prevStats) => {
        const updatedStats = [...prevStats];
        updatedStats[0].count = totalInfluencers.toString();
        updatedStats[1].count = totalProfiles.toString();
        updatedStats[2].count = minify(totalMedia);
        updatedStats[3].count = minify(totalFollowers);
        return updatedStats;
      });

      //console.log("Fetched data:", data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchStatistics();
  }, []);



  return (
    <>
      {statistics.map((item, i) => (
        <div
          key={i}
          className={`${item.bg} rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-50 text-center`}
        >
          <div
            className={`${item.text} mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 `}
          >
            <Icon icon={item.icon} />
          </div>
          <span className="block text-sm text-slate-600 font-medium dark:text-white mb-1">
            {item.title}
          </span>
          <span className="block mb- text-2xl text-slate-900 dark:text-white font-medium">
            {item.count}
          </span>
        </div>
      ))}
    </>
  );
};

export default GroupChart4;
