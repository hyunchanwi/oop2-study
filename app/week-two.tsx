import { ArrowRight, BookOpen, Braces, Check, ChevronDown, ChevronRight, CircleHelp, Clipboard, Cpu, GraduationCap, Lightbulb, ShieldCheck, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

type WeekTwoProps = {
  copied: string;
  answers: number[];
  onCopy: (name: string, code: string) => void;
  onToggleAnswer: (number: number) => void;
};

type WalkthroughStep = { code: string; title: string; description: string };

const timeClassCode = `#ifndef TIME_H          // 같은 헤더를 두 번 읽지 않게 막는다.
#define TIME_H

#include <string>       // std::string 선언을 사용한다.

class Time {
public:
    explicit Time(int = 0, int = 0, int = 0); // 0~3개 인수로 생성
    void setTime(int, int, int);               // 검증 후 상태 변경
    std::string toUniversalString() const;     // 상태를 바꾸지 않는 읽기 함수
private:
    unsigned int hour{0};   // 객체마다 따로 저장되는 상태
    unsigned int minute{0};
    unsigned int second{0};
};

#endif                  // #ifndef의 끝`;

const timeImplementationCode = `void Time::setTime(int h, int m, int s) {
    // 세 값이 모두 유효할 때만 객체 상태를 한꺼번에 바꾼다.
    if (0 <= h && h < 24 && 0 <= m && m < 60 && 0 <= s && s < 60) {
        hour = h;        // 실제로는 this->hour = h와 같다.
        minute = m;
        second = s;
        return;
    }
    // 실패 경로에서는 대입하지 않았으므로 기존 시간이 그대로 남는다.
    throw std::invalid_argument{"hour/minute/second out of range"};
}`;

const timeUsageCode = `Time t;                         // 기본 인수 → 00:00:00
t.setTime(13, 27, 6);          // t의 상태 → 13:27:06

try {
    t.setTime(99, 0, 0);       // 대입 전에 검증 실패 → 예외
} catch (const std::invalid_argument& error) {
    std::cout << error.what(); // 예외 객체를 복사하지 않고 읽는다.
}
// t는 여전히 13:27:06이다.`;

const accessCode = `Account account;                   // 실제 객체
Account& accountRef{account};       // account의 별명
Account* accountPtr{&account};      // account의 주소

account.setBalance(123.45);         // 객체: .
accountRef.setBalance(200.0);       // 참조: . (같은 객체가 바뀜)
accountPtr->setBalance(300.0);      // 포인터: -> (= (*accountPtr).)`;

const constructorCode = `Time::Time(int h, int m, int s) {
    setTime(h, m, s); // 검증 로직을 한 곳에서 재사용
}

Time t1;              // Time(0, 0, 0)
Time t2{2};           // Time(2, 0, 0)
Time t3{21, 34};      // Time(21, 34, 0)
Time t4{12, 25, 42};  // Time(12, 25, 42)`;

const destructorCode = `class Trace {
public:
    Trace(int id) : id{id} { std::cout << "create " << id << '\\n'; }
    ~Trace() { std::cout << "destroy " << id << '\\n'; } // 반환형·인수 없음
private:
    int id;
};

Trace global{1};              // main 전 생성, 프로그램 종료 때 소멸
void demo() {
    Trace local{2};           // demo를 나갈 때 소멸
    static Trace once{3};     // 첫 호출 때 1회 생성, 프로그램 종료 때 소멸
}`;

const badReferenceCode = `unsigned int& Time::badSetHour(int value) {
    if (value < 24) hour = value; // 여기까지는 검증을 거친다.
    else throw std::invalid_argument{"hour must be 0-23"};
    return hour;                   // private 멤버의 수정 가능한 별명을 노출
}

unsigned int& leaked{t.badSetHour(20)};
leaked = 30;                // 검증을 우회해 t.hour를 30으로 변경
t.badSetHour(12) = 74;      // 참조 반환값은 대입문의 왼쪽에도 올 수 있다.`;

const constMemberCode = `class Time {
public:
    unsigned int getHour() const; // this가 const Time*처럼 동작
    void setHour(int hour);       // 상태를 바꾸므로 const가 아님
};

Time wakeUp{6, 45, 0};
const Time noon{12, 0, 0};
wakeUp.setHour(7);  // 일반 객체 → non-const 함수: 가능
noon.getHour();     // const 객체 → const 함수: 가능
// noon.setHour(1); // const 객체 → non-const 함수: 컴파일 오류`;

const compositionCode = `class Employee {
public:
    Employee(const string& first, const Date& birth)
        : firstName{first}, birthDate{birth} {} // 생성 순간에 초기화
private:
    string firstName;       // ① 먼저 생성
    const Date birthDate;   // ② 다음 생성: Employee has-a Date
};

// 생성: firstName → birthDate → Employee 생성자 몸체
// 소멸: Employee 소멸자 몸체 → birthDate → firstName`;

const friendCode = `class Count {
    friend void setX(Count&, int); // Count가 setX에게 권한을 부여
public:
    int getX() const { return x; }
private:
    int x{0};
};

void setX(Count& c, int value) {
    c.x = value; // 멤버 함수가 아니지만 friend라 private 접근 가능
}`;

const thisCode = `Time& Time::setHour(int hour) { // 참조 반환: 복사본 없음
    this->hour = hour;               // 왼쪽은 멤버, 오른쪽은 매개변수
    return *this;                    // '현재 객체 자체'를 참조로 반환
}

t.setHour(18)          // t.hour = 18, 다시 t를 반환
 .setMinute(30)        // 같은 t.minute = 30, 다시 t를 반환
 .setSecond(22);       // 같은 t.second = 22`;

const valueReturnCode = `Time Time::setHour(int h) { // 값 반환: 결과는 복사본
    hour = h;                 // 첫 호출의 원본 t.hour는 바뀐다.
    return *this;             // 여기서 반환용 복사본이 생긴다.
}

t.setHour(18).setMinute(30);
// 원본 t: 18:00:00
// 임시 복사본만 18:30:00이 되고 문장 끝에서 소멸한다.`;

const staticCode = `class Employee {
public:
    Employee() { ++count; }  // 생성 때 공유 카운트 증가
    ~Employee() { --count; } // 소멸 때 공유 카운트 감소
    static unsigned int getCount() { return count; } // this가 없는 함수
private:
    static unsigned int count; // 헤더: 선언
};

unsigned int Employee::count{0}; // CPP: 실제 저장 공간 정의
std::cout << Employee::getCount(); // 객체 없이 클래스 이름으로 호출`;

export function WeekTwo({ copied, answers, onCopy, onToggleAnswer }: WeekTwoProps) {
  return <div className="lesson-stack week-two-stack">
    <section className="note-card intro-card" id="time-case">
      <span className="section-kicker"><Sparkles size={16} /> Chapter 9의 중심 예제</span>
      <h2>Time 클래스는 “유효한 시간”이라는 규칙을 지킵니다</h2>
      <Badges items={['슬라이드 3–15', 'Fig. 9.1–9.4']} />
      <p className="lead">시·분·초를 <code>private</code>으로 숨기고 <code>setTime</code>이 범위를 검사하면 잘못된 값이 객체 내부에 들어오는 일을 막을 수 있습니다.</p>
      <div className="definition"><span>핵심 불변식</span><p><code>0 ≤ hour &lt; 24</code>, <code>0 ≤ minute, second &lt; 60</code>. 조건을 어기면 <code>invalid_argument</code>를 던집니다.</p></div>
      <Snippet name="Time.h" code={timeClassCode} copied={copied} onCopy={onCopy} />
      <Walkthrough title="Time.h 선언 읽기" steps={[
        { code: '#ifndef → #define → #endif', title: '헤더를 한 번만 정의', description: '여러 .cpp가 Time.h를 포함해도 한 번의 번역 단위 안에서 class Time이 중복 정의되지 않게 합니다.' },
        { code: 'explicit Time(int = 0, int = 0, int = 0)', title: '생성 방법과 기본값을 공개', description: '호출자는 인수를 0~3개 줄 수 있습니다. explicit은 정수 하나가 Time으로 몰래 변환되는 상황을 막습니다.' },
        { code: 'toUniversalString() const', title: '읽기 전용 계약', description: '마지막 const는 이 함수가 hour, minute, second를 바꾸지 않겠다는 컴파일러와의 약속입니다.' },
        { code: 'private: hour / minute / second', title: '불변식을 클래스 안에 가둠', description: '외부 코드가 시간을 직접 99시로 만들 수 없고, 반드시 검증 함수라는 문을 통과하게 합니다.' },
      ]} />
      <Snippet name="Time.cpp · setTime" code={timeImplementationCode} copied={copied} onCopy={onCopy} />
      <Walkthrough title="setTime 실행 순서" steps={[
        { code: 'void Time::setTime(...)', title: '선언과 구현을 연결', description: 'Time::가 이 함수가 Time 소속임을 알려 줍니다. 그래서 클래스 밖에 정의해도 private 멤버를 사용할 수 있습니다.' },
        { code: 'if (세 범위 조건)', title: '변경하기 전에 전부 검증', description: '&&이므로 세 조건이 모두 참이어야 대입 블록으로 들어갑니다. 부분적으로 바꾼 뒤 실패하는 상태를 피합니다.' },
        { code: 'hour = h; minute = m; second = s;', title: '현재 객체의 상태 변경', description: '멤버 함수 안의 hour는 this->hour의 축약입니다. 호출한 바로 그 객체의 세 필드가 바뀝니다.' },
        { code: 'throw invalid_argument{...}', title: '실패를 호출자에게 전달', description: '유효하지 않으면 정상 반환하지 않습니다. 대입을 시작하기 전이므로 객체에는 이전의 유효한 값이 남습니다.' },
      ]} />
      <Snippet name="main.cpp · 호출과 예외" code={timeUsageCode} copied={copied} onCopy={onCopy} />
      <div className="insight"><Lightbulb size={18} /><p><b>출력 코드 읽기:</b> <code>ostringstream</code>는 화면 대신 문자열을 조립합니다. <code>setfill(&apos;0&apos;)</code>은 이후에도 유지되지만 <code>setw(2)</code>는 바로 다음 값 한 번에만 적용되므로 시·분·초 앞에 각각 다시 써야 합니다.</p></div>
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
      <Snippet name="member-access.cpp" code={accessCode} copied={copied} onCopy={onCopy} />
      <Walkthrough title="세 손잡이가 같은 객체에 닿는 과정" steps={[
        { code: 'Account& accountRef{account}', title: '참조는 새 객체가 아닌 별명', description: 'accountRef를 통해 바꾼 값은 곧 account의 값입니다. 참조 자체는 객체처럼 점 연산자를 씁니다.' },
        { code: 'Account* accountPtr{&account}', title: '포인터에는 주소 저장', description: '&account가 account의 주소를 구하고, accountPtr가 그 주소를 보관합니다.' },
        { code: 'accountPtr->setBalance(300.0)', title: '주소를 따라가서 호출', description: '화살표는 (*accountPtr).setBalance(300.0)의 축약입니다. 셋 모두 최종적으로 같은 account를 변경합니다.' },
      ]} />
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
      <Snippet name="constructor.cpp" code={constructorCode} copied={copied} onCopy={onCopy} />
      <Walkthrough title="생성자 호출을 컴파일러 관점에서 읽기" steps={[
        { code: 'Time t2{2}', title: '빠진 오른쪽 인수에 기본값 대입', description: '선언에 적힌 기본값으로 Time(2, 0, 0)이 호출됩니다. 중간 인수만 건너뛰는 문법은 없습니다.' },
        { code: 'setTime(h, m, s)', title: '생성자도 같은 검증 경로 사용', description: '검증 코드를 복제하지 않아 규칙이 바뀌어도 한 곳만 고치면 됩니다.' },
        { code: 'Time t5{27, 74, 99}', title: '잘못된 객체 생성을 중단', description: '생성 중 예외가 나면 t5는 완성된 객체가 되지 않습니다. 해당 객체의 소멸자도 호출되지 않습니다.' },
      ]} />
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
      <Walkthrough title="객체 수명 추적" steps={[
        { code: 'Trace global{1}', title: 'main보다 먼저 생성', description: '전역 객체는 정적 저장 기간을 가지며 정상적인 프로그램 종료 단계에서 소멸합니다.' },
        { code: 'Trace local{2}', title: '블록 진입마다 생성', description: 'demo 호출 때마다 새 객체가 생기고 닫는 중괄호를 만나는 즉시 소멸합니다.' },
        { code: 'static Trace once{3}', title: '처음 도달할 때 한 번만 생성', description: 'demo를 다시 호출해도 재생성되지 않으며, local보다 오래 살아 프로그램 종료 때 정리됩니다.' },
        { code: '~Trace()', title: '자원 정리 후 저장 공간 회수', description: '소멸자가 객체 메모리를 직접 없애는 것이 아니라, 메모리가 회수되기 전에 파일·메모리 같은 자원을 정리합니다.' },
      ]} />
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
      <Snippet name="bad-reference.cpp" code={badReferenceCode} copied={copied} onCopy={onCopy} />
      <Walkthrough title="캡슐화가 깨지는 실제 경로" steps={[
        { code: 'return hour', title: '복사값이 아니라 원본의 별명 반환', description: '반환형에 &가 있으므로 호출자는 private hour가 저장된 메모리 자체에 닿습니다.' },
        { code: 'leaked = 30', title: '검증 함수 밖에서 원본 변경', description: 'leaked가 t.hour의 별명이므로 대입 즉시 t가 30시라는 잘못된 상태가 됩니다.' },
        { code: 't.badSetHour(12) = 74', title: '함수 호출 결과가 lvalue가 됨', description: '수정 가능한 참조는 대입문의 왼쪽에 올 수 있습니다. 읽기만 필요하면 값 또는 const 참조를 반환해야 합니다.' },
      ]} />
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
      <Walkthrough title="const 호출 가능 여부 판단법" steps={[
        { code: 'const Time noon', title: '객체 자체를 읽기 전용으로 선언', description: '생성 완료 뒤부터 소멸 직전까지 관찰만 허용되고 상태 변경은 컴파일 단계에서 막힙니다.' },
        { code: 'getHour() const', title: '함수도 읽기 전용임을 선언', description: '함수 뒤 const는 숨은 this 포인터가 읽기 전용이라는 뜻입니다. 선언과 바깥 정의 양쪽에 같게 적습니다.' },
        { code: 'noon.setHour(1)', title: 'const 객체 + non-const 함수는 불가', description: '함수가 실제로 값을 안 바꾸더라도 const 표시가 없으면 컴파일러는 변경 가능성이 있다고 판단합니다.' },
      ]} />
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
      <Walkthrough title="Employee 한 객체가 만들어지고 사라지는 순서" steps={[
        { code: 'firstName → birthDate', title: '멤버 객체부터 생성', description: '초기화 리스트에 적힌 순서가 아니라 클래스 본문에 선언된 순서를 따릅니다.' },
        { code: 'birthDate{birth}', title: 'const 멤버를 생성 순간 초기화', description: '생성자 몸체에서 birthDate = birth라고 대입할 수는 없습니다. 몸체 실행 전 초기화 리스트가 필요합니다.' },
        { code: 'Employee 생성자 몸체', title: '모든 멤버가 준비된 뒤 실행', description: '이 시점에는 firstName과 birthDate가 이미 완성되어 안전하게 사용할 수 있습니다.' },
        { code: '~Employee → ~Date → ~string', title: '소멸은 정확히 반대', description: '바깥 객체의 소멸자 몸체가 먼저 실행되고 멤버는 선언 역순으로 자동 소멸합니다.' },
      ]} />
      <div className="lifecycle-flow"><span>Date 멤버 생성</span><ArrowRight /><span>Employee 생성</span><ArrowRight /><span>Employee 소멸</span><ArrowRight /><span>Date 멤버 소멸</span></div>
      <div className="warning-card"><CircleHelp size={19} /><div><b>실제 초기화 순서는 선언 순서입니다</b><p>초기화 리스트에 적은 순서가 아니라 클래스 정의 안에서 데이터 멤버를 선언한 순서로 생성됩니다. 기본 생성자가 없는 멤버 객체는 초기화 리스트로 값을 전달해야 합니다.</p></div></div>
    </section>

    <section className="note-card" id="friend">
      <span className="section-kicker"><ShieldCheck size={16} /> 제한적으로 경계 열기</span>
      <h2>friend는 비멤버에게 private 접근 권한을 부여합니다</h2>
      <Badges items={['슬라이드 71–76', 'Fig. 9.23']} />
      <Snippet name="friend.cpp" code={friendCode} copied={copied} onCopy={onCopy} />
      <Walkthrough title="friend 선언과 호출 연결" steps={[
        { code: 'friend void setX(Count&, int)', title: 'Count가 특정 함수에 권한 부여', description: '클래스 안에 선언되어도 setX는 Count의 멤버가 아닙니다. 호출할 때 Count 객체를 인수로 받아야 합니다.' },
        { code: 'c.x = value', title: 'private 멤버에 직접 접근', description: '권한은 이 정확한 함수에만 적용됩니다. 이름이 같은 다른 오버로드가 자동으로 권한을 받지는 않습니다.' },
        { code: 'setX(count, 7)', title: '일반 함수처럼 호출', description: 'count.setX(7)이 아닙니다. 캡슐화 경계를 넓히므로 꼭 필요한 협력 관계에 제한해 사용합니다.' },
      ]} />
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
      <Walkthrough title="연쇄 호출이 같은 객체를 따라가는 과정" steps={[
        { code: 'this->hour = hour', title: '현재 객체의 멤버 선택', description: 'this는 함수를 부른 객체의 주소입니다. 매개변수 이름이 멤버와 같을 때 둘을 분명하게 구분합니다.' },
        { code: 'return *this', title: '주소를 역참조해 객체 자신 반환', description: '반환형 Time&와 결합되어 원본 객체의 별명이 다음 호출의 왼쪽 값이 됩니다.' },
        { code: '.setMinute(30).setSecond(22)', title: '모든 호출이 같은 t를 수정', description: '각 setter가 다시 t를 참조로 돌려주므로 상태는 18:00:00 → 18:30:00 → 18:30:22로 변합니다.' },
      ]} />
      <Snippet name="값 반환과 참조 반환 비교" code={valueReturnCode} copied={copied} onCopy={onCopy} />
      <div className="warning-card"><CircleHelp size={19} /><div><b>정정: 값 반환이어도 첫 번째 setter는 원본을 바꿉니다</b><p><code>t.setHour(18)</code>의 함수 몸체는 원본 <code>t</code>에서 실행됩니다. 다만 <code>Time</code>을 값으로 반환하면 이후 <code>setMinute</code>부터는 임시 복사본에서 실행됩니다. 원본 전체를 일관되게 연쇄 수정하려면 <code>Time&amp;</code>와 <code>return *this</code>가 필요합니다.</p></div></div>
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
      <Walkthrough title="공유 카운트의 저장과 변화" steps={[
        { code: 'static unsigned int count', title: '헤더에서 클래스 멤버로 선언', description: '각 Employee 안에 넣지 않고 클래스 전체가 공유할 이름을 알립니다.' },
        { code: 'unsigned int Employee::count{0}', title: 'CPP에서 저장 공간을 한 번 정의', description: '여기에는 static을 다시 쓰지 않습니다. 이 정의를 빼먹으면 보통 undefined reference 링커 오류가 납니다.' },
        { code: '++count / --count', title: '생성과 소멸이 하나의 값 갱신', description: '블록 안에 객체 두 개가 살아 있으면 2, 블록을 벗어나 역순으로 소멸하면 다시 0이 됩니다.' },
        { code: 'Employee::getCount()', title: '객체 없이 호출', description: 'static 함수에는 this가 없으므로 특정 객체의 일반 멤버에는 직접 접근할 수 없고 const 함수로 선언할 수도 없습니다.' },
      ]} />
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

function Walkthrough({ title, steps }: { title: string; steps: WalkthroughStep[] }) {
  return <section className="code-walkthrough" aria-label={title}>
    <div className="walkthrough-heading"><Braces size={17} /><div><small>강의 코드 해설</small><h3>{title}</h3></div></div>
    <ol>{steps.map((step, index) => <li key={`${step.code}-${index}`}>
      <span className="walkthrough-number">{String(index + 1).padStart(2, '0')}</span>
      <div><code>{step.code}</code><b>{step.title}</b><p>{step.description}</p></div>
    </li>)}</ol>
  </section>;
}

function W2Quiz({ id, label, question, answer, explanation, open, onToggle }: { id: number; label: string; question: string; answer: string; explanation: string; open: boolean; onToggle: (number: number) => void }) {
  return <article className="quiz-item"><div><span>{label}</span><p>{question}</p></div><button onClick={() => onToggle(id)}>{open ? '해설 닫기' : '정답 확인'}<ChevronRight size={15} /></button>{open && <div className="answer"><b>정답 {answer}</b><p>{explanation}</p></div>}</article>;
}
