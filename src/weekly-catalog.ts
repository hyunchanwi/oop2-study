import type { LectureSummary } from './lecture-summaries';

export const weeklyCatalog = [
  {
    "number": 1,
    "title": "C++ 핵심 복습과 클래스 기초",
    "summary": "기존 1주차 본문 · 객체·클래스·포인터",
    "lectureIds": [],
    "noteScopes": [
      "week1"
    ],
    "materials": [
      "1주차 복습 자료와 전사본"
    ],
    "evidence": "기존 1주차 본문을 유지합니다."
  },
  {
    "number": 2,
    "title": "클래스 심화 전반 · Lab 2",
    "summary": "Chapter 9 전반 · Time·생성·소멸·유리수",
    "lectureIds": [
      "oop-time-interface",
      "oop-lifetime",
      "oop-lab"
    ],
    "noteScopes": [
      "week2",
      "lab2"
    ],
    "materials": [
      "2주차/chap09_10e.pdf",
      "2주차/OOP2_Lab2.pdf"
    ],
    "evidence": "주차 폴더와 2-1·2-2 전사본을 기준으로 연결. 9장 전체 PDF를 한 주의 실제 진도와 동일시하지 않습니다."
  },
  {
    "number": 3,
    "title": "클래스 심화 후반 · Lab 3",
    "summary": "const·composition·friend·this·static",
    "lectureIds": [
      "oop-lifetime",
      "oop-friend-this-static",
      "oop-week3-lab",
      "gpt-oop-week3-exceptions"
    ],
    "noteScopes": [
      "week2",
      "week3"
    ],
    "materials": [
      "2주차/chap09_10e.pdf (연속 수업)",
      "3주차/OOP2_Lab3.pdf"
    ],
    "evidence": "3-1 전사본은 Chapter 9 후반을 이어서 설명하고 3-2는 Lab3 실습입니다. Chapter9 질문은 두 주에 걸친 주제 복습으로 연결합니다."
  },
  {
    "number": 4,
    "title": "연산자 중복 · Lab 4",
    "summary": "Chapter 10 전반 · Date·Time·스트림·비교",
    "lectureIds": [
      "oop-week4-operators",
      "gpt-oop-week4-increment"
    ],
    "noteScopes": [
      "ch10-general",
      "week4"
    ],
    "materials": [
      "4주차/chap10_10e.pdf",
      "4주차/OOP2_Lab4.pdf"
    ],
    "evidence": "4-1·4-2 전사본과 PDF 텍스트를 확인한 새 자료 정리입니다. 기존 Claude의 자료 접근 실패 당시 질문은 일반 보충으로 구분합니다. Cowork 대화를 가져왔다고 표시하지 않습니다."
  },
  {
    "number": 5,
    "title": "동적 메모리와 Array · Lab 5",
    "summary": "Chapter 10 후반 · 깊은 복사·첨자·소유권",
    "lectureIds": [
      "oop-week5-memory",
      "gpt-oop-week5-equation"
    ],
    "noteScopes": ["week5"],
    "materials": [
      "4주차/chap10_10e.pdf (후반 연속 수업)",
      "5주차/OOP2_Lab5.pdf"
    ],
    "evidence": "5-1·5-2 전사본과 Lab5 텍스트 기반 정리를 보존하고 GPT의 Equation·Array 실제 질문을 추가했습니다. 기존 Claude 질문과 출처를 구분하며 편집 코드는 원본 복원이 아닙니다."
  },
  {
    "number": 6,
    "title": "상속과 Point → Square · Lab 6",
    "summary": "Chapter 11 · 접근 권한·생성소멸·vector·정렬",
    "lectureIds": ["gpt-oop-week6-inheritance", "gpt-oop-week6-lab"],
    "noteScopes": ["week6"],
    "materials": ["6주차/chap11_10e.pdf", "6주차/OOP2_Lab6.pdf"],
    "evidence": "6주차 Chap11·Lab6 GPT 학습 대화와 남아 있는 사용자 코드를 기준으로 연결했습니다. 세부 페이지 이미지·전사 전체를 재검증한 표시는 아니며 편집 코드는 원본과 구분합니다."
  },
  {
    "number": 7,
    "title": "다형성과 가상 함수 · Lab 7",
    "summary": "Chapter 12 p.34~45 · virtual·추상 클래스·Shape 입력",
    "lectureIds": ["gpt-oop-week7-polymorphism", "gpt-oop-week7-shape-input"],
    "noteScopes": ["week7"],
    "materials": ["7주차/chap12_10e.pdf", "7주차/OOP2_Lab7_Iclass.pdf"],
    "evidence": "최신 7주차 폴더에서 Chap12·Lab7·7-1 전사 파일 존재를 확인했습니다. p.34~45 학습 위치와 Shape 질문은 GPT 대화 기준이며 해당 전사 본문·전체 페이지 이미지는 재대조하지 않았습니다."
  }
];

export const weeklyLectureSummaries: LectureSummary[] = [
  {
    "id": "oop-week3-lab",
    "scopes": [
      "week3"
    ],
    "title": "3주차 · Chapter 9 후반과 Lab 3 설계 연습",
    "sources": [
      "OOP2_Lab3.pdf",
      "객프2 3-1·3-2 전사본"
    ],
    "location": "OOP2_Lab3.pdf p.2~13 · Chapter 9 후반 연속 수업",
    "recordingStatus": "3주차 전사본의 const·composition·friend·this·static 설명을 확인. AI 전사 오인식이 있어 원문 인용·정확한 시간 대응은 제공하지 않음.",
    "overview": "2주차에 시작한 Chapter 9가 3주차에도 이어집니다. 클래스의 관계와 객체 수명, 참조 반환을 실습의 호출 흐름으로 연결합니다.",
    "sections": [
      {
        "title": "const 객체와 선언·정의의 일치",
        "paragraphs": [
          "const 객체는 const 멤버 함수를 통해 상태를 읽는다. getter가 실제로 값을 바꾸지 않아도 함수 선언에 const가 없으면 const 객체에 호출할 수 없다. 선언과 클래스 밖 정의 양쪽의 매개변수 목록 뒤에 const를 맞춘다.",
          "생성자는 초기 상태를 만들고 소멸자는 수명을 끝내므로 const 멤버 함수로 선언하지 않는다. 일반 객체는 const·비const 멤버 함수를 모두 사용할 수 있다. const 지역 변수와 const 멤버 함수는 적용되는 대상이 다르다."
        ],
        "formula": "",
        "example": "",
        "code": ""
      },
      {
        "title": "composition과 Perceptron의 역할 분담",
        "paragraphs": [
          "Lab 3 p.7~8은 ActivationFunction 객체를 Perceptron의 구성 요소로 둔다. 외부 객체가 내부 객체를 가진다는 has-a 관계이며 상속 is-a와 다르다. 입력과 가중치의 곱을 합하고 bias를 반영한 뒤 활성화 함수에 전달하는 계산 순서를 먼저 적는다.",
          "멤버 객체는 바깥 객체의 생성자 본문보다 먼저 초기화된다. 초기화 리스트에 적은 순서가 아니라 클래스 멤버 선언 순서가 실제 초기화 순서다. 소멸은 바깥 소멸자 본문 실행 후 멤버 객체가 역순으로 정리되는 흐름으로 추적한다."
        ],
        "formula": "가중합 = Σ(weight_i × input_i) + bias",
        "example": "",
        "code": ""
      },
      {
        "title": "friend·this·static 실습에서 상태를 추적한다",
        "paragraphs": [
          "Lab 3 p.6의 friend 함수는 참조로 전달된 객체의 private 멤버를 수정한다. 참조 이름은 새 객체가 아니라 기존 객체의 별명이다. 클래스 밖 함수가 friend라고 해서 그 클래스의 멤버 함수가 되는 것은 아니다.",
          "p.10의 MyString 실습은 문자열 자체를 수정하고 같은 객체의 참조를 반환하여 연쇄 호출한다. return *this는 이미 바뀐 객체를 반환하는 단계이지 수정 시점이 아니다. static 카운터는 객체별 사본이 아니라 공유 상태이며 static 함수에는 특정 객체의 this가 없다."
        ],
        "formula": "",
        "example": "",
        "code": ""
      },
      {
        "title": "판별식과 실습의 점검 순서",
        "paragraphs": [
          "Lab 3 p.12~13의 이차방정식은 D=b²−4ac의 부호를 기준으로 두 실근·중근·실근 없음으로 나눈다. 먼저 a≠0이라는 이차방정식 조건과 실제 값의 범위를 확인한다.",
          "과제 전체 제출 코드를 공개하지 않고, 입력→객체 생성→const 조회→결과 분류라는 절차를 복습한다. friend·composition·연쇄 호출은 결과 숫자만 같게 만드는 것으로 대체하지 말고 요구한 객체와 함수를 실제 호출하는지 확인한다."
        ],
        "formula": "D = b² − 4ac",
        "example": "",
        "code": ""
      }
    ]
  },
  {
    "id": "oop-week4-operators",
    "scopes": [
      "week4"
    ],
    "title": "4주차 · 연산자 중복과 Lab 4",
    "sources": [
      "chap10_10e.pdf",
      "OOP2_Lab4.pdf",
      "객프2 4-1·4-2 전사본"
    ],
    "location": "chap10_10e.pdf p.3~45 · OOP2_Lab4.pdf p.3~17",
    "recordingStatus": "4주차 전사본 시작에서 Chapter 10·연산자 중복 진도를 확인. PDF 텍스트와 대조했고 코드 이미지 전체 판독은 하지 않음.",
    "overview": "연산식이 어떤 함수 호출로 바뀌는지부터 멤버·비멤버 선택, 스트림과 증감 연산, 날짜·시간·벡터 사례까지 정리합니다.",
    "sections": [
      {
        "title": "연산자 중복은 기존 기호의 클래스별 함수를 정의한다",
        "paragraphs": [
          "operator+ 같은 함수는 사용자 정의 타입에서 기존 연산 기호의 의미를 정한다. 새로운 기호를 만들거나 연산자 우선순위·결합 방향·피연산자 개수를 바꾸지는 못한다. 기본 정수형끼리의 덧셈도 다시 정의할 수 없다.",
          "+를 정의했다고 +=나 ==까지 자동으로 정의되는 것은 아니다. 수업의 string 사례에서는 +=는 문자열 결합, []는 문자 접근으로 쓰인다. []의 범위 검사 여부와 at()의 예외 발생을 구분한다."
        ],
        "formula": "출처: chap10_10e.pdf p.4~5, 12~15",
        "example": "",
        "code": ""
      },
      {
        "title": "왼쪽 피연산자와 매개변수 개수를 연결한다",
        "paragraphs": [
          "이항 연산자를 멤버로 정의하면 왼쪽 객체가 this이고 오른쪽 피연산자가 명시적 인수 하나다. a+b는 a.operator+(b)로 읽을 수 있다. 비멤버는 양쪽 피연산자를 인수 둘로 받는다.",
          "단항 멤버 연산자는 명시적 인수가 없고 단항 비멤버는 객체 인수 하나다. 함수 이름만 외우지 말고 객체 변경 여부·반환형·인수 const 참조 여부를 함께 설계한다. friend는 private 접근이 필요한 비멤버에게만 부여한다."
        ],
        "formula": "출처: chap10_10e.pdf p.16, 29",
        "example": "",
        "code": ""
      },
      {
        "title": "스트림 연산자는 왜 비멤버이며 참조를 반환하는가",
        "paragraphs": [
          "cout<<object에서 왼쪽은 사용자 클래스가 아니라 ostream이다. 사용자 클래스의 멤버로 만들면 object<<cout 형태가 되어 원래 표기와 다르므로 비멤버 함수로 만든다. 출력 객체는 보통 const 참조, 입력 객체는 수정 가능한 참조로 받는다.",
          "반환값은 같은 스트림의 참조다. 그래서 cout<<first<<second처럼 앞 호출이 돌려준 스트림에 다음 호출이 이어진다. 입력·출력 함수 내부에서 새 스트림을 만들거나 값을 반환하는 방식과 다르다."
        ],
        "formula": "출처: chap10_10e.pdf p.17~28",
        "example": "문법 확인용 선언이며 제출용 전체 구현은 아닙니다.",
        "code": "std::ostream& operator<<(std::ostream& output, const Value& value);\nstd::istream& operator>>(std::istream& input, Value& value);"
      },
      {
        "title": "전위와 후위 ++의 상태·반환값을 분리한다",
        "paragraphs": [
          "전위 ++는 객체를 먼저 증가시키고 바뀐 자신을 참조로 반환하는 설계다. 후위 ++는 바꾸기 전 사본을 보관하고 현재 객체를 증가시킨 뒤 이전 사본을 값으로 반환한다.",
          "후위 함수의 int 인수는 전위와 구분하기 위한 더미 매개변수이지 증가량이 아니다. Lab 4 Date 사례에서 helpIncrement는 월말·연말·윤년을 처리하며 두 연산자의 실제 날짜 변경을 재사용한다."
        ],
        "formula": "출처: chap10_10e.pdf p.30~32 · Lab4 p.5~6",
        "example": "편집 예: 각각 12월 31일에서 시작해 비교하면, ++d는 다음 해 1월 1일의 객체를 참조로 반환하고 d++는 이전 날짜인 12월 31일의 사본을 반환한다. 어느 경우든 한 번 호출한 뒤 d 자체는 다음 해 1월 1일이다.",
        "code": ""
      },
      {
        "title": "날짜 계산·시간 정규화는 불변식을 유지한다",
        "paragraphs": [
          "Date의 하루 증가는 현재 월의 마지막 날을 확인하고 다음 달·다음 해로 넘어간다. 윤년은 400의 배수이거나, 4의 배수이면서 100의 배수가 아닌 해다. 백일은 태어난 날을 1일로 세는 조건이면 99일을 더해야 한다.",
          "Time의 +=는 초를 더한 뒤 초→분→시 자리올림을 적용해 정상 범위로 정규화한다. Lab의 구현 범위와 일자까지 포함하는 일반 날짜·시간 라이브러리의 의미를 섞지 않는다."
        ],
        "formula": "윤년: year%400==0 || (year%4==0 && year%100!=0)\n출처: Lab4 p.6, 9, 11~12",
        "example": "",
        "code": ""
      },
      {
        "title": "비교 연산자는 과제에서 정의한 비교 기준을 따른다",
        "paragraphs": [
          "Lab 4 p.14는 Rectangle과 Circle의 면적 비교, p.16은 Vector2D의 magnitude 비교다. 벡터 좌표가 서로 달라도 크기가 같으면 이 실습의 ==가 참일 수 있다. 좌표 전체 동일성과 크기 동일성을 혼동하지 않는다.",
          "객체의 area 값을 꺼내 기본 double 연산만 수행하면 숫자는 같게 나와도 정의한 객체 연산자를 호출하는 연습을 하지 않은 것이다. 작은 입력으로 객체 연산식이 해당 함수에 들어가는지 추적한다. 부동소수점의 일반적인 허용오차 비교는 실습의 지정된 == 정의와 별도 주제다."
        ],
        "formula": "magnitude = √(x²+y²)",
        "example": "편집 확인 예: (1,2)와 (-2,-1)은 좌표는 다르지만 두 magnitude는 √5다.",
        "code": ""
      }
    ]
  },
  {
    "id": "oop-week5-memory",
    "scopes": [
      "week5"
    ],
    "title": "5주차 · 동적 메모리·Array·Lab 5",
    "sources": [
      "chap10_10e.pdf",
      "OOP2_Lab5.pdf",
      "객프2 5-1·5-2 전사본"
    ],
    "location": "chap10_10e.pdf p.46~86 · OOP2_Lab5.pdf p.3~14",
    "recordingStatus": "5-1에서 동적 메모리와 Chapter 10 후반, 5-2에서 연산자 실습·Lab5 설명을 확인. 자동 전사 오인식은 코드 문법의 근거로 사용하지 않음.",
    "overview": "메모리 소유권과 복사의 안전성부터 첨자·변환 연산, 고차방정식의 설계 점검까지 실행 흐름 중심으로 정리합니다.",
    "sections": [
      {
        "title": "new/delete는 할당뿐 아니라 객체 수명과 연결된다",
        "paragraphs": [
          "new Type은 메모리를 할당하고 해당 객체를 초기화한다. 클래스 객체면 생성자가 실행된다. delete는 객체의 소멸과 할당 해제를 연결하며 포인터 변수 자체를 없애는 명령은 아니다.",
          "new[]로 만든 배열에는 delete[]를 대응시킨다. 할당 형태를 섞거나 두 번 해제하면 잘못된 동작을 일으킨다. 포인터 값을 복사했다고 소유권이 두 개의 독립 메모리로 복제되는 것은 아니다."
        ],
        "formula": "출처: chap10_10e.pdf p.46~48",
        "example": "",
        "code": ""
      },
      {
        "title": "동적 배열의 size와 포인터는 함께 관리한다",
        "paragraphs": [
          "Array 객체는 원소 개수와 동적 원소 영역의 주소를 가진다. 크기가 n이면 유효한 첨자는 0부터 n−1이다. 배열이 충분히 만들어졌는지 확인한 뒤 입력하고, 통계 계산 뒤 해제하는 순서를 따른다.",
          "Lab5의 실수 통계는 합을 n으로 나눠 평균을 구하고 최대·최소를 실제 원소로 초기화해 비교한다. 모든 값이 음수일 수도 있으므로 최대를 무조건 0으로 시작하지 않는다. n=0 등 허용하지 않는 입력은 나눗셈·첨자 접근 전에 검사한다."
        ],
        "formula": "출처: Lab5 p.3~8, 11",
        "example": "편집 확인 예: [-2,-5,-1]의 최댓값은 -1이지 0이 아니다.",
        "code": ""
      },
      {
        "title": "복사 생성자와 복사 대입의 시작 상태가 다르다",
        "paragraphs": [
          "Array copy{original}는 새 객체를 만드는 복사 생성이며 copy=original은 이미 살아 있는 대상에 대한 복사 대입이다. 둘 다 독립 버퍼가 필요하지만 대입에서는 대상이 이전에 소유하던 메모리 처리까지 생각해야 한다.",
          "포인터 주소만 복사하는 얕은 복사는 원소 영역을 공유하고 양쪽 소멸자가 같은 메모리를 해제할 위험을 만든다. 깊은 복사는 새 공간을 확보하고 원소 값을 복사한다. 자기 대입과 크기가 다른 대상, 복사 후 원본 한 원소 변경을 테스트한다."
        ],
        "formula": "출처: chap10_10e.pdf Array 사례 · Lab5 p.3~8",
        "example": "",
        "code": ""
      },
      {
        "title": "소멸자·복사 생성·대입의 소유권 약속을 맞춘다",
        "paragraphs": [
          "직접 동적 메모리를 소유하는 클래스는 생성으로 얻은 자원을 소멸 시 반환해야 한다. 복사 생성자와 대입도 같은 소유권 규칙을 따르도록 설계한다. 자원 관리 함수 중 하나만 구현하고 나머지의 기본 포인터 복사를 그대로 두지 않는다.",
          "대입 연산자는 갱신된 자신의 참조를 반환해 연쇄 대입을 지원한다. 이것이 새 사본을 반환하는 산술 연산자와 다르다. 현대 C++의 vector·스마트 포인터를 활용한 설계는 보충 관점이며 수업의 직접 new[]/delete[] 연습을 대체해 제출했다고 표시하지 않는다."
        ],
        "formula": "편집 원리: 할당 → 독립 복사 → 갱신 → 정확히 한 번 해제",
        "example": "",
        "code": ""
      },
      {
        "title": "첨자 연산자에서 const와 비const 반환이 달라진다",
        "paragraphs": [
          "읽기 전용 객체의 첨자는 값을 읽는 경로, 수정 가능한 객체의 첨자는 원소에 대한 수정 가능한 참조를 반환하는 경로로 나눌 수 있다. array[index]=value가 가능하려면 왼쪽이 실제 원소를 가리켜야 한다.",
          "두 경로 모두 범위 오류를 다룬다. out_of_range 예외는 유효하지 않은 첨자를 알리는 것이며 배열 크기를 자동으로 늘리지 않는다. [-1], [size], 정상 마지막 첨자를 각각 검산한다."
        ],
        "formula": "출처: Array 첨자 사례 · Lab5 p.8",
        "example": "",
        "code": ""
      },
      {
        "title": "변환 생성자·변환 연산자·explicit을 구분한다",
        "paragraphs": [
          "인수 하나로 호출 가능한 생성자는 다른 값에서 클래스 객체를 만드는 변환에 참여할 수 있다. 크기를 받는 Array 생성자가 뜻밖에 정수에서 Array로 암시 변환되는 것을 제한하려면 explicit을 사용한다.",
          "operator TargetType()는 현재 객체에서 다른 타입의 값을 만드는 변환 함수다. 반환 타입을 별도로 앞에 적지 않는 문법이며 단순한 일반 getter와 다르다. 의도하지 않은 변환 때문에 일치해 보이는 호출을 정상 설계로 받아들이지 않는다."
        ],
        "formula": "출처: chap10_10e.pdf 후반 변환·explicit 설명",
        "example": "",
        "code": ""
      },
      {
        "title": "고차방정식은 계수 배열과 차수 대응을 먼저 정한다",
        "paragraphs": [
          "Lab5는 고차항부터 상수항까지 계수를 저장하며 차수=원소 개수−1로 해석한다. 중간 계수가 0이어도 저장 위치를 유지해야 항의 차수가 바뀌지 않는다. 출력에서 0항을 생략하는 것과 배열에서 원소를 제거하는 것은 다르다.",
          "서로 차수가 다른 방정식을 더할 때는 같은 차수끼리 대응시킨다. scalar 곱셈은 각 계수에 수를 곱하며 방정식끼리의 다항식 곱셈이 아니다. +=는 기존 객체 갱신, +는 새 결과라는 차이를 설명하되 제출용 완성 코드는 싣지 않는다."
        ],
        "formula": "출처: OOP2_Lab5.pdf p.13~14",
        "example": "편집 예: (2x²+3)+(x+1)=2x²+x+4. 계수 0을 저장하지 않으면 x항 위치를 잃을 수 있다.",
        "code": ""
      }
    ]
  }
];

