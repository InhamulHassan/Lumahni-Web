// Component styles

export default theme => {
  return {
    root: {
      borderRadius: "4px"
    },
    squared: {
      borderRadius: 0
    },
    outlined: {
      border: `1px solid ${theme.palette.border}`
    }
  };
};
