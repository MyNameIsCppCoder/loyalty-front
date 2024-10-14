import React, { Component } from 'react';
import pic from '../../../public/landing/industry.svg';
import Image from 'next/image';

class Advantages extends Component {
  render() {
    return (
      <div className={'flex h-screen'}>
        <div className="h-screen w-1/2 absolute left-0 top-1/3 mx-10">
          <h1 className="text-4xl font-bold text-white text-center mt-8">Увеличьте лояльность клиентов с минимальными усилиями!</h1>
          <h4 className="text-xl text-white text-center mt-8">С помощью нашей программы лояльности вы сможете возвращать клиентов снова и снова, увеличивать их средний чек и выстраивать прочные отношения с вашей аудиторией.</h4>
        </div>
        <Image src={pic} alt={pic} className="border-l-yellow-50 absolute bottom-0 right-10 w-1/3" width={500} height={500} />
      </div>
    );
  }
}

export default Advantages;