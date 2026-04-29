window.function = async function(name, style, color, bgcolor, scale) {
  // Get values
  name = name.value;
  style = style.value || "";
  color = color.value || "black";
  bgcolor = bgcolor.value || "white";
  scale = scale.value || "64%";

  // Determine the file name based on the style
  let filename = style === "regular" ? name : `${name}-${style}`;

  // Construct the URL to the SVG file
  let svgUrl = `https://dev-icons.capcom.london/assets/${style}/${filename}.svg`;

  try {
    // Fetch the SVG file from the URL
    const response = await fetch(svgUrl);

    // If icon not found → return nothing
    if (!response.ok) {
      return "";
    }

    let svgContent = await response.text();

    // Modify SVG content: set fill color
    svgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${color}"`);

    // Add background and scale styling
    svgContent = svgContent.replace(
      '<svg ',
      `<svg style="background-color:${bgcolor}; transform: scale(${scale}); transform-origin: center;" `
    );

    // Encode the modified SVG to a Data URL
    let svgDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`;

    return svgDataUrl;

  } catch (error) {
    console.error('Failed to fetch or process the SVG:', error);
    return ""; // Return nothing on error
  }
}