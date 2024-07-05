import React, { useEffect, useState } from 'react';
import { Page, Navbar, List, ListItem, Searchbar,Subnavbar } from 'framework7-react';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = localStorage.getItem('csvData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      // Remove duplicates based on Product_Code
      const uniqueProducts = Array.from(new Map(parsedData.map(item => [item.Product_Code, item])).values());

      setProducts(uniqueProducts);
    }
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.Product_Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.Product_Code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Page>
      <Navbar title="Product List" >
      <Subnavbar inner={false}>
      <Searchbar
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearchbarClear={() => setSearchQuery('')}
        //clearButton
      />
      </Subnavbar>
      </Navbar>
      <List mediaList>
        {filteredProducts.map((product, index) => (
          <ListItem
            key={index}
            text={product.Product_Description}
            title={product.Product_Code}
          />
        ))}
      </List>
    </Page>
  );
};

export default ProductListPage;