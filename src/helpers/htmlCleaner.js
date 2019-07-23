export default function htmlCleaner(text) {
  return !!text ? text.replace(/<[^>]*>?/gm, "") : "";
}
