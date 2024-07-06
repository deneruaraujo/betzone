"use client"

import { ChangeEvent, FormEvent, useState } from "react"

interface FormData {
  name: string;
  description: string;
  status: string;
  category: string;
}

export default function ActivityForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    status: 'ACTIVE',
    category: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex flex-col items-center py-10 bg-neutral-800"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl">Crie uma Atividade</h1>
      <div className="flex flex-col w-2/3 xl:w-3/5 2xl:w-1/2">
        <label htmlFor="name">Nome:</label>
        <input
          id="name"
          type="text"
          className="bg-neutral-200 text-black rounded-sm mb-2 p-1"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={formData.status}
          onChange={handleChange}
          className="bg-neutral-200 text-black rounded-sm  mb-2 p-1"
        >
          <option value='ACTIVE'>Ativo</option>
          <option value='INACTIVE'>Inativo</option>
        </select>
        <label htmlFor="category">Categoria:</label>
        <input
          id="category"
          type="text"
          className="bg-neutral-200 text-black rounded-sm  mb-2 p-1"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          className="bg-neutral-200 text-black rounded-sm resize-none mb-2 p-1"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
        />
        <button type="submit" className="bg-lime-600 mt-10 py-2 w-1/2 mx-auto rounded-sm hover:bg-lime-500 duration-300">Criar</button>
      </div>
    </form>
  );
}