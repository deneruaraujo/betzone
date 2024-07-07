import { format } from "date-fns";
import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { EditActivityDialog } from "./EditActivityDialog";

export interface ActivityCardProps {
  id: string;
  name: string;
  description: string;
  status: string;
  category: string;
  createdAt: string,
  updatedAt: string,
}

export function ActivityCard({ id, name, description, status, category, createdAt, updatedAt }: ActivityCardProps) {
  const [isSelected, setIsSelected] = useState(false);

  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd MMM yyyy, hh:mm a');
  };

  const handleCardClick = () => {
    setIsSelected(prevState => !prevState);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/activities/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar atividade');
      }
      alert('Atividade deletada com sucesso');
    } catch (error) {
      console.error('Erro ao deletar atividade:', error)
    }
  }

  return (
    <>
      <div onClick={handleCardClick} className={`p-4 mt-1 mx-1 duration-300 hover:cursor-pointer hover:bg-[#474747] ${isSelected ? 'bg-neutral-900' : 'bg-neutral-800'}`}>
        <div className="grid grid-cols-[50%_50%]">
          <div className="flex items-center gap-3">
            {status === 'ACTIVE' ? <FaCircleCheck className="text-lime-500" title="Ativo" /> : <IoMdCloseCircle className="text-red-500" size={18} title="Inativo" />}
            <span className="mr-10">{name}</span>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <span className="text-neutral-200 text-xs mb-1">Categoria</span>
              <span className="text-neutral-200 text-xs">{category}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-200 text-xs mb-1">Ultima atualização</span>
              <span className="text-neutral-200 text-xs">{formattedDate(updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`transition-all duration-300 overflow-hidden ${isSelected ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {isSelected && (
          <div className="bg-neutral-800 p-4 mx-1">
            <div className="flex mb-2 justify-between">
              <h3 className="">Descrição</h3>
              <EditActivityDialog id={id} name={name} description={description} status={status} category={category} />
            </div>
            <p className="text-sm mb-2">{description}</p>
            <div className="flex justify-between">
              <button onClick={() => handleDelete()} className="text-red-600 text-sm hover:text-red-400 duration-300">Excluir Atividade</button>
              <div className="flex flex-col">
                <span className="text-neutral-200 text-xs mb-1">Criado em</span>
                <span className="text-neutral-200 text-xs mb-1">{formattedDate(createdAt)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}