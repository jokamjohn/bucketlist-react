import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

import {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotFound from "../../components/NotFound";
import Home from "../../components/home/Home";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";
import {Buckets} from "../../containers/Buckets";
import {PrivateRoute} from "../../components/auth/PrivateRoute";
import {LogoutRoute} from "../../components/auth/LogoutRoute";

describe('Test the application component', () => {
  it('render NotFound component on a 404 route', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={['/random']}>
          <Route component={NotFound}/>
        </MemoryRouter>
    );
    expect(wrapper.find(NotFound)).toHaveLength(1);
    expect(wrapper.find(Home)).toHaveLength(0);
  });

  it('render Home component', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <Route exact path="/" component={Home}/>
        </MemoryRouter>
    );
    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });

  it('render Login component', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={['/login']}>
          <Route exact path="/login"
                 render={() => <Login dispatch={() => {
                 }}/>}/>
        </MemoryRouter>
    );
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  it('render Sign up component', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={['/signup']}>
          <Route exact path="/signup"
                 render={() => <Register dispatch={() => {
                 }}/>}/>
        </MemoryRouter>
    );
    expect(wrapper.find(Register)).toHaveLength(1);
  });

  // it('render login component when a user tries to access a protected route whe not logged in', () => {
  //   const wrapper = mount(
  //       <MemoryRouter initialEntries={['/logout']}>
  //         <LogoutRoute
  //             path="/logout"
  //             isAuthenticated={false}
  //             dispatch={() => {
  //             }}
  //         />
  //       </MemoryRouter>
  //   );
  //   expect(wrapper.find(Login)).toHaveLength(1);
  // });

  // it('render logout component', () => {
  //   const wrapper = mount(
  //       <MemoryRouter initialEntries={['/logout']}>
  //         <LogoutRoute
  //             path="/logout"
  //             isAuthenticated={true}
  //             dispatch={() => {
  //             }}
  //         />
  //       </MemoryRouter>
  //   );
  //   expect(wrapper.find(LogoutRoute)).toHaveLength(1);
  // });


  // it('render Buckets component', () => {
  //   const rest = {
  //     dispatch: () => {
  //     },
  //   };
  //   const wrapper = mount(
  //       <MemoryRouter initialEntries={['/buckets']}>
  //         <PrivateRoute
  //             path="/buckets"
  //             component={Buckets}
  //             isAuthenticated={true}
  //             {...rest}
  //         />
  //       </MemoryRouter>
  //   );
  //   const privateRoute = wrapper.find(PrivateRoute);
  //   // expect(privateRoute.prop('component')).toBe(Buckets)
  //   const route = mount(privateRoute.find(Route));
  //   console.log(route)
  // });
});

