function PrintItemImg({ itemName, square }: { itemName: string; square: boolean }) {
  return (
    <img
      src={`../src/assets/ingredients/${itemName.toLowerCase()}.webp`}
      alt={itemName}
      className={`h-miniImage ${square ? "rounded-md" : "rounded-l-md"}`}
    />
  );
}

export default PrintItemImg;
