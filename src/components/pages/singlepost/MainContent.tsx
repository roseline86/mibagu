import styles from "./PostContent.module.css";

export default function MainContent({ content }: { content: string }) {
  return (
    <div
      className={`mt-6 rounded-md border p-2 text-lg md:mt-12 md:p-4 ${styles["post-content"]}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
