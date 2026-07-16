import PageHeader from "@/components/PageHeader";
import ExerciseGrid from "@/components/ExerciseGrid";

export default function ExercisesPage({ baseType = "all", label, title, subtitle }) {
  return (
    <div>
      <PageHeader label={label} title={title} subtitle={subtitle} />
      <ExerciseGrid key={baseType} baseType={baseType} />
    </div>
  );
}
