"use client"


import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";


export function ActivityCard() {
  const [isSelected, setIsSelected] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleCardClick = () => {
    setIsSelected(prevState => !prevState);

    setTimeout(() => setIsVisible(false), 300);
  };

  return (
    <>
      <main onClick={handleCardClick} className={`p-4 mt-1 duration-300 hover:cursor-pointer hover:bg-[#474747] ${isSelected ? 'bg-neutral-900' : 'bg-neutral-800'}`}>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <FaCircleCheck className="text-lime-500" title="Ativo" />
            <span className="mr-10 xl:text-lg">Futebol</span>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <span className="text-neutral-200 text-xs mb-1 xl:text-sm">Categoria</span>
              <span className="text-neutral-200 text-xs xl:text-sm">Invasão</span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-200 text-xs mb-1 xl:text-sm">Ultima atualização</span>
              <span className="text-neutral-200 text-xs xl:text-sm">15 Nov 2020, 10:25AM</span>
            </div>
          </div>
        </div>
      </main>
      <div className={`transition-all duration-300 overflow-hidden ${isSelected ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {isSelected && (
          <div className="bg-neutral-800 p-4">
            <div className="flex mb-2 justify-between">
              <h3 className="">Descrição</h3>
              <button className="text-lime-600 text-sm hover:text-lime-400 duration-300">Editar Atividade</button>
            </div>
            <p className="text-sm mb-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores omnis ipsa corporis possimus est, quaerat minima libero dolorem nisi reiciendis repudiandae animi?.</p>
            <div className="flex justify-between">
              <button className="text-red-600 text-sm hover:text-red-400 duration-300">Excluir Atividade</button>
              <div className="flex flex-col">
                <span className="text-neutral-200 text-xs mb-1 xl:text-sm">Criado em</span>
                <span className="text-neutral-200 text-xs mb-1 xl:text-sm">15 Nov 2020, 10:25AM</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}