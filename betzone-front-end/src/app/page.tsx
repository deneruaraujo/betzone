import { ActivityCard } from "@/components/ActivityCard";
import ActivityForm from "@/components/ActivityForm";


export default function Home() {
  return (
    <main className="xl:w-1/2 2xl:w-2/5 xl:mx-auto">
      <ActivityForm />
      <h2 className="text-lg mt-10 mb-9">Atividades</h2>
      <ActivityCard />
      <ActivityCard />
      <ActivityCard />
      <ActivityCard />
    </main>
  );
}
