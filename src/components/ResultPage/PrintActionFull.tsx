interface IngredientProp {
  actionName: string;
}

function PrintActionFull({ actionName }: IngredientProp) {
  return (
    <div className="bg-white card-shadow rounded-lg">
      <img
        draggable="false"
        src={`../src/assets/chefActions/${actionName.toLowerCase()}.webp`}
        alt={actionName}
        data-testid={`${actionName}_action`}
        className="rounded-t-lg tiny-image"
      />
      <p className="small-text py-2">{actionName}</p>
    </div>
  );
}

export default PrintActionFull;
