import {Header} from '@common/Header/Header.tsx';

const PageLayout = (props: any) => {
  return (
    <div id="PageLayout">
        <Header/>
      <div style={{
        minWidth: '432px;',
      }}>
        <div id={'viewContent'}>{props.children}</div>
      </div>
      <div id={'footer'}></div>
    </div>
  );
};
export default PageLayout;
