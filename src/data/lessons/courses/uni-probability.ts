import { makeLesson } from "../../makeLesson";
import type { Lesson } from "../../../types";

const src = [
  {
    authors: "Гнеденко Б.В.",
    title: "Курс теории вероятностей",
    note: "аксиоматика, схемы, предельные теоремы",
  },
  {
    authors: "Ширяев А.Н.",
    title: "Вероятность",
    note: "мера, случайные величины, характеристические функции, условное ожидание",
  },
];

export const lessons: Lesson[] = [
  makeLesson("uni-probability", 0, "Аксиоматика Колмогорова", {
    theory:
      "Вероятностное пространство $(\\Omega,\\mathcal{F},\\mathbb{P})$: $\\mathcal{F}$ — $\\sigma$-алгебра событий, $\\mathbb{P}\\colon\\mathcal{F}\\to[0,1]$ счётна-аддитивна, $\\mathbb{P}(\\Omega)=1$. Следствия: $\\mathbb{P}(\\emptyset)=0$, монотонность, непрерывность снизу/сверху. Формула включений для конечного числа событий. Независимость семейства: для любого конечного набора $\\mathbb{P}(\\cap A_i)=\\prod\\mathbb{P}(A_i)$. Классическая вероятность $|A|/|\\Omega|$ на конечном равновероятном пространстве. Борелевская $\\sigma$-алгебра на $\\mathbb{R}$ порождена интервалами.",
    examples: [
      {
        title: "Дополнение",
        problem: "$\\mathbb{P}(A)=0{,}3$. Найдите $\\mathbb{P}(A^{c})$.",
        solution: "$0{,}7$.",
      },
      {
        title: "Несовместность",
        problem: "Если $A\\cap B=\\emptyset$, $\\mathbb{P}(A\\cup B)=$",
        solution: "$\\mathbb{P}(A)+\\mathbb{P}(B)$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$\\mathbb{P}(\\Omega)$ по аксиоме нормировки равно",
      accepted: ["1"],
      explanation: "Вероятность достоверного события.",
      solution: "Аксиома Колмогорова $\\mathbb{P}(\\Omega)=1$.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Счётная аддитивность относится к",
        options: ["конечным объединениям только", "непересекающимся счётным объединениям", "произвольным пересечениям", "дополнениям"],
        answerIndex: 1,
        explanation: "$\\mathbb{P}(\\sqcup A_n)=\\sum\\mathbb{P}(A_n)$.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "$\\mathbb{P}(A)=0{,}2$, $\\mathbb{P}(B)=0{,}3$, $A\\cap B=\\emptyset$. $\\mathbb{P}(A\\cup B)=$",
        accepted: ["0.5", "0,5", "1/2"],
        explanation: "Сложение.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "$\\sigma$-алгебра замкнута относительно",
        options: ["только конечных объединений", "счётных объединений и дополнений", "произвольных объединений любой мощности всегда", "образов непрерывных функций"],
        answerIndex: 1,
        explanation: "Определение $\\sigma$-алгебры.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "$\\mathbb{P}(\\emptyset)$ равно",
        accepted: ["0"],
        explanation: "Следствие аддитивности.",
      },
      {
        id: "p5",
        type: "choice",
        prompt: "Классическая вероятность предполагает",
        options: ["бесконечное $\\Omega$", "равновозможность исходов конечного $\\Omega$", "непрерывность плотности", "мартингалы"],
        answerIndex: 1,
        explanation: "$|A|/n$.",
      },
      {
        id: "p6",
        type: "open",
        prompt: "Если $A\\subset B$ и $\\mathbb{P}(B)=0{,}4$, $\\mathbb{P}(A)=0{,}1$, то $\\mathbb{P}(B\\setminus A)=$",
        accepted: ["0.3", "0,3", "3/10"],
        explanation: "$0{,}4-0{,}1$.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 1, "Условная вероятность и независимость", {
    theory:
      "При $\\mathbb{P}(B)>0$ полагают $\\mathbb{P}(A\\mid B)=\\mathbb{P}(A\\cap B)/\\mathbb{P}(B)$. Умножение: $\\mathbb{P}(A\\cap B)=\\mathbb{P}(B)\\mathbb{P}(A\\mid B)$. События независимы, если $\\mathbb{P}(A\\cap B)=\\mathbb{P}(A)\\mathbb{P}(B)$; тогда $\\mathbb{P}(A\\mid B)=\\mathbb{P}(A)$. Попарная независимость не влечёт независимость в совокупности (пример Бернштейна). Условная вероятность при фиксированном $B$ сама есть вероятность на $\\mathcal{F}$. Независимость $\\sigma$-алгебр: все пары событий из разных алгебр независимы.",
    examples: [
      {
        title: "Карты",
        problem: "Из колоды $52$, $\\mathbb{P}(\\text{туз}\\mid\\text{пика})=1/13$.",
        solution: "Среди $13$ пик один туз.",
      },
      {
        title: "Независимость",
        problem: "Два броска монеты: орёл на первом и на втором независимы?",
        solution: "Да, при честной модели $\\mathbb{P}=1/4=(1/2)^{2}$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$\\mathbb{P}(A\\cap B)=0{,}2$, $\\mathbb{P}(B)=0{,}5$. Найдите $\\mathbb{P}(A\\mid B)$.",
      accepted: ["0.4", "0,4", "2/5"],
      explanation: "$0{,}2/0{,}5=0{,}4$.",
      solution: "Определение условной вероятности.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Независимость $A$ и $B$ означает",
        options: ["$A\\cap B=\\emptyset$", "$\\mathbb{P}(A\\cap B)=\\mathbb{P}(A)\\mathbb{P}(B)$", "$\\mathbb{P}(A\\mid B)=0$", "$A=B$"],
        answerIndex: 1,
        explanation: "Определение.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "$\\mathbb{P}(A)=0{,}5$, $\\mathbb{P}(B)=0{,}4$, независимы. $\\mathbb{P}(A\\cap B)=$",
        accepted: ["0.2", "0,2", "1/5"],
        explanation: "Произведение.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "Попарная независимость трёх событий",
        options: ["равносильна полной независимости", "не влечёт независимость в совокупности", "запрещает пересечения", "требует $\\mathbb{P}=0$"],
        answerIndex: 1,
        explanation: "Контрпример Бернштейна.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "$\\mathbb{P}(A\\mid A)=1$ при $\\mathbb{P}(A)>0$. Запишите $1$.",
        accepted: ["1"],
        explanation: "$A\\cap A=A$.",
      },
      {
        id: "p5",
        type: "open",
        prompt: "$\\mathbb{P}(B)=1/3$, $\\mathbb{P}(A\\mid B)=1/2$. $\\mathbb{P}(A\\cap B)=$",
        accepted: ["1/6"],
        explanation: "Правило умножения.",
      },
      {
        id: "p6",
        type: "choice",
        prompt: "Если $\\mathbb{P}(B)=0$, условная $\\mathbb{P}(A\\mid B)$",
        options: ["всегда $0$", "не определяется классической формулой", "равна $1$", "равна $\\mathbb{P}(A)$"],
        answerIndex: 1,
        explanation:
          "Классическая формула $\\mathbb{P}(A\\mid B)=\\mathbb{P}(A\\cap B)/\\mathbb{P}(B)$ неприменима: делить на нуль нельзя. В непрерывных моделях условные распределения при фиксированном значении задают отдельной конструкцией, и для неё нужны дополнительные условия. Универсального «вычисления через интеграл» здесь нет.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 2, "Формула полной вероятности и формула Байеса", {
    theory:
      "Если $\{H_i\\}$ — полная группа (разбиение $\\Omega$, $\\mathbb{P}(H_i)>0$), то $\\mathbb{P}(A)=\\sum \\mathbb{P}(H_i)\\mathbb{P}(A\\mid H_i)$ — формула полной вероятности. Формула Байеса: $\\mathbb{P}(H_k\\mid A)=\\mathbb{P}(H_k)\\mathbb{P}(A\\mid H_k)/\\mathbb{P}(A)$ обновляет априорные вероятности гипотез апостериорными. Интерпретация: правдоподобие данных перевзвешивает гипотезы. Непрерывный аналог — плотности и формула Байеса для плотностей. Типичные задачи: диагнозы, ложные тревоги тестов, урны.",
    examples: [
      {
        title: "Две урны",
        problem: "Урны равновероятны; в первой $1$ белый из $2$, во второй $2$ из $2$. $\\mathbb{P}(\\text{белый})$.",
        solution: "$\\frac12\\cdot\\frac12+\\frac12\\cdot 1=\\frac34$.",
      },
      {
        title: "Байес",
        problem: "После белого шара $\\mathbb{P}(\\text{вторая урна}\\mid\\text{белый})$.",
        solution: "$(\\frac12\\cdot 1)/(\\frac34)=\\frac23$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$\\mathbb{P}(H_1)=\\mathbb{P}(H_2)=1/2$, $\\mathbb{P}(A\\mid H_1)=1$, $\\mathbb{P}(A\\mid H_2)=0$. $\\mathbb{P}(A)=$",
      accepted: ["1/2", "0.5"],
      explanation: "Полная вероятность $1/2$.",
      solution: "$\\frac12\\cdot 1+\\frac12\\cdot 0=\\frac12$.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Формула Байеса вычисляет",
        options: ["априорные вероятности из ничего", "апостериорные $\\mathbb{P}(H\\mid A)$", "только $\\mathbb{P}(A)$", "дисперсию"],
        answerIndex: 1,
        explanation: "Обновление гипотез.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "Полная вероятность: два гипотезы $1/3$ и $2/3$, условные $0$ и $1$. $\\mathbb{P}(A)=$",
        accepted: ["2/3"],
        explanation: "$0+2/3$.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "Полная группа гипотез",
        options: ["пересекается", "образует разбиение $\\Omega$", "состоит из независимых событий обязательно", "пустая"],
        answerIndex: 1,
        explanation: "Дизъюнктное покрытие.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "Байес: $\\mathbb{P}(H)=0{,}2$, $\\mathbb{P}(A\\mid H)=0{,}5$, $\\mathbb{P}(A)=0{,}4$. $\\mathbb{P}(H\\mid A)=$",
        accepted: ["0.25", "0,25", "1/4"],
        explanation: "$0{,}1/0{,}4=0{,}25$.",
      },
      {
        id: "p5",
        type: "open",
        prompt: "Если $\\mathbb{P}(A\\mid H_i)$ одинаковы и равны $p$, то $\\mathbb{P}(A)=p$. При $p=0{,}7$ ответ",
        accepted: ["0.7", "0,7", "7/10"],
        explanation: "Выносится за сумму.",
      },
      {
        id: "p6",
        type: "choice",
        prompt: "Априорная вероятность гипотезы — это",
        options: ["$\\mathbb{P}(H\\mid A)$", "$\\mathbb{P}(H)$ до опыта", "$\\mathbb{P}(A\\mid H)$", "правдоподобие"],
        answerIndex: 1,
        explanation: "До наблюдения данных.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 3, "Схема Бернулли", {
    theory:
      "Независимые испытания с двумя исходами, успех с вероятностью $p$. Число успехов $S_n\\sim\\mathrm{Bin}(n,p)$, $\\mathbb{P}(S_n=k)=\\binom{n}{k}p^k(1-p)^{n-k}$. Математическое ожидание $np$, дисперсия $np(1-p)$. Теорема Муавра–Лапласа: при $n\\to\\infty$ $(S_n-np)/\\sqrt{npq}\\Rightarrow\\mathcal{N}(0,1)$. Теорема Пуассона: если $np_n\\to\\lambda$, то $S_n\\Rightarrow\\mathrm{Poisson}(\\lambda)$. Геометрическое распределение — номер первого успеха. Наивероятнейшее $k$ около $(n+1)p$.",
    examples: [
      {
        title: "Бином",
        problem: "$n=2$, $p=1/2$, $\\mathbb{P}(S=1)$.",
        solution: "$\\binom{2}{1}/4=1/2$.",
      },
      {
        title: "Ожидание",
        problem: "$n=10$, $p=0{,}3$. $\\mathbb{E}S=$",
        solution: "$3$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$\\mathrm{Bin}(5,1/5)$: $\\mathbb{E}S_5=$",
      accepted: ["1"],
      explanation: "$np=1$.",
      solution: "Линейность суммы индикаторов.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Дисперсия $\\mathrm{Bin}(n,p)$ равна",
        options: ["$np$", "$np(1-p)$", "$p(1-p)$", "$n^{2}p$"],
        answerIndex: 1,
        explanation: "Сумма независимых бернулли.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "$\\binom{4}{2}(1/2)^4=$ (вероятность двух успехов из четырёх при $p=1/2$)",
        accepted: ["6/16", "3/8", "0.375"],
        explanation: "$6/16=3/8$.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "Пуассоновский предел бинома требует",
        options: ["$p$ фиксировано, $n\\to\\infty$ к нормальному тому же", "$np\\to\\lambda$, $n\\to\\infty$", "$p\\to 1$", "$n$ фиксировано"],
        answerIndex: 1,
        explanation: "Редкие события.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "$\\mathrm{Var}(\\mathrm{Bern}(p))$ при $p=1/2$ равна",
        accepted: ["1/4", "0.25"],
        explanation: "$p(1-p)=1/4$.",
      },
      {
        id: "p5",
        type: "open",
        prompt: "Геометрическое: $\\mathbb{P}(X=1)=p$. При $p=1/3$ это",
        accepted: ["1/3"],
        explanation: "Успех с первой попытки.",
      },
      {
        id: "p6",
        type: "choice",
        prompt: "Локальная теорема Муавра–Лапласа приближает биномиальные вероятности",
        options: ["пуассоновскими", "нормальной плотностью", "равномерными", "экспоненциальными"],
        answerIndex: 1,
        explanation: "Локальная ЦПТ для решётки.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 4, "Дискретные случайные величины", {
    theory:
      "С.в. $X$ дискретна, если принимает не более чем счётное множество значений $x_k$ с $p_k=\\mathbb{P}(X=x_k)$, $\\sum p_k=1$. Ряд распределения задаёт закон. Функция распределения $F(x)=\\sum_{x_k\\leqslant x}p_k$ — ступеньки. Матожидание $\\mathbb{E}X=\\sum x_k p_k$ (абсолютная сходимость для существования в $\\mathbb{R}$). Примеры: Бернулли, биномиальное, Пуассон $\\mathbb{P}(k)=e^{-\\lambda}\\lambda^k/k!$, геометрическое, отрицательное биномиальное. Свёртка независимых: закон суммы. Производящая функция $\\mathbb{E}s^{X}$.",
    examples: [
      {
        title: "Игральная кость",
        problem: "$\\mathbb{E}X$ для равномерного на $\{1,\\ldots,6\\}$.",
        solution: "$3{,}5$.",
      },
      {
        title: "Пуассон",
        problem: "$\\mathbb{E}\\,\\mathrm{Poisson}(\\lambda)=\\lambda$. При $\\lambda=4$ среднее",
        solution: "$4$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$X$ принимает $0$ и $1$ с вероятностями $1/3$ и $2/3$. $\\mathbb{E}X=$",
      accepted: ["2/3"],
      explanation: "$0\\cdot\\frac13+1\\cdot\\frac23$.",
      solution: "Среднее бернуллиевской величины с $p=2/3$.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Ряд распределения $\{p_k\\}$ удовлетворяет",
        options: ["$\\sum p_k=0$", "$\\sum p_k=1$, $p_k\\geqslant 0$", "$p_k=k$", "непрерывности $F$"],
        answerIndex: 1,
        explanation: "Нормировка вероятностей.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "$\\mathrm{Poisson}(2)$: $\\mathbb{P}(X=0)=e^{-2}$. Запишите $e^{-2}$ как значение при приближении? Нет: $\\lambda^{0}/0!=1$, множитель $e^{-2}$. Вопрос: $0!$ равен",
        accepted: ["1"],
        explanation: "Факториал нуля.",
      },
      {
        id: "p3",
        type: "open",
        prompt: "Кость: $\\mathbb{P}(X=6)=$",
        accepted: ["1/6"],
        explanation: "Равномерность.",
      },
      {
        id: "p4",
        type: "choice",
        prompt: "Сумма независимых $\\mathrm{Poisson}(\\lambda)$ и $\\mathrm{Poisson}(\\mu)$ есть",
        options: ["бином", "$\\mathrm{Poisson}(\\lambda+\\mu)$", "нормаль", "геометрическое"],
        answerIndex: 1,
        explanation: "Устойчивость пуассоновского семейства.",
      },
      {
        id: "p5",
        type: "open",
        prompt: "$\\mathbb{E}X=3$, $\\mathbb{E}Y=2$, независимы не нужны для линейности. $\\mathbb{E}(X+Y)=$",
        accepted: ["5"],
        explanation: "Линейность всегда.",
      },
      {
        id: "p6",
        type: "choice",
        prompt: "Геометрическое распределение (номер первого успеха) обладает свойством",
        options: ["памяти как нормаль", "отсутствия памяти", "симметрии вокруг $0$", "непрерывной плотности"],
        answerIndex: 1,
        explanation: "Дискретный аналог экспоненциального.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 5, "Производящие функции распределений", {
    theory:
      "Для целочисленной неотрицательной $X$ производящая функция $G(s)=\\mathbb{E}s^{X}=\\sum p_k s^{k}$, $|s|\\leqslant 1$. Тогда $G(1)=1$, $G'(1)=\\mathbb{E}X$ (односторонние производные при необходимости), $G''(1)=\\mathbb{E}X(X-1)$. Независимость: $G_{X+Y}=G_X G_Y$. Бином: $(q+ps)^n$; Пуассон: $e^{\\lambda(s-1)}$. Восстановление $\{p_k\\}$ по производным в нуле: $p_k=G^{(k)}(0)/k!$. Ветвящиеся процессы: $G_{n+1}=G\\circ G_n$. Характеристическая функция — непрерывный аналог $G(e^{it})$.",
    examples: [
      {
        title: "Бернулли",
        problem: "$G(s)=q+ps$. $G'(1)=p$.",
        solution: "Среднее успеха.",
      },
      {
        title: "Сумма",
        problem: "Два независимых Бернулли($p$): $G=(q+ps)^{2}$, бином.",
        solution: "Произведение ПФ.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$G(s)=s^{3}$ означает $X=3$ п.н. Тогда $\\mathbb{E}X=$",
      accepted: ["3"],
      explanation: "Детерминированная величина.",
      solution: "$G'(s)=3s^{2}$, $G'(1)=3$.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "ПФ суммы независимых неотрицательных целочисленных с.в. есть",
        options: ["сумма ПФ", "произведение ПФ", "свёртка значений $G$", "максимум"],
        answerIndex: 1,
        explanation: "Независимость и $s^{X+Y}$.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "Пуассон: $G(s)=e^{\\lambda(s-1)}$. $G(1)=$",
        accepted: ["1"],
        explanation: "$e^{0}=1$.",
      },
      {
        id: "p3",
        type: "open",
        prompt: "$p_0=G(0)$. Если $G(s)=0{,}3+0{,}7s$, то $p_0=$",
        accepted: ["0.3", "0,3", "3/10"],
        explanation: "$G(0)=0{,}3$.",
      },
      {
        id: "p4",
        type: "choice",
        prompt: "$\\mathbb{E}X(X-1)=G''(1)$. Второй факториальный момент. Для Бернулли $G''=0$, значит",
        options: ["$\\mathbb{E}X^{2}=\\mathbb{E}X$", "дисперсия $p(1-p)$ согласована с $X^{2}=X$", "$X$ нормальна", "$G\\equiv 0$"],
        answerIndex: 1,
        explanation: "$X\\in\\{0,1\\}$.",
      },
      {
        id: "p5",
        type: "open",
        prompt: "Бином $n=3$, $p=1$: $G(s)=s^{3}$. $p_3=$",
        accepted: ["1"],
        explanation: "Три успеха наверняка.",
      },
      {
        id: "p6",
        type: "choice",
        prompt: "ПФ ветвящегося процесса итерируется как",
        options: ["$G_n=nG$", "$G_{n}=G\\circ G_{n-1}$", "$G_n=G'$", "$G_n=1$"],
        answerIndex: 1,
        explanation: "Каждый потомок независимо.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 6, "Непрерывные случайные величины и плотность", {
    theory:
      "Абсолютно непрерывная с.в. имеет плотность $f\\geqslant 0$, $\\int_{\\mathbb{R}}f=1$, $\\mathbb{P}(X\\in B)=\\int_B f$. Тогда $F'(x)=f(x)$ в точках непрерывности плотности. Примеры: равномерная на $[a,b]$, нормальная $\\mathcal{N}(\\mu,\\sigma^{2})$ с $f=\\frac{1}{\\sqrt{2\\pi}\\sigma}\\exp\\bigl(-(x-\\mu)^{2}/(2\\sigma^{2})\\bigr)$, экспоненциальная $\\lambda e^{-\\lambda x}$ на $(0,\\infty)$, Коши. Замена переменной: плотность $Y=g(X)$ при гладкой монотонной $g$ есть $f_X(g^{-1}y)/|g'(g^{-1}y)|$. Смесь дискретной и непрерывной — распределение общего типа.",
    examples: [
      {
        title: "Равномерная",
        problem: "Плотность на $[0,2]$ равна $1/2$. $\\mathbb{P}(X\\leqslant 1)=$",
        solution: "$1/2$.",
      },
      {
        title: "Нормаль",
        problem: "$\\mathcal{N}(0,1)$ симметрична. $\\mathbb{P}(X>0)=$",
        solution: "$1/2$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "Плотность $f=1$ на $[0,1]$. $\\mathbb{P}(X\\leqslant 0{,}3)=$",
      accepted: ["0.3", "0,3", "3/10"],
      explanation: "Длина отрезка.",
      solution: "Равномерный закон на единичном отрезке.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Интеграл плотности по всей прямой равен",
        options: ["$0$", "$1$", "$\\infty$", "$F(0)$"],
        answerIndex: 1,
        explanation: "Нормировка.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "Экспоненциальная $\\lambda=2$: $f(0)=$",
        accepted: ["2"],
        explanation: "$\\lambda e^{0}=2$.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "$\\mathbb{P}(X=x)$ для абсолютно непрерывной $X$",
        options: ["равно $f(x)$", "равно $0$", "равно $F(x)$", "не определено"],
        answerIndex: 1,
        explanation: "Точки имеют меру нуль.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "Равномерная на $[0,4]$, плотность равна",
        accepted: ["1/4", "0.25"],
        explanation: "$1/(b-a)$.",
      },
      {
        id: "p5",
        type: "choice",
        prompt: "Плотность $\\mathcal{N}(0,1)$ в нуле равна $1/\\sqrt{2\\pi}$. Это",
        options: ["вероятность $X=0$", "значение $f(0)$", "$F(0)$", "дисперсия"],
        answerIndex: 1,
        explanation: "Плотность, не вероятность точки.",
      },
      {
        id: "p6",
        type: "open",
        prompt: "$Y=2X$, $X$ равномерна на $[0,1]$. Длина носителя $Y$ равна",
        accepted: ["2"],
        explanation: "$Y\\in[0,2]$.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 7, "Функция распределения", {
    theory:
      "Ф.р. $F_X(x)=\\mathbb{P}(X\\leqslant x)$ неубывающая, непрерывна справа, $F(-\\infty)=0$, $F(+\\infty)=1$. Скачки $F(x)-F(x-)=\\mathbb{P}(X=x)$. Квантиль $F^{-1}(p)=\\inf\\{x:F(x)\\geqslant p\\}$. Соответствие законов и ф.р. взаимно однозначно. Сходимость по распределению $X_n\\Rightarrow X$ равносильна $F_n(x)\\to F(x)$ в точках непрерывности $F$ (теорема Хелли–Брея). Формула $F_{aX+b}$ линейной заменой. Совместная ф.р. пары $(X,Y)$ определяет конечномерные проекции.",
    examples: [
      {
        title: "Ступенька",
        problem: "Детерминированная $X=0$: $F(x)=0$ при $x<0$ и $1$ при $x\\geqslant 0$.",
        solution: "Функция Хевисайда.",
      },
      {
        title: "Равномерная",
        problem: "$F$ на $[0,1]$ равна $x$ внутри.",
        solution: "Линейный рост.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$F(x)=0$ при $x<0$, $1$ при $x\\geqslant 0$. $\\mathbb{P}(X\\leqslant -1)=$",
      accepted: ["0"],
      explanation: "$F(-1)=0$.",
      solution: "Масса в нуле, слева нуль.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Функция распределения непрерывна",
        options: ["слева всегда", "справа (каноническое соглашение)", "только если нет атомов", "никогда"],
        answerIndex: 1,
        explanation: "$F(x)=\\mathbb{P}(X\\leqslant x)$.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "Скачок $F$ в точке равен $\\mathbb{P}(X=x)$. Если $F(1)-F(1-)=0{,}2$, то эта вероятность",
        accepted: ["0.2", "0,2", "1/5"],
        explanation: "Атом.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "Сходимость $F_n(x)\\to F(x)$ во всех точках непрерывности $F$ есть",
        options: ["сходимость п.н.", "сходимость по распределению", "сходимость в $L^{1}$", "равномерная всегда"],
        answerIndex: 1,
        explanation: "Слабая сходимость мер.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "$F(+\\infty)$ равно",
        accepted: ["1"],
        explanation: "Нормировка.",
      },
      {
        id: "p5",
        type: "open",
        prompt: "Равномерная $[0,1]$: $F(0{,}4)=$",
        accepted: ["0.4", "0,4", "2/5"],
        explanation: "$F(x)=x$ на $[0,1]$.",
      },
      {
        id: "p6",
        type: "choice",
        prompt: "Квантиль уровня $1/2$ называют",
        options: ["модой всегда", "медианой", "средним", "дисперсией"],
        answerIndex: 1,
        explanation: "Медиана.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 8, "Математическое ожидание", {
    theory:
      "Для неотрицательной $X$ полагают $\\mathbb{E}X=\\int_0^{\\infty}\\mathbb{P}(X>t)\\,dt$ (и аналог для общего знака через положительную/отрицательную части). Эквивалентно интеграл Лебега $\\int X\\,d\\mathbb{P}$. Линейность $\\mathbb{E}(aX+bY)=a\\mathbb{E}X+b\\mathbb{E}Y$ без независимости. Если $X\\geqslant 0$ и $\\mathbb{E}X=0$, то $X=0$ п.н. Теорема Фубини для неотрицательных. Замена: $\\mathbb{E}g(X)=\\int g\\,dF$. Для дискретных — сумма, для плотностей — $\\int x f(x)\\,dx$. Существование требует $\\mathbb{E}|X|<\\infty$.",
    examples: [
      {
        title: "Индикатор",
        problem: "$\\mathbb{E}\\mathbf{1}_A=\\mathbb{P}(A)$.",
        solution: "По определению интеграла.",
      },
      {
        title: "Экспонента",
        problem: "$\\mathrm{Exp}(\\lambda)$ имеет среднее $1/\\lambda$. При $\\lambda=1/5$ среднее",
        solution: "$5$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$\\mathbb{E}(2X+3)$ при $\\mathbb{E}X=4$ равно",
      accepted: ["11"],
      explanation: "$8+3=11$.",
      solution: "Линейность математического ожидания.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Линейность $\\mathbb{E}$ требует",
        options: ["независимости $X,Y$", "только интегрируемости (без независимости)", "нормальности", "дискретности"],
        answerIndex: 1,
        explanation: "Интеграл линеен.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "$\\mathbb{E}\\mathbf{1}_A$ при $\\mathbb{P}(A)=0{,}6$ равно",
        accepted: ["0.6", "0,6", "3/5"],
        explanation: "Ожидание индикатора.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "Если $X\\geqslant 0$ и $\\mathbb{E}X=0$, то",
        options: ["$X$ может быть $1$ с положительной вероятностью", "$X=0$ почти наверное", "$F$ непрерывна", "$X$ нормальна"],
        answerIndex: 1,
        explanation: "Строгая положительность интеграла.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "Равномерная $[0,2]$: $\\mathbb{E}X=$",
        accepted: ["1"],
        explanation: "Середина отрезка.",
      },
      {
        id: "p5",
        type: "open",
        prompt: "$\\mathbb{E}X^{2}$ для $X=\\pm 1$ равновероятно равно",
        accepted: ["1"],
        explanation: "$X^{2}=1$.",
      },
      {
        id: "p6",
        type: "choice",
        prompt: "Формула $\\mathbb{E}X=\\int_0^{\\infty}\\mathbb{P}(X>t)\\,dt$ верна для",
        options: ["любых $X$ без оговорок", "неотрицательных $X$", "только нормальных", "только дискретных"],
        answerIndex: 1,
        explanation: "Слойное представление.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 9, "Дисперсия и ковариация", {
    theory:
      "$\\mathrm{Var}\\,X=\\mathbb{E}(X-\\mathbb{E}X)^{2}=\\mathbb{E}X^{2}-(\\mathbb{E}X)^{2}$ при $\\mathbb{E}X^{2}<\\infty$. Ковариация $\\mathrm{Cov}(X,Y)=\\mathbb{E}(X-\\mathbb{E}X)(Y-\\mathbb{E}Y)$; билинейна, $\\mathrm{Var}(X+Y)=\\mathrm{Var}X+\\mathrm{Var}Y+2\\mathrm{Cov}$. Независимость влечёт $\\mathrm{Cov}=0$, обратное неверно. Корреляция $\\rho=\\mathrm{Cov}/(\\sigma_X\\sigma_Y)\\in[-1,1]$ (Коши–Буняковский). Неравенство $|\\mathrm{Cov}|\\leqslant\\sigma_X\\sigma_Y$. Для некоррелированных слагаемых дисперсии складываются. Матрица ковариаций неотрицательно определена.",
    examples: [
      {
        title: "Бернулли",
        problem: "$\\mathrm{Var}\\,\\mathrm{Bern}(p)=p(1-p)$. При $p=1$ дисперсия",
        solution: "$0$.",
      },
      {
        title: "Некоррелированность не даёт независимости",
        problem:
          "Пусть $X$ равномерно распределена на $[-1,1]$, а $Y=X^{2}$. Покажите, что $\\mathrm{Cov}(X,Y)=0$, но $X$ и $Y$ зависимы.",
        solution:
          "Плотность $X$ чётная, поэтому $\\mathbb{E}X=0$ и $\\mathbb{E}X^{3}=0$. Тогда $\\mathrm{Cov}(X,Y)=\\mathbb{E}(XY)-\\mathbb{E}X\\,\\mathbb{E}Y=\\mathbb{E}(X^{3})=0$. Зависимость есть: $Y$ однозначно определяется по $X$. Константа $Y=1$ сюда не годится: с константой величина независима.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$\\mathrm{Var}(cX)=c^{2}\\mathrm{Var}X$. При $c=3$, $\\mathrm{Var}X=2$ получите",
      accepted: ["18"],
      explanation: "$9\\cdot 2=18$.",
      solution: "Квадратичная однородность дисперсии.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Независимость влечёт",
        options: ["$\\rho=1$", "$\\mathrm{Cov}=0$", "$\\mathrm{Var}(X+Y)=0$", "$X=Y$"],
        answerIndex: 1,
        explanation: "Но не наоборот.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "$\\mathrm{Var}X=4$, $\\mathrm{Var}Y=9$, некоррелированы. $\\mathrm{Var}(X+Y)=$",
        accepted: ["13"],
        explanation: "Сумма дисперсий.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "$|\\rho|\\leqslant 1$ следует из",
        options: ["ЦПТ", "неравенства Коши–Буняковского", "Байеса", "схемы Бернулли"],
        answerIndex: 1,
        explanation: "Скалярное произведение в $L^{2}$.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "$\\mathbb{E}X=0$, $\\mathbb{E}X^{2}=5$. $\\mathrm{Var}X=$",
        accepted: ["5"],
        explanation: "Центрированный второй момент.",
      },
      {
        id: "p5",
        type: "open",
        prompt: "$\\rho(X,X)=$ при $\\sigma_X>0$",
        accepted: ["1"],
        explanation: "Полная корреляция с собой.",
      },
      {
        id: "p6",
        type: "choice",
        prompt: "Матрица ковариаций вектора",
        options: ["всегда вырождена", "неотрицательно определена", "имеет отрицательные собственные значения обязательно", "диагональна всегда"],
        answerIndex: 1,
        explanation: "$\\mathrm{Var}(a^{\\mathrm{T}}X)=a^{\\mathrm{T}}\\Sigma a\\geqslant 0$.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 10, "Неравенства Маркова и Чебышёва", {
    theory:
      "Неравенство Маркова: для $X\\geqslant 0$, $a>0$ имеем $\\mathbb{P}(X\\geqslant a)\\leqslant \\mathbb{E}X/a$. Чебышёв: $\\mathbb{P}(|X-\\mu|\\geqslant\\varepsilon)\\leqslant \\mathrm{Var}X/\\varepsilon^{2}$. Следствие ЗБЧ в форме Чебышёва для средних с конечной дисперсией. Односторонние варианты (Кантелли). Неравенства грубые, но универсальные; для субгауссовских хвостов экспоненциально лучше (Хёфдинг, Бернштейн). Марков применяется к $|X|^{p}$ давая $\\mathbb{P}(|X|\\geqslant a)\\leqslant \\mathbb{E}|X|^{p}/a^{p}$.",
    examples: [
      {
        title: "Марков",
        problem: "$\\mathbb{E}X=2$, $X\\geqslant 0$, оценка $\\mathbb{P}(X\\geqslant 10)$.",
        solution: "$\\leqslant 0{,}2$.",
      },
      {
        title: "Чебышёв",
        problem: "$\\mathrm{Var}X=1$, $\\mathbb{P}(|X-\\mu|\\geqslant 2)\\leqslant$",
        solution: "$1/4$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "Чебышёв: $\\mathrm{Var}=4$, $\\varepsilon=2$. Верхняя оценка вероятности равна",
      accepted: ["1"],
      explanation: "$4/4=1$ (тривиально, но верно).",
      solution: "$\\mathrm{Var}/\\varepsilon^{2}=1$; оценка неинформативна, но формула такова.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Неравенство Маркова требует",
        options: ["нормальности $X$", "неотрицательности $X$", "независимости", "$\\mathbb{E}X=0$"],
        answerIndex: 1,
        explanation: "Иначе знак мешает.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "Марков: $\\mathbb{E}X=6$, $a=3$, $X\\geqslant 0$. Оценка $\\leqslant$",
        accepted: ["2"],
        explanation: "$6/3=2$ — бесполезно, так как $>1$, обрезают до $1$; по формуле $2$.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "Чебышёв оценивает уклонения от",
        options: ["медианы только", "математического ожидания", "моды", "квантиля $0{,}9$"],
        answerIndex: 1,
        explanation: "$|X-\\mu|$.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "$\\mathrm{Var}X=9$, $\\varepsilon=3$. Чебышёв: оценка",
        accepted: ["1"],
        explanation: "$9/9=1$.",
      },
      {
        id: "p5",
        type: "choice",
        prompt: "Применение Маркова к $X^{2}$ даёт по существу",
        options: ["Байеса", "Чебышёва (для центрированной после сдвига)", "ЦПТ", "формулу полной вероятности"],
        answerIndex: 1,
        explanation: "$\\mathbb{P}(|X-\\mu|\\geqslant\\varepsilon)=\\mathbb{P}((X-\\mu)^{2}\\geqslant\\varepsilon^{2})$.",
      },
      {
        id: "p6",
        type: "open",
        prompt: "Марков для $|X|^{4}$: $\\mathbb{P}(|X|\\geqslant 2)\\leqslant \\mathbb{E}|X|^{4}/16$. Если $\\mathbb{E}|X|^{4}=32$, оценка равна",
        accepted: ["2"],
        explanation: "$32/16=2$, снова $\\leqslant 1$ фактически.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 11, "Характеристические функции", {
    theory:
      "Характеристическая функция $\\varphi_X(t)=\\mathbb{E}e^{itX}$. Всегда непрерывна, $\\varphi(0)=1$, $|\\varphi|\\leqslant 1$, неотрицательно определена (Бохнер). Независимость: $\\varphi_{X+Y}=\\varphi_X\\varphi_Y$. Единственность: $\\varphi$ определяет закон (теорема единственности). Непрерывность соответствия: сходимость $\\varphi_n\\to\\varphi$ поточечно при непрерывности $\\varphi$ в нуле даёт слабую сходимость (Леви). Разложение $\\varphi(t)=1+it\\mu-t^{2}\\sigma^{2}/2+o(t^{2})$ при конечной дисперсии. Нормаль: $e^{it\\mu-\\sigma^{2}t^{2}/2}$. Формула обращения в точках непрерывности плотности.",
    examples: [
      {
        title: "Константа",
        problem: "$X=a$ п.н.: $\\varphi(t)=e^{ita}$.",
        solution: "Сдвиг на прямой.",
      },
      {
        title: "Сумма",
        problem: "Две независимые стандартные нормали: $\\varphi=e^{-t^{2}}$, то есть $\\mathcal{N}(0,2)$.",
        solution: "Произведение $e^{-t^{2}/2}\\cdot e^{-t^{2}/2}$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$\\varphi(0)$ всегда равно",
      accepted: ["1"],
      explanation: "$\\mathbb{E}1=1$.",
      solution: "$e^{0}=1$.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Характеристическая функция суммы независимых есть",
        options: ["сумма $\\varphi$", "произведение $\\varphi$", "свёртка $\\varphi$", "максимум"],
        answerIndex: 1,
        explanation: "Как у ПФ, но для $e^{itX}$.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "$|\\varphi(t)|\\leqslant$",
        accepted: ["1"],
        explanation: "$|\\mathbb{E}e^{itX}|\\leqslant 1$.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "Теорема единственности утверждает, что $\\varphi$ определяет",
        options: ["только среднее", "закон распределения", "только дисперсию", "реализацию $X$"],
        answerIndex: 1,
        explanation: "Взаимно однозначное соответствие.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "Для $\\mathcal{N}(0,1)$ имеем $\\varphi(t)=e^{-t^{2}/2}$. $\\varphi(0)=$",
        accepted: ["1"],
        explanation: "Проверка.",
      },
      {
        id: "p5",
        type: "choice",
        prompt: "Теорема непрерывности Леви связывает сходимость $\\varphi_n$ со",
        options: ["сходимостью п.н. всегда", "слабой сходимостью законов", "сходимостью в $L^{\\infty}$ траекторий", "равенством средних"],
        answerIndex: 1,
        explanation: "Характеристические функции и слабая сходимость.",
      },
      {
        id: "p6",
        type: "open",
        prompt: "Разложение $\\varphi(t)=1+it\\mu+o(t)$ при $t\\to 0$ требует конечности $\\mathbb{E}|X|$. Коэффициент при $it$ есть $\\mu=\\mathbb{E}X$. Если $\\mathbb{E}X=0$, линейный член коэффициент",
        accepted: ["0"],
        explanation: "Центрирование.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 12, "Виды сходимости случайных величин", {
    theory:
      "Сходимость п.н.: $\\mathbb{P}(X_n\\to X)=1$. По вероятности: $\\mathbb{P}(|X_n-X|>\\varepsilon)\\to 0$. В $L^{p}$: $\\mathbb{E}|X_n-X|^{p}\\to 0$. По распределению: $X_n\\Rightarrow X$. Цепочка: $L^{p}\\Rightarrow$ по вероятности $\\Rightarrow$ по распределению; п.н. $\\Rightarrow$ по вероятности. Обратные импликации ложны (классические контрпримеры). Теорема Рисса: из сходимости по вероятности есть подпоследовательность п.н. Слабая сходимость метризуема расстоянием Леви–Прохорова на польских пространствах. Лемма Слуцкого: алгебраические операции при сходимости по вероятности.",
    examples: [
      {
        title: "По вероятности, не п.н.",
        problem: "«Бегущий горб» на $[0,1]$: индикаторы отрезков, покрывающих круг за кругом.",
        solution: "Сходится к $0$ по вероятности, но не п.н.",
      },
      {
        title: "Слабая, не по вероятности",
        problem: "$X_n=X$ и независимая копия: одинаковый закон, $|X_n-X|$ не мал.",
        solution: "Сходимость по распределению к $X$ не требует совместной сходимости.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "Сходимость в $L^{2}$ влечёт сходимость по вероятности. Если $\\mathbb{E}(X_n-X)^{2}=0$ для всех $n$, то $X_n=X$ п.н. Число таких равенств в условии «для всех $n$» бесконечно; при $n=1$ уже $\\mathbb{E}(X_1-X)^{2}=0$ влечёт совпадение. Запишите $0$.",
      accepted: ["0"],
      explanation: "Нулевой второй момент разности.",
      solution: "$L^{2}$-расстояние нуль.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Наисильнейшая среди перечисленных — сходимость",
        options: ["по распределению", "почти наверное (относительно по вероятности и слабой)", "только слабая", "по вероятности сильнее п.н."],
        answerIndex: 1,
        explanation: "П.н. $\\Rightarrow$ по вероятности $\\Rightarrow$ слабо; $L^{p}$ несравнима напрямую с п.н.",
      },
      {
        id: "p2",
        type: "choice",
        prompt: "Сходимость по распределению эквивалентна сходимости ф.р. в точках",
        options: ["всех $x$", "непрерывности предельной $F$", "рациональных только", "атомов $F_n$"],
        answerIndex: 1,
        explanation: "Теорема Хелли.",
      },
      {
        id: "p3",
        type: "open",
        prompt: "Если $\\mathbb{P}(|X_n-X|>\\varepsilon)\\to 0$ для любого $\\varepsilon>0$, это сходимость по вероятности. При $\\varepsilon=1$ вероятность уклонения стремится к",
        accepted: ["0"],
        explanation: "Определение.",
      },
      {
        id: "p4",
        type: "choice",
        prompt: "Лемма Слуцкого позволяет",
        options: ["менять предел и интеграл всегда", "комбинировать сходимость по вероятности с непрерывными отображениями / константами", "выводить п.н. из слабой", "игнорировать зависимость"],
        answerIndex: 1,
        explanation: "Непрерывное отображение и алгебра.",
      },
      {
        id: "p5",
        type: "choice",
        prompt: "Из сходимости по вероятности следует существование подпоследовательности, сходящейся",
        options: ["в $L^{2}$ всегда", "почти наверное", "только слабо", "в вариации"],
        answerIndex: 1,
        explanation: "Теорема Рисса.",
      },
      {
        id: "p6",
        type: "open",
        prompt: "Константа $c_n\\to c$ как числа. Тогда $c_n\\Rightarrow c$ как с.в. Дисперсия предела константы равна",
        accepted: ["0"],
        explanation: "Вырожденный закон.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 13, "Закон больших чисел", {
    theory:
      "Пусть $X_i$ н.о.р., $\\mathbb{E}|X_1|<\\infty$, $\\mu=\\mathbb{E}X_1$. Усиленный ЗБЧ Колмогорова: $\\bar X_n\\to\\mu$ почти наверное. Слабый ЗБЧ: сходимость по вероятности (Хинчин — при конечном среднем без дисперсии). С дисперсией доказательство через Чебышёва. ЗБЧ объясняет устойчивость частот: $S_n/n\\to p$ для бернулли. Необходимость конечного среднего: при $\\mathbb{E}|X|=\\infty$ средние не сходятся к конечной константе. Скорость — вопрос ЦПТ и законов повторного логарифма.",
    examples: [
      {
        title: "Монета",
        problem: "Частота орлов $\\to 1/2$ п.н.",
        solution: "ЗБЧ для $\\mathrm{Bern}(1/2)$.",
      },
      {
        title: "Чебышёв",
        problem: "$\\mathrm{Var}X_i=\\sigma^{2}$, $\\mathbb{P}(|\\bar X-\\mu|\\geqslant\\varepsilon)\\leqslant \\sigma^{2}/(n\\varepsilon^{2})\\to 0$.",
        solution: "Слабый ЗБЧ.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "Для н.о.р. с $\\mu=3$ предел $\\bar X_n$ п.н. равен",
      accepted: ["3"],
      explanation: "Усиленный ЗБЧ.",
      solution: "Среднее сходится к математическому ожиданию.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Усиленный ЗБЧ даёт сходимость",
        options: ["только по распределению", "почти наверное", "только в $L^{2}$ без п.н.", "в вариации полной"],
        answerIndex: 1,
        explanation: "Колмогоров.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "Чебышёв для средних: множитель $1/n$ в оценке $\\sigma^{2}/(n\\varepsilon^{2})$. При $n=4$, $\\sigma^{2}=4$, $\\varepsilon=1$ оценка равна",
        accepted: ["1"],
        explanation: "$4/(4\\cdot 1)=1$.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "Теорема Хинчина требует",
        options: ["конечной дисперсии", "конечного среднего (н.о.р.)", "ограниченности $X_i$", "нормальности"],
        answerIndex: 1,
        explanation: "Слабый ЗБЧ без второго момента.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "Частота успеха в схеме Бернулли стремится к $p$. При $p=0{,}2$ предел равен",
        accepted: ["0.2", "0,2", "1/5"],
        explanation: "ЗБЧ.",
      },
      {
        id: "p5",
        type: "choice",
        prompt: "Если $\\mathbb{E}|X_1|=\\infty$, то $\\bar X_n$",
        options: ["всё равно $\\to 0$", "не сходится к конечной постоянной (типично)", "сходится в $L^{1}$", "нормальна"],
        answerIndex: 1,
        explanation: "Необходимость интегрируемости.",
      },
      {
        id: "p6",
        type: "open",
        prompt:
          "По неравенству Чебышёва для среднего независимых одинаково распределённых величин $\\mathbb{P}(|\\bar X_n-\\mu|\\geqslant\\varepsilon)\\leqslant\\sigma^{2}/(n\\varepsilon^{2})$. При $\\sigma^{2}=4$, $\\varepsilon=1$ и $n=10$ правая часть равна (несократимая дробь).",
        accepted: ["2/5", "0.4", "0,4"],
        explanation: "$4/(10\\cdot 1)=2/5$. Это оценка вероятности отклонения, а не сам предел среднего.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 14, "Центральная предельная теорема", {
    theory:
      "ЦПТ Линдеберга–Леви: $X_i$ н.о.р. с $\\mathbb{E}X_i=\\mu$, $\\mathrm{Var}X_i=\\sigma^{2}\\in(0,\\infty)$. Тогда $\\sqrt{n}(\\bar X_n-\\mu)/\\sigma\\Rightarrow\\mathcal{N}(0,1)$. Эквивалентно $S_n$ после центрирования и нормировки $\\sqrt{n}\\sigma$. Доказательство через характеристические функции: $\\varphi(t/\\sqrt{n})^{n}\\to e^{-t^{2}/2}$. Условие Линдеберга ослабляет одинаковую распределённость. Теорема Муавра–Лапласа — частный случай бинома. Скорость — неравенство Берри–Эссеена $O(1/\\sqrt{n})$ при третьем моменте. Локальные предельные теоремы для решётчатых законов.",
    examples: [
      {
        title: "Монета",
        problem: "Число орлов: $(S_n-n/2)/\\sqrt{n/4}\\Rightarrow\\mathcal{N}(0,1)$.",
        solution: "Муавр–Лаплас.",
      },
      {
        title: "Нормальная сумма",
        problem: "Сумма н.о.р. нормалей снова нормаль — ЦПТ точна в любом $n$.",
        solution: "Устойчивость гауссовского семейства.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "Нормировка ЦПТ содержит $\\sqrt{n}$. При $n=100$ это",
      accepted: ["10"],
      explanation: "$\\sqrt{100}=10$.",
      solution: "Стандартное отклонение среднего $\\sigma/\\sqrt{n}$.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Предельный закон в классической ЦПТ —",
        options: ["Пуассон", "стандартный нормальный", "Коши", "равномерный"],
        answerIndex: 1,
        explanation: "$\\mathcal{N}(0,1)$ после нормировки.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "Дисперсия $\\bar X_n$ при $\\sigma^{2}=4$, $n=4$ равна",
        accepted: ["1"],
        explanation: "$\\sigma^{2}/n=1$.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "Характеристические функции в доказательстве ЦПТ: $\\varphi(t/\\sqrt{n})^{n}$ стремится к",
        options: ["$0$", "$e^{-t^{2}/2}$", "$1+t$", "$e^{it}$"],
        answerIndex: 1,
        explanation: "Предел гауссовой $\\varphi$.",
      },
      {
        id: "p4",
        type: "choice",
        prompt: "Неравенство Берри–Эссеена оценивает",
        options: ["скорость ЗБЧ п.н.", "равномерное расстояние ф.р. до нормали", "дисперсию", "информацию Фишера"],
        answerIndex: 1,
        explanation: "Скорость ЦПТ.",
      },
      {
        id: "p5",
        type: "open",
        prompt: "Для бинома $n=n$, $p=1/2$, $\\sigma=\\sqrt{npq}=\\sqrt{n}/2$. При $n=16$ значение $\\sigma=$",
        accepted: ["2"],
        explanation: "$4/2=2$.",
      },
      {
        id: "p6",
        type: "choice",
        prompt: "Без конечной дисперсии классическая ЦПТ",
        options: ["всё равно верна с $\\sqrt{n}$", "может заменяться устойчивыми законами (области притяжения)", "даёт Пуассон всегда", "запрещает независимость"],
        answerIndex: 1,
        explanation: "Обобщённые предельные теоремы.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 15, "Условное математическое ожидание", {
    theory:
      "Для интегрируемой $X$ и $\\sigma$-алгебры $\\mathcal{G}$ условное ожидание $\\mathbb{E}(X\\mid\\mathcal{G})$ — $\\mathcal{G}$-измеримая с.в. $Y$ с $\\int_G Y=\\int_G X$ для всех $G\\in\\mathcal{G}$. Существует единственная с точностью до п.н. (Радон–Никодим). Свойства: линейность, $\\mathbb{E}(\\mathbb{E}(X\\mid\\mathcal{G}))=\\mathbb{E}X$, башня $\\mathbb{E}(\\mathbb{E}(X\\mid\\mathcal{G}_2)\\mid\\mathcal{G}_1)=\\mathbb{E}(X\\mid\\mathcal{G}_1)$ при $\\mathcal{G}_1\\subset\\mathcal{G}_2$, вынесение $\\mathcal{G}$-измеримого множителя, $X\\perp\\mathcal{G}\\Rightarrow \\mathbb{E}(X\\mid\\mathcal{G})=\\mathbb{E}X$. Для дискретного разбиения — средние на атомах. Ортогональная проекция в $L^{2}$. Мартингал: $\\mathbb{E}(X_{n+1}\\mid\\mathcal{F}_n)=X_n$.",
    examples: [
      {
        title: "Индикатор",
        problem: "$\\mathbb{E}(\\mathbf{1}_A\\mid\\sigma(B))$ связано с $\\mathbb{P}(A\\mid B)$ на атомах.",
        solution: "Условная вероятность как частный случай.",
      },
      {
        title: "Независимость",
        problem: "Если $X$ независима от $\\mathcal{G}$, условное среднее константа $\\mathbb{E}X$.",
        solution: "Нет информации в $\\mathcal{G}$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$\\mathbb{E}(\\mathbb{E}(X\\mid\\mathcal{G}))=\\mathbb{E}X$. Если $\\mathbb{E}X=5$, левая часть равна",
      accepted: ["5"],
      explanation: "Закон полного математического ожидания.",
      solution: "Итеративное ожидание.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Условное ожидание $\\mathbb{E}(X\\mid\\mathcal{G})$ измеримо относительно",
        options: ["$\\sigma(X)$ обязательно только", "$\\mathcal{G}$", "борелевской $\\sigma$-алгебры на $\\Omega$ целиком всегда как $X$", "дополнения $\\mathcal{G}$"],
        answerIndex: 1,
        explanation: "Определение.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "$\\mathbb{E}(c\\mid\\mathcal{G})=c$ для константы. При $c=4$ значение",
        accepted: ["4"],
        explanation: "Измеримость константы.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "В $L^{2}$ условное ожидание есть",
        options: ["нелинейный оператор", "ортопроекция на подпространство $\\mathcal{G}$-измеримых", "свёртка", "характеристическая функция"],
        answerIndex: 1,
        explanation: "Геометрия Гильберта.",
      },
      {
        id: "p4",
        type: "choice",
        prompt: "Свойство башни (tower property) — это",
        options: ["независимость", "итерация вложенных $\\sigma$-алгебр", "ЦПТ", "формула Байеса для плотностей только"],
        answerIndex: 1,
        explanation: "$\\mathbb{E}(\\mathbb{E}(X\\mid\\mathcal{G}_2)\\mid\\mathcal{G}_1)$.",
      },
      {
        id: "p5",
        type: "open",
        prompt: "Мартингал: $\\mathbb{E}(X_{n+1}\\mid\\mathcal{F}_n)=X_n$. При $X_n=3$ п.н. условное ожидание равно",
        accepted: ["3"],
        explanation: "Константный мартингал.",
      },
      {
        id: "p6",
        type: "choice",
        prompt: "Условная вероятность $\\mathbb{P}(A\\mid\\mathcal{G})$ есть",
        options: ["число", "$\\mathbb{E}(\\mathbf{1}_A\\mid\\mathcal{G})$", "плотность $f_A$", "ковариация"],
        answerIndex: 1,
        explanation: "Определение через условное ожидание индикатора.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 16, "Совместные распределения", {
    theory:
      "Для случайного вектора $(X,Y)$ совместная функция распределения $F_{X,Y}(x,y)=\\mathbb{P}(X\\leqslant x,\\,Y\\leqslant y)$ непрерывна справа по каждому аргументу и согласована с маргиналами: $F_X(x)=F_{X,Y}(x,+\\infty)$. В абсолютно непрерывном случае есть плотность $f_{X,Y}\\geqslant 0$, $\\iint f=1$, $\\mathbb{P}((X,Y)\\in A)=\\iint_A f$. Маргинальная плотность $f_X(x)=\\int f_{X,Y}(x,y)\\,dy$. Независимость: $F_{X,Y}=F_X F_Y$, эквивалентно $f_{X,Y}=f_X f_Y$ почти всюду. Условная плотность $f_{Y|X}(y|x)=f_{X,Y}(x,y)/f_X(x)$ при $f_X(x)>0$. Для дискретной пары задают $p_{ij}=\\mathbb{P}(X=x_i,Y=y_j)$ с маргинальными суммами. Плотность суммы независимых — свёртка $f_X*f_Y$. Коэффициент корреляции описывает лишь линейную связь: $\\rho=0$ не означает независимости, кроме совместно нормального случая.",
    examples: [
      {
        title: "Равномерность на квадрате",
        problem: "Плотность $f=1$ на $[0,1]^{2}$. Найдите $F(1/2,1)$.",
        solution: "Площадь $[0,1/2]\\times[0,1]$ равна $1/2$.",
      },
      {
        title: "Независимость",
        problem: "Если $f_{X,Y}(x,y)=e^{-x}e^{-y}$ на $x,y>0$, независимы ли $X,Y$?",
        solution: "Да: произведение показательных плотностей.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "На $[0,1]^{2}$ плотность $f=1$. Маргинал $f_X(x)$ при $x\\in(0,1)$ равен",
      accepted: ["1"],
      explanation: "$\\int_0^{1} 1\\,dy=1$.",
      solution: "Интегрирование совместной плотности по $y$ даёт константу $1$ на $(0,1)$.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Независимость абсолютно непрерывных $X,Y$ равносильна",
        options: [
          "$\\mathrm{Cov}(X,Y)=0$ всегда",
          "$f_{X,Y}=f_X f_Y$ п.в.",
          "$F_{X,Y}=F_X+F_Y$",
          "$f_X=f_Y$",
        ],
        answerIndex: 1,
        explanation: "Произведение плотностей; для нормального закона это же, что некоррелированность.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "Совместные вероятности $p_{11}=p_{12}=p_{21}=p_{22}=1/4$. Маргинал $\\mathbb{P}(X=x_1)$ равен",
        accepted: ["1/2", "0.5"],
        explanation: "$1/4+1/4=1/2$.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "$F_X(x)$ получается из $F_{X,Y}$ как",
        options: [
          "$F_{X,Y}(x,x)$",
          "$F_{X,Y}(x,+\\infty)$",
          "$\\partial F/\\partial x$",
          "$1-F_{X,Y}(x,0)$",
        ],
        answerIndex: 1,
        explanation: "Предельный переход $y\\to+\\infty$.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "Плотность $f=2$ на треугольнике $x\\geqslant 0$, $y\\geqslant 0$, $x+y\\leqslant 1$. Тогда $f_X(0)=\\int_0^{1} 2\\,dy=$",
        accepted: ["2"],
        explanation: "Сечение при $x=0$ имеет длину $1$.",
      },
      {
        id: "p5",
        type: "choice",
        prompt: "Из $\\rho(X,Y)=0$ следует независимость",
        options: [
          "всегда",
          "не всегда; да — для совместно нормальной пары",
          "никогда",
          "только если $X=Y$",
        ],
        answerIndex: 1,
        explanation: "Контрпримеры нелинейной зависимости; гауссовский случай — исключение.",
      },
      {
        id: "p6",
        type: "open",
        prompt: "$F_{X,Y}(x,y)=xy$ на $[0,1]^{2}$ (равномерность). $F_{X,Y}(1,1)$ равно",
        accepted: ["1"],
        explanation: "Вероятность всего квадрата.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 17, "Ковариационная матрица и многомерное нормальное", {
    theory:
      "Для случайного вектора $X\\in\\mathbb{R}^{n}$ с $\\mathbb{E}\\|X\\|^{2}<\\infty$ ковариационная матрица $\\Sigma=\\mathrm{Cov}\\,X=\\mathbb{E}(X-\\mu)(X-\\mu)^{\\mathrm{T}}$, $\\mu=\\mathbb{E}X$. Она симметрична и неотрицательно определена: $a^{\\mathrm{T}}\\Sigma a=\\mathrm{Var}(a^{\\mathrm{T}}X)\\geqslant 0$. На диагонали стоят дисперсии, вне — попарные ковариации. Аффинное правило: $\\mathrm{Cov}(AX+b)=A\\Sigma A^{\\mathrm{T}}$. Невырожденный закон $\\mathcal{N}(\\mu,\\Sigma)$ ($\\Sigma\\succ 0$) имеет плотность $(2\\pi)^{-n/2}(\\det\\Sigma)^{-1/2}\\exp\\bigl(-\\frac12(x-\\mu)^{\\mathrm{T}}\\Sigma^{-1}(x-\\mu)\\bigr)$. Характеристическая функция $\\exp(it^{\\mathrm{T}}\\mu-\\frac12 t^{\\mathrm{T}}\\Sigma t)$ задаёт и вырожденные гауссовы законы. Маргинали и линейные образы гауссова вектора гауссовы. Некоррелированность компонент равносильна независимости именно для совместно нормального вектора.",
    examples: [
      {
        title: "Диагональная ковариация",
        problem: "Независимые стандартные нормали: $\\Sigma=I$. Плотность в нуле $(2\\pi)^{-n/2}$. При $n=2$ это $(2\\pi)^{-1}$. Верно ли?",
        solution: "Да: $\\det I=1$, экспонента $1$ в $\\mu=0$.",
      },
      {
        title: "Аффинное преобразование",
        problem: "$\\mathrm{Var}(2X)$ при $\\mathrm{Var} X=3$ равна $A\\Sigma A^{\\mathrm{T}}$ с $A=2$. Значение?",
        solution: "$4\\cdot 3=12$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$\\Sigma=\\mathrm{diag}(4,9)$. Тогда $\\det\\Sigma=$",
      accepted: ["36"],
      explanation: "Произведение диагонали $36$.",
      solution: "Для диагональной матрицы определитель — произведение дисперсий.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Матрица $\\Sigma=\\mathrm{Cov}\\,X$ всегда",
        options: [
          "отрицательно определена",
          "симметрична и $\\Sigma\\succeq 0$",
          "ортогональна",
          "имеет след $0$",
        ],
        answerIndex: 1,
        explanation: "$a^{\\mathrm{T}}\\Sigma a=\\mathrm{Var}(a^{\\mathrm{T}}X)\\geqslant 0$.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "$\\mathrm{Cov}(X_1,X_1)=\\mathrm{Var} X_1$. Если $\\mathrm{Var} X_1=5$, диагональный элемент $\\Sigma_{11}=$",
        accepted: ["5"],
        explanation: "Диагональ — дисперсии.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "Для совместно нормального вектора некоррелированность компонент означает",
        options: ["только $\\rho=0$ без независимости", "независимость", "вырожденность $\\Sigma$", "$\\mu=0$"],
        answerIndex: 1,
        explanation: "Характеристическая функция распадается на произведение.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "$\\mathrm{Cov}(AX)$ при $A=3$, $\\Sigma=2$ (одномерие) равна",
        accepted: ["18"],
        explanation: "$A\\Sigma A^{\\mathrm{T}}=9\\cdot 2=18$.",
      },
      {
        id: "p5",
        type: "choice",
        prompt: "При $\\Sigma\\succ 0$ величина $(X-\\mu)^{\\mathrm{T}}\\Sigma^{-1}(X-\\mu)$ для $X\\sim\\mathcal{N}(\\mu,\\Sigma)$ имеет закон",
        options: ["$t_{n}$", "$\\chi^{2}_{n}$", "Пуассон", "равномерный"],
        answerIndex: 1,
        explanation: "Стандартный квадрат нормы после отбеливания.",
      },
      {
        id: "p6",
        type: "open",
        prompt: "Плотность $\\mathcal{N}(0,I_n)$ содержит множитель $(2\\pi)^{-n/2}$. При $n=0$ формально это $1$, но для $n=2$ показатель $-n/2$ равен",
        accepted: ["-1"],
        explanation: "$-2/2=-1$, множитель $(2\\pi)^{-1}$.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 18, "Пуассоновский процесс", {
    theory:
      "Пуассоновский процесс интенсивности $\\lambda>0$ — считающий процесс $N(t)$, $t\\geqslant 0$, с $N(0)=0$, независимыми приращениями и стационарностью: $N(t)-N(s)\\sim\\mathrm{Poisson}(\\lambda(t-s))$ при $t>s$. Эквивалентное построение: промежутки между скачками н.о.р. $\\mathrm{Exp}(\\lambda)$, $N(t)=\\max\\{n:S_n\\leqslant t\\}$, $S_n=\\tau_1+\\cdots+\\tau_n$. Траектории неубывающие, целочисленные, скачки равны $+1$ (на конечном интервале нет накопления п.н.). $\\mathbb{E}N(t)=\\mathrm{Var}\\,N(t)=\\lambda t$. Конечномерные распределения задаются независимыми пуассоновскими приращениями на разбиении оси. Суперпозиция независимых пуассоновских процессов снова пуассоновская с суммой интенсивностей; независимое прореживание скачков сохраняет пуассоновость. Это модель редких событий во времени. Из независимости приращений следует марковское свойство $N$.",
    examples: [
      {
        title: "Среднее",
        problem: "$\\lambda=2$, $t=3$. Найдите $\\mathbb{E}N(3)$.",
        solution: "$\\lambda t=6$.",
      },
      {
        title: "Приращение",
        problem: "$N(5)-N(2)$ при $\\lambda=1$ имеет закон $\\mathrm{Poisson}(3)$. Чему равно его среднее?",
        solution: "$3$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$N(0)$ для пуассоновского процесса равно",
      accepted: ["0"],
      explanation: "Аксиома $N(0)=0$.",
      solution: "Счётчик стартует с нуля скачков.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Приращения $N(t)-N(s)$ и $N(s)-N(u)$ при $u<s<t$",
        options: ["всегда равны", "независимы", "имеют закон Коши", "отрицательны"],
        answerIndex: 1,
        explanation: "Определение: независимые приращения.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "$\\lambda=4$, $t=1/2$. $\\mathbb{E}N(t)=\\lambda t=$",
        accepted: ["2"],
        explanation: "$4\\cdot 1/2=2$.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "Промежутки между скачками пуассоновского процесса",
        options: ["н.о.р. показательные", "н.о.р. нормальные", "детерминированные", "равномерные на $[0,\\lambda]$"],
        answerIndex: 0,
        explanation: "$\\tau_i\\sim\\mathrm{Exp}(\\lambda)$; $S_n$ — эрланговские суммы.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "$N(t)-N(s)\\sim\\mathrm{Poisson}(\\lambda(t-s))$. При $\\lambda=3$, $t=2$, $s=1$ параметр Пуассона равен",
        accepted: ["3"],
        explanation: "$3\\cdot(2-1)=3$.",
      },
      {
        id: "p5",
        type: "choice",
        prompt: "Суперпозиция двух независимых процессов с $\\lambda_1$, $\\lambda_2$ есть пуассоновский с интенсивностью",
        options: ["$\\lambda_1\\lambda_2$", "$\\lambda_1+\\lambda_2$", "$\\max(\\lambda_1,\\lambda_2)$", "$|\\lambda_1-\\lambda_2|$"],
        answerIndex: 1,
        explanation: "Сумма независимых пуассоновых приращений.",
      },
      {
        id: "p6",
        type: "open",
        prompt: "$\\mathrm{Var}\\,N(t)=\\lambda t$. При $\\lambda=5$, $t=2$ дисперсия равна",
        accepted: ["10"],
        explanation: "Для пуассоновского счёта среднее и дисперсия совпадают: $10$.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 19, "Производящие функции моментов", {
    purpose:
      "После характеристических функций и ПФ распределений производящая функция моментов даёт сами моменты дифференцированием и восстанавливает закон, если существует в окрестности нуля.",
    nonexample: {
      title: "Не характеристическая и не всегда существует",
      text: "ПФ распределений $G(s)=\\mathbb{E}s^{X}$ — для неотрицательных целочисленных величин; характеристическая $\\varphi(t)=\\mathbb{E}e^{itX}$ всегда определена. Моментная $M_X(t)=\\mathbb{E}e^{tX}$ может не существовать ни в какой окрестности нуля (закон Коши). Из существования моментов всех порядков ещё не следует существование $M(t)$ при $t\\neq 0$.",
    },
    theory:
      "Производящая функция моментов $M_X(t)=\\mathbb{E}e^{tX}$ (вещественное $t$), определённая в некотором интервале $(-h,h)$, $h>0$. Тогда $M$ бесконечно дифференцируема внутри интервала и $M^{(k)}(0)=\\mathbb{E}X^{k}$. В частности $M(0)=1$, $M'(0)=\\mathbb{E}X$, $M''(0)=\\mathbb{E}X^{2}$. Для независимых $X,Y$ имеем $M_{X+Y}=M_X M_Y$. Стандартные формулы: Бернулли($p$) даёт $1-p+pe^{t}$; бином $n$ испытаний — $(1-p+pe^{t})^{n}$; Пуассон($\\lambda$) — $\\exp(\\lambda(e^{t}-1))$; $\\mathcal{N}(\\mu,\\sigma^{2})$ — $\\exp(\\mu t+\\sigma^{2}t^{2}/2)$; показательное $\\mathrm{Exp}(\\lambda)$ — $\\lambda/(\\lambda-t)$ при $t<\\lambda$. Если $M$ существует в окрестности нуля, она однозначно определяет закон (моменты определяют распределение в этом классе). Связь с характеристической: $M(it)=\\varphi(t)$ на общей области. Неравенство Чернова оценивает хвосты через $\\inf_{t>0}e^{-ta}M(t)$.",
    examples: [
      {
        title: "Показательное",
        problem: "$X\\sim\\mathrm{Exp}(1)$, $M(t)=1/(1-t)$ при $t<1$. Найдите $\\mathbb{E}X=M'(0)$.",
        solution:
          "$M'(t)=1/(1-t)^{2}$, $M'(0)=1$. Это согласовано со средним показательного закона параметра $1$.",
      },
      {
        title: "Сумма независимых",
        problem: "Две независимые $\\mathrm{Poisson}(\\lambda)$: ПФМ произведения. Какой закон у суммы?",
        solution:
          "$M(t)=\\exp(\\lambda(e^{t}-1))\\cdot\\exp(\\lambda(e^{t}-1))=\\exp(2\\lambda(e^{t}-1))$, то есть $\\mathrm{Poisson}(2\\lambda)$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "$M(0)=\\mathbb{E}e^{0}=\\mathbb{E}1$ равно",
      accepted: ["1"],
      explanation: "Нормировка ПФМ.",
      solution:
        "При $t=0$ всегда $M(0)=1$, если ожидание определено.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Если $M$ существует в окрестности нуля, $M^{(k)}(0)$ равно",
        options: [
          "$\\mathbb{E}X^{k}$",
          "$\\mathbb{P}(X=k)$",
          "$\\varphi^{(k)}(1)$",
          "$k!$ всегда",
        ],
        answerIndex: 0,
        explanation: "Производные в нуле — моменты.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "Для константы $X=2$ п.н. имеем $M(t)=e^{2t}$. Тогда $M'(0)=$",
        accepted: ["2"],
        explanation: "$\\mathbb{E}X=2$.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "ПФМ суммы независимых слагаемых есть",
        options: [
          "сумма ПФМ",
          "произведение ПФМ",
          "свёртка траекторий",
          "максимум",
        ],
        answerIndex: 1,
        explanation: "$e^{t(X+Y)}=e^{tX}e^{tY}$ и независимость.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "Нормаль $\\mathcal{N}(0,1)$: $M(t)=e^{t^{2}/2}$. $M(0)=$",
        accepted: ["1"],
        explanation: "$e^{0}=1$.",
      },
      {
        id: "p5",
        type: "choice",
        prompt: "Закон Коши",
        options: [
          "имеет ПФМ в окрестности нуля",
          "не имеет конечной ПФМ в окрестности нуля",
          "есть бином",
          "имеет $M(t)=e^{t}$",
        ],
        answerIndex: 1,
        explanation: "Нет даже первого момента; $\\mathbb{E}e^{tX}=\\infty$.",
      },
      {
        id: "p6",
        type: "open",
        prompt: "Пуассон($\\lambda$): $M(t)=\\exp(\\lambda(e^{t}-1))$. При $\\lambda=0$ величина $M(t)$ равна",
        accepted: ["1"],
        explanation: "Вырожденность в нуле: $e^{0}=1$.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 20, "Марковские цепи: определение и матрица переходов", {
    purpose:
      "После пуассоновского процесса — дискретное время: будущее зависит от прошлого лишь через текущее состояние. Матрица переходов — язык очередей, блужданий и эргодических теорем следующей темы.",
    nonexample: {
      title: "Не всякая зависимость от времени марковская, строки — не столбцы",
      text: "Процесс, у которого завтра зависит от позавчерашнего дня даже при известном «сегодня», не марковский. Стохастическая матрица имеет сумму единицы по строкам $\\sum_{j}P_{ij}=1$; сумма по столбцам может быть любой. Симметрия $P_{ij}=P_{ji}$ не обязательна.",
    },
    theory:
      "Цепь Маркова с дискретным временем на счётном (часто конечном) пространстве состояний $S$: $\\mathbb{P}(X_{n+1}=j\\mid X_n=i,X_{n-1},\\ldots,X_0)=\\mathbb{P}(X_{n+1}=j\\mid X_n=i)=P_{ij}$, если вероятность не зависит от $n$ (однородность). Матрица переходов $P=(P_{ij})$ стохастическая: $P_{ij}\\geqslant 0$, $\\sum_{j}P_{ij}=1$. Конечномерные распределения задаются начальным законом $\\mu$ и степенями: $\\mathbb{P}(X_n=j)=(\\mu P^{n})_{j}$, $P^{(n)}=P^{n}$ — вероятности за $n$ шагов (уравнение Колмогорова–Чепмена $P^{m+n}=P^{m}P^{n}$). Граф цепи: дуга $i\\to j$ при $P_{ij}>0$. Классификация: состояние достижимо, сообщаются, классы эквивалентности; неразложимость — один сообщающийся класс. Существенные и несущественные состояния. Случайное блуждание на графе: переход к соседу с вероятностью $1/\\deg$. Поглощающее состояние: $P_{ii}=1$.",
    examples: [
      {
        title: "Два состояния",
        problem: "$S=\\{1,2\\}$, $P=\\begin{pmatrix}1/2&1/2\\\\ 1&0\\end{pmatrix}$. Чему равно $P_{21}$? Стохастична ли матрица?",
        solution:
          "$P_{21}=1$. Суммы строк: $1/2+1/2=1$ и $1+0=1$. Да.",
      },
      {
        title: "Два шага",
        problem: "При той же $P$ найдите $P^{2}_{11}$.",
        solution:
          "$(P^{2})_{11}=P_{11}P_{11}+P_{12}P_{21}=(1/2)(1/2)+(1/2)\\cdot 1=1/4+1/2=3/4$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "Сумма строки стохастической матрицы равна",
      accepted: ["1"],
      explanation: "$\\sum_{j}P_{ij}=1$.",
      solution:
        "Полная вероятность следующего состояния.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Марковское свойство означает, что будущее при известном настоящем",
        options: [
          "зависит от всей траектории",
          "не зависит от прошлого",
          "детерминировано",
          "имеет закон Коши",
        ],
        answerIndex: 1,
        explanation: "Условная независимость прошлого и будущего при $X_n$.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "Поглощающее состояние имеет $P_{ii}=$",
        accepted: ["1"],
        explanation: "Цепь остаётся в $i$ навсегда.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "Вероятности за $n$ шагов задаются",
        options: [
          "суммой $P$",
          "матрицей $P^{n}$",
          "определителем $P$",
          "следом $P$",
        ],
        answerIndex: 1,
        explanation: "Уравнение Чепмена–Колмогорова.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "Строка $(0{,}2,\\,0{,}5,\\,x)$ стохастична при трёх состояниях. Тогда $x=$",
        accepted: ["0.3", "0,3", "3/10"],
        explanation: "$0{,}2+0{,}5+x=1$.",
      },
      {
        id: "p5",
        type: "choice",
        prompt: "Цепь неразложима, если",
        options: [
          "есть поглощающее состояние обязательно",
          "из любого состояния можно достичь любого (сообщаемость)",
          "$P=I$",
          "все $P_{ij}=0$",
        ],
        answerIndex: 1,
        explanation: "Один класс сообщающихся состояний.",
      },
      {
        id: "p6",
        type: "open",
        prompt: "При $P=I$ (тождественная матрица $2\\times 2$) вероятность остаться в $1$ за $5$ шагов равна",
        accepted: ["1"],
        explanation: "$I^{n}=I$, $P_{11}=1$.",
      },
    ],
    sources: src,
  }),

  makeLesson("uni-probability", 21, "Эргодичность конечных цепей Маркова", {
    purpose:
      "Стационарное распределение и сходимость $P^{n}$ объясняют, почему длинная траектория «забывает» старт: доли времени в состояниях, расчёт очередей, связь с ЗБЧ.",
    nonexample: {
      title: "Не всякая конечная цепь эргодична в смысле сходимости $P^{n}$",
      text: "Два поглощающих состояния: стационарных распределений много, предел зависит от старта. Периодическая цепь на цикле длины $2$ ($P_{12}=P_{21}=1$) не имеет предела $P^{n}$ (осцилляция), хотя среднее Чезаро $(I+P+\\cdots+P^{n-1})/n$ сходится. Эргодичность конечной цепи — неприводимость плюс апериодичность.",
    },
    theory:
      "Распределение $\\pi$ на конечном $S$ стационарно, если $\\pi P=\\pi$ и $\\sum\\pi_i=1$, $\\pi_i\\geqslant 0$ (инвариантность). Для конечной неприводимой цепи стационарное $\\pi$ существует и единственно; $\\pi_i=1/\\mathbb{E}_i\\tau_i^{+}$, где $\\tau_i^{+}$ — момент первого возвращения. Период состояния — НОД длин замкнутых путей; в одном классе период общий. Цепь апериодична, если период равен $1$. Теорема сходимости: конечная неприводимая апериодическая цепь эргодична: $P^{n}_{ij}\\to\\pi_j$ при $n\\to\\infty$ независимо от $i$. Эргодическая теорема: доля визитов в $j$ вдоль траектории стремится к $\\pi_j$ почти наверное. Если есть период $d>1$, сходятся лишь $P^{nd}$. Обратимость: $\\pi_i P_{ij}=\\pi_j P_{ji}$ (детальный баланс) достаточна для стационарности. Двумерное случайное блуждание на конечном связном неориентированном графе имеет $\\pi_i\\propto\\deg(i)$.",
    examples: [
      {
        title: "Симметричная двойка",
        problem: "$P=\\begin{pmatrix}1-a&a\\\\ b&1-b\\end{pmatrix}$, $0<a,b\\leqslant 1$. Найдите $\\pi$.",
        solution:
          "$\\pi_1=b/(a+b)$, $\\pi_2=a/(a+b)$. При $a=b=1/2$ имеем $\\pi=(1/2,1/2)$. Если $a=b=1$, период $2$: $P^{n}$ не сходится, но $\\pi$ то же.",
      },
      {
        title: "Апериодичность",
        problem: "Петля $P_{11}>0$ в неприводимой конечной цепи. Каков период?",
        solution:
          "Есть замкнутый путь длины $1$, НОД равен $1$: апериодичность, сходимость $P^{n}\\to\\pi$.",
      },
    ],
    sample: {
      id: "s",
      type: "open",
      prompt: "Стационарность: $\\pi P=\\pi$. Для $\\pi=(1/2,1/2)$ и $P$ с одинаковыми строками $(1/2,1/2)$ произведение снова $(1/2,1/2)$. Первая координата $\\pi_1=$",
      accepted: ["1/2", "0.5"],
      explanation: "Равномерное распределение на двух состояниях.",
      solution:
        "Обе строки равны $\\pi$, поэтому $\\pi$ стационарно.",
    },
    problems: [
      {
        id: "p1",
        type: "choice",
        prompt: "Конечная неприводимая апериодическая цепь",
        options: [
          "не имеет стационарного распределения",
          "имеет единственное $\\pi$, и $P^{n}_{ij}\\to\\pi_j$",
          "всегда периодична с периодом $2$",
          "имеет $P=0$",
        ],
        answerIndex: 1,
        explanation: "Классическая эргодическая теорема для конечных цепей.",
      },
      {
        id: "p2",
        type: "open",
        prompt: "Период — НОД длин возвращений. Если есть петля, этот НОД равен",
        accepted: ["1"],
        explanation: "Путь длины $1$.",
      },
      {
        id: "p3",
        type: "choice",
        prompt: "Два поглощающих состояния в конечной цепи означают, что стационарное распределение",
        options: [
          "единственно всегда",
          "не единственно: зависит от вероятностей поглощения",
          "не существует",
          "равно $0$",
        ],
        answerIndex: 1,
        explanation: "Любая выпуклая комбинация дельт в поглощающих точках стационарна.",
      },
      {
        id: "p4",
        type: "open",
        prompt: "Детальный баланс $\\pi_1 P_{12}=\\pi_2 P_{21}$. При $P_{12}=P_{21}=1/2$ и $\\pi_1=\\pi_2$ каждое произведение равно $1/4$, если $\\pi_i=1/2$. Запишите $1/4$ как десятичную или дробь",
        accepted: ["1/4", "0.25", "0,25"],
        explanation: "$(1/2)\\cdot(1/2)=1/4$.",
      },
      {
        id: "p5",
        type: "choice",
        prompt: "На цикле из двух вершин с $P_{12}=P_{21}=1$ последовательность $P^{n}$",
        options: [
          "сходится к $\\pi$",
          "осциллирует и не сходится, хотя Чезаро-средние сходятся",
          "нулевая",
          "равна $I$ при всех $n$",
        ],
        answerIndex: 1,
        explanation: "Период $2$: чётные степени — $I$, нечётные — перестановка.",
      },
      {
        id: "p6",
        type: "open",
        prompt: "Для случайного блуждания на $K_2$ (два конца ребра) $\\pi_i\\propto\\deg(i)=1$, значит каждая координата $\\pi$ равна",
        accepted: ["1/2", "0.5"],
        explanation: "Равномерное на двух вершинах.",
      },
    ],
    sources: src,
  }),
];
