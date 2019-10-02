// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();
  
    places.forEach((place) => {
      bounds.extend(new maps.LatLng(
        place.latitude,
        place.longitude,
      ));
    });
    return bounds;
  };
  
// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
        maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
        });
    });
};

// Fit map to its bounds after the api is loaded
export const apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
  };