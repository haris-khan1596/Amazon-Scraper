// src/App.js
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Table from './components/table';
import './App.css';

const App = () => {
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // List files manually or dynamically if you have a way to get them
    const fetchFiles = async () => {
      // Manually list files if no backend or file listing is available
      const fileList = [
        "Speakers",
        "Tablet",
        "Laptop",
        "Scanner",
        "Printer",
        "Camera",
        "Headphone",
        "Watch",
        "Mobile",
        "TV"
    ]; // Update this with your actual file names
      setFiles(fileList);
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      const fetchData = async () => {
        const fileData = {};
        for (const file of files) {
          const response = await fetch(`/data/${file}.json`);
          if (response.ok) {
            fileData[file] = await response.json();
          } else {
            console.error(`Failed to fetch ${file}`);
          }
        }
        setData(fileData);
      };

      fetchData();
    }
  }, [files]);

  return (
    <div className="App">
      <h1>Amazon Scraper Data</h1>
      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        <TabList>
          {files.map((file, index) => (
            <Tab key={index}>{file}</Tab>
          ))}
        </TabList>
        {files.map((file, index) => (
          <TabPanel key={index}>
            <Table data={data[file]} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default App;
