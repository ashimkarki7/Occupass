
const PageLayout = (props: any) => {
  return (
    <div id="PageLayout">
      <div>
        <div id={'viewContent'}>{props.children}</div>
      </div>
      <div id={'footer'}></div>
    </div>
  );
};
export default PageLayout;
