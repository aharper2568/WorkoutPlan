
const workoutPlan = [
  {
    id: "A",
    title: "Day A",
    subtitle: "Anterior chain",
    exercises: [
      {
        name: "Goblet Squat",
        video: "https://www.youtube.com/watch?v=gCESNsDsbqk",
        sets: 3,
        reps: "10–12",
        rest: "60 sec"
      },
      {
        name: "Dumbbell Bench Press",
        video: "https://www.youtube.com/watch?v=O7ECGhZj_Hc",
        sets: 4,
        reps: "8–10",
        rest: "60 sec"
      },
      {
        name: "Dumbbell Lunges",
        video: "https://www.youtube.com/watch?v=lf4gJgKyLpI",
        sets: 3,
        reps: "12 each leg",
        rest: "60 sec"
      },
      {
        name: "Overhead Press",
        video: "https://www.youtube.com/watch?v=-Xa2xYhPl-0",
        sets: 3,
        reps: "8–10",
        rest: "75 sec"
      },
      {
        name: "Overhead Triceps Extension",
        video: "https://www.youtube.com/results?search_query=dumbbell+overhead+triceps+extension+form",
        sets: 3,
        reps: "8–10",
        rest: "75 sec"
      }
    ]
  },
  {
    id: "B",
    title: "Day B",
    subtitle: "Posterior chain",
    exercises: [
      {
        name: "Romanian Deadlift",
        video: "https://www.youtube.com/results?search_query=romanian+deadlift+form",
        sets: 3,
        reps: "8–10",
        rest: "90 sec"
      },
      {
        name: "One-Arm Dumbbell Row",
        video: "https://www.youtube.com/results?search_query=one+arm+dumbbell+row+form",
        sets: 4,
        reps: "10 each arm",
        rest: "60 sec"
      },
      {
        name: "Lat Pulldown",
        video: "https://www.youtube.com/results?search_query=lat+pulldown+form",
        sets: 3,
        reps: "8–10",
        rest: "75 sec"
      },
      {
        name: "Seated Biceps Curl",
        video: "https://www.youtube.com/results?search_query=seated+biceps+curl+form",
        sets: 2,
        reps: "10-12",
        rest: "45 sec"
      },{
        name: "Glute Bridge",
        video: "https://www.youtube.com/results?search_query=glute+bridge+form",
        sets: 3,
        reps: "10-12",
        rest: "60 sec"
      }
    ]
  }
];


function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}


function buildCollapsible(toggleClass, labelNodes, contentNode, idPrefix) {
  const button = el("button", toggleClass);
  button.type = "button";
  button.id = idPrefix + "-btn";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", idPrefix + "-panel");
  labelNodes.forEach((n) => button.appendChild(n));
  button.appendChild(el("span", "chevron"));

  const panel = el("div", "panel");
  panel.id = idPrefix + "-panel";
  panel.setAttribute("role", "region");
  panel.setAttribute("aria-labelledby", button.id);
  const inner = el("div", "panel-inner");
  inner.appendChild(contentNode);
  panel.appendChild(inner);

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    panel.classList.toggle("open", !isOpen);
   
    inner.inert = isOpen;
  });
  inner.inert = true;

  return { button, panel };
}

function buildStat(label, value) {
  const wrap = el("div", "stat");
  wrap.appendChild(el("dt", null, label));
  wrap.appendChild(el("dd", null, String(value)));
  return wrap;
}

function buildExerciseDetails(exercise) {
  const details = el("div", "details");
  details.appendChild(el("h3", "exercise-name", exercise.name));

  const stats = el("dl", "stats");
  stats.appendChild(buildStat("Sets", exercise.sets));
  stats.appendChild(buildStat("Reps", exercise.reps));
  stats.appendChild(buildStat("Rest", exercise.rest));
  details.appendChild(stats);

  const link = el("a", "video-link", "Watch demo video");
  link.href = exercise.video;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  details.appendChild(link);

  return details;
}

function buildDay(day) {
  const section = el("section", "day");
  section.dataset.day = day.id;

  const list = el("div", "exercise-list");
  day.exercises.forEach((exercise, i) => {
    const item = el("div", "exercise");
    const { button, panel } = buildCollapsible(
      "exercise-toggle",
      [el("span", null, exercise.name)],
      buildExerciseDetails(exercise),
      `day-${day.id}-ex-${i}`
    );
    item.appendChild(button);
    item.appendChild(panel);
    list.appendChild(item);
  });

  const heading = el("span");
  heading.appendChild(el("span", "day-title", day.title));
  if (day.subtitle) heading.appendChild(el("span", "day-sub", day.subtitle));

  const { button, panel } = buildCollapsible(
    "day-toggle",
    [heading],
    list,
    `day-${day.id}`
  );
  section.appendChild(button);
  section.appendChild(panel);
  return section;
}

const planRoot = document.getElementById("plan");
workoutPlan.forEach((day) => planRoot.appendChild(buildDay(day)));
