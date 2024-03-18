import React, { useState, useEffect } from 'react';
import { VStack } from '@chakra-ui/react';
import { RenderPagination } from '../../pagination/RenderPagination';
import { WideCard } from '../wideCard';

// container for mapping over the content of the template
export const WideCardsContainer = ({ data }) => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    // page count for pagination
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    // Calculate the items to display for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items ? items.slice(indexOfFirstItem, indexOfLastItem): [];
    
    // check if data them set state
    useEffect(() => {
        if (data) {
            // console.log(data)
          setItems(data);
        }
      }, [data]);
  
    return (
      <>
        <VStack spacing={4}>
          {
            currentItems.map((item, index) => (
              // render using the wide card template
              <WideCard 
                key={index}
                image={item.image} 
                address={item.address}
                date={item.date}
                title={item.title}
                time={item.time}
                description={item.description}
                link={item.link} 
              />
            ))
          }
        </VStack>
        {/* Pagination happening here */}
        <RenderPagination 
          items={items} 
          currentPage={currentPage} 
          itemsPerPage={itemsPerPage} 
          handlePageChange={handlePageChange} 
        />
      </>
    );
  };
  