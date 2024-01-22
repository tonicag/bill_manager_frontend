import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "../icons/searchIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import ArrowUpIcon from "../icons/ArrowUpIcon";
export interface Option {
  name: string;
  value: string;
}
export interface SearchableDropdownProps {
  options: Option[];
  onInput: (value: string) => void;
  onSelected: (option: Option) => void;
  placeholder?: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  onInput,
  onSelected,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event: React.MouseEvent | MouseEvent) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as HTMLDivElement).contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative bg-slate-600 rounded-lg">
      <div className="w-full flex flex-row p-2">
        <div className="w-6 flex justify-center items-center">
          <SearchIcon className="w-5 h-5 text-white"></SearchIcon>
        </div>
        <input
          value={inputValue}
          onInput={(e) => {
            setOpen(true);
            setInputValue(e.currentTarget.value);
            onInput(e.currentTarget.value);
          }}
          className="ml-1 mr-1 outline-none bg-transparent w-full text-white blur:border .placeholder-white"
          type="text"
          placeholder={placeholder || ""}
        />
        <div
          onClick={() => {
            setOpen((o) => !o);
          }}
          className="w-6 cursor-pointer"
        >
          {!isOpen ? (
            <ArrowDownIcon className="w-6 h-6 text-white"></ArrowDownIcon>
          ) : (
            <ArrowUpIcon className="w-6 h-6 text-white"></ArrowUpIcon>
          )}
        </div>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute flex flex-col gap-1 w-full z-100 mt-[1px] rounded bg-slate-700 max-h-[30vh] overflow-y-auto z-50"
        >
          {options.length ? (
            options.map((o) => (
              <div
                className="text-white rounded-lg p-2 hover:bg-slate-400 cursor-pointer"
                key={o.value}
                onClick={() => {
                  onSelected(o);
                  setInputValue(o.name);
                  setOpen(false);
                }}
              >
                {o.name}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center text-white rounded-lg p-2 hover:bg-slate-400 italic">
              {" "}
              No results!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
