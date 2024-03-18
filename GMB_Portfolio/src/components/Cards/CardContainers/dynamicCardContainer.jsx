import React, { useState, useEffect } from 'react';
import { RenderPagination } from '../../pagination/RenderPagination';
import { DynamicCard } from '../dynamicCard';

export const DynamicCardContainer = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCard, setSelectedCard] = useState(data[0]);
    const itemsPerPage = 3;
    const [items, setItems] = useState([]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items ? items.slice(indexOfFirstItem, indexOfLastItem) : [];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCardSelect = (selected) => {
        setSelectedCard(selected);
        const newData = [...data];
        const selectedIndex = newData.indexOf(selected);
        const groupIndex = Math.floor(selectedIndex / 4) * 4;
        [newData[selectedIndex], newData[groupIndex]] = [newData[groupIndex], newData[selectedIndex]];
        setItems(groupItems(newData));
    };

    const groupItems = (items) => {
        const groupedData = [];
        for (let i = 0; i < items.length; i += 4) {
            groupedData.push(items.slice(i, i + 4));
        }
        return groupedData;
    };

    useEffect(() => {
        setItems(groupItems(data));
    }, [data]);


    return (
        <>
       {currentItems.map((group, index) => (
                <DynamicCard 
                    key={index}
                    cardData={group}
                    selectedCard={selectedCard}
                    isSelected={group[0] === selectedCard}
                    onSelect={handleCardSelect}
                />
            ))}
            <RenderPagination
                items={data}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                handlePageChange={handlePageChange}
            />
        </>
    );
};
