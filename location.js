// Location Service - Geolocation & Postal Code Management
// Handles location detection with government privacy compliance

const LocationService = {
    // Store user location data
    userLocation: null,
    
    // Postal code to city mapping (Canada example - expandable to other countries)
    postalCodeDatabase: {
        // Ontario - Toronto Area
        'M5H': { city: 'Toronto', province: 'Ontario', country: 'Canada', lat: 43.6532, lng: -79.3832 },
        'M4B': { city: 'Toronto', province: 'Ontario', country: 'Canada', lat: 43.7063, lng: -79.3099 },
        'M5G': { city: 'Toronto', province: 'Ontario', country: 'Canada', lat: 43.6577, lng: -79.3873 },
        'M4C': { city: 'Toronto', province: 'Ontario', country: 'Canada', lat: 43.6953, lng: -79.3183 },
        'M6G': { city: 'Toronto', province: 'Ontario', country: 'Canada', lat: 43.6698, lng: -79.4181 },
        'M1B': { city: 'Scarborough', province: 'Ontario', country: 'Canada', lat: 43.8066, lng: -79.1943 },
        'M1C': { city: 'Scarborough', province: 'Ontario', country: 'Canada', lat: 43.7845, lng: -79.1604 },
        'M1E': { city: 'Scarborough', province: 'Ontario', country: 'Canada', lat: 43.7635, lng: -79.1887 },
        'M9W': { city: 'Etobicoke', province: 'Ontario', country: 'Canada', lat: 43.7067, lng: -79.5940 },
        'M8V': { city: 'Etobicoke', province: 'Ontario', country: 'Canada', lat: 43.6056, lng: -79.5013 },
        'M2N': { city: 'North York', province: 'Ontario', country: 'Canada', lat: 43.7701, lng: -79.4085 },
        'M3C': { city: 'North York', province: 'Ontario', country: 'Canada', lat: 43.7259, lng: -79.3402 },
        'L5A': { city: 'Mississauga', province: 'Ontario', country: 'Canada', lat: 43.5890, lng: -79.6441 },
        'L5B': { city: 'Mississauga', province: 'Ontario', country: 'Canada', lat: 43.5970, lng: -79.6441 },
        'L5M': { city: 'Mississauga', province: 'Ontario', country: 'Canada', lat: 43.6334, lng: -79.6627 },
        'L6R': { city: 'Brampton', province: 'Ontario', country: 'Canada', lat: 43.7315, lng: -79.7624 },
        'L6S': { city: 'Brampton', province: 'Ontario', country: 'Canada', lat: 43.6969, lng: -79.7627 },
        'L7A': { city: 'Brampton', province: 'Ontario', country: 'Canada', lat: 43.7052, lng: -79.8732 },
        'L4L': { city: 'Vaughan', province: 'Ontario', country: 'Canada', lat: 43.8361, lng: -79.4983 },
        'L4J': { city: 'Vaughan', province: 'Ontario', country: 'Canada', lat: 43.8564, lng: -79.4947 },
        'L3R': { city: 'Markham', province: 'Ontario', country: 'Canada', lat: 43.8561, lng: -79.3370 },
        'L6A': { city: 'Markham', province: 'Ontario', country: 'Canada', lat: 43.8708, lng: -79.2698 },
        'L3T': { city: 'Markham', province: 'Ontario', country: 'Canada', lat: 43.8472, lng: -79.3676 },
        'L1W': { city: 'Pickering', province: 'Ontario', country: 'Canada', lat: 43.8355, lng: -79.0891 },
        'L1V': { city: 'Pickering', province: 'Ontario', country: 'Canada', lat: 43.8384, lng: -79.0868 },
        'L1G': { city: 'Ajax', province: 'Ontario', country: 'Canada', lat: 43.8509, lng: -79.0368 },
        'L1S': { city: 'Ajax', province: 'Ontario', country: 'Canada', lat: 43.8564, lng: -79.0368 },
        'L1C': { city: 'Whitby', province: 'Ontario', country: 'Canada', lat: 43.8975, lng: -78.9429 },
        'L1N': { city: 'Whitby', province: 'Ontario', country: 'Canada', lat: 43.8831, lng: -78.9429 },
        'L1H': { city: 'Oshawa', province: 'Ontario', country: 'Canada', lat: 43.8971, lng: -78.8658 },
        'L1J': { city: 'Oshawa', province: 'Ontario', country: 'Canada', lat: 43.8971, lng: -78.8658 },
        'L7N': { city: 'Milton', province: 'Ontario', country: 'Canada', lat: 43.5183, lng: -79.8774 },
        'L7E': { city: 'Milton', province: 'Ontario', country: 'Canada', lat: 43.5183, lng: -79.8774 },
        'L7G': { city: 'Georgetown', province: 'Ontario', country: 'Canada', lat: 43.6476, lng: -79.9168 },
        'L9T': { city: 'Halton Hills', province: 'Ontario', country: 'Canada', lat: 43.6476, lng: -79.9168 },
        'L7R': { city: 'Oakville', province: 'Ontario', country: 'Canada', lat: 43.4675, lng: -79.6877 },
        'L6H': { city: 'Oakville', province: 'Ontario', country: 'Canada', lat: 43.4675, lng: -79.6877 },
        'L6J': { city: 'Oakville', province: 'Ontario', country: 'Canada', lat: 43.4675, lng: -79.6877 },
        'L7L': { city: 'Burlington', province: 'Ontario', country: 'Canada', lat: 43.3255, lng: -79.7990 },
        'L7M': { city: 'Burlington', province: 'Ontario', country: 'Canada', lat: 43.3255, lng: -79.7990 },
        
        // Ontario - Ottawa Area
        'K1A': { city: 'Ottawa', province: 'Ontario', country: 'Canada', lat: 45.4215, lng: -75.6972 },
        'K1P': { city: 'Ottawa', province: 'Ontario', country: 'Canada', lat: 45.4215, lng: -75.6972 },
        'K1R': { city: 'Ottawa', province: 'Ontario', country: 'Canada', lat: 45.4117, lng: -75.6977 },
        'K1S': { city: 'Ottawa', province: 'Ontario', country: 'Canada', lat: 45.3984, lng: -75.6838 },
        'K2P': { city: 'Ottawa', province: 'Ontario', country: 'Canada', lat: 45.4169, lng: -75.6982 },
        'K4A': { city: 'Gatineau', province: 'Quebec', country: 'Canada', lat: 45.4765, lng: -75.7013 },
        'J8T': { city: 'Gatineau', province: 'Quebec', country: 'Canada', lat: 45.4765, lng: -75.7013 },
        
        // Ontario - Other Cities
        'N2L': { city: 'Waterloo', province: 'Ontario', country: 'Canada', lat: 43.4643, lng: -80.5204 },
        'N2J': { city: 'Waterloo', province: 'Ontario', country: 'Canada', lat: 43.4643, lng: -80.5204 },
        'N2H': { city: 'Kitchener', province: 'Ontario', country: 'Canada', lat: 43.4516, lng: -80.4925 },
        'N2G': { city: 'Kitchener', province: 'Ontario', country: 'Canada', lat: 43.4516, lng: -80.4925 },
        'N1H': { city: 'Guelph', province: 'Ontario', country: 'Canada', lat: 43.5448, lng: -80.2482 },
        'N1G': { city: 'Guelph', province: 'Ontario', country: 'Canada', lat: 43.5448, lng: -80.2482 },
        'L8E': { city: 'Hamilton', province: 'Ontario', country: 'Canada', lat: 43.2557, lng: -79.8711 },
        'L8L': { city: 'Hamilton', province: 'Ontario', country: 'Canada', lat: 43.2557, lng: -79.8711 },
        'L8P': { city: 'Hamilton', province: 'Ontario', country: 'Canada', lat: 43.2557, lng: -79.8711 },
        'L3Y': { city: 'Newmarket', province: 'Ontario', country: 'Canada', lat: 44.0592, lng: -79.4613 },
        'L3X': { city: 'Newmarket', province: 'Ontario', country: 'Canada', lat: 44.0592, lng: -79.4613 },
        'L4N': { city: 'Barrie', province: 'Ontario', country: 'Canada', lat: 44.3894, lng: -79.6903 },
        'L4M': { city: 'Barrie', province: 'Ontario', country: 'Canada', lat: 44.3894, lng: -79.6903 },
        'P7A': { city: 'Thunder Bay', province: 'Ontario', country: 'Canada', lat: 48.3809, lng: -89.2477 },
        'P7B': { city: 'Thunder Bay', province: 'Ontario', country: 'Canada', lat: 48.3809, lng: -89.2477 },
        'P3A': { city: 'Sudbury', province: 'Ontario', country: 'Canada', lat: 46.4917, lng: -80.9930 },
        'P3E': { city: 'Sudbury', province: 'Ontario', country: 'Canada', lat: 46.4917, lng: -80.9930 },
        'N6A': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N5W': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N9A': { city: 'Windsor', province: 'Ontario', country: 'Canada', lat: 42.3149, lng: -83.0364 },
        'N8X': { city: 'Windsor', province: 'Ontario', country: 'Canada', lat: 42.3149, lng: -83.0364 },
        
        // British Columbia - Vancouver Area
        'V6B': { city: 'Vancouver', province: 'British Columbia', country: 'Canada', lat: 49.2827, lng: -123.1207 },
        'V5K': { city: 'Vancouver', province: 'British Columbia', country: 'Canada', lat: 49.2827, lng: -123.1207 },
        'V6E': { city: 'Vancouver', province: 'British Columbia', country: 'Canada', lat: 49.2827, lng: -123.1207 },
        'V6Z': { city: 'Vancouver', province: 'British Columbia', country: 'Canada', lat: 49.2827, lng: -123.1207 },
        'V6C': { city: 'Vancouver', province: 'British Columbia', country: 'Canada', lat: 49.2827, lng: -123.1207 },
        'V5A': { city: 'Burnaby', province: 'British Columbia', country: 'Canada', lat: 49.2488, lng: -122.9805 },
        'V5B': { city: 'Burnaby', province: 'British Columbia', country: 'Canada', lat: 49.2488, lng: -122.9805 },
        'V5C': { city: 'Burnaby', province: 'British Columbia', country: 'Canada', lat: 49.2488, lng: -122.9805 },
        'V5E': { city: 'Burnaby', province: 'British Columbia', country: 'Canada', lat: 49.2488, lng: -122.9805 },
        'V5G': { city: 'Burnaby', province: 'British Columbia', country: 'Canada', lat: 49.2488, lng: -122.9805 },
        'V5H': { city: 'Burnaby', province: 'British Columbia', country: 'Canada', lat: 49.2488, lng: -122.9805 },
        'V5J': { city: 'Burnaby', province: 'British Columbia', country: 'Canada', lat: 49.2488, lng: -122.9805 },
        'V3J': { city: 'Burnaby', province: 'British Columbia', country: 'Canada', lat: 49.2488, lng: -122.9805 },
        'V3N': { city: 'Burnaby', province: 'British Columbia', country: 'Canada', lat: 49.2488, lng: -122.9805 },
        'V7Y': { city: 'North Vancouver', province: 'British Columbia', country: 'Canada', lat: 49.3163, lng: -123.0709 },
        'V7J': { city: 'North Vancouver', province: 'British Columbia', country: 'Canada', lat: 49.3163, lng: -123.0709 },
        'V7L': { city: 'North Vancouver', province: 'British Columbia', country: 'Canada', lat: 49.3163, lng: -123.0709 },
        'V7P': { city: 'West Vancouver', province: 'British Columbia', country: 'Canada', lat: 49.3263, lng: -123.1656 },
        'V7W': { city: 'West Vancouver', province: 'British Columbia', country: 'Canada', lat: 49.3263, lng: -123.1656 },
        'V3L': { city: 'Coquitlam', province: 'British Columbia', country: 'Canada', lat: 49.2838, lng: -122.7932 },
        'V3K': { city: 'Coquitlam', province: 'British Columbia', country: 'Canada', lat: 49.2838, lng: -122.7932 },
        'V3B': { city: 'Coquitlam', province: 'British Columbia', country: 'Canada', lat: 49.2838, lng: -122.7932 },
        'V3E': { city: 'New Westminster', province: 'British Columbia', country: 'Canada', lat: 49.2069, lng: -122.9109 },
        'V3M': { city: 'New Westminster', province: 'British Columbia', country: 'Canada', lat: 49.2069, lng: -122.9109 },
        'V3C': { city: 'Port Moody', province: 'British Columbia', country: 'Canada', lat: 49.2831, lng: -122.8317 },
        'V3H': { city: 'Port Moody', province: 'British Columbia', country: 'Canada', lat: 49.2831, lng: -122.8317 },
        'V3S': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V3T': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V3R': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V4N': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V3W': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V2S': { city: 'Abbotsford', province: 'British Columbia', country: 'Canada', lat: 49.0504, lng: -122.3045 },
        'V2T': { city: 'Abbotsford', province: 'British Columbia', country: 'Canada', lat: 49.0504, lng: -122.3045 },
        'V4X': { city: 'Delta', province: 'British Columbia', country: 'Canada', lat: 49.0847, lng: -123.0586 },
        'V4C': { city: 'Delta', province: 'British Columbia', country: 'Canada', lat: 49.0847, lng: -123.0586 },
        'V6V': { city: 'Richmond', province: 'British Columbia', country: 'Canada', lat: 49.1666, lng: -123.1336 },
        'V6X': { city: 'Richmond', province: 'British Columbia', country: 'Canada', lat: 49.1666, lng: -123.1336 },
        'V7A': { city: 'Richmond', province: 'British Columbia', country: 'Canada', lat: 49.1666, lng: -123.1336 },
        'V7C': { city: 'Richmond', province: 'British Columbia', country: 'Canada', lat: 49.1666, lng: -123.1336 },
        'V2Y': { city: 'Chilliwack', province: 'British Columbia', country: 'Canada', lat: 49.1577, lng: -121.9509 },
        'V2R': { city: 'Chilliwack', province: 'British Columbia', country: 'Canada', lat: 49.1577, lng: -121.9509 },
        'V2X': { city: 'Langley', province: 'British Columbia', country: 'Canada', lat: 49.1044, lng: -122.6604 },
        'V1M': { city: 'Langley', province: 'British Columbia', country: 'Canada', lat: 49.1044, lng: -122.6604 },
        'V2P': { city: 'Maple Ridge', province: 'British Columbia', country: 'Canada', lat: 49.2193, lng: -122.5989 },
        'V4R': { city: 'Maple Ridge', province: 'British Columbia', country: 'Canada', lat: 49.2193, lng: -122.5989 },
        'V2V': { city: 'Mission', province: 'British Columbia', country: 'Canada', lat: 49.1337, lng: -122.3112 },
        'V4S': { city: 'Pitt Meadows', province: 'British Columbia', country: 'Canada', lat: 49.2187, lng: -122.6867 },
        'V1Y': { city: 'Kelowna', province: 'British Columbia', country: 'Canada', lat: 49.8880, lng: -119.4960 },
        'V1W': { city: 'Kelowna', province: 'British Columbia', country: 'Canada', lat: 49.8880, lng: -119.4960 },
        'V1X': { city: 'Kelowna', province: 'British Columbia', country: 'Canada', lat: 49.8880, lng: -119.4960 },
        'V1V': { city: 'Vernon', province: 'British Columbia', country: 'Canada', lat: 50.2670, lng: -119.2720 },
        'V1T': { city: 'Vernon', province: 'British Columbia', country: 'Canada', lat: 50.2670, lng: -119.2720 },
        'V1B': { city: 'Penticton', province: 'British Columbia', country: 'Canada', lat: 49.4991, lng: -119.5937 },
        'V2A': { city: 'Penticton', province: 'British Columbia', country: 'Canada', lat: 49.4991, lng: -119.5937 },
        'V0E': { city: 'Kamloops', province: 'British Columbia', country: 'Canada', lat: 50.6745, lng: -120.3273 },
        'V2C': { city: 'Kamloops', province: 'British Columbia', country: 'Canada', lat: 50.6745, lng: -120.3273 },
        'V9T': { city: 'Nanaimo', province: 'British Columbia', country: 'Canada', lat: 49.1659, lng: -123.9401 },
        'V9R': { city: 'Nanaimo', province: 'British Columbia', country: 'Canada', lat: 49.1659, lng: -123.9401 },
        'V8V': { city: 'Courtenay', province: 'British Columbia', country: 'Canada', lat: 49.6872, lng: -124.9945 },
        'V9N': { city: 'Courtenay', province: 'British Columbia', country: 'Canada', lat: 49.6872, lng: -124.9945 },
        'V9W': { city: 'Campbell River', province: 'British Columbia', country: 'Canada', lat: 50.0244, lng: -125.2476 },
        'V9H': { city: 'Campbell River', province: 'British Columbia', country: 'Canada', lat: 50.0244, lng: -125.2476 },
        'V2L': { city: 'Prince George', province: 'British Columbia', country: 'Canada', lat: 53.9171, lng: -122.7497 },
        'V2M': { city: 'Prince George', province: 'British Columbia', country: 'Canada', lat: 53.9171, lng: -122.7497 },
        
        // British Columbia - Victoria
        'V8W': { city: 'Victoria', province: 'British Columbia', country: 'Canada', lat: 48.4284, lng: -123.3656 },
        'V8R': { city: 'Victoria', province: 'British Columbia', country: 'Canada', lat: 48.4284, lng: -123.3656 },
        'V8T': { city: 'Victoria', province: 'British Columbia', country: 'Canada', lat: 48.4284, lng: -123.3656 },
        'V8N': { city: 'Victoria', province: 'British Columbia', country: 'Canada', lat: 48.4284, lng: -123.3656 },
        'V9B': { city: 'Sidney', province: 'British Columbia', country: 'Canada', lat: 48.6502, lng: -123.3986 },
        'V9L': { city: 'Sidney', province: 'British Columbia', country: 'Canada', lat: 48.6502, lng: -123.3986 },
        'V9E': { city: 'Saanich', province: 'British Columbia', country: 'Canada', lat: 48.4858, lng: -123.3825 },
        
        // Alberta
        'T2P': { city: 'Calgary', province: 'Alberta', country: 'Canada', lat: 51.0447, lng: -114.0719 },
        'T2E': { city: 'Calgary', province: 'Alberta', country: 'Canada', lat: 51.0447, lng: -114.0719 },
        'T2H': { city: 'Calgary', province: 'Alberta', country: 'Canada', lat: 51.0447, lng: -114.0719 },
        'T3A': { city: 'Calgary', province: 'Alberta', country: 'Canada', lat: 51.0447, lng: -114.0719 },
        'T3K': { city: 'Calgary', province: 'Alberta', country: 'Canada', lat: 51.0447, lng: -114.0719 },
        'T5J': { city: 'Edmonton', province: 'Alberta', country: 'Canada', lat: 53.5461, lng: -113.4938 },
        'T5K': { city: 'Edmonton', province: 'Alberta', country: 'Canada', lat: 53.5461, lng: -113.4938 },
        'T6E': { city: 'Edmonton', province: 'Alberta', country: 'Canada', lat: 53.5461, lng: -113.4938 },
        'T5A': { city: 'Edmonton', province: 'Alberta', country: 'Canada', lat: 53.5461, lng: -113.4938 },
        'T8A': { city: 'Sherwood Park', province: 'Alberta', country: 'Canada', lat: 53.5417, lng: -113.3088 },
        'T8H': { city: 'Sherwood Park', province: 'Alberta', country: 'Canada', lat: 53.5417, lng: -113.3088 },
        'T8N': { city: 'St. Albert', province: 'Alberta', country: 'Canada', lat: 53.6301, lng: -113.6258 },
        'T4R': { city: 'Red Deer', province: 'Alberta', country: 'Canada', lat: 52.2681, lng: -113.8111 },
        'T4N': { city: 'Red Deer', province: 'Alberta', country: 'Canada', lat: 52.2681, lng: -113.8111 },
        'T1A': { city: 'Lethbridge', province: 'Alberta', country: 'Canada', lat: 49.6942, lng: -112.8328 },
        'T1J': { city: 'Lethbridge', province: 'Alberta', country: 'Canada', lat: 49.6942, lng: -112.8328 },
        'T9E': { city: 'Fort McMurray', province: 'Alberta', country: 'Canada', lat: 56.7267, lng: -111.3790 },
        'T9H': { city: 'Fort McMurray', province: 'Alberta', country: 'Canada', lat: 56.7267, lng: -111.3790 },
        'T5N': { city: 'Spruce Grove', province: 'Alberta', country: 'Canada', lat: 53.5447, lng: -113.9007 },
        'T7X': { city: 'Spruce Grove', province: 'Alberta', country: 'Canada', lat: 53.5447, lng: -113.9007 },
        'T1K': { city: 'Medicine Hat', province: 'Alberta', country: 'Canada', lat: 50.0404, lng: -110.6764 },
        'T1B': { city: 'Medicine Hat', province: 'Alberta', country: 'Canada', lat: 50.0404, lng: -110.6764 },
        'T6R': { city: 'Leduc', province: 'Alberta', country: 'Canada', lat: 53.2594, lng: -113.5514 },
        'T9C': { city: 'Leduc', province: 'Alberta', country: 'Canada', lat: 53.2594, lng: -113.5514 },
        'T4A': { city: 'Airdrie', province: 'Alberta', country: 'Canada', lat: 51.2917, lng: -114.0144 },
        'T4B': { city: 'Airdrie', province: 'Alberta', country: 'Canada', lat: 51.2917, lng: -114.0144 },
        'T1L': { city: 'Okotoks', province: 'Alberta', country: 'Canada', lat: 50.7267, lng: -113.9774 },
        'T1S': { city: 'Okotoks', province: 'Alberta', country: 'Canada', lat: 50.7267, lng: -113.9774 },
        'T0L': { city: 'Canmore', province: 'Alberta', country: 'Canada', lat: 51.0888, lng: -115.3620 },
        'T1W': { city: 'Canmore', province: 'Alberta', country: 'Canada', lat: 51.0888, lng: -115.3620 },
        
        // Quebec
        'H2X': { city: 'Montreal', province: 'Quebec', country: 'Canada', lat: 45.5017, lng: -73.5673 },
        'H3A': { city: 'Montreal', province: 'Quebec', country: 'Canada', lat: 45.5017, lng: -73.5673 },
        'H3B': { city: 'Montreal', province: 'Quebec', country: 'Canada', lat: 45.5017, lng: -73.5673 },
        'H3G': { city: 'Montreal', province: 'Quebec', country: 'Canada', lat: 45.5017, lng: -73.5673 },
        'H2Y': { city: 'Montreal', province: 'Quebec', country: 'Canada', lat: 45.5017, lng: -73.5673 },
        'H4A': { city: 'Laval', province: 'Quebec', country: 'Canada', lat: 45.6066, lng: -73.7124 },
        'H7S': { city: 'Laval', province: 'Quebec', country: 'Canada', lat: 45.6066, lng: -73.7124 },
        'H7W': { city: 'Laval', province: 'Quebec', country: 'Canada', lat: 45.6066, lng: -73.7124 },
        'J4H': { city: 'Longueuil', province: 'Quebec', country: 'Canada', lat: 45.5312, lng: -73.5183 },
        'J4J': { city: 'Longueuil', province: 'Quebec', country: 'Canada', lat: 45.5312, lng: -73.5183 },
        'J7Y': { city: 'Terrebonne', province: 'Quebec', country: 'Canada', lat: 45.7004, lng: -73.6472 },
        'J6W': { city: 'Terrebonne', province: 'Quebec', country: 'Canada', lat: 45.7004, lng: -73.6472 },
        'G1R': { city: 'Quebec City', province: 'Quebec', country: 'Canada', lat: 46.8139, lng: -71.2080 },
        'G1K': { city: 'Quebec City', province: 'Quebec', country: 'Canada', lat: 46.8139, lng: -71.2080 },
        'G1V': { city: 'Quebec City', province: 'Quebec', country: 'Canada', lat: 46.8139, lng: -71.2080 },
        'G2E': { city: 'Quebec City', province: 'Quebec', country: 'Canada', lat: 46.8139, lng: -71.2080 },
        'J1H': { city: 'Sherbrooke', province: 'Quebec', country: 'Canada', lat: 45.4042, lng: -71.8929 },
        'J1K': { city: 'Sherbrooke', province: 'Quebec', country: 'Canada', lat: 45.4042, lng: -71.8929 },
        'G8T': { city: 'Trois-Rivières', province: 'Quebec', country: 'Canada', lat: 46.3432, lng: -72.5477 },
        'G9A': { city: 'Trois-Rivières', province: 'Quebec', country: 'Canada', lat: 46.3432, lng: -72.5477 },
        
        // Saskatchewan
        'S4P': { city: 'Regina', province: 'Saskatchewan', country: 'Canada', lat: 50.4452, lng: -104.6189 },
        'S4N': { city: 'Regina', province: 'Saskatchewan', country: 'Canada', lat: 50.4452, lng: -104.6189 },
        'S7K': { city: 'Saskatoon', province: 'Saskatchewan', country: 'Canada', lat: 52.1332, lng: -106.6700 },
        'S7N': { city: 'Saskatoon', province: 'Saskatchewan', country: 'Canada', lat: 52.1332, lng: -106.6700 },
        
        // Manitoba
        'R3C': { city: 'Winnipeg', province: 'Manitoba', country: 'Canada', lat: 49.8951, lng: -97.1384 },
        'R3G': { city: 'Winnipeg', province: 'Manitoba', country: 'Canada', lat: 49.8951, lng: -97.1384 },
        'R3T': { city: 'Winnipeg', province: 'Manitoba', country: 'Canada', lat: 49.8951, lng: -97.1384 },
        
        // Nova Scotia
        'B3H': { city: 'Halifax', province: 'Nova Scotia', country: 'Canada', lat: 44.6488, lng: -63.5752 },
        'B3J': { city: 'Halifax', province: 'Nova Scotia', country: 'Canada', lat: 44.6488, lng: -63.5752 },
        'B3K': { city: 'Halifax', province: 'Nova Scotia', country: 'Canada', lat: 44.6488, lng: -63.5752 },
        'B2Y': { city: 'Dartmouth', province: 'Nova Scotia', country: 'Canada', lat: 44.6714, lng: -63.5765 },
        'B3A': { city: 'Dartmouth', province: 'Nova Scotia', country: 'Canada', lat: 44.6714, lng: -63.5765 },
        
        // New Brunswick
        'E1C': { city: 'Moncton', province: 'New Brunswick', country: 'Canada', lat: 46.0878, lng: -64.7782 },
        'E1E': { city: 'Moncton', province: 'New Brunswick', country: 'Canada', lat: 46.0878, lng: -64.7782 },
        'E2L': { city: 'Saint John', province: 'New Brunswick', country: 'Canada', lat: 45.2733, lng: -66.0633 },
        'E2M': { city: 'Saint John', province: 'New Brunswick', country: 'Canada', lat: 45.2733, lng: -66.0633 },
        'E3B': { city: 'Fredericton', province: 'New Brunswick', country: 'Canada', lat: 45.9636, lng: -66.6431 },
        'E3C': { city: 'Fredericton', province: 'New Brunswick', country: 'Canada', lat: 45.9636, lng: -66.6431 },
        
        // Newfoundland and Labrador
        'A1C': { city: 'St. John\'s', province: 'Newfoundland and Labrador', country: 'Canada', lat: 47.5615, lng: -52.7126 },
        'A1A': { city: 'St. John\'s', province: 'Newfoundland and Labrador', country: 'Canada', lat: 47.5615, lng: -52.7126 },
        
        // USA Examples (expandable)
        '10001': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10002': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '11201': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '90001': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90210': { city: 'Beverly Hills', state: 'CA', country: 'USA', lat: 34.0736, lng: -118.4004 },
        '60601': { city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298 },
        '94102': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94105': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '02108': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02139': { city: 'Cambridge', state: 'MA', country: 'USA', lat: 42.3736, lng: -71.1097 },
        '98101': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98052': { city: 'Redmond', state: 'WA', country: 'USA', lat: 47.6740, lng: -122.1215 },
        '33101': { city: 'Miami', state: 'FL', country: 'USA', lat: 25.7617, lng: -80.1918 },
        '78701': { city: 'Austin', state: 'TX', country: 'USA', lat: 30.2672, lng: -97.7431 },
        '85001': { city: 'Phoenix', state: 'AZ', country: 'USA', lat: 33.4484, lng: -112.0740 },
    },
    
    // Initialize location service
    init() {
        console.log('📍 Location Service initialized');
        this.loadStoredLocation();
        this.detectCountry();
    },
    
    // Detect user's country (for compliance)
    detectCountry() {
        // Use timezone to estimate country
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let country = 'Canada'; // Default
        
        if (timezone.includes('America/New_York') || timezone.includes('America/Chicago') || 
            timezone.includes('America/Los_Angeles') || timezone.includes('America/Phoenix')) {
            country = 'USA';
        } else if (timezone.includes('America/Toronto') || timezone.includes('America/Vancouver') || 
                   timezone.includes('America/Edmonton')) {
            country = 'Canada';
        } else if (timezone.includes('Europe/')) {
            country = 'Europe';
        }
        
        console.log('🌍 Detected country:', country);
        return country;
    },
    
    // Load stored location from localStorage
    loadStoredLocation() {
        const stored = localStorage.getItem('userLocation');
        if (stored) {
            this.userLocation = JSON.parse(stored);
            console.log('📍 Loaded stored location:', this.userLocation);
            return true;
        }
        return false;
    },
    
    // Save location to localStorage
    saveLocation(locationData) {
        this.userLocation = locationData;
        localStorage.setItem('userLocation', JSON.stringify(locationData));
        console.log('💾 Location saved:', locationData);
    },
    
    // Request precise location via browser geolocation API
    requestPreciseLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            
            console.log('📍 Requesting precise location...');
            
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('✅ Location obtained:', latitude, longitude);
                    
                    // Reverse geocode to get city name
                    const cityData = await this.reverseGeocode(latitude, longitude);
                    
                    const locationData = {
                        type: 'precise',
                        lat: latitude,
                        lng: longitude,
                        city: cityData.city,
                        region: cityData.region,
                        country: cityData.country,
                        timestamp: Date.now()
                    };
                    
                    this.saveLocation(locationData);
                    resolve(locationData);
                },
                (error) => {
                    console.log('❌ Location denied:', error.message);
                    reject(error);
                },
                {
                    enableHighAccuracy: false, // Respects privacy - approximate location
                    timeout: 10000,
                    maximumAge: 300000 // Cache for 5 minutes
                }
            );
        });
    },
    
    // Reverse geocode coordinates to city name (using approximate method)
    async reverseGeocode(lat, lng) {
        // Simple reverse geocoding without external API (privacy-friendly)
        // In production, you could use Nominatim (OpenStreetMap) or similar free service
        
        // For now, return approximate based on known cities
        const cities = [
            { name: 'Toronto', lat: 43.6532, lng: -79.3832, region: 'Ontario', country: 'Canada' },
            { name: 'Vancouver', lat: 49.2827, lng: -123.1207, region: 'British Columbia', country: 'Canada' },
            { name: 'Montreal', lat: 45.5017, lng: -73.5673, region: 'Quebec', country: 'Canada' },
            { name: 'Calgary', lat: 51.0447, lng: -114.0719, region: 'Alberta', country: 'Canada' },
            { name: 'Ottawa', lat: 45.4215, lng: -75.6972, region: 'Ontario', country: 'Canada' },
            { name: 'New York', lat: 40.7128, lng: -74.0060, region: 'NY', country: 'USA' },
            { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, region: 'CA', country: 'USA' },
        ];
        
        // Find nearest city
        let nearestCity = cities[0];
        let minDistance = this.calculateDistance(lat, lng, nearestCity.lat, nearestCity.lng);
        
        for (let city of cities) {
            const distance = this.calculateDistance(lat, lng, city.lat, city.lng);
            if (distance < minDistance) {
                minDistance = distance;
                nearestCity = city;
            }
        }
        
        return {
            city: nearestCity.name,
            region: nearestCity.region,
            country: nearestCity.country
        };
    },
    
    // Calculate distance between two coordinates (Haversine formula)
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    },
    
    toRad(degrees) {
        return degrees * Math.PI / 180;
    },
    
    // Lookup city by postal code
    lookupPostalCode(postalCode) {
        // Normalize postal code (remove spaces, uppercase)
        const normalized = postalCode.replace(/\s+/g, '').toUpperCase();
        
        // Canadian postal code format: A1A 1A1 (first 3 chars identify area)
        const prefix = normalized.substring(0, 3);
        
        // USA ZIP code format: 5 digits
        const zipPrefix = normalized.substring(0, 5);
        
        console.log('🔍 Looking up postal code:', normalized, '(prefix:', prefix, ')');
        
        // Try exact match first
        if (this.postalCodeDatabase[prefix]) {
            console.log('✅ Found exact match:', this.postalCodeDatabase[prefix]);
            return this.postalCodeDatabase[prefix];
        }
        
        // Try ZIP code match
        if (this.postalCodeDatabase[zipPrefix]) {
            console.log('✅ Found ZIP match:', this.postalCodeDatabase[zipPrefix]);
            return this.postalCodeDatabase[zipPrefix];
        }
        
        // Try partial match (first 2 chars for broader area)
        const prefix2 = normalized.substring(0, 2);
        for (let code in this.postalCodeDatabase) {
            if (code.startsWith(prefix2)) {
                console.log('✅ Found partial match:', this.postalCodeDatabase[code]);
                return this.postalCodeDatabase[code];
            }
        }
        
        console.log('❌ No match found for postal code');
        return null;
    },
    
    // Set location by postal code
    setLocationByPostalCode(postalCode) {
        const cityData = this.lookupPostalCode(postalCode);
        
        if (!cityData) {
            return { success: false, error: 'Postal code not found' };
        }
        
        const locationData = {
            type: 'postal',
            postalCode: postalCode.toUpperCase(),
            city: cityData.city,
            region: cityData.province || cityData.state,
            country: cityData.country,
            lat: cityData.lat,
            lng: cityData.lng,
            timestamp: Date.now()
        };
        
        this.saveLocation(locationData);
        return { success: true, location: locationData };
    },
    
    // Get current location
    getLocation() {
        return this.userLocation;
    },
    
    // Check if location is set
    hasLocation() {
        return this.userLocation !== null;
    },
    
    // Clear location
    clearLocation() {
        this.userLocation = null;
        localStorage.removeItem('userLocation');
        console.log('🗑️ Location cleared');
    },
    
    // Format location for display
    formatLocation(location) {
        if (!location) return 'Location not set';
        
        if (location.type === 'precise') {
            return `${location.city}, ${location.region}`;
        } else if (location.type === 'postal') {
            return `${location.city}, ${location.region} (${location.postalCode})`;
        }
        
        return location.city || 'Unknown location';
    },
    
    // Filter providers by location (within radius)
    filterProvidersByLocation(providers, maxDistanceKm = 50) {
        if (!this.userLocation) {
            console.log('⚠️ No user location set, returning all providers');
            return providers;
        }
        
        const userLat = this.userLocation.lat;
        const userLng = this.userLocation.lng;
        
        console.log(`📍 Filtering providers within ${maxDistanceKm}km of user location`);
        
        return providers.filter(provider => {
            // If provider doesn't have location, include them (they serve all areas)
            if (!provider.lat || !provider.lng) {
                return true;
            }
            
            const distance = this.calculateDistance(userLat, userLng, provider.lat, provider.lng);
            provider.distance = Math.round(distance * 10) / 10; // Round to 1 decimal
            
            return distance <= maxDistanceKm;
        }).sort((a, b) => (a.distance || 0) - (b.distance || 0)); // Sort by distance
    }
};

// Initialize on load
LocationService.init();
