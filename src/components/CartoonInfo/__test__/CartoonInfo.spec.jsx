import CartoonInfo from '../index';
import Enzyme, {
  shallow
  // render,
  // mount
} from 'enzyme';
import React from 'react';
import cartoonDetailData from '../../../mocks/cartoonDetail.json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter()
});

describe('CartoonInfo compoent', () => {
  it('case: expect Test render a div with className: test-container', () => {
    const cartoonDetail = cartoonDetailData.result;
    const wrapper = shallow(<CartoonInfo cartoonInfo={cartoonDetail} />);

    console.log(wrapper.find('.Cartoon-Image-Cover').length);

    expect(wrapper.find('.Cartoon-Image-Cover').length).toEqual(1);
  });
});
