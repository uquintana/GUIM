import React from 'react';
import Picker from './Picker';
import renderer from 'react-test-renderer';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Picker />', () => {
  describe('tests for normal behaviour', () => {
    let active = [1];
    let component;
    let tree;
    let reRender;
    const makeRenderer = component =>
      () => tree = component.toJSON();

    beforeEach(() => {
      component = renderer.create(
        <Picker
          onChange={(label, value) => {active = [value]}}
          options={[
            {label: 'Uno', value: 1},
            {label: 'Dos', value: 2},
            {label: 'Tres', value: 3},
          ]}
          active={active}
        />);
      reRender = makeRenderer(component);
      reRender();
    })

    it('match snapshot', () => {
      expect(tree).toMatchSnapshot();
    });


    it('selects the right element', () => {
      tree.children[1].props.onClick();
      reRender();
      expect(active).toEqual([2]);

      tree.children[2].props.onClick();
      reRender();
      expect(active).toEqual([3]);
    });
  });

  describe('tests for multiple behaviour', () => {
    let active = [1];
    let component;
    let tree;
    let reRender;
    const makeRenderer = component =>
      () => tree = component.toJSON();

    beforeEach(() => {
      component = renderer.create(
        <Picker
          onChange={(label, value) => {
            if(active.indexOf(value) !== -1) {
              active.splice(active.indexOf(value),1);
            } else {
              active.push(value);
            }
          }}
          options={[
            {label: 'Uno', value: 1},
            {label: 'Dos', value: 2},
            {label: 'Tres', value: 3},
          ]}
          active={active}
        />);
      reRender = makeRenderer(component);
      reRender();
    })

    it('match snapshot', () => {
      expect(tree).toMatchSnapshot();
    });


    it('selects the right element', () => {
      tree.children[1].props.onClick();
      reRender();
      expect(active).toEqual([1,2]);
    });

    it('unselects the first element', () => {
      tree.children[0].props.onClick();
      reRender();
      expect(active).toEqual([2]);
    });
  });

  describe('dom tests', () => {
    let active = [1];
    let component;
    let update = () => {
      component = mount(
        <Picker
          onChange={(label, value) => {active = [value]}}
          options={[
            {label: 'Uno', value: 1},
            {label: 'Dos', value: 2},
            {label: 'Tres', value: 3},
          ]}
          active={active}
        />);
    }
    beforeEach(() => {
      update();
    });

    it('changes the active className to the selected pill', () => {
      component.find('a').at(2).simulate('click');
      update();
      expect(component.find('.active').key()).toBe('3');
    });
  });
});
