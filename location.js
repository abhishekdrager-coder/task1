// Location Service - Geolocation & Postal Code Management
// Handles location detection with government privacy compliance

const LocationService = {
    // Store user location data
    userLocation: null,
    
    // Comprehensive Postal Code Database for Canada & USA
    // This is the SINGLE SOURCE OF TRUTH for all location data on the site
    postalCodeDatabase: {
        // ═══════════════════════════════════════════════════════════
        // ONTARIO - Toronto Area
        // ═══════════════════════════════════════════════════════════
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
        'N1E': { city: 'Guelph', province: 'Ontario', country: 'Canada', lat: 43.5448, lng: -80.2482 },
        'N1K': { city: 'Guelph', province: 'Ontario', country: 'Canada', lat: 43.5448, lng: -80.2482 },
        'N1R': { city: 'Cambridge', province: 'Ontario', country: 'Canada', lat: 43.3616, lng: -80.3144 },
        'N1T': { city: 'Cambridge', province: 'Ontario', country: 'Canada', lat: 43.3616, lng: -80.3144 },
        'N3C': { city: 'Cambridge', province: 'Ontario', country: 'Canada', lat: 43.3616, lng: -80.3144 },
        'N3E': { city: 'Cambridge', province: 'Ontario', country: 'Canada', lat: 43.3616, lng: -80.3144 },
        'N3H': { city: 'Cambridge', province: 'Ontario', country: 'Canada', lat: 43.3616, lng: -80.3144 },
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
        'N5X': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N5Y': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N5Z': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N6B': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N6C': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N6E': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N6G': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N6H': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N6J': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N6K': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N6L': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N6M': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N6N': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N6P': { city: 'London', province: 'Ontario', country: 'Canada', lat: 42.9849, lng: -81.2453 },
        'N7S': { city: 'St. Thomas', province: 'Ontario', country: 'Canada', lat: 42.7784, lng: -81.1754 },
        'N7G': { city: 'Sarnia', province: 'Ontario', country: 'Canada', lat: 42.9745, lng: -82.4066 },
        'N7T': { city: 'Sarnia', province: 'Ontario', country: 'Canada', lat: 42.9745, lng: -82.4066 },
        'N7V': { city: 'Sarnia', province: 'Ontario', country: 'Canada', lat: 42.9745, lng: -82.4066 },
        'N7W': { city: 'Sarnia', province: 'Ontario', country: 'Canada', lat: 42.9745, lng: -82.4066 },
        'N7X': { city: 'Sarnia', province: 'Ontario', country: 'Canada', lat: 42.9745, lng: -82.4066 },
        'N8H': { city: 'Chatham', province: 'Ontario', country: 'Canada', lat: 42.4048, lng: -82.1910 },
        'N8N': { city: 'Leamington', province: 'Ontario', country: 'Canada', lat: 42.0534, lng: -82.5998 },
        'N8P': { city: 'Kingsville', province: 'Ontario', country: 'Canada', lat: 42.0372, lng: -82.7373 },
        'N9A': { city: 'Windsor', province: 'Ontario', country: 'Canada', lat: 42.3149, lng: -83.0364 },
        'N8X': { city: 'Windsor', province: 'Ontario', country: 'Canada', lat: 42.3149, lng: -83.0364 },
        'N8Y': { city: 'Windsor', province: 'Ontario', country: 'Canada', lat: 42.3149, lng: -83.0364 },
        'N9B': { city: 'Windsor', province: 'Ontario', country: 'Canada', lat: 42.3149, lng: -83.0364 },
        'N9C': { city: 'Windsor', province: 'Ontario', country: 'Canada', lat: 42.3149, lng: -83.0364 },
        'N9E': { city: 'Windsor', province: 'Ontario', country: 'Canada', lat: 42.3149, lng: -83.0364 },
        'N9G': { city: 'Windsor', province: 'Ontario', country: 'Canada', lat: 42.3149, lng: -83.0364 },
        'N9H': { city: 'Windsor', province: 'Ontario', country: 'Canada', lat: 42.3149, lng: -83.0364 },
        'N9J': { city: 'Windsor', province: 'Ontario', country: 'Canada', lat: 42.3149, lng: -83.0364 },
        'K7L': { city: 'Kingston', province: 'Ontario', country: 'Canada', lat: 44.2312, lng: -76.4860 },
        'K7K': { city: 'Kingston', province: 'Ontario', country: 'Canada', lat: 44.2312, lng: -76.4860 },
        'K7M': { city: 'Kingston', province: 'Ontario', country: 'Canada', lat: 44.2312, lng: -76.4860 },
        'K7N': { city: 'Kingston', province: 'Ontario', country: 'Canada', lat: 44.2312, lng: -76.4860 },
        'K7P': { city: 'Kingston', province: 'Ontario', country: 'Canada', lat: 44.2312, lng: -76.4860 },
        'K9J': { city: 'Peterborough', province: 'Ontario', country: 'Canada', lat: 44.3091, lng: -78.3197 },
        'K9H': { city: 'Peterborough', province: 'Ontario', country: 'Canada', lat: 44.3091, lng: -78.3197 },
        'K9K': { city: 'Peterborough', province: 'Ontario', country: 'Canada', lat: 44.3091, lng: -78.3197 },
        'K9L': { city: 'Peterborough', province: 'Ontario', country: 'Canada', lat: 44.3091, lng: -78.3197 },
        'L9V': { city: 'Orangeville', province: 'Ontario', country: 'Canada', lat: 43.9197, lng: -80.0942 },
        'L9W': { city: 'Orangeville', province: 'Ontario', country: 'Canada', lat: 43.9197, lng: -80.0942 },
        'L2E': { city: 'St. Catharines', province: 'Ontario', country: 'Canada', lat: 43.1594, lng: -79.2469 },
        'L2G': { city: 'St. Catharines', province: 'Ontario', country: 'Canada', lat: 43.1594, lng: -79.2469 },
        'L2M': { city: 'St. Catharines', province: 'Ontario', country: 'Canada', lat: 43.1594, lng: -79.2469 },
        'L2N': { city: 'St. Catharines', province: 'Ontario', country: 'Canada', lat: 43.1594, lng: -79.2469 },
        'L2P': { city: 'St. Catharines', province: 'Ontario', country: 'Canada', lat: 43.1594, lng: -79.2469 },
        'L2R': { city: 'St. Catharines', province: 'Ontario', country: 'Canada', lat: 43.1594, lng: -79.2469 },
        'L2S': { city: 'St. Catharines', province: 'Ontario', country: 'Canada', lat: 43.1594, lng: -79.2469 },
        'L2T': { city: 'St. Catharines', province: 'Ontario', country: 'Canada', lat: 43.1594, lng: -79.2469 },
        'L2V': { city: 'St. Catharines', province: 'Ontario', country: 'Canada', lat: 43.1594, lng: -79.2469 },
        'L2W': { city: 'St. Catharines', province: 'Ontario', country: 'Canada', lat: 43.1594, lng: -79.2469 },
        'L0S': { city: 'Niagara Falls', province: 'Ontario', country: 'Canada', lat: 43.0896, lng: -79.0849 },
        'L2H': { city: 'Niagara Falls', province: 'Ontario', country: 'Canada', lat: 43.0896, lng: -79.0849 },
        'L2J': { city: 'Niagara Falls', province: 'Ontario', country: 'Canada', lat: 43.0896, lng: -79.0849 },
        'L3K': { city: 'Welland', province: 'Ontario', country: 'Canada', lat: 42.9834, lng: -79.2482 },
        'L3B': { city: 'Welland', province: 'Ontario', country: 'Canada', lat: 42.9834, lng: -79.2482 },
        'L3C': { city: 'Welland', province: 'Ontario', country: 'Canada', lat: 42.9834, lng: -79.2482 },
        'L0R': { city: 'Fort Erie', province: 'Ontario', country: 'Canada', lat: 42.9048, lng: -78.9324 },
        'L2A': { city: 'Fort Erie', province: 'Ontario', country: 'Canada', lat: 42.9048, lng: -78.9324 },
        
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
        'V3W': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V3V': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V3X': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V3Z': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V4A': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V4B': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V4E': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V4P': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V4N': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V3J': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V3N': { city: 'Surrey', province: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490 },
        'V2S': { city: 'Abbotsford', province: 'British Columbia', country: 'Canada', lat: 49.0504, lng: -122.3045 },
        'V2T': { city: 'Abbotsford', province: 'British Columbia', country: 'Canada', lat: 49.0504, lng: -122.3045 },
        'V4X': { city: 'Delta', province: 'British Columbia', country: 'Canada', lat: 49.0847, lng: -123.0586 },
        'V4C': { city: 'Delta', province: 'British Columbia', country: 'Canada', lat: 49.0847, lng: -123.0586 },
        'V6V': { city: 'Richmond', province: 'British Columbia', country: 'Canada', lat: 49.1666, lng: -123.1336 },
        'V6X': { city: 'Richmond', province: 'British Columbia', country: 'Canada', lat: 49.1666, lng: -123.1336 },
        'V7A': { city: 'Richmond', province: 'British Columbia', country: 'Canada', lat: 49.1666, lng: -123.1336 },
        'V7C': { city: 'Richmond', province: 'British Columbia', country: 'Canada', lat: 49.1666, lng: -123.1336 },
        'V2Y': { city: 'Chilliwack', province: 'British Columbia', country: 'Canada', lat: 49.1577, lng: -121.9509 },
        'V2R': { city: 'Kilgard', province: 'British Columbia', country: 'Canada', lat: 49.1200, lng: -122.0500 },
        'V4Z': { city: 'Chilliwack', province: 'British Columbia', country: 'Canada', lat: 49.1577, lng: -121.9509 },
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
        'V0N': { city: 'Whistler', province: 'British Columbia', country: 'Canada', lat: 50.1163, lng: -122.9574 },
        'V8G': { city: 'Whistler', province: 'British Columbia', country: 'Canada', lat: 50.1163, lng: -122.9574 },
        'V0A': { city: 'Squamish', province: 'British Columbia', country: 'Canada', lat: 49.7016, lng: -123.1558 },
        'V8B': { city: 'Squamish', province: 'British Columbia', country: 'Canada', lat: 49.7016, lng: -123.1558 },
        'V0E': { city: 'Kamloops', province: 'British Columbia', country: 'Canada', lat: 50.6745, lng: -120.3273 },
        
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
        'T1W': { city: 'Canmore', province: 'Alberta', country: 'Canada', lat: 51.0888, lng: -115.3620 },
        'T0L': { city: 'Banff', province: 'Alberta', country: 'Canada', lat: 51.1784, lng: -115.5708 },
        'T1L': { city: 'Cochrane', province: 'Alberta', country: 'Canada', lat: 51.1942, lng: -114.4686 },
        'T0M': { city: 'Jasper', province: 'Alberta', country: 'Canada', lat: 52.8737, lng: -118.0814 },
        'T4C': { city: 'Grande Prairie', province: 'Alberta', country: 'Canada', lat: 55.1707, lng: -118.7947 },
        'T8V': { city: 'Grande Prairie', province: 'Alberta', country: 'Canada', lat: 55.1707, lng: -118.7947 },
        'T9V': { city: 'Wood Buffalo', province: 'Alberta', country: 'Canada', lat: 56.7267, lng: -111.3790 },
        'T7A': { city: 'Wetaskiwin', province: 'Alberta', country: 'Canada', lat: 52.9692, lng: -113.3769 },
        'T4E': { city: 'Lacombe', province: 'Alberta', country: 'Canada', lat: 52.4681, lng: -113.7369 },
        'T0C': { city: 'Drumheller', province: 'Alberta', country: 'Canada', lat: 51.4639, lng: -112.7094 },
        'T0J': { city: 'Brooks', province: 'Alberta', country: 'Canada', lat: 50.5639, lng: -111.8989 },
        'T1H': { city: 'Taber', province: 'Alberta', country: 'Canada', lat: 49.7847, lng: -112.1497 },
        
        // ═══════════════════════════════════════════════════════════
        // QUEBEC
        // ═══════════════════════════════════════════════════════════
        'H2X': { city: 'Montreal', province: 'Quebec', country: 'Canada', lat: 45.5017, lng: -73.5673 },
        'H3A': { city: 'Montreal', province: 'Quebec', country: 'Canada', lat: 45.5017, lng: -73.5673 },
        'H3B': { city: 'Montreal', province: 'Quebec', country: 'Canada', lat: 45.5017, lng: -73.5673 },
        'H3G': { city: 'Montreal', province: 'Quebec', country: 'Canada', lat: 45.5017, lng: -73.5673 },
        'H2Y': { city: 'Montreal', province: 'Quebec', country: 'Canada', lat: 45.5017, lng: -73.5673 },
        'H4A': { city: 'Laval', province: 'Quebec', country: 'Canada', lat: 45.6066, lng: -73.7124 },
        'H7S': { city: 'Laval', province: 'Quebec', country: 'Canada', lat: 45.6066, lng: -73.7124 },
        'J5A': { city: 'Salaberry-de-Valleyfield', province: 'Quebec', country: 'Canada', lat: 45.2500, lng: -74.1333 },
        'J3V': { city: 'Saint-Jean-sur-Richelieu', province: 'Quebec', country: 'Canada', lat: 45.3075, lng: -73.2625 },
        'J2S': { city: 'Granby', province: 'Quebec', country: 'Canada', lat: 45.4000, lng: -72.7333 },
        'J1L': { city: 'Drummondville', province: 'Quebec', country: 'Canada', lat: 45.8833, lng: -72.4833 },
        'J9H': { city: 'Rouyn-Noranda', province: 'Quebec', country: 'Canada', lat: 48.2333, lng: -79.0167 },
        'G5L': { city: 'Rimouski', province: 'Quebec', country: 'Canada', lat: 48.4500, lng: -68.5333 },
        'J8Y': { city: 'Val-d\'Or', province: 'Quebec', country: 'Canada', lat: 48.0972, lng: -77.7828 },
        'G7X': { city: 'Saguenay', province: 'Quebec', country: 'Canada', lat: 48.4167, lng: -71.0667 },
        'G8B': { city: 'Shawinigan', province: 'Quebec', country: 'Canada', lat: 46.5667, lng: -72.7500 },
        
        // ═══════════════════════════════════════════════════════════
        // SASKATCHEWAN
        // ═══════════════════════════════════════════════════════════'Longueuil', province: 'Quebec', country: 'Canada', lat: 45.5312, lng: -73.5183 },
        'J4J': { city: 'Longueuil', province: 'Quebec', country: 'Canada', lat: 45.5312, lng: -73.5183 },
        'J7Y': { city: 'Terrebonne', province: 'Quebec', country: 'Canada', lat: 45.7004, lng: -73.6472 },
        'J6W': { city: 'Terrebonne', province: 'Quebec', country: 'Canada', lat: 45.7004, lng: -73.6472 },
        'G1R': { city: 'Quebec City', province: 'Quebec', country: 'Canada', lat: 46.8139, lng: -71.2080 },
        'G1K': { city: 'Quebec City', province: 'Quebec', country: 'Canada', lat: 46.8139, lng: -71.2080 },
        'G1V': { city: 'Quebec City', province: 'Quebec', country: 'Canada', lat: 46.8139, lng: -71.2080 },
        'S9A': { city: 'Moose Jaw', province: 'Saskatchewan', country: 'Canada', lat: 50.3933, lng: -105.5519 },
        'S9V': { city: 'Prince Albert', province: 'Saskatchewan', country: 'Canada', lat: 53.2033, lng: -105.7531 },
        'S6V': { city: 'Swift Current', province: 'Saskatchewan', country: 'Canada', lat: 50.2881, lng: -107.7939 },
        'S7K': { city: 'Yorkton', province: 'Saskatchewan', country: 'Canada', lat: 51.2139, lng: -102.4628 },
        'S0G': { city: 'Estevan', province: 'Saskatchewan', country: 'Canada', lat: 49.1392, lng: -102.9861 },
        'S4L': { city: 'Weyburn', province: 'Saskatchewan', country: 'Canada', lat: 49.6617, lng: -103.8525 },
        
        // ═══════════════════════════════════════════════════════════
        // MANITOBA
        // ═══════════════════════════════════════════════════════════ty: 'Sherbrooke', province: 'Quebec', country: 'Canada', lat: 45.4042, lng: -71.8929 },
        'J1K': { city: 'Sherbrooke', province: 'Quebec', country: 'Canada', lat: 45.4042, lng: -71.8929 },
        'G8T': { city: 'Trois-Rivières', province: 'Quebec', country: 'Canada', lat: 46.3432, lng: -72.5477 },
        'G9A': { city: 'Trois-Rivières', province: 'Quebec', country: 'Canada', lat: 46.3432, lng: -72.5477 },
        
        // Saskatchewan
        'S4P': { city: 'Regina', province: 'Saskatchewan', country: 'Canada', lat: 50.4452, lng: -104.6189 },
        'R2K': { city: 'Winnipeg', province: 'Manitoba', country: 'Canada', lat: 49.8951, lng: -97.1384 },
        'R7A': { city: 'Brandon', province: 'Manitoba', country: 'Canada', lat: 49.8483, lng: -99.9501 },
        'R8N': { city: 'Thompson', province: 'Manitoba', country: 'Canada', lat: 55.7433, lng: -97.8553 },
        'R3Y': { city: 'Steinbach', province: 'Manitoba', country: 'Canada', lat: 49.5258, lng: -96.6839 },
        'R5H': { city: 'Portage la Prairie', province: 'Manitoba', country: 'Canada', lat: 49.9728, lng: -98.2919 },
        
        // ═══════════════════════════════════════════════════════════
        'B1S': { city: 'Sydney', province: 'Nova Scotia', country: 'Canada', lat: 46.1389, lng: -60.1939 },
        'B2N': { city: 'New Glasgow', province: 'Nova Scotia', country: 'Canada', lat: 45.5833, lng: -62.6333 },
        'B4V': { city: 'Truro', province: 'Nova Scotia', country: 'Canada', lat: 45.3667, lng: -63.2667 },
        'B0P': { city: 'Yarmouth', province: 'Nova Scotia', country: 'Canada', lat: 43.8372, lng: -66.1175 },
        'B4N': { city: 'Kentville', province: 'Nova Scotia', country: 'Canada', lat: 45.0775, lng: -64.4958 },
        
        // ═══════════════════════════════════════════════════════════
        // NEW BRUNSWICK
        // ═════════════════════════════════════════════════════════════════════════════════════════════════════════ 'Saskatoon', province: 'Saskatchewan', country: 'Canada', lat: 52.1332, lng: -106.6700 },
        'S7N': { city: 'Saskatoon', province: 'Saskatchewan', country: 'Canada', lat: 52.1332, lng: -106.6700 },
        
        // Manitoba
        'R3C': { city: 'Winnipeg', province: 'Manitoba', country: 'Canada', lat: 49.8951, lng: -97.1384 },
        'R3G': { city: 'Winnipeg', province: 'Manitoba', country: 'Canada', lat: 49.8951, lng: -97.1384 },
        'R3T': { city: 'Winnipeg', province: 'Manitoba', country: 'Canada', lat: 49.8951, lng: -97.1384 },
        
        'E1A': { city: 'Dieppe', province: 'New Brunswick', country: 'Canada', lat: 46.0972, lng: -64.7311 },
        'E4A': { city: 'Bathurst', province: 'New Brunswick', country: 'Canada', lat: 47.6186, lng: -65.6506 },
        'E7A': { city: 'Edmundston', province: 'New Brunswick', country: 'Canada', lat: 47.3736, lng: -68.3250 },
        'E3A': { city: 'Miramichi', province: 'New Brunswick', country: 'Canada', lat: 47.0289, lng: -65.5000 },
        'A8A': { city: 'Corner Brook', province: 'Newfoundland and Labrador', country: 'Canada', lat: 48.9500, lng: -57.9500 },
        'A2H': { city: 'Mount Pearl', province: 'Newfoundland and Labrador', country: 'Canada', lat: 47.5189, lng: -52.8058 },
        'A0A': { city: 'Gander', province: 'Newfoundland and Labrador', country: 'Canada', lat: 48.9569, lng: -54.6089 },
        'A2V': { city: 'Grand Falls-Windsor', province: 'Newfoundland and Labrador', country: 'Canada', lat: 48.9331, lng: -55.6667 },
        
        // ═══════════════════════════════════════════════════════════
        // PRINCE EDWARD ISLAND
        // ═══════════════════════════════════════════════════════════
        'C1A': { city: 'Charlottetown', province: 'Prince Edward Island', country: 'Canada', lat: 46.2382, lng: -63.1311 },
        'C1E': { city: 'Charlottetown', province: 'Prince Edward Island', country: 'Canada', lat: 46.2382, lng: -63.1311 },
        'C1B': { city: 'Summerside', province: 'Prince Edward Island', country: 'Canada', lat: 46.3956, lng: -63.7889 },
        
        // ═══════════════════════════════════════════════════════════
        // USA - NEW YORK
        // ═══════════════════════════════════════════════════════════
        '10001': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10004': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10005': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10006': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10007': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10002': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10009': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10010': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10011': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10012': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        
        // ═══════════════════════════════════════════════════════════
        // USA - ILLINOIS
        // ═══════════════════════════════════════════════════════════
        '60601': { city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298 },
        '60602': { city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298 },
        '60603': { city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298 },
        '60604': { city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298 },
        '60605': { city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298 },
        
        // ═══════════════════════════════════════════════════════════
        // USA - CALIFORNIA (Bay Area)
        // ═══════════════════════════════════════════════════════════
        '94103': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94104': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94105': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94106': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94107': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94108': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94109': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94110': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94111': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94112': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94114': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94115': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94116': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94117': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        '94118': { city: 'San Francisco', state: 'CA', country: 'USA', lat: 37.7749, lng: -122.4194 },
        
        // ═══════════════════════════════════════════════════════════
        // USA - MASSACHUSETTS
        // ═══════════════════════════════════════════════════════════
        '02108': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02109': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02110': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02111': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02112': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02113': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02114': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02115': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02116': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02117': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02118': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02119': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02120': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02121': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02122': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02123': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02124': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02125': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02126': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02127': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02128': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02129': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02130': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02131': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02132': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02133': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02134': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02135': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02136': { city: 'Boston', state: 'MA', country: 'USA', lat: 42.3601, lng: -71.0589 },
        '02139': { city: 'Cambridge', state: 'MA', country: 'USA', lat: 42.3736, lng: -71.1097 },
        '02140': { city: 'Cambridge', state: 'MA', country: 'USA', lat: 42.3736, lng: -71.1097 },
        '02141': { city: 'Cambridge', state: 'MA', country: 'USA', lat: 42.3736, lng: -71.1097 },
        '02142': { city: 'Cambridge', state: 'MA', country: 'USA', lat: 42.3736, lng: -71.1097 },
        '01001': { city: 'Springfield', state: 'MA', country: 'USA', lat: 42.1015, lng: -72.5898 },
        '01540': { city: 'Worcester', state: 'MA', country: 'USA', lat: 42.2626, lng: -71.8023 },
        
        // ═══════════════════════════════════════════════════════════
        // USA - WASHINGTON
        // ═══════════════════════════════════════════════════════════
        '98101': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98102': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98103': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98104': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98105': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98106': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98107': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98108': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98109': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98110': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98111': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98112': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98113': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98114': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98115': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98116': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98117': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98118': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98119': { city: 'Seattle', state: 'WA', country: 'USA', lat: 47.6062, lng: -122.3321 },
        '98052': { city: 'Redmond', state: 'WA', country: 'USA', lat: 47.6740, lng: -122.1215 },
        '98053': { city: 'Redmond', state: 'WA', country: 'USA', lat: 47.6740, lng: -122.1215 },
        '98033': { city: 'Bellevue', state: 'WA', country: 'USA', lat: 47.6101, lng: -122.2015 },
        '98004': { city: 'Bellevue', state: 'WA', country: 'USA', lat: 47.6101, lng: -122.2015 },
        '98005': { city: 'Bellevue', state: 'WA', country: 'USA', lat: 47.6101, lng: -122.2015 },
        '98006': { city: 'Bellevue', state: 'WA', country: 'USA', lat: 47.6101, lng: -122.2015 },
        '99201': { city: 'Spokane', state: 'WA', country: 'USA', lat: 47.6588, lng: -117.4260 },
        '98501': { city: 'Olympia', state: 'WA', country: 'USA', lat: 47.0379, lng: -122.9007 },
        '98661': { city: 'Vancouver', state: 'WA', country: 'USA', lat: 45.6387, lng: -122.6615 },
        
        // ═══════════════════════════════════════════════════════════
        // USA - FLORIDA
        // ═══════════════════════════════════════════════════════════
        '33101': { city: 'Miami', state: 'FL', country: 'USA', lat: 25.7617, lng: -80.1918 },
        '33102': { city: 'Miami', state: 'FL', country: 'USA', lat: 25.7617, lng: -80.1918 },
        '33103': { city: 'Miami', state: 'FL', country: 'USA', lat: 25.7617, lng: -80.1918 },
        '33104': { city: 'Miami', state: 'FL', country: 'USA', lat: 25.7617, lng: -80.1918 },
        '33105': { city: 'Miami', state: 'FL', country: 'USA', lat: 25.7617, lng: -80.1918 },
        '33106': { city: 'Miami', state: 'FL', country: 'USA', lat: 25.7617, lng: -80.1918 },
        '33107': { city: 'Miami', state: 'FL', country: 'USA', lat: 25.7617, lng: -80.1918 },
        '33108': { city: 'Miami', state: 'FL', country: 'USA', lat: 25.7617, lng: -80.1918 },
        '33109': { city: 'Miami', state: 'FL', country: 'USA', lat: 25.7617, lng: -80.1918 },
        '32801': { city: 'Orlando', state: 'FL', country: 'USA', lat: 28.5383, lng: -81.3792 },
        '32802': { city: 'Orlando', state: 'FL', country: 'USA', lat: 28.5383, lng: -81.3792 },
        '32803': { city: 'Orlando', state: 'FL', country: 'USA', lat: 28.5383, lng: -81.3792 },
        '33301': { city: 'Fort Lauderdale', state: 'FL', country: 'USA', lat: 26.1224, lng: -80.1373 },
        '33401': { city: 'West Palm Beach', state: 'FL', country: 'USA', lat: 26.7153, lng: -80.0534 },
        '33601': { city: 'Tampa', state: 'FL', country: 'USA', lat: 27.9506, lng: -82.4572 },
        '33602': { city: 'Tampa', state: 'FL', country: 'USA', lat: 27.9506, lng: -82.4572 },
        '32901': { city: 'Jacksonville', state: 'FL', country: 'USA', lat: 30.3322, lng: -81.6557 },
        
        // ═══════════════════════════════════════════════════════════
        // USA - ARIZONA
        // ═══════════════════════════════════════════════════════════
        '78701': { city: 'Austin', state: 'TX', country: 'USA', lat: 30.2672, lng: -97.7431 },
        '78702': { city: 'Austin', state: 'TX', country: 'USA', lat: 30.2672, lng: -97.7431 },
        '78703': { city: 'Austin', state: 'TX', country: 'USA', lat: 30.2672, lng: -97.7431 },
        '85001': { city: 'Phoenix', state: 'AZ', country: 'USA', lat: 33.4484, lng: -112.0740 },
        '85002': { city: 'Phoenix', state: 'AZ', country: 'USA', lat: 33.4484, lng: -112.0740 },
        '85003': { city: 'Phoenix', state: 'AZ', country: 'USA', lat: 33.4484, lng: -112.0740 },
        '85004': { city: 'Phoenix', state: 'AZ', country: 'USA', lat: 33.4484, lng: -112.0740 },
        '85005': { city: 'Phoenix', state: 'AZ', country: 'USA', lat: 33.4484, lng: -112.0740 },
        '85006': { city: 'Phoenix', state: 'AZ', country: 'USA', lat: 33.4484, lng: -112.0740 },
        '85007': { city: 'Phoenix', state: 'AZ', country: 'USA', lat: 33.4484, lng: -112.0740 },
        '85701': { city: 'Tucson', state: 'AZ', country: 'USA', lat: 32.2226, lng: -110.9747 },
        '85281': { city: 'Tempe', state: 'AZ', country: 'USA', lat: 33.4255, lng: -111.9400 },
        '85201': { city: 'Mesa', state: 'AZ', country: 'USA', lat: 33.4152, lng: -111.8315 },
        '85251': { city: 'Scottsdale', state: 'AZ', country: 'USA', lat: 33.4942, lng: -111.9261 },
        
        // ═══════════════════════════════════════════════════════════
        // USA - OTHER MAJOR CITIES
        // ═══════════════════════════════════════════════════════════
        '80201': { city: 'Denver', state: 'CO', country: 'USA', lat: 39.7392, lng: -104.9903 },
        '80202': { city: 'Denver', state: 'CO', country: 'USA', lat: 39.7392, lng: -104.9903 },
        '97201': { city: 'Portland', state: 'OR', country: 'USA', lat: 45.5152, lng: -122.6784 },
        '97202': { city: 'Portland', state: 'OR', country: 'USA', lat: 45.5152, lng: -122.6784 },
        '89101': { city: 'Las Vegas', state: 'NV', country: 'USA', lat: 36.1699, lng: -115.1398 },
        '89102': { city: 'Las Vegas', state: 'NV', country: 'USA', lat: 36.1699, lng: -115.1398 },
        '63101': { city: 'St. Louis', state: 'MO', country: 'USA', lat: 38.6270, lng: -90.1994 },
        '64101': { city: 'Kansas City', state: 'MO', country: 'USA', lat: 39.0997, lng: -94.5786 },
        '55401': { city: 'Minneapolis', state: 'MN', country: 'USA', lat: 44.9778, lng: -93.2650 },
        '19101': { city: 'Philadelphia', state: 'PA', country: 'USA', lat: 39.9526, lng: -75.1652 },
        '19102': { city: 'Philadelphia', state: 'PA', country: 'USA', lat: 39.9526, lng: -75.1652 },
        '15201': { city: 'Pittsburgh', state: 'PA', country: 'USA', lat: 40.4406, lng: -79.9959 },
        '30301': { city: 'Atlanta', state: 'GA', country: 'USA', lat: 33.7490, lng: -84.3880 },
        '30302': { city: 'Atlanta', state: 'GA', country: 'USA', lat: 33.7490, lng: -84.3880 },
        '28201': { city: 'Charlotte', state: 'NC', country: 'USA', lat: 35.2271, lng: -80.8431 },
        '27601': { city: 'Raleigh', state: 'NC', country: 'USA', lat: 35.7796, lng: -78.6382 },
        '20001': { city: 'Washington', state: 'DC', country: 'USA', lat: 38.9072, lng: -77.0369 },
        '20002': { city: 'Washington', state: 'DC', country: 'USA', lat: 38.9072, lng: -77.0369 },
        '21201': { city: 'Baltimore', state: 'MD', country: 'USA', lat: 39.2904, lng: -76.6122 },
        '43201': { city: 'Columbus', state: 'OH', country: 'USA', lat: 39.9612, lng: -82.9988 },
        '45201': { city: 'Cincinnati', state: 'OH', country: 'USA', lat: 39.1031, lng: -84.5120 },
        '44101': { city: 'Cleveland', state: 'OH', country: 'USA', lat: 41.4993, lng: -81.6944 },
        '46201': { city: 'Indianapolis', state: 'IN', country: 'USA', lat: 39.7684, lng: -86.1581 },
        '48201': { city: 'Detroit', state: 'MI', country: 'USA', lat: 42.3314, lng: -83.0458 },
        '53201': { city: 'Milwaukee', state: 'WI', country: 'USA', lat: 43.0389, lng: -87.9065 },
        '70112': { city: 'New Orleans', state: 'LA', country: 'USA', lat: 29.9511, lng: -90.0715 },
        '37201': { city: 'Nashville', state: 'TN', country: 'USA', lat: 36.1627, lng: -86.7816 },
        '38103': { city: 'Memphis', state: 'TN', country: 'USA', lat: 35.1495, lng: -90.0490 },
        '73101': { city: 'Oklahoma City', state: 'OK', country: 'USA', lat: 35.4676, lng: -97.5164 },
        '87101': { city: 'Albuquerque', state: 'NM', country: 'USA', lat: 35.0844, lng: -106.6504 },
        '84101': { city: 'Salt Lake City', state: 'UT', country: 'USA', lat: 40.7608, lng: -111.8910 },
        '96801': { city: 'Honolulu', state: 'HI', country: 'USA', lat: 21.3099, lng: -157.8581 },
        '99501': { city: 'Anchorage', state: 'AK', country: 'USA', lat: 61.2181, lng: -149.9003},
        '60614': { city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298 },
        '60615': { city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298 },
        '60616': { city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298 },
        '60617': { city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298 },
        '60618': { city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298 },
        '60619': { city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298 },
        '60620': { city: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lng: -87.6298 },
        
        // ═══════════════════════════════════════════════════════════
        // USA - TEXAS
        // ═══════════════════════════════════════════════════════════
        '75201': { city: 'Dallas', state: 'TX', country: 'USA', lat: 32.7767, lng: -96.7970 },
        '75202': { city: 'Dallas', state: 'TX', country: 'USA', lat: 32.7767, lng: -96.7970 },
        '75203': { city: 'Dallas', state: 'TX', country: 'USA', lat: 32.7767, lng: -96.7970 },
        '77001': { city: 'Houston', state: 'TX', country: 'USA', lat: 29.7604, lng: -95.3698 },
        '77002': { city: 'Houston', state: 'TX', country: 'USA', lat: 29.7604, lng: -95.3698 },
        '77003': { city: 'Houston', state: 'TX', country: 'USA', lat: 29.7604, lng: -95.3698 },
        '78201': { city: 'San Antonio', state: 'TX', country: 'USA', lat: 29.4241, lng: -98.4936 },
        '78202': { city: 'San Antonio', state: 'TX', country: 'USA', lat: 29.4241, lng: -98.4936 },
        
        // ═══════════════════════════════════════════════════════════
        // USA - CALIFORNIA (Los Angeles)
        // ═══════════════════════════════════════════════════════════
        '90004': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90005': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90006': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90007': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90008': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90009': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90010': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90011': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90012': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90013': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90014': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90015': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90016': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90017': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90018': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90019': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90020': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90021': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90022': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90023': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90024': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90025': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90026': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90027': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90028': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90029': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90030': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90031': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90032': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90033': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90034': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90035': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90036': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90037': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90038': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90039': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90040': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90041': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90042': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90043': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90044': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90045': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90046': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90047': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90048': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90049': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90050': { city: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lng: -118.2437 },
        '90210': { city: 'Beverly Hills', state: 'CA', country: 'USA', lat: 34.0736, lng: -118.4004 },
        '90211': { city: 'Beverly Hills', state: 'CA', country: 'USA', lat: 34.0736, lng: -118.4004 },
        '90212': { city: 'Beverly Hills', state: 'CA', country: 'USA', lat: 34.0736, lng: -118.4004 },
        '92101': { city: 'San Diego', state: 'CA', country: 'USA', lat: 32.7157, lng: -117.1611 },
        '92102': { city: 'San Diego', state: 'CA', country: 'USA', lat: 32.7157, lng: -117.1611 },
        '92103': { city: 'San Diego', state: 'CA', country: 'USA', lat: 32.7157, lng: -117.1611 },
        '92104': { city: 'San Diego', state: 'CA', country: 'USA', lat: 32.7157, lng: -117.1611 },
        '92105': { city: 'San Diego', state: 'CA', country: 'USA', lat: 32.7157, lng: -117.1611 },
        '95101': { city: 'San Jose', state: 'CA', country: 'USA', lat: 37.3382, lng: -121.8863 },
        '95102': { city: 'San Jose', state: 'CA', country: 'USA', lat: 37.3382, lng: -121.8863 },
        '95103': { city: 'San Jose', state: 'CA', country: 'USA', lat: 37.3382, lng: -121.8863 },
        '93301': { city: 'Bakersfield', state: 'CA', country: 'USA', lat: 35.3733, lng: -119.0187 },
        '93451': { city: 'Santa Maria', state: 'CA', country: 'USA', lat: 34.9530, lng: -120.4357 },
        '93901': { city: 'Salinas', state: 'CA', country: 'USA', lat: 36.6777, lng: -121.6555 },
        '94501': { city: 'Alameda', state: 'CA', country: 'USA', lat: 37.7652, lng: -122.2416 },
        '94601': { city: 'Oakland', state: 'CA', country: 'USA', lat: 37.8044, lng: -122.2712 },
        '94801': { city: 'Richmond', state: 'CA', country: 'USA', lat: 37.9358, lng: -122.3477 },
        '91501': { city: 'Burbank', state: 'CA', country: 'USA', lat: 34.1808, lng: -118.3090 },
        '91101': { city: 'Pasadena', state: 'CA', country: 'USA', lat: 34.1478, lng: -118.1445 },
        '92801': { city: 'Anaheim', state: 'CA', country: 'USA', lat: 33.8366, lng: -117.9143 },
        '92602': { city: 'Irvine', state: 'CA', country: 'USA', lat: 33.6846, lng: -117.8265 },
        '92701': { city: 'Santa Ana', state: 'CA', country: 'USA', lat: 33.7455, lng: -117.8677 },
        '90501': { city: 'Torrance', state: 'CA', country: 'USA', lat: 33.8358, lng: -118.3406 },
        '90301': { city: 'Inglewood', state: 'CA', country: 'USA', lat: 33.9617, lng: -118.3531 },
        '91001': { city: 'Arcadia', state: 'CA', country: 'USA', lat: 34.1397, lng: -118.0353 },
        
        // ═══════════════════════════════════════════════════════════
        // USA - NEW YORK (Additional Codes)
        // ═══════════════════════════════════════════════════════════
        '10014': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10016': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10017': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10018': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10019': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10020': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10021': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10022': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10023': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10024': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10025': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10026': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10027': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10028': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10029': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10030': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10031': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10032': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10033': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10034': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10035': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10036': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10037': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10038': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10039': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '10040': { city: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lng: -74.0060 },
        '11201': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11202': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11203': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11204': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11205': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11206': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11207': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11208': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11209': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11210': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11211': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11212': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11213': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11214': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11215': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11216': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11217': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11218': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11219': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11220': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11221': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11222': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11223': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11224': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11225': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '11226': { city: 'Brooklyn', state: 'NY', country: 'USA', lat: 40.6782, lng: -73.9442 },
        '10301': { city: 'Staten Island', state: 'NY', country: 'USA', lat: 40.6337, lng: -74.0834 },
        '10302': { city: 'Staten Island', state: 'NY', country: 'USA', lat: 40.6337, lng: -74.0834 },
        '10303': { city: 'Staten Island', state: 'NY', country: 'USA', lat: 40.6337, lng: -74.0834 },
        '10304': { city: 'Staten Island', state: 'NY', country: 'USA', lat: 40.6337, lng: -74.0834 },
        '10305': { city: 'Staten Island', state: 'NY', country: 'USA', lat: 40.6337, lng: -74.0834 },
        '11101': { city: 'Queens', state: 'NY', country: 'USA', lat: 40.7282, lng: -73.9442 },
        '11102': { city: 'Queens', state: 'NY', country: 'USA', lat: 40.7282, lng: -73.9442 },
        '11103': { city: 'Queens', state: 'NY', country: 'USA', lat: 40.7282, lng: -73.9442 },
        '11104': { city: 'Queens', state: 'NY', country: 'USA', lat: 40.7282, lng: -73.9442 },
        '11105': { city: 'Queens', state: 'NY', country: 'USA', lat: 40.7282, lng: -73.9442 },
        '10451': { city: 'Bronx', state: 'NY', country: 'USA', lat: 40.8448, lng: -73.8648 },
        '10452': { city: 'Bronx', state: 'NY', country: 'USA', lat: 40.8448, lng: -73.8648 },
        '10453': { city: 'Bronx', state: 'NY', country: 'USA', lat: 40.8448, lng: -73.8648 },
        '10454': { city: 'Bronx', state: 'NY', country: 'USA', lat: 40.8448, lng: -73.8648 },
        '10455': { city: 'Bronx', state: 'NY', country: 'USA', lat: 40.8448, lng: -73.8648 },
        '12201': { city: 'Albany', state: 'NY', country: 'USA', lat: 42.6526, lng: -73.7562 },
        '14201': { city: 'Buffalo', state: 'NY', country: 'USA', lat: 42.8864, lng: -78.8784 },
        '13201': { city: 'Syracuse', state: 'NY', country: 'USA', lat: 43.0481, lng: -76.1474 },
        '14604': { city: 'Rochester', state: 'NY', country: 'USA', lat: 43.1566, lng: -77.6088 },
        '10501': { city: 'Yonkers', state: 'NY', country: 'USA', lat: 40.9312, lng: -73.8987 },
        
        // ═══════════════════════════════════════════════════════════
        // USA - CALIFORNIA
        // ═══════════════════════════════════════════════════════════.2167, lng: -63.0833 },
        
        // ═══════════════════════════════════════════════════════════
        // YUKON, NORTHWEST TERRITORIES, NUNAVUT
        // ═══════════════════════════════════════════════════════════
        'Y1A': { city: 'Whitehorse', province: 'Yukon', country: 'Canada', lat: 60.7212, lng: -135.0568 },
        'X1A': { city: 'Yellowknife', province: 'Northwest Territories', country: 'Canada', lat: 62.4540, lng: -114.3718 },
        'X0A': { city: 'Iqaluit', province: 'Nunavut', country: 'Canada', lat: 63.7467, lng: -68.5170 },
        
        // ═══════════════════════════════════════════════════════════
        // USA - NEW YORK
        // ═════════════════════════════════════════════════════════════════════════════════════════════
        // NEWFOUNDLAND AND LABRADOR
        // ═══════════════════════════════════════════════════════════ovince: 'Nova Scotia', country: 'Canada', lat: 44.6488, lng: -63.5752 },
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
