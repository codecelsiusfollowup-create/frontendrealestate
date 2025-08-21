import React, { useState, useEffect, useRef } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ChevronDown, Search } from 'lucide-react';
import axios from 'axios';

const propertyTypesList = [
  'Flat/Apartment',
  'Independent/Builder Floor',
  'Independent House/Villa',
  'Residential Land',
  '1 RK/ Studio Apartment',
  'Farm House',
  'Serviced Apartments',
  'Other',
];

const bedroomList = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'];
const statusList = ['Ready to Move', 'Under Construction'];
const postedByList = ['Owner', 'Dealer'];

export default function FilterPanel({ onSearchResults }) {
  const [openTab, setOpenTab] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([...propertyTypesList]);
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPostedBy, setSelectedPostedBy] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Buy');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');


  const dropdownRef = useRef();
  const panelRef = useRef();
  const inputRef = useRef();

  const toggleCheckbox = (item, setState, stateList) => {
    setState(
      stateList.includes(item)
        ? stateList.filter((i) => i !== item)
        : [...stateList, item]
    );
  };

  const clearAll = () => {
    setSelectedTypes([]);
    setSelectedBedrooms([]);
    setSelectedStatus([]);
    setSelectedPostedBy([]);
    setPriceRange([0, 100]);
  };

  const mapBedroomsToNumber = (bedrooms) => {
    return bedrooms.map(b => {
      if (b === '4+ BHK') return 4;
      return parseInt(b.split(' ')[0]);
    });
  };

 const search = async () => {
  try {
    const payload = {
      selectedTypes,
      selectedBedrooms,
      selectedStatus,
      selectedPostedBy,
      priceRange,
      intent: selectedOption,
      keyword: searchKeyword,
    };

    const res = await axios.post("https://a-new-vercel.vercel.app/api/search", payload);

    console.log("Search Result:", res.data);
    const results = res.data?.properties || [];
    onSearchResults(results); // Send to parent component
    setShowFilterPanel(false);
  } catch (error) {
    console.error("Search failed:", error);
  }
};





  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !panelRef.current?.contains(event.target) &&
        !inputRef.current?.contains(event.target)
      ) {
        setOpenTab(null);
        setShowFilterPanel(false);
      }

      if (!dropdownRef.current?.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const residentialOptions = ['Sell', 'Rent', 'Lease', 'PG'];
  const commercialOptions = ['Sell', 'Rent', 'Lease'];

  return (
    <>
      <div
        className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md shadow-sm p-2 px-4 w-full mx-auto mt-6 mb-4 relative"
        ref={dropdownRef}
      >
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center text-sm font-medium text-gray-800 focus:outline-none"
          >
            {selectedOption}
            <ChevronDown className="ml-1 w-4 h-4" />
          </button>

          {showDropdown && (
            <div className="absolute left-0 z-50 mt-2 w-44 bg-white border border-gray-300 rounded shadow-lg text-sm">
              <div className="p-2 border-b text-gray-400 text-xs uppercase">Residential</div>
              {residentialOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedOption === option ? 'text-blue-600 font-semibold' : ''
                    }`}
                >
                  {option}
                </div>
              ))}
              <div className="p-2 border-t text-gray-400 text-xs uppercase">Commercial</div>
              {commercialOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedOption === option ? 'text-blue-600 font-semibold' : ''
                    }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Enter Locality / Project / Society / Landmark"
          onFocus={() => setShowFilterPanel(true)}
          className="flex-grow text-sm outline-none border-none bg-transparent placeholder-gray-400"
        />

        <div className="flex space-x-2 text-gray-500">
          <button title="Search" className="hover:text-blue-600" onClick={search}>
            <Search />
          </button>
        </div>
      </div>

      {showFilterPanel && (
        <div
          className="bg-white shadow-md rounded-md p-6 w-full max-w-6xl mx-auto mt-4 mb-6"
          ref={panelRef}
        >
          {/* Filter Tabs */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold">Filters</span>
            <button className="text-blue-600 text-sm underline" onClick={clearAll}>
              Clear all filters
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            {[
              { key: 'property', label: `Property Types (${selectedTypes.length})` },
              { key: 'budget', label: 'Budget' },
              { key: 'bedroom', label: 'Bedroom' },
              { key: 'status', label: 'Construction Status' },
              { key: 'postedBy', label: 'Posted By' },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`border px-4 py-2 rounded ${openTab === tab.key ? 'bg-blue-100 border-blue-500' : ''}`}
                onClick={() => setOpenTab(openTab === tab.key ? null : tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters Section */}
          {openTab === 'property' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 border-t pt-4 mb-4">
              {propertyTypesList.map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleCheckbox(type, setSelectedTypes, selectedTypes)}
                    className="form-checkbox text-blue-600"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          )}

          {openTab === 'budget' && (
            <div className="border-t pt-4 mb-4">
              <label className="block text-sm font-medium mb-2">Select Price Range (in Cr)</label>
              <Slider
                range
                min={0}
                max={100}
                marks={{ 0: '0', 100: '100+ Cr' }}
                step={1}
                value={priceRange}
                onChange={setPriceRange}
                allowCross={false}
              />
              <div className="text-sm mt-2 text-gray-600">
                ₹{priceRange[0]} Cr - ₹{priceRange[1] === 100 ? '100+ Cr' : `${priceRange[1]} Cr`}
              </div>
            </div>
          )}

          {openTab === 'bedroom' && (
            <div className="border-t pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {bedroomList.map((bed) => (
                <label key={bed} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedBedrooms.includes(bed)}
                    onChange={() => toggleCheckbox(bed, setSelectedBedrooms, selectedBedrooms)}
                    className="form-checkbox text-blue-600"
                  />
                  <span className="text-sm">{bed}</span>
                </label>
              ))}
            </div>
          )}

          {openTab === 'status' && (
            <div className="border-t pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {statusList.map((status) => (
                <label key={status} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes(status)}
                    onChange={() => toggleCheckbox(status, setSelectedStatus, selectedStatus)}
                    className="form-checkbox text-blue-600"
                  />
                  <span className="text-sm">{status}</span>
                </label>
              ))}
            </div>
          )}

          {openTab === 'postedBy' && (
            <div className="border-t pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {postedByList.map((p) => (
                <label key={p} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedPostedBy.includes(p)}
                    onChange={() => toggleCheckbox(p, setSelectedPostedBy, selectedPostedBy)}
                    className="form-checkbox text-blue-600"
                  />
                  <span className="text-sm">{p}</span>
                </label>
              ))}
            </div>
          )}

          <div className="flex justify-start gap-4 mt-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded" onClick={search}>
              Search
            </button>
            <button
              className="text-gray-600 px-6 py-2 border border-gray-300 rounded"
              onClick={() => setOpenTab(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}