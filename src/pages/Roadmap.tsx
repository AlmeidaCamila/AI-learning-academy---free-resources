import { CheckCircle2, Circle, CircleDot, FolderKanban } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge, Card, cx, PageHeader, Progress } from '../components/ui';
import { PROJECT_MAP } from '../data/projects';
import { STAGES } from '../data/stages';
import { WEEKS } from '../data/weeks';
import { fmtDate, toISO } from '../lib/date';
import { bestScore, projectedEnd, projectedWeekStart, stageProgress, weekStatus } from '../lib/progress';
import { useStore } from '../store/useStore';

export default function Roadmap() {
  const s = useStore();
  const current = s.settings.currentWeek;
  return (
    <div className="animate-fade-up">
      <PageHeader
        eyebrow="Plan de estudios"
        title="Roadmap de 36 semanas"
        subtitle={`6 etapas integradas: clases propias, recursos gratuitos, Coursera Open Academy, evaluaciones y proyectos. Fin proyectado: ${fmtDate(toISO(projectedEnd(s)))} (se ajusta si extendés semanas).`}
      />
      <div className="space-y-8">
        {STAGES.map((st) => {
          const proj = PROJECT_MAP[st.projectId];
          const weeks = WEEKS.filter((w) => w.stage === st.id);
          return (
            <section key={st.id}>
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                    Etapa {st.id} · Semanas {st.weeks[0]}–{st.weeks[1]}
                  </div>
                  <h2 className="text-lg font-semibold">{st.title}</h2>
                  <p className="text-sm text-zinc-500">{st.objective}</p>
                </div>
                <div className="w-full sm:w-48">
                  <div className="mb-1 text-right text-xs text-zinc-500">{stageProgress(s, st.id)}% aprobado</div>
                  <Progress value={stageProgress(s, st.id)} color={st.color} />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {weeks.map((w) => {
                  const status = weekStatus(s, w.n);
                  const best = bestScore(s, w.n);
                  const extra = s.weeks[w.n]?.extraWeeks ?? 0;
                  return (
                    <Link key={w.n} to={`/semana/${w.n}`}>
                      <Card className={cx('h-full p-4 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:hover:border-indigo-500/50', w.n === current && 'ring-2 ring-indigo-500/60')}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-zinc-500">
                            Semana {w.n} · {fmtDate(toISO(projectedWeekStart(s, w.n)))}
                          </span>
                          {status === 'aprobada' ? (
                            <CheckCircle2 size={17} className="text-emerald-600" />
                          ) : status === 'no iniciada' ? (
                            <Circle size={17} className="text-zinc-300 dark:text-zinc-600" />
                          ) : (
                            <CircleDot size={17} className="text-indigo-500" />
                          )}
                        </div>
                        <div className="mt-1.5 line-clamp-2 text-sm font-medium">{w.title}</div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge>{w.lessons.length} clase(s)</Badge>
                          <Badge>{w.questions.length} preguntas</Badge>
                          {best !== null && <Badge color={best >= 80 ? 'emerald' : 'amber'}>Nota {best}</Badge>}
                          {extra > 0 && <Badge color="violet">+{extra} sem.</Badge>}
                          {w.n === current && <Badge color="indigo">actual</Badge>}
                        </div>
                      </Card>
                    </Link>
                  );
                })}
                <Link to={`/proyectos/${proj.id}`}>
                  <Card className="flex h-full items-start gap-3 border-dashed p-4 transition hover:border-indigo-300">
                    <FolderKanban size={18} className="mt-0.5 shrink-0 text-indigo-500" />
                    <div>
                      <div className="text-xs text-zinc-500">Proyecto de etapa</div>
                      <div className="text-sm font-medium">
                        P{proj.n}. {proj.title}
                      </div>
                      <Badge className="mt-2" color={s.projects[proj.id]?.status === 'terminado' ? 'emerald' : 'zinc'}>
                        {s.projects[proj.id]?.status ?? 'no iniciado'}
                      </Badge>
                    </div>
                  </Card>
                </Link>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
