export const sortByLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }
    // get the users location from the browser
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
  
      // Convert event addresses to lat/long using a geocoding service
      const eventsWithCoords = await Promise.all(items.map(async (item) => {
        const coords = await geocodeAddress(item.address); 
        return { ...item, coords };
      }));
  
      // Calculate distances and sort
      const sortedItems = eventsWithCoords.sort((a, b) => {
        const distanceA = calculateDistance(latitude, longitude, a.coords.lat, a.coords.lng);
        const distanceB = calculateDistance(latitude, longitude, b.coords.lat, b.coords.lng);
        return distanceA - distanceB;
      });
  
      setItems(sortedItems);
    }, (error) => {
      console.error("Unable to retrieve your location", error);
    });
  };
  
  const geocodeAddress = async (address) => {
    const apiKey = 'my_api_key_from_env_vars'; 
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        console.error('Geocoding failed:', data.status);
        return { lat: 0, lng: 0 }; // 
      }
    } catch (error) {
      console.error('Error during geocoding:', error);
      return { lat: 0, lng: 0 }; // Fallback coordinates
    }
  };
  
// To calculate the distance between the user's current location and each event's location using their latitude and longitude, we use the Haversine formula
// Calculate the distance between two points given their latitude and longitude
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    const distanceKm = R * c; // Distance in km
    const distanceMiles = distanceKm * 0.621371; // Convert km to miles

    // return miles
    return { distanceMiles };
};

  
