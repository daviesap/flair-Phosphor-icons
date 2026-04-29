const EMPTY_ICON = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjwvc3ZnPg==";

window.function = async function(name, style, color, bgcolor, scale) {
  // Get values
  name = name.value?.trim();
  style = style.value || "regular";
  color = color.value || "black";
  bgcolor = bgcolor.value || "white";
  scale = scale.value || "64%";

  // If no icon name → return transparent icon (consistent)
  if (!name) {
    return EMPTY_ICON;
  }

  // Determine filename
  const filename = style === "regular" ? name : `${name}-${style}`;

  // Build URL
  const svgUrl = `https://dev-icons.capcom.london/assets/${style}/${filename}.svg`;

  try {
    const response = await fetch(svgUrl);

    // If icon not found → return transparent icon
    if (!response.ok) {
      return EMPTY_ICON;
    }

    let svgContent = await response.text();

    // Replace fill colour
    svgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${color}"`);

    // Add background + scale
    svgContent = svgContent.replace(
      "<svg ",
      `<svg style="background-color:${bgcolor}; transform: scale(${scale}); transform-origin: center;" `
    );

    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`;

  } catch (error) {
    console.error("Failed to fetch or process the SVG:", error);
    return EMPTY_ICON;
  }
};