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
    description: '클래스부터 포인터와 const까지, 객체지향 2에 필요한 C++ 기초를 하나의 흐름으로 복습합니다.',
    topics: ['클래스·객체', '생성자', '인터페이스', '배열·vector', '포인터·const'],
    status: 'ready',
  },
  {
    number: 2,
    title: '다음 강의',
    description: '다음 강의자료가 추가되면 같은 형식으로 정리합니다.',
    topics: ['자료 추가 예정'],
    status: 'planned',
  },
];

export const sectionIndex = [
  { id: 'class', title: '클래스와 객체', keywords: '사용자 정의 자료형 설계도 인스턴스 도트 연산자' },
  { id: 'encapsulation', title: 'public·private와 정보 은닉', keywords: '데이터 멤버 멤버 함수 set get 지역변수 속성' },
  { id: 'constructor', title: '생성자', keywords: '초기화 기본 생성자 반환형 void' },
  { id: 'files', title: '인터페이스와 구현 분리', keywords: 'header h cpp include scope resolution 범위 지정 연산자' },
  { id: 'functions', title: '제어문과 함수', keywords: 'if switch while for parameter argument return 매개변수 인수' },
  { id: 'containers', title: '배열과 vector', keywords: 'array vector index subscript size push_back range based for 인덱스' },
  { id: 'pointers', title: '포인터와 메모리', keywords: 'address dereference reference pointer ampersand asterisk 주소 역참조' },
  { id: 'const', title: '포인터와 const', keywords: '상수 포인터 데이터 변경 금지' },
  { id: 'check', title: '확인 문제', keywords: '퀴즈 정답 해설 복습' },
];
