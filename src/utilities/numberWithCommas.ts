export function getNumberWithCommas(x: number | string) {
  return typeof x === "number"
    ? x
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        .replace(/\.00$/, "")
    : x.replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/\.00$/, "");
}
