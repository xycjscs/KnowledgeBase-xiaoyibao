import { Guide, GuideCard } from "./GuideCard";

export interface GuideSectionProps extends Record<"id" | "title", string> {
  data: Guide[];
}

export const GuideSection = ({ id, title, data }: GuideSectionProps) => (
  <section id={id}>
    <h2 className="border-bottom border-black border-2 pb-2">{title}</h2>

    <ul className="d-flex flex-column gap-4 guides">
      {data.map((guide) => (
        <GuideCard {...guide} />
      ))}
    </ul>
  </section>
);
