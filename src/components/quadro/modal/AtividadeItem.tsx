import { AtividadeModel } from "@/model/atividades";
import { Button, Checkbox, Label, TextInput } from "@/components/flowbite-components";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { AiOutlineCheck } from "react-icons/ai";

type AtividadeItemProps = {
  atividade: AtividadeModel;
  remover: (id: string) => void;
};

const AtividadeItem = ({ atividade, remover }: AtividadeItemProps) => {

  const [editavel, setEditavel] = useState<boolean>(false);

  if (editavel) {
    return (
      <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex-auto flex gap-2 place-content-center">
          <Checkbox id={atividade.id} className="self-center" />
          <TextInput
            id="titulo"
            type="text"
            sizing="md"
            className="w-full"
            placeholder="Titulo"
            onChange={(e) => atividade.titulo = e.currentTarget.value}
            defaultValue={atividade.titulo}
            required
          />

        </div>
        <Button onClick={() => setEditavel(e => !e)}>
          <AiOutlineCheck size={20} />
          <p className="mx-2">
            Concluir
          </p>
        </Button>
      </div>

    )
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex-auto flex items-center gap-2 p-3">
        <Checkbox id={atividade.id} />
        <p className=" text-gray-900 dark:text-white self-center text-center" onClick={() => setEditavel(e => !e)}>
          {atividade.titulo}
        </p>
      </div>
      <Button onClick={() => remover(atividade.id)}>
        <CiCircleRemove size={20} />
        <p className="mx-2">
          Remover
        </p>
      </Button>
    </div>
  );
};

export default AtividadeItem;
