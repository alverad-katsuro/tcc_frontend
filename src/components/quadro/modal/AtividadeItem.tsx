import { atualizarAtividade } from "@/api/api";
import useDebounce from "@/app/(dashboard)/quadros/[id]/Deb";
import { Button, Checkbox, TextInput } from "@/components/flowbite-components";
import { AtividadeModel } from "@/model/atividades";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";

type AtividadeItemProps = {
  atividadeIni: AtividadeModel;
  remover: (id: string) => void;
};

const AtividadeItem = ({ atividadeIni, remover }: AtividadeItemProps) => {

  const [atividade, setAtividade] = useState<AtividadeModel>(atividadeIni);

  const [editavel, setEditavel] = useState<boolean>(false);

  const ref = useRef<any | undefined>(undefined)

  const newSetAtividade = (updateFunction: SetStateAction<AtividadeModel>) => {
    setAtividade((currentTask) => {
      const updatedTask = typeof updateFunction === 'function' ? updateFunction(currentTask) : updateFunction;

      atualizarAtividade(atividade);

      return updatedTask;
    });
  };

  const debouncedSearch = useDebounce(atividade, newSetAtividade, 500);

  useEffect(() => {
    if (debouncedSearch) {
      console.log(debouncedSearch)
    }
  }, [debouncedSearch])

  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && editavel && !ref.current.contains(event.target)) {
        setEditavel(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };

  })

  useEffect(() => {

    function handleClickInside(event: MouseEvent) {
      if (ref.current && !editavel && ref.current.contains(event.target)) {
        setEditavel(true)
      }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickInside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickInside);
    };

  })


  return (
    <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex-auto flex items-center gap-2 p-3">
        <Checkbox id={atividade.id} onChange={(e) => newSetAtividade((atividade) => {
          const newAtividade: AtividadeModel = { ...atividade, concluida: e.currentTarget.checked }
          return newAtividade;
        })} defaultChecked={atividade.concluida} />
        <div
          ref={ref}
          className="w-full"
        >
          {editavel ?
            <TextInput
              id="titulo"
              type="text"
              sizing="md"
              placeholder="Titulo"
              onChange={(e) => {
                if (e.currentTarget.value !== undefined) {
                  const newAtiv: AtividadeModel = {
                    ...atividade, titulo: e.currentTarget.value
                  }
                  newSetAtividade(newAtiv)
                }
              }}
              defaultValue={atividade.titulo}
              required
            /> :
            <p className=" text-gray-900 dark:text-white self-center text-justify">
              {atividade.titulo}
            </p>
          }
        </div>
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
