export default function extractTextContent(html) {
  return new DOMParser()
    .parseFromString(html, "text/html")
    .documentElement.textContent;
}