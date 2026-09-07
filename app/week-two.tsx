import { ArrowRight, BookOpen, Braces, Check, ChevronDown, ChevronRight, CircleHelp, Clipboard, Cpu, GraduationCap, Lightbulb, ShieldCheck, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

type WeekTwoProps = {
  copied: string;
  answers: number[];
  onCopy: (name: string, code: string) => void;
  onToggleAnswer: (number: number) => void;
};

const timeClassCode = `#ifndef TIME_H
#define TIME_H

class Time {
public:
    explicit Time(int = 0, int = 0, int = 0);
    void setTime(int, int, int);
    std::string toUniversalString() const;
private:
    unsigned int hour{0}, minute{0}, second{0};
};

#endif`;

const destructorCode = `class Trace {
public:
    Trace(int id) : id{id} { cout << "create " << id; }
    ~Trace() { cout << "destroy " << id; }
private:
    int id;
};`;

const constMemberCode = `class Time {
public:
    unsigned int getHour() const;
    void setHour(int hour);
};

const Time noon{12, 0, 0};
noon.getHour();    // 가능
// noon.setHour(1); // 컴파일 오류`;

const compositionCode = `class Employee {
public:
    Employee(const string& first, const Date& birth)
        : firstName{first}, birthDate{birth} {}
private:
    string firstName;
    const Date birthDate; // Employee has-a Date
};`;

const friendCode = `class Count {
    friend void setX(Count&, int);
public:
    int getX() const { return x; }
private:
    int x{0};
};

void setX(Count& c, int value) { c.x = value; }`;

const thisCode = `Time& Time::setHour(int hour) {
    this->hour = hour;
    return *this;
}

t.setHour(18).setMinute(30).setSecond(22);`;

const staticCode = `class Employee {
public:
    static unsigned int getCount() { return count; }
private:
    static unsigned int count;
};

unsigned int Employee::count{0};
cout << Employee::getCount();`;

export function WeekTwo({ copied, answers, onCopy, onToggleAnswer }: WeekTwoProps) {
  return <div className="lesson-stack week-two-stack">
    <section className="note-card intro-card" id="time-case">
      <span className="section-kicker"><Sparkles size={16} /> Chapter 9의 중심 예제</span>
      <h2>Time 클래스는 “유효한 시간”이라는 규칙을 지킵니다</h2>
      <Badges items={['슬라이드 3–15', 'Fig. 9.1–9.4']} />
      <p className="lead">시·분·초를 <code>private</code>으로 숨기고 <code>setTime</code>이 범위를 검사하면 잘못된 값이 객체 내부에 들어오는 일을 막을 수 있습니다.</p>
      <div className="definition"><span>핵심 불변식</span><p><code>0 ≤ hour &lt; 24</code>, <code>0 ≤ minute, second &lt; 60</code>. 조건을 어기면 <code>invalid_argument</code>를 던집니다.</p></div>
      <Snippet name="Time.h" code={timeClassCode} copied={copied} onCopy={onCopy} />
      <More title="헤더 가드와 인라인 함수" label="슬라이드 5·8">
        <p><code>#ifndef</code>, <code>#define</code>, <code>#endif</code>는 같은 헤더가 여러 번 포함되는 일을 막습니다. 클래스 몸체 안에서 정의한 짧은 함수는 컴파일러가 인라인 호출 후보로 다룹니다.</p>
      </More>
      <More title="객체마다 데이터만 따로 저장합니다" label="슬라이드 14–15">
        <p>각 객체는 자신의 데이터 멤버를 갖지만 멤버 함수 코드는 클래스 전체가 공유합니다. 헤더와 구현 파일, 클라이언트 코드는 각각 컴파일된 뒤 링커가 실행 파일로 묶습니다.</p>
      </More>
    </section>

    <section className="note-card" id="class-scope">
      <span className="section-kicker"><Braces size={16} /> 같은 멤버, 다른 접근 문법</span>
      <h2>객체와 참조에는 점, 포인터에는 화살표를 씁니다</h2>
      <Badges items={['슬라이드 16–18']} />
      <div className="three-grid handle-grid">
        <article><b>객체</b><span><code>account</code></span><code>account.setBalance(10);</code></article>
        <article><b>참조</b><span><code>accountRef</code></span><code>accountRef.setBalance(10);</code></article>
        <article><b>포인터</b><span><code>accountPtr</code></span><code>accountPtr-&gt;setBalance(10);</code></article>
      </div>
      <div className="comparison-grid">
        <article><span>access function</span><h3>상태를 읽거나 보여주는 함수</h3><p>참·거짓을 검사하는 접근 함수는 predicate 함수라고도 부릅니다.</p><code>bool isValid() const;</code></article>
        <article><span>utility function</span><h3>내부 작업을 돕는 private 함수</h3><p>다른 멤버 함수의 일을 지원하며 외부 인터페이스에는 노출하지 않습니다.</p><code>int checkDay(int) const;</code></article>
      </div>
    </section>

    <section className="note-card" id="default-arguments">
      <span className="section-kicker"><Cpu size={16} /> 생성자 기본 인수</span>
      <h2>오른쪽 인수부터 생략할 수 있습니다</h2>
      <Badges items={['슬라이드 19–31', 'Fig. 9.5–9.7']} />
      <div className="constructor-cases">
        <code>Time t1;</code><span>00:00:00</span><code>Time t2{'{2}'};</code><span>02:00:00</span>
        <code>Time t3{'{21, 34}'};</code><span>21:34:00</span><code>Time t4{'{12, 25, 42}'};</code><span>12:25:42</span>
      </div>
      <div className="warning-card"><CircleHelp size={19} /><div><b>기본 인수 변경은 클라이언트 재컴파일이 필요합니다</b><p>생략된 값을 호출 지점에 컴파일하기 때문입니다. 한 인수 생성자의 의도치 않은 암시적 변환을 막고 싶을 때는 <code>explicit</code>를 붙입니다.</p></div></div>
      <More title="생성자에서 기존 검증 함수를 재사용할 때" label="슬라이드 23·30–31">
        <p>생성자가 <code>setTime</code>을 호출하면 검증 코드를 반복하지 않아 유지보수가 쉬워집니다. 단, 호출 전에 아직 초기화되지 않은 데이터 멤버를 읽지 않도록 주의해야 합니다.</p>
      </More>
    </section>

    <section className="note-card" id="destructor">
      <span className="section-kicker"><Cpu size={16} /> 객체 수명의 끝</span>
      <h2>소멸자는 범위를 벗어날 때 자동 호출됩니다</h2>
      <Badges items={['슬라이드 32–41', 'Fig. 9.8–9.10']} />
      <Snippet name="destructor.cpp" code={destructorCode} copied={copied} onCopy={onCopy} />
      <div className="fact-row"><div><b>이름</b><span><code>~ClassName()</code></span></div><div><b>매개변수</b><span>없음</span></div><div><b>개수</b><span>클래스마다 하나</span></div></div>
      <div className="lifecycle-flow"><span>먼저 생성 A</span><ArrowRight /><span>나중 생성 B</span><ArrowRight /><span>먼저 소멸 B</span><ArrowRight /><span>나중 소멸 A</span></div>
      <More title="global·local·static 객체의 차이" label="호출 순서">
        <ul><li>일반 지역 객체는 해당 범위에 들어갈 때 생성되고 나올 때 소멸합니다.</li><li><code>static</code> 지역 객체는 선언 지점에 처음 도달할 때 한 번 생성되고 프로그램 종료 때 소멸합니다.</li><li>전역 객체는 <code>main</code>보다 먼저 생성되고 프로그램 종료 때 소멸합니다.</li><li><code>abort</code>는 소멸자를 실행하지 않고, <code>exit</code>도 자동 지역 객체의 소멸자를 실행하지 않습니다.</li></ul>
      </More>
    </section>

    <section className="note-card" id="encapsulation-trap">
      <span className="section-kicker"><ShieldCheck size={16} /> 경계가 새는 코드</span>
      <h2>private 멤버의 수정 가능한 참조를 돌려주면 보호가 깨집니다</h2>
      <Badges items={['슬라이드 42–52', 'Fig. 9.11–9.16']} />
      <div className="warning-card"><CircleHelp size={19} /><div><b>왜 위험한가?</b><p><code>unsigned int&amp; badSetHour()</code>가 내부 <code>hour</code>의 별명을 반환하면 호출자는 검증 함수를 건너뛰고 잘못된 값을 직접 넣을 수 있습니다.</p></div></div>
      <div className="comparison-grid">
        <article><span>수정 가능한 참조</span><h3>캡슐화 우회 가능</h3><p>대입문의 왼쪽 값으로 사용되어 private 상태를 바꿀 수 있습니다.</p><code>t.badSetHour(20) = 74;</code></article>
        <article><span>const 참조</span><h3>외부 수정 차단</h3><p>복사 없이 읽을 수 있지만 그 참조로 값을 바꿀 수 없습니다.</p><code>const unsigned int&amp;</code></article>
      </div>
      <More title="기본 멤버별 대입" label="슬라이드 48–52">
        <p><code>date2 = date1</code>을 실행하면 기본적으로 각 데이터 멤버가 하나씩 복사됩니다. 동적 메모리를 가리키는 포인터 멤버가 있으면 주소만 복사되는 얕은 복사 문제가 생길 수 있습니다.</p>
      </More>
    </section>

    <section className="note-card" id="const-members">
      <span className="section-kicker"><ShieldCheck size={16} /> 객체의 읽기 전용 계약</span>
      <h2>const 객체는 const 멤버 함수만 호출할 수 있습니다</h2>
      <Badges items={['슬라이드 53–57', 'Fig. 9.17']} />
      <Snippet name="const-member.cpp" code={constMemberCode} copied={copied} onCopy={onCopy} />
      <div className="insight"><Lightbulb size={18} /><p><b>선언 위치:</b> <code>getHour() const</code>처럼 매개변수 목록 뒤에 붙입니다. 선언과 클래스 밖 정의 양쪽에 모두 써야 합니다.</p></div>
      <More title="생성자와 소멸자에는 const를 붙일 수 없습니다" label="시험 함정">
        <p>생성자는 초기화를 위해 객체를 바꿔야 하고 소멸자는 종료 정리를 해야 합니다. 객체의 const 성질은 생성자가 초기화를 끝낸 뒤부터 소멸자가 호출될 때까지 적용됩니다.</p>
      </More>
    </section>

    <section className="note-card" id="composition">
      <span className="section-kicker"><BookOpen size={16} /> has-a 관계</span>
      <h2>합성은 다른 클래스의 객체를 데이터 멤버로 갖는 구조입니다</h2>
      <Badges items={['슬라이드 58–70', 'Fig. 9.18–9.22']} />
      <Snippet name="Employee.cpp" code={compositionCode} copied={copied} onCopy={onCopy} />
      <div className="lifecycle-flow"><span>Date 멤버 생성</span><ArrowRight /><span>Employee 생성</span><ArrowRight /><span>Employee 소멸</span><ArrowRight /><span>Date 멤버 소멸</span></div>
      <div className="warning-card"><CircleHelp size={19} /><div><b>실제 초기화 순서는 선언 순서입니다</b><p>초기화 리스트에 적은 순서가 아니라 클래스 정의 안에서 데이터 멤버를 선언한 순서로 생성됩니다. 기본 생성자가 없는 멤버 객체는 초기화 리스트로 값을 전달해야 합니다.</p></div></div>
    </section>

    <section className="note-card" id="friend">
      <span className="section-kicker"><ShieldCheck size={16} /> 제한적으로 경계 열기</span>
      <h2>friend는 비멤버에게 private 접근 권한을 부여합니다</h2>
      <Badges items={['슬라이드 71–76', 'Fig. 9.23']} />
      <Snippet name="friend.cpp" code={friendCode} copied={copied} onCopy={onCopy} />
      <div className="three-grid friend-rules">
        <article><b>명시적 부여</b><span>권한은 클래스가 줌</span><p>friend 쪽에서 가져갈 수 없음</p></article>
        <article><b>비대칭</b><span>A가 B의 friend</span><p>B가 A의 friend인 것은 아님</p></article>
        <article><b>비전이</b><span>A–B, B–C 관계</span><p>A–C 관계는 생기지 않음</p></article>
      </div>
      <p className="subcopy">friend 함수의 원형이 클래스 안에 있어도 멤버 함수는 아닙니다. 오버로드된 함수는 권한을 줄 각 버전을 따로 선언해야 합니다.</p>
    </section>

    <section className="note-card" id="this-pointer">
      <span className="section-kicker"><Cpu size={16} /> 현재 객체의 주소</span>
      <h2>this는 멤버 함수를 호출한 현재 객체를 가리킵니다</h2>
      <Badges items={['슬라이드 77–88', 'Fig. 9.24–9.27']} />
      <Snippet name="this.cpp" code={thisCode} copied={copied} onCopy={onCopy} />
      <div className="comparison-grid">
        <article><span>이름 충돌 해결</span><h3><code>this-&gt;hour = hour;</code></h3><p>왼쪽은 데이터 멤버, 오른쪽은 매개변수임을 분명히 합니다.</p></article>
        <article><span>연쇄 호출</span><h3><code>return *this;</code></h3><p>현재 객체의 참조를 반환해 다음 멤버 호출을 이어갑니다.</p></article>
      </div>
      <div className="insight"><Lightbulb size={18} /><p><code>this</code>는 객체 안에 저장되는 데이터 멤버가 아닙니다. 컴파일러가 각 비정적 멤버 함수에 암시적으로 전달합니다.</p></div>
    </section>

    <section className="note-card" id="static-members">
      <span className="section-kicker"><Braces size={16} /> 객체 전체가 공유하는 상태</span>
      <h2>static 멤버는 객체가 없어도 클래스 이름으로 접근할 수 있습니다</h2>
      <Badges items={['슬라이드 89–99', 'Fig. 9.28–9.30']} />
      <Snippet name="static-member.cpp" code={staticCode} copied={copied} onCopy={onCopy} />
      <div className="comparison-grid">
        <article><span>일반 데이터 멤버</span><h3>객체마다 한 사본</h3><p>각 객체에 고유한 상태를 저장합니다.</p><code>employee.firstName</code></article>
        <article><span>static 데이터 멤버</span><h3>클래스 전체에 한 사본</h3><p>생성된 객체 수처럼 모든 인스턴스가 공유합니다.</p><code>Employee::count</code></article>
      </div>
      <More title="정확히 한 번 초기화합니다" label="시험 포인트">
        <p>static 데이터 멤버는 객체가 하나도 없어도 존재합니다. 전통적인 정의에서는 클래스 밖에서 <code>unsigned int Employee::count{'{0}'};</code>처럼 한 번 초기화하고, 그 정의에는 <code>static</code>을 다시 쓰지 않습니다.</p>
      </More>
    </section>

    <section className="quiz-card" id="week2-check">
      <div className="quiz-heading"><span className="section-kicker"><GraduationCap size={16} /> 2주차 확인 문제</span><h2>객체의 수명과 접근 규칙을 점검하세요</h2></div>
      <W2Quiz id={201} label="Q1" question="const Time 객체는 const로 선언되지 않은 get 함수도 호출할 수 있다." answer="X" explanation="함수가 실제로 값을 바꾸지 않아도 선언 뒤에 const가 없으면 const 객체에서 호출할 수 없습니다." open={answers.includes(201)} onToggle={onToggleAnswer} />
      <W2Quiz id={202} label="Q2" question="합성 객체의 멤버들은 생성자 초기화 리스트에 적힌 순서대로 생성된다." answer="X" explanation="클래스 정의에서 데이터 멤버를 선언한 순서대로 생성됩니다." open={answers.includes(202)} onToggle={onToggleAnswer} />
      <W2Quiz id={203} label="Q3" question="A가 B의 friend라면 B도 자동으로 A의 friend다." answer="X" explanation="friend 관계는 대칭이 아니며 전이되지도 않습니다." open={answers.includes(203)} onToggle={onToggleAnswer} />
      <W2Quiz id={204} label="Q4" question="return *this는 현재 객체의 참조를 반환해 연쇄 호출을 가능하게 할 수 있다." answer="O" explanation="반환형을 ClassName&로 선언하면 같은 객체에 다음 멤버 함수를 이어 호출할 수 있습니다." open={answers.includes(204)} onToggle={onToggleAnswer} />
      <W2Quiz id={205} label="Q5" question="static 데이터 멤버는 각 객체마다 별도의 사본을 가진다." answer="X" explanation="클래스 전체가 하나의 사본을 공유합니다." open={answers.includes(205)} onToggle={onToggleAnswer} />
    </section>

    <section className="memory-strip">
      <div><span>01</span><p><b>소멸자</b>는 보통 생성의 역순으로 자동 호출된다.</p></div>
      <div><span>02</span><p><b>합성</b>의 멤버 객체는 클래스에 선언된 순서로 생성된다.</p></div>
      <div><span>03</span><p><b>static</b>은 객체별 상태가 아니라 클래스가 공유하는 상태다.</p></div>
    </section>
  </div>;
}

function Badges({ items }: { items: string[] }) {
  return <div className="source-badges" aria-label="학습 내용 출처">{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function More({ title, label, children }: { title: string; label: string; children: ReactNode }) {
  return <details className="detail-note"><summary><span><small>{label}</small>{title}</span><ChevronDown size={17} /></summary><div className="detail-body">{children}</div></details>;
}

function Snippet({ name, code, copied, onCopy }: { name: string; code: string; copied: string; onCopy: (name: string, code: string) => void }) {
  return <section className="code-card compact"><div className="code-copy"><span><i /> {name}</span><button onClick={() => onCopy(name, code)} aria-label={`${name} 코드 복사`}>{copied === name ? <Check size={14} /> : <Clipboard size={14} />}{copied === name ? '복사됨' : '코드 복사'}</button></div><pre><code>{code}</code></pre></section>;
}

function W2Quiz({ id, label, question, answer, explanation, open, onToggle }: { id: number; label: string; question: string; answer: string; explanation: string; open: boolean; onToggle: (number: number) => void }) {
  return <article className="quiz-item"><div><span>{label}</span><p>{question}</p></div><button onClick={() => onToggle(id)}>{open ? '해설 닫기' : '정답 확인'}<ChevronRight size={15} /></button>{open && <div className="answer"><b>정답 {answer}</b><p>{explanation}</p></div>}</article>;
}
