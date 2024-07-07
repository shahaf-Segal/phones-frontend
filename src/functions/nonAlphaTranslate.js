// Function to replace non-alphanumeric characters with their ASCII codes
export function replaceNonAlphanumeric(input) {
  return input.replace(/[^a-zA-Z0-9]/g, function (match) {
    return "%" + match.charCodeAt(0).toString(16).toUpperCase();
  });
}

// Function to reverse the process
export function revertStringReplacement(input) {
  return input.replace(/%[0-9A-F]{2}/g, function (match) {
    return String.fromCharCode(parseInt(match.slice(1), 16));
  });
}
