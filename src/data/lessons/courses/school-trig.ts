import { makeLesson } from "../../makeLesson";
import type { Lesson } from "../../../types";

export const lessons: Lesson[] = [
  makeLesson("school-trig", 1, "Тригонометрический круг", {
    theory: String.raw`Единичная окружность (тригонометрический круг) — окружность радиуса $1$ с центром в начале координат. Угол $\alpha$ откладывают от луча $Ox$ против часовой стрелки; соответствующей точке приписывают координаты $(\cos\alpha;\,\sin\alpha)$. Таким образом, косинус — абсцисса, синус — ордината.

Радианная мера: развёрнутый угол равен $\pi$, полный оборот — $2\pi$. Стандартные углы: $0$, $\dfrac{\pi}{6}$, $\dfrac{\pi}{4}$, $\dfrac{\pi}{3}$, $\dfrac{\pi}{2}$, $\pi$, $\dfrac{3\pi}{2}$, $2\pi$.

Знаки функций по четвертям: в I все положительны; во II положителен синус; в III — тангенс (и котангенс); в IV — косинус. Тангенс $\tan\alpha=\dfrac{\sin\alpha}{\cos\alpha}$ не определён, когда $\cos\alpha=0$, то есть при $\alpha=\dfrac{\pi}{2}+\pi k$, где $k$ — любое целое число.`,
    examples: [
      {
        title: "Координаты точки на круге",
        problem: String.raw`Найдите координаты точки единичной окружности, соответствующей углу $\dfrac{\pi}{3}$.`,
        solution: String.raw`$\cos\dfrac{\pi}{3}=\dfrac{1}{2}$, $\sin\dfrac{\pi}{3}=\dfrac{\sqrt{3}}{2}$. Точка $\left(\dfrac{1}{2};\,\dfrac{\sqrt{3}}{2}\right)$.`,
      },
      {
        title: "Знак в четверти",
        problem: String.raw`Определите знак $\sin\alpha$, если угол $\alpha$ лежит в третьей четверти.`,
        solution: String.raw`В III четверти ординаты точек отрицательны, поэтому $\sin\alpha<0$.`,
      },
    ],
    sample: {
      id: "tr01-s",
      type: "open",
      prompt: String.raw`Найдите $\sin\dfrac{\pi}{2}$.`,
      accepted: ["1", "1.0"],
      explanation: String.raw`Точка $\dfrac{\pi}{2}$ имеет координаты $(0;1)$, ордината равна $1$.`,
      solution: String.raw`Углу $\dfrac{\pi}{2}$ на единичной окружности соответствует точка $(0;1)$. Синус — ордината этой точки, следовательно $\sin\dfrac{\pi}{2}=1$.`,
    },
    problems: [
      {
        id: "tr01-q1",
        type: "choice",
        prompt: String.raw`На единичной окружности косинус угла — это`,
        options: [
          "ордината точки",
          "абсцисса точки",
          "радиус окружности",
          "длина дуги",
        ],
        answerIndex: 1,
        explanation: String.raw`По определению $\cos\alpha$ — абсцисса точки круга.`,
      },
      {
        id: "tr01-q2",
        type: "open",
        prompt: String.raw`Найдите $\cos 0$.`,
        accepted: ["1", "1.0"],
        explanation: String.raw`Точка угла $0$ есть $(1;0)$, абсцисса равна $1$.`,
      },
      {
        id: "tr01-q3",
        type: "choice",
        prompt: String.raw`В какой четверти синус положителен, а косинус отрицателен?`,
        options: ["I", "II", "III", "IV"],
        answerIndex: 1,
        explanation: String.raw`II четверть: $x<0$, $y>0$.`,
      },
      {
        id: "tr01-q4",
        type: "open",
        prompt: String.raw`Найдите $\sin\pi$.`,
        accepted: ["0", "0.0"],
        explanation: String.raw`Точка $\pi$ есть $(-1;0)$, ордината равна $0$.`,
      },
      {
        id: "tr01-q5",
        type: "choice",
        prompt: String.raw`Тангенс не определён, когда`,
        options: [
          String.raw`$\sin\alpha=0$`,
          String.raw`$\cos\alpha=0$`,
          String.raw`$\alpha=0$`,
          String.raw`$\alpha=\pi$`,
        ],
        answerIndex: 1,
        explanation: String.raw`$\tan\alpha=\dfrac{\sin\alpha}{\cos\alpha}$; знаменатель равен нулю при $\cos\alpha=0$.`,
      },
      {
        id: "tr01-q6",
        type: "open",
        prompt: String.raw`Найдите $\cos\pi$.`,
        accepted: ["-1", "-1.0"],
        explanation: String.raw`Точка $\pi$ — $(-1;0)$.`,
      },
      {
        id: "tr01-q7",
        type: "choice",
        prompt: String.raw`Полный оборот в радианах равен`,
        options: [String.raw`$\pi$`, String.raw`$2\pi$`, String.raw`$\dfrac{\pi}{2}$`, "$180$"],
        answerIndex: 1,
        explanation: String.raw`$360^{\circ}=2\pi$ радиан.`,
      },
      {
        id: "tr01-q8",
        type: "open",
        prompt: String.raw`Найдите $\sin 0$.`,
        accepted: ["0", "0.0"],
        explanation: String.raw`Точка $(1;0)$, ордината $0$.`,
      },
    ],
    sources: [
      {
        authors: "Алимов Ш.А., Колягин Ю.М., Ткачёва М.В. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "Единичная окружность, синус и косинус числа",
      },
      {
        authors: "Никольский С.М., Потапов М.К., Решетников Н.Н., Шевкин А.В.",
        title: "Алгебра и начала математического анализа. 10–11 классы",
        note: "Тригонометрический круг",
      },
    ],
  }),

  makeLesson("school-trig", 2, "Основное тождество и табличные значения", {
    theory: String.raw`Основное тригонометрическое тождество: $\sin^{2}\alpha+\cos^{2}\alpha=1$ для любого действительного угла $\alpha$. Следствия (там, где знаменатели не равны нулю): $1+\tan^{2}\alpha=\dfrac{1}{\cos^{2}\alpha}$ и $1+\cot^{2}\alpha=\dfrac{1}{\sin^{2}\alpha}$.

Табличные значения:
$\sin 0^{\circ}=0$, $\cos 0^{\circ}=1$;
$\sin 30^{\circ}=\dfrac{1}{2}$, $\cos 30^{\circ}=\dfrac{\sqrt{3}}{2}$, $\tan 30^{\circ}=\dfrac{1}{\sqrt{3}}$;
$\sin 45^{\circ}=\dfrac{\sqrt{2}}{2}$, $\cos 45^{\circ}=\dfrac{\sqrt{2}}{2}$, $\tan 45^{\circ}=1$;
$\sin 60^{\circ}=\dfrac{\sqrt{3}}{2}$, $\cos 60^{\circ}=\dfrac{1}{2}$, $\tan 60^{\circ}=\sqrt{3}$;
$\sin 90^{\circ}=1$, $\cos 90^{\circ}=0$.

В радианах те же углы: $30^{\circ}=\dfrac{\pi}{6}$, $45^{\circ}=\dfrac{\pi}{4}$, $60^{\circ}=\dfrac{\pi}{3}$, $90^{\circ}=\dfrac{\pi}{2}$.`,
    examples: [
      {
        title: "Дополнение до единицы",
        problem: String.raw`Известно, что $\sin\alpha=\dfrac{3}{5}$ и угол $\alpha$ острый. Найдите $\cos\alpha$.`,
        solution: String.raw`$\cos^{2}\alpha=1-\sin^{2}\alpha=1-\dfrac{9}{25}=\dfrac{16}{25}$. Так как $\alpha$ острый, $\cos\alpha>0$, поэтому $\cos\alpha=\dfrac{4}{5}$.`,
      },
      {
        title: "Табличное значение",
        problem: String.raw`Найдите $\sin 30^{\circ}$.`,
        solution: String.raw`По таблице $\sin 30^{\circ}=\dfrac{1}{2}$.`,
      },
    ],
    sample: {
      id: "tr02-s",
      type: "open",
      prompt: String.raw`Найдите $\cos 60^{\circ}$.`,
      accepted: ["1/2", "0.5", "frac{1}{2}"],
      explanation: String.raw`Табличное значение: $\cos 60^{\circ}=\dfrac{1}{2}$.`,
      solution: String.raw`Угол $60^{\circ}$ входит в стандартную таблицу. Косинус этого угла равен $\dfrac{1}{2}$. Тот же результат даёт $\cos\dfrac{\pi}{3}=\dfrac{1}{2}$.`,
    },
    problems: [
      {
        id: "tr02-q1",
        type: "choice",
        prompt: String.raw`Значение $\sin 90^{\circ}$ равно`,
        options: ["$0$", String.raw`$\dfrac{1}{2}$`, "$1$", "не определено"],
        answerIndex: 2,
        explanation: String.raw`$\sin 90^{\circ}=1$.`,
      },
      {
        id: "tr02-q2",
        type: "open",
        prompt: String.raw`Найдите $\sin\dfrac{\pi}{6}$.`,
        accepted: ["1/2", "0.5", "frac{1}{2}"],
        explanation: String.raw`$\dfrac{\pi}{6}=30^{\circ}$, $\sin 30^{\circ}=\dfrac{1}{2}$.`,
      },
      {
        id: "tr02-q3",
        type: "choice",
        prompt: String.raw`Значение $\tan 45^{\circ}$ равно`,
        options: ["$0$", String.raw`$\dfrac{1}{2}$`, "$1$", String.raw`$\sqrt{3}$`],
        answerIndex: 2,
        explanation: String.raw`$\sin 45^{\circ}=\cos 45^{\circ}$, поэтому тангенс равен $1$.`,
      },
      {
        id: "tr02-q4",
        type: "open",
        prompt: String.raw`Найдите $\cos\dfrac{\pi}{3}$.`,
        accepted: ["1/2", "0.5", "frac{1}{2}"],
        explanation: String.raw`$\dfrac{\pi}{3}=60^{\circ}$, $\cos 60^{\circ}=\dfrac{1}{2}$.`,
      },
      {
        id: "tr02-q5",
        type: "choice",
        prompt: String.raw`Если $\cos\alpha=\dfrac{5}{13}$ и $\alpha$ острый, то $\sin\alpha$ равен`,
        options: [
          String.raw`$\dfrac{12}{13}$`,
          String.raw`$\dfrac{5}{12}$`,
          String.raw`$\dfrac{13}{5}$`,
          String.raw`$\dfrac{8}{13}$`,
        ],
        answerIndex: 0,
        explanation: String.raw`$\sin^{2}\alpha=1-\dfrac{25}{169}=\dfrac{144}{169}$, $\sin\alpha=\dfrac{12}{13}$.`,
      },
      {
        id: "tr02-q6",
        type: "open",
        prompt: String.raw`Найдите $\cos 90^{\circ}$.`,
        accepted: ["0", "0.0"],
        explanation: String.raw`$\cos 90^{\circ}=0$.`,
      },
      {
        id: "tr02-q7",
        type: "choice",
        prompt: String.raw`Основное тождество утверждает, что`,
        options: [
          String.raw`$\sin\alpha+\cos\alpha=1$`,
          String.raw`$\sin^{2}\alpha+\cos^{2}\alpha=1$`,
          String.raw`$\sin\alpha\cdot\cos\alpha=1$`,
          String.raw`$\tan\alpha+\cot\alpha=1$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Сумма квадратов синуса и косинуса равна $1$.`,
      },
      {
        id: "tr02-q8",
        type: "open",
        prompt: String.raw`Найдите $\tan 60^{\circ}$. Ответ запишите в виде $\sqrt{n}$, указав $n$.`,
        accepted: ["3", "3.0"],
        explanation: String.raw`$\tan 60^{\circ}=\sqrt{3}$, поэтому $n=3$.`,
      },
    ],
    sources: [
      {
        authors: "Колмогоров А.Н., Абрамов А.М., Дудницын Ю.П. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "Основное тождество, таблица значений",
      },
      {
        authors: "Мордкович А.Г.",
        title: "Алгебра и начала математического анализа",
        note: "Соотношения между тригонометрическими функциями",
      },
    ],
  }),

  makeLesson("school-trig", 5, "Формулы сложения и двойного угла", {
    theory: String.raw`Формулы сложения выражают синус, косинус и тангенс суммы или разности через функции самих углов $\alpha$ и $\beta$:
$\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta$,
$\sin(\alpha-\beta)=\sin\alpha\cos\beta-\cos\alpha\sin\beta$,
$\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta$,
$\cos(\alpha-\beta)=\cos\alpha\cos\beta+\sin\alpha\sin\beta$,
$\tan(\alpha\pm\beta)=\dfrac{\tan\alpha\pm\tan\beta}{1\mp\tan\alpha\tan\beta}$ (там, где выражения определены).

Формулы двойного угла получают, полагая $\beta=\alpha$:
$\sin 2\alpha=2\sin\alpha\cos\alpha$,
$\cos 2\alpha=\cos^{2}\alpha-\sin^{2}\alpha=2\cos^{2}\alpha-1=1-2\sin^{2}\alpha$,
$\tan 2\alpha=\dfrac{2\tan\alpha}{1-\tan^{2}\alpha}$.`,
    examples: [
      {
        title: "Синус суммы",
        problem: String.raw`Вычислите $\sin 75^{\circ}$, представив угол как $45^{\circ}+30^{\circ}$.`,
        solution: String.raw`$\sin 75^{\circ}=\sin 45^{\circ}\cos 30^{\circ}+\cos 45^{\circ}\sin 30^{\circ}=\dfrac{\sqrt{2}}{2}\cdot\dfrac{\sqrt{3}}{2}+\dfrac{\sqrt{2}}{2}\cdot\dfrac{1}{2}=\dfrac{\sqrt{6}+\sqrt{2}}{4}$.`,
      },
      {
        title: "Двойной угол",
        problem: String.raw`Дано $\sin\alpha=\dfrac{3}{5}$, $\cos\alpha=\dfrac{4}{5}$. Найдите $\sin 2\alpha$.`,
        solution: String.raw`$\sin 2\alpha=2\sin\alpha\cos\alpha=2\cdot\dfrac{3}{5}\cdot\dfrac{4}{5}=\dfrac{24}{25}$.`,
      },
    ],
    sample: {
      id: "tr03-s",
      type: "open",
      prompt: String.raw`Вычислите $2\sin\dfrac{\pi}{6}\cos\dfrac{\pi}{6}$.`,
      accepted: [
        "√3/2",
        "sqrt{3}/2",
        "frac{sqrt{3}}{2}",
        "frac{√3}{2}",
        "\\frac{\\sqrt{3}}{2}",
      ],
      explanation: String.raw`$2\cdot\dfrac{1}{2}\cdot\dfrac{\sqrt{3}}{2}=\dfrac{\sqrt{3}}{2}$. Это же $\sin\dfrac{\pi}{3}$.`,
      solution: String.raw`По формуле двойного угла это $\sin\dfrac{\pi}{3}$. Напрямую: $\sin\dfrac{\pi}{6}=\dfrac{1}{2}$, $\cos\dfrac{\pi}{6}=\dfrac{\sqrt{3}}{2}$, произведение $2\cdot\dfrac{1}{2}\cdot\dfrac{\sqrt{3}}{2}=\dfrac{\sqrt{3}}{2}$.`,
    },
    problems: [
      {
        id: "tr03-q1",
        type: "choice",
        prompt: String.raw`Формула $\sin 2\alpha$ имеет вид`,
        options: [
          String.raw`$\sin^{2}\alpha+\cos^{2}\alpha$`,
          String.raw`$2\sin\alpha\cos\alpha$`,
          String.raw`$\sin\alpha\cos\alpha$`,
          String.raw`$2\sin\alpha$`,
        ],
        answerIndex: 1,
        explanation: String.raw`$\sin 2\alpha=2\sin\alpha\cos\alpha$.`,
      },
      {
        id: "tr03-q2",
        type: "open",
        prompt: String.raw`Найдите $\sin 2\alpha$, если $\sin\alpha=\dfrac{3}{5}$ и $\cos\alpha=\dfrac{4}{5}$.`,
        accepted: ["24/25", "0.96", "frac{24}{25}"],
        explanation: String.raw`$2\cdot\dfrac{3}{5}\cdot\dfrac{4}{5}=\dfrac{24}{25}$.`,
      },
      {
        id: "tr03-q3",
        type: "choice",
        prompt: String.raw`Значение $\cos 2\alpha$ при $\cos\alpha=\dfrac{3}{5}$ равно`,
        options: [
          String.raw`$\dfrac{7}{25}$`,
          String.raw`$-\dfrac{7}{25}$`,
          String.raw`$\dfrac{9}{25}$`,
          String.raw`$\dfrac{6}{5}$`,
        ],
        answerIndex: 1,
        explanation: String.raw`$\cos 2\alpha=2\cos^{2}\alpha-1=2\cdot\dfrac{9}{25}-1=-\dfrac{7}{25}$.`,
      },
      {
        id: "tr03-q4",
        type: "open",
        prompt: String.raw`Найдите $\tan 2\alpha$, если $\tan\alpha=\dfrac{1}{2}$.`,
        accepted: ["4/3", "frac{4}{3}"],
        explanation: String.raw`$\dfrac{2\cdot(1/2)}{1-(1/2)^{2}}=\dfrac{1}{3/4}=\dfrac{4}{3}$.`,
      },
      {
        id: "tr03-q5",
        type: "choice",
        prompt: String.raw`$\cos(\alpha+\beta)$ равно`,
        options: [
          String.raw`$\cos\alpha\cos\beta+\sin\alpha\sin\beta$`,
          String.raw`$\cos\alpha\cos\beta-\sin\alpha\sin\beta$`,
          String.raw`$\sin\alpha\cos\beta+\cos\alpha\sin\beta$`,
          String.raw`$\cos\alpha+\cos\beta$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Косинус суммы: разность произведений косинусов и синусов.`,
      },
      {
        id: "tr03-q6",
        type: "open",
        prompt: String.raw`Вычислите $\sin\dfrac{\pi}{2}$ по формуле синуса суммы $\dfrac{\pi}{6}+\dfrac{\pi}{3}$.`,
        accepted: ["1", "1.0"],
        explanation: String.raw`$\dfrac{1}{2}\cdot\dfrac{1}{2}+\dfrac{\sqrt{3}}{2}\cdot\dfrac{\sqrt{3}}{2}=\dfrac{1}{4}+\dfrac{3}{4}=1$.`,
      },
      {
        id: "tr03-q7",
        type: "choice",
        prompt: String.raw`Если $\sin\alpha=\cos\alpha=\dfrac{\sqrt{2}}{2}$, то $\sin 2\alpha$ равен`,
        options: ["$0$", String.raw`$\dfrac{1}{2}$`, "$1$", String.raw`$\sqrt{2}$`],
        answerIndex: 2,
        explanation: String.raw`$2\cdot\dfrac{\sqrt{2}}{2}\cdot\dfrac{\sqrt{2}}{2}=1$ (угол $\alpha=\dfrac{\pi}{4}$, двойной — $\dfrac{\pi}{2}$).`,
      },
    ],
    sources: [
      {
        authors: "Алимов Ш.А., Колягин Ю.М., Ткачёва М.В. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "Формулы сложения и двойного угла",
      },
      {
        authors: "Никольский С.М., Потапов М.К., Решетников Н.Н., Шевкин А.В.",
        title: "Алгебра и начала математического анализа. 10–11 классы",
        note: "Преобразования тригонометрических выражений",
      },
    ],
  }),

  makeLesson("school-trig", 8, "Тригонометрические уравнения", {
    theory: String.raw`Простейшие тригонометрические уравнения решают, записывая общее семейство корней. Целое число $k$ пробегает все целые значения: $k\in\mathbb{Z}$.

Уравнение $\sin x=a$ при $|a|\leq 1$ имеет решения $x=(-1)^{k}\arcsin a+\pi k$. Эквивалентная запись: $x=\arcsin a+2\pi k$ или $x=\pi-\arcsin a+2\pi k$. Уравнение $\cos x=a$ при $|a|\leq 1$: $x=\pm\arccos a+2\pi k$. Уравнение $\tan x=a$ (для любого $a$): $x=\arctan a+\pi k$.

Частные случаи: $\sin x=0$ даёт $x=\pi k$; $\sin x=1$ даёт $x=\dfrac{\pi}{2}+2\pi k$; $\cos x=0$ даёт $x=\dfrac{\pi}{2}+\pi k$; $\cos x=-1$ даёт $x=\pi+2\pi k$. Если $|a|>1$, уравнений $\sin x=a$ и $\cos x=a$ решений нет.`,
    examples: [
      {
        title: "Уравнение с синусом",
        problem: String.raw`Решите уравнение $\sin x=\dfrac{1}{2}$.`,
        solution: String.raw`$\arcsin\dfrac{1}{2}=\dfrac{\pi}{6}$. Семейства: $x=\dfrac{\pi}{6}+2\pi k$ и $x=\dfrac{5\pi}{6}+2\pi k$, $k\in\mathbb{Z}$.`,
      },
      {
        title: "Уравнение с косинусом",
        problem: String.raw`Решите уравнение $\cos x=0$.`,
        solution: String.raw`$\arccos 0=\dfrac{\pi}{2}$, поэтому $x=\pm\dfrac{\pi}{2}+2\pi k$, что объединяют в $x=\dfrac{\pi}{2}+\pi k$, $k\in\mathbb{Z}$.`,
      },
    ],
    sample: {
      id: "tr04-s",
      type: "open",
      prompt: String.raw`Найдите наименьший положительный корень уравнения $\sin x=\dfrac{1}{2}$.`,
      accepted: ["π/6", "pi/6", "frac{π}{6}", "frac{pi}{6}", "\\frac{\\pi}{6}"],
      explanation: String.raw`Наименьший положительный корень — $\dfrac{\pi}{6}$ (второй в периоде — $\dfrac{5\pi}{6}$).`,
      solution: String.raw`Общее решение: $x=\dfrac{\pi}{6}+2\pi k$ и $x=\dfrac{5\pi}{6}+2\pi k$. При $k=0$ положительные корни — $\dfrac{\pi}{6}$ и $\dfrac{5\pi}{6}$. Наименьший из них равен $\dfrac{\pi}{6}$. Проверка: $\sin\dfrac{\pi}{6}=\dfrac{1}{2}$.`,
    },
    problems: [
      {
        id: "tr04-q1",
        type: "choice",
        prompt: String.raw`Общее решение уравнения $\sin x=1$ имеет вид`,
        options: [
          String.raw`$x=\pi k$`,
          String.raw`$x=\dfrac{\pi}{2}+2\pi k$`,
          String.raw`$x=\pi+2\pi k$`,
          String.raw`$x=2\pi k$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Синус равен $1$ в точках $\dfrac{\pi}{2}+2\pi k$.`,
      },
      {
        id: "tr04-q2",
        type: "open",
        prompt: String.raw`Вычислите $\sin\dfrac{\pi}{6}$.`,
        accepted: ["1/2", "0.5", "frac{1}{2}"],
        explanation: String.raw`Табличное значение $\dfrac{1}{2}$.`,
      },
      {
        id: "tr04-q3",
        type: "choice",
        prompt: String.raw`Наименьший неотрицательный корень уравнения $\cos x=1$ равен`,
        options: ["$0$", String.raw`$\pi$`, String.raw`$\dfrac{\pi}{2}$`, String.raw`$2\pi$`],
        answerIndex: 0,
        explanation: String.raw`$x=2\pi k$; при $k=0$ получаем $0$.`,
      },
      {
        id: "tr04-q4",
        type: "open",
        prompt: String.raw`Найдите наименьший положительный корень уравнения $\tan x=1$.`,
        accepted: ["π/4", "pi/4", "frac{π}{4}", "frac{pi}{4}", "\\frac{\\pi}{4}"],
        explanation: String.raw`$x=\dfrac{\pi}{4}+\pi k$; при $k=0$ получаем $\dfrac{\pi}{4}$.`,
      },
      {
        id: "tr04-q5",
        type: "choice",
        prompt: String.raw`Уравнение $\cos x=2$`,
        options: [
          "имеет корень $x=0$",
          "не имеет решений",
          String.raw`имеет корни $x=\pm\arccos 2$`,
          "имеет ровно один корень",
        ],
        answerIndex: 1,
        explanation: String.raw`Значения косинуса лежат в $[-1;1]$, число $2$ вне этого отрезка.`,
      },
      {
        id: "tr04-q6",
        type: "open",
        prompt: String.raw`Найдите наименьший положительный корень уравнения $\cos x=\dfrac{1}{2}$.`,
        accepted: ["π/3", "pi/3", "frac{π}{3}", "frac{pi}{3}", "\\frac{\\pi}{3}"],
        explanation: String.raw`$x=\pm\dfrac{\pi}{3}+2\pi k$; наименьший положительный — $\dfrac{\pi}{3}$.`,
      },
      {
        id: "tr04-q7",
        type: "choice",
        prompt: String.raw`Общее решение $\sin x=0$ — это`,
        options: [
          String.raw`$x=\pi k$`,
          String.raw`$x=2\pi k$`,
          String.raw`$x=\dfrac{\pi}{2}+\pi k$`,
          String.raw`$x=\dfrac{\pi}{2}+2\pi k$`,
        ],
        answerIndex: 0,
        explanation: String.raw`Синус равен нулю в целых кратных $\pi$.`,
      },
      {
        id: "tr04-q8",
        type: "open",
        prompt: String.raw`Найдите наименьший положительный корень уравнения $\cos x=-1$.`,
        accepted: ["π", "pi", "\\pi"],
        explanation: String.raw`$x=\pi+2\pi k$; при $k=0$ получаем $\pi$.`,
      },
    ],
    sources: [
      {
        authors: "Мордкович А.Г.",
        title: "Алгебра и начала математического анализа",
        note: "Простейшие тригонометрические уравнения",
      },
      {
        authors: "Колмогоров А.Н., Абрамов А.М., Дудницын Ю.П. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "Общие формулы решений",
      },
    ],
  }),

  makeLesson("school-trig", 12, "Обратные тригонометрические функции", {
    theory: String.raw`Арксинус $\arcsin a$ при $a\in[-1;1]$ — единственное число $x$ из отрезка $\left[-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\right]$ такое, что $\sin x=a$. Арккосинус $\arccos a$ — единственное $x$ из отрезка $[0;\,\pi]$ с $\cos x=a$. Арктангенс $\arctan a$ определён для всех действительных $a$ и принимает значения из интервала $\left(-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\right)$.

Табличные значения: $\arcsin\dfrac{1}{2}=\dfrac{\pi}{6}$, $\arcsin\dfrac{\sqrt{2}}{2}=\dfrac{\pi}{4}$, $\arcsin 1=\dfrac{\pi}{2}$, $\arcsin 0=0$, $\arcsin(-1)=-\dfrac{\pi}{2}$;
$\arccos\dfrac{1}{2}=\dfrac{\pi}{3}$, $\arccos 0=\dfrac{\pi}{2}$, $\arccos(-1)=\pi$, $\arccos 1=0$, $\arccos\left(-\dfrac{1}{2}\right)=\dfrac{2\pi}{3}$;
$\arctan 1=\dfrac{\pi}{4}$, $\arctan 0=0$, $\arctan\sqrt{3}=\dfrac{\pi}{3}$.

Тождества $\sin(\arcsin a)=a$ и $\cos(\arccos a)=a$ верны на $[-1;1]$; $\tan(\arctan a)=a$ — на всей прямой.`,
    examples: [
      {
        title: "Арксинус",
        problem: String.raw`Вычислите $\arcsin\dfrac{\sqrt{2}}{2}$.`,
        solution: String.raw`Ищем $x\in\left[-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\right]$ с $\sin x=\dfrac{\sqrt{2}}{2}$. Это $x=\dfrac{\pi}{4}$.`,
      },
      {
        title: "Арккосинус отрицательного аргумента",
        problem: String.raw`Вычислите $\arccos\left(-\dfrac{1}{2}\right)$.`,
        solution: String.raw`На $[0;\,\pi]$ косинус равен $-\dfrac{1}{2}$ при $x=\dfrac{2\pi}{3}$.`,
      },
    ],
    sample: {
      id: "tr05-s",
      type: "open",
      prompt: String.raw`Вычислите $\arctan 1$.`,
      accepted: ["π/4", "pi/4", "frac{π}{4}", "frac{pi}{4}", "\\frac{\\pi}{4}"],
      explanation: String.raw`Тангенс равен $1$ при $\dfrac{\pi}{4}$, и это значение лежит в $\left(-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\right)$.`,
      solution: String.raw`По определению $\arctan 1$ — число из интервала $\left(-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\right)$, тангенс которого равен $1$. Таким числом является $\dfrac{\pi}{4}$, поскольку $\tan\dfrac{\pi}{4}=1$.`,
    },
    problems: [
      {
        id: "tr05-q1",
        type: "choice",
        prompt: String.raw`Область значений $\arcsin$ — это`,
        options: [
          String.raw`$[0;\,\pi]$`,
          String.raw`$\left[-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\right]$`,
          String.raw`$(-\pi;\,\pi)$`,
          String.raw`$\mathbb{R}$`,
        ],
        answerIndex: 1,
        explanation: String.raw`По определению значения арксинуса лежат на $\left[-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\right]$.`,
      },
      {
        id: "tr05-q2",
        type: "open",
        prompt: String.raw`Вычислите $\arcsin\dfrac{1}{2}$.`,
        accepted: ["π/6", "pi/6", "frac{π}{6}", "frac{pi}{6}", "\\frac{\\pi}{6}"],
        explanation: String.raw`$\sin\dfrac{\pi}{6}=\dfrac{1}{2}$ и $\dfrac{\pi}{6}$ в области значений арксинуса.`,
      },
      {
        id: "tr05-q3",
        type: "choice",
        prompt: String.raw`Значение $\arccos\dfrac{1}{2}$ равно`,
        options: [
          String.raw`$\dfrac{\pi}{6}$`,
          String.raw`$\dfrac{\pi}{3}$`,
          String.raw`$\dfrac{\pi}{4}$`,
          String.raw`$\dfrac{2\pi}{3}$`,
        ],
        answerIndex: 1,
        explanation: String.raw`$\cos\dfrac{\pi}{3}=\dfrac{1}{2}$, $\dfrac{\pi}{3}\in[0;\,\pi]$.`,
      },
      {
        id: "tr05-q4",
        type: "open",
        prompt: String.raw`Вычислите $\arccos 0$.`,
        accepted: ["π/2", "pi/2", "frac{π}{2}", "frac{pi}{2}", "\\frac{\\pi}{2}"],
        explanation: String.raw`$\cos\dfrac{\pi}{2}=0$.`,
      },
      {
        id: "tr05-q5",
        type: "choice",
        prompt: String.raw`Значение $\arcsin(-1)$ равно`,
        options: [
          String.raw`$\dfrac{\pi}{2}$`,
          String.raw`$-\dfrac{\pi}{2}$`,
          String.raw`$\pi$`,
          String.raw`$0$`,
        ],
        answerIndex: 1,
        explanation: String.raw`$\sin\left(-\dfrac{\pi}{2}\right)=-1$, значение в области арксинуса.`,
      },
      {
        id: "tr05-q6",
        type: "open",
        prompt: String.raw`Вычислите $\arccos(-1)$.`,
        accepted: ["π", "pi", "\\pi"],
        explanation: String.raw`$\cos\pi=-1$ и $\pi\in[0;\,\pi]$.`,
      },
      {
        id: "tr05-q7",
        type: "choice",
        prompt: String.raw`Значение $\arccos\left(-\dfrac{1}{2}\right)$ равно`,
        options: [
          String.raw`$-\dfrac{\pi}{3}$`,
          String.raw`$\dfrac{\pi}{3}$`,
          String.raw`$\dfrac{2\pi}{3}$`,
          String.raw`$\dfrac{5\pi}{6}$`,
        ],
        answerIndex: 2,
        explanation: String.raw`На $[0;\,\pi]$ это $\dfrac{2\pi}{3}$, а не $-\dfrac{\pi}{3}$.`,
      },
      {
        id: "tr05-q8",
        type: "open",
        prompt: String.raw`Вычислите $\arcsin 0$.`,
        accepted: ["0", "0.0"],
        explanation: String.raw`$\sin 0=0$.`,
      },
    ],
    sources: [
      {
        authors: "Никольский С.М., Потапов М.К., Решетников Н.Н., Шевкин А.В.",
        title: "Алгебра и начала математического анализа. 10–11 классы",
        note: "Обратные тригонометрические функции",
      },
      {
        authors: "Алимов Ш.А., Колягин Ю.М., Ткачёва М.В. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "Арксинус, арккосинус, арктангенс",
      },
    ],
  }),

  makeLesson("school-trig", 14, "Теоремы синусов и косинусов", {
    theory: String.raw`Теорема синусов: в любом треугольнике отношение стороны к синусу противолежащего угла одно и то же: $\dfrac{a}{\sin A}=\dfrac{b}{\sin B}=\dfrac{c}{\sin C}=2R$, где $a,b,c$ — стороны, $A,B,C$ — противолежащие им углы, $R$ — радиус описанной окружности.

Теорема косинусов: $c^{2}=a^{2}+b^{2}-2ab\cos C$ (и циклические перестановки сторон и углов). При $C=90^{\circ}$ получается теорема Пифагора: $c^{2}=a^{2}+b^{2}$. Угол $C$ острый, если $c^{2}<a^{2}+b^{2}$, и тупой, если $c^{2}>a^{2}+b^{2}$.

Площадь треугольника: $S=\dfrac{1}{2}ab\sin C$. Для прямоугольного треугольника с гипотенузой $c$ верно $R=\dfrac{c}{2}$.`,
    examples: [
      {
        title: "Теорема синусов",
        problem: String.raw`В треугольнике $a=2$, $\angle A=30^{\circ}$, $\angle B=45^{\circ}$. Найдите сторону $b$.`,
        solution: String.raw`$\dfrac{a}{\sin A}=\dfrac{b}{\sin B}$, поэтому $b=\dfrac{2\cdot\sin 45^{\circ}}{\sin 30^{\circ}}=\dfrac{2\cdot(\sqrt{2}/2)}{1/2}=2\sqrt{2}$.`,
      },
      {
        title: "Теорема косинусов",
        problem: String.raw`Стороны $a=5$, $b=5$, угол $C=60^{\circ}$. Найдите сторону $c$.`,
        solution: String.raw`$c^{2}=25+25-2\cdot 5\cdot 5\cdot\cos 60^{\circ}=50-50\cdot\dfrac{1}{2}=25$, $c=5$. Треугольник равносторонний.`,
      },
    ],
    sample: {
      id: "tr06-s",
      type: "open",
      prompt: String.raw`Найдите площадь треугольника со сторонами $a=6$, $b=8$ и углом $C=90^{\circ}$ между ними.`,
      accepted: ["24", "24.0"],
      explanation: String.raw`$S=\dfrac{1}{2}\cdot 6\cdot 8\cdot\sin 90^{\circ}=24$.`,
      solution: String.raw`Формула $S=\dfrac{1}{2}ab\sin C$. Здесь $\sin 90^{\circ}=1$, поэтому $S=\dfrac{1}{2}\cdot 6\cdot 8=24$. Это же площадь прямоугольного треугольника с катетами $6$ и $8$.`,
    },
    problems: [
      {
        id: "tr06-q1",
        type: "choice",
        prompt: String.raw`Теорема синусов утверждает, что $\dfrac{a}{\sin A}$ равно`,
        options: [
          "$R$",
          "$2R$",
          String.raw`$\dfrac{R}{2}$`,
          "площади треугольника",
        ],
        answerIndex: 1,
        explanation: String.raw`$\dfrac{a}{\sin A}=2R$, где $R$ — радиус описанной окружности.`,
      },
      {
        id: "tr06-q2",
        type: "open",
        prompt: String.raw`В прямоугольном треугольнике катеты равны $3$ и $4$. Найдите гипотенузу.`,
        accepted: ["5", "5.0"],
        explanation: String.raw`$c^{2}=9+16=25$, $c=5$ (теорема Пифагора — частный случай теоремы косинусов).`,
      },
      {
        id: "tr06-q3",
        type: "choice",
        prompt: String.raw`В треугольнике $a=5$, $b=5$, $C=60^{\circ}$. Сторона $c$ равна`,
        options: ["$5$", "$10$", String.raw`$5\sqrt{2}$`, String.raw`$5\sqrt{3}$`],
        answerIndex: 0,
        explanation: String.raw`$c^{2}=25+25-25=25$, $c=5$.`,
      },
      {
        id: "tr06-q4",
        type: "open",
        prompt: String.raw`Гипотенуза прямоугольного треугольника равна $10$. Найдите радиус описанной окружности.`,
        accepted: ["5", "5.0"],
        explanation: String.raw`Для прямоугольного треугольника $2R=c$, поэтому $R=5$.`,
      },
      {
        id: "tr06-q5",
        type: "choice",
        prompt: String.raw`В треугольнике $a=2$, $A=30^{\circ}$, $B=45^{\circ}$. Сторона $b$ равна`,
        options: [
          String.raw`$\sqrt{2}$`,
          String.raw`$2\sqrt{2}$`,
          "$4$",
          String.raw`$2\sqrt{3}$`,
        ],
        answerIndex: 1,
        explanation: String.raw`$b=\dfrac{2\sin 45^{\circ}}{\sin 30^{\circ}}=2\sqrt{2}$.`,
      },
      {
        id: "tr06-q6",
        type: "open",
        prompt: String.raw`Найдите площадь треугольника со сторонами $4$ и $5$ и углом $90^{\circ}$ между ними.`,
        accepted: ["10", "10.0"],
        explanation: String.raw`$S=\dfrac{1}{2}\cdot 4\cdot 5=10$.`,
      },
      {
        id: "tr06-q7",
        type: "choice",
        prompt: String.raw`По теореме косинусов угол $C$ прямой, если`,
        options: [
          String.raw`$c^{2}=a^{2}+b^{2}$`,
          String.raw`$c^{2}>a^{2}+b^{2}$`,
          String.raw`$c^{2}<a^{2}+b^{2}$`,
          String.raw`$c=a+b$`,
        ],
        answerIndex: 0,
        explanation: String.raw`При $\cos C=0$ получаем $c^{2}=a^{2}+b^{2}$.`,
      },
      {
        id: "tr06-q8",
        type: "open",
        prompt: String.raw`В треугольнике $A=30^{\circ}$, $a=3$. Найдите радиус описанной окружности $R$.`,
        accepted: ["3", "3.0"],
        explanation: String.raw`$2R=\dfrac{a}{\sin A}=\dfrac{3}{1/2}=6$, $R=3$.`,
      },
    ],
    sources: [
      {
        authors: "Атанасян Л.С., Бутузов В.Ф., Кадомцев С.Б. и др.",
        title: "Геометрия. 7–9 классы",
        note: "Теоремы синусов и косинусов, площадь треугольника",
      },
      {
        authors: "Алимов Ш.А., Колягин Ю.М., Ткачёва М.В. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "Применения тригонометрии в геометрии",
      },
    ],
  }),

  makeLesson("school-trig", 3, "Формулы приведения", {
    theory: String.raw`Формулы приведения выражают функции углов $\dfrac{\pi}{2}\pm\alpha$, $\pi\pm\alpha$, $\dfrac{3\pi}{2}\pm\alpha$, $2\pi\pm\alpha$ через функции самого $\alpha$. Если угол равен $\dfrac{\pi}{2}\pm\alpha$ или $\dfrac{3\pi}{2}\pm\alpha$ («нечётное число прямых»), имя меняется: синус на косинус и наоборот. Если угол равен $\pi\pm\alpha$ или $2\pi\pm\alpha$ («чётное число прямых»), имя сохраняется.

Знак берут таким, какой имела исходная функция в той четверти, куда попадает угол при остром $\alpha$. Примеры: $\sin(\pi-\alpha)=\sin\alpha$, $\cos(\pi-\alpha)=-\cos\alpha$, $\sin\bigl(\dfrac{\pi}{2}-\alpha\bigr)=\cos\alpha$.

Формулы сводят табличные углы к первой четверти. Они согласованы с чётностью: $\cos(-\alpha)=\cos\alpha$, $\sin(-\alpha)=-\sin\alpha$.`,
    examples: [
      {
        title: "Синус смежного угла",
        problem: String.raw`Упростите $\sin(\pi-\alpha)$.`,
        solution: String.raw`Угол $\pi-\alpha$ при остром $\alpha$ лежит во второй четверти, синус положителен, имя не меняется: $\sin(\pi-\alpha)=\sin\alpha$.`,
      },
      {
        title: "Косинус дополнительного угла",
        problem: String.raw`Упростите $\cos\bigl(\dfrac{\pi}{2}-\alpha\bigr)$.`,
        solution: String.raw`Нечётное число прямых — имя меняется, первая четверть — знак плюс: $\cos\bigl(\dfrac{\pi}{2}-\alpha\bigr)=\sin\alpha$.`,
      },
    ],
    sample: {
      id: "tr07-s",
      type: "open",
      prompt: String.raw`Вычислите $\sin\dfrac{5\pi}{6}$.`,
      accepted: ["1/2", "0.5", "0,5"],
      explanation: String.raw`$\sin\dfrac{5\pi}{6}=\sin\bigl(\pi-\dfrac{\pi}{6}\bigr)=\sin\dfrac{\pi}{6}=\dfrac{1}{2}$.`,
      solution: String.raw`Запишем $\dfrac{5\pi}{6}=\pi-\dfrac{\pi}{6}$. По формуле приведения $\sin(\pi-\alpha)=\sin\alpha$, поэтому $\sin\dfrac{5\pi}{6}=\sin\dfrac{\pi}{6}=\dfrac{1}{2}$.`,
    },
    problems: [
      {
        id: "tr07-q1",
        type: "choice",
        prompt: String.raw`$\sin(\pi-\alpha)$ равно`,
        options: [
          String.raw`$-\sin\alpha$`,
          String.raw`$\sin\alpha$`,
          String.raw`$\cos\alpha$`,
          String.raw`$-\cos\alpha$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Имя сохраняется, во II четверти синус положителен.`,
      },
      {
        id: "tr07-q2",
        type: "open",
        prompt: String.raw`Вычислите $\cos\pi$.`,
        accepted: ["-1", "-1.0"],
        explanation: String.raw`$\cos\pi=-1$.`,
      },
      {
        id: "tr07-q3",
        type: "choice",
        prompt: String.raw`$\cos\bigl(\dfrac{\pi}{2}-\alpha\bigr)$ равно`,
        options: [
          String.raw`$\cos\alpha$`,
          String.raw`$\sin\alpha$`,
          String.raw`$-\sin\alpha$`,
          String.raw`$-\cos\alpha$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Нечётное число прямых: имя меняется, знак плюс.`,
      },
      {
        id: "tr07-q4",
        type: "open",
        prompt: String.raw`Вычислите $\sin\dfrac{3\pi}{2}$.`,
        accepted: ["-1", "-1.0"],
        explanation: String.raw`Точка нижней полуоси, ордината $-1$.`,
      },
      {
        id: "tr07-q5",
        type: "choice",
        prompt: String.raw`$\sin(-\alpha)$ равно`,
        options: [
          String.raw`$\sin\alpha$`,
          String.raw`$-\sin\alpha$`,
          String.raw`$\cos\alpha$`,
          String.raw`$-\cos\alpha$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Синус — нечётная функция.`,
      },
      {
        id: "tr07-q6",
        type: "open",
        prompt: String.raw`Вычислите $\cos\dfrac{2\pi}{3}$.`,
        accepted: ["-1/2", "-0.5", "-0,5"],
        explanation: String.raw`$\cos\bigl(\pi-\dfrac{\pi}{3}\bigr)=-\cos\dfrac{\pi}{3}=-\dfrac{1}{2}$.`,
      },
    ],
    sources: [
      {
        authors: "Алимов Ш.А., Колягин Ю.М., Ткачёва М.В. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "формулы приведения",
      },
      {
        authors: "Никольский С.М., Потапов М.К., Решетников Н.Н., Шевкин А.В.",
        title: "Алгебра и начала математического анализа. 10–11 классы",
        note: "приведение к острому углу",
      },
    ],
  }),

  makeLesson("school-trig", 6, "Формулы суммы и произведения", {
    theory: String.raw`Формулы суммы превращают сумму или разность синусов и косинусов в произведение:
$\sin\alpha+\sin\beta=2\sin\dfrac{\alpha+\beta}{2}\cos\dfrac{\alpha-\beta}{2}$,
$\sin\alpha-\sin\beta=2\cos\dfrac{\alpha+\beta}{2}\sin\dfrac{\alpha-\beta}{2}$,
$\cos\alpha+\cos\beta=2\cos\dfrac{\alpha+\beta}{2}\cos\dfrac{\alpha-\beta}{2}$,
$\cos\alpha-\cos\beta=-2\sin\dfrac{\alpha+\beta}{2}\sin\dfrac{\alpha-\beta}{2}$.

Обратные формулы превращают произведение в сумму:
$2\sin\alpha\cos\beta=\sin(\alpha+\beta)+\sin(\alpha-\beta)$,
$2\cos\alpha\cos\beta=\cos(\alpha+\beta)+\cos(\alpha-\beta)$,
$2\sin\alpha\sin\beta=\cos(\alpha-\beta)-\cos(\alpha+\beta)$.

Их выводят из формул сложения, складывая или вычитая. Применяют при решении уравнений вроде $\sin x+\sin 3x=0$, при упрощении выражений и при вычислении сумм. Знак в формуле для $\cos\alpha-\cos\beta$ легко забыть: разность косинусов отрицательна, когда $|\alpha|<|\beta|$ при острых углах.`,
    examples: [
      {
        title: "Сумма синусов",
        problem: String.raw`Упростите $\sin 75^{\circ}+\sin 15^{\circ}$.`,
        solution: String.raw`$2\sin 45^{\circ}\cos 30^{\circ}=2\cdot\dfrac{\sqrt{2}}{2}\cdot\dfrac{\sqrt{3}}{2}=\dfrac{\sqrt{6}}{2}$.`,
      },
      {
        title: "Произведение",
        problem: String.raw`Вычислите $2\sin\dfrac{\pi}{12}\cos\dfrac{\pi}{12}$.`,
        solution: String.raw`Это $\sin\dfrac{\pi}{6}=\dfrac{1}{2}$ по формуле двойного угла, частному случаю произведения.`,
      },
    ],
    sample: {
      id: "tr08-s",
      type: "open",
      prompt: String.raw`Вычислите $\cos\dfrac{\pi}{3}+\cos\dfrac{2\pi}{3}$.`,
      accepted: ["0", "0.0"],
      explanation: String.raw`$\dfrac{1}{2}+\bigl(-\dfrac{1}{2}\bigr)=0$.`,
      solution: String.raw`Табличные значения: $\cos\dfrac{\pi}{3}=\dfrac{1}{2}$, $\cos\dfrac{2\pi}{3}=-\dfrac{1}{2}$. Сумма равна $0$. По формуле суммы косинусов: $2\cos\dfrac{\pi}{2}\cos\dfrac{-\pi}{6}=0\cdot\cos\dfrac{\pi}{6}=0$.`,
    },
    problems: [
      {
        id: "tr08-q1",
        type: "choice",
        prompt: String.raw`$\sin\alpha+\sin\beta$ равно`,
        options: [
          String.raw`$2\sin\dfrac{\alpha+\beta}{2}\cos\dfrac{\alpha-\beta}{2}$`,
          String.raw`$2\cos\dfrac{\alpha+\beta}{2}\sin\dfrac{\alpha-\beta}{2}$`,
          String.raw`$\sin(\alpha+\beta)$`,
          String.raw`$\sin\alpha\sin\beta$`,
        ],
        answerIndex: 0,
        explanation: String.raw`Стандартная формула суммы синусов.`,
      },
      {
        id: "tr08-q2",
        type: "open",
        prompt: String.raw`Вычислите $\sin\dfrac{\pi}{2}+\sin 0$.`,
        accepted: ["1", "1.0"],
        explanation: String.raw`$1+0=1$.`,
      },
      {
        id: "tr08-q3",
        type: "choice",
        prompt: String.raw`$2\sin\alpha\cos\alpha$ равно`,
        options: [
          String.raw`$\sin\alpha$`,
          String.raw`$\sin 2\alpha$`,
          String.raw`$\cos 2\alpha$`,
          String.raw`$2\sin\alpha$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Формула двойного угла — частный случай произведения.`,
      },
      {
        id: "tr08-q4",
        type: "open",
        prompt: String.raw`Вычислите $\cos 0+\cos\pi$.`,
        accepted: ["0", "0.0"],
        explanation: String.raw`$1+(-1)=0$.`,
      },
      {
        id: "tr08-q5",
        type: "choice",
        prompt: String.raw`$\cos\alpha-\cos\beta$ равно`,
        options: [
          String.raw`$2\sin\dfrac{\alpha+\beta}{2}\sin\dfrac{\alpha-\beta}{2}$`,
          String.raw`$-2\sin\dfrac{\alpha+\beta}{2}\sin\dfrac{\alpha-\beta}{2}$`,
          String.raw`$2\cos\dfrac{\alpha+\beta}{2}\cos\dfrac{\alpha-\beta}{2}$`,
          String.raw`$\cos(\alpha-\beta)$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Минус перед произведением синусов.`,
      },
      {
        id: "tr08-q6",
        type: "open",
        prompt: String.raw`Вычислите $2\sin\dfrac{\pi}{4}\cos\dfrac{\pi}{4}$.`,
        accepted: ["1", "1.0"],
        explanation: String.raw`$\sin\dfrac{\pi}{2}=1$.`,
      },
    ],
    sources: [
      {
        authors: "Алимов Ш.А., Колягин Ю.М., Ткачёва М.В. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "преобразование сумм и произведений тригонометрических функций",
      },
      {
        authors: "Мордкович А.Г.",
        title: "Алгебра и начала математического анализа",
        note: "формулы суммы и произведения",
      },
    ],
  }),

  makeLesson("school-trig", 7, "Графики тригонометрических функций", {
    theory: String.raw`График $y=\sin x$ называют синусоидой: период равен $2\pi$, область значений — отрезок $[-1;1]$, нули в точках $\pi k$, максимумы $1$ при $x=\dfrac{\pi}{2}+2\pi k$, минимумы $-1$ при $x=\dfrac{3\pi}{2}+2\pi k$ ($k$ — целое). График $y=\cos x$ — та же синусоида, сдвинутая на $\dfrac{\pi}{2}$ влево: $\cos x=\sin\bigl(x+\dfrac{\pi}{2}\bigr)$.

Тангенс $y=\mathrm{tg}\, x$ имеет период $\pi$, вертикальные асимптоты $x=\dfrac{\pi}{2}+\pi k$, область значений — вся прямая. Котангенс имеет период $\pi$ и асимптоты $x=\pi k$.

Общий вид $y=A\sin(\omega x+\varphi)$: амплитуда равна $|A|$, период $T=\dfrac{2\pi}{|\omega|}$, сдвиг фазы $-\dfrac{\varphi}{\omega}$. Растяжение по оси $Ox$ происходит при $|\omega|<1$, сжатие — при $|\omega|>1$. Точки экстремумов синуса читают с круга: ордината $\pm 1$.`,
    examples: [
      {
        title: "Период",
        problem: String.raw`Найдите период функции $y=\sin 2x$.`,
        solution: String.raw`$T=\dfrac{2\pi}{2}=\pi$. На промежутке $[0;\pi]$ укладывается одна полная волна.`,
      },
      {
        title: "Амплитуда",
        problem: String.raw`Найдите наибольшее значение $y=3\cos x$.`,
        solution: String.raw`Косинус не превосходит $1$, поэтому наибольшее значение равно $3$.`,
      },
    ],
    sample: {
      id: "tr09-s",
      type: "open",
      prompt: String.raw`Найдите период функции $y=\cos 4x$. В ответе укажите $T/\pi$.`,
      accepted: ["1/2", "0.5", "0,5"],
      explanation: String.raw`$T=\dfrac{2\pi}{4}=\dfrac{\pi}{2}$, $T/\pi=\dfrac{1}{2}$.`,
      solution: String.raw`Для $y=\cos\omega x$ период $T=\dfrac{2\pi}{|\omega|}$. Здесь $\omega=4$, $T=\dfrac{\pi}{2}$. Отношение $T/\pi=\dfrac{1}{2}$.`,
    },
    problems: [
      {
        id: "tr09-q1",
        type: "choice",
        prompt: String.raw`Область значений $y=\sin x$ равна`,
        options: [
          String.raw`$(0;1)$`,
          String.raw`$[-1;1]$`,
          String.raw`$\mathbb{R}$`,
          String.raw`$[0;2\pi]$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Синус принимает все значения от $-1$ до $1$.`,
      },
      {
        id: "tr09-q2",
        type: "open",
        prompt: String.raw`Найдите наибольшее значение функции $y=5\sin x$.`,
        accepted: ["5", "5.0"],
        explanation: String.raw`Амплитуда $5$.`,
      },
      {
        id: "tr09-q3",
        type: "choice",
        prompt: String.raw`Период $y=\mathrm{tg}\, x$ равен`,
        options: [
          String.raw`$2\pi$`,
          String.raw`$\pi$`,
          String.raw`$\dfrac{\pi}{2}$`,
          String.raw`$1$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Основной период тангенса равен $\pi$.`,
      },
      {
        id: "tr09-q4",
        type: "open",
        prompt: String.raw`Найдите период $y=\sin 3x$. В ответе укажите $T/\pi$.`,
        accepted: ["2/3", "0.666", "0,666", "0.67", "0,67"],
        explanation: String.raw`$T=\dfrac{2\pi}{3}$, $T/\pi=\dfrac{2}{3}$.`,
      },
      {
        id: "tr09-q5",
        type: "choice",
        prompt: String.raw`Наименьшее значение $y=2\cos x$ равно`,
        options: ["$-1$", "$-2$", "$0$", "$2$"],
        answerIndex: 1,
        explanation: String.raw`Косинус достигает $-1$, произведение равно $-2$.`,
      },
      {
        id: "tr09-q6",
        type: "open",
        prompt: String.raw`Вычислите $\sin\dfrac{\pi}{2}$. Это ордината максимума синусоиды.`,
        accepted: ["1", "1.0"],
        explanation: String.raw`Максимум синуса равен $1$.`,
      },
    ],
    sources: [
      {
        authors: "Алимов Ш.А., Колягин Ю.М., Ткачёва М.В. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "графики синуса, косинуса, тангенса",
      },
      {
        authors: "Колмогоров А.Н., Абрамов А.М., Дудницын Ю.П. и др.",
        title: "Алгебра и начала математического анализа. 10–11 классы",
        note: "гармонические колебания, амплитуда и период",
      },
    ],
  }),

  makeLesson("school-trig", 11, "Тригонометрические неравенства", {
    theory: String.raw`Неравенство $\sin x>a$ при $|a|<1$ решают по единичной окружности: ординаты выше горизонтали $y=a$ заполняют открытую дугу, которую записывают через арксинус. Если $a\geq 1$, решений нет (кроме неравенства $\sin x\geq 1$ при $a=1$, которое даёт точки $\dfrac{\pi}{2}+2\pi k$). Если $a<-1$, неравенство $\sin x>a$ верно для всех $x$.

Аналогично $\cos x>a$ выделяет дугу справа от вертикали $x=a$. Для тангенса используют монотонность на интервале $\bigl(-\dfrac{\pi}{2};\dfrac{\pi}{2}\bigr)$ и периодичность с периодом $\pi$: $\mathrm{tg}\, x>a$ равносильно $x>\mathrm{arctg}\, a$ на каждом интервале определения.

Строгое неравенство не включает концы дуги; нестрогое включает. После нахождения решения на одном периоде его распространяют с шагом $2\pi$ (для синуса и косинуса) или $\pi$ (для тангенса). Полезно делать чертёж круга, а не заучивать готовые цепочки.`,
    examples: [
      {
        title: "Синус",
        problem: String.raw`Решите $\sin x>0$.`,
        solution: String.raw`Ордината положительна в верхней полуокружности: $2\pi k<x<\pi+2\pi k$, $k\in\mathbb{Z}$.`,
      },
      {
        title: "Косинус",
        problem: String.raw`Решите $\cos x\geq \dfrac{1}{2}$.`,
        solution: String.raw`На $[0;2\pi]$ это $\bigl[0;\dfrac{\pi}{3}\bigr]\cup\bigl[\dfrac{5\pi}{3};2\pi\bigr]$, затем плюс $2\pi k$.`,
      },
    ],
    sample: {
      id: "tr10-s",
      type: "open",
      prompt: String.raw`Сколько решений на промежутке $[0;2\pi)$ имеет неравенство $\sin x=1$? (Это крайний случай неравенства $\sin x\geq 1$.)`,
      accepted: ["1", "1.0"],
      explanation: String.raw`Единственная точка $x=\dfrac{\pi}{2}$.`,
      solution: String.raw`Равенство $\sin x=1$ на периоде даёт $x=\dfrac{\pi}{2}+2\pi k$. На $[0;2\pi)$ попадает ровно одно значение $\dfrac{\pi}{2}$. Неравенство $\sin x\geq 1$ совпадает с этим равенством.`,
    },
    problems: [
      {
        id: "tr10-q1",
        type: "choice",
        prompt: String.raw`Неравенство $\sin x>2$`,
        options: [
          String.raw`верно при всех $x$`,
          String.raw`не имеет решений`,
          String.raw`верно при $x=\dfrac{\pi}{2}$`,
          String.raw`верно при $x>2$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Синус не превосходит $1$.`,
      },
      {
        id: "tr10-q2",
        type: "open",
        prompt: String.raw`Сколько корней уравнения $\sin x=0$ лежит на $[0;2\pi)$?`,
        accepted: ["2", "2.0"],
        explanation: String.raw`Точки $0$ и $\pi$ (значение $2\pi$ не входит).`,
      },
      {
        id: "tr10-q3",
        type: "choice",
        prompt: String.raw`Множество решений $\cos x>1$`,
        options: [
          String.raw`все $x$`,
          String.raw`пусто`,
          String.raw`$x=0$`,
          String.raw`$x=\pi$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Косинус не больше $1$; строгое неравенство пусто.`,
      },
      {
        id: "tr10-q4",
        type: "open",
        prompt: String.raw`Сколько решений $\cos x=1$ на $[0;2\pi)$?`,
        accepted: ["1", "1.0"],
        explanation: String.raw`Только $x=0$.`,
      },
      {
        id: "tr10-q5",
        type: "choice",
        prompt: String.raw`Неравенство $\sin x\geq -2$`,
        options: [
          String.raw`не имеет решений`,
          String.raw`верно при всех действительных $x$`,
          String.raw`верно только при $x=\dfrac{3\pi}{2}$`,
          String.raw`верно только при $x>0$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Синус всегда не меньше $-1$, тем более не меньше $-2$.`,
      },
      {
        id: "tr10-q6",
        type: "open",
        prompt: String.raw`Сколько решений $\sin x=-1$ на $[0;2\pi)$?`,
        accepted: ["1", "1.0"],
        explanation: String.raw`Точка $x=\dfrac{3\pi}{2}$.`,
      },
    ],
    sources: [
      {
        authors: "Алимов Ш.А., Колягин Ю.М., Ткачёва М.В. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "тригонометрические неравенства",
      },
      {
        authors: "Мордкович А.Г.",
        title: "Алгебра и начала математического анализа",
        note: "решение неравенств по тригонометрическому кругу",
      },
    ],
  }),

  makeLesson("school-trig", 0, "Синус, косинус и тангенс острого угла", {
    purpose:
      "В прямоугольном треугольнике тригонометрия начинается с отношений сторон. Эти определения дают табличные значения острых углов и связывают алгебру с геометрией треугольника.",
    nonexample: {
      title: "Противолежащий катет — не любой катет",
      text: String.raw`Для угла $A$ противолежащая сторона — та, что лежит напротив $A$, а прилежащий катет — другой катет, не гипотенуза. Смешать катеты — типичная ошибка: тогда синус и косинус меняются местами.`,
    },
    theory: String.raw`В прямоугольном треугольнике с острым углом $\alpha$ синус — отношение противолежащего катета к гипотенузе, косинус — отношение прилежащего катета к гипотенузе, тангенс — отношение противолежащего катета к прилежащему:
$\sin\alpha=\dfrac{\text{противолежащий}}{\text{гипотенуза}}$, $\cos\alpha=\dfrac{\text{прилежащий}}{\text{гипотенуза}}$, $\tan\alpha=\dfrac{\text{противолежащий}}{\text{прилежащий}}$.

Для острых углов все три величины положительны. Гипотенуза длиннее катета, поэтому $\sin\alpha<1$ и $\cos\alpha<1$. Дополнительный угол: $\sin(90^{\circ}-\alpha)=\cos\alpha$, $\tan(90^{\circ}-\alpha)=\cot\alpha$.

Основное тождество $\sin^{2}\alpha+\cos^{2}\alpha=1$ следует из теоремы Пифагора. Табличные углы $30^{\circ}$, $45^{\circ}$, $60^{\circ}$ получают из равностороннего и равнобедренного прямоугольного треугольников.`,
    examples: [
      {
        title: "Треугольник со сторонами $3$, $4$, $5$",
        problem: String.raw`В прямоугольном треугольнике катеты равны $3$ и $4$, гипотенуза равна $5$. Найдите синус угла, противолежащего катету $3$.`,
        solution: String.raw`Синус — отношение противолежащего катета к гипотенузе: $\sin\alpha=\dfrac{3}{5}$.`,
      },
      {
        title: "Тангенс",
        problem: String.raw`В том же треугольнике найдите тангенс угла, противолежащего катету $3$.`,
        solution: String.raw`Прилежащий катет равен $4$, поэтому $\tan\alpha=\dfrac{3}{4}$.`,
      },
    ],
    sample: {
      id: "tr11-s",
      type: "open",
      prompt: String.raw`В прямоугольном треугольнике противолежащий катет равен $5$, гипотенуза равна $13$. Найдите синус острого угла.`,
      accepted: ["5/13", "frac{5}{13}"],
      explanation: String.raw`$\sin\alpha=\dfrac{5}{13}$.`,
      solution: String.raw`По определению синус острого угла — отношение противолежащего катета к гипотенузе: $\dfrac{5}{13}$.`,
    },
    problems: [
      {
        id: "tr11-q1",
        type: "choice",
        prompt: String.raw`Синус острого угла в прямоугольном треугольнике — это отношение`,
        options: [
          "прилежащего катета к гипотенузе",
          "противолежащего катета к гипотенузе",
          "противолежащего катета к прилежащему",
          "гипотенузы к катету",
        ],
        answerIndex: 1,
        explanation: String.raw`Определение: противолежащий катет на гипотенузу.`,
      },
      {
        id: "tr11-q2",
        type: "open",
        prompt: String.raw`Катеты равны $6$ и $8$, гипотенуза равна $10$. Найдите косинус угла, прилежащего к катету $6$.`,
        accepted: ["3/5", "0.6", "0,6", "frac{3}{5}"],
        explanation: String.raw`Прилежащий катет $6$, гипотенуза $10$: $\dfrac{6}{10}=\dfrac{3}{5}$.`,
      },
      {
        id: "tr11-q3",
        type: "choice",
        prompt: String.raw`Равенство $\sin(90^{\circ}-\alpha)=\cos\alpha$ для острого $\alpha$`,
        options: [
          "неверно",
          "верно: дополнительный угол меняет синус на косинус",
          "верно только при $\alpha=45^{\circ}$",
          "верно только в радианах",
        ],
        answerIndex: 1,
        explanation: String.raw`Противолежащий катет для одного острого угла — прилежащий для другого.`,
      },
      {
        id: "tr11-q4",
        type: "open",
        prompt: String.raw`Противолежащий катет равен $3$, прилежащий равен $4$. Найдите тангенс острого угла.`,
        accepted: ["3/4", "0.75", "0,75", "frac{3}{4}"],
        explanation: String.raw`$\tan\alpha=\dfrac{3}{4}$.`,
      },
      {
        id: "tr11-q5",
        type: "choice",
        prompt: String.raw`Для острого угла синус, косинус и тангенс`,
        options: [
          "могут быть отрицательными",
          "положительны",
          "равны нулю",
          "не определены",
        ],
        answerIndex: 1,
        explanation: String.raw`В первой четверти все три функции положительны; острый угол лежит там.`,
      },
      {
        id: "tr11-q6",
        type: "open",
        prompt: String.raw`Прилежащий катет равен $8$, гипотенуза равна $10$. Найдите косинус острого угла.`,
        accepted: ["4/5", "0.8", "0,8", "frac{4}{5}"],
        explanation: String.raw`$\dfrac{8}{10}=\dfrac{4}{5}$.`,
      },
    ],
    sources: [
      {
        authors: "Атанасян Л.С., Бутузов В.Ф., Кадомцев С.Б. и др.",
        title: "Геометрия. 7–9 классы",
        note: "Синус, косинус и тангенс острого угла",
      },
      {
        authors: "Алимов Ш.А., Колягин Ю.М., Ткачёва М.В. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "Тригонометрия прямоугольного треугольника",
      },
    ],
  }),

  makeLesson("school-trig", 4, "Тангенс и котангенс: формулы", {
    purpose:
      "Тангенс и котангенс выражают через синус и косинус и связаны основным тождеством. Эти формулы упрощают выражения и сводят уравнения к виду $\\tan x=a$.",
    nonexample: {
      title: "При нулевом косинусе тангенса нет",
      text: String.raw`Тангенс $\tan\alpha=\dfrac{\sin\alpha}{\cos\alpha}$ не определён, когда $\cos\alpha=0$, то есть при $\alpha=\dfrac{\pi}{2}+\pi k$. Писать «$\tan\dfrac{\pi}{2}=\infty$» в школьном курсе не принято: значения просто нет.`,
    },
    theory: String.raw`По определению $\tan\alpha=\dfrac{\sin\alpha}{\cos\alpha}$ и $\cot\alpha=\dfrac{\cos\alpha}{\sin\alpha}$ там, где знаменатель не равен нулю. На общей области определения $\tan\alpha\cdot\cot\alpha=1$.

Следствия основного тождества: $1+\tan^{2}\alpha=\dfrac{1}{\cos^{2}\alpha}$ и $1+\cot^{2}\alpha=\dfrac{1}{\sin^{2}\alpha}$. Основной период обеих функций равен $\pi$. Тангенс — нечётная функция: $\tan(-\alpha)=-\tan\alpha$.

Табличные значения: $\tan 0=0$, $\tan\dfrac{\pi}{6}=\dfrac{1}{\sqrt{3}}$, $\tan\dfrac{\pi}{4}=1$, $\tan\dfrac{\pi}{3}=\sqrt{3}$. Котангенс в тех же точках — обратные величины (где определён).`,
    examples: [
      {
        title: "Через синус и косинус",
        problem: String.raw`Дано $\sin\alpha=\dfrac{3}{5}$, $\cos\alpha=\dfrac{4}{5}$. Найдите $\tan\alpha$.`,
        solution: String.raw`$\tan\alpha=\dfrac{3/5}{4/5}=\dfrac{3}{4}$.`,
      },
      {
        title: "Следствие тождества",
        problem: String.raw`Вычислите $1+\tan^{2}\dfrac{\pi}{4}$.`,
        solution: String.raw`$\tan\dfrac{\pi}{4}=1$, поэтому $1+1=2$. С другой стороны, $\dfrac{1}{\cos^{2}(\pi/4)}=\dfrac{1}{1/2}=2$.`,
      },
    ],
    sample: {
      id: "tr12-s",
      type: "open",
      prompt: String.raw`Найдите $\tan\alpha$, если $\sin\alpha=\dfrac{5}{13}$ и $\cos\alpha=\dfrac{12}{13}$.`,
      accepted: ["5/12", "frac{5}{12}"],
      explanation: String.raw`$\tan\alpha=\dfrac{5}{12}$.`,
      solution: String.raw`По определению $\tan\alpha=\dfrac{\sin\alpha}{\cos\alpha}=\dfrac{5/13}{12/13}=\dfrac{5}{12}$.`,
    },
    problems: [
      {
        id: "tr12-q1",
        type: "choice",
        prompt: String.raw`Формула тангенса имеет вид`,
        options: [
          String.raw`$\tan\alpha=\sin\alpha\cos\alpha$`,
          String.raw`$\tan\alpha=\dfrac{\sin\alpha}{\cos\alpha}$`,
          String.raw`$\tan\alpha=\dfrac{\cos\alpha}{\sin\alpha}$`,
          String.raw`$\tan\alpha=\sin\alpha+\cos\alpha$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Тангенс — отношение синуса к косинусу.`,
      },
      {
        id: "tr12-q2",
        type: "open",
        prompt: String.raw`Найдите $\tan\alpha$, если $\sin\alpha=\dfrac{3}{5}$ и $\cos\alpha=\dfrac{4}{5}$.`,
        accepted: ["3/4", "0.75", "0,75", "frac{3}{4}"],
        explanation: String.raw`$\dfrac{3}{4}$.`,
      },
      {
        id: "tr12-q3",
        type: "choice",
        prompt: String.raw`Тождество $1+\tan^{2}\alpha$ равно`,
        options: [
          String.raw`$\dfrac{1}{\sin^{2}\alpha}$`,
          String.raw`$\dfrac{1}{\cos^{2}\alpha}$`,
          String.raw`$\sin^{2}\alpha$`,
          String.raw`$1$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Следствие основного тождества после деления на $\cos^{2}\alpha$.`,
      },
      {
        id: "tr12-q4",
        type: "open",
        prompt: String.raw`Найдите $\tan\dfrac{\pi}{4}$.`,
        accepted: ["1", "1.0"],
        explanation: String.raw`Синус и косинус равны, отношение равно $1$.`,
      },
      {
        id: "tr12-q5",
        type: "choice",
        prompt: String.raw`Тангенс не определён, когда`,
        options: [
          String.raw`$\sin\alpha=0$`,
          String.raw`$\cos\alpha=0$`,
          String.raw`$\alpha=0$`,
          String.raw`$\alpha=\pi$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Знаменатель $\cos\alpha$ равен нулю при $\alpha=\dfrac{\pi}{2}+\pi k$.`,
      },
      {
        id: "tr12-q6",
        type: "open",
        prompt: String.raw`Известно, что $\tan\alpha=2$ и котангенс определён. Найдите $\cot\alpha$.`,
        accepted: ["1/2", "0.5", "0,5", "frac{1}{2}"],
        explanation: String.raw`$\cot\alpha=\dfrac{1}{\tan\alpha}=\dfrac{1}{2}$.`,
      },
    ],
    sources: [
      {
        authors: "Колмогоров А.Н., Абрамов А.М., Дудницын Ю.П. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "Тангенс и котангенс, следствия основного тождества",
      },
      {
        authors: "Мордкович А.Г.",
        title: "Алгебра и начала математического анализа",
        note: "Формулы тангенса и котангенса",
      },
    ],
  }),

  makeLesson("school-trig", 9, "Уравнения sin x = a и cos x = a", {
    purpose:
      "Общие семейства корней — основа всех тригонометрических уравнений. Нужно записывать оба решения на периоде и не терять слагаемое $2\\pi k$.",
    nonexample: {
      title: "Не один корень, а два семейства",
      text: String.raw`Уравнение $\sin x=\dfrac{1}{2}$ имеет не единственный корень $\dfrac{\pi}{6}$, а два семейства: $x=\dfrac{\pi}{6}+2\pi k$ и $x=\dfrac{5\pi}{6}+2\pi k$, $k\in\mathbb{Z}$. Записать только первое — типичный пропуск.`,
    },
    theory: String.raw`Уравнение $\sin x=a$ при $|a|\leq 1$ имеет решения $x=(-1)^{k}\arcsin a+\pi k$, $k\in\mathbb{Z}$. Равносильная запись двумя семействами: $x=\arcsin a+2\pi k$ и $x=\pi-\arcsin a+2\pi k$. Если $|a|>1$, решений нет.

Уравнение $\cos x=a$ при $|a|\leq 1$: $x=\pm\arccos a+2\pi k$. Если $|a|>1$, решений нет.

Частные случаи удобно помнить отдельно: $\sin x=0$ даёт $x=\pi k$; $\sin x=1$ даёт $x=\dfrac{\pi}{2}+2\pi k$; $\sin x=-1$ даёт $x=-\dfrac{\pi}{2}+2\pi k$; $\cos x=0$ даёт $x=\dfrac{\pi}{2}+\pi k$; $\cos x=1$ даёт $x=2\pi k$; $\cos x=-1$ даёт $x=\pi+2\pi k$. На промежутке длины $2\pi$ у уравнений $\sin x=a$ и $\cos x=a$ при $|a|<1$ ровно два корня, при $|a|=1$ — один.`,
    examples: [
      {
        title: "Синус",
        problem: String.raw`Решите уравнение $\sin x=\dfrac{\sqrt{2}}{2}$.`,
        solution: String.raw`$\arcsin\dfrac{\sqrt{2}}{2}=\dfrac{\pi}{4}$. Семейства: $x=\dfrac{\pi}{4}+2\pi k$ и $x=\dfrac{3\pi}{4}+2\pi k$, $k\in\mathbb{Z}$.`,
      },
      {
        title: "Косинус",
        problem: String.raw`Решите уравнение $\cos x=-\dfrac{1}{2}$.`,
        solution: String.raw`$\arccos\bigl(-\dfrac{1}{2}\bigr)=\dfrac{2\pi}{3}$. Общее решение: $x=\pm\dfrac{2\pi}{3}+2\pi k$, $k\in\mathbb{Z}$.`,
      },
    ],
    sample: {
      id: "tr13-s",
      type: "open",
      prompt: String.raw`Сколько корней имеет уравнение $\sin x=\dfrac{1}{2}$ на промежутке $[0;2\pi)$?`,
      accepted: ["2", "2.0"],
      explanation: String.raw`Корни $\dfrac{\pi}{6}$ и $\dfrac{5\pi}{6}$.`,
      solution: String.raw`На периоде два решения: $\dfrac{\pi}{6}$ и $\dfrac{5\pi}{6}$. Оба лежат в $[0;2\pi)$. Следующие получаются сдвигом на $2\pi$ и в промежуток не входят.`,
    },
    problems: [
      {
        id: "tr13-q1",
        type: "choice",
        prompt: String.raw`Уравнение $\sin x=2$`,
        options: [
          String.raw`имеет корень $x=2$`,
          "не имеет решений",
          String.raw`имеет корни $x=\arcsin 2$`,
          "имеет ровно один корень",
        ],
        answerIndex: 1,
        explanation: String.raw`Значения синуса лежат в $[-1;1]$.`,
      },
      {
        id: "tr13-q2",
        type: "open",
        prompt: String.raw`Сколько корней уравнения $\sin x=0$ лежит на $[0;2\pi)$?`,
        accepted: ["2", "2.0"],
        explanation: String.raw`Точки $0$ и $\pi$ (значение $2\pi$ не входит).`,
      },
      {
        id: "tr13-q3",
        type: "choice",
        prompt: String.raw`Общее решение уравнения $\sin x=1$ имеет вид`,
        options: [
          String.raw`$x=\pi k$`,
          String.raw`$x=\dfrac{\pi}{2}+2\pi k$`,
          String.raw`$x=\pi+2\pi k$`,
          String.raw`$x=2\pi k$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Синус равен $1$ только в точках $\dfrac{\pi}{2}+2\pi k$.`,
      },
      {
        id: "tr13-q4",
        type: "open",
        prompt: String.raw`Найдите наименьший положительный корень уравнения $\cos x=\dfrac{1}{2}$.`,
        accepted: ["π/3", "pi/3", "frac{π}{3}", "frac{pi}{3}", "\\frac{\\pi}{3}"],
        explanation: String.raw`$x=\pm\dfrac{\pi}{3}+2\pi k$; наименьший положительный — $\dfrac{\pi}{3}$.`,
      },
      {
        id: "tr13-q5",
        type: "choice",
        prompt: String.raw`Общее решение уравнения $\cos x=-1$ — это`,
        options: [
          String.raw`$x=2\pi k$`,
          String.raw`$x=\pi+2\pi k$`,
          String.raw`$x=\dfrac{\pi}{2}+\pi k$`,
          String.raw`$x=\pi k$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Косинус равен $-1$ в точках $\pi+2\pi k$.`,
      },
      {
        id: "tr13-q6",
        type: "open",
        prompt: String.raw`Сколько корней уравнения $\cos x=0$ лежит на $[0;2\pi)$?`,
        accepted: ["2", "2.0"],
        explanation: String.raw`Точки $\dfrac{\pi}{2}$ и $\dfrac{3\pi}{2}$.`,
      },
    ],
    sources: [
      {
        authors: "Мордкович А.Г.",
        title: "Алгебра и начала математического анализа",
        note: "Простейшие уравнения $\\sin x=a$ и $\\cos x=a$",
      },
      {
        authors: "Алимов Ш.А., Колягин Ю.М., Ткачёва М.В. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "Общие формулы решений, отбор корней на промежутке",
      },
    ],
  }),

  makeLesson("school-trig", 10, "Однородные тригонометрические уравнения", {
    purpose:
      "Уравнения, однородные относительно синуса и косинуса, сводят к уравнению на тангенс. Приём убирает «смесь» двух функций и входит в типовые варианты.",
    nonexample: {
      title: "Деление на косинус может потерять корни",
      text: String.raw`Делить на $\cos x$ (или на $\cos^{2} x$) можно только там, где он не равен нулю. Сначала проверяют, удовлетворяют ли точки $\cos x=0$ исходному уравнению. Если да — их записывают отдельно; если нет — деление законно на всей области.`,
    },
    theory: String.raw`Уравнение первой степени $a\sin x+b\cos x=0$ однородно. Если $\cos x=0$, то $\sin x=\pm 1$ и условие превращается в $a=0$. При $a\neq 0$ эти точки не являются корнями, можно делить на $\cos x$ и получать $\tan x=-\dfrac{b}{a}$.

Уравнение второй степени $a\sin^{2} x+b\sin x\cos x+c\cos^{2} x=0$ однородно порядка $2$. При $a\neq 0$ точки $\cos x=0$ снова не подходят (остаётся $a=0$). Деление на $\cos^{2} x$ даёт квадратное уравнение относительно $t=\tan x$.

После нахождения $t$ решают простейшее уравнение $\tan x=t$: $x=\arctan t+\pi k$. Посторонних корней от деления нет, если проверка $\cos x=0$ уже сделана.`,
    examples: [
      {
        title: "Первая степень",
        problem: String.raw`Решите уравнение $\sin x-\cos x=0$.`,
        solution: String.raw`При $\cos x=0$ получили бы $\pm 1=0$ — невозможно. Делим: $\tan x=1$, $x=\dfrac{\pi}{4}+\pi k$, $k\in\mathbb{Z}$.`,
      },
      {
        title: "Вторая степень",
        problem: String.raw`Решите $\sin^{2} x-\sin x\cos x=0$.`,
        solution: String.raw`$\sin x(\sin x-\cos x)=0$. Либо $\sin x=0$, $x=\pi k$, либо $\tan x=1$, $x=\dfrac{\pi}{4}+\pi k$. (Проверка: при $\sin x=0$ исходное выполняется.)`,
      },
    ],
    sample: {
      id: "tr14-s",
      type: "open",
      prompt: String.raw`Найдите наименьший положительный корень уравнения $\sin x=\cos x$.`,
      accepted: ["π/4", "pi/4", "frac{π}{4}", "frac{pi}{4}", "\\frac{\\pi}{4}"],
      explanation: String.raw`$\tan x=1$, $x=\dfrac{\pi}{4}+\pi k$; наименьший положительный — $\dfrac{\pi}{4}$.`,
      solution: String.raw`Точки $\cos x=0$ не подходят. Деление даёт $\tan x=1$, откуда $x=\dfrac{\pi}{4}+\pi k$. Наименьший положительный корень равен $\dfrac{\pi}{4}$. Проверка: $\sin\dfrac{\pi}{4}=\cos\dfrac{\pi}{4}$.`,
    },
    problems: [
      {
        id: "tr14-q1",
        type: "choice",
        prompt: String.raw`Уравнение $\sin x=\cos x$ при $\cos x\neq 0$ равносильно`,
        options: [
          String.raw`$\tan x=0$`,
          String.raw`$\tan x=1$`,
          String.raw`$\tan x=-1$`,
          String.raw`$\sin x=1$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Деление на $\cos x$ даёт $\tan x=1$.`,
      },
      {
        id: "tr14-q2",
        type: "open",
        prompt: String.raw`Найдите наименьший положительный корень уравнения $\sin x=\sqrt{3}\cos x$.`,
        accepted: ["π/3", "pi/3", "frac{π}{3}", "frac{pi}{3}", "\\frac{\\pi}{3}"],
        explanation: String.raw`$\tan x=\sqrt{3}$, $x=\dfrac{\pi}{3}+\pi k$.`,
      },
      {
        id: "tr14-q3",
        type: "choice",
        prompt: String.raw`Если в уравнении $2\sin x+\cos x=0$ подставить $\cos x=0$, получится`,
        options: [
          "тождество, значит эти точки — корни",
          "противоречие $2\cdot(\pm 1)=0$, значит делить на косинус можно",
          "уравнение $\sin x=0$",
          "уравнение $\tan x=2$",
        ],
        answerIndex: 1,
        explanation: String.raw`При $\cos x=0$ имеем $\sin x=\pm 1$, тогда $\pm 2=0$ — ложь. Потерь нет.`,
      },
      {
        id: "tr14-q4",
        type: "open",
        prompt: String.raw`Сколько корней уравнения $\sin x+\cos x=0$ лежит на $[0;2\pi)$?`,
        accepted: ["2", "2.0"],
        explanation: String.raw`$\tan x=-1$: точки $\dfrac{3\pi}{4}$ и $\dfrac{7\pi}{4}$.`,
      },
      {
        id: "tr14-q5",
        type: "choice",
        prompt: String.raw`После деления однородного уравнения $a\sin^{2} x+b\sin x\cos x+c\cos^{2} x=0$ на $\cos^{2} x$ получают уравнение относительно`,
        options: [
          String.raw`$\sin x$`,
          String.raw`$\tan x$`,
          String.raw`$x$ без тригонометрии`,
          String.raw`$\cos 2x$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Появляется $a t^{2}+b t+c=0$, где $t=\tan x$.`,
      },
      {
        id: "tr14-q6",
        type: "open",
        prompt: String.raw`Найдите наименьший положительный корень уравнения $\sin x+\cos x=0$.`,
        accepted: ["3π/4", "3pi/4", "frac{3π}{4}", "frac{3pi}{4}", "\\frac{3\\pi}{4}"],
        explanation: String.raw`$\tan x=-1$, наименьший положительный корень — $\dfrac{3\pi}{4}$.`,
      },
    ],
    sources: [
      {
        authors: "Алимов Ш.А., Колягин Ю.М., Ткачёва М.В. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "Однородные тригонометрические уравнения",
      },
      {
        authors: "Никольский С.М., Потапов М.К., Решетников Н.Н., Шевкин А.В.",
        title: "Алгебра и начала математического анализа. 10–11 классы",
        note: "Сведение к уравнению относительно тангенса",
      },
    ],
  }),

  makeLesson("school-trig", 13, "Простейшие уравнения с арксинусом и арктангенсом", {
    purpose:
      "Арксинус и арктангенс уже введены как функции; теперь решают уравнения $\\arcsin x=a$ и $\\arctan x=a$. Нужно помнить область значений: иначе появляются посторонние «корни».",
    nonexample: {
      title: "Арксинус не бывает равен $\\pi$",
      text: String.raw`Уравнение $\arcsin x=\pi$ решений не имеет: число $\pi$ не лежит на отрезке $\bigl[-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\bigr]$. Ошибка — взять синус от $\pi$ и ответить $x=0$: равенство $\arcsin 0=0$, а не $\pi$.`,
    },
    theory: String.raw`Уравнение $\arcsin x=a$ имеет решение тогда и только тогда, когда $a\in\bigl[-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\bigr]$. В этом случае $x=\sin a$, и автоматически $x\in[-1;1]$. Если $a$ вне отрезка значений арксинуса, корней нет.

Уравнение $\arctan x=a$ разрешимо при $a\in\bigl(-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\bigr)$; тогда $x=\tan a$. Вне этого интервала решений нет.

Тождество $\sin(\arcsin x)=x$ верно на $[-1;1]$, а $\arcsin(\sin a)=a$ — только когда $a$ уже лежит в области значений арксинуса. Аналогично для арктангенса: $\tan(\arctan x)=x$ на всей прямой, но $\arctan(\tan a)=a$ лишь при $a\in\bigl(-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\bigr)$.`,
    examples: [
      {
        title: "Арксинус",
        problem: String.raw`Решите уравнение $\arcsin x=\dfrac{\pi}{6}$.`,
        solution: String.raw`Число $\dfrac{\pi}{6}$ лежит в области значений арксинуса, поэтому $x=\sin\dfrac{\pi}{6}=\dfrac{1}{2}$.`,
      },
      {
        title: "Арктангенс",
        problem: String.raw`Решите уравнение $\arctan x=\dfrac{\pi}{4}$.`,
        solution: String.raw`$\dfrac{\pi}{4}\in\bigl(-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\bigr)$, значит $x=\tan\dfrac{\pi}{4}=1$.`,
      },
    ],
    sample: {
      id: "tr15-s",
      type: "open",
      prompt: String.raw`Решите уравнение $\arcsin x=\dfrac{\pi}{2}$.`,
      accepted: ["1", "1.0"],
      explanation: String.raw`$x=\sin\dfrac{\pi}{2}=1$.`,
      solution: String.raw`Значение $\dfrac{\pi}{2}$ — правый конец области значений арксинуса. По определению $x=\sin\dfrac{\pi}{2}=1$. Проверка: $\arcsin 1=\dfrac{\pi}{2}$.`,
    },
    problems: [
      {
        id: "tr15-q1",
        type: "choice",
        prompt: String.raw`Уравнение $\arcsin x=\pi$`,
        options: [
          String.raw`имеет корень $x=0$`,
          "не имеет решений",
          String.raw`имеет корень $x=-1$`,
          String.raw`имеет корень $x=1$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Число $\pi$ не принадлежит области значений арксинуса.`,
      },
      {
        id: "tr15-q2",
        type: "open",
        prompt: String.raw`Решите уравнение $\arcsin x=0$.`,
        accepted: ["0", "0.0"],
        explanation: String.raw`$x=\sin 0=0$.`,
      },
      {
        id: "tr15-q3",
        type: "choice",
        prompt: String.raw`Область значений $\arctan$ — это`,
        options: [
          String.raw`$[0;\,\pi]$`,
          String.raw`$\bigl(-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\bigr)$`,
          String.raw`$\bigl[-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\bigr]$`,
          String.raw`$\mathbb{R}$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Арктангенс принимает значения из открытого интервала $\bigl(-\dfrac{\pi}{2};\,\dfrac{\pi}{2}\bigr)$.`,
      },
      {
        id: "tr15-q4",
        type: "open",
        prompt: String.raw`Решите уравнение $\arctan x=\dfrac{\pi}{4}$.`,
        accepted: ["1", "1.0"],
        explanation: String.raw`$x=\tan\dfrac{\pi}{4}=1$.`,
      },
      {
        id: "tr15-q5",
        type: "choice",
        prompt: String.raw`Корень уравнения $\arcsin x=-\dfrac{\pi}{2}$ равен`,
        options: ["$0$", "$1$", "$-1$", "не существует"],
        answerIndex: 2,
        explanation: String.raw`$x=\sin\bigl(-\dfrac{\pi}{2}\bigr)=-1$.`,
      },
      {
        id: "tr15-q6",
        type: "open",
        prompt: String.raw`Решите уравнение $\arcsin x=\dfrac{\pi}{6}$.`,
        accepted: ["1/2", "0.5", "0,5", "frac{1}{2}"],
        explanation: String.raw`$x=\sin\dfrac{\pi}{6}=\dfrac{1}{2}$.`,
      },
    ],
    sources: [
      {
        authors: "Никольский С.М., Потапов М.К., Решетников Н.Н., Шевкин А.В.",
        title: "Алгебра и начала математического анализа. 10–11 классы",
        note: "Уравнения с обратными тригонометрическими функциями",
      },
      {
        authors: "Алимов Ш.А., Колягин Ю.М., Ткачёва М.В. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "Область значений арксинуса и арктангенса",
      },
    ],
  }),

  makeLesson("school-trig", 15, "Практика тригонометрических тождеств", {
    purpose:
      "Тождество проверяют на общей области, где обе части определены. Практика соединяет основное тождество, двойной угол и формулы тангенса в одно упрощение.",
    nonexample: {
      title: "Нельзя без проверки делить на синус",
      text: String.raw`«Доказать» равенство, разделив обе части на $\sin x$, нельзя: при $\sin x=0$ исходные выражения могут быть определены, а сокращение теряет этот случай. Сначала указывают область, затем преобразуют, не уничтожая множители, которые могут обратиться в нуль.`,
    },
    theory: String.raw`Доказать тождество — значит показать, что на общей области определения левая часть равна правой. Обычно одну сторону приводят к другой или обе — к одному и тому же выражению.

Опорные формулы: $\sin^{2}\alpha+\cos^{2}\alpha=1$; $\sin 2\alpha=2\sin\alpha\cos\alpha$; $\cos 2\alpha=\cos^{2}\alpha-\sin^{2}\alpha=2\cos^{2}\alpha-1=1-2\sin^{2}\alpha$; $\tan\alpha\cdot\cot\alpha=1$. Формулы понижения степени: $\sin^{2}\alpha=\dfrac{1-\cos 2\alpha}{2}$, $\cos^{2}\alpha=\dfrac{1+\cos 2\alpha}{2}$.

Если в выражении есть тангенс, его часто заменяют отношением синуса к косинусу и приводят к общему знаменателю. Численная проверка в одной точке не заменяет доказательства, но помогает поймать ошибку в знаке.`,
    examples: [
      {
        title: "Основное тождество",
        problem: String.raw`Упростите $\sin^{2}\dfrac{\pi}{5}+\cos^{2}\dfrac{\pi}{5}$.`,
        solution: String.raw`По основному тождеству сумма квадратов равна $1$ при любом угле, в том числе $\dfrac{\pi}{5}$.`,
      },
      {
        title: "Двойной угол",
        problem: String.raw`Вычислите $2\sin\dfrac{\pi}{4}\cos\dfrac{\pi}{4}$.`,
        solution: String.raw`Это $\sin\dfrac{\pi}{2}=1$. Напрямую: $2\cdot\dfrac{\sqrt{2}}{2}\cdot\dfrac{\sqrt{2}}{2}=1$.`,
      },
    ],
    sample: {
      id: "tr16-s",
      type: "open",
      prompt: String.raw`Вычислите $\sin^{2}\dfrac{\pi}{7}+\cos^{2}\dfrac{\pi}{7}$.`,
      accepted: ["1", "1.0"],
      explanation: String.raw`Основное тождество: сумма равна $1$.`,
      solution: String.raw`Для любого действительного угла $\sin^{2}\alpha+\cos^{2}\alpha=1$. При $\alpha=\dfrac{\pi}{7}$ получаем $1$.`,
    },
    problems: [
      {
        id: "tr16-q1",
        type: "choice",
        prompt: String.raw`Выражение $\sin^{2}\alpha+\cos^{2}\alpha$ тождественно равно`,
        options: ["$0$", "$1$", String.raw`$\sin 2\alpha$`, String.raw`$\tan\alpha$`],
        answerIndex: 1,
        explanation: String.raw`Основное тригонометрическое тождество.`,
      },
      {
        id: "tr16-q2",
        type: "open",
        prompt: String.raw`Вычислите $1-2\sin^{2}\dfrac{\pi}{4}$.`,
        accepted: ["0", "0.0"],
        explanation: String.raw`$1-2\cdot\dfrac{1}{2}=0$, и это $\cos\dfrac{\pi}{2}$.`,
      },
      {
        id: "tr16-q3",
        type: "choice",
        prompt: String.raw`Формула $\cos 2\alpha$ среди прочего равна`,
        options: [
          String.raw`$\cos^{2}\alpha+\sin^{2}\alpha$`,
          String.raw`$\cos^{2}\alpha-\sin^{2}\alpha$`,
          String.raw`$2\sin\alpha\cos\alpha$`,
          String.raw`$\sin^{2}\alpha-\cos^{2}\alpha$`,
        ],
        answerIndex: 1,
        explanation: String.raw`Один из трёх стандартных видов: разность квадратов.`,
      },
      {
        id: "tr16-q4",
        type: "open",
        prompt: String.raw`Вычислите $\tan\dfrac{\pi}{4}\cdot\cot\dfrac{\pi}{4}$.`,
        accepted: ["1", "1.0"],
        explanation: String.raw`Произведение тангенса и котангенса равно $1$.`,
      },
      {
        id: "tr16-q5",
        type: "choice",
        prompt: String.raw`Выражение $1-2\sin^{2}\alpha$ тождественно равно`,
        options: [
          String.raw`$\sin 2\alpha$`,
          String.raw`$\cos 2\alpha$`,
          String.raw`$\tan\alpha$`,
          "$1$",
        ],
        answerIndex: 1,
        explanation: String.raw`Формула косинуса двойного угла через синус.`,
      },
      {
        id: "tr16-q6",
        type: "open",
        prompt: String.raw`Найдите $\sin 2\alpha$, если $\sin\alpha=\cos\alpha=\dfrac{\sqrt{2}}{2}$.`,
        accepted: ["1", "1.0"],
        explanation: String.raw`$2\cdot\dfrac{\sqrt{2}}{2}\cdot\dfrac{\sqrt{2}}{2}=1$.`,
      },
    ],
    sources: [
      {
        authors: "Алимов Ш.А., Колягин Ю.М., Ткачёва М.В. и др.",
        title: "Алгебра и начала анализа. 10–11 классы",
        note: "Преобразование тригонометрических выражений",
      },
      {
        authors: "Мордкович А.Г.",
        title: "Алгебра и начала математического анализа",
        note: "Практика тождеств, двойной угол, основное тождество",
      },
    ],
  }),
];
