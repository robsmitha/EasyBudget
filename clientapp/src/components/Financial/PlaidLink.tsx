import React, { useCallback, FunctionComponent } from "react";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from "react-plaid-link"

interface Props {
    token: string;
    buttonText: string;
    publicTokenExchange: (public_token: string) => void;
  }

export const PlaidLink : React.FC<Props>  = ({ token, buttonText, publicTokenExchange }) => {
    const onSuccess = useCallback<PlaidLinkOnSuccess>(
        async (public_token, metadata) => {
            publicTokenExchange(public_token);
        },
        []
      );
    
      const config: PlaidLinkOptions = {
        token,
        onSuccess,
        // onExit
        // onEvent
      };
    
      const { open, ready, error } = usePlaidLink(config);
    
      return (
        <button style={{
            color: 'darkblue',
            textDecoration: 'underline'
          }} onClick={() => open()} disabled={!ready}>
          {buttonText}
        </button>
      );
}
