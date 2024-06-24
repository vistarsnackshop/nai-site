import React, { useEffect, useState } from 'react';

function BrowseByItem() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/page1Data');
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error('Failed to fetch data for Page 1:', response.status);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data for Page 1</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BrowseByItem;
