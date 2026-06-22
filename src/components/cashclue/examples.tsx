'use client';

import { Quote } from 'lucide-react';
import { useLang } from './language-context';

export function Examples() {
  const { t } = useLang();
  const EXAMPLES = [
    { quote: t.ex_1_quote, author: t.ex_1_author, role: t.ex_1_role, stat: t.ex_1_stat },
    { quote: t.ex_2_quote, author: t.ex_2_author, role: t.ex_2_role, stat: t.ex_2_stat },
    { quote: t.ex_3_quote, author: t.ex_3_author, role: t.ex_3_role, stat: t.ex_3_stat },
  ];

  return (
    <section id="examples" className="relative scroll-mt-20 py-16 sm:py-24 border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {t.ex_title}
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            {t.ex_sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {EXAMPLES.map((ex, i) => (
            <figure
              key={i}
              className="relative rounded-xl border border-border bg-card/50 backdrop-blur p-6 flex flex-col"
            >
              <Quote className="h-6 w-6 text-[var(--emerald-glow)]/40 mb-3" />
              <blockquote className="text-sm text-foreground/90 leading-relaxed flex-1">
                &ldquo;{ex.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between gap-2 pt-4 border-t border-border">
                <div>
                  <div className="text-sm font-semibold">{ex.author}</div>
                  <div className="text-xs text-muted-foreground">{ex.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[var(--gold)]">{ex.stat}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    {t.ex_in_90}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-center text-[11px] text-muted-foreground mt-6 max-w-xl mx-auto">
          {t.ex_disclaimer}
        </p>
      </div>
    </section>
  );
}
