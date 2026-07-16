import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import ExercisesPage from "@/pages/ExercisesPage";
import Programs from "@/pages/Programs";
import CreateProgram from "@/pages/CreateProgram";
import Generator from "@/pages/Generator";
import Favorites from "@/pages/Favorites";
import Anatomy from "@/pages/Anatomy";
import Tools from "@/pages/Tools";
import Settings from "@/pages/Settings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/exercices" element={<ExercisesPage baseType="all" label="Bibliothèque" title="Tous les exercices" subtitle="Filtre par muscle, matériel, difficulté ou type. Clique sur une carte pour voir tous les détails." />} />
            <Route path="/exercices/poids-du-corps" element={<ExercisesPage baseType="poids-du-corps" label="Sans matériel" title="Exercices poids du corps" subtitle="Entraîne-toi n'importe où, sans équipement." />} />
            <Route path="/exercices/salle" element={<ExercisesPage baseType="salle" label="En salle" title="Exercices salle de sport" subtitle="Machines, barres, haltères et poulies." />} />
            <Route path="/programmes" element={<Programs />} />
            <Route path="/creer" element={<CreateProgram />} />
            <Route path="/creer/:id" element={<CreateProgram />} />
            <Route path="/generateur" element={<Generator />} />
            <Route path="/favoris" element={<Favorites />} />
            <Route path="/anatomie" element={<Anatomy />} />
            <Route path="/outils" element={<Tools />} />
            <Route path="/parametres" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" theme="dark" richColors />
    </div>
  );
}

export default App;
