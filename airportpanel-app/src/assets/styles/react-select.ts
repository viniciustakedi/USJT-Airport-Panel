export const CustomStyles = () => {
  return {
    option: (provided: any, state: any) => ({
      ...provided,
      width: "100%",
      color: state.isSelected ? "#323232" : "#323232",
      cursor: "pointer",
      backgroundColor: state.isFocused ? "#FF8E0022" : "#fff",
    }),
    control: () => ({
      display: "flex",
      width: "100%",
      height: "auto",
      borderTop: "2px solid #FF8E00",
      borderRight: "2px solid 	#FF8E00",
      borderBottom: "2px solid 	#FF8E00",
      borderTopRightRadius: ".75rem",
      borderBottomRightRadius: ".75rem",
      fontSize: "1rem",
      paddingTop: "0.38rem",
      paddingBottom: "0.38rem",
      paddingLeft: "0.38rem",
      cursor: "pointer",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 100ms";

      return { ...provided, opacity, transition };
    },
  };
};
