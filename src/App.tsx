import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Button, ConfirmHost, Field, Input, Modal, ToastHost } from './components/ui';
import { todayISO } from './lib/date';
import { useStore } from './store/useStore';
import Calendar from './pages/Calendar';
import Career from './pages/Career';
import Dashboard from './pages/Dashboard';
import English from './pages/English';
import Evaluations from './pages/Evaluations';
import ExamPage from './pages/ExamPage';
import LessonPage from './pages/LessonPage';
import Portfolio from './pages/Portfolio';
import ProjectPage from './pages/ProjectPage';
import Projects from './pages/Projects';
import Resources from './pages/Resources';
import Roadmap from './pages/Roadmap';
import Scholarship from './pages/Scholarship';
import SettingsPage from './pages/Settings';
import Tutor from './pages/Tutor';
import WeekPage from './pages/WeekPage';

function Onboarding() {
  const onboarded = useStore((s) => s.settings.onboarded);
  const set = useStore((s) => s.set);
  const [name, setName] = useState('');
  const [start, setStart] = useState(todayISO());
  if (onboarded) return null;
  const finish = () =>
    set((s) => {
      s.settings.name = name.trim();
      s.settings.startDate = start;
      s.settings.onboarded = true;
    });
  return (
    <Modal
      open
      onClose={finish}
      title="Bienvenida a AI Learning Academy"
      footer={
        <Button variant="primary" onClick={finish}>
          Comenzar semana 1
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
            <Sparkles size={20} />
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Tu academia personal para los próximos 9 meses: 36 semanas, 6 etapas, clases desde cero, evaluaciones reales y 6 proyectos. Todo se guarda automáticamente en este navegador; podés exportar un respaldo desde <b>Ajustes y datos</b>.
          </p>
        </div>
        <Field label="¿Cómo querés que te llame la plataforma? (opcional)">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
        </Field>
        <Field label="Fecha de inicio del programa" hint="Se usa para proyectar fechas. Podés cambiarla después y extender semanas sin perder progreso.">
          <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        </Field>
      </div>
    </Modal>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/semana/:n" element={<WeekPage />} />
        <Route path="/semana/:n/clase/:lessonId" element={<LessonPage />} />
        <Route path="/semana/:n/evaluacion" element={<ExamPage />} />
        <Route path="/evaluaciones" element={<Evaluations />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/proyectos/:id" element={<ProjectPage />} />
        <Route path="/beca" element={<Scholarship />} />
        <Route path="/recursos" element={<Resources />} />
        <Route path="/ingles" element={<English />} />
        <Route path="/calendario" element={<Calendar />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/carrera" element={<Career />} />
        <Route path="/ajustes" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Onboarding />
      <ConfirmHost />
      <ToastHost />
    </Layout>
  );
}
