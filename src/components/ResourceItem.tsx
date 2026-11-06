import { CheckCircle2, Circle, Info } from 'lucide-react';
import { RESOURCE_MAP, SOURCE_LABEL } from '../data/resources';
import type { ResourceSource } from '../types';
import { Badge, ExtLink, cx } from './ui';

export const SOURCE_COLOR: Record<ResourceSource, string> = {
  coursera: 'sky',
  externo: 'emerald',
  docs: 'violet',
  propio: 'amber',
  proyecto: 'rose',
};

export function SourceBadge({ source }: { source: ResourceSource }) {
  return <Badge color={SOURCE_COLOR[source]}>{SOURCE_LABEL[source]}</Badge>;
}

export function ResourceItem({ id, why, minutes, done, onToggle }: { id: string; why?: string; minutes?: number; done?: boolean; onToggle?: () => void }) {
  const r = RESOURCE_MAP[id];
  if (!r) return null;
  return (
    <div className={cx('flex gap-3 rounded-xl border border-zinc-200 p-3.5 dark:border-zinc-800', done && 'bg-zinc-50 dark:bg-zinc-900/50')}>
      {onToggle && (
        <button onClick={onToggle} className="mt-0.5 shrink-0 text-zinc-400 hover:text-emerald-600" aria-label={done ? 'Marcar como pendiente' : 'Marcar como usado'}>
          {done ? <CheckCircle2 size={18} className="text-emerald-600" /> : <Circle size={18} />}
        </button>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <ExtLink href={r.url} className="text-sm font-medium">
            {r.title}
          </ExtLink>
          <SourceBadge source={r.source} />
          <Badge>{r.lang.toUpperCase()}</Badge>
          {minutes && <Badge>{minutes >= 60 ? `${Math.round((minutes / 60) * 10) / 10} h` : `${minutes} min`}</Badge>}
        </div>
        {why && <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{why}</p>}
        {!why && <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{r.description}</p>}
        {r.freeNote && (
          <p className="mt-1.5 flex gap-1.5 text-xs text-zinc-500">
            <Info size={13} className="mt-0.5 shrink-0" /> {r.freeNote}
          </p>
        )}
      </div>
    </div>
  );
}
