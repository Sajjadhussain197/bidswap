function convertIsoDateToNormal(isoDate) {
    const date = new Date(isoDate);
    
    // Extract day, month (full name), and year from the date object
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    
    // Return in the format "Day Month, Year" (e.g., 14 January, 2022)
    return `${day} ${month}, ${year}`;
}
