import { Database, Download, History, RotateCcw, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { Badge, Button, Callout, Card, CardBody, CardHeader, confirmDialog, Field, Input, PageHeader, Select, toast } from '../components/ui';
import { WEEKS } from '../data/weeks';
import { fmtDate, toISO } from '../lib/date';
import { downloadText } from '../lib/download';
import { suggestedWeekByDate } from '../lib/progress';
import { pickData, readSnapshots, STORAGE_KEY, useStore, validateBackup } from '../store/useStore';
import type { WeekHours } from '../types';

const LABEL: Record<keyof WeekHours, string> = { theory: 'Cursos y teoría', resources: 'Recursos externos', practice: 'Ejercicios y proyectos', english: 'Inglés técnico' };

export default function SettingsPage() {
  const s = useStore();
  const set = useStore((x) => x.set);
  const replaceAll = useStore((x) => x.replaceAll);
  const resetAll = useStore((x) => x.resetAll);
  const fileRef = useRef<HTMLInputElement>(null);
  const [snaps, setSnaps] = useState(readSnapshots);
  const size = (() => {
    try {
      return Math.round(((localStorage.getItem(STORAGE_KEY)?.length ?? 0) * 2) / 1024);
    } catch {
      return 0;
    }
  })();
  const total = Object.values(s.settings.weeklyTarget).reduce((a, b) => a + b, 0);
  const suggested = suggestedWeekByDate(s);

  const exportData = () => {
    downloadText(`ai-academy-respaldo-${toISO(new Date())}.json`, JSON.stringify(pickData(s), null, 2), 'application/json');
    toast('Respaldo descargado');
  };

  const importData = async (file: File) => {
    try {
      const obj = JSON.parse(await file.text());
      if (!validateBackup(obj)) {
        toast('El archivo no es un respaldo válido de AI Learning Academy');
        return;
      }
      const ok = await confirmDialog({ title: 'Importar respaldo', text: 'Se reemplazarán todos tus datos actuales por los del archivo. Te recomendamos exportar un respaldo antes. ¿Continuar?', danger: true, confirmLabel: 'Importar y reemplazar' });
      if (!ok) return;
      replaceAll(obj);
      toast('Respaldo importado correctamente');
    } catch {
      toast('No se pudo leer el archivo JSON');
    }
  };

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader eyebrow="Sistema" title="Ajustes y datos" subtitle="Preferencias, objetivo de horas, respaldos y recuperación de progreso." />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Preferencias" />
          <CardBody className="space-y-3">
            <Field label="Nombre">
              <Input value={s.settings.name} onChange={(e) => set((x) => void (x.settings.name = e.target.value))} />
            </Field>
            <Field label="Tema">
              <Select value={s.settings.theme} onChange={(e) => set((x) => void (x.settings.theme = e.target.value as 'light' | 'dark' | 'system'))}>
                <option value="system">Según el sistema</option>
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
              </Select>
            </Field>
            <Field label="Fecha de inicio del programa">
              <Input type="date" value={s.settings.startDate} onChange={(e) => e.target.value && set((x) => void (x.settings.startDate = e.target.value))} />
            </Field>
            <Field label="Semana actual" hint={`Según la fecha de inicio y las extensiones, correspondería la semana ${suggested}. Vos decidís: avanzá cuando consolides lo aprendido.`}>
              <Select value={s.settings.currentWeek} onChange={(e) => set((x) => void (x.settings.currentWeek = Number(e.target.value)))}>
                {WEEKS.map((w) => (
                  <option key={w.n} value={w.n}>
                    Semana {w.n}: {w.title}
                  </option>
                ))}
              </Select>
            </Field>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title={`Objetivo semanal: ${total} h`} subtitle="Recomendado: 12 h (entre 10 y 15)." />
          <CardBody className="space-y-3">
            {(Object.keys(LABEL) as (keyof WeekHours)[]).map((k) => (
              <Field key={k} label={`${LABEL[k]} (horas)`}>
                <Input type="number" min={0} max={20} step={0.5} value={s.settings.weeklyTarget[k]} onChange={(e) => set((x) => void (x.settings.weeklyTarget[k] = Math.max(0, Number(e.target.value) || 0)))} />
              </Field>
            ))}
            {(total < 10 || total > 15) && <Callout tone="warn">Tu objetivo está fuera del rango recomendado (10–15 h). Es válido, pero considerá extender semanas si bajás la carga.</Callout>}
            <Button size="sm" variant="ghost" onClick={() => set((x) => void (x.settings.weeklyTarget = { theory: 3, resources: 4, practice: 4, english: 1 }))}>
              Restablecer distribución recomendada (3 + 4 + 4 + 1)
            </Button>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Respaldo de datos" subtitle={`Todo se guarda automáticamente en este navegador (≈ ${size} KB). Exportá un respaldo periódicamente: si borrás los datos del navegador o cambiás de computadora, lo vas a necesitar.`} icon={<Database size={18} />} />
        <CardBody className="flex flex-wrap gap-2">
          <Button variant="primary" onClick={exportData}>
            <Download size={15} /> Exportar respaldo JSON
          </Button>
          <Button onClick={() => fileRef.current?.click()}>
            <Upload size={15} /> Importar respaldo JSON
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importData(f);
              e.target.value = '';
            }}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Recuperación de progreso" subtitle="La plataforma guarda una copia automática por día (últimos 7 días) en este navegador." icon={<History size={18} />} action={<Button size="sm" variant="ghost" onClick={() => setSnaps(readSnapshots())}>Actualizar</Button>} />
        <CardBody>
          {snaps.length ? (
            <div className="space-y-2">
              {snaps.map((sn) => (
                <div key={sn.savedAt} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800">
                  <span>
                    {fmtDate(sn.date)} · {new Date(sn.savedAt).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="flex gap-1.5">
                    <Badge>{Object.values(sn.data.weeks ?? {}).filter((w) => w.approved).length} sem. aprobadas</Badge>
                    <Badge>{sn.data.attempts?.length ?? 0} evaluaciones</Badge>
                  </span>
                  <Button
                    size="sm"
                    onClick={async () => {
                      if (await confirmDialog({ title: 'Restaurar copia', text: `Se reemplazarán tus datos actuales por la copia del ${fmtDate(sn.date)}. ¿Continuar?`, danger: true, confirmLabel: 'Restaurar' })) {
                        replaceAll(sn.data);
                        toast('Copia restaurada');
                      }
                    }}
                  >
                    <RotateCcw size={13} /> Restaurar
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">Todavía no hay copias automáticas. Se crean unos segundos después de cada cambio.</p>
          )}
        </CardBody>
      </Card>

      <Card className="border-rose-200 dark:border-rose-500/30">
        <CardHeader title="Zona de riesgo" />
        <CardBody>
          <p className="mb-3 text-sm text-zinc-500">Borra todo tu progreso, notas, horas y evaluaciones de este navegador. Las copias automáticas se conservan para que puedas recuperarte.</p>
          <Button
            variant="danger"
            onClick={async () => {
              const a = await confirmDialog({ title: 'Borrar todos los datos', text: '¿Seguro? Esta acción reemplaza todo tu progreso por una academia vacía.', danger: true, confirmLabel: 'Sí, continuar' });
              if (!a) return;
              const b = await confirmDialog({ title: 'Última confirmación', text: '¿Exportaste un respaldo? Si no, cancelá y exportalo primero.', danger: true, confirmLabel: 'Borrar todo' });
              if (b) {
                resetAll();
                toast('Datos borrados');
              }
            }}
          >
            Borrar todos los datos
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
