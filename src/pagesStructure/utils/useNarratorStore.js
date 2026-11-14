import { useEffect, useMemo, useState } from "react";
import { createInitialState, findProject } from "../data/narratorData";
import { newId } from "./narratorHelpers";

//local storage cannot store blob or file objects, 
// so we store the audio files in memory 
// and use object urls to play them.
const audioUrls = new Map();

export function getAudioUrl(id) {
  return audioUrls.get(id) || "";
}
//he data is saved per account, u
// sing the email in the key, so narrators on the same 
// browser don’t see each other’s data. On start it tries to load 
// the saved data; if there’s none or it’s corrupted (try/catch), 
// it falls back to the initial demo state

function storageKey(email) {
  return `rawiNarrator:${email}`;
}

function loadState(session) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(session.email)) || "null");
    if (saved && saved.profile) return saved;
  } catch {
    // ignore broken data
  }
  return createInitialState(session);
}

export function useNarratorStore(session) {
  const { name, email } = session;
  const [state, setState] = useState(() => loadState(session));

  //all narrator data lives in one state object. 
  // The lazy initializer loads it only once.
  //  The useEffect runs whenever the state changes and
  //  writes it to localStorage, so data survives a refresh.
  useEffect(() => {
    try {
      localStorage.setItem(storageKey(email), JSON.stringify(state));
    } catch {
      // storage full or blocked
    }
  }, [state, email]);

//every change goes through setState(prev => ...) 
// and builds a new object with spread, map and 
// filter, never editing the old one, so React detects 
// the change and re-renders. useMemo creates these functions 
// once per user instead of on every render.
  const actions = useMemo(() => {
    const addNotification = (prev, title, text) => [
      { id: newId("n"), title, text, at: new Date().toISOString() },
      ...prev.notifications
    ];

    return {
      saveProfile(profile) {
        setState((prev) => ({ ...prev, profile }));
      },

      addSample(title, file) {
        const id = newId("s");
        audioUrls.set(id, URL.createObjectURL(file));

        setState((prev) => ({
          ...prev,
          samples: [
            {
              id,
              title,
              fileName: file.name,
              size: file.size,
              uploadedAt: new Date().toISOString(),
              primary: prev.samples.length === 0
            },
            ...prev.samples
          ]
        }));
      },

      setPrimarySample(id) {
        setState((prev) => ({
          ...prev,
          samples: prev.samples.map((sample) => ({
            ...sample,
            primary: sample.id === id
          }))
        }));
      },

      removeSample(id) {
        const url = audioUrls.get(id);
        if (url) URL.revokeObjectURL(url);
        audioUrls.delete(id);

        setState((prev) => {
          const remaining = prev.samples.filter((sample) => sample.id !== id);
          if (remaining.length > 0 && !remaining.some((s) => s.primary)) {
            remaining[0] = { ...remaining[0], primary: true };
          }
          return { ...prev, samples: remaining };
        });
      },

      submitAudition(projectId, file, note) {
        const id = newId("a");
        const now = new Date().toISOString();
        audioUrls.set(id, URL.createObjectURL(file));
        const project = findProject(projectId);

        setState((prev) => ({
          ...prev,
          auditions: [
            {
              id,
              projectId,
              fileName: file.name,
              note,
              submittedAt: now,
              updatedAt: now,
              status: "Pending"
            },
            ...prev.auditions
          ],
          notifications: addNotification(
            prev,
            "تم إرسال تجربة أداء",
            `أرسلت تجربتك لمشروع «${project.title}».`
          )
        }));
      },

      uploadRecordings(projectId, files) {
        const project = findProject(projectId);
        const uploadedAt = new Date().toISOString();

        const recordings = files.map((file) => {
          const id = newId("r");
          audioUrls.set(id, URL.createObjectURL(file));
          return { id, fileName: file.name, size: file.size, uploadedAt };
        });

        setState((prev) => ({
          ...prev,
          assignments: prev.assignments.map((item) =>
            item.projectId === projectId
              ? {
                  ...item,
                  status: "delivered",
                  progress: 100,
                  authorComment: "",
                  recordings: [...item.recordings, ...recordings]
                }
              : item
          ),
          notifications: addNotification(
            prev,
            "تم رفع تسجيل",
            `سُلّمت تسجيلات «${project.title}» للمؤلف للمراجعة.`
          )
        }));
      },

      declineProject(projectId) {
        const project = findProject(projectId);

        setState((prev) => ({
          ...prev,
          assignments: prev.assignments.map((item) =>
            item.projectId === projectId ? { ...item, status: "declined" } : item
          ),
          notifications: addNotification(
            prev,
            "تم الاعتذار عن مشروع",
            `أُعيد فتح «${project.title}» للتجارب وتم إبلاغ المؤلف.`
          )
        }));
      },

      clearNotifications() {
        setState((prev) => ({ ...prev, notifications: [] }));
      },

      resetDemo() {
        setState(createInitialState({ name, email }));
      }
    };
  }, [name, email]);

  return { state, ...actions };
}

// extra notes on the narrator store:
//the first uploaded sample becomes the main one,
//  and deleting the main one promotes another, 
// so there’s always exactly one main sample
// uploading recordings sets the project to
//  “delivered” and clears the author’s comment
