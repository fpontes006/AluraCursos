import { View } from './view.js'; 3

export class mensagemView extends View<string>  {

    protected template(model: string): string {

        return `
            <p class="alert alert-info">${model}</p>
        `;

    }



}