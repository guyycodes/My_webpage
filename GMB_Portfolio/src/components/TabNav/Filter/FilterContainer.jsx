import React, { useState, useEffect, useMemo } from "react";
import { FeatureFilter } from './FilterSelector/featureFilter'
import mockData from '../../../util/mockData.json'
import mocData2 from '../../../util/mockData2.json'
import { WideCardsContainer } from "../../Cards/CardContainers/wideCardContainer.jsx";
import { DynamicCardContainer } from "../../Cards/CardContainers/dynamicCardContainer";
import { GalleryContainer } from "../../Cards/CardContainers/slidingGalaryContainer";
import { AboutContentContainer } from "../../Cards/CardContainers/about";
import { ContactContainer } from "../../Cards/CardContainers/contact";

export const PropogateTemplates = ({ secondaryNavSelection }) => {
    // console.log("Received secondaryNavSelection in PropogateTemplates:", secondaryNavSelection);
    const [cardDataObject, setCardDataObject] = useState([]);
    const [secondaryNav, setSecondaryNav] = useState(secondaryNavSelection);
    let CardContainerComponent;

    // Check which tab the nav bar has selected, then call your API for that specific data
    useEffect(() => {
        switch (secondaryNavSelection) {
            case 'WebApps':
                setCardDataObject(mockData);
                break;
            case 'MobileApps':
                
                setCardDataObject(mocData2);
                
                break;
            case 'Components':
                setCardDataObject(mocData2);
                break;
            case 'Cloud':
               
                break;
            default:
                break;
        }
    }, [secondaryNavSelection]);

    useEffect(() => {
        console.log("cardDataObject updated:", cardDataObject);
    }, [cardDataObject]);

    // This switch will pick which type of card to render based off the navigator
    switch (secondaryNavSelection) {
        case 'WebApps':
            CardContainerComponent = WideCardsContainer;
            break;
        case 'MobileApps':
            CardContainerComponent = WideCardsContainer
            break;
        case 'Components':
            CardContainerComponent = DynamicCardContainer;
            break;
        case 'Cloud':
            CardContainerComponent = GalleryContainer
            break;
        default:
            CardContainerComponent = null;
            break;
    }

    return (
        <>
        <FeatureFilter cardData={cardDataObject} secondaryNavSelection={secondaryNavSelection} CardContainerComponent={CardContainerComponent}/>
        </>
    );
};
