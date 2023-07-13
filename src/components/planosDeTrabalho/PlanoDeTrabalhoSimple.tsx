import { Label, TextInput } from "@/components/flowbite-components";
import { PlanoTrabalhoModel } from "@/model/response/PlanoTrabalhoModel";
import RecursosMateriaisSimple from "./RecursosMateriaisSimple";

export interface PlanosDeTrabalhoFormsProps {
    plano: PlanoTrabalhoModel;
}
export default function PlanoDeTrabalhoSimple({ plano }: PlanosDeTrabalhoFormsProps) {

    return (
        <>
            <div className="col-span-full">
                <div className="mb-2 block">
                    <Label
                        htmlFor="titulo"
                        value="Titulo do Trabalho"
                    />
                </div>
                <TextInput
                    id="titulo"
                    type="text"
                    sizing="md"
                    placeholder="Titulo"
                    disabled
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="areaTrabalho"
                        value="Area de Trabalho"
                    />
                </div>
                <TextInput
                    id="areaTrabalho"
                    type="text"
                    sizing="md"
                    placeholder="Computação; Inteligência Artificial"
                    disabled
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="descricao"
                        value="Descrição"
                    />
                </div>
                <div dangerouslySetInnerHTML={{ __html: plano.descricao }} className=' text-gray-900 dark:text-white my-4 flex-auto overflow-auto max-h-64' />
            </div>
            <div className="col-span-full grid gap-4">
                <div className="grid grid-cols-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white self-center">Recursos Materiais</h5>
                </div>
                <div className="col-span-full grid gap-5">

                    {plano.recursoMateriais.map((e, i) =>
                        <RecursosMateriaisSimple recurso={e} key={e.id} />
                    )}

                </div>
            </div>
        </>

    )

}