export function stringToBoolean(str) {
    // Convert the string to lowercase and compare
    if (str.toLowerCase() === "true") {
        return true;
    } else if (str.toLowerCase() === "false") {
        return false;
    } else {
        // If the input is neither "true" nor "false", return null or handle it accordingly
        return null; // or throw an error, return a default value, etc.
    }
}