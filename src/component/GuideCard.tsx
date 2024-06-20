import NutritionDB from "../../data/nutritionDB.json";

export type Guide = (typeof NutritionDB)[0];

export const GuideCard = ({ name, description, author, link }: Guide) => (
  <li className="guide">
    <h3 className="mb-1">《{name}》</h3>
    <p>{description}</p>
    <p>
      <strong>作者：</strong> {author}
    </p>
    <p>
      <a className="text-decoration-none" href={link} target="_blank">
        阅读指南
      </a>
    </p>
    <p></p>
  </li>
);
