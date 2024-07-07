import { ChangeEvent, FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { ActivityCardProps } from "./ActivityCard";

export function EditActivityDialog({ id, name, description, status, category }: Partial<ActivityCardProps>) {
  const [formData, setFormData] = useState<Partial<ActivityCardProps>>({
    name: name,
    description: description,
    status: status,
    category: category
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/activities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados');
      }

      alert('Atividade editada com sucesso');
    } catch (error) {
      console.error('Erro a editar atividade:', error)
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-lime-600 text-sm hover:text-lime-400 duration-300">Editar Atividade</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-neutral-800">
        <DialogHeader>
          <DialogTitle>Editar atividade</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col items-center py-10"
          onSubmit={handleSubmit}
          id="editActivityForm"
        >
          <div className="flex flex-col w-4/6">
            <label htmlFor="name">Nome:</label>
            <input
              id="name"
              type="text"
              defaultValue={name}
              onChange={handleChange}
              className="bg-neutral-200 text-black rounded-sm mb-2 p-1"
              required
            />
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              defaultValue={status}
              onChange={handleChange}
              className="bg-neutral-200 text-black rounded-sm  mb-2 p-1"
              required
            >
              <option value='ACTIVE'>Ativo</option>
              <option value='INACTIVE'>Inativo</option>
            </select>
            <label htmlFor="category">Categoria:</label>
            <input
              id="category"
              type="text"
              defaultValue={category}
              onChange={handleChange}
              className="bg-neutral-200 text-black rounded-sm  mb-2 p-1"
              required
            />
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              defaultValue={description}
              onChange={handleChange}
              className="bg-neutral-200 text-black rounded-sm resize-none mb-2 p-1"
              rows={3}
              required
            />
          </div>
        </form>
        <DialogFooter>
          <button type="submit" form="editActivityForm" className="bg-lime-600 mt-10 py-2 w-1/2 mx-auto rounded-sm hover:bg-lime-500 duration-300">Salvar</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}