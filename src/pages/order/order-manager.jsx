import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Page,
  List,
  ListItem,
  ListGroup,
  BlockTitle,
  f7,
} from "framework7-react";
import { supabase } from "../components/supabase";
import TrackingCard from "../components/trackingcard";
import InProcessCard from "../components/inprocesscard";
//import CustomBottomSheet from '../components/CustomBottomSheet'; // Import your BottomSheet component

const OrderPage = () => {
  const [trackingData, setTrackingData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    fetchTrackingData();
  }, []);

  const fetchTrackingData = async () => {
    setIsRefreshing(true);
    const { data, error } = await supabase
      .from("ordermanager")
      .select("*")
      .order("orderdate", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      // Separate "In Process" records
      const inProcess = data.filter((item) => item.status === "In Process");
      const others = data.filter((item) => item.status !== "In Process");

      // Combine into sections
      const sections = [
        { title: "In Process", data: inProcess },
        { title: "Others", data: others },
      ];

      setTrackingData(sections);
    }
    setIsRefreshing(false);
  };

  const onRefresh = () => {
    fetchTrackingData();
  };

  const onItemPress = (item) => {
    setSelectedDetails(item);
    bottomSheetRef.current?.open(); // Open the bottom sheet
  };

  const renderItem = (item) => {
    if (item.status === "In Process") {
      return (
        <ListItem onClick={() => onItemPress(item)}>
          <InProcessCard item={item} />
        </ListItem>
      );
    }
    return (
      <ListItem onClick={() => onItemPress(item)}>
        <List dividersIos outlineIos strongIos></List>
        <TrackingCard item={item} />
      </ListItem>
    );
  };

  const renderSectionHeader = (title, data) => {
    if (title === "In Process" && data.length === 0) {
      return <BlockTitle>No In Process Records</BlockTitle>;
    }
    return <BlockTitle>{title}</BlockTitle>;
  };

  return (
    <Page ptr ptrMousewheel={true} onPtrRefresh={onRefresh}>
      {trackingData.map((section) => (
        <ListGroup key={section.title}>
          {renderSectionHeader(section.title, section.data)}
          <List>{section.data.map((item) => renderItem(item))}</List>
        </ListGroup>
      ))}
    </Page>
  );
};

export default OrderPage;
