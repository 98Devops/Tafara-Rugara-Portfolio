'use client';
import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { projectMedia } from '@/data/project-media';
import { ProjectArtwork } from './ProjectArtwork';
export function ProjectMedia({
  id,
  title,
  category,
  priority = false,
}: {
  id: string;
  title: string;
  category?: string;
  priority?: boolean;
}) {
  const shots = projectMedia[id];
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const label = useId();
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  if (!shots)
    return <ProjectArtwork id={id} title={title} category={category} />;
  const shot = shots[index];
  function expand() {
    dialog.current?.showModal();
    setOpen(true);
  }
  function close() {
    dialog.current?.close();
    setOpen(false);
  }
  return (
    <div className={'project-media media-' + id}>
      <div className="media-masthead">
        <span>{shot.label}</span>
        <span>ACTUAL PROJECT ↗</span>
      </div>
      <button
        type="button"
        className="media-expand"
        onClick={expand}
        aria-label={'View ' + title + ' screenshot'}
      >
        <span className="browser-chrome" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>{title.split(' — ')[0]}</span>
          <b>↗</b>
        </span>
        <span className="media-image">
          <Image
            src={shot.src}
            width={1600}
            height={800}
            alt={shot.alt}
            priority={priority}
            sizes="(max-width: 760px) 92vw, 60vw"
          />
          <span className="media-zoom" aria-hidden="true">
            View interface ↗
          </span>
        </span>
      </button>
      <div className="media-caption">
        <span>PROJECT SCREENSHOT</span>
        {shots.length > 1 ? (
          <div aria-label={title + ' screenshots'}>
            {shots.map((item, i) => (
              <button
                key={item.src}
                type="button"
                aria-label={'Show ' + item.label}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        ) : (
          <span>BUILT BY TAFARA</span>
        )}
      </div>
      <dialog
        ref={dialog}
        className="screenshot-dialog"
        aria-labelledby={label}
        onClose={() => setOpen(false)}
        onClick={event => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="screenshot-dialog-head">
          <div>
            <h2 id={label}>{title}</h2>
            <p>{shot.label} · project screenshot</p>
          </div>
          <button type="button" onClick={close} aria-label="Close screenshot">
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        {open && (
          <Image
            src={shot.src}
            width={1600}
            height={800}
            alt={shot.alt}
            sizes="96vw"
          />
        )}
        {shots.length > 1 && (
          <div className="screenshot-switch">
            {shots.map((item, i) => (
              <button
                key={item.src}
                type="button"
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </dialog>
    </div>
  );
}
