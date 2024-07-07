"use client"

import { ActivityCard, ActivityCardProps } from "@/components/ActivityCard";
import ActivityForm from "@/components/ActivityForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [activities, setActivities] = useState<ActivityCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchActivities = async (page: number) => {
    try {
      const response = await fetch(`http://localhost:3001/activities?page=${page}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar atividades');
      }
      const data = await response.json();
      setActivities(data.activities);
    } catch (error) {
      console.error('Erro ao buscar atividades:', error)
    }
  };

  useEffect(() => {
    fetchActivities(currentPage);
  }, [currentPage, activities]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <main className="xl:w-1/2 2xl:w-2/5 xl:mx-auto">
      <ActivityForm />
      <h2 className="text-lg mt-10 mb-9">Atividades</h2>
      <section>
        {activities.map((item) => (
          <ActivityCard key={item.id} {...item} />
        ))}
      </section>
      {activities.length === 0 ?
        <div className="text-center">
          Atividades serão mostradas aqui
        </div>
        :
        <div className="pagination-controls flex justify-between items-center mt-4">
          <button
            className="bg-neutral-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:hover:bg-neutral-300"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="página Anterior"
          >
            Anterior
          </button>
          <span>
            Page {currentPage}
          </span>
          <button
            className="bg-neutral-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:hover:bg-neutral-300"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={activities.length < 19}
            aria-label="próxima Página"
          >
            Próxima
          </button>
        </div>}
    </main>
  );
}
