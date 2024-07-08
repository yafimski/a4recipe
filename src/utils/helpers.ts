export const handleKeyDownPrevent = (e: React.KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    e.stopPropagation();
  }
};

export const handleFocusSelect = (e: { target: { select: () => void } }) => {
  e.target.select();
};

export const defUnit = "None";

export const srcPath = process.env.NODE_ENV === "production" ? "/a4recipe" : "";
