import React, { useEffect, useState } from 'react';
import { Page, Navbar, BlockTitle, Searchbar, Subnavbar } from 'framework7-react';

const SummaryPage = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('csvData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const summary = {};

      parsedData.forEach(row => {
        const productCode = row['Product_Code'];
        const balance = parseFloat(row['Balance']) || 0;

        if (summary[productCode]) {
          summary[productCode] += balance;
        } else {
          summary[productCode] = balance;
        }
      });

      const summarizedData = Object.entries(summary).map(([productCode, balance]) => ({
        productCode,
        balance,
      }));

      setSummaryData(summarizedData);
      setFilteredData(summarizedData);
    }
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(summaryData);
    } else {
      setFilteredData(
        summaryData.filter(item =>
          item.productCode.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, summaryData]);

  return (
    <Page>
      <Navbar title="Summary Page" backLink="Back" >
      <Subnavbar inner={false}>
      <Searchbar
        className="searchbar"
        placeholder="Search Product Code"
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
      /></Subnavbar></Navbar>
      <BlockTitle>Summary of Product Balances</BlockTitle>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th className="label-cell">Product Code</th>
              <th className="numeric-cell">Total Balance</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="label-celll">{item.productCode}</td>
                <td className="numeric-celll">{item.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
};

export default SummaryPage;
