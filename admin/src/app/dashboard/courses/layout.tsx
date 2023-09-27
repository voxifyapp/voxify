export default function CoursesLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <div>{props.children}</div>
      <div>{props.modal}</div>
    </div>
  );
}
