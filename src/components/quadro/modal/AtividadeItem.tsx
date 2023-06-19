import { AtividadeModel } from "@/model/atividades";
import { Button, Checkbox, Label } from "flowbite-react";
import { CiCircleRemove } from "react-icons/ci"
type AtividadeItemProps = {
  atividade: AtividadeModel;
  remover: (id: string) => void;
};

const AtividadeItem = ({ atividade, remover }: AtividadeItemProps) => {

  return (
    <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex-auto flex items-center gap-2 p-3">
        <Checkbox id={atividade.id} />
        <Label htmlFor={atividade.id}>
          {atividade.title}
        </Label>
      </div>
      <Button onClick={() => remover(atividade.id)}>
        <CiCircleRemove size={20}/>
        <p className="mx-2">
          Remover
        </p>
      </Button>
    </div>

  );
};

export default AtividadeItem;
