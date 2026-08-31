'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Braces,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clipboard,
  Code2,
  Cpu,
  FileCode2,
  GraduationCap,
  Lightbulb,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import { lessons, sectionIndex } from '../content/lessons';

const gradeBookCode = `class GradeBook {
public:
    GradeBook(string name);
    void setCourseName(string name);
    string getCourseName();
    void displayMessage();

private:
    string courseName;
};`;

const pointerCode = `int y{5};
int* yPtr{&y};   // y의 주소를 저장

*yPtr = 9;      // y가 저장된 곳에 9를 대입
cout << y;      // 9`;

const rangeForCode = `for (int item : scores)        // 복사해서 읽기
    cout << item;

for (int& item : scores)       // 원본 수정
    item *= 2;

for (const int& item : scores) // 복사 없이 읽기
    cout << item;`;

const passingCode = `void copyName(string name);             // 값 복사
void rename(string& name);                // 원본 수정
void printName(const string& name);        // 복사 없이 읽기
void renameWithPointer(string* name);      // 주소로 원본 수정`;

export default function Home() {
  const [query, setQuery] = useState('');
  const [completed, setCompleted] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem('oop2-completed');
    return saved ? JSON.parse(saved) : [];
  });
  const [drawerMode, setDrawerMode] = useState<'closed' | 'menu' | 'search'>('closed');
  const [isMobile, setIsMobile] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [copied, setCopied] = useState('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const matches = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return sectionIndex;
    return sectionIndex.filter((section) => `${section.title} ${section.keywords}`.toLowerCase().includes(keyword));
  }, [query]);

  const progress = Math.round((completed.length / lessons.length) * 100);
  const menuOpen = drawerMode !== 'closed';
  const menuModalOpen = isMobile && drawerMode === 'menu';
  const closeMenu = useCallback((restoreFocus = true) => {
    if (restoreFocus && isMobile && drawerMode === 'menu') menuButtonRef.current?.focus({ preventScroll: true });
    setDrawerMode('closed');
  }, [drawerMode, isMobile]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const update = () => {
      setIsMobile(media.matches);
      if (!media.matches) setDrawerMode('closed');
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!sidebarRef.current || (isMobile && !menuOpen)) return;
    const activeItem = sidebarRef.current.querySelector<HTMLElement>('[aria-current="page"]');
    if (!activeItem) return;
    const sidebarBounds = sidebarRef.current.getBoundingClientRect();
    const itemBounds = activeItem.getBoundingClientRect();
    if (itemBounds.top < sidebarBounds.top || itemBounds.bottom > sidebarBounds.bottom) {
      activeItem.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'nearest',
      });
    }
  }, [isMobile, menuOpen]);

  useEffect(() => {
    if (!menuModalOpen || !sidebarRef.current) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== 'Tab' || !sidebarRef.current) return;
      const focusable = [...sidebarRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!sidebarRef.current.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus({ preventScroll: true }));
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeMenu, menuModalOpen]);

  function toggleComplete() {
    const next = completed.includes(1) ? completed.filter((item) => item !== 1) : [...completed, 1];
    setCompleted(next);
    window.localStorage.setItem('oop2-completed', JSON.stringify(next));
  }

  function goToSection(id: string) {
    closeMenu();
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleSearchChange(value: string) {
    setQuery(value);
    if (value.trim()) setDrawerMode('search');
    else if (drawerMode === 'search') setDrawerMode('closed');
  }

  function toggleAnswer(number: number) {
    setAnswers((current) => current.includes(number) ? current.filter((item) => item !== number) : [...current, number]);
  }

  async function copyCode(name: string, code: string) {
    await navigator.clipboard.writeText(code);
    setCopied(name);
    window.setTimeout(() => setCopied(''), 1400);
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark"><Braces size={20} /></span>
          <span><b>Object Note</b><small>객체지향프로그래밍 2 학습실</small></span>
        </a>
        <label className="search-box">
          <Search size={17} />
          <input
            ref={searchInputRef}
            value={query}
            onChange={(event) => handleSearchChange(event.target.value)}
            onFocus={() => query.trim() && setDrawerMode('search')}
            placeholder="개념이나 코드 검색"
            aria-label="개념이나 코드 검색"
            aria-controls="lesson-sidebar"
          />
          {query && <button onClick={() => { setQuery(''); setDrawerMode('closed'); window.requestAnimationFrame(() => searchInputRef.current?.focus()); }} aria-label="검색어 지우기"><X size={16} /></button>}
        </label>
        <button
          ref={menuButtonRef}
          className="mobile-menu"
          onClick={() => drawerMode === 'menu' ? closeMenu() : setDrawerMode('menu')}
          aria-label={drawerMode === 'menu' ? '목차 닫기' : '목차 열기'}
          aria-expanded={drawerMode === 'menu'}
          aria-controls="lesson-sidebar"
        >
          {drawerMode === 'menu' ? <X size={21} /> : <Menu size={21} />}
        </button>
        <div className="header-progress" aria-label={`전체 진도 ${progress}%`}><span>{progress}%</span><div><i style={{ width: `${progress}%` }} /></div></div>
      </header>

      <div className="workspace" id="top">
        {menuModalOpen && <button className="sidebar-backdrop" type="button" aria-label="목차 닫기" onClick={() => closeMenu()} />}
        <aside
          ref={sidebarRef}
          className={`sidebar ${menuOpen ? 'open' : ''} ${menuModalOpen ? 'menu-modal' : ''}`}
          id="lesson-sidebar"
          aria-label="강의 탐색"
          role={menuModalOpen ? 'dialog' : undefined}
          aria-modal={menuModalOpen ? true : undefined}
          aria-hidden={isMobile && !menuOpen ? true : undefined}
          inert={isMobile && !menuOpen ? true : undefined}
        >
          <a className="hub-back" href="https://hyunchanwi.github.io/study-hub/"><ArrowLeft size={15} /> 전체 과목</a>
          <div className="sidebar-heading"><span>강의 노트</span><small>{completed.length} / {lessons.length} 완료</small><button ref={closeButtonRef} className="sidebar-close" type="button" onClick={() => closeMenu()} aria-label="목차 닫기"><X size={20} /></button></div>
          <nav aria-label="강의 목차">
            {lessons.map((lesson) => (
              <button
                key={lesson.number}
                className={lesson.number === 1 ? 'active' : ''}
                onClick={() => goToSection('class')}
                disabled={lesson.number !== 1}
                aria-current={lesson.number === 1 ? 'page' : undefined}
              >
                <span className={`lesson-number ${completed.includes(lesson.number) ? 'done' : ''}`}>{completed.includes(lesson.number) ? <Check size={13} /> : lesson.number}</span>
                <span><b>{lesson.title}</b><small>{lesson.topics[0]}</small></span>
                <ChevronRight size={15} />
              </button>
            ))}
          </nav>
          <div className="section-search">
            <span>{query ? `검색 결과 ${matches.length}개` : '1주차 개념'}</span>
            {matches.map((section) => <button key={section.id} onClick={() => goToSection(section.id)}>{section.title}<ArrowRight size={12} /></button>)}
            {matches.length === 0 && <p>일치하는 개념이 없어요.</p>}
          </div>
          <div className="sidebar-note"><Code2 size={18} /><b>채팅에서 배운 내용</b><p>예제와 오답을 주차별 노트에 계속 축적합니다.</p></div>
        </aside>

        <main className="content" id="lesson">
          <section className="lesson-hero">
            <div>
              <div className="eyebrow">WEEK 01 · 학습 가능</div>
              <h1>C++ 핵심 복습과<br />클래스 기초</h1>
              <p>{lessons[0].description}</p>
              <div className="topic-tags">{lessons[0].topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
            </div>
            <button className={`complete-button ${completed.includes(1) ? 'completed' : ''}`} onClick={toggleComplete}>
              {completed.includes(1) ? <><Check size={18} /> 학습 완료</> : <><Target size={18} /> 완료로 표시</>}
            </button>
          </section>

          <div className="lesson-stack">
            <section className="note-card intro-card" id="class">
              <span className="section-kicker"><Sparkles size={16} /> 먼저 쉽게</span>
              <h2>클래스는 ‘새로운 자료형의 설계도’예요</h2>
              <SourceBadges items={['강의 슬라이드', '교수 설명']} />
              <p className="lead">정수는 <code>int</code>, 문자열은 <code>string</code>으로 다루듯이, 프로그래머가 필요한 데이터와 기능을 묶어 자신만의 자료형을 만들 수 있어요.</p>
              <div className="definition"><span>시험용 정의</span><p>클래스는 데이터 멤버와 멤버 함수를 하나의 사용자 정의 자료형으로 캡슐화한 것이다.</p></div>
              <div className="analogy-grid">
                <article><span>설계도</span><b>class GradeBook</b><p>어떤 정보와 기능을 가질지 정의</p></article>
                <ArrowRight />
                <article><span>실제 개체</span><b>GradeBook cpp;</b><p>설계도로 만든 독립적인 변수</p></article>
              </div>
              <DetailNote title="교수님이 짚은 문법과 객체의 실체" label="교수 강조">
                <ul><li>식별자는 문자·숫자·밑줄로 만들지만 숫자로 시작할 수 없습니다. 밑줄 시작은 가능해도 피하는 편이 안전합니다.</li><li>클래스 이름은 보통 대문자로 시작하고, 클래스 정의의 닫는 중괄호 뒤에는 반드시 세미콜론을 붙입니다.</li><li>객체마다 데이터 멤버는 따로 가지지만 멤버 함수 코드는 공유합니다. 멤버에는 점 연산자 <code>object.member</code>로 접근합니다.</li></ul>
              </DetailNote>
            </section>

            <CodeCard name="GradeBook.h" code={gradeBookCode} copied={copied} onCopy={copyCode} />

            <section className="note-card" id="encapsulation">
              <span className="section-kicker"><ShieldCheck size={16} /> 정보 은닉</span>
              <h2>public은 공개 서비스, private은 보호할 상태</h2>
              <p className="subcopy">객체 밖에서는 <code>setCourseName()</code>과 같은 public 함수를 통해서만 데이터를 바꾸게 합니다. 잘못된 값을 검사하고 객체의 상태를 보호할 수 있어요.</p>
              <div className="comparison-grid">
                <article><span>public</span><h3>외부에 보여주는 조작판</h3><p>객체에 요청할 수 있는 멤버 함수를 둡니다.</p><code>book.displayMessage();</code></article>
                <article><span>private</span><h3>객체 안의 보호 공간</h3><p>해당 클래스의 멤버 함수만 접근할 수 있습니다.</p><code>string courseName;</code></article>
              </div>
              <div className="fact-row"><div><b>지역변수</b><span>함수가 끝나면 소멸</span></div><div><b>데이터 멤버</b><span>객체가 살아 있는 동안 유지</span></div><div><b>각 객체</b><span>자신만의 데이터 사본을 가짐</span></div></div>
              <DetailNote title="접근 지정자는 데이터를 읽고 쓰는 권한까지 정합니다" label="교수 강조">
                <p><code>public</code>과 <code>private</code>은 모두 접근 지정자입니다. 데이터 멤버 접근은 읽기·쓰기를, 함수 접근은 호출을 뜻합니다. <code>class</code>는 아무것도 쓰지 않으면 기본이 <code>private</code>이며, 세 번째 지정자 <code>protected</code>는 상속에서 다시 배웁니다.</p>
              </DetailNote>
            </section>

            <section className="note-card split-card" id="constructor">
              <div>
                <span className="section-kicker"><Cpu size={16} /> 객체의 첫 순간</span>
                <h2>생성자는 객체가 만들어질 때 자동 실행됩니다</h2>
                <ul className="concept-list"><li>클래스와 이름이 같습니다.</li><li>반환형을 적지 않으며 <code>void</code>도 금지입니다.</li><li>매개변수가 없는 것을 기본 생성자라고 합니다.</li></ul>
              </div>
              <div className="constructor-flow"><code>{'GradeBook book{"OOP"};'}</code><ArrowRight /><div><small>자동 호출</small><b>{'GradeBook("OOP")'}</b><span>courseName 초기화</span></div></div>
              <DetailNote title="기본 생성자와 오버로딩을 함께 기억하세요" label="교수 강조" wide>
                <p>생성자를 생략하면 컴파일러가 기본 생성자를 만들 수 있지만, 원하는 초기화까지 대신해 주지는 않습니다. 매개변수 목록이 다르면 생성자를 여러 개 오버로딩할 수 있습니다.</p>
              </DetailNote>
            </section>

            <section className="note-card" id="files">
              <span className="section-kicker"><FileCode2 size={16} /> 재사용 가능한 구조</span>
              <h2>인터페이스와 구현을 분리하면 사용하는 코드가 안정적이에요</h2>
              <div className="file-flow">
                <article><span>GradeBook.h</span><b>무엇을 할 수 있나?</b><p>public 함수 원형과 클래스 정의</p></article>
                <ArrowRight />
                <article><span>GradeBook.cpp</span><b>어떻게 실행하나?</b><p><code>GradeBook::</code>로 함수를 클래스에 연결</p></article>
                <ArrowRight />
                <article><span>main.cpp</span><b>클래스를 사용</b><p><code>{'#include "GradeBook.h"'}</code></p></article>
              </div>
              <div className="insight"><Lightbulb size={18} /><p><b>핵심:</b> 구현이 바뀌어도 public 인터페이스가 같으면 클라이언트 코드는 바꾸지 않아도 됩니다.</p></div>
              <DetailNote title="#include 검색 순서와 ::의 역할" label="교수 강조">
                <p><code>{'#include "GradeBook.h"'}</code>는 보통 현재 프로젝트 경로부터 찾고, <code>{'#include <iostream>'}</code>은 시스템 헤더 경로에서 찾습니다. 클래스 밖에서 멤버 함수를 정의할 때 <code>GradeBook::displayMessage</code>처럼 범위 지정 연산자로 소속을 밝힙니다.</p>
              </DetailNote>
            </section>

            <section className="note-card" id="functions">
              <span className="section-kicker"><Braces size={16} /> 실행 흐름</span>
              <h2>제어문은 흐름을 정하고, 함수는 작업을 나눕니다</h2>
              <div className="three-grid">
                <article><b>순차</b><span>위에서 아래로</span><code>a = 1; b = 2;</code></article>
                <article><b>선택</b><span>조건에 따라 분기</span><code>if · else · switch</code></article>
                <article><b>반복</b><span>조건 동안 반복</span><code>while · do · for</code></article>
              </div>
              <div className="parameter-note"><code>int add(int a, int b)</code><ArrowRight /><p>호출할 때 인수의 <b>개수·순서·자료형</b>이 매개변수와 맞아야 합니다. <code>void</code>는 값을 반환하지 않는다는 뜻입니다.</p></div>
              <DetailNote title="인수와 매개변수는 같은 말이 아닙니다" label="시험 표현">
                <p><b>인수(argument)</b>는 호출하는 쪽이 전달하는 값이고, <b>매개변수(parameter)</b>는 함수 정의가 그 값을 받는 변수입니다. 함수 원형에서는 자료형만 있으면 되므로 매개변수 이름을 생략할 수 있습니다.</p>
              </DetailNote>
            </section>

            <section className="note-card" id="containers">
              <span className="section-kicker"><BookOpen size={16} /> 여러 값을 한 번에</span>
              <h2>세 배열 계열은 크기와 문법이 달라요</h2>
              <SourceBadges items={['CH.7', '질문에서 확장']} />
              <div className="comparison-table">
                <div className="table-row table-head four-cols"><span>구분</span><b>내장 배열</b><b>std::array</b><b>vector</b></div>
                <div className="table-row four-cols"><span>크기</span><p>컴파일 때 고정</p><p>컴파일 때 고정</p><p>실행 중 변경 가능</p></div>
                <div className="table-row four-cols"><span>선언</span><p><code>int a[5];</code></p><p><code>array&lt;int,5&gt; a;</code></p><p><code>vector&lt;int&gt; v(5);</code></p></div>
                <div className="table-row four-cols"><span>특징</span><p>저수준 호환에 필요</p><p>고정 크기 클래스 템플릿</p><p>동적 크기 클래스 템플릿</p></div>
              </div>
              <div className="warning-card"><CircleHelp size={19} /><div><b>괄호와 중괄호를 구분하세요</b><p><code>vector&lt;int&gt; a(7)</code>은 7개의 원소, <code>vector&lt;int&gt; b{"{7}"}</code>은 값 7을 가진 원소 1개입니다.</p></div></div>
              <DetailNote title="템플릿·2차원 배열·초기화 목록" label="교수 강조">
                <ul><li><code>&lt;int, 5&gt;</code>에서 <code>int</code>는 원소 자료형, <code>5</code>는 고정 크기입니다.</li><li><code>array&lt;array&lt;int, 3&gt;, 2&gt;</code>는 2행 3열 구조입니다.</li><li>초기값이 부족하면 나머지는 0으로 채워지지만, 지정한 크기보다 많으면 컴파일 오류가 납니다.</li><li>모든 배열 계열은 같은 자료형의 원소를 연속된 위치에 저장하고 인덱스는 0부터 시작합니다.</li></ul>
              </DetailNote>
            </section>

            <section className="note-card" id="range-for">
              <span className="section-kicker"><Braces size={16} /> 범위 기반 for</span>
              <h2>읽기인지 수정인지에 따라 선언을 고릅니다</h2>
              <SourceBadges items={['SLIDE 24', '강의 50:40', '질문에서 확장']} />
              <CodeCard name="range-for.cpp" code={rangeForCode} copied={copied} onCopy={copyCode} compact />
              <div className="three-grid range-choices">
                <article><b><code>int item</code></b><span>복사본을 읽음</span><p>원본은 바뀌지 않음</p></article>
                <article><b><code>int&amp; item</code></b><span>원본을 직접 사용</span><p>원소 수정 가능</p></article>
                <article><b><code>const int&amp; item</code></b><span>복사 없이 읽음</span><p>원소 수정 금지</p></article>
              </div>
              <div className="insight"><Lightbulb size={18} /><p><b>선택 기준:</b> 작은 기본형을 읽기만 하면 값 복사도 충분합니다. 큰 객체를 읽기만 할 때는 <code>const &amp;</code>, 원본을 바꿀 때는 <code>&amp;</code>를 사용합니다.</p></div>
            </section>

            <section className="note-card" id="passing">
              <span className="section-kicker"><ArrowRight size={16} /> 함수에 값 전달하기</span>
              <h2>복사할지, 원본을 빌릴지 먼저 결정하세요</h2>
              <SourceBadges items={['강의 녹음', '질문에서 확장']} />
              <CodeCard name="passing.cpp" code={passingCode} copied={copied} onCopy={copyCode} compact />
              <div className="passing-grid">
                <article><code>string name</code><b>값 전달</b><p>복사본. 함수가 바꿔도 원본 유지</p></article>
                <article><code>string&amp; name</code><b>참조 전달</b><p>원본 별명. 함수가 원본 수정</p></article>
                <article><code>const string&amp; name</code><b>읽기 전용 참조</b><p>복사 비용 없이 읽고 수정은 금지</p></article>
                <article><code>string* name</code><b>포인터 전달</b><p>주소를 받고 <code>*name</code>으로 원본 접근</p></article>
              </div>
              <div className="warning-card"><CircleHelp size={19} /><div><b><code>string name</code>과 <code>const string&amp; name</code>의 차이</b><p>둘 다 호출자의 문자열을 읽을 수 있지만, 전자는 복사본이고 후자는 원본을 읽기 전용으로 빌립니다. <code>const</code>는 “문자열이 원래부터 상수”라는 뜻이 아니라 이 함수가 그 경로로 수정하지 않겠다는 약속입니다.</p></div></div>
            </section>

            <section className="note-card pointer-card" id="pointers">
              <span className="section-kicker"><Cpu size={16} /> 메모리를 가리키기</span>
              <h2>포인터는 값이 아니라 ‘값이 있는 주소’를 저장합니다</h2>
              <figure className="memory-flow" aria-label="yPtr이 y의 메모리 주소를 가리키는 그림">
                <div><small>포인터</small><b>yPtr</b><span>0x7ffe...</span></div><ArrowRight /><div className="memory-value"><small>실제 변수</small><b>y</b><span>9</span></div>
              </figure>
              <CodeCard name="pointer.cpp" code={pointerCode} copied={copied} onCopy={copyCode} compact />
              <div className="operator-grid"><article><b>&amp;y</b><span>y의 메모리 주소를 구함</span></article><article><b>*yPtr</b><span>그 주소에 저장된 값에 접근</span></article></div>
              <div className="symbol-table">
                <div><code>int&amp; ref = y;</code><p>선언의 <code>&amp;</code>: 참조 변수</p></div>
                <div><code>int* ptr = &amp;y;</code><p>선언의 <code>*</code>: 포인터 변수, 식의 <code>&amp;</code>: 주소 얻기</p></div>
                <div><code>*ptr = 9;</code><p>식의 <code>*</code>: 주소를 따라가 값에 접근</p></div>
              </div>
              <div className="insight"><Lightbulb size={18} /><p><b>정확한 표현:</b> 배열 이름 자체가 포인터인 것은 아니지만, 대부분의 식에서 첫 원소를 가리키는 포인터로 변환됩니다.</p></div>
            </section>

            <section className="note-card" id="const">
              <span className="section-kicker"><ShieldCheck size={16} /> 변경 권한 읽기</span>
              <h2>const가 무엇 옆에 붙었는지 보면 됩니다</h2>
              <div className="const-grid">
                <article><code>int* ptr</code><b>둘 다 변경 가능</b><p>주소도, 가리키는 값도 바꿀 수 있음</p></article>
                <article><code>const int* ptr</code><b>값이 const</b><p>다른 주소를 가리킬 수는 있음</p></article>
                <article><code>int* const ptr</code><b>포인터가 const</b><p>같은 주소만 가리키지만 값은 변경 가능</p></article>
                <article><code>const int* const ptr</code><b>둘 다 const</b><p>주소와 값 모두 변경 금지</p></article>
              </div>
            </section>

            <section className="quiz-card" id="check">
              <div className="quiz-heading"><span className="section-kicker"><GraduationCap size={16} /> 1분 확인 문제</span><h2>개념을 코드로 확인해보세요</h2></div>
              <Quiz number={1} question="생성자의 반환형은 void로 선언한다." answer="X" explanation="생성자는 값을 반환하지 않으며, void를 포함한 아무 반환형도 적지 않습니다." open={answers.includes(1)} onToggle={toggleAnswer} />
              <Quiz number={2} question="vector<int> numbers{7};는 int 원소 7개를 만든다." answer="X" explanation="중괄호는 초기화 목록으로 해석되어 값 7을 가진 원소 1개를 만듭니다. 7개를 만들려면 numbers(7)을 사용합니다." open={answers.includes(2)} onToggle={toggleAnswer} />
              <Quiz number={3} question="for (int item : scores)에서 item을 바꾸면 scores의 원소도 바뀐다." answer="X" explanation="item은 각 원소의 복사본입니다. 원본을 바꾸려면 int& item처럼 참조로 받아야 합니다." open={answers.includes(3)} onToggle={toggleAnswer} />
              <Quiz number={4} question="const string& name은 문자열 전체를 복사하지 않고 읽기 전용으로 참조한다." answer="O" explanation="큰 객체를 읽기만 할 때 복사 비용을 피하면서 함수 내부 수정을 막는 대표적인 선언입니다." open={answers.includes(4)} onToggle={toggleAnswer} />
            </section>

            <section className="memory-strip">
              <div><span>01</span><p><b>클래스</b>는 설계도, 객체는 설계도로 만든 실체다.</p></div>
              <div><span>02</span><p><b>private</b>은 데이터를 보호하고 public 함수가 접근을 통제한다.</p></div>
              <div><span>03</span><p><b>전달 방식</b>은 복사·원본 수정·읽기 전용이라는 의도를 코드에 드러낸다.</p></div>
            </section>
          </div>
        </main>

        <aside className="right-rail">
          <div className="rail-block"><span className="rail-label">이 페이지에서</span>{sectionIndex.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</div>
          <div className="memory-card"><Lightbulb size={18} /><b>오늘의 기억 문장</b><p>클래스는 설계도, 객체는 설계도로 만든 실체다.</p></div>
        </aside>
      </div>
    </div>
  );
}

function CodeCard({ name, code, copied, onCopy, compact = false }: { name: string; code: string; copied: string; onCopy: (name: string, code: string) => void; compact?: boolean }) {
  return <section className={`code-card ${compact ? 'compact' : ''}`}>
    <div className="code-copy"><span><i /> {name}</span><button onClick={() => onCopy(name, code)} aria-label={`${name} 코드 복사`}>{copied === name ? <Check size={14} /> : <Clipboard size={14} />}{copied === name ? '복사됨' : '코드 복사'}</button></div>
    <pre><code>{code}</code></pre>
    {!compact && <div className="code-explain"><span><b>public</b>은 객체 밖에서 사용할 서비스</span><span><b>private</b>은 객체가 스스로 보호하는 상태</span></div>}
  </section>;
}

function Quiz({ number, question, answer, explanation, open, onToggle }: { number: number; question: string; answer: string; explanation: string; open: boolean; onToggle: (number: number) => void }) {
  return <article className="quiz-item"><div><span>Q{number}</span><p>{question}</p></div><button onClick={() => onToggle(number)}>{open ? '해설 닫기' : '정답 확인'}<ChevronRight size={15} /></button>{open && <div className="answer"><b>정답 {answer}</b><p>{explanation}</p></div>}</article>;
}

function SourceBadges({ items }: { items: string[] }) {
  return <div className="source-badges" aria-label="학습 내용 출처">{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function DetailNote({ title, label, children, wide = false }: { title: string; label: string; children: ReactNode; wide?: boolean }) {
  return <details className={`detail-note ${wide ? 'wide' : ''}`}>
    <summary><span><small>{label}</small>{title}</span><ChevronDown size={17} /></summary>
    <div className="detail-body">{children}</div>
  </details>;
}
