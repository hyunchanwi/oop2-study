export type Lesson = {
  number: number;
  title: string;
  description: string;
  topics: string[];
  status: 'ready' | 'planned';
};

export const lessons: Lesson[] = [
  {
    number: 1,
    title: 'C++ 핵심 복습과 클래스 기초',
    description: '강의 슬라이드와 교수님 설명, 질문 채팅을 합쳐 클래스부터 포인터와 const까지 한 흐름으로 복습합니다.',
    topics: ['클래스·객체', '배열 3종', 'range-for', '함수 전달', '포인터·const'],
    status: 'ready',
  },
  {
    number: 2,
    title: '클래스 심화',
    description: 'Time 클래스 사례를 따라 생성자와 소멸자, const 멤버, 합성, friend, this, static 멤버를 연결해 학습합니다.',
    topics: ['Time 클래스', '생성·소멸', 'const 멤버', '합성·friend', 'this·static'],
    status: 'ready',
  },
];

export const sectionIndex = [
  { id: 'class', title: '클래스와 객체', keywords: '사용자 정의 자료형 설계도 인스턴스 도트 연산자' },
  { id: 'encapsulation', title: 'public·private와 정보 은닉', keywords: '데이터 멤버 멤버 함수 set get 지역변수 속성' },
  { id: 'constructor', title: '생성자', keywords: '초기화 기본 생성자 반환형 void' },
  { id: 'files', title: '인터페이스와 구현 분리', keywords: 'header h cpp include scope resolution 범위 지정 연산자' },
  { id: 'functions', title: '제어문과 함수', keywords: 'if switch while for parameter argument return 매개변수 인수' },
  { id: 'containers', title: '배열과 vector', keywords: 'array vector index subscript size push_back range based for 인덱스' },
  { id: 'range-for', title: '범위 기반 for', keywords: 'range based for 값 복사 참조 const reference 원본 수정 slide 24' },
  { id: 'passing', title: '값·참조·포인터 전달', keywords: 'pass by value reference pointer string name const string ampersand 복사 원본 매개변수' },
  { id: 'pointers', title: '포인터와 메모리', keywords: 'address dereference reference pointer ampersand asterisk 주소 역참조' },
  { id: 'const', title: '포인터와 const', keywords: '상수 포인터 데이터 변경 금지' },
  { id: 'check', title: '확인 문제', keywords: '퀴즈 정답 해설 복습' },
];

export const weekTwoSectionIndex = [
  { id: 'time-case', title: 'Time 클래스 사례', keywords: 'time class interface implementation include guard setTime validation 예외' },
  { id: 'class-scope', title: '클래스 범위와 멤버 접근', keywords: 'scope object reference pointer dot arrow handle access utility predicate helper' },
  { id: 'default-arguments', title: '생성자 기본 인수', keywords: 'constructor default argument explicit 재컴파일 기본값' },
  { id: 'destructor', title: '소멸자와 호출 순서', keywords: 'destructor tilde scope global local static reverse order 수명' },
  { id: 'encapsulation-trap', title: '캡슐화 함정과 대입', keywords: 'private reference pointer lvalue memberwise copy assignment 얕은 복사' },
  { id: 'const-members', title: 'const 객체와 멤버 함수', keywords: 'const object member function getter constructor destructor compile error' },
  { id: 'composition', title: '합성과 초기화 리스트', keywords: 'composition has-a member initializer list declaration order Date Employee' },
  { id: 'friend', title: 'friend 함수와 클래스', keywords: 'friend function class nonmember private symmetric transitive grant' },
  { id: 'this-pointer', title: 'this 포인터와 연쇄 호출', keywords: 'this pointer implicit argument naming collision cascaded call return reference' },
  { id: 'static-members', title: 'static 클래스 멤버', keywords: 'static data member function shared class-wide count scope resolution' },
  { id: 'week2-check', title: '2주차 확인 문제', keywords: 'quiz 정답 해설 복습 chapter 9' },
];
