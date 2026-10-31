import { describe, expect, it } from 'vitest';
import { INDEX_FILES, INDEX_SECTIONS, batchesOfEntries, formatExpr, renderCatalog } from '../src/catalog.ts';
import { checkKnowledge } from '../src/index.ts';

describe('compact index expressions', () => {
  it('writes answers, sets, ages and sex on one line', () => {
    expect(formatExpr({ finding: 'fever', is: 'present' })).toBe('fever');
    expect(formatExpr({ finding: 'fever', is: 'absent' })).toBe('fever=no');
    expect(formatExpr({ finding: 'fever', is: 'unknown' })).toBe('fever=?');
    expect(formatExpr({ finding: 'bp_measured', in: ['very_high', 'extreme'] })).toBe('bp_measured∈{very_high,extreme}');
    expect(formatExpr({ age_groups: ['infant_0_2m'] })).toBe('age∈{infant_0_2m}');
    expect(formatExpr({ age_months_lt: 3 })).toBe('age<3mo');
    expect(formatExpr({ age_years_gte: 60 })).toBe('age≥60y');
    expect(formatExpr({ sex: 'female' })).toBe('sex=female');
  });

  it('brackets nested groups only', () => {
    const e = {
      all: [
        { finding: 'fever', is: 'present' as const },
        { any: [{ finding: 'confusion', is: 'present' as const }, { not: { finding: 'cough', is: 'present' as const } }] },
      ],
    };
    expect(formatExpr(e)).toBe('fever & (confusion | not(cough))');
    expect(formatExpr({ any: [{ finding: 'a', is: 'present' }] })).toBe('a');
    expect(
      formatExpr({
        at_least: 2,
        of: [{ any: [{ finding: 'a', is: 'present' }, { finding: 'b', is: 'present' }] }, { finding: 'c', is: 'present' }],
      }),
    ).toBe('≥2 of (a | b; c)');
  });
});

describe('batch of each entry', () => {
  it('follows the section headers, Phase 1 above the first one', () => {
    const text = [
      '# Hô hấp.',
      '- id: cough',
      '  kind: symptom',
      '# ---------- Hồi hộp, ngất (Giai đoạn 3, lô 1) ----------',
      '- id: palpitations',
      '# ---------- Giai đoạn 3, lô 2 ----------',
      '- id: scrotal_pain',
      '  requires:',
      '    - { finding: cough, is: present }',
    ].join('\n');
    expect([...batchesOfEntries(text)]).toEqual([
      ['cough', 'GĐ1'],
      ['palpitations', 'lô 1'],
      ['scrotal_pain', 'lô 2'],
    ]);
  });
});

// Loads the whole knowledge base inside each test, under the same long timeout as kb.test.ts.
describe('compact index of the repository', { timeout: 60_000 }, () => {
  it('has one line per finding, condition, list of links, rule and source', () => {
    const k = checkKnowledge().knowledge;
    expect(k).not.toBeNull();
    if (!k) return;
    const text = renderCatalog(k);
    for (const f of k.findings) expect(text).toContain(`- \`${f.data.id}\` ${f.data.type === 'binary' ? 'bin,' : 'cat'} `);
    for (const c of k.conditions) expect(text).toContain(`- \`${c.data.id}\` ${c.data.names.vi} · u${c.data.urgency}`);
    for (const r of k.rules.data) expect(text).toContain(`- \`${r.id}\` m${r.level} · khi `);
    for (const s of k.sources) expect(text).toContain(`- \`${s.data.id}\` ${s.data.type} · `);
    for (const c of k.conditions) expect(text).toContain(`- \`${c.data.id}\` ${c.data.findings.length} liên kết: `);
    expect(text.split('\n').filter((l) => l.startsWith('- `')).length).toBe(
      k.findings.length + k.clusters.data.length + k.groups.data.length + k.complaints.length + 2 * k.conditions.length +
        k.rules.data.length + k.sources.length,
    );
    expect(text).toMatch(/^- `cough` bin, leak nonspecific \(abdominal_pain moderate, headache moderate\) · symptom · GĐ1 — Có ho không\?$/m);
    expect(text).toMatch(/^- `rf_sepsis_multiple_signs` m1 · khi fever & ≥2 of \(confusion \| drowsy_hard_to_wake; /m);
    expect(text).toMatch(/^- `pneumonia` \d+ liên kết: fever f\[child_2m_5y vf, child_5_12 vf\], fever_max_temp\{lt_38 \.15, /m);
  });

  it('splits into one file to read whole and files to search, with every section once', () => {
    expect(INDEX_FILES.flatMap((f) => f.sections).sort()).toEqual([...INDEX_SECTIONS].sort());
    expect(INDEX_FILES[0]?.sections).not.toContain('links');
  });

  it('names the batch that added or extended a condition', () => {
    const k = checkKnowledge().knowledge;
    expect(k).not.toBeNull();
    if (!k) return;
    const text = renderCatalog(k, { sections: ['conditions'] });
    expect(text).toMatch(/^- `heat_stroke` [^·]+ · u1 cant_miss · lô 2 · /m);
    expect(text).toMatch(/^- `stroke` [^·]+ · u1 cant_miss · GĐ1, mở rộng lô 1, lô 2 · /m);
    expect(text).not.toContain('## Dấu hiệu');
    expect(text).not.toContain('## Nguồn');
  });
});
