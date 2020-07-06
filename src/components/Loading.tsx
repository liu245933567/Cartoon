import React from 'react';

type IProps = {
  isLoading: boolean
}

const Loading: React.FC<IProps> = ({isLoading}: IProps) => {
  if (!isLoading) {
    return null;
  }
  return (
    <div className="Loading-Component-Wrapper">
      <div className="Loading-Main">
      <span>loading...</span>
    </div>
    </div>
  );
};

export default Loading;
