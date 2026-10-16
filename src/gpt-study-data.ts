import type { LectureSummary } from './lecture-summaries';
import type { studyNotes } from './claude-study-data';

const sourceStatus = 'GPT 학습 대화의 요지를 편집한 정리 / 코드 참조·이미지 손실 부분은 원본으로 복원하지 않음 / 코드는 별도로 작성한 편집 예제';

export const gptLectureSummaries: LectureSummary[] = [
  {
    id: 'gpt-oop-week3-exceptions', scopes: ['week3'],
    title: 'GPT 보충 · throw·catch와 재입력·const 위치',
    sources: ['GPT · 시험 대비 공부 계획', 'GPT · Lab 5 복습'],
    location: 'Chapter 9 후반·Lab 3 이차방정식 복습 / 개별 페이지와 원본 코드 재대조 전',
    recordingStatus: '실제 GPT 질문을 확인한 보충 정리. 이 항목의 예외 처리 코드를 강의 원본이나 전사 인용으로 표시하지 않습니다.',
    sourceStatus,
    overview: 'a=0을 누가 검사하고 어디서 잡는지, catch 다음에 입력이 반복되는 이유, const가 적용되는 대상을 실행 경로로 구별합니다.',
    sections: [
      {
        title: 'throw가 있어야 대응하는 catch로 전달된다',
        paragraphs: [
          'a가 0이라는 사실만으로 invalid_argument가 자동 발생하지 않는다. 이차방정식 조건을 검사하는 생성자·함수가 직접 throw해야 한다. double의 0 나눗셈이나 논리 오류도 자동으로 이 catch에 잡힌다고 가정하지 않는다.',
          'try 안에서 입력 → 검사 → 객체 구성 → 계산 순서로 진행한다. throw를 만나면 같은 try의 남은 정상 코드는 건너뛰고 일치하는 catch로 이동한다. try 안에서 생성이 완료된 자동 객체는 되감기 과정에서 소멸하지만 생성에 실패한 객체 자체의 소멸자는 호출되지 않는다.',
        ],
        formula: 'a=0 → 명시적 throw → 대응 catch → 반복문의 다음 회차\na≠0 → 판별식 계산 → 정상 종료',
        example: '아래는 원본 코드가 아닌 완성된 편집 예제입니다. 입력 0 2 1 뒤에 1 2 1을 넣으면 오류 메시지 한 번 후 D=0을 출력합니다. EOF·형식 실패는 재입력 대신 종료하도록 정했습니다.',
        code: '#include <iostream>\n#include <stdexcept>\nint main() {\n    double a, b, c;\n    while (std::cin >> a >> b >> c) {\n        try {\n            if (a == 0) throw std::invalid_argument("a must be nonzero");\n            std::cout << "D=" << b*b - 4*a*c << "\\n";\n            break;\n        } catch (const std::invalid_argument& error) {\n            std::cout << error.what() << "\\n";\n        }\n    }\n}',
      },
      {
        title: '재입력은 catch의 자동 기능이 아니라 반복문의 역할',
        paragraphs: [
          'catch는 예외를 처리하는 블록이다. 그 자체가 입력 위치로 되돌아가거나 객체 값을 되돌리지 않는다. 재입력을 원하면 try/catch를 while 안에 두고 성공 때 break하는 식으로 제어 흐름을 설계한다.',
          '숫자 대신 문자를 입력해 failbit가 켜진 경우와 유효한 숫자 a=0을 거부하는 경우를 구분한다. 형식 오류를 복구해 계속 읽으려면 clear와 잘못된 줄 제거가 필요하다. EOF를 clear하며 무조건 반복하면 종료하지 못할 수 있으므로 EOF 정책을 먼저 정한다.',
        ], formula: '', example: '', code: '',
      },
      {
        title: '반환형 앞·매개변수·함수 뒤 const를 따로 읽는다',
        paragraphs: [
          'const std::string& getName() const에서 앞의 const는 반환 참조를 통해 이름을 수정하지 못하게 하고, 뒤의 const는 이 호출로 현재 객체의 일반 멤버를 수정하지 못하게 한다. 서로 다른 위치가 서로 다른 대상을 제한한다. 참조 반환은 멤버의 수명 안에서만 사용한다. 대입 연산자에서 const를 구분하는 예는 연산자를 배우는 5주차에서 이어서 다룬다.',
          'const string& first는 문자열을 복사하지 않고 참조하되 그 참조로 원본을 변경하지 않는 매개변수다. 초기화 목록의 name{first}는 별도 string 멤버를 구성한다. string getName() const의 앞 string은 반환형, 뒤 const는 현재 객체에 대한 변경 제한이다. cout만 하는 void 함수와 값을 반환하는 getter를 구분한다.',
        ], formula: 'const T& 반환: 호출자가 반환 참조로 수정 불가\nconst T& 인수: 함수가 그 참조로 인수를 수정 불가\nf() const: 이 호출로 현재 객체의 일반 멤버 수정 제한', example: '', code: '',
      },
    ],
  },
  {
    id: 'gpt-oop-week4-increment', scopes: ['week4'],
    title: 'GPT 보충 · 전위·후위 증감의 상태와 반환값',
    sources: ['GPT · 시험 대비 공부 계획'], location: 'Chapter 10·Lab 4 복습 / 대화에서 Lab4 p.5 언급, 원본 코드 참조 손실',
    recordingStatus: 'GPT 대화의 설명을 재구성했습니다. 실행 가능한 코드는 설명용으로 새로 작성했습니다.', sourceStatus,
    overview: '객체의 최종 상태와 식이 돌려주는 결과를 두 칸으로 나누어 추적하면 전위와 후위를 혼동하지 않습니다.',
    sections: [
      {
        title: '전위는 변경 후 현재 객체의 참조를 반환한다',
        paragraphs: [
          '관례적인 전위 operator++()는 현재 객체를 먼저 증가시키고 *this를 참조로 반환한다. 참조를 받은 쪽은 같은 객체를 관찰한다. 복사해서 받으면 그 시점의 값이 별도 객체에 저장된다.',
          '관례적인 후위 operator++(int)는 변경 전 상태를 지역 복사본에 보관하고 원본을 증가시킨 뒤 복사본을 값으로 반환한다. int는 전위와 후위를 구분하기 위한 더미 매개변수이며 증가량이 아니다. 실제 동작은 정의한 함수 본문에 달려 있으므로 선언만 보고 결과를 단정하지 않는다.',
        ], formula: '시작 c=5 → old=c++: old=5, c=6 → now=++c: now=7, c=7',
        example: '원본 코드가 아닌 완성된 편집 예제. 출력은 5 7 7이며 후위의 지역 변수 old를 참조로 반환하지 않습니다.',
        code: '#include <iostream>\nstruct Counter {\n    int value;\n    Counter& operator++() { ++value; return *this; }\n    Counter operator++(int) { Counter old{*this}; ++(*this); return old; }\n};\nint main() {\n    Counter c{5};\n    Counter old = c++;\n    Counter now = ++c;\n    std::cout << old.value << " " << now.value << " " << c.value << "\\n";\n}',
      },
      {
        title: 'Date의 helpIncrement와 return을 다른 단계로 읽는다',
        paragraphs: [
          '날짜 증가 함수는 월말·연말·윤년을 검사하여 원본 날짜를 바꾸는 단계다. return *this는 이미 변경된 객체를 돌려주는 단계이며 return이 날짜를 증가시키는 것은 아니다.',
          '출력 추적은 각 문장을 따로 실행하며 이전 값·변경 후 값·반환값의 소유자를 적는다. 한 식에서 같은 객체를 여러 번 증감하는 복잡한 표현을 만들기보다 문장을 분리해 순서와 상태를 확인한다.',
        ], formula: '', example: '편집 확인: 12월 31일에서 old=d++이면 old는 12월 31일, d는 다음 해 1월 1일입니다.', code: '',
      },
    ],
  },
  {
    id: 'gpt-oop-week5-equation', scopes: ['week5'], title: 'GPT · Equation 배열·깊은 복사·실제 오답 교정',
    sources: ['GPT · 5주차 Lab5 공부하기', 'GPT · Lab 5 복습'],
    location: 'Lab 5 Equation·Array 질문 / 사용자 코드 일부 확인, 사라진 첨부·코드 참조는 미복원',
    recordingStatus: 'GPT 질문과 남아 있는 코드의 오류를 대조했습니다. 완성된 편집 코드는 강의·사용자 원본의 복원이 아닙니다.', sourceStatus,
    overview: '저장 공간·크기·차수 정렬을 함께 추적합니다. 특히 뺄셈의 첫 루프 부호, scalar 매개변수, 배열 교체 순서를 실제 질문과 연결합니다.',
    sections: [
      {
        title: 'new 배열과 vector·array의 차이',
        paragraphs: [
          'double* coeff = new double[n]은 실행 중 n개 double 저장 공간을 만들고 첫 원소의 주소를 포인터에 저장한다. double coeff나 string ptr 같은 단일 값 변수에 new 배열의 포인터를 넣을 수 없다. 포인터는 배열 길이를 자동 기록하지 않으므로 size를 별도로 관리한다.',
          'new[]로 만든 한 배열의 길이는 바뀌지 않는다. 더 큰 배열을 새로 만들고 내용을 옮긴 뒤 이전 배열을 delete[]해야 한다. std::array<T,N>은 N이 타입에 들어가는 고정 크기, vector는 size·capacity와 소유권을 관리하고 push_back으로 원소를 추가한다. 직접 메모리 관리를 연습하는 요구가 없다면 vector가 관리 부담을 줄인다.',
        ], formula: '새 공간 할당 → 기존 값 복사·계산 → 이전 공간 delete[] → 포인터와 size 교체', example: '', code: '',
      },
      {
        title: '생성·복사·대입은 모두 저장 공간이 필요하다',
        paragraphs: [
          '깊은 복사는 새로운 배열을 할당하고 모든 계수 값을 복사한다. 복사 생성자에서 coeff를 할당하지 않고 coeff[i]에 쓰면 유효한 저장 공간이 없다. 포인터 주소만 복사하면 두 객체가 같은 배열을 소유하여 한쪽 수정이 다른 쪽에 보이고 소멸 때 이중 해제가 생길 수 있다.',
          '대입에서는 이미 존재하는 왼쪽 객체의 이전 자원과 크기도 처리한다. new double[rhs.size]만 호출해도 멤버 size가 자동 변경되지는 않는다. 새 메모리를 먼저 확보·복사하고 그 뒤 교체하면 할당 실패 시 원래 상태를 유지하기 쉽다. 자기 대입도 고려한다.',
          'Equation eq(input,n)이 내부에 깊게 복사했다면 delete[] input은 입력용 임시 배열만 해제하며 eq.coeff는 유지된다. new[]와 delete[]를 짝짓고 일반 지역 배열에는 delete[]를 적용하지 않는다. Equation(int) 생성자가 선언되지 않았다면 Equation eq(n)으로 기존 생성자를 호출할 수 없다.',
        ], formula: '서로 다른 주소 + 같은 원소 값 = 독립된 깊은 복사', example: '', code: '',
      },
      {
        title: '서로 다른 차수는 오른쪽 상수항을 맞춘다',
        paragraphs: [
          '계수를 높은 차수부터 보관하면 [1,2,4]는 x²+2x+4, [3,5]는 3x+5다. newSize를 더 긴 배열 길이로 정하고 각 배열의 시작 위치를 newSize-size, newSize-rhs.size만큼 옮긴다. 같은 인덱스가 아니라 같은 차수끼리 계산한다.',
          '실제 오답에서는 왼쪽 계수까지 -=하여 -lhs-rhs가 되었다. 0으로 시작한 결과 배열에는 왼쪽 값을 +=로 먼저 복사하고 오른쪽만 -=한다. 두 루프는 서로 다른 길이의 피연산자를 읽으므로 중복 실행 오류가 아니다. 각 루프 조건은 자기 배열 길이 i<size 또는 i<rhs.size다.',
        ], formula: '[0,0,0] → 좌항 += [1,2,4] → 우항 -= [0,3,5] → [1,-1,-1]',
        example: '편집한 멤버 함수 조각입니다. size≥1이고 coeff가 size개 계수를 소유한다는 전제이며 주변 클래스는 아래 완성 예제에서 확인합니다.',
        code: 'Equation& operator-=(const Equation& rhs) {\n    int newSize = std::max(size, rhs.size);\n    double* newCoeff = new double[newSize]{};\n    for (int i = 0; i < size; ++i)\n        newCoeff[newSize - size + i] += coeff[i];\n    for (int i = 0; i < rhs.size; ++i)\n        newCoeff[newSize - rhs.size + i] -= rhs.coeff[i];\n    delete[] coeff;\n    coeff = newCoeff;\n    size = newSize;\n    return *this;\n}',
      },
      {
        title: '원래 배열을 끝까지 읽은 뒤 교체하고 scalar는 숫자로 곱한다',
        paragraphs: [
          '계산 전에 delete[] coeff를 하면 아직 읽어야 하는 왼쪽 데이터가 사라진다. coeff=newCoeff 후 delete[] coeff를 하면 새 결과를 지우며 이전 주소는 잃는다. 두 피연산자를 모두 읽고 결과를 완성한 뒤 이전 배열을 지우면 eq-=eq 같은 자기 연산도 안전하게 0으로 계산된다.',
          'operator*=(double rhs)에서 rhs는 숫자이므로 rhs.coeff[i]가 없다. 각 계수에 coeff[i] *= rhs를 적용하고 *this를 반환한다. 비멤버 operator+(lhs,rhs)는 lhs를 깊게 복사한 result에 +=를 적용하고 result를 값으로 돌려주어 lhs를 보존할 수 있다.',
        ], formula: 'scalar 2 × [1,-1,-1] = [2,-2,-2]', example: '', code: '',
      },
      {
        title: 'Lab 5 Array 대입 · 반환형·인수·함수 뒤 const 위치',
        paragraphs: [
          '실제 Lab 5 질문의 const Array& operator=(const Array& right)는 반환형이 const Array&이고 right도 const 참조다. 매개변수 괄호 뒤에는 const가 없으므로 왼쪽 객체의 size·ptr를 수정할 수 있다. 3주차 const 보충에서 다룬 같은 구분을 이 주차의 실제 대입 코드에 연결한다.',
          '반환형의 const는 호출자가 반환 참조로 객체를 바꾸는 경로를 제한하고, 인수의 const는 right를 통해 오른쪽 객체를 바꾸지 못하게 한다. 어느 쪽도 대입을 수행하는 현재 객체의 일반 멤버 변경을 막지 않는다. 함수 뒤 const를 붙이면 의미가 달라지며 보통의 대입 연산자는 현재 객체를 변경해야 하므로 const 멤버 함수로 만들지 않는다.',
        ], formula: '반환 const Array& ≠ operator=(...) const\n왼쪽 size·ptr 변경 가능 / right는 읽기 전용',
        example: '실제 질문의 선언 형태를 설명하는 짧은 편집 조각이며 원본 전체 코드의 복원이 아닙니다.',
        code: 'const Array& operator=(const Array& right); // 함수 뒤에는 const가 없음',
      },
      {
        title: '동등 비교·차수·출력의 오답을 따로 점검한다',
        paragraphs: [
          'lhs.coeff==rhs.coeff는 주소 비교다. 계수 값의 동등성을 확인하려면 크기를 비교한 뒤 모든 원소를 끝까지 검사하고 불일치 때 false, 루프를 다 통과한 뒤 true를 반환한다. 루프 안에서 첫 원소 결과를 바로 반환하면 뒤 원소를 검사하지 못한다.',
          'degree=size-1은 맨 앞 계수가 0이 아니고 size가 유효하다는 저장 규약 아래의 차수다. 선행 0을 허용하면 정규화가 필요하다. 출력에서는 first 플래그로 첫 유효 항 앞의 불필요한 +를 막고 0 계수는 건너뛴다. 모두 0일 때 0을 출력하는 경우도 따로 처리한다.',
        ], formula: '', example: '다음 절의 코드는 메모리 소유와 연산을 검증하는 예이며 동등 비교·정규화·출력 연산자 전체를 구현한 것은 아닙니다.', code: '',
      },
      {
        title: '종합 실행 검증: 깊은 복사·대입·뺄셈·scalar',
        paragraphs: ['assert로 각 연산 뒤 계수와 원본 보존 여부를 검사한다. 복사본을 만든 뒤 원본을 바꾸어도 복사본은 그대로여야 하며, 자기 자신을 빼면 모든 계수가 0이어야 한다.'], formula: '', example: '아래 완성된 편집 예제는 깊은 복사·대입·뺄셈·scalar 계산을 검증하기 위한 작은 클래스입니다. Lab5 원본 전체 코드나 제출 답안을 복원한 것이 아닙니다.',
        code: '#include <algorithm>\n#include <cassert>\n#include <initializer_list>\n#include <iostream>\nclass Equation {\n    int size;\n    double* coeff;\npublic:\n    Equation(std::initializer_list<double> values)\n        : size(static_cast<int>(values.size())), coeff(new double[size]{}) {\n        std::copy(values.begin(), values.end(), coeff);\n    }\n    Equation(const Equation& rhs) : size(rhs.size), coeff(new double[size]) {\n        std::copy(rhs.coeff, rhs.coeff + size, coeff);\n    }\n    Equation& operator=(const Equation& rhs) {\n        if (this == &rhs) return *this;\n        double* next = new double[rhs.size];\n        std::copy(rhs.coeff, rhs.coeff + rhs.size, next);\n        delete[] coeff;\n        coeff = next; size = rhs.size;\n        return *this;\n    }\n    ~Equation() { delete[] coeff; }\n    Equation& operator-=(const Equation& rhs) {\n        int n = std::max(size, rhs.size);\n        double* next = new double[n]{};\n        for (int i=0; i<size; ++i) next[n-size+i] += coeff[i];\n        for (int i=0; i<rhs.size; ++i) next[n-rhs.size+i] -= rhs.coeff[i];\n        delete[] coeff; coeff = next; size = n; return *this;\n    }\n    Equation& operator*=(double rhs) {\n        for (int i=0; i<size; ++i) coeff[i] *= rhs;\n        return *this;\n    }\n    double at(int i) const { return coeff[i]; }\n};\nint main() {\n    Equation a{1,2,4}, b{3,5};\n    Equation copy{a}; a -= b;\n    assert(a.at(0)==1 && a.at(1)==-1 && a.at(2)==-1);\n    assert(copy.at(1)==2);\n    copy = a; a *= 2;\n    assert(copy.at(0)==1 && a.at(0)==2);\n    a -= a; assert(a.at(0)==0 && a.at(1)==0 && a.at(2)==0);\n    std::cout << "Equation checks passed\\n";\n}',
      },
    ],
  },
  {
    id: 'gpt-oop-week6-inheritance', scopes: ['week6'], title: '6주차 · Chap 11 상속·접근 권한·생성·소멸',
    sources: ['GPT · 6주차 Chap 11 공부하기', 'GPT · 상속 공부하기'],
    location: 'Chap 11 전체 학습 대화 / 페이지별 코드 참조·이미지 일부 손실, 세부 원본 미대조',
    recordingStatus: 'GPT 대화에 남은 설명 기준입니다. 강의 원본 페이지를 모두 직접 판독했다는 뜻은 아닙니다.', sourceStatus,
    overview: '기초 클래스 부분과 파생 클래스 부분이 하나의 객체를 이루는 구조를 getter·protected·초기화 목록과 연결합니다.',
    sections: [
      {
        title: 'public 상속은 is-a와 사용 가능한 인터페이스를 연결한다',
        paragraphs: [
          'BasePlusCommissionEmployee가 CommissionEmployee를 public 상속하면 파생 객체 안에 기초 클래스 부분이 존재한다. 기초의 이름·판매액·수수료율과 파생의 기본급이 서로 다른 역할을 맡는다. 같은 이름의 변수를 파생에 다시 선언하는 것으로 기초 멤버에 접근하려 하지 않는다.',
          '기초 클래스의 private 데이터는 파생 객체 안에도 존재하지만 파생 멤버 함수가 이름으로 직접 접근할 권한은 없다. 기초의 public·protected 함수가 제공하는 통로를 사용한다. public 상속 관계는 다른 객체를 멤버로 보유하는 composition의 has-a 관계와 구분한다.',
        ], formula: '기본급 포함 수입 = baseSalary + grossSales × commissionRate', example: '', code: '',
      },
      {
        title: 'getter와 protected의 선택 · public 상속 접근표',
        paragraphs: [
          'private 멤버를 둔 기초 클래스는 파생 클래스에서도 getter·setter를 통해 값을 읽고 검증한다. protected로 바꾸면 파생 멤버에서 직접 접근할 수 있지만 외부 main의 접근까지 허용되지는 않는다. 보호된 저장 형태에 파생 구현이 더 의존한다는 점도 생각한다.',
          '아래 표는 public 상속에서의 기본 접근을 요약한다. friend 등 별도의 권한은 제외했다. 기초 private은 상속하면 없어지는 데이터가 아니라 직접 접근할 수 없는 부분이다. protected 멤버 접근에는 객체 식의 타입에 관한 추가 제한도 있으므로 아무 Base 객체든 직접 접근 가능하다고 확대하지 않는다.',
        ], formula: '', example: '', code: '',
        table: { headers: ['기초 멤버', '기초 멤버 함수', '파생 멤버 함수', '외부 main'], rows: [['public','가능','가능','가능'],['protected','가능','가능','불가'],['private','가능','직접 불가 · 함수 이용','불가']] },
      },
      {
        title: '매개변수 목록과 초기화 목록 · 생성·소멸 순서',
        paragraphs: [
          '생성자 이름 뒤 괄호 안은 호출자가 전달한 인수를 받는 매개변수 목록이고, 콜론 뒤는 기초 클래스와 멤버를 구성하는 초기화 목록이다. const string& first로 받은 문자열을 firstName{first}로 멤버에 복사한다. 둘은 실행 역할이 다르다.',
          '파생 객체 생성은 기초 클래스 구성 → 파생 멤버 선언 순서 구성 → 파생 생성자 본문 순서다. 초기화 목록에서 순서를 바꿔 적어도 이 순서는 바뀌지 않는다. 정상 소멸은 파생 소멸자 본문 → 파생 멤버 역순 → 기초 소멸이다. 기초 생성자를 생략하면 접근 가능한 기본 생성자가 필요하다.',
        ], formula: '생성: Base → 파생 멤버 → Derived 본문\n소멸: Derived 본문 → 파생 멤버 역순 → Base', example: '', code: '',
      },
    ],
  },
  {
    id: 'gpt-oop-week6-lab', scopes: ['week6'], title: '6주차 · Lab 6 Point → Square·vector·정렬',
    sources: ['GPT · 깃허브 Lab6 공부'], location: 'Lab 6 사용자 작성 코드와 질문 / 페이지별 원본 미대조',
    recordingStatus: 'Point·Square 사용자 코드가 남아 있어 getter·면적·정렬 오류를 확인했습니다. 아래는 별도로 작성한 완성된 편집 예제입니다.', sourceStatus,
    overview: '입력 한 묶음을 하나의 Square로 만들고 vector에 모은 뒤 면적·좌표 기준으로 정렬합니다. 면적과 변 길이의 불변식이 먼저입니다.',
    sections: [
      {
        title: 'setSide 뒤에도 area=side²를 유지한다',
        paragraphs: [
          'Square는 Point의 좌표를 상속하고 이름·변 길이를 추가한다. getArea 대신 존재하지 않는 a.area()를 호출하면 컴파일 오류다. public getter를 정확한 이름으로 호출하고 const 참조 비교 함수가 const getter를 사용할 수 있도록 선언한다.',
          'area를 따로 저장한다면 생성자뿐 아니라 setSide에서도 side와 area를 함께 바꿔야 한다. 임의 setArea로 둘을 독립 변경하면 불변식이 깨진다. 아래 예제는 area를 저장하지 않고 getArea에서 side²를 계산하여 상태 불일치를 없앤다. 범위를 벗어나는 입력과 정수 곱셈 overflow도 설계에서 고려한다.',
        ], formula: 'side=3 → area=9; setSide(5) → area=25', example: '', code: '',
      },
      {
        title: '입력 성공 여부가 반복 조건이며 EOF는 종료 신호다',
        paragraphs: [
          'while(cin >> name >> x >> y >> side)는 한 묶음의 모든 입력 성공 때만 본문으로 들어간다. 입력 이름만 읽고 나머지가 실패하면 미완성 객체를 push_back하지 않는다. vector<Square>는 객체를 값으로 보유하므로 각 원소의 이름·좌표·변 길이가 함께 유지된다.',
          'Mac 터미널에서 EOF는 보통 빈 입력 줄의 Ctrl+D로 전달한다. Ctrl+Z는 EOF가 아니라 일시 중단(SIGTSTP)이다. 편집기·터미널 환경에 따라 키 전달 방식은 다를 수 있다. 숫자 형식 오류는 EOF와 구분하되 아래 작은 예제는 둘 모두 입력 종료로 처리한다.',
        ], formula: '', example: '', code: '',
      },
      {
        title: 'sort 비교 함수·size_t·출력 순서를 연결한다',
        paragraphs: [
          'sort(begin,end,compareArea)는 compareArea(a,b)가 true인 a를 b 앞에 둔다. 오름차순이면 a.getArea()<b.getArea()이며 <=를 쓰지 않는다. 같은 면적의 원소 순서는 일반 sort가 보장하지 않으므로 동률 순서가 필요하면 보조 키나 stable_sort 정책을 정한다.',
          'vector::size()가 반환하는 unsigned size_type은 보통 size_t다. 인덱스를 size_t로 두면 int와 unsigned 비교 경고를 피할 수 있지만 0에서 하나를 빼면 매우 큰 값으로 돌아간다는 점을 주의한다. 인덱스가 필요 없는 출력에는 const auto& 범위 for가 간단하다. x·y 정렬도 해당 getter의 <로 같은 방식으로 만들 수 있다.',
        ], formula: '',
        example: '완성된 편집 예제. 양수 변 길이의 작은 입력으로 학습합니다. side는 0~1,000,000으로 검증하여 제곱을 unsigned long long 안에서 계산합니다. B(변 2), A(변 3) 순으로 정렬됩니다.',
        code: '#include <algorithm>\n#include <cassert>\n#include <iostream>\n#include <string>\n#include <vector>\nclass Point {\n    int x, y;\npublic:\n    Point(int px, int py) : x{px}, y{py} {}\n    int getX() const { return x; }\n    int getY() const { return y; }\n};\nclass Square : public Point {\n    std::string name;\n    unsigned int side;\npublic:\n    Square(const std::string& n, int x, int y, unsigned int s)\n        : Point{x,y}, name{n}, side{s} {}\n    const std::string& getName() const { return name; }\n    unsigned int getSide() const { return side; }\n    unsigned long long getArea() const { return 1ULL*side*side; }\n    void setSide(unsigned int s) { side = s; }\n};\nint main() {\n    Square check{"check",0,0,3}; check.setSide(5);\n    assert(check.getArea()==25);\n    std::vector<Square> squares;\n    std::string name; int x, y; long long side;\n    while (std::cin >> name >> x >> y >> side) {\n        if (side<0 || side>1000000) continue;\n        squares.emplace_back(name,x,y,static_cast<unsigned int>(side));\n    }\n    std::sort(squares.begin(), squares.end(), [](const Square& a, const Square& b) {\n        return a.getArea() < b.getArea();\n    });\n    for (const auto& s : squares)\n        std::cout << s.getName() << "(" << s.getX() << "," << s.getY()\n                  << ") side=" << s.getSide() << " area=" << s.getArea() << "\\n";\n}',
      },
    ],
  },
  {
    id: 'gpt-oop-week7-polymorphism', scopes: ['week7'], title: '7주차 · Chap 12 p.34~45 virtual·순수 가상·소멸자',
    sources: ['GPT · 7주차 다형성 공부', 'GPT · 상속과 Virtual 비교'],
    location: 'Chap 12 p.34~45는 GPT 대화의 학습 위치 / 최신 7주차 Chap12·Lab7 파일 존재 확인',
    recordingStatus: '최신 자료 목록에서 Chap12·Lab7·7-1 전사본 존재만 확인. 해당 전사 본문과 페이지 이미지 전체는 재대조하지 않았습니다.', sourceStatus,
    overview: '상속된 함수를 그냥 호출하는 것과 기초 참조를 통한 동적 바인딩을 구분하고, 추상 클래스와 안전한 다형적 소멸을 연결합니다.',
    sections: [
      {
        title: 'virtual 호출은 실제 객체 타입을 따라간다',
        paragraphs: [
          'Base& 또는 Base*로 파생 객체를 가리킬 때 기초 함수가 virtual이면 실제 객체의 최종 override를 호출한다. virtual이 없는 일반 함수는 이 경로에서 정적 타입 기준으로 선택된다. 파생 객체를 Base 값으로 복사하면 파생 부분이 잘리는 slicing이 생기므로 다형성을 보존하려면 참조·포인터를 사용한다.',
          'override는 기초의 가상 함수를 정확히 재정의하는지 컴파일러에 검사시키는 표시다. 함수 이름뿐 아니라 매개변수와 const 여부도 맞아야 한다. 파생에서 같은 이름만 지었다고 항상 override가 되는 것은 아니다.',
        ], formula: '기초 참조·포인터 + virtual → 실제 객체의 override\n기초 값 복사 → slicing 가능', example: '', code: '',
      },
      {
        title: '같은 Base 참조에서 non-virtual과 virtual을 비교 실행한다',
        paragraphs: [
          '편집 예제에서 ref의 정적 타입은 Base&, 실제 참조 대상의 동적 타입은 Derived다. plain()은 비가상이라 Base의 구현, speak()는 가상이라 Derived의 override를 선택한다. 객체를 복사하지 않고 같은 참조로 두 호출을 비교한다.',
          '마지막 Base copy=d는 별도 값 복사다. 파생 부분이 잘린 Base 객체가 만들어져 copy.speak()도 Base를 호출한다. 처음 두 호출과 달리 실제 객체 자체가 바뀐 상황이다.',
        ], formula: 'ref.plain() → Base plain\nref.speak() → Derived virtual\ncopy.speak() → Base virtual', example: '아래는 강의 원본 복원이 아닌 독립 실행 가능한 편집 예제다.',
        table: { headers: ['호출', '정적 타입', '실제 객체 타입', '출력'], rows: [['ref.plain()', 'Base&', 'Derived', 'Base plain'], ['ref.speak()', 'Base&', 'Derived', 'Derived virtual'], ['copy.speak()', 'Base', 'Base (slicing 후)', 'Base virtual']] },
        code: '#include <iostream>\nstruct Base {\n    void plain() const { std::cout << "Base plain\\n"; }\n    virtual void speak() const { std::cout << "Base virtual\\n"; }\n    virtual ~Base() = default;\n};\nstruct Derived : Base {\n    void plain() const { std::cout << "Derived plain\\n"; }\n    void speak() const override { std::cout << "Derived virtual\\n"; }\n};\nint main() {\n    Derived d;\n    Base& ref = d;\n    ref.plain();\n    ref.speak();\n    Base copy = d;\n    copy.speak();\n}',
      },
      {
        title: '일반 가상 함수와 순수 가상 함수의 계약 차이',
        paragraphs: [
          '일반 virtual earnings()는 기초 구현을 제공하여 파생이 그대로 물려받거나 바꿀 수 있다. virtual double earnings() const = 0은 순수 가상 함수이며 그 함수를 가진 클래스는 추상 클래스라 직접 객체를 만들 수 없다. 구체 파생 클래스가 되려면 남은 순수 가상 함수를 모두 구현해야 한다.',
          'Employee가 수입 계산 인터페이스만 제공하고 CommissionEmployee가 sales*rate를 구현하는 설계를 생각할 수 있다. 순수 가상 함수도 별도 정의를 가질 수 있지만 =0이 추상성의 기준이라는 점은 유지된다. return 0인 일반 가상 함수와 =0 선언을 같은 뜻으로 읽지 않는다.',
        ], formula: '일반 virtual: 기본 구현 사용 가능\n순수 virtual (=0): 추상 인터페이스·구체 파생의 구현 필요', example: '', code: '',
      },
      {
        title: '기초 포인터로 지울 때는 가상 소멸자가 필요하다',
        paragraphs: [
          '기초 포인터로 실제 파생 객체를 delete하는 다형적 소유 관계라면 기초 소멸자를 virtual로 두어 파생 → 기초 순서로 정리되게 한다. virtual 함수가 하나 있다고 소멸자까지 자동 virtual이 되는 것은 아니다. 비가상 기초 소멸자를 통해 파생 객체를 delete하면 정의되지 않은 동작이다.',
          '생성·소멸 도중의 가상 함수 호출은 현재 구성·소멸 중인 클래스 범위로 제한되며 아직 만들어지지 않았거나 이미 사라진 파생 부분으로 동작이 올라가지 않는다. 아래는 해당 원리를 보여 주는 완성된 편집 예제이며 강의 원본 클래스 전체 구현은 아니다.',
        ], formula: '', example: '출력은 20 → Derived destroyed → Base destroyed 순서입니다.',
        code: '#include <iostream>\n#include <memory>\nstruct Employee {\n    virtual double earnings() const = 0;\n    virtual ~Employee() { std::cout << "Base destroyed\\n"; }\n};\nstruct CommissionEmployee : Employee {\n    double earnings() const override { return 100.0 * 0.2; }\n    ~CommissionEmployee() override { std::cout << "Derived destroyed\\n"; }\n};\nint main() {\n    std::unique_ptr<Employee> e = std::make_unique<CommissionEmployee>();\n    std::cout << e->earnings() << "\\n";\n}',
      },
    ],
  },
  {
    id: 'gpt-oop-week7-shape-input', scopes: ['week7'], title: 'GPT · Shape 입력 디버깅과 분기 실행 순서',
    sources: ['GPT · 상속과 Virtual 비교'], location: '사용자가 작성한 Shape·Cylinder·Sphere·Cone 입력 코드 / Lab7와의 세부 페이지 대응 미확인',
    recordingStatus: '남아 있는 사용자 코드에서 중복 cin과 독립 if·else 결합을 확인. 편집 예제는 원본 복원과 구분합니다.', sourceStatus,
    overview: '조건 안의 cin도 실제 입력입니다. 입력 추출·성공 검사·문자 비교·계산을 각각 다른 단계로 추적합니다.',
    sections: [
      {
        title: 'if (!(cin >> type))는 입력하고 성공 여부를 검사한다',
        paragraphs: [
          'cin >> type가 먼저 문자 하나를 읽어 type에 저장하고 스트림을 반환한다. !는 스트림의 실패 상태를 검사한다. 입력이 성공하면 !가 false라 break를 건너뛰지만, type 값은 이미 저장되어 뒤의 if(type==...)에서 사용할 수 있다.',
          '그 다음 cin >> type를 또 쓰면 두 번째 입력을 기다리거나 다음 토큰을 문자로 소비한다. type 조건 비교는 새 입력을 요구하지 않는다. EOF나 형식 실패 때 break하도록 읽기 위치를 루프당 한 번으로 정하면 입력이 밀리는 현상을 막을 수 있다.',
        ], formula: '문자 추출 → type 저장 → 성공/실패 판정 → 분기 비교', example: '', code: '',
      },
      {
        title: '독립 if와 else if · else는 가장 가까운 미결합 if',
        paragraphs: [
          'if(y) …; if(s) …; if(c) …; else …;에서 else는 마지막 if(c)에만 결합한다. type=y여서 첫 처리를 실행한 뒤 마지막 if(c)가 거짓이면 오류 메시지까지 실행될 수 있다. 서로 배타적인 한 가지 도형 처리는 if/else if/else 체인으로 묶는다.',
          '입력 성공 검사 if(!(cin>>type)) 뒤의 도형 체인에서 첫 if를 새로 시작해도 된다. 입력 검사 if와 도형 판별 if는 역할이 다르다. 도형 수치도 읽기에 성공했는지 검사한 뒤 계산해야 하며 4/3 정수 나눗셈 대신 4.0/3.0을 사용한다.',
          '아래 편집 예제는 한 줄을 한 도형 레코드로 입력하는 사용법을 정한다. 모르는 type이면 진단 한 번 후 줄의 나머지를 버려 다음 줄에서 다시 시작한다. 숫자 형식 실패·EOF에서는 종료한다. 유효한 실수 입력이라도 r*r*r 같은 중간 계산이 overflow할 수 있으므로 std::isfinite(volume)으로 비유한 결과를 거부하고 정상 부피처럼 출력하지 않는다.',
        ], formula: '원기둥 πr²h · 구 (4.0/3.0)πr³ · 원뿔 (1.0/3.0)πr²h',
        example: '완성된 편집 입력 예제입니다. class 계층 예제와 별도로 읽기·분기만 분리했습니다. 입력 s 0 0 0 1은 부피 4.19 한 줄을 출력합니다. 원본 코드 참조를 복원한 것이 아닙니다.',
        code: '#include <cmath>\n#include <iomanip>\n#include <iostream>\n#include <limits>\nint main() {\n    constexpr double pi = 3.141592653589793;\n    char type; double x, y, z, r, h;\n    while (std::cin >> type) {\n        double volume;\n        if (type == \'s\') {\n            if (!(std::cin >> x >> y >> z >> r)) break;\n            if (r < 0) continue;\n            volume = (4.0/3.0)*pi*r*r*r;\n        } else if (type == \'y\' || type == \'c\') {\n            if (!(std::cin >> x >> y >> z >> r >> h)) break;\n            if (r < 0 || h < 0) continue;\n            volume = pi*r*r*h;\n            if (type == \'c\') volume /= 3.0;\n        } else {\n            std::cout << "Unknown shape\\n";\n            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), \'\\n\');\n            continue;\n        }\n        if (!std::isfinite(volume)) {\n            std::cout << "Invalid volume\\n";\n            continue;\n        }\n        std::cout << std::fixed << std::setprecision(2) << volume << "\\n";\n    }\n}',
      },
    ],
  },
];

export const gptStudyNotes: (typeof studyNotes)[number][] = [
  {
    id: 'gpt-oop-q-throw', scopes: ['week3'], chapter: 'Chapter 9·Lab 3', title: 'a=0이면 누가 예외를 발생시키고 잡는가?',
    source: 'GPT · 시험 대비 공부 계획', location: '이차방정식 입력 검증 질문 / 원본 코드 참조 손실',
    questionsAsked: ['a에 0을 입력하면 catch가 실행되는 부분은 어디인지, try/catch를 따로 작성해야 하는지 물었다.'],
    explanation: ['a=0 검증과 throw를 직접 작성해야 invalid_argument를 받을 수 있다. 대응 catch가 없으면 이 예외를 이 위치에서 처리하지 못한다.', '재입력은 catch 자체의 기능이 아니라 반복문이 입력을 다시 실행한 결과다. 성공 때 탈출하고 EOF·형식 실패 처리도 따로 정한다.'],
    question: 'catch만 있고 a=0 검사·throw가 없다면 0 입력만으로 invalid_argument가 전달되는가?', answer: '아니다. 예외를 던지는 검증이 있어야 한다. 이 확인 문제는 실제 질문을 바탕으로 별도 편집했다.',
  },
  {
    id: 'gpt-oop-q-array-const', scopes: ['week5'], chapter: 'Chapter 10·Lab 5', title: 'const인데 대입 함수에서 size를 바꿔도 되는가?',
    source: 'GPT · Lab 5 복습', location: 'Array::operator= 반환형·매개변수 질문',
    questionsAsked: ['const Array& operator=(const Array& right) 안에서 size를 수정할 수 있는지 물었다.', 'new 배열과 vector·array의 차이, 배열 크기를 변경하는 방법을 물었다.'],
    explanation: ['함수 뒤에 const가 없으므로 현재 왼쪽 객체의 size·ptr는 바꿀 수 있다. 반환형 const는 돌려준 참조를 통한 수정, 인수 const는 right를 통한 수정을 제한한다.', 'new 배열은 고정된 길이의 새 저장 공간이며 크기 멤버를 자동 갱신하지 않는다. 새 배열에 복사한 다음 이전 배열 해제·주소와 size 교체를 수행한다.'],
    question: 'new double[rhs.size]를 했으면 왼쪽 size도 자동으로 바뀌는가?', answer: '아니다. 포인터 할당과 size 갱신은 별개의 문장이다. 둘이 일치해야 다음 접근이 유효하다.',
  },
  {
    id: 'gpt-oop-q-equation', scopes: ['week5'], chapter: 'Lab 5 Equation', title: '두 루프·뺄셈 부호·delete[] 순서의 실제 오답',
    source: 'GPT · 5주차 Lab5 공부하기', location: '계수 배열 대입·복합 연산 사용자 코드 확인',
    questionsAsked: ['size와 rhs.size를 각각 도는 두 반복문이 중복 계산인지 물었다.', 'delete[]와 새 포인터 교체를 앞에서 실행해야 하는지 물었다.', '왼쪽·오른쪽 모두 -=한 코드와 double rhs에 rhs.coeff[i]를 쓴 코드를 제시했다.', '임시 입력 배열도 반드시 delete[]해야 하는지 물었다.'],
    explanation: ['[1,2,4]-=[3,5]는 차수를 맞춰 [1,-1,-1]이다. 0으로 초기화한 결과에 왼쪽은 +=하고 오른쪽만 -=한다. double rhs는 숫자이므로 coeff[i]*=rhs로 곱한다.', '두 원본 배열을 모두 읽은 뒤 이전 coeff를 delete[]하고 결과 주소·크기를 교체한다. 깊은 복사 뒤 입력용 new[] 배열을 해제해도 객체 내부의 별도 배열은 유지된다.'],
    question: '첫 루프도 -=하면 [1,2,4]와 [3,5]에서 어떤 잘못된 결과가 되는가?', answer: '[-1,-5,-9]가 되어 -lhs-rhs를 계산한다. 올바른 결과는 [1,-1,-1]이다.',
  },
  {
    id: 'gpt-oop-q-getter', scopes: ['week6'], chapter: 'Chapter 11', title: '생성자 괄호·초기화 목록·getter 반환형',
    source: 'GPT · 상속 공부하기', location: 'CommissionEmployee 생성자와 getName 질문',
    questionsAsked: ['const string& first 같은 괄호 안 이름과 초기화 목록 앞부분이 무엇인지 물었다.', 'getName() const에서 이름을 cout으로 출력하는 방식으로 고쳐야 하는지 물었다.'],
    explanation: ['괄호 안은 인수를 받는 매개변수 선언이고 콜론 뒤는 기초·멤버를 구성하는 초기화 목록이다. const string&는 참조로 읽는 입력이며 멤버 string에는 그 값을 복사한다.', 'string getName() const라면 문자열을 return해야 한다. 출력만 하는 함수라면 void로 설계한다. 뒤 const는 반환형을 대신하지 않는다.'],
    question: '기초 클래스의 private name을 파생에서 바로 cout<<name으로 읽을 수 있는가?', answer: '직접 접근할 수 없다. 접근 가능한 getter 등 기초 인터페이스를 사용한다. protected라면 파생에서의 접근 조건이 달라진다.',
  },
  {
    id: 'gpt-oop-q-square', scopes: ['week6'], chapter: 'Lab 6', title: 'Square 면적 갱신·비교 함수·size_t',
    source: 'GPT · 깃허브 Lab6 공부', location: 'Point→Square 사용자 코드·인덱스 타입 질문',
    questionsAsked: ['작성한 Point·Square 코드와 면적·좌표 비교 함수를 제시하고 출력 흐름을 이어 가려 했다.', 'vector 크기를 int 대신 size_t로 받는 이유를 물었다.'],
    explanation: ['실제 코드의 setSide는 side만 바꾸어 저장된 area와 어긋날 수 있었다. area를 함께 갱신하거나 getter에서 side²를 계산한다. a.area() 대신 선언된 getArea()를 호출한다.', 'size_t는 크기 표현용 unsigned 타입이다. size()와 비교할 때 타입을 맞추되 감소 중 음수로 내려갈 수 없다는 점을 고려한다. const 참조 비교 함수와 <는 정렬 조건의 핵심이다.'],
    question: '변 3의 정사각형에서 setSide(5) 후 getArea()가 9라면?', answer: '면적 불변식이 깨졌다. 결과는 25여야 한다. setter 동시 갱신 또는 계산형 getter로 일관성을 유지한다.',
  },
  {
    id: 'gpt-oop-q-virtual', scopes: ['week7'], chapter: 'Chapter 12 p.34~45', title: '일반 가상과 순수 가상의 차이',
    source: 'GPT · 7주차 다형성 공부', location: 'CommissionEmployee·Employee 수입 계산 학습 대화',
    questionsAsked: ['CommissionEmployee 예시에서 순수 가상 함수와 일반 가상 함수가 어떻게 다른지 물었다.'],
    explanation: ['일반 virtual은 기초의 기본 구현을 사용할 수 있다. =0으로 선언한 순수 가상 함수는 추상성의 계약을 남기며 구체 파생이 되려면 필요한 override를 구현해야 한다.', '기초 포인터로 파생을 소유·삭제하는 설계에서는 기초 소멸자도 virtual이어야 한다. 함수 본문의 return 0과 선언의 =0을 혼동하지 않는다.'],
    question: 'earnings가 순수 가상인 Employee를 직접 생성할 수 있는가?', answer: '없다. 추상 클래스다. 구체 파생 객체를 생성하여 Employee 참조·포인터로 사용할 수 있다.',
  },
  {
    id: 'gpt-oop-q-shape', scopes: ['week7'], chapter: 'Shape 입력 디버깅', title: '조건 안의 cin·중복 입력·else 결합',
    source: 'GPT · 상속과 Virtual 비교', location: 'Shape·Cylinder·Sphere·Cone 사용자 입력 코드',
    questionsAsked: ['if(!(cin>>type))를 통과한 뒤 if(type==...)에는 cin이 없는데 값이 어디서 오는지 물었다.', '도형 처리를 else if로 연결하면 안 되는 이유가 있는지 물었다.'],
    explanation: ['조건 안의 cin이 실제로 type을 읽는다. 성공이면 !가 false여서 break를 건너뛰지만 type에는 이미 문자가 저장되어 있다. 뒤의 또 다른 cin은 다음 문자를 소비하는 중복 입력이다.', '서로 배타적인 도형은 if/else if/else 체인이 맞다. 독립 if 세 개 뒤의 else는 가장 가까운 마지막 if에만 결합한다. EOF는 Mac 터미널 기준 Ctrl+D이고 Ctrl+Z는 중단이다.'],
    question: 'y를 처리하는 if 뒤에 독립 if(c)…else가 있으면 오류 문구도 나올 수 있는가?', answer: '그렇다. y 처리 후 c 조건이 거짓이므로 그 else도 실행될 수 있다. 하나의 도형 선택 체인으로 묶는다.',
  },
];

export const gptScopeOptions = [
  { id: 'week3', label: '3주차 · 예외 처리 보충' },
  { id: 'week4', label: '4주차 · 전위·후위' },
  { id: 'week5', label: '5주차 · Equation·깊은 복사' },
  { id: 'week6', label: '6주차 · 상속·Lab 6' },
  { id: 'week7', label: '7주차 · 다형성·입력 디버깅' },
];
