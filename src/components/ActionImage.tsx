import { srcPath } from "../utils/helpers";

interface ActionImageProps {
  actionName: string;
  showName: boolean;
}

function ActionImage({ actionName, showName }: ActionImageProps) {
  return (
    <div key={actionName} className="bg-white card-shadow rounded-2xl">
      <img
        src={`${srcPath}/assets/chefActions/${actionName}.webp`}
        alt={actionName}
        data-testid={`${actionName}_action`}
        className="rounded-t-2xl max-h-24 object-cover"
      />
      {showName && <p className="text-base py-2">{actionName}</p>}
    </div>
  );
}

export default ActionImage;
