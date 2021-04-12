import Card from "components/home/courses/card";
import { useTranslation } from "react-i18next";
import css from "./style.module.css";

const config = [
  {
    title: "courses.scratch_lite.title",
    subtitle: "courses.scratch_lite.subtitle",
    price: "courses.scratch_lite.price",
    age: "courses.scratch_lite.age",
    duration: "courses.scratch_lite.age",
    description: "courses.scratch_lite.description",
    src: "images/s5i1.png",
  },
  {
    title: "courses.tynker_english_junior.title",
    subtitle: "courses.tynker_english_junior.subtitle",
    price: "courses.tynker_english_junior.price",
    age: "courses.tynker_english_junior.age",
    duration: "courses.tynker_english_junior.age",
    description: "courses.tynker_english_junior.description",
    src: "images/s5i2.png",
  },
  {
    title: "courses.scratch_games.title",
    subtitle: "courses.scratch_games.subtitle",
    price: "courses.scratch_games.price",
    age: "courses.scratch_games.age",
    duration: "courses.scratch_games.age",
    description: "courses.scratch_games.description",
    src: "images/s5i3.png",
  },
  {
    title: "courses.tynker_english_middle.title",
    subtitle: "courses.tynker_english_middle.subtitle",
    price: "courses.tynker_english_middle.price",
    age: "courses.tynker_english_middle.age",
    duration: "courses.tynker_english_middle.age",
    description: "courses.tynker_english_middle.description",
    src: "images/s5i4.png",
  },
  {
    title: "courses.visual_design.title",
    subtitle: "courses.visual_design.subtitle",
    price: "courses.visual_design.price",
    age: "courses.visual_design.age",
    duration: "courses.visual_design.age",
    description: "courses.visual_design.description",
    src: "images/s5i5.png",
  },
  {
    title: "courses.minecraft_code.title",
    subtitle: "courses.minecraft_code.subtitle",
    price: "courses.minecraft_code.price",
    age: "courses.minecraft_code.age",
    duration: "courses.minecraft_code.age",
    description: "courses.minecraft_code.description",
    src: "images/s5i6.png",
  },
  {
    title: "courses.frontend_junior.title",
    subtitle: "courses.frontend_junior.subtitle",
    price: "courses.frontend_junior.price",
    age: "courses.frontend_junior.age",
    duration: "courses.frontend_junior.age",
    description: "courses.frontend_junior.description",
    src: "images/s5i7.png",
  },
  {
    title: "courses.math.title",
    subtitle: "courses.math.subtitle",
    price: "courses.math.price",
    age: "courses.math.age",
    duration: "courses.math.age",
    description: "courses.math.description",
    src: "images/s5i8.png",
  },
  {
    title: "courses.java.title",
    subtitle: "courses.java.subtitle",
    price: "courses.java.price",
    age: "courses.java.age",
    duration: "courses.java.age",
    description: "courses.java.description",
    src: "images/s5i7.png",
  },
  {
    title: "courses.english_dpa.title",
    subtitle: "courses.english_dpa.subtitle",
    price: "courses.english_dpa.price",
    age: "courses.english_dpa.age",
    duration: "courses.english_dpa.age",
    description: "courses.english_dpa.description",
    src: "images/s5i8.png",
  },
  {
    title: "courses.cyber_team.title",
    subtitle: "courses.cyber_team.subtitle",
    price: "courses.cyber_team.price",
    age: "courses.cyber_team.age",
    duration: "courses.cyber_team.age",
    description: "courses.cyber_team.description",
    src: "images/s5i7.png",
  },
  {
    title: "courses.online_school.title",
    subtitle: "courses.online_school.subtitle",
    price: "courses.online_school.price",
    age: "courses.online_school.age",
    duration: "courses.online_school.age",
    description: "courses.online_school.description",
    src: "images/s5i7.png",
  },
];

const Courses = () => {
  const { t } = useTranslation();

  return (
    <section className={css["root"]}>
      <h5 className={css["section-title"]}> {t("development.title")} </h5>
      <ul className={css["cards"]}>
        {config.map((c) => {
          return <Card key={c.description} c={c} />;
        })}
      </ul>
    </section>
  );
};

export default Courses;
