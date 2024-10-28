import React, { useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Menu } from "@headlessui/react";

const actions = [
  { name: "mixed" },
  { name: "instagram" },
  { name: "youtube" },
  { name: "tiktok" },
];

const SelectSocialMedia = ({ onSelect }) => {
  const [selected, setSelected] = useState("mixed");


  const handleSelect = (platform) => {
    setSelected(platform);
    onSelect(platform); // Call onSelect with the selected platform
  };

  return (
    <Dropdown
      classMenuItems="w-[140px]"
      label={
        <span className="inline-flex items-center space-x-2 text-slate-900 dark:text-slate-400">
          <Icon icon="heroicons-outline:dots-horizontal" />
         
        </span>
      }
    >
      <div>
        {actions.map((item, i) => (
          <Menu.Item key={i}>
            <div
              className="hover:bg-secondary-500 dark:hover:bg-slate-600 hover:text-white text-slate-900 dark:text-slate-300
                w-full px-4 py-2 text-sm cursor-pointer flex items-center"
              onClick={() => handleSelect(item.name)} // Pass the selected item to handleSelect
            >
              <span>{item.name}</span>
            </div>
          </Menu.Item>
        ))}
      </div>
    </Dropdown>
  );
};

export default SelectSocialMedia;
