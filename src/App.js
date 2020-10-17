import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './pages/auth/auth';
import Main from './pages/main/main';
import Step1 from './pages/step1/step-1';
import Step2 from './pages/step2/step-2';
import Step3 from './pages/step3/step-3';
import Step4 from './pages/step4/step4';


function App() {


  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={Main}></Route>
        <Route path='/auth' component={Auth}></Route>
        <Route path='/step-1' component={Step1}></Route>
        <Route path='/step-2' component={Step2}></Route>
        <Route path='/step-3' component={Step3}></Route>
        <Route path='/step-4' component={Step4}></Route>
      </Switch>
    </div>
  );
}

export default App;
