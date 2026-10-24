/**
 * Interactive check in the terminal (Vietnamese), for trying the engine before the web UI exists.
 * Usage: npm run play
 */
import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import {
  UNKNOWN,
  ageGroupOf,
  answerStep,
  emergencyScreenStep,
  goBack,
  groupResponse,
  nextStep,
  sessionResult,
  startSession,
  stopEarly,
} from '@doctor-v/engine';
import type { AskStep, CompiledKb, DisplayPercent, PatientContext, SessionState, TriageReason } from '@doctor-v/engine';
import { buildKnowledge } from '@doctor-v/kb';

const rl = createInterface({ input: stdin, output: stdout });
const built = buildKnowledge();
if (!built.kb) {
  console.error('Dữ liệu đang có lỗi; chạy "npm run kb:check" để xem chi tiết.');
  process.exit(1);
}
const kb: CompiledKb = built.kb;
const t = kb.text;

const say = (s = ''): void => console.log(s);
const ask = async (prompt: string): Promise<string> => (await rl.question(prompt)).trim().toLowerCase();
const label = (id: string): string => t.findings[id]?.label ?? id;
const percent = (d: DisplayPercent): string => (d.kind === 'below' ? `dưới ${d.percent}%` : `khoảng ${d.percent}%`);

async function pickOne(options: string[], extra = ''): Promise<number> {
  options.forEach((o, i) => say(`  ${i + 1}) ${o}`));
  for (;;) {
    const raw = await ask(`Chọn số${extra}: `);
    const n = Number(raw);
    if (Number.isInteger(n) && n >= 1 && n <= options.length) return n - 1;
    say('Vui lòng nhập một số trong danh sách.');
  }
}

/** Returns the response, or "back" / "stop" commands. */
async function askStep(step: AskStep): Promise<Record<string, string> | 'back' | 'stop'> {
  const controls = ' (b: quay lại, q: dừng và xem kết quả)';
  if (step.kind === 'group') {
    const title = step.groupId === null ? t.emergencyScreen.title : (t.groups[step.groupId]?.title ?? '');
    const none = step.groupId === null ? t.emergencyScreen.noneLabel : (t.groups[step.groupId]?.noneLabel ?? 'Không có');
    say(`\n${title}`);
    step.findingIds.forEach((id, i) => say(`  ${i + 1}) ${label(id)}`));
    say(`  0) ${none}`);
    if (step.allowUnknown) say('  ?) Tôi không rõ');
    for (;;) {
      const raw = await ask(`Nhập các số, cách nhau dấu phẩy${controls}: `);
      if (raw === 'b') return 'back';
      if (raw === 'q') return 'stop';
      if (raw === '?' && step.allowUnknown) return groupResponse(step, [], true);
      if (raw === '0') return groupResponse(step, []);
      const picks = raw.split(/[,\s]+/).map(Number);
      if (picks.length > 0 && picks.every((n) => Number.isInteger(n) && n >= 1 && n <= step.findingIds.length)) {
        return groupResponse(step, picks.map((n) => step.findingIds[n - 1] ?? ''));
      }
      say('Chưa hiểu câu trả lời, vui lòng nhập lại.');
    }
  }
  const text = t.findings[step.findingId];
  const finding = kb.findings.find((f) => f.id === step.findingId);
  say(`\n${step.alt ? (text?.altQuestion ?? text?.question) : text?.question}`);
  if (text?.help && !step.alt) say(`  (${text.help})`);
  const options = finding?.type === 'categorical' ? finding.options.map((o) => text?.options[o] ?? o) : ['Có', 'Không'];
  options.forEach((o, i) => say(`  ${i + 1}) ${o}`));
  say(`  ${options.length + 1}) Không rõ`);
  for (;;) {
    const raw = await ask(`Chọn số${controls}: `);
    if (raw === 'b') return 'back';
    if (raw === 'q') return 'stop';
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 1 || n > options.length + 1) {
      say('Vui lòng nhập một số trong danh sách.');
      continue;
    }
    if (n === options.length + 1) return { [step.findingId]: UNKNOWN };
    if (finding?.type === 'categorical') return { [step.findingId]: finding.options[n - 1] ?? UNKNOWN };
    return { [step.findingId]: n === 1 ? 'present' : 'absent' };
  }
}

function describeReason(r: TriageReason): string {
  switch (r.kind) {
    case 'emergency_screen':
      return `Có dấu hiệu cấp cứu: ${label(r.findingId)}.`;
    case 'emergency_unknown':
      return `Chưa rõ dấu hiệu cấp cứu: ${label(r.findingId)}.`;
    case 'rule':
      return t.rules[r.ruleId]?.reason ?? r.ruleId;
    case 'rule_unknown':
      return `Chưa loại trừ được: ${t.rules[r.ruleId]?.reason ?? r.ruleId}`;
    case 'probability':
      return r.cantMiss
        ? `Chưa loại trừ được bệnh nguy hiểm (khả năng cộng dồn ${(r.mass * 100).toFixed(1)}%).`
        : `Khả năng có bệnh cần xử trí ở mức này: ${(r.mass * 100).toFixed(1)}%.`;
    case 'guard_other':
      return 'Triệu chứng chưa khớp rõ với bệnh nào trong hệ thống, nên cần được khám.';
    case 'guard_early_stop':
      return 'Phiên hỏi dừng sớm, nên không khuyên tự theo dõi tại nhà.';
  }
}

function printResult(state: SessionState): void {
  const r = sessionResult(kb, state);
  const level = t.triageLevels[String(r.triage.level)];
  say('\n==================== KẾT QUẢ ====================');
  say(`MỨC XỬ TRÍ: ${level?.label ?? r.triage.level}`);
  say(level?.action ?? '');
  say('Lý do:');
  for (const reason of r.triage.reasons.filter((x) => x.level === r.triage.level).slice(0, 3)) say(`  - ${describeReason(reason)}`);
  if (r.safetyNet.length > 0) say(`Đi cấp cứu ngay nếu có: ${r.safetyNet.map(label).join('; ')}.`);
  say(`Nên khám: ${r.specialties.map((s) => t.specialties[s] ?? s).join(', ')}.`);
  if (r.rankingSuppressed) {
    say('\nTrẻ dưới 2 tháng tuổi: app không xếp hạng bệnh, hãy cho bé đi khám.');
  } else if (r.emergencyStop) {
    const urgent = r.urgentConditions.map((id) => t.conditions[id]?.name ?? id);
    if (urgent.length > 0) say(`\nBác sĩ cần loại trừ: ${urgent.join('; ')}.`);
  } else {
    say(`\nTình trạng có thể liên quan${kb.params.calibrated ? '' : ' (con số chưa hiệu chuẩn)'}:`);
    for (const c of r.conditions.filter((x) => x.probability >= 0.01).slice(0, 5)) {
      const why = c.supporting.slice(0, 3).map((x) => label(x.findingId));
      const tag = c.cantMiss && c.urgency <= 2 ? ' [Cần loại trừ sớm]' : '';
      say(`  - ${t.conditions[c.conditionId]?.name ?? c.conditionId}: ${percent(c.display)}${tag}`);
      if (why.length > 0) say(`      Vì: ${why.join(', ')}`);
    }
    say(`  - Nguyên nhân khác chưa có trong hệ thống: ${percent(r.other.display)}`);
  }
  say(`\nĐã hỏi ${r.questionsAsked} câu. Phiên bản dữ liệu ${r.kbVersion}.`);
  say('Đây là thông tin tham khảo, không phải chẩn đoán. Nếu nguy cấp, gọi 115.');
}

async function main(): Promise<void> {
  say(`doctor-v — bản thử nghiệm dòng lệnh (dữ liệu ${kb.version}, chưa được bác sĩ thẩm định).`);
  say('Công cụ không chẩn đoán và không thay thế việc khám bệnh. Nếu nguy cấp, gọi 115.');

  const screen = emergencyScreenStep(kb);
  const screenAnswer = await askStep(screen);
  if (screenAnswer === 'back' || screenAnswer === 'stop') return;
  if (Object.values(screenAnswer).includes('present')) {
    say(`\n🚨 ${t.triageLevels['1']?.label ?? 'Gọi 115 ngay'}. ${t.triageLevels['1']?.action ?? ''}`);
    return;
  }

  let ageMonths = NaN;
  while (!Number.isFinite(ageMonths) || ageMonths < 0 || ageMonths > 1440) {
    const raw = await ask('\nTuổi (số năm; trẻ dưới 2 tuổi nhập số tháng kèm chữ "t", ví dụ 8t): ');
    ageMonths = raw.endsWith('t') ? Number(raw.slice(0, -1)) : Number(raw) * 12;
  }
  say('\nGiới tính:');
  const sex = (await pickOne(['Nữ', 'Nam'])) === 0 ? 'female' : 'male';
  const ctx: PatientContext = { ageMonths, sex, regionId: null, month: new Date().getMonth() + 1 };
  const ageGroup = ageGroupOf(kb.ageGroups, ageMonths);

  const complaints = kb.complaints.filter((c) => c.ageGroups === null || c.ageGroups.includes(ageGroup));
  say('\nTriệu chứng chính:');
  const complaint = complaints[await pickOne(complaints.map((c) => t.complaints[c.id]?.label ?? c.id))];
  if (!complaint) return;

  let state = startSession(kb, complaint.id, ctx, screenAnswer);
  for (;;) {
    const step = nextStep(kb, state);
    if (step.kind === 'done') break;
    const response = await askStep(step);
    if (response === 'back') state = goBack(state);
    else if (response === 'stop') state = stopEarly(state);
    else state = answerStep(kb, state, step, response);
  }
  printResult(state);
}

await main();
rl.close();
