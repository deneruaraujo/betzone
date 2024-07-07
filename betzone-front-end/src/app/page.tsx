"use client"

import { ActivityCard, ActivityCardProps } from "@/components/ActivityCard";
import ActivityForm from "@/components/ActivityForm";
import { useEffect, useState } from "react";

interface ActivitiesResponse {
  activities: ActivityCardProps[];
}

export default function Home() {
  const [activities, setActivities] = useState<ActivityCardProps[]>([]);


  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:3001/activities');
        if (!response.ok) {
          throw new Error('Erro ao buscar as atividades');
        }
        const data: ActivitiesResponse = await response.json();
        setActivities(data.activities);
      } catch (error: any) {
        console.error('Erro:', error.message);
      }
    };

    fetchActivities();
  }, [activities]);

  return (
    <main className="xl:w-1/2 2xl:w-2/5 xl:mx-auto">
      <ActivityForm />
      <h2 className="text-lg mt-10 mb-9">Atividades</h2>
      <section>
        {activities.map((item) => (
          <ActivityCard key={item.id} {...item} />
        ))}
      </section>
    </main>
  );
}
