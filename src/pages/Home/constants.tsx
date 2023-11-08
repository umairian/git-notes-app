export const VIEW_OPTIONS = {
  list: "list",
  grid: "grid",
};

export const iconStyles = (color: string) => ({
  color: color,
  fontSize: 25,
  cursor: "pointer",
  margin: "2px 10px",
});

export const spanStyles = (border: boolean) => ({
  height: 29,
  display: "inline-block",
  borderLeft: border ? "1px solid gray" : undefined,
});
