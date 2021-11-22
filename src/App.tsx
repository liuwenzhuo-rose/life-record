import { FC } from 'react';
import Records from './components/RecordsList';
import Title from './components/PageTitle';
import 'antd/dist/antd.css';
import './App.css';

const App: FC = () => {
  return (
    <div className="app">
      <Title />
      <Records />
    </div>
  );
};

export default App;
