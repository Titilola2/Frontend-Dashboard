import React, { useState, useMemo,  useEffect } from "react";
import { teamData } from "../../../constant/table-data";
import tiktokIcon from "@/assets/images/icon/tiktok.svg";
import instagramIcon from "@/assets/images/icon/instagram.png";
import youtubeIcon from "@/assets/images/icon/youtube.svg";
import { minify } from "../minify";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import Chart from "react-apexcharts";
import { colors } from "@/constant/data";

import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

const series = [
  {
    data: [800, 600, 1000, 800, 600, 1000, 800, 900],
  },
];
const images = [
 tiktokIcon,
 instagramIcon,
 youtubeIcon,
];
const options = {
  chart: {
    toolbar: {
      autoSelected: "pan",
      show: false,
    },
    offsetX: 0,
    offsetY: 0,
    zoom: {
      enabled: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  colors: [colors.primary],
  tooltip: {
    theme: "light",
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  yaxis: {
    show: false,
  },
  fill: {
    type: "solid",
    opacity: [0.1],
  },
  legend: {
    show: false,
  },
  xaxis: {
    low: 0,
    offsetX: 0,
    offsetY: 0,
    show: false,
    labels: {
      low: 0,
      offsetX: 0,
      show: false,
    },
    axisBorder: {
      low: 0,
      offsetX: 0,
      show: false,
    },
  },
};

const actions = [
  {
    name: "view",
    icon: "heroicons-outline:eye",
  },
  {
    name: "edit",
    icon: "heroicons:pencil-square",
  },
  {
    name: "delete",
    icon: "heroicons-outline:trash",
  },
];
const COLUMNS = [
  {
    Header: "profile picture",
    accessor: "picture",
    Cell: ({ cell: { value } }) => {
      return <span className="flex items-center min-w-[30px]">
      <span className="w-8 h-8 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
        <img
          src={value}
          alt={value.name}
          className="object-cover w-full h-full rounded-full"
        />
      </span>
    </span>;
    },
  },
  {
    Header: "Full Name",
    accessor: "customer",
    Cell: (row) => {
      return (
        <span className="flex items-center min-w-[120px]">
          <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
            {row?.cell?.value.name}
          </span>
        </span>
      );
    },
  },
 
  {
    Header: "active plaform",
    accessor: "active_platform",
    Cell: ({ cell: { value } }) => {
      return <span className="flex space-x-1">{value}</span>; 
    },
  },
  {
    Header: "total subscribers",
    accessor: "total_subscribers",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "total media",
    accessor: "total_media",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Latest subscribers",
    accessor: "last_subscribers",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  
  {
    Header: "latest uploads",
    accessor: "status",
    Cell: (row) => {
      return (
        <span>{row?.cell?.value}</span>
      );
    },
  },
 
];

const updateTeamData = (influencerStats) => {
  const updatedTeamData = teamData.map((teamMember, index) => {
    const influencer = influencerStats[index]; // Assuming the order matches
    const activePlatforms = Object.keys(influencer.activePlatforms)
      .filter(platform => influencer.activePlatforms[platform] === 'active');

    // Map active platforms to their corresponding icons
    const platformIcons = activePlatforms.map(platform => {
      switch (platform) {
        case "instagram":
          return <img className="h-[20px] w-[20px] mx-[2px] "key="instagram" src={instagramIcon} alt="Instagram"  />;
        case "youtube":
          return <img className="h-[20px] w-[20px] mx-[2px] "key="youtube" src={youtubeIcon} alt="YouTube" />;
        case "tiktok":
          return <img className="h-[20px] w-[20px] mx-[2px] "key="tiktok" src={tiktokIcon} alt="TikTok" />;
        default:
          return null;
      }
    });

    return {
      ...teamMember,
      customer: {
        ...teamMember.customer,
        name: influencer.name,
        image: influencer.profileImage, // Fallback to existing image if none
      },
      picture: influencer.profileImage,
      active_platform: platformIcons,
      total_subscribers: minify(influencer.totalFollowers),
      total_media: influencer.totalUploadedMedia.toString(),
      last_subscribers: influencer.lastsubscribers,
      last_uploads:influencer.lastuploads,
    };
  });

  return updatedTeamData;
};




const TeamTable = () => {

  const [influencerStats, setInfluencerStats] = useState([]);
  const [updatedTeamData, setUpdatedTeamData] = useState([]);

  const getDashboardStats = async () => {
    try {
      const response = await fetch('https://influencers-o6yr.onrender.com/stats/new-dashboard');
      
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Extract the influencer data breakdown
      const influencers = data.data.influencerDataBreakdown.map(influencer => ({
        name: influencer.name,
        profileImage: influencer.profileImage,
        activePlatforms: influencer.activePlatforms,
        totalUploadedMedia: influencer.uploadedMedia.total,
        totalFollowers: influencer.followers.total,
        lastsubscribers: influencer.weeklyMediaUploads.tiktok,
        lastuploads:influencer.weeklySubscribers.tiktok,
      }));

      // Update the state with the extracted influencer stats
      setInfluencerStats(influencers);
      setUpdatedTeamData(updateTeamData(influencers));
     
    } catch (error) {
      console.error(error);
    }
  };

  
 

  useEffect(() => {
    getDashboardStats();
  }, [updateTeamData]);

  useEffect(() => {
    console.log("new", updatedTeamData);
  }, [updatedTeamData]);
  //console.log("old:", teamData);

  const columns = useMemo(() => COLUMNS, []);
const data = useMemo(() => updatedTeamData, [updatedTeamData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  

  const { pageIndex, pageSize } = state;

  return (
    <>
      <div className=" ">
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" bg-slate-100 dark:bg-slate-700">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="table-td py-2"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamTable;
