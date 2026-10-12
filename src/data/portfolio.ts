export const profile = {
  name: "김민주",
  role: "사회복지학과 3학년",
  school: "가톨릭대학교",
  email: "kmj0503182@gmail.com",
  location: "서울 · 경기",
  photo: "/profile.jpg",
  tagline: "사람의 마음을 읽고, 기술로 해결책을 제시합니다.",
  bio: "성실함과 리더십을 바탕으로 봉사 현장을 이끌어 왔고, 당사자의 목소리를 데이터와 AI로 서비스에 담아내는 사회복지사를 꿈꿉니다.",
  headline: "세상을 다정하게 자라나게 하는\n사회복지사, 김민주",
  contactTitle: "함께 성장하는 미래를 꿈꿉니다",
  contactLead: "경청하고 실천하는 사회복지사 김민주",
};

export const contactValues = [
  { title: "경청", desc: "마음을 다해 듣겠습니다" },
  { title: "실천", desc: "행동으로 증명하겠습니다" },
];

export const vision = [
  { label: "Attitude", text: "성실함과 리더십을 겸비한 사회복지 전문가 지망생" },
  { label: "Experience", text: "현장 중심의 봉사 경험과 데이터 분석 역량 보유" },
  { label: "Vision", text: "사람의 마음을 읽고 기술로 해결책을 제시하는 인재" },
];

export const navItems = [
  { href: "#home", label: "소개", id: "home" },
  { href: "#practice", label: "봉사", id: "practice" },
  { href: "#campus", label: "교내활동", id: "campus" },
  { href: "#projects", label: "프로젝트", id: "projects" },
  { href: "#awards", label: "자격증", id: "awards" },
  { href: "#contact", label: "연락", id: "contact" },
] as const;

export const volunteerSummary = {
  label: "누적 봉사 활동",
  value: "13종",
  hint: "가톨릭대학교 대표 우수 대학생 봉사자 표창",
};

export const practicum = {
  place: "서부장애인종합복지관",
  team: "직업지원팀",
  period: "2026. 07. 06 – 07. 31",
  role: "사회복지 현장실습",
  summary:
    "14명의 실습 동기 중 실습생 대표를 맡았습니다. 직업상담과 직업능력 평가, 복지일자리 직무지도와 외부 배치처 모니터링을 경험했고, 취업자 캠프 운영과 발달장애인 보수교육을 직접 기획·진행했습니다.",
  highlights: ["직업상담 · 평가", "직무지도 · 모니터링", "교육 · 캠프 기획"],
};

export const practices = [
  {
    place: "봉사학회 ‘한뜻’",
    period: "2024 – 2025",
    role: "대표",
    tags: ["굿네이버스 협력", "행사 기획"],
    summary:
      "굿네이버스와 협력해 굿마켓 바자회 부스를 기획·운영하며 지역사회 나눔 문화를 넓혔습니다. 부천시자원봉사센터에 활동 결과보고서를 정기적으로 보내고, MT 기획과 진행도 맡았습니다.",
  },
  {
    place: "기관동아리 ‘까리따스’ 봉사단",
    period: "2025 – 2026",
    role: "단장",
    tags: ["창단 10주년", "조직 운영"],
    summary:
      "천원의 아침밥, 무료급식소, 연탄·쌀·해양 봉사를 이끌었습니다. 창단 10주년 행사를 총괄 기획했고, 노션·드라이브·타임트리로 단원 인사와 예산을 체계적으로 관리했습니다.",
  },
  {
    place: "지역 복지기관 봉사",
    period: "2025 – 2026",
    role: "현장",
    tags: ["장애인가족", "노인복지"],
    summary:
      "금천장애인가족복지센터 봉사와 원미노인복지관 케어뱅크 말벗 봉사에 참여하며, 당사자 곁에서 듣고 함께하는 시간이 돌봄의 출발점이라는 것을 배웠습니다.",
  },
];

export const volunteers = [
  {
    title: "어린이식당 · 줍깅 · 키트봉사",
    org: "봉사학회 한뜻",
    period: "2024",
    note: "유기견 목도리 뜨기 키트봉사와 지역 줍깅",
  },
  {
    title: "해외아동 컬러링북 · 벤치 봉사",
    org: "까리따스 봉사단",
    period: "2025",
    note: "나눔 콘텐츠 제작과 환경 개선 봉사",
  },
  {
    title: "추계학술대회 운영 봉사",
    org: "사회복지질적연구회",
    period: "2025",
    note: "학술대회 현장 운영 지원",
  },
];

export const strengths = [
  { title: "리더십", desc: "봉사학회 한뜻 대표, 까리따스 봉사단 단장으로 조직을 이끎" },
  { title: "기획력", desc: "10주년 행사, 바자회 부스, MT·새로배움터를 주체로 기획" },
  { title: "콘텐츠 제작", desc: "회칙 안내 카드뉴스, 리더십 캠프 PPT, 각종 발표 자료 제작" },
  { title: "조직 관리", desc: "회칙 개정, 예산안 작성, 노션 기반 인사 관리" },
];

export const gpa = [
  { year: "1학년", value: 4.08 },
  { year: "2학년", value: 4.11 },
  { year: "3학년", value: 4.33 },
];

export const campusActivities = [
  {
    title: "총학생회 자치협력국 차장",
    date: "2024",
    desc: "총학생회칙 개정과 안내 가이드 카드뉴스 제작, 전체학생전학대회 집행위원을 맡았습니다.",
    color: "bg-accent",
  },
  {
    title: "학생 행사 기획 · 운영 주체",
    date: "2024 – 2025",
    desc: "새내기새로배움터, 농촌체험봉사, 체육대회·일일호프, 축제 주점 운영을 주체로 이끌었습니다.",
    color: "bg-forest",
  },
  {
    title: "학부대학 교내 인턴십",
    date: "2025 · 1년",
    desc: "학부대학에서 1년간 행정 업무를 경험했습니다.",
    color: "bg-emerald-300",
  },
  {
    title: "고등학교 진로멘토링",
    date: "2025 · 4회",
    desc: "사회복지 전공을 고민하는 고등학생에게 진로 경험을 나눴습니다.",
    color: "bg-teal-400",
  },
  {
    title: "사회복지학과 선거관리위원",
    date: "2025",
    desc: "학과 선거의 공정한 운영을 맡았고, 농구동아리 바스타즈에서도 활동하고 있습니다.",
    color: "bg-emerald-500",
  },
];

export const projects: {
  title: string;
  period: string;
  summary: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  link?: string;
}[] = [
  {
    title: "출근길 3GO 보수교육 콘텐츠",
    period: "2026 · 현장실습",
    summary:
      "발달장애인 복장·청결 보수교육을 기획·진행·평가했습니다. ‘상황에 맞는 옷 입히기 게임’과 ‘나의 미래 모습 상상하기’를 AI 바이브코딩으로 직접 만들었습니다.",
    tags: ["발달장애", "참여형 교육", "바이브코딩"],
  },
  {
    title: "정신장애인 플랫폼 캡스톤 디자인",
    period: "2026",
    summary:
      "한국정신장애인자립생활센터를 방문해 당사자 심층 인터뷰를 진행하고, 이를 바탕으로 핵심 니즈를 도출해 서비스를 기획했습니다.",
    tags: ["정신건강", "당사자 인터뷰", "서비스 기획"],
  },
  {
    title: "장애인 고용 플랫폼: 인공지능 캡스톤",
    period: "2026",
    summary:
      "인공지능 기반 장애인 직무적성검사 플랫폼을 기획하고 구현했습니다. CUK 혁신아이디어 경진대회에서 장려상을 받았습니다.",
    tags: ["장애인 고용", "AI", "웹앱"],
  },
  {
    title: "장애학생지원센터 시설 조사 웹앱",
    period: "2026",
    summary:
      "교내 장애학생지원센터와 관련된 시설 정보를 조사하고, 이를 누구나 쉽게 확인할 수 있는 웹앱으로 구축했습니다.",
    tags: ["접근성", "시설 조사", "웹앱"],
  },
];

export const awards = [
  { title: "우수 대학생 봉사자 표창", org: "가톨릭대학교 대표", year: "2025", type: "수상" },
  { title: "CUK 혁신아이디어 경진대회 장려상", org: "CU12 창업캡스톤디자인", year: "2026", type: "수상" },
  { title: "헐트프라이즈 Local Competition 장려상", org: "창업경진대회", year: "2025", type: "수상" },
  { title: "사회복지전공 연합학술제 장려상", org: "사회복지전공 연합", year: "2024", type: "수상" },
  { title: "전자책 다독상 2등 · 3등", org: "가톨릭대학교", year: "2024 – 2025", type: "수상" },
  { title: "소화장학생 선정", org: "가톨릭대학교", year: "2025", type: "장학" },
  { title: "ADsP 데이터분석준전문가", org: "한국데이터산업진흥원", year: "2026", type: "자격" },
  { title: "컴퓨터활용능력 1급 필기 합격", org: "대한상공회의소", year: "2025", type: "자격" },
  { title: "수화의 이해 기초반 수료", org: "가톨릭대학교", year: "2026", type: "수료" },
];

export const skills = [
  { label: "Data", title: "데이터 분석", desc: "ADsP 취득" },
  {
    label: "AI",
    title: "AI 활용",
    desc: "ChatGPT, Gemini, Claude, Perplexity, NotebookLM · Google AI Studio 바이브코딩으로 웹앱 구현",
  },
  { label: "Content", title: "콘텐츠 제작", desc: "캡컷, 미드저니, 감마 AI, 미리캔버스, Suno AI" },
  { label: "Collab", title: "협업 도구", desc: "노션, 구글 드라이브, 타임트리" },
];
