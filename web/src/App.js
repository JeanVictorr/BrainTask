import React, { useState, useEffect } from 'react';

import { MdDone, MdAdd, MdDeleteForever } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import GlobalStyle from './styles/global';

import api from './services/api';
import {
  NavBar,
  Main,
  Content,
  SubmitButton,
  Card,
  Tasks,
  Task,
  CheckBox,
  Label
 } from './styles/';
 import logo from './assets/img/survey.png';

function App() {
  const [tasks, setTasks] = useState([]);
  
  async function loadTasks() {
    const response = await api.get('/tasks');

    setTasks(response.data);
  }

  useEffect(() => {
    loadTasks();
  });

  async function handleChecked(task) {
    await api.put(`/tasks/${task.id}`, {
      checked: !task.checked,
  });

  loadTasks();
  }

  async function handleSubmit(data, {resetForm}) {
    await api.post('/tasks/', data);

    if (data) {
      resetForm();
      loadTasks();
    }
  }

  async function handleDelete(id) {
    await api.delete(`/tasks/${id}`);

    loadTasks();
  }

  return (
   <>
    <GlobalStyle />
    <NavBar>
      <nav>
        <img src={logo} alt="BrainTask"/>
        <span>Brain Task</span>
        </nav>
    </NavBar>
    <Main>
      <Content>
        <Form onSubmit={handleSubmit}>
          <SubmitButton type="submit">
           <MdAdd color="fff" size={32} />
          </SubmitButton>
          <Input name="description" placeholder= "Nova Tarefa" />
        </Form>
      <Card>
        <Tasks>
          {tasks.map((task) => (
          <Task key={String(task.id)}>
              <span>
                    <CheckBox
                      checked={task.checked}
                      onClick={() => handleChecked(task)}
                    >
                      <MdDone color="#fff" size={10} />
                    </CheckBox>
                    <Label checked={task.checked}>{task.description}</Label>
                  </span>
                  <span onClick={() => handleDelete(task.id)}>
                    <MdDeleteForever color="#FF6184" size={20} />
                  </span>
            </Task>
           ))}
         </Tasks>
        </Card>
      </Content>
     </Main>
   </>
  );
}

export default App;
