// in this file we are adressing the no repeated code and functions that are used 
// in multiple places in the narrator pages, so we can keep the 
// code simple and avoid repeating ourselves, 
// this is a good practice to keep the code clean and maintainable

import { COMMISSION_RATE } from "../data/narratorData";
 // constraints from requirements for the narrator's submission, that only this file uses
const ALLOWED_EXTENSIONS = ["mp3", "wav"];
const ALLOWED_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/wave",
  "audio/vnd.wave"
];

// step by step checks if the file is valid, first checks if the file is selected,
//  then checks if the file type is valid, 
// then checks if the file size is valid, 
// and returns an error message if any of the checks fail, 
// otherwise returns an empty string
export function validateAudioFile(file, maxMb) {
  if (!file) {
    return "يرجى اختيار ملف صوتي.";
  }

  const extension = file.name.split(".").pop().toLowerCase();
  const typeOk = !file.type || ALLOWED_TYPES.includes(file.type);

  if (!ALLOWED_EXTENSIONS.includes(extension) || !typeOk) {
    return "صيغة الملف غير مدعومة. الصيغ المسموحة: MP3 أو WAV.";
  }

  if (file.size === 0) {
    return "الملف فارغ.";
  }

  if (file.size > maxMb * 1024 * 1024) {
    return `حجم الملف أكبر من الحد المسموح (${maxMb} ميجابايت).`;
  }

  return "";
}
// formats the file size in bytes to MB or KB
export function formatSize(bytes) {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)}MB` : `${Math.ceil(bytes / 1024)}KB`;
}

// formats the date to a readable format in Arabic, using the Gregorian calendar and Arabic numerals
const dateFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-gregory-nu-latn", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

export function formatDate(value) {
  if (!value) return "—";
  return dateFormatter.format(new Date(value));
}

// formats the date to a relative format in Arabic, 
// using the Gregorian calendar and Arabic numerals
export function formatRelative(value) {
  if (!value) return "—";

  const minutes = Math.floor((Date.now() - new Date(value)) / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "الآن";
  if (minutes < 60) return `منذ ${minutes} دقيقة`;
  if (hours < 24) return hours <= 2 ? "منذ ساعتين" : `منذ ${hours} ساعات`;
  if (days === 1) return "أمس";
  if (days < 7) return `منذ ${days} أيام`;
  return formatDate(value);
}

// formats the amount to a readable format in Arabic,
//  using the Saudi Riyal currency and Arabic numerals
export function formatMoney(amount) {
  return `${Math.round(amount).toLocaleString("en-US")} ر.س`;
}

// splits the payment into commission and net amount, 
// using the COMMISSION_RATE constant
export function splitPayment(fee) {
  const commission = fee * COMMISSION_RATE;
  return { commission, net: fee - commission };
}

//just an object to map the status of the audition to a label
// and a tone which is used for color later in the css code
export const AUDITION_STATUS = {
  Pending: { label: "قيد المراجعة", tone: "pending" },
  Accepted: { label: "مقبولة", tone: "success" },
  Rejected: { label: "غير مختارة", tone: "danger" }
};

//function to get the status of the assignment and return where it is at during the process of waiting for approval or rejection
export function assignmentStatus(assignment) {
  switch (assignment.status) {
    case "in-progress":
      return { label: `التسجيل جارٍ · ${assignment.progress}%`, tone: "info" };
    case "changes-requested":
      return { label: "تعديلات مطلوبة", tone: "pending" };
    case "delivered":
      return { label: "بانتظار مراجعة المؤلف", tone: "info" };
    case "completed":
      return { label: "مكتمل", tone: "success" };
    default:
      return { label: "تم الاعتذار", tone: "muted" };
  }
}

const LATE_AFTER_DAYS = 7;

// function to get the payment status of the assignment and return where it is at during the process of waiting for payment 
export function paymentStatus(assignment) {
  if (assignment.status === "completed" && assignment.paidAt) {
    return { key: "paid", label: "تم التحويل", tone: "success" };
  }

  if (assignment.status === "delivered") {
    const lastUpload = assignment.recordings.at(-1)?.uploadedAt;
    const daysWaiting = (Date.now() - new Date(lastUpload)) / 86400000;

    if (daysWaiting > LATE_AFTER_DAYS) {
      return { key: "late", label: "متأخر", tone: "danger" };
    }
    return { key: "processing", label: "قيد المعالجة", tone: "pending" };
  }

  return { key: "upcoming", label: "لم تستحق بعد", tone: "muted" };
}

//makes a unique id for new uploads 
export function newId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}