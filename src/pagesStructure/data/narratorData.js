
// drop down menu items for browsing / profile screens so they have the exact same ones
export const GENRES = ["رواية", "رواية تاريخية", "أدب اجتماعي", "سيرة ذاتية", "قصص قصيرة", "أدب أطفال"];

export const DIALECTS = ["العربية الفصحى", "نجدية", "حجازية", "خليجية", "مصرية", "شامية"];

export const VOICE_STYLES = ["دافئ", "هادئ", "درامي", "عميق", "قصصي", "وثائقي", "شبابي"];

// the numbers we had in the requirements as a standard for the narrator's submission
export const COMMISSION_RATE = 0.15;

export const SAMPLE_MAX_MB = 50;
export const RECORDING_MAX_MB = 500;

// this is fake data for testing purposes, in a real application this data would be fetched from a backend API but as this submission we are only doing the front end it is almost like a demo of what this would be when the data is realistic yk
export const projects = [
  {
    id: "p1",
    title: "رحلة إلى الأندلس",
    author: "سارة العتيبي",
    genre: "رواية تاريخية",
    dialect: "العربية الفصحى",
    voiceStyle: "درامي",
    gender: "أي",
    chapters: 14,
    hours: 8,
    fee: 6500,
    deadline: "2026-12-30",
    postedAt: "2026-11-10",
    approved: true,
    open: true,
    description: "عمل عربي أصيل يبحث عن صوت واضح ودافئ يوازن بين السرد والحوار.",
    passage: "وقف على أسوار غرناطة يتأمل المدينة النائمة، وفي صدره سؤال لم يجرؤ أحد على طرحه منذ قرون...",
    instructions: "اقرأ المقطع بنبرة تأملية مع إبراز التحول العاطفي في الجملة الأخيرة. المدة من دقيقة إلى ثلاث دقائق."
  },
  {
    id: "p2",
    title: "مرافئ بعيدة",
    author: "مجد الثبيتي",
    genre: "سيرة ذاتية",
    dialect: "العربية الفصحى",
    voiceStyle: "دافئ",
    gender: "أي",
    chapters: 20,
    hours: 12,
    fee: 5500,
    deadline: "2026-12-24",
    postedAt: "2026-11-06",
    approved: true,
    open: true,
    description: "سيرة بحّار قضى ثلاثين عاماً بين موانئ الخليج والمحيط الهندي.",
    passage: "في الليلة الأولى على السفينة لم أنم، كنت أعدّ النجوم وأخاف أن ينقص منها نجم...",
    instructions: "سرد دافئ بإيقاع هادئ، كأنك تحكي ذكرياتك الشخصية."
  },
  {
    id: "p3",
    title: "أصوات من الذاكرة",
    author: "فاطمة القديحي",
    genre: "قصص قصيرة",
    dialect: "شامية",
    voiceStyle: "قصصي",
    gender: "أنثى",
    chapters: 9,
    hours: 6,
    fee: 4200,
    deadline: "2027-01-15",
    postedAt: "2026-11-12",
    approved: true,
    open: true,
    description: "قصص قصيرة عن أحياء دمشق القديمة وحكايات أهلها.",
    passage: "في حارتنا القديمة كان صوت بائع العرقسوس يسبق الفجر، وكانت الأبواب تُفتح على رائحة الياسمين...",
    instructions: "أداء قصصي مع تمييز صوت كل شخصية في الحوار."
  },
  {
    id: "p4",
    title: "أرنوب يتعلم الصبر",
    author: "رغد مريح",
    genre: "أدب أطفال",
    dialect: "العربية الفصحى",
    voiceStyle: "شبابي",
    gender: "أي",
    chapters: 4,
    hours: 2,
    fee: 1500,
    deadline: "2026-12-10",
    postedAt: "2026-11-08",
    approved: true,
    open: true,
    description: "قصة للأطفال من 4 إلى 7 سنوات عن قيمة الصبر.",
    passage: "قفز أرنوب فوق العشب وصاح: أريد الجزرة الآن! فضحكت السلحفاة وقالت: الجزرة الطيبة تحتاج وقتاً...",
    instructions: "صوت مرح وواضح، مع تغيير نبرة كل شخصية."
  },
  {
    id: "p5",
    title: "بيت في الأحساء",
    author: "شهد الزهراني",
    genre: "أدب اجتماعي",
    dialect: "خليجية",
    voiceStyle: "هادئ",
    gender: "ذكر",
    chapters: 16,
    hours: 9,
    fee: 4800,
    deadline: "2027-01-05",
    postedAt: "2026-10-30",
    approved: true,
    open: true,
    description: "حكاية عائلة عبر ثلاثة أجيال في بيت واحد.",
    passage: "كانت جدتي تقول إن النخلة لا تنحني إلا لمن سقاها، وكنت أظن ذلك حكاية حتى رأيت أبي...",
    instructions: "الحوار باللهجة الخليجية والسرد بالفصحى."
  },
  {
    id: "p6",
    title: "ظلال النخيل",
    author: "سارة العتيبي",
    genre: "أدب اجتماعي",
    dialect: "نجدية",
    voiceStyle: "دافئ",
    gender: "أي",
    chapters: 18,
    hours: 10,
    fee: 6000,
    deadline: "2026-12-12",
    postedAt: "2026-09-15",
    approved: true,
    open: false,
    description: "رواية عن عائلة نجدية بين الماضي والحاضر.",
    passage: "كان الظل تحت النخلة أوسع من البيت كله...",
    instructions: "نبرة دافئة وإيقاع متوسط."
  },
  {
    id: "p7",
    title: "حكايات البحر",
    author: "رغد مريح",
    genre: "أدب أطفال",
    dialect: "خليجية",
    voiceStyle: "قصصي",
    gender: "أي",
    chapters: 5,
    hours: 3,
    fee: 2500,
    deadline: "2026-11-28",
    postedAt: "2026-09-01",
    approved: true,
    open: false,
    description: "حكايات بحّارة الخليج للأطفال.",
    passage: "ركب سالم السفينة مع جده لأول مرة...",
    instructions: "صوت مرح مع أداء أصوات البحّارة."
  },
  {
    id: "p8",
    title: "مدن لا تنام",
    author: "مجد الثبيتي",
    genre: "رواية",
    dialect: "العربية الفصحى",
    voiceStyle: "عميق",
    gender: "أي",
    chapters: 12,
    hours: 7,
    fee: 4000,
    deadline: "2026-10-30",
    postedAt: "2026-08-10",
    approved: true,
    open: false,
    description: "رواية عن ليالي المدن الكبيرة ومن يسهرون فيها.",
    passage: "كانت الأضواء أكثر من النجوم، والوحدة أكبر من المدينة...",
    instructions: "صوت عميق مع وقفات واضحة."
  },
  {
    id: "p9",
    title: "شرفة على البحر",
    author: "فاطمة القديحي",
    genre: "رواية",
    dialect: "حجازية",
    voiceStyle: "هادئ",
    gender: "أنثى",
    chapters: 10,
    hours: 6,
    fee: 3800,
    deadline: "2026-11-20",
    postedAt: "2026-09-20",
    approved: true,
    open: false,
    description: "رواية عن صيف في جدة القديمة.",
    passage: "من الشرفة كان البحر يبدو قريباً بما يكفي لنلمسه...",
    instructions: "سرد هادئ باللهجة الحجازية في الحوار."
  },
  {
    id: "p10",
    title: "مسودة غير معتمدة",
    author: "مؤلف تجريبي",
    genre: "رواية",
    dialect: "العربية الفصحى",
    voiceStyle: "هادئ",
    gender: "أي",
    chapters: 6,
    hours: 4,
    fee: 2000,
    deadline: "2027-02-01",
    postedAt: "2026-11-13",
    approved: false,
    open: true,
    description: "",
    passage: "",
    instructions: ""
  }
];
// function to find a project by its ID
export function findProject(id) {
  return projects.find((project) => project.id === id);
}
//when the narrator logs in for the first time, we create a default state for them with empty profile fields and some sample data for them to see how the data would look like when it is realistic, this is just for testing purposes and in a real application this data would be fetched from a backend API
export function createInitialState(session) {
  return {
    profile: {
      name: session?.name || "",
      email: session?.email || "",
      phone: "",
      city: "",
      photo: "",
      bio: "",
      dialects: [],
      voiceStyles: [],
      gender: "",
      experience: ""
    },
    samples: [
      {
        id: "s1",
        title: "رواية تاريخية · أداء درامي",
        fileName: "sample-historical.mp3",
        size: 3.2 * 1024 * 1024,
        uploadedAt: "2026-10-12T10:00:00.000Z",
        primary: true
      },
      {
        id: "s2",
        title: "أدب الرحلات · سرد هادئ",
        fileName: "sample-travel.mp3",
        size: 4.2 * 1024 * 1024,
        uploadedAt: "2026-10-13T10:00:00.000Z",
        primary: false
      }
    ],
    auditions: [
      { id: "a1", projectId: "p1", fileName: "audition-andalus.mp3", submittedAt: "2026-11-12T14:20:00.000Z", updatedAt: "2026-11-12T14:20:00.000Z", status: "Pending" },
      { id: "a2", projectId: "p6", fileName: "audition-nakheel.mp3", submittedAt: "2026-09-20T18:30:00.000Z", updatedAt: "2026-09-25T10:00:00.000Z", status: "Accepted" },
      { id: "a3", projectId: "p9", fileName: "audition-shurfa.wav", submittedAt: "2026-09-28T09:00:00.000Z", updatedAt: "2026-10-05T12:00:00.000Z", status: "Rejected" }
    ],
    assignments: [
      { projectId: "p6", status: "in-progress", progress: 65, recordings: [], authorComment: "", paidAt: null },
      {
        projectId: "p7",
        status: "changes-requested",
        progress: 100,
        recordings: [{ id: "r1", fileName: "bahr-ch1-5.mp3", size: 180 * 1024 * 1024, uploadedAt: "2026-11-05T12:00:00.000Z" }],
        authorComment: "طلب المؤلف إعادة تسجيل جزء من الفصل الثاني بسبب صدى في الخلفية.",
        paidAt: null
      },
      {
        projectId: "p8",
        status: "completed",
        progress: 100,
        recordings: [{ id: "r2", fileName: "mudun-full.wav", size: 240 * 1024 * 1024, uploadedAt: "2026-10-20T08:00:00.000Z" }],
        authorComment: "",
        paidAt: "2026-10-28T11:00:00.000Z"
      }
    ],
    notifications: [
      { id: "n1", title: "طلب تعديل", text: "طلب المؤلف تعديلات على «حكايات البحر».", at: "2026-11-07T09:00:00.000Z" },
      { id: "n2", title: "تم قبول تجربتك", text: "اختارك المؤلف لمشروع «ظلال النخيل».", at: "2026-09-25T10:00:00.000Z" },
      { id: "n3", title: "تم التحويل", text: "تم تحويل مستحقاتك عن «مدن لا تنام».", at: "2026-10-28T11:00:00.000Z" }
    ]
  };
}