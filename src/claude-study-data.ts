export const courseName = "객체지향프로그래밍 2";

export const studyNotes = [
  {
    "id": "study-1",
    "questionsAsked": ["Performance Tip 9.2와 뒤 도식은 왜 설명하지 않았어?","create 함수를 만들었는데 어디서 호출해?","unsigned int Time::getHour()에서 Time::의 위치는 왜 거기야?"],
    "scopes": ["week2"],
    "title": "인터페이스·구현·빌드 단계를 연결하기",
    "chapter": "Chapter 9",
    "source": "Chap9 자세하게",
    "location": "chap09_10e.pdf · §9.2~9.3, 페이지 미확인",
    "explanation": [
      "헤더는 클래스 선언과 사용할 수 있는 인터페이스를 보여주고, 구현 파일은 멤버 함수의 동작을 정의한다. Time::getHour에서 Time::은 소속 클래스를 지정한다.",
      "전처리는 포함·매크로를 처리하고, 컴파일은 각 번역 단위를 목적 코드로 만든다. 링크는 함수·변수 정의를 연결하여 실행 파일을 만든다.",
      "include guard의 PERSON_H는 파일명이 아니라 매크로 이름이다. 같은 번역 단위에서 헤더 선언을 반복 포함하지 않도록 고유한 이름으로 관리한다.",
      "try/catch는 예외 전달과 처리를 위한 구조다. 문법 오류·링크 오류·실행 중 예외·잘못된 출력은 각각 다른 문제로 진단한다."
    ],
    "question": "Q. 헤더에는 함수가 보이는데 undefined reference가 나는 이유는?",
    "answer": "A. 선언이 있어 컴파일은 통과했지만 정의가 없거나 구현 파일이 링크에 포함되지 않았을 가능성을 먼저 확인한다."
  },
  {
    "id": "study-2",
    "questionsAsked": ["const인데 hour를 어떻게 출력해? hour는 바뀔 수 있잖아.","output은 뭐야?"],
    "scopes": ["week2"],
    "title": "const는 읽기를 막는 키워드가 아니다",
    "chapter": "Chapter 9",
    "source": "const 키워드의 두 가지 용법",
    "location": "chap09_10e.pdf · const 멤버 함수, 페이지 미확인",
    "explanation": [
      "const 객체는 일반적인 비-const 멤버 함수 호출이 제한된다. 함수 뒤의 const는 그 호출이 해당 객체의 상태를 일반적으로 바꾸지 않겠다는 약속이다.",
      "getHour() const는 hour를 읽어 반환할 수 있다. 읽기와 변경은 다르며, 다른 시점의 비-const 호출로 값이 바뀔 수 있다는 사실과 모순되지 않는다.",
      "포인터의 const 위치도 나누어 읽는다. const T*는 가리키는 대상을 그 포인터로 바꾸지 못한다는 뜻이고, T* const는 포인터가 저장하는 주소를 바꾸지 못한다는 뜻이다.",
      "const 멤버 함수는 mutable 멤버 등의 예외가 있으므로 ‘어떤 메모리도 절대로 바꾸지 못한다’로 과장하지 않는다. 우선 객체의 관찰과 변경을 구분한다."
    ],
    "question": "Q. hour가 나중에 달라질 수 있는데 getHour() const로 읽어도 되는가?",
    "answer": "A. 된다. 이 함수 호출 자체가 객체 상태를 바꾸지 않는다는 뜻이지, 객체의 평생 값이 고정된다는 뜻은 아니다."
  },
  {
    "id": "study-3",
    "questionsAsked": ["객체 생성·소멸 코드가 왜 그런 순서로 짜여 있어?"],
    "scopes": ["week2"],
    "title": "객체 수명: 함수가 끝나는 것과 프로그램 종료",
    "chapter": "Chapter 9",
    "source": "Chap9 자세하게",
    "location": "chap09_10e.pdf · §9.7~9.8 / CreateAndDestroy",
    "explanation": [
      "일반 지역 객체는 자신의 블록 실행이 끝날 때 소멸한다. 객체가 어디에 선언되어 있고 저장 기간이 무엇인지부터 표시한다.",
      "지역 static 객체는 선언에 처음 도달하여 초기화된 뒤 보통 프로그램 종료까지 살아 있다. 함수가 다시 호출되어도 이미 초기화된 객체를 다시 생성하지 않는다.",
      "전역 객체의 초기화·종료 순서에는 번역 단위별 제약이 있다. 교재의 단일 예제를 다른 파일 사이의 임의 순서까지 일반화하지 않는다.",
      "일반적인 블록 내 객체는 생성의 역순으로 소멸한다. 출력 문제는 번호를 보고 추측하지 말고 선언 도달 → 호출 진입 → 블록 탈출의 실행 흐름을 추적한다."
    ],
    "question": "Q. 함수 안의 일반 객체와 static 객체 중 함수 반환 직후 소멸하는 것은?",
    "answer": "A. 일반 지역 객체다. static 지역 객체는 함수의 블록을 벗어나도 보통 프로그램 종료까지 유지된다."
  },
  {
    "id": "study-4",
    "questionsAsked": ["c.x는 어떻게 작동해? 왜 x=value가 아니야?","연쇄 호출에서 return 전에 정보는 어디 저장돼?"],
    "scopes": ["week2"],
    "title": "private·friend·this의 혼동 풀기",
    "chapter": "Chapter 9",
    "source": "chap9 질문",
    "location": "chap09_10e.pdf · §9.9~9.14 / Fig.9.23",
    "explanation": [
      "private는 클래스 외부의 직접 접근을 제한한다. 같은 클래스의 멤버 함수는 같은 클래스 타입의 다른 객체의 private 멤버에도 접근할 수 있다.",
      "friend void setX(Count&, int)는 특정 외부 함수에 접근 권한을 준다. 그 함수의 c.x에서 c는 참조로 전달된 실제 객체를 가리키는 별명이다.",
      "this는 호출 대상 객체의 주소다. this->value와 (*this).value는 같은 멤버를 지정하고, *this는 그 객체 자체를 나타낸다.",
      "return *this를 참조 반환으로 설계하면 같은 객체를 연쇄 호출할 수 있다. 값 반환과 참조 반환을 구별하고, private 멤버의 수정 가능한 참조를 외부에 내주면 불변식이 깨질 수 있음을 확인한다."
    ],
    "question": "Q. 왜 friend 함수에서 x=val 대신 c.x=val인가?",
    "answer": "A. friend는 멤버 함수가 아니므로 암묵적인 this가 없다. 어느 Count 객체의 x를 바꿀지 c로 지정해야 한다."
  },
  {
    "id": "study-5",
    "questionsAsked": ["reduce가 private인데 내부에서 호출해도 돼?","add는 왜 r 하나만 받아? 분수 두 개가 필요하잖아.","while이 끝나면 변수 값이 없어지는 것 아니야?"],
    "scopes": ["lab2"],
    "title": "유리수 클래스: 약분과 메서드의 입력",
    "chapter": "Lab 2",
    "source": "Lab 2 유리수 클래스 설계",
    "location": "OOP2_Lab2.pptx · Rational 과제, 슬라이드 번호 미확인",
    "explanation": [
      "유리수의 상태를 분자·분모로 잡고, 분모 0 금지·분모 부호 정규화·최대공약수 약분 같은 불변식을 먼저 정한다.",
      "왼쪽.add(오른쪽)에서는 왼쪽 객체가 이미 this에 해당하므로 다른 유리수 하나만 매개변수로 받는다. 사용자에게 두 분수를 입력받는 일과 메서드 매개변수의 개수는 별개다.",
      "a/b+c/d=(ad+bc)/(bd), 곱셈은 ac/(bd)이다. 나눗셈에서는 오른쪽 유리수의 분자가 0인지 확인한다. 정수 오버플로 가능성은 별도 점검한다.",
      "유클리드 호제법으로 gcd를 구한 뒤 분자·분모를 나눈다. toDouble은 적어도 한 피연산자를 실수로 변환하여 정수 나눗셈을 피한다. 과제 전체 정답 대신 이 조건을 스스로 구현하고 테스트한다."
    ],
    "question": "Q. 1/3 + (−1/10)의 정확한 분수 결과는?",
    "answer": "A. (10−3)/30=7/30. 실수 근삿값은 약 0.2333이며 분수 결과와 반올림 표시를 구분한다."
  },
  {
    "id": "study-6",
    "questionsAsked": ["to_string은 뭐고 다른 방법은 없어?","예제 4의 세 파일에 using namespace std를 써도 돼?","PERSON_H와 Person.h는 이름이 다른데 어떻게 동작해?","while(true)를 왜 썼어?"],
    "scopes": ["lab2"],
    "title": "출력 오류도 요구사항 위반이다",
    "chapter": "Lab 2·보충",
    "source": "Lab 2 유리수 클래스 설계 / 스트림이란 무엇인가",
    "location": "OOP2_Lab2.pptx · 출력 형식, 슬라이드 번호 미확인",
    "explanation": [
      "컴파일되고 실행되어도 요구된 결과 형식과 다르면 논리·형식 오류다. 기대 출력과 실제 출력을 문자 단위로 비교한다.",
      "대화의 요구 형식은 ‘1/3 + -1/10 = 7/30 = 0.23’이었다. 분수 결과와 실수 결과 사이에도 구분자가 필요하다.",
      "setw는 보통 다음 출력 필드에 적용된 뒤 너비가 초기화된다. setfill, fixed 등의 상태는 스트림에 유지될 수 있어 매 출력마다 같은 방식으로 작동한다고 가정하지 않는다.",
      "스트림은 프로그램으로 들어오고 나가는 데이터의 경로다. cin과 cout을 연결해 이해하되, 실패 상태·버퍼·파일 스트림은 후속 학습으로 구분한다."
    ],
    "question": "Q. 출력이 7/300.23으로 붙는다면 계산이 틀린 것인가?",
    "answer": "A. 계산이 아니라 분수 문자열과 실수 사이 구분자 누락일 수 있다. 기대하는 ‘ = ’를 넣고 정확한 형식까지 테스트한다."
  },
  {
    "id": "study-7",
    "questionsAsked": ["4주차 chap10을 설명해 줘. 연결된 PPTX를 실제로 읽을 수 있어?"],
    "scopes": ["ch10-general"],
    "title": "Chapter 10 설명의 근거 한계",
    "chapter": "Chapter 10 보충",
    "source": "4주차 개념 설명 (Chap 10) Github TEST",
    "location": "원 대화에서 chap10_10e.pptx 접근 실패",
    "explanation": [
      "chap09_10e.pdf의 10e는 10판을 뜻하며 Chapter 9와 10을 합친 의미가 아니다. 과거 접근 실패 답변을 강의자료를 읽은 해설로 바꾸지 않는다.",
      "연산자 오버로딩은 사용자 정의 타입에서 연산자의 의미를 정의하는 기능이다. 기존 연산자의 우선순위·결합법칙·피연산자 수를 임의로 바꾸는 기능은 아니다.",
      "멤버 연산자는 왼쪽 객체를 this로 받고, 비멤버 연산자는 피연산자를 명시적으로 받는다. 입출력 연산자처럼 왼쪽이 다른 타입인 경우 설계를 구분한다.",
      "이 항목은 과거 대화의 일반 개념 보충이다. 실제 Chapter 10 강의 진도·페이지·교수님 강조점이 확인되었다는 표시를 하지 않는다."
    ],
    "question": "Q. 원래 대화에 설명이 있으면 해당 강의 슬라이드를 읽은 설명인가?",
    "answer": "A. 아니다. 이 대화는 파일 접근에 실패한 상태의 일반 설명이므로 강의자료 기반 내용과 구분해야 한다."
  }
];

export const scopeOptions = [
  {
    "id": "week1",
    "label": "1주차 · 기존 본문"
  },
  {
    "id": "week2",
    "label": "2주차 · Chapter 9"
  },
  {
    "id": "lab2",
    "label": "Lab 2 · 유리수 클래스"
  },
  {
    "id": "ch10-general",
    "label": "Chapter 10 · 일반 보충(강의 미대조)"
  }
];
