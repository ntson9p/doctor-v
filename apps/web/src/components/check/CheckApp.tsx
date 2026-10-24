/**
 * The whole check flow (docs/plan.md §3.1): warning, emergency screen, basic information, chief
 * complaint, one question per screen, review, result. Everything runs in the browser; the flow is
 * kept in sessionStorage so a reload does not lose the answers (it is gone when the tab closes).
 */
import type { AskStep, CompiledKb, Phase, SessionResult, SessionState, Step } from '@doctor-v/engine';
import {
  answerStep,
  emergencyScreenStep,
  goBack,
  groupResponse,
  nextStep,
  sessionResult,
  startSession,
  stopEarly,
} from '@doctor-v/engine';
import { useEffect, useState } from 'preact/hooks';
import { loadKb } from '../../lib/kb.ts';
import { KEYS, readJson, remove, writeJson } from '../../lib/storage.ts';
import { Call115 } from './Call115.tsx';
import { Complaints } from './Complaints.tsx';
import { FindingQuestion } from './FindingQuestion.tsx';
import { GroupQuestion } from './GroupQuestion.tsx';
import { EMPTY_PROFILE, Profile, ageMonthsOf } from './Profile.tsx';
import type { ProfileData } from './Profile.tsx';
import { Result } from './Result.tsx';
import { Review } from './Review.tsx';

type View = 'intro' | 'screen' | 'call115' | 'profile' | 'complaint' | 'ask' | 'review' | 'result';

interface Flow {
  kbVersion: string;
  view: View;
  /** Emergency-screen answers, asked before age and sex. */
  screen: Record<string, string> | null;
  profile: ProfileData;
  session: SessionState | null;
}

const STAGES = ['Dấu hiệu cấp cứu', 'Thông tin cơ bản', 'Câu hỏi', 'Kết quả'] as const;
const STAGE_OF: Record<View, number> = { intro: -1, screen: 0, call115: -1, profile: 1, complaint: 1, ask: 2, review: 3, result: -1 };
const PHASE_LABEL: Record<Phase, string> = {
  screen: 'Dấu hiệu cấp cứu',
  red_flags: 'Dấu hiệu nguy hiểm',
  escalation: 'Dấu hiệu nguy hiểm',
  intake: 'Triệu chứng đi kèm',
  adaptive: 'Câu hỏi thêm',
};

// Sessions are immutable, so the next step can be cached per session object: choosing the view
// and rendering the question would otherwise compute it twice (slow on low-end phones).
const stepCache = new WeakMap<SessionState, Step>();
function nextStepOf(kb: CompiledKb, session: SessionState): Step {
  let step = stepCache.get(session);
  if (!step) {
    step = nextStep(kb, session);
    stepCache.set(session, step);
  }
  return step;
}

const resultCache = new WeakMap<SessionState, SessionResult>();
function resultOf(kb: CompiledKb, session: SessionState): SessionResult {
  let result = resultCache.get(session);
  if (!result) {
    result = sessionResult(kb, session);
    resultCache.set(session, result);
  }
  return result;
}

const fresh = (kb: CompiledKb, view: View = 'intro'): Flow => ({ kbVersion: kb.version, view, screen: null, profile: EMPTY_PROFILE, session: null });

function Progress({ view, phase }: { view: View; phase: Phase | null }) {
  const stage = STAGE_OF[view];
  if (stage < 0) return null;
  const label = view === 'ask' && phase ? PHASE_LABEL[phase] : STAGES[stage];
  return (
    <p class="progress">
      Bước {stage + 1}/{STAGES.length} · {label}
    </p>
  );
}

function Intro({ onDone }: { onDone: () => void }) {
  return (
    <div>
      <h1 tabIndex={-1} data-autofocus>
        Trước khi bắt đầu
      </h1>
      <ul>
        <li>Ứng dụng gợi ý nên đi khám ở đâu, khi nào. Ứng dụng không chẩn đoán bệnh.</li>
        <li>Nếu có dấu hiệu nguy kịch, hãy gọi 115 ngay, không cần trả lời câu hỏi.</li>
        <li>Câu trả lời chỉ được xử lý trên máy của bạn, không gửi đi đâu.</li>
        <li>Đây là bản thử nghiệm. Nội dung chưa được bác sĩ thẩm định.</li>
      </ul>
      <button type="button" class="btn btn--primary btn--block" onClick={onDone}>
        Tôi đã hiểu
      </button>
    </div>
  );
}

export default function CheckApp() {
  const [kb, setKb] = useState<CompiledKb | null>(null);
  const [failed, setFailed] = useState(false);
  const [flow, setFlow] = useState<Flow | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    loadKb()
      .then((k) => {
        setKb(k);
        const saved = readJson<Flow>('session', KEYS.session);
        setFlow(saved && saved.kbVersion === k.version ? saved : fresh(k));
      })
      .catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    if (flow) writeJson('session', KEYS.session, flow);
  }, [flow]);

  // Each new screen: move focus to its heading and scroll to the top.
  const screenKey = flow ? `${flow.view}:${flow.session?.history.length ?? 0}` : '';
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-autofocus]');
    el?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [screenKey]);

  if (failed) {
    return (
      <p class="error" role="alert">
        Không tải được dữ liệu. Hãy kiểm tra kết nối mạng rồi tải lại trang. Nếu nguy cấp, gọi 115.
      </p>
    );
  }
  if (!kb || !flow) return <p>Đang tải…</p>;

  const set = (patch: Partial<Flow>): void => setFlow({ ...flow, ...patch });
  /**
   * Runs engine work after the browser has painted a busy state: it can take about half a second
   * on a low-end phone, and without feedback a tap looks ignored.
   */
  const later = (work: () => void): void => {
    setBusy(true);
    requestAnimationFrame(() =>
      setTimeout(() => {
        work();
        setBusy(false);
      }, 0),
    );
  };
  /** Moves the session on: the next question, or the review (the result at once for emergencies). */
  const advance = (session: SessionState): void => {
    const step = nextStepOf(kb, session);
    if (step.kind !== 'done') return set({ session, view: 'ask' });
    const immediate = step.reason === 'emergency' || step.reason === 'screen_only';
    set({ session, view: immediate ? 'result' : 'review' });
  };
  const restart = (): void => {
    remove('session', KEYS.session);
    setFlow(fresh(kb, 'screen'));
  };

  const view = flow.view;
  const session = flow.session;
  const step = view === 'ask' && session ? nextStepOf(kb, session) : null;
  const ask = step && step.kind !== 'done' ? step : null;
  let body: preact.JSX.Element;

  if (view === 'intro') {
    body = <Intro onDone={() => set({ view: 'screen' })} />;
  } else if (view === 'screen') {
    const s = emergencyScreenStep(kb);
    body = (
      <GroupQuestion
        key="screen"
        kb={kb}
        title={kb.text.emergencyScreen.title}
        noneLabel={kb.text.emergencyScreen.noneLabel}
        findingIds={s.kind === 'group' ? s.findingIds : []}
        allowUnknown={false}
        onAnswer={(checked) => {
          const answers = groupResponse(s, checked ?? []);
          set({ screen: answers, view: (checked ?? []).length > 0 ? 'call115' : 'profile' });
        }}
      />
    );
  } else if (view === 'call115') {
    const signs = Object.entries(flow.screen ?? {})
      .filter(([, v]) => v === 'present')
      .map(([id]) => id);
    body = <Call115 kb={kb} signs={signs} onBack={() => set({ screen: null, view: 'screen' })} />;
  } else if (view === 'profile') {
    body = <Profile kb={kb} initial={flow.profile} onDone={(profile) => set({ profile, view: 'complaint' })} />;
  } else if (view === 'complaint') {
    const ageMonths = ageMonthsOf(flow.profile);
    const sex = flow.profile.sex;
    body =
      ageMonths === null || sex === null ? (
        <button type="button" class="btn btn--block" onClick={() => set({ view: 'profile' })}>
          Nhập lại thông tin cơ bản
        </button>
      ) : (
        <Complaints
          kb={kb}
          ageMonths={ageMonths}
          onPick={(complaintId) => {
            const ctx = { ageMonths, sex, regionId: flow.profile.regionId, month: new Date().getMonth() + 1 };
            later(() => advance(startSession(kb, complaintId, ctx, flow.screen ?? {})));
          }}
        />
      );
  } else if (view === 'ask' && session) {
    if (!ask) {
      body = (
        <button type="button" class="btn btn--primary btn--block" onClick={() => set({ view: 'review' })}>
          Xem lại câu trả lời
        </button>
      );
    } else {
      const answer = (s: AskStep, response: Record<string, string>): void => later(() => advance(answerStep(kb, session, s, response)));
      const question =
        ask.kind === 'finding' ? (
          <FindingQuestion
            key={`${session.history.length}:${ask.findingId}:${ask.alt}`}
            kb={kb}
            findingId={ask.findingId}
            alt={ask.alt}
            forOther={flow.profile.forOther}
            onAnswer={(v) => answer(ask, { [ask.findingId]: v })}
          />
        ) : (
          <GroupQuestion
            key={`${session.history.length}:${ask.groupId ?? 'screen'}`}
            kb={kb}
            title={ask.groupId === null ? kb.text.emergencyScreen.title : (kb.text.groups[ask.groupId]?.title ?? '')}
            noneLabel={ask.groupId === null ? kb.text.emergencyScreen.noneLabel : (kb.text.groups[ask.groupId]?.noneLabel ?? '')}
            findingIds={ask.findingIds}
            allowUnknown={ask.allowUnknown}
            onAnswer={(checked) => answer(ask, checked === null ? groupResponse(ask, [], true) : groupResponse(ask, checked))}
          />
        );
      const canStop = session.history.length >= kb.params.stop.softMaxQuestions;
      body = (
        <>
          <button
            type="button"
            class="btn btn--link back"
            onClick={() => (session.history.length > 0 ? set({ session: goBack(session) }) : set({ view: 'complaint' }))}
          >
            ‹ Quay lại
          </button>
          {question}
          {canStop ? (
            <button type="button" class="btn btn--link" style={{ marginTop: '1.5rem' }} onClick={() => later(() => advance(stopEarly(session)))}>
              Dừng hỏi và xem kết quả
            </button>
          ) : null}
        </>
      );
    }
  } else if (view === 'review' && session) {
    body = (
      <Review
        kb={kb}
        history={session.history}
        forOther={flow.profile.forOther}
        onEdit={(i) => set({ session: { ...session, history: session.history.slice(0, i), stoppedByUser: false }, view: 'ask' })}
        onDone={() =>
          later(() => {
            resultOf(kb, session);
            set({ view: 'result' });
          })
        }
      />
    );
  } else if (view === 'result' && session) {
    body = (
      <Result kb={kb} result={resultOf(kb, session)} onReview={() => set({ view: 'review' })} onRestart={restart} />
    );
  } else {
    body = (
      <button type="button" class="btn btn--primary btn--block" onClick={restart}>
        Bắt đầu lại
      </button>
    );
  }

  return (
    <div class="check" aria-busy={busy}>
      <p class="visually-hidden" role="status">
        {busy ? 'Đang xử lý' : ''}
      </p>
      <Progress view={view} phase={ask?.phase ?? null} />
      {body}
    </div>
  );
}
