import { PlaidLink } from "./PlaidLink";
import { Root, createRoot } from 'react-dom/client';

export class PlaidLinkConnector {

    root: Root;
    buttonText: string | null;
    token: string | null;
    exchangePublicToken: (public_token: string) => void;

    constructor(targetEl: HTMLElement, buttonText: string, token: string, exchangePublicToken: (public_token: string) => void){
        this.root = createRoot(targetEl);
        this.buttonText = buttonText
        this.token = token
        this.exchangePublicToken = exchangePublicToken
    }

    render(){
        this.root.render(
            <PlaidLink 
                buttonText={this.buttonText} 
                token={this.token}
                publicTokenExchange={this.exchangePublicToken} />
        )
    }
}