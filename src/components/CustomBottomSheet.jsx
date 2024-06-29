import React, { useRef, useMemo, useCallback } from 'react';
import { Sheet, PageContent, Block, Text, Backdrop, f7 } from 'framework7-react';
import TrackingDetails from './TestingScreenCopy'; // Adjust the import path as needed

const CustomBottomSheet = ({ bottomSheetRef, selectedDetails, closeSheet }) => {
  // Define the snap points (not directly used in Framework7, but can be simulated)
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  return (
    <>
      <Backdrop />
      <Sheet
        className="bottom-sheet"
        style={{ height: 'auto' }}
        swipeToClose
        backdrop
        opened={false}
        ref={bottomSheetRef}
        onSheetClosed={closeSheet}
      >
        <PageContent>
          <Block style={{ padding: '8px' }}>
            {selectedDetails ? (
              <TrackingDetails details={selectedDetails} />
            ) : (
              <Text>No details available</Text>
            )}
          </Block>
        </PageContent>
      </Sheet>
    </>
  );
};

const styles = {
  contentContainer: {
    flex: 1,
    padding: '8px',
  },
};

export default CustomBottomSheet;
