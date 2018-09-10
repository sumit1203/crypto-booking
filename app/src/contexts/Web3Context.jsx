import React from 'react';

export const Web3Context = React.createContext();

export function withWeb3(WrappedComponent) {
  const Web3 = props => (
    <Web3Context.Consumer>
      {web3 => <WrappedComponent {...props} web3={web3} />}
    </Web3Context.Consumer>
  );
  Web3.displayName = `withWeb3(${WrappedComponent.displayName || WrappedComponent.name})`;
  return Web3;
}
