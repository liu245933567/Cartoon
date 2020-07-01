import React from 'react';
import { cartoonHomeInfo } from '@services/cartoon';
class Cartoon extends React.Component {
  public componentDidMount() {
    this.getInfo();
  }

  private async getInfo() {
    const a = await cartoonHomeInfo();

    console.log(a);
  }
  render() {
    return <div className="Cartoon_Page_Wrapper">漫画</div>;
  }
}

export default Cartoon;
