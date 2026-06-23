'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLang } from './language-context';

export function Faq() {
  const { t } = useLang();

  const items = [
    { q: t.faq_q1, a: t.faq_a1 },
    { q: t.faq_q2, a: t.faq_a2 },
    { q: t.faq_q3, a: t.faq_a3 },
    { q: t.faq_q4, a: t.faq_a4 },
    { q: t.faq_q5, a: t.faq_a5 },
    { q: t.faq_q6, a: t.faq_a6 },
    { q: t.faq_q7, a: t.faq_a7 },
    { q: t.faq_q8, a: t.faq_a8 },
    { q: t.faq_q9, a: t.faq_a9 },
    { q: t.faq_q10, a: t.faq_a10 },
  ];

  return (
    <section id="faq" className="relative scroll-mt-20 py-16 sm:py-24 border-t border-border">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3 text-[var(--emerald-glow)] border-[var(--emerald-glow)]/40">
            <HelpCircle className="h-3 w-3 mr-1" />
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {t.faq_title}
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">
            {t.faq_sub}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {items.map((item, i) => (
            <Card key={i} className="border-border bg-card/60 backdrop-blur overflow-hidden">
              <AccordionItem value={`item-${i}`} className="border-0">
                <AccordionTrigger className="px-5 py-4 hover:no-underline text-left text-sm sm:text-base font-semibold">
                  <div className="flex items-start gap-3 pr-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--emerald-glow)]/15 text-[var(--emerald-glow)] text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span>{item.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 pt-0 text-sm text-muted-foreground leading-relaxed">
                  <div className="pl-9">
                    {item.a}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Card>
          ))}
        </Accordion>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Still have questions?{' '}
          <a
            href="mailto:hello@cashclue.ai"
            className="text-[var(--emerald-glow)] hover:underline"
          >
            hello@cashclue.ai
          </a>
        </p>
      </div>
    </section>
  );
}
