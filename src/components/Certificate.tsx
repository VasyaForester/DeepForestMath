import { Crest } from "./Crest";
import { formatGpa } from "../lib/grading";

export type DiplomaTier = "bachelor" | "laureate";

export function Certificate({
  name,
  gpa,
  date,
  tier,
  honors,
}: {
  name: string;
  gpa: number;
  date: string;
  tier: DiplomaTier;
  honors?: string;
}) {
  if (tier === "laureate") {
    return (
      <article className="diploma diploma-laureate">
        <div className="diploma-ornament" aria-hidden="true">
          <span className="ornament-tr" />
          <span className="ornament-bl" />
        </div>
        <p className="latin">Deep Forest Academy · Collegium Mathematicum</p>
        <p className="latin honors">Laureatus · {honors ?? "cursus plenus"}</p>
        <Crest className="diploma-crest diploma-crest-lg" />
        <h1>Диплом лауреата</h1>
        <p className="muted">полный курс программы «Математика»</p>
        <p className="body">
          Уважаемый {name}, Академия признаёт завершение <em>всего</em> Collegium Mathematicum:
          школьного ядра, четырёх семестров анализа, алгебры и геометрии, топологии, теории
          вероятностей, уравнений, комплексного и функционального анализа. Ваш GPA полного курса —{" "}
          {formatGpa(gpa)}/4.0
          {honors ? ` (${honors})` : ""}. Имя Ваше вписано в книгу лауреатов Deep Forest Academy.
        </p>
        <div className="sign-row">
          <div className="sign-block">
            <div className="muted">Дата</div>
            <strong>{date}</strong>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="diploma">
      <p className="latin">Deep Forest Academy · Collegium Mathematicum</p>
      <Crest className="diploma-crest" />
      <h1>Диплом</h1>
      <p className="muted">базовый курс программы «Математика»</p>
      <p className="body">
        Уважаемый {name}, поздравляем с успешным окончанием базового курса программы «Математика»
        Deep Forest Academy: школьный курс, математический анализ I, линейная алгебра, алгебра,
        аналитическая геометрия и дискретная математика. Ваш GPA — {formatGpa(gpa)}/4.0. Углубленный
        курс (анализ II–IV, топология и далее) остаётся открытой тропой.
      </p>
        <div className="sign-row">
          <div className="sign-block">
            <div className="muted">Дата</div>
            <strong>{date}</strong>
          </div>
        </div>
    </article>
  );
}
